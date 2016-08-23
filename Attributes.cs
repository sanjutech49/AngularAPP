using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class Attributes : AttributesFactory
    {
        public override BaseAttribute CreateCopyAttribute()
        {
            return new CopyAttribute();
        }

        public override BaseAttribute CreateDateAttribute()
        {
            return new DateAttribute();
        }

        public override BaseAttribute CreateDateTimeTAttribute()
        {
            return new DateTimeAttribute();
        }

        public override BaseAttribute CreateDecimalAttribute()
        {
            return new DecimalAttribute();
        }

        public override BaseAttribute CreateDocumentReferenceAttribute()
        {
            return new DocumentReferenceAttribute();
        }

        public override BaseAttribute CreateImageReferenceAttribute()
        {
            return new ImageReferenceAttribute();
        }

        public override BaseAttribute CreateIntegerAttribute()
        {
            return new IntegerAttribute();
        }

        public override BaseAttribute CreateListAttribute()
        {
            return new ListAttribute();
        }

        public override BaseAttribute CreateObjectReferenceAttribute()
        {
            return new ObjectReferenceAttribute();
        }

        public override BaseAttribute CreateSequenceAttribute()
        {
            return new SequenceAttribute();
        }

        public override BaseAttribute CreateSubObjectAttribute()
        {
            return new SubObjectAttribute();
        }

        public override BaseAttribute CreateTextAttribute()
        {
            return new TextAttribute();
        }

        public override BaseAttribute CreateTimeAttribute()
        {
            return new TimeAttribute();
        }

        public override BaseAttribute CreateYesNoAttribute()
        {
            return new YesNoAttribute();
        }
    }
}
