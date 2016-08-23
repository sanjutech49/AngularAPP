using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class SubObject : LogAttribute
    {
        public SubObject()
        {
            Attributes = new List<BaseAttribute>();
            Classifications = new List<Classification>();
            ListItems = new List<ListUserInterfaces>();
            ViewItems = new List<ViewUserInterfaces>();
            EditItems = new List<EditUserInterfaces>();
            Layouts = new List<Layouts>();
            Permissions = new List<Permissions>();
            SearchInterfaces = new List<SearchInterface>();
        }
        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set; }
        public string DomainId { get; set; }

        public string SubObjectId { get; set; }

        public string SingularName { get; set; }

        public string PluralName { get; set; }

        public string ContentTypeId { get; set; }

        public List<BaseAttribute> Attributes { get; set; }

        public List<Classification> Classifications { get; set; }

        public List<Composition> Compositions { get; set; }

        public List<Permissions> Permissions { get; set; }

        public List<ListUserInterfaces> ListItems { get; set; }

        public List<ViewUserInterfaces> ViewItems { get; set; }

        public List<EditUserInterfaces> EditItems { get; set; }

        public List<Layouts> Layouts { get; set; }

        public List<SearchInterface> SearchInterfaces { get; set; }

        public bool Validate()
        {
            List<ErrorMessage> errorMessages = new List<ErrorMessage>();
            if (string.IsNullOrEmpty(PluralName))
            {
                ErrorMessage errorMessage = new ErrorMessage("Plural name is required", "400");
                errorMessages.Add(errorMessage);
            }

            if (string.IsNullOrEmpty(SingularName))
            {
                ErrorMessage errorMessage = new ErrorMessage("Singular name is required", "400");
                errorMessages.Add(errorMessage);
            }

            if (PluralName.Length > 32)
            {
                ErrorMessage errorMessage = new ErrorMessage("Plural name cannot be greater than 32 characters.", "400");
                errorMessages.Add(errorMessage);
            }

            if (SingularName.Length > 32)
            {
                ErrorMessage errorMessage = new ErrorMessage("Singular name cannot be greater than 32 characters.", "400");
                errorMessages.Add(errorMessage);
            }

            ErrorMessage = errorMessages.AsEnumerable();

            return ErrorMessage.Count() == 0;
        }

    }
}
