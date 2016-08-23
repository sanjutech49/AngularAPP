using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.Text.RegularExpressions;

namespace Aps.ManageIT
{
    public class ListUserInterfaces : LogAttribute
    {
        public ListUserInterfaces()
        {
            ViewEditClassifications = new List<ViewEditClassification>();
            UploadedTemplateDetails = new List<InterfaceTemplateDetails>();
        }

        public string ListInterfaceId { get; set; }

        public string Name { get; set; }

        public bool? IsEnabled { get; set; }

        public bool? IsAnyClassification { get; set; }

        public List<ViewEditClassification> ViewEditClassifications { get; set; }

        public string ContentTypeId { get; set; }
        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set; }

        public string SubObjectId { get; set; }

        public string ViewNegationOperator { get; set; }

        public int? OrderNo { get; set; }

        public List<InterfaceTemplateDetails> UploadedTemplateDetails { get; set; }

        public bool Validate()
        {
            List<ErrorMessage> errorMessages = new List<ErrorMessage>();
            if (string.IsNullOrEmpty(Name))
            {
                ErrorMessage errorMessage = new ErrorMessage("List interface name is required", "400");
                errorMessages.Add(errorMessage);
            }

            if (!string.IsNullOrEmpty(Name) && Name.Length > 32)
            {
                ErrorMessage errorMessage = new ErrorMessage("List interface name cannot be greater than 32 characters.", "400");
                errorMessages.Add(errorMessage);
            }

            if (!(bool)IsAnyClassification && (ViewEditClassifications != null && ViewEditClassifications.Count == 0))
            {
                ErrorMessage errorMessage = new ErrorMessage("Please select any display conditions.", "400");
                errorMessages.Add(errorMessage);
            }

            ErrorMessage = errorMessages.AsEnumerable();

            return ErrorMessage.Count() == 0;
        }
    }

    public class ViewUserInterfaces : LogAttribute
    {
        public ViewUserInterfaces()
        {
            ViewEditClassifications = new List<ViewEditClassification>();
            UploadedTemplateDetails = new List<InterfaceTemplateDetails>();
        }

        public string ViewInterfaceId { get; set; }

        public string Name { get; set; }

        public bool? IsEnabled { get; set; }

        public bool? IsAnyClassification { get; set; }

        public List<ViewEditClassification> ViewEditClassifications { get; set; }

        public string ContentTypeId { get; set; }
        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set; }

        public string SubObjectId { get; set; }

        public string ViewNegationOperator { get; set; }

        public int? OrderNo { get; set; }

        public List<InterfaceTemplateDetails> UploadedTemplateDetails { get; set; }

        
       


        public bool Validate()
        {
            List<ErrorMessage> errorMessages = new List<ErrorMessage>();
            if (string.IsNullOrEmpty(Name))
            {
                ErrorMessage errorMessage = new ErrorMessage("View interface name is required", "400");
                errorMessages.Add(errorMessage);
            }

            if (!string.IsNullOrEmpty(Name) && Name.Length > 32)
            {
                ErrorMessage errorMessage = new ErrorMessage("View interface name cannot be greater than 32 characters.", "400");
                errorMessages.Add(errorMessage);
            }

            if (!(bool)IsAnyClassification && (ViewEditClassifications != null && ViewEditClassifications.Count == 0))
            {
                ErrorMessage errorMessage = new ErrorMessage("Please select any display conditions.", "400");
                errorMessages.Add(errorMessage);
            }

            ErrorMessage = errorMessages.AsEnumerable();

            return ErrorMessage.Count() == 0;
        }
    }

    public class EditUserInterfaces : LogAttribute
    {
        public EditUserInterfaces()
        {
            ViewEditClassifications = new List<ViewEditClassification>();
            UploadedTemplateDetails = new List<InterfaceTemplateDetails>();
        }

        public string EditInterfaceId { get; set; }

        public string Name { get; set; }

        public bool? IsEnabled { get; set; }

        public bool? IsAnyClassification { get; set; }

        public List<ViewEditClassification> ViewEditClassifications { get; set; }

        public string ContentTypeId { get; set; }
        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set; }

        public string SubObjectId { get; set; }

        public string ViewNegationOperator { get; set; }

        public int? OrderNo { get; set; }

        public List<InterfaceTemplateDetails> UploadedTemplateDetails { get; set; }

        public bool Validate()
        {
            List<ErrorMessage> errorMessages = new List<ErrorMessage>();
            if (string.IsNullOrEmpty(Name))
            {
                ErrorMessage errorMessage = new ErrorMessage("Edit interface name is required", "400");
                errorMessages.Add(errorMessage);
            }

            if (!string.IsNullOrEmpty(Name) && Name.Length > 32)
            {
                ErrorMessage errorMessage = new ErrorMessage("Edit interface name cannot be greater than 32 characters.", "400");
                errorMessages.Add(errorMessage);
            }

            if (!(bool)IsAnyClassification && (ViewEditClassifications != null && ViewEditClassifications.Count == 0))
            {
                ErrorMessage errorMessage = new ErrorMessage("Please select any display conditions.", "400");
                errorMessages.Add(errorMessage);
            }

            ErrorMessage = errorMessages.AsEnumerable();

            return ErrorMessage.Count() == 0;
        }
    }

    public class InterfaceTemplateDetails : LogAttribute
    {
        public string TemplateId { get; set; }

        public string FileName { get; set; }

        public string FileDetails { get; set; }

        public string FileVersion { get; set; }

        public bool? IsActive { get; set; }

        public DateTime? CreatedDateTime { get; set; } = DateTime.UtcNow;

        public DateTime? UploadDateTime { get; set; } = DateTime.UtcNow;

        public DateTime? ModifiedDateTime { get; set; } = DateTime.UtcNow;

        public DateTime? ViewDateTime { get; set; } = DateTime.UtcNow;

        public DateTime? DownloadDateTime { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedDateTime { get; set; } = DateTime.UtcNow;
    }

    public enum UserInterfaceType
    {
        List,
        View,
        Edit
    }
}
