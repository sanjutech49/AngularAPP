using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class Condition : BaseCondition
    {
        public Condition()
        {
            SubConditions = new List<SubCondition>();
        }

        public string ConditionId { get; set; }

        public bool? ExpressionNegationOperator { get; set; }

        public List<SubCondition> SubConditions { get; set; }

    }
}
