using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class LogAttribute
    {
        public bool IsValid { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdatedDate { get; set; }

        public string Version { get; set; }

        public IEnumerable<ErrorMessage> ErrorMessage { get; set; }
    }
}
