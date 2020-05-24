using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net.WebSockets;
using System.Threading.Tasks;
using DerogationSystemWeb.Model.Domain;
using Microsoft.AspNetCore.SignalR;

namespace DerogationSystemWeb.Model.Services
{
    public class NotificationSenderService
    {
        private readonly IHubContext<HubService> _hubContext;

        public NotificationSenderService(IHubContext<HubService> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task SendInteractiveNotification(object payload, SendObjectType objectType, SendActionType actionType)
        {
            await _hubContext.Clients.All.SendAsync(objectType.ToString(), payload);
        }

        public void SendEmailNotification(List<User> recipients, SendObjectType objectType, SendActionType actionType)
        {
            //TODO
            throw new NotImplementedException();
        }
    }
}