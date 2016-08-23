using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class ImageReferenceAttribute : BaseAttribute
    {
        public bool? EditImageBehaviour { get; set; }
        public bool? ViewImageBehaviour { get; set; }
        public ImageSelectionMethod ImgselectionMethod { get; set; }
        public bool? IsAnyImageType { get; set; }
        public List<AcceptedImageType> AcceptedImageTypes { get; set; }
        public List<ImageRole> ImageRoles { get; set; }
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

    public class ImageRole
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }

        public bool? IsDefault { get; set; }
    }

    public enum ImageSelectionMethod
    {
        SearchLink,
        Selection
    }

    public enum ImageCurrentObject
    {
        CurrentObjectOnly,
        CurrentObjectAndOwnerObject

    }

    public class LinkedSource
    {
        public List<ImgAttributeFromContentType> SelectedImgAttribute { get; set; }
        public List<ImgAttributeFromContentType> SelectedImgLibrary { get; set; }
        public List<SelectedSearchOption> SearchOption { get; set; }
    }

    public class ImgAttributeFromContentType
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class AdditionalLinkingProperties
    {
        public bool? CanUserCreateNewImages { get; set; }
        public ImageCurrentObject? IsCurrentObject { get; set; }
        public bool? CanUserLinkToExistingImages { get; set; }
        public LinkedSource LinkedSources { get; set; }
    }

    public class AcceptedImageType
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool? IsAnyClassification { get; set; }
        public List<string> SelectedClassifications { get; set; }
        public AdditionalLinkingProperties AdditionalLinkingProperties { get; set; }
    }


}
