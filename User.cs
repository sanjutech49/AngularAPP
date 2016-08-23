using Aps.ManageIT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string TokenId { get; set; }
        public string UserEmail { get; set; }
        public Roles  Role { get; set; }
        public string Region { get; set; }
        public string LockoutEndDate { get; set; }
        public string LockoutEnabled { get; set; }
        public string AccessFailedCount { get; set; }
    }
}
