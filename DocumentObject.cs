using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class DocumentObject : ContentBaseObject
    {
        public List<DocumentSetting> DocumentSettings { get; set; }
    }
}
