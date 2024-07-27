using job_quest_dotnet.Models;
using Microsoft.Data.SqlClient;

namespace job_quest_dotnet.Mapper
{
    public static class GetAllUserProfileMapper
    {
        public static List<CandidateProfile> MapObject(SqlDataReader reader)
        {
            List<CandidateProfile> userProfiles = new List<CandidateProfile>();
            try
            {
                while (reader.Read())
                {
                    var userProfile = new CandidateProfile
                    {
                        Email = reader.IsDBNull(0) ? null : reader.GetString(0),
                        FirstName = reader.IsDBNull(1) ? null : reader.GetString(1),
                        LastName = reader.IsDBNull(2) ? null : reader.GetString(2),
                        Phone = reader.IsDBNull(3) ? null : reader.GetString(3),
                        Country = reader.IsDBNull(4) ? null : reader.GetString(4),
                        State = reader.IsDBNull(5) ? null : reader.GetString(5),
                        City = reader.IsDBNull(6) ? null : reader.GetString(6),
                        Degree = reader.IsDBNull(7) ? null : reader.GetString(7),
                        Location = reader.IsDBNull(8) ? null : reader.GetString(8),
                        Experience = reader.IsDBNull(9) ? null : reader.GetInt32(9),
                        Department = reader.IsDBNull(10) ? null : reader.GetString(10),
                        Skillset = reader.IsDBNull(11) ? null : reader.GetString(11),
                        CvDoc =  reader.IsDBNull(12) ? null : reader.GetString(12)
                    };
                    userProfiles.Add(userProfile);
                }
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return userProfiles;
        }
    }
}
