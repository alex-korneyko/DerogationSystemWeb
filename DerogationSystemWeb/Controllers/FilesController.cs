using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using DerogationSystemWeb.Model.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DerogationSystemWeb.Controllers
{
    [ApiController]
    [Route("api/files")]
    public class FilesController: Controller
    {
        private IConfiguration _configuration;
        private readonly ApplicationContext _db;
        private readonly DerogationService _derogationService;

        public FilesController(IConfiguration configuration, ApplicationContext db, DerogationService derogationService)
        {
            _configuration = configuration;
            _db = db;
            _derogationService = derogationService;
        }

        [HttpPost("upload/{derogationId}")]
        public async Task<IActionResult> AddFile(long derogationId, IFormFile uploadFile)
        {
            var author = _db.Users.FirstOrDefault(user => user.DerogationUser == User.Identity.Name);
            if (author == null)
            {
                return BadRequest(new {message = "User not found"});
            }

            var derogation = _derogationService.GetDerogation(derogationId);
            if (derogation == null)
            {
                return BadRequest(new {message = "Derogation not found"});
            }

            if (_configuration["FileStore:Upload:MaxSizeMb"] != "" 
                && uploadFile.Length > (int.Parse(_configuration["FileStore:Upload:MaxSizeMb"]) * 1024 * 1024))
            {
                return BadRequest(new { message = "File is to large" });
            }

            var guidFileName = "guid." + Guid.NewGuid() + "." + uploadFile.FileName;
            var path = _configuration["FileStore:Upload:Path"] + "\\" + guidFileName;

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
                InsertedDate = DateTime.Now
            };

            _db.DerogationDocs.Add(derogationDoc);
            _db.SaveChanges();

            derogation = _derogationService.GetDerogation(derogationId);

            return Ok(derogation);
        }

        [HttpGet("delete/{fileId}")]
        public IActionResult Delete(long fileId)
        {
            var dergDoc = _db.DerogationDocs.FirstOrDefault(doc => doc.Id == fileId);

            if (dergDoc == null)
            {
                return BadRequest(new {message = "File not found"});
            }

            var path = _configuration["FileStore:Upload:Path"] + "\\" + dergDoc.DocName;

            var fileInfo = new FileInfo(path);
            fileInfo.Delete();

            _db.DerogationDocs.Remove(dergDoc);
            _db.SaveChanges();

            var derogation = _derogationService.GetDerogation(dergDoc.DerogationID);

            return Ok(derogation);
        }
    }
}