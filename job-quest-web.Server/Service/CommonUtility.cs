using Amazon;
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Security.Claims;
namespace job_quest_web.Server.Service
{
    public static class CommonUtility 
    {
        public static string GetUserEmail(HttpContext context)
        {
            return context.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value ?? string.Empty;
        }
       
    }
}