using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    
    public class ImageLibrary : LogAttribute
    {

        #region constructor
        public ImageLibrary()
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

        public List<SearchInterface> SearchInterfaces { get; set; }

        private const string ExceptionStatus = "412";
        public string ImageLibraryId { get; set; }
        
        public string SingularName { get; set; }

        public string PluralName { get; set; }

        public string Identifier { get; set; }
        public string DomainId { get; set; }
        public bool? IsContext { get; set; }
        public OwnerTypes SelectedOwnerTypes { get; set; }

        public List<string> SelectedDimensions { get; set; }

        public List<string> SelectedPaperTypes { get; set; }

        public List<string> SelectedFinishes { get; set; }

        public FileTypes ImageFileTypes { get; set; }
        public Presentation ContentTypePresentations { get; set; }

        private List<ErrorMessage> errorMessageList = new List<ErrorMessage>();

        public bool Validate()
        {
            try
            {
                // Validation for Singular Name
                if (Validation.IsNullOrEmpty(this.SingularName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Singular Name isRequired", "412");
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 32, this.SingularName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Singular Name cannot be greater than 32 characters.", "412");
                    errorMessageList.Add(errorMessage);
                }



                // Validation for Plural Name
                if (Validation.IsNullOrEmpty(this.PluralName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Plural Name is Required","412");
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 32, this.PluralName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Plural Name cannot be greater than 32 characters.", "412");
                    errorMessageList.Add(errorMessage);
                }


                // Validation for Identifier
                if (Validation.IsNullOrEmpty(this.Identifier))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Identifier is Required", "412");
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 32, this.Identifier))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Identifier cannot be greater than 32 characters", "412");
                    errorMessageList.Add(errorMessage);
                }
                else if (!Regex.Match(Identifier, "^[a-zA-Z0-9]*$", RegexOptions.IgnoreCase).Success)
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invaild characters for Identifier. Please specify a vaild identifier.", "412");
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

    public class OwnerTypes
    {
         public List<SelectedImageAttribute> SelectedImages { get; set; }
    }

    public class SelectedImageAttribute
    {
        public string DomainId { get; set; }
        
        public string ContentTypeId { get; set; }

        public string AttributeId { get; set; }

        public string DomainName { get; set; }

        public string ContentTypeName { get; set; }

        public string AttributeName { get; set; }

        public List<SelectedSearch> SearchOption { get; set; }
    }

    public class SelectedSearch
    {
        public string DomainId { get; set; }

        public string ContentTypeId { get; set; }

        public string SearchId { get; set; }

        public string DomainName { get; set; }

        public string ContentTypeName { get; set; }

        public string SearchName { get; set; }
    }

    public class ImageLibraryDimensions : LogAttribute
    {
        public string Id { get; set; }

        public string DimensionUnit { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public int Dpi { get; set; }
    }

    public class ImageLibraryPaperTypes : LogAttribute
    {
        private const string ExceptionStatus = "412";
        public string Id { get; set; }

        public string Name { get; set; }
        private List<ErrorMessage> errorMessageList = new List<ErrorMessage>();

        public bool? IsAllowAnyPaperType { get; set; }
        public bool Validate()
        {
            try
            {
                // Validation for Singular Name
                if (Validation.IsNullOrEmpty(this.Name))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Paper Type Title is Required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 32, this.Name))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Paper Type Title cannot be greater than 32 characters.", ExceptionStatus);
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


    public class ImageLibraryFinishes :LogAttribute
    {
        private const string ExceptionStatus = "412";
        public string Id { get; set; }

        public string Name { get; set; }

        public bool? IsAllowAnyFinishes { get; set; }
        private List<ErrorMessage> errorMessageList = new List<ErrorMessage>();
            public bool Validate()
            {
                try
                {
                    // Validation for Singular Name
                    if (Validation.IsNullOrEmpty(this.Name))
                    {
                        ErrorMessage errorMessage = new ErrorMessage("Paper Type Title is Required", ExceptionStatus);
                        errorMessageList.Add(errorMessage);
                    }
                    else if (!Validation.StringLength(1, 32, this.Name))
                    {
                        ErrorMessage errorMessage = new ErrorMessage("Paper Type Title cannot be greater than 32 characters.", ExceptionStatus);
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

    public class FileTypes
    {
        public string AllowedFileTypes { get; set; }

        public string DenyFileTypes { get; set; }

        public bool? IsAllowedAllTypes { get; set; }
    }       
}
