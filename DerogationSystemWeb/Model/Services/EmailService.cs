using System;
using System.Text;
using System.Threading.Tasks;
using MailKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace DerogationSystemWeb.Model.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Derogation system Bot", "oleksandr.korneiko@tpv-tech.com"));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using var client = new SmtpClient(new ProtocolLogger("C:\\Alex\\smtp.log"));

            var host = _configuration["Mail:SMTP:SMTPServer"];
            var port = int.Parse(_configuration["Mail:SMTP:Port"]);
            var useSsl = bool.Parse(_configuration["Mail:SMTP:UseSSL"]);
            var userName = _configuration["Mail:SMTP:Username"];
            var password = _configuration["Mail:SMTP:Password"];

            client.ServerCertificateValidationCallback = (s, c, h, e) => true;
            
            client.Connect(host, port, SecureSocketOptions.Auto);
            client.Authenticate(userName, password);
            client.Send(emailMessage);
            
            await client.DisconnectAsync(true);
        }
    }
}