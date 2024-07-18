namespace job_quest_dotnet.JQSqlConstants
{
    public static class JQSqlConstants
    {
        //Sql inline queries
        public const string GetCandidateCount = "select count(*) from tbl_jq_candidate";
        public const string GetCandidateList = "select CONCAT(first_name, ' ', last_name) from tbl_jq_user";
        public const string GetUserProfile = "select u.email, u.first_name, u.last_name, u.phone, u.country , u.state, u.city, " +
            "c.degree, c.location, c.experience, c.department, c.skillset, c.cv_doc " +
            "from tbl_JQ_User u left join tbl_JQ_Candidate c on u.email = c.email where u.email = @email;";

    }
}
