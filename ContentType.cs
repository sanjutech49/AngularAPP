using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class ContentType : LogAttribute
    {
        #region [Properties & Fields]
       
        private const string ExceptionStatus = "412";

        public List<BaseAttribute>  DefaultAttributes { get; set; }

        public string ContentTypeId { get; set; }

        public string SingularName { get; set; }

        public string PluralName { get; set; }

        public string Identifier { get; set; }

        public string DomainId { get; set; }

        public List<AttributeSet> AttributeSetList { get; set; }

        public List<Classification> Classifications { get; set; }

        public List<SubObject> SubObjects { get; set; }

        public List<Composition> Compositions { get; set; }

        public List<ListUserInterfaces> ListItems { get; set; }

        public List<ViewUserInterfaces> ViewItems { get; set; }
        
        public List<EditUserInterfaces> EditItems { get; set; }

        public List<Layouts> Layouts { get; set; }

        public List<Permissions> Permissions { get; set; }

        public List<SearchInterface> SearchInterfaces { get; set; }

        public Presentation ContentTypePresentations { get; set; }

        public bool? IsContext { get; set; }

        public ContentBaseObject ContentObject { get; set; }

        public List<ContentObject> ContentObjects { get; set; }

        private List<ErrorMessage> errorMessageList = new List<ErrorMessage>();

        #endregion

        #region [Constructor]

        public ContentType()
        {
            //this.Domain = new Domain();
            AttributeSetList = new List<AttributeSet>();
            DefaultAttributes = new List<BaseAttribute>();
            Compositions = new List<Composition>();
            ListItems = new List<ListUserInterfaces>();
            ViewItems = new List<ViewUserInterfaces>();
            EditItems = new List<EditUserInterfaces>();
            Layouts = new List<Layouts>();
            Permissions = new List<Permissions>();
            SearchInterfaces = new List<SearchInterface>();
        }

        public ContentType(ObjectType objectType)
        {
            if (objectType == ObjectType.ContentType)
            {
                //this.ContentObject = new ContentObject();
            }
            else if (objectType == ObjectType.ImageType)
            {
                this.ContentObject = new ImageObject();
            }
            else if (objectType == ObjectType.DocumentType)
            {
                this.ContentObject = new DocumentObject();
            }

            //this.Domain = new Domain();
            this.ContentObject = new ContentBaseObject();
            // Initilize the default attribute set
            this.ContentObject.AttributeSets = new List<AttributeSet>();

            this.DefaultAttributes = new List<BaseAttribute>();

        }

        #endregion

        #region [ Public method to validate the fields]
        public bool Validate ()
        {

            try
            {
                // Validation for Singular Name
                if (Validation.IsNullOrEmpty(this.SingularName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Singular Name isRequired", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 32, this.SingularName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Singular Name cannot be greater than 32 characters.", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                


                // Validation for Plural Name
                if (Validation.IsNullOrEmpty(this.PluralName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Plural Name is Required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 32, this.PluralName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Plural Name cannot be greater than 32 characters.", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }


                // Validation for Identifier
                if (Validation.IsNullOrEmpty(this.Identifier))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Identifier is Required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 32, this.Identifier))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Identifier cannot be greater than 32 characters", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Regex.Match(Identifier, "^[a-zA-Z0-9]*$", RegexOptions.IgnoreCase).Success)
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invaild characters for Identifier. Please specify a vaild identifier.", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                ErrorMessage = errorMessageList.AsEnumerable();
                return errorMessageList.Count > 0 ? false : true;
            }
            catch 
            {

                this.ErrorMessage = errorMessageList.AsEnumerable();
                return false;
            }
            
        }
        #endregion

    }

    public enum ObjectType
    {
        ContentType,
        ImageType,
        DocumentType
    }
}
