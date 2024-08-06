using job_quest_dotnet.Models;
using Microsoft.Data.SqlClient;

namespace job_quest_dotnet.Mapper
{
    public static class GetAllJobsListMapper
    {
        public static List<JobView> MapObject(SqlDataReader reader)
        {
            List<JobView> jobsList = new List<JobView>();
            try
            {
                while (reader.Read())
                {
                    var job = new JobView
                    {
                        JobId = reader.GetInt32(0),
                        JobTitle = reader.GetString(1), 
                        JobDescription = reader.GetString(2),
                        Salary = reader.GetString(3),
                        Skillset = reader.GetString(4),
                        Degree = reader.GetString(5),
                        RecruiterEmail = reader.GetString(6),
                        StartDate = reader.GetDateTime(7),
                        EndDate = reader.IsDBNull(8) ? (DateTime?)null : reader.GetDateTime(8),
                        JoinDate = reader.GetString(9), 
                        Experience = reader.IsDBNull(10) ? (int?)null : reader.GetInt32(10),
                        Status = reader.GetString(11),
                        Location = reader.GetString(12), 
                        JobMode = reader.GetString(13),
                        CreatedAt = reader.GetDateTime(14),
                        UpdatedAt = reader.GetDateTime(15)
                    };
                    jobsList.Add(job);
                }
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return jobsList;
        }
    }
}
