using System.Data;
using System.Security.Cryptography.Xml;

namespace job_quest_dotnet.Models
{
    public class CandidateProfile
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Degree { get; set; }
        public string Location { get; set; }
        public int? Experience { get; set; }
        public string Department { get; set; }
        public string Skillset { get; set; }
        public string CvDoc { get; set; }
    }
}
