using System.Collections.Generic;
using DerogationSystemWeb.Model.Domain;

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

        public async void NewDerogationIssued(DerogationHeader derogation, List<User> recipients)
        {
            _emailService.SendEmailAsync(GenerateNewDerogationMessage(derogation, recipients));

            await _webSocketService.WebSocketSendAsync(SendObjectType.Derogation, SendActionType.Create, derogation);
        }
        
        public async void ApproveDerogation(DerogationHeader derogation, List<User> recipients)
        {
            _emailService.SendEmailAsync(GenerateDerogationNextLevelForApproveMessage(derogation, recipients));
            
            await _webSocketService.WebSocketSendAsync(SendObjectType.Derogation, SendActionType.Update, derogation);
        }

        public async void EngAndFlOptions(DerogationHeader derogation, List<User> recipients)
        {
            _emailService.SendEmailAsync(GenerateEngAndFlChangeMessage(derogation, recipients));

            await _webSocketService.WebSocketSendAsync(SendObjectType.Derogation, SendActionType.Update, derogation);
        }
        
        public async void DerogationCancelled(DerogationHeader derogation, List<User> recipients)
        {
            _emailService.SendEmailAsync(GenerateDerogationCancelMessage(derogation, recipients));
            
            await _webSocketService.WebSocketSendAsync(SendObjectType.Derogation, SendActionType.Update, derogation);
        }
        
        public async void DerogationCancelRequest(DerogationHeader derogation, User author)
        {
            _emailService.SendEmailAsync(GenerateCancelRequestMessage(derogation, author));
            
            await _webSocketService.WebSocketSendAsync(SendObjectType.Derogation, SendActionType.Update, derogation);
        }

        private static EmailLetter GenerateNewDerogationMessage(DerogationHeader derogationHeader,
            List<User> recipients)
        {
            var subject = "New derogation has been issued";

            var body = "New derogation has been issued" +
                       $"</br>Author: {derogationHeader.Owner}, Department: {derogationHeader.Department}" +
                       $"</br><a href=\"http://localhost:4200/derogations/derogation/{derogationHeader.DerogationId.ToString()}\">Derogation {derogationHeader.DerogationId}</a>" +
                       "</br></br>This message was generated automatically. There is no need to respond to it." +
                       "</br>Best regards. Derogation Bot.";

            return new EmailLetter(recipients, subject, body);
        }

        private static EmailLetter GenerateEngAndFlChangeMessage(DerogationHeader derogation, List<User> recipients)
        {
            var subject = "Derogation Eng and Fl options have been changed";

            var body = "Eng and Fl options have been changed" +
                       $"</br><a href=\"http://localhost:4200/derogations/derogation/{derogation.DerogationId}\">Derogation {derogation.DerogationId}</a>" +
                       "</br></br>This message was generated automatically. There is no need to respond to it." +
                       "</br>Best regards. Derogation Bot.";
            
            return new EmailLetter(recipients, subject, body);
        }

        private static EmailLetter GenerateDerogationNextLevelForApproveMessage(DerogationHeader derogation, List<User> recipients)
        {
            var subject = $"The Derogation Id:{derogation.DerogationId} is awaiting your approval";

            var body = $"The Derogation Id:{derogation.DerogationId} is awaiting your approval" + 
                       $"</br><a href=\"http://localhost:4200/derogations/derogation/{derogation.DerogationId}\">Derogation {derogation.DerogationId}</a>" +
                       "</br></br>This message was generated automatically. There is no need to respond to it." +
                       "</br>Best regards. Derogation Bot.";
            
            return new EmailLetter(recipients, subject, body);
        }

        private static EmailLetter GenerateDerogationCancelMessage(DerogationHeader derogation, List<User> recipients)
        {
            var subject = $"Derogation Id:{derogation.DerogationId} canceled";

            var body = "Status changed to \"Cancel\"" +
                       $"</br><a href=\"http://localhost:4200/derogations/derogation/{derogation.DerogationId}\">Derogation {derogation.DerogationId}</a>" +
                       "</br></br>This message was generated automatically. There is no need to respond to it." +
                       "</br>Best regards. Derogation Bot.";
            
            return new EmailLetter(recipients, subject, body);
        }
        
        private static EmailLetter GenerateCancelRequestMessage(DerogationHeader derogation, User author)
        {
            var subject = $"Derogation Id:{derogation.DerogationId} cancellation request";
            
            var body = $"{author.DerogationUser} requested a Derogation cancellation" +
                       $"</br><a href=\"http://localhost:4200/derogations/derogation/{derogation.DerogationId}\">Derogation {derogation.DerogationId}</a>" +
                       "</br></br>This message was generated automatically. There is no need to respond to it." +
                       "</br>Best regards. Derogation Bot.";
            
            return new EmailLetter(new List<User> {derogation.Author}, subject, body);
        }
    }
}