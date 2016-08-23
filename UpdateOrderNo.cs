using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class UpdateOrderNo
    {
        public string ContentTypeId { get; set; }

        public string AttributeSetId { get; set; }

        public string SubObjectId { get; set; }

        public int startOrderNo { get; set; }

        public int endOrderNo { get; set; }

        //public string CurrentAttributeId { get; set; }

        //public string PreviousAttributeId { get; set; }
     
    }
}
