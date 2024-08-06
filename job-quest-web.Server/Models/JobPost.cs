using System;
namespace job_quest_dotnet.Models
{
    public class JobPost
    {
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public string Salary { get; set; }
        public string Skillset { get; set; }
        public string Degree { get; set; }
        public string RecruiterEmail { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string JoinDate { get; set; }
        public int? Experience { get; set; }
        public string Status { get; set; }
        public string Location { get; set; }
        public string JobMode { get; set; }
    }
}