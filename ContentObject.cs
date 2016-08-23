using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class ContentObject : LogAttribute
    {

        public string ContentObjectId { get; set; }

        public string Name { get; set; }

       public List<ContentObjectAttributeCollection> AttributeCollection { get; set; }

        public List<ContentObjectFileDetails> FileDetails { get; set; }

        public List<ContentObjectSubObjAttrCollection> SubObjAttrCollection { get; set; }

        public List<ContentObjectAttributeSetCollection> AttributeSetCollection { get; set; }

        public List<ContentObjectReference> ObjectReferenceCollection { get; set; }

        public List<ContentObjectCopyAttributeCollection> CopyAttributeCollection { get; set; }

        public string ContentTypeId { get; set; }

        public string SubObjectId { get; set; }

        public Presentation Presentation { get; set; }

    }


    public class ContentObjectReference
    {
        public string ContentTypeId { get; set; }
        public string ContentObjectId { get; set; }        
    }

    public class ContentObjectAttributeCollection
    {
        public string Id { get; set; }
        
        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }
        
        public List<string> Value { get; set; } 
    }

    public class ContentObjectFileDetails
    {
        public string FileId { get; set; }

        public string FileName { get; set; }

        public string FilePath { get; set; }

        public string fileSize { get; set; }

        public string fileContent { get; set; }

        public string FileType { get; set; }

        public string UpdateBy { get; set; }

        public string UploadedDate { get; set; }

        public string Version { get; set; }

        public string gfsId { get; set; }

    }
    public class ContentObjectSubObjAttrCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public string subObjectId { get; set; }

        public List<string> Value { get; set; }
    }
    public class ContentObjectAttributeSetCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public List<string> Value { get; set; }
    }
    public class ContentObjectCopyAttributeCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public List<ValueCollection> Value { get; set; }
    }

    public class ValueCollection
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public class FilterContentObjects
    {
        public string[] AttributeIds;
        public string ContentType;
        public Condition[] SearchConditions;
        public string SearchWord;
    }
}
