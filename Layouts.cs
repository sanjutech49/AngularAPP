using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class Layouts : LogAttribute
    {
        public string LayoutId { get; set; }

        public string LayoutName { get; set; }

        public bool? IsEnabled { get; set; }

        public string ContentTypeId { get; set; }
        public string DocumentLibraryId { get; set; } 
        public string ImageLibraryId { get; set; }
        public string SubObjectId { get; set; }

        public bool? IsAnyClassification { get; set; }

        public string LayoutViewNegationOperator { get; set; }

        public List<ViewEditClassification> ViewClassifications { get; set; }

        public List<AttributeMap> AttributeMapList { get; set; }

        public List<Styles> LayoutStyles { get; set; }

        public string LayoutsDesign { get; set; }

        public int OrderNo { get; set; }

        public Layouts()
        {
            ViewClassifications = new List<ViewEditClassification>();
            AttributeMapList = new List<AttributeMap>();
            LayoutStyles = new List<Styles>();
        }
    }

    public class Styles : LogAttribute
    {
        public string StyleId { get; set; }

        public string StyleName { get; set; }
    }
}
