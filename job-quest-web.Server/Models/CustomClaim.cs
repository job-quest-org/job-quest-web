namespace job_quest_web.Server.Models
{
    public class CustomClaim
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Issuer { get; set; }
        public string IsAuthenticated { get; set; }
        public string UserType { get; set; }
    }
}
