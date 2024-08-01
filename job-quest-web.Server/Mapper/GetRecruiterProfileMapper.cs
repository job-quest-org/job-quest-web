using job_quest_dotnet.Models;
using Microsoft.Data.SqlClient;

namespace job_quest_dotnet.Mapper
{
    public static class GetRecruiterProfileMapper
    {
        public static RecruiterProfile MapObject(SqlDataReader reader)
        {
            RecruiterProfile userProfile = new RecruiterProfile();
            try
            {
                while (reader.Read())
                {
                    userProfile.Email = reader.IsDBNull(0) ? null : reader.GetString(0);
                    userProfile.FirstName = reader.IsDBNull(1) ? null : reader.GetString(1);
                    userProfile.LastName = reader.IsDBNull(2) ? null : reader.GetString(2);
                    userProfile.Phone = reader.IsDBNull(3) ? null : reader.GetString(3);
                    userProfile.Country = reader.IsDBNull(4) ? null : reader.GetString(4);
                    userProfile.State = reader.IsDBNull(5) ? null : reader.GetString(5);
                    userProfile.City = reader.IsDBNull(6) ? null : reader.GetString(6);
                    userProfile.Position = reader.IsDBNull(7) ? null : reader.GetString(7);
                    userProfile.LinkedInProfile = reader.IsDBNull(8) ? null : reader.GetString(8);
                }
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return userProfile;
        }
    }
}
