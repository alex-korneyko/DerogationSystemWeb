using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace DerogationSystemWeb.Model.Services
{
    public class WebSocketService
    {
        private readonly IHubContext<HubService> _hubContext;

        public WebSocketService(IHubContext<HubService> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task WebSocketSendAsync(SendObjectType sendObjectType, SendActionType sendActionType, object payload)
        {
            await _hubContext.Clients.All.SendAsync(sendObjectType.ToString(), payload, sendActionType);
        }
            
    }
}