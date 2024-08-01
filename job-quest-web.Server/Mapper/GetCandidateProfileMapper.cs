using job_quest_dotnet.Models;
using Microsoft.Data.SqlClient;

namespace job_quest_dotnet.Mapper
{
    public static class GetCandidateProfileMapper
    {
        public static CandidateProfile MapObject(SqlDataReader reader)
        {
            CandidateProfile userProfile = new CandidateProfile();
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
                    userProfile.Degree = reader.IsDBNull(7) ? null : reader.GetString(7);
                    userProfile.Location = reader.IsDBNull(8) ? null : reader.GetString(8);
                    userProfile.Experience = reader.IsDBNull(9) ? null : reader.GetInt32(9);
                    userProfile.Department = reader.IsDBNull(10) ? null : reader.GetString(10);
                    userProfile.Skillset = reader.IsDBNull(11) ? null : reader.GetString(11);
                    userProfile.CvDoc = reader.IsDBNull(12) ? null : reader.GetString(12);
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
