using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class SourceAttributes : LogAttribute
    {
        public SourceAttributes()
        {
            Children = new List<SourceAttributes>();
        }

        public string Label { get; set; }

        public string Value { get; set; }

        public bool? isAllowMultiple { get; set; }

        public List<SourceAttributes> Children { get; set; }
    }
}
