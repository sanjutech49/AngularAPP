using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public abstract class AttributesFactory
    {
        public abstract BaseAttribute CreateTextAttribute();
       
        public abstract BaseAttribute CreateIntegerAttribute();
        public abstract BaseAttribute CreateDecimalAttribute();
        public abstract BaseAttribute CreateSequenceAttribute();
        public abstract BaseAttribute CreateDateAttribute();
        public abstract BaseAttribute CreateTimeAttribute();
        public abstract BaseAttribute CreateDateTimeTAttribute();
        public abstract BaseAttribute CreateYesNoAttribute();
        public abstract BaseAttribute CreateListAttribute();
        public abstract BaseAttribute CreateSubObjectAttribute();
        public abstract BaseAttribute CreateCopyAttribute();
        public abstract BaseAttribute CreateObjectReferenceAttribute();
        public abstract BaseAttribute CreateImageReferenceAttribute();
        public abstract BaseAttribute CreateDocumentReferenceAttribute();
        

    }
}
