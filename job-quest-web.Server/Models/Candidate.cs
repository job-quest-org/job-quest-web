using System.Data;
using System.Security.Cryptography.Xml;

namespace job_quest_dotnet.Models
{
    public class Candidate
    {
        public long Cid {  get; set; }
        public string Email { get; set; }
        public string Degree { get; set; }
        public string Location { get; set; }
        public int? Experience { get; set; }
        public string Department { get; set; }
        public string Skillset { get; set; }
        public string CvDoc { get; set; }
    }
}
