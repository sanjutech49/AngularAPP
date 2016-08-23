using System.Collections.Generic;

namespace Aps.ManageIT
{
    public class Classification :LogAttribute
    {
        public string ClassificationId { get; set; }

        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set; }

        public string ClassificationName { get; set; }

        public bool? ClassificationNegationOperator { get; set; }

        public ClassificationType? ClassificationType { get; set; }

        public List<Condition> Conditions { get; set; }

        public string ContentTypeId { get; set; }

        public string SubObjectId { get; set; }

        public Classification ()
        {
            Conditions = new List<Condition>();
        }
    }

    public enum ClassificationType
    {
        QueryClassification
    }
}
