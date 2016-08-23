
namespace Aps.ManageIT
{
    public class ListValue : LogAttribute
    {
        public string ListValueId { get; set; }

        public string ListValues { get; set; }
    }

    public class CompositeUniqueGroup : LogAttribute
    {
        public string CompositeId { get; set; }

        public string AttributeType { get; set; }

        public string CompositeValues { get; set; }    
    }
}
