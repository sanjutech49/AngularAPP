using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class DocumentReferenceAttribute : BaseAttribute
    {
        public bool? EditDocumentBehaviour { get; set; }

        public bool? ViewDocumentBehaviour { get; set; }

        public List<AcceptedDocumentType> AcceptedDocumentType { get; set; }

        public List<DocumentRole> DocumentRoles { get; set; }

        public bool? CanUserCreateDocumentFolder { get; set; }

        public override bool Validate()
        {
            // Validation for Attribute Name
            if (Validation.IsNullOrEmpty(this.Name))
            {
                ErrorMessage errorMessage = new ErrorMessage("Attribute Name is Required", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }
            else if (Name.Length > 64)
            {
                ErrorMessage errorMessage = new ErrorMessage("Attribute Name cannot be greater than 64 characters", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }


            // Validation for Attribute Identifier
            if (Validation.IsNullOrEmpty(this.Identifier))
            {
                ErrorMessage errorMessage = new ErrorMessage("Attribute Identifier is Required", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }
            else if (Identifier.Length > 64)
            {
                ErrorMessage errorMessage = new ErrorMessage("Attribute Identifier cannot be greater than 64 characters", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }

            // Validation for Attribute Description
            if (Description != null && Description.Length > 128)
            {
                ErrorMessage errorMessage = new ErrorMessage("Description cannot be greater than 128 characters.", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }

            if (MultipleValues != null && !Validation.IsValidRange(0, 999, MultipleValues.MinimumValue))
            {
                ErrorMessage errorMessage = new ErrorMessage("Minimum value must be between 0 and 999", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }

            if (MultipleValues != null && !Validation.IsValidRange(0, 999, MultipleValues.MaximumValue))
            {
                ErrorMessage errorMessage = new ErrorMessage("Minimum value must be between 0 and 999", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }

            ErrorMessage = errorMessageList.AsEnumerable();

            return errorMessageList.Count > 0 ? false : true;
        }
    }

    public class DocumentRole
    {
        public string RoleName { get; set; }

        public bool? IsDefault { get; set; }
    }

    public class DocumentAttributeLinkedSource
    {
        public List<DocumentAttributeFromContentType> SelectedDocAttribute { get; set;}

        public List<DocumentAttributeFromDocLibrary> SelectedDocLibrary { get; set; }

        public List<SelectedSearchOption> SearchOption { get; set; }
    }

    public class DocumentAttributeFromContentType
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class DocumentAttributeFromDocLibrary
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class AdditionalDocumentLinkingProperties
    {
        public bool? CanUserUploadNewDocuments { get; set; }
        public bool? CanUserLinkToExistingDocuments { get; set; }
        public bool? IsCurrentObject { get; set; }

        public DocumentAttributeLinkedSource LinkedSources { get; set; }
    }

    public class AcceptedDocumentType
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<SelectedClassifications> SelectedClassifications { get; set; }
        public AdditionalDocumentLinkingProperties AdditionalLinkingProperties { get; set; }
    }
}
