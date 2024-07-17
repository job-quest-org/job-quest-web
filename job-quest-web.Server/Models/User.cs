using System.Data;
using System.Numerics;
using System.Security.Cryptography.Xml;

namespace job_quest_dotnet.Models
{
    public class User
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Phone { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
    }
}
