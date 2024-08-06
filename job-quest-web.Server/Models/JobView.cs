using System;
namespace job_quest_dotnet.Models
{

    public class JobView
    {
        public int JobId { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public string Salary { get; set; } // JSON format
        public string Skillset { get; set; } // JSON format
        public string Degree { get; set; }
        public string RecruiterEmail { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string JoinDate { get; set; }
        public int? Experience { get; set; }
        public string Status { get; set; }
        public string Location { get; set; }
        public string JobMode { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}