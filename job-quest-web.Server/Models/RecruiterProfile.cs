using System.Data;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;

namespace job_quest_dotnet.Models
{
    public class RecruiterProfile
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Position { get; set; }
        public string LinkedInProfile { get; set; }

    }
}
