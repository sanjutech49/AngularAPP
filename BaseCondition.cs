using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class BaseCondition : LogAttribute
    {
        public string ConditionType { get; set; }

        public string AttributeType { get; set; }

        public string ConditionOperator { get; set; }

        public bool? NegationOperator { get; set; }

        public string ConditionValue { get; set; }

        public string AttributeValue { get; set; }

        public string Conditions { get; set; }

    }

    public enum ConditionType
    {
        AND,
        OR
    }
}
