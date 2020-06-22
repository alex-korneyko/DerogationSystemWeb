using System.Collections.Generic;

namespace DerogationSystemWeb.Model.Domain
{
    public class EmailLetter
    {
        public List<User> Recipients { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public EmailLetter(List<User> recipients, string subject, string body)
        {
            Recipients = recipients;
            Subject = subject;
            Body = body;
        }
    }
}