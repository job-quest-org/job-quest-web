using job_quest_dotnet.Models;
using Microsoft.Data.SqlClient;

namespace job_quest_dotnet.Mapper
{
    public static class GetUserProfileMapper
    {
        public static List<UserProfile> MapObject(SqlDataReader reader)
        {
            List<UserProfile> userProfiles = new List<UserProfile>();

            while (reader.Read())
            {
                var userProfile = new UserProfile
                {
                    Email = reader.GetString(0),
                    FirstName = reader.GetString(1),
                    LastName = reader.GetString(2), 
                    Phone = reader.GetInt32(3),
                    Country = reader.GetString(4),
                    State = reader.GetString(5),
                    City = reader.GetString(6),
                    Degree = reader.GetString(7),
                    Location = reader.GetString(8),
                    Experience = reader.GetInt32(9),
                    Department = reader.GetString(10),  
                    Skillset = reader.GetString(11),
                    CvDoc = reader.GetString(12)
                };
                userProfiles.Add(userProfile);
            }
            return userProfiles;
        }
    }
}
