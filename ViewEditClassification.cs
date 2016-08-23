using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class ViewEditClassification : LogAttribute
    {
        public ViewEditClassification()
        {
            SubClassifications = new List<ViewEditClassification>();
        }
        public string ClassificationId { get; set; }

        public string ClassificationName { get; set; }

        public bool? NegationOperator { get; set; }

        public bool? ExpressionNegationOperator { get; set; }

        public string ConditionType { get; set; }

        public List<ViewEditClassification> SubClassifications { get; set; }
    }
}
