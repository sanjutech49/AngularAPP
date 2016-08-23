using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class SearchInterface : LogAttribute
    {
        public SearchInterface()
        {
            Columns = new List<Columns>();
            SortingResults = new List<SortingResults>();
            SearchInputs = new List<BaseAttribute>();
            ListItemInterface = new List<SelectedListInterface>();
            SearchConditions = new List<Condition>();
            SearchAttributeInputs = new List<SearchAttributeInputs>();
        }

        public string SearchInterfaceId { get; set; }

        public string Name { get; set; }

        public bool? IsEnabled { get; set; }

        public int ResultsPerPage { get; set; }

        public int OrderNo { get; set; }

        public string ContentTypeId { get; set; }
        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set; }
        public string SubObjectId { get; set; }

        public SearchInterfaceType SearchInterfaceType { get; set; }

        public DefaultAction DefaultAction { get; set; }

        public List<SelectedListInterface> ListItemInterface { get; set; }
        
        public List<BaseAttribute> SearchInputs { get; set; }

        public List<SearchAttributeInputs> SearchAttributeInputs { get; set; }

        public List<TextAttribute> SearchInputTextAttribute { get; set; }

        public List<ListAttribute> SearchInputListAttribute { get; set; }

        public List<DateAttribute> SearchInputDateAttribute { get; set; }

        public List<DateTimeAttribute> SearchInputDateTimeAttribute { get; set; }

        public List<TimeAttribute> SearchInputTimeAttribute { get; set; }

        public List<IntegerAttribute> SearchInputIntegerAttribute { get; set; }

        public List<DecimalAttribute> SearchInputDecimalAttribute { get; set; }

        public List<YesNoAttribute> SearchInputYesNoAttribute { get; set; }

        public List<Condition> SearchConditions { get; set; } 
        
        public bool? ShowAllItems { get; set; }
        
        public List<Columns> Columns { get; set; } 
        
        public List<SortingResults> SortingResults { get; set; }

        public bool Validate()
        {
            List<ErrorMessage> errorMessages = new List<ErrorMessage>();
            if (string.IsNullOrEmpty(Name))
            {
                ErrorMessage errorMessage = new ErrorMessage("Search interface name is required", "400");
                errorMessages.Add(errorMessage);
            }

            if (Name != null && Name.Length > 32)
            {
                ErrorMessage errorMessage = new ErrorMessage("Search interface name cannot be greater than 32 characters.", "400");
                errorMessages.Add(errorMessage);
            }
            if (ResultsPerPage <= 0)
            {
                ErrorMessage errorMessage = new ErrorMessage("Search interface results per page cannot be less than or equal to zero.", "400");
                errorMessages.Add(errorMessage);
            }
            if (ResultsPerPage > 200)
            {
                ErrorMessage errorMessage = new ErrorMessage("Search interface results per page cannot be greater than 200", "400");
                errorMessages.Add(errorMessage);
            }

            if (ListItemInterface != null && ListItemInterface.Count == 0 && SearchInterfaceType.ToString() == SearchInterfaceType.Search.ToString())
            {
                ErrorMessage errorMessage = new ErrorMessage("Search interface List User Interface is mandatory.", "400");
                errorMessages.Add(errorMessage);
            }

            if (!(bool)ShowAllItems && SearchConditions!= null && SearchConditions.Count == 0)
            {
                ErrorMessage errorMessage = new ErrorMessage("Please select Search Conditions", "400");
                errorMessages.Add(errorMessage);
            }

           
            ErrorMessage = errorMessages.AsEnumerable();

            return ErrorMessage.Count() == 0;
        }
    }

    public class Columns
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public ColumnFilter ColumnFilter { get; set; }

        public bool? Sortable { get; set; }

        public bool? SortByDefault { get; set; }

        public int SortOrder { get; set; }
    }

    public class SortingResults
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public SortType SortType { get; set; }
    }

    public enum SortType
    {
        Ascending,
        Descending
    }

    public enum ColumnFilter
    {
        Search,
        NumberRange,
        DateRange,
        TimeRange,
        DateTimeRange,
        List,
        MultiListValue
    }

    public class SelectedListInterface
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public bool? IsAutoDetect { get; set; }
    }

    public enum DefaultAction
    {
        ViewContentObject,
        EditContentObject
    }

    public enum SearchInterfaceType
    {
        Search,
        List,
        Browse
    }

    public class SearchAttributeInputs
    {
        public TextAttribute TextAttribute { get; set; }

        public ListAttribute ListAttribute { get; set; }

        public DateAttribute DateAttribute { get; set; }

        public TimeAttribute TimeAttribute { get; set; }

        public DateTimeAttribute DateTimeAttribute { get; set; }

        public IntegerAttribute IntegerAttribute { get; set; }

        public DecimalAttribute DecimalAttribute { get; set; }

        public YesNoAttribute YesNoAttribute { get; set; }
    }
}
