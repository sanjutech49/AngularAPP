using System.Collections.Generic;
using System.Linq;

namespace Aps.ManageIT
{
    public class Domain : LogAttribute
    {
        #region [Properties & Fields]
        private const string ExceptionStatus = "412";
     
        public string DomainId { get; set; }
 
        public string DomainName { get; set; }      

        public string DomainIdentifier { get; set; }
        
        public List<ContentType> ContentTypes { get; set; }

        public bool IsUserDefinedDomain { get; set; } = true;

        private List<ErrorMessage> errorMessageList = new List<ErrorMessage>();

        #endregion

        #region [Constructor]
        public Domain()
        {
            this.ContentTypes = new List<ContentType> ();
        }
        #endregion

        #region [ Public method to validate the fields]

        public bool Validate(EnumAction action)
        {
            try
            {
                // Validation for Domain Name
                if (Validation.IsNullOrEmpty(this.DomainName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Domain name is required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 32, this.DomainName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Domain Name must be less than or equal to 32 characters", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                // Validation for Domain Identifier
                if (Validation.IsNullOrEmpty(this.DomainIdentifier))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Domain identifier is required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 32, this.DomainIdentifier))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Domain Identifier must be less than or equal to 32 characters", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                ErrorMessage = errorMessageList.AsEnumerable();

                return errorMessageList.Count > 0 ? false : true;

            }
            catch 
            {               
                ErrorMessage = errorMessageList.AsEnumerable();
                return false;
            }
          
        }
        #endregion
    }
}
