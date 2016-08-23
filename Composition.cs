using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class Composition : LogAttribute
    {
        public string CompositionId { get; set; }

        public string CompositionName { get; set; }

        public bool? IsEnabled { get; set; }

        public string ContentTypeId { get; set; }
        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set; }

        public string SubObjectId { get; set; }

        public bool? IsAnyClassification { get; set; }

        public string CompositionViewNegationOperator { get; set; }

        public List<ViewEditClassification> ViewClassifications { get; set; }

        public List<AttributeMap> AttributeMapList { get; set; }

        public Composition()
        {
            ViewClassifications = new List<ViewEditClassification>();
            AttributeMapList = new List<AttributeMap>();
        }
    }
}
