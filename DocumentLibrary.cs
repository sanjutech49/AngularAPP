using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static Aps.ManageIT.ImageLibraryPaperTypes;

namespace Aps.ManageIT
{
    public class DocumentLibrary : LogAttribute
    {

        #region constructor
        public DocumentLibrary()
        {
            AttributeSetList = new List<AttributeSet>();
            Attributes = new List<BaseAttribute>();
            Classifications = new List<Classification>();
            SubObjects = new List<SubObject>();
            Compositions = new List<Composition>();
            ListItems = new List<ListUserInterfaces>();
            ViewItems = new List<ViewUserInterfaces>();
            EditItems = new List<EditUserInterfaces>();
            Layouts = new List<Layouts>();
            Permissions = new List<Permissions>();
            SearchInterfaces = new List<SearchInterface>();
        }
        #endregion
        public List<BaseAttribute> Attributes { get; set; }
        public List<AttributeSet> AttributeSetList { get; set; }
        public List<Classification> Classifications { get; set; }

        public List<SubObject> SubObjects { get; set; }

        public List<Composition> Compositions { get; set; }

        public List<ListUserInterfaces> ListItems { get; set; }

        public List<ViewUserInterfaces> ViewItems { get; set; }

        public List<EditUserInterfaces> EditItems { get; set; }

        public List<Layouts> Layouts { get; set; }

        public List<Permissions> Permissions { get; set; }
        public Presentation ContentTypePresentations { get; set; }
        public List<SearchInterface> SearchInterfaces { get; set; }
        private const string ExceptionStatus = "412";

        public string DocumentLibraryId { get; set; }

        //public string Name { get; set; }

        public string SingularName { get; set; }

        public string PluralName { get; set; }

        public string Identifier { get; set; }
        public string DomainId { get; set; }

        public string DocumentName { get; set; }
        public bool? IsContext { get; set; }
        public FileTypes DocumentFileTypes { get; set; }

        private List<ErrorMessage> errorMessageList = new List<ErrorMessage>();

        public bool Validate()
        {
            try
            {
                // Validation for Singular Name
                if (Validation.IsNullOrEmpty(this.SingularName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Document Singular Name is Required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 32, this.SingularName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Document Singular Name cannot be greater than 32 characters.", ExceptionStatus);
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
    }
}
