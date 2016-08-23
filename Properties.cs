using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Aps.ManageIT
{
    public class Properties
    {
        public string NamingExpression { get; set; }

        public string DefaultSearchType { get; set; }

        public string DefaultImage { get; set; }

        public byte[] DefaultIcon { get; set; }
    }
}
