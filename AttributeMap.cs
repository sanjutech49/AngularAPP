using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class AttributeMap : LogAttribute
    {
        public string AttributeMapId { get; set; }

        public string TargetAttributeId { get; set; }

        public List<AcceptedMapTypes> AcceptedMapTypes { get; set; }

        public string ContentTypeId { get; set; }
        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set; }
        public string subObjectId { get; set; }

        public string CompositionId { get; set; }

        public AttributeMap()
        {
            AcceptedMapTypes = new List<AcceptedMapTypes>();
        }

    }

    //public class 

    public class AcceptedMapTypes
    {

        public string Id { get; set; }

        public string Name { get; set; }

        public List<SelectedClassifications> SelectedClassification { get; set; }

        public ItemFilters SelectedItemFilters { get; set; }

        public AcceptedMapTypes()
        {
            SelectedClassification = new List<SelectedClassifications>();
        }

    }

    public class ItemFilters
    {
        public string ItemFilter { get; set; }
        public int? FirstItems { get; set; }
        public int? LastItems { get; set; }
        public int? RangeFrom { get; set; }

        public int? RangeTo { get; set; }
    }
}
