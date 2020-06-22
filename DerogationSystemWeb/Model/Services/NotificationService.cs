using System.Collections.Generic;
using DerogationSystemWeb.Model.Domain;
using Microsoft.AspNetCore.SignalR;

namespace DerogationSystemWeb.Model.Services
{
    public class NotificationService
    {
        private readonly EmailService _emailService;
        private readonly WebSocketService _webSocketService;

        public NotificationService(EmailService emailService, WebSocketService webSocketService)
        {
            _emailService = emailService;
            _webSocketService = webSocketService;
        }

        public void NewDerogationIssued(DerogationHeader derogation)
        {
            
        }

        private EmailLetter GenerateNewDerogationMessage(DerogationHeader derogationHeader)
        {
            var subject = "New derogation issued";

            var body = "A new derogation has been issued" +
                       "\\nAuthor: {0}, Department: {1}" +
                       "\\n<a href=\"http://localhost:4200/derogations/derogation/{3}\">Link to Derogation</a>" +
                       "\\nThis message was generated automatically. There is no need to respond to it." +
                       "\\nRespectfully. Derogation system Bot.";
            
            return new EmailLetter(new List<User>(), subject, body);
        }
            
    }
}