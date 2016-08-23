using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class ObjectReferenceAttribute : BaseAttribute
    {
        public bool? EditContentTypeBehaviour { get; set; }

        public bool? ViewContentTypeBehaviour { get; set; }

        public ReferenceSelectionMethod RefselectionMethod { get; set; }

        public bool? IsAnyContentType { get; set; }

        public List<AcceptedContentType> AcceptedContentTypes { get; set; }

        public SearchReferenceTypeDisplay SearchDisplay { get; set; }

        public SelectReferenceTypeDisplay SelectDisplay { get; set; }

        public LookupReferenceTypeDisplay LookupDisplay { get; set; }

        public List<SelectedSearchOption> SelectedSearch { get; set; }

        public ContentTypeColumns DetailsColumns { get; set; }

        public ContentTypeColumns LookupColumns { get; set; }

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

    public class ContentTypeRow
    {
        public string ContentTypeId { get; set; }

        public List<ContentTypeCell> Cells { get; set; }
    }

    public class ContentTypeCell
    {
        public string ColumnName { get; set; }

        public string AttributeId { get; set; }
    }

    public class ContentTypeColumns
    {
        public List<ContentTypeRow> Rows { get; set; }

        public List<string> Columns { get; set; }
    }

    public enum SearchReferenceTypeDisplay
    {
        Icons,
        List,
        Details
    }

    public enum SelectReferenceTypeDisplay
    {
        Icons,
        List,
        Details,
        Dropdown
    }

    public enum LookupReferenceTypeDisplay
    {
        SingleValueLookup,
        MultiValueLookup,
    }


    public enum ReferenceSelectionMethod
    {
        Search,
        Select,
        Lookup
    }

    public class SelectedUserInterface
    {
        public string UserInterfaceId { get; set; }
        public bool? IsDefault { get; set; }
    }

    public class SelectedLayout
    {
        public string LayoutId { get; set; }
        public bool? IsDefault { get; set; }
    }

    public class SelectedSearchOption
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int? SearchOrder { get; set; }
    }

    public class SelectedClassifications
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class AcceptedContentType
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public bool? IsAnyClassification { get; set; }

        public List<string> SelectedClassifications { get; set; }
        public List<SelectedUserInterface> SelectedUserInterfaces { get; set; }
        public List<SelectedLayout> SelectedLayouts { get; set; }
    }


}
