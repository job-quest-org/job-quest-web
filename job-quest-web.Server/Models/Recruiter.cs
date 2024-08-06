using System.Data;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;

namespace job_quest_dotnet.Models
{
    public class Recruiter
    {
        public long Rid { get; set; } 
        public string Email { get; set; }
        public string Position { get; set; }
        public string LinkedInProfile { get; set; }

    }
}
