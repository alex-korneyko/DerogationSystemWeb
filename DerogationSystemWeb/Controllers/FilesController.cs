using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using DerogationSystemWeb.Model.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DerogationSystemWeb.Controllers
{
    [ApiController]
    [Route("api/files")]
    public class FilesController: Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationContext _db;
        private readonly DerogationService _derogationService;
        private readonly string _path;

        public FilesController(IConfiguration configuration, ApplicationContext db, DerogationService derogationService)
        {
            _configuration = configuration;
            _db = db;
            _derogationService = derogationService;
            _path = _configuration["FileStore:Upload:Path"];
        }

        [HttpPost("upload/{derogationId}")]
        public async Task<IActionResult> AddFileForDerogation(long derogationId, IFormFile uploadFile)
        {
            var author = _db.Users.FirstOrDefault(user => user.DerogationUser == User.Identity.Name);
            if (author == null)
            {
                return BadRequest(new {message = "User not found"});
            }

            DerogationHeader derogation;
            
            if (derogationId == 0)
            {
                derogation = new DerogationHeader {DerogationId = 0};
            }
            else
            {
                derogation = _derogationService.GetDerogation(derogationId);
                if (derogation == null)
                {
                    return BadRequest(new {message = "Derogation not found"});
                }
            }

            if (_configuration["FileStore:Upload:MaxSizeMb"] != "" 
                && uploadFile.Length > (int.Parse(_configuration["FileStore:Upload:MaxSizeMb"]) * 1024 * 1024))
            {
                return BadRequest(new { message = "File is to large" });
            }

            var guidFileName = "guid." + Guid.NewGuid() + "." + uploadFile.FileName;
            
            var path = Path.Combine(_path, guidFileName);

            await using (var fileStream = new FileStream(path, FileMode.Create))
            {
                await uploadFile.CopyToAsync(fileStream);
            }

            var derogationDoc = new DerogationDoc
            {
                DerogationID = derogation.DerogationId,
                DerogationUser = author.DerogationUser,
                Department = author.Department,
                DocName = guidFileName,
                InsertedDate = DateTime.Now,
                FileType = uploadFile.ContentType
            };

            if (derogation.DerogationId == 0)
            {
                await _db.DerogationDocs.AddAsync(derogationDoc);
                await _db.SaveChangesAsync();
                derogation.DerogationDocs.Add(derogationDoc);
                return Ok(derogation);
            }
            
            await _db.DerogationDocs.AddAsync(derogationDoc);
            await _db.SaveChangesAsync();
            derogation = _derogationService.GetDerogation(derogationId);

            return Ok(derogation);
        }

        [HttpGet("file/{fileId}")]
        public async Task<IActionResult> GetFile(long fileId)
        {
            var dergDoc = await _db.DerogationDocs.FirstOrDefaultAsync(dd => dd.Id == fileId);
            var path = Path.Combine(_path, dergDoc.DocName.Trim());

            var fileInfo = new FileInfo(path);

            return PhysicalFile(path, dergDoc.FileType ?? "application/" + fileInfo.Extension);
        }

        [HttpGet("delete/{fileId}")]
        public IActionResult Delete(long fileId)
        {
            var dergDoc = _db.DerogationDocs.FirstOrDefault(doc => doc.Id == fileId);

            if (dergDoc == null)
            {
                return BadRequest(new {message = "File not found"});
            }

            var path = Path.Combine(_path, dergDoc.DocName.Trim());

            var fileInfo = new FileInfo(path);
            fileInfo.Delete();

            _db.DerogationDocs.Remove(dergDoc);
            _db.SaveChanges();

            var derogation = dergDoc.DerogationID != 0 
                ? _derogationService.GetDerogation(dergDoc.DerogationID) 
                : new DerogationHeader{DerogationId = 0};

            return Ok(derogation);
        }
    }
}