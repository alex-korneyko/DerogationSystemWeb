using System;
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

        public async void SendEmailAsync(EmailLetter emailLetter)
        {
            var host = _configuration["Mail:SMTP:SMTPServer"];
            
            var port = 0;
            try
            {
                port = int.Parse(_configuration["Mail:SMTP:Port"]);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            
            var useTls = _configuration["Mail:SMTP:UseTLS"] == "true";
            var userName = _configuration["Mail:SMTP:Username"];
            var password = _configuration["Mail:SMTP:Password"];
            var domain = _configuration["Mail:SMTP:Domain"];

            if (host == "" || port == 0 || userName == "" || password == "" || domain == "")
            {
                return;
            }
            
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Derogation system Bot", "oleksandr.korneiko@tpv-tech.com"));
            emailLetter.Recipients.ForEach(user => emailMessage.To.Add(new MailboxAddress(user.DerogationUser, user.UserMailBase + "@" + domain)));
            emailMessage.Subject = emailLetter.Subject;
            emailMessage.Body = new TextPart(TextFormat.Html)
            {
                Text = emailLetter.Body
            };

            using var client = new SmtpClient
            {
                ServerCertificateValidationCallback = (s, c, h, e) => true
            };


            await client.ConnectAsync(host, port, useTls ? SecureSocketOptions.StartTls : SecureSocketOptions.None);
            await client.AuthenticateAsync(userName, password);
            await client.SendAsync(emailMessage);
            
            await client.DisconnectAsync(true);
        }
        
        
    }
}