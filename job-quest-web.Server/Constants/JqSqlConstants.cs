namespace job_quest_dotnet.JQSqlConstants
{
    public static class JQSqlConstants
    {
        //Sql inline queries
        public const string SpUserProfileVerification = "SP_UserProfileVerification";
        public const string GetCandidateCount = "select count(*) from tbl_jq_candidate";
        public const string GetCandidateList = "select CONCAT(first_name, ' ', last_name) from tbl_jq_user";
        public const string GetUserProfileSql = "select u.email, u.first_name, u.last_name, u.phone, u.country , u.state, u.city, " +
            "c.degree, c.location, c.experience, c.department, c.skillset, c.cv_doc " +
            "from tbl_JQ_User u left join tbl_JQ_Candidate c on u.email = c.email where u.email = @email ;";
        public const string GetAllUserProfileSql = "select u.email, u.first_name, u.last_name, u.phone, u.country , u.state, u.city, " +
            "c.degree, c.location, c.experience, c.department, c.skillset, c.cv_doc " +
            "from tbl_JQ_User u left join tbl_JQ_Candidate c on u.email = c.email;";
        public const string SpUpdateCandidateProfile = "SP_Update_CandidateProfile";
        public const string SpUpdateRecruiterProfile = "SP_Update_RecruiterProfile";
        public const string GetJobsList = "SELECT job_id, job_title, job_description, salary, skillset, degree, recruiter_email, start_date, end_date, join_date, experience,status,location,job_mode,created_at, updated_at FROM tbl_JQ_Job WHERE status = 'Open'";
    }
}
