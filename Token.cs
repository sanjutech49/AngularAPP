using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class Token
    {
        public int TokenId { get; set; }        
        public string AuthToken { get; set; }
        public System.DateTime IssuedOn { get; set; }
        public System.DateTime ExpiresOn { get; set; }
        public bool IsActive { get; set; }
        public User user { get; set; }

        /// <summary>
        /// Public method to get token from IDP against the provided user name 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="authToken"></param>
        /// <returns>int</returns>
        public Token GetToken(string userName, string password)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Public method to validate the token stored in the database against the provided token id 
        /// </summary>
        /// <param name="tokenId"></param>        
        /// <returns>bool</returns>
        public bool ValidateToken(string tokenId)
        {
            throw new NotImplementedException();
        }
    }
}
