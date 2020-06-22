using System.Collections.Generic;
using System.Threading.Tasks;
using DerogationSystemWeb.Model.Domain;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;

namespace DerogationSystemWeb.Model.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(EmailLetter emailLetter)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Derogation system Bot", "oleksandr.korneiko@tpv-tech.com"));
            emailLetter.Recipients.ForEach(user => emailMessage.To.Add(new MailboxAddress(user.DerogationUser, user.UserMailBase)));
            emailMessage.Subject = emailLetter.Subject;
            emailMessage.Body = new TextPart(TextFormat.Html)
            {
                Text = emailLetter.Body
            };

            using var client = new SmtpClient();

            var host = _configuration["Mail:SMTP:SMTPServer"];
            var port = int.Parse(_configuration["Mail:SMTP:Port"]);
            var useTls = bool.Parse(_configuration["Mail:SMTP:UseTLS"]);
            var userName = _configuration["Mail:SMTP:Username"];
            var password = _configuration["Mail:SMTP:Password"];

            client.ServerCertificateValidationCallback = (s, c, h, e) => true;
            
            await client.ConnectAsync(host, port, useTls ? SecureSocketOptions.StartTls : SecureSocketOptions.None);
            await client.AuthenticateAsync(userName, password);
            await client.SendAsync(emailMessage);
            
            await client.DisconnectAsync(true);
        }
        
        
    }
}