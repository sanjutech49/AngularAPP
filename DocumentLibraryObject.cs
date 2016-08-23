using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class DocumentLibraryObject : LogAttribute
    {
        public string DocumentObjectId { get; set; }

        public string Name { get; set; }

        public List<DocumentObjectAttributeCollection> AttributeCollection { get; set; }

        public List<DocumentObjectFileDetails> FileDetails { get; set; }

        public List<DocumentObjectSubObjAttrCollection> SubObjAttrCollection { get; set; }

        public List<DocumentObjectAttributeSetCollection> AttributeSetCollection { get; set; }

        public List<DocumentObjectReference> ObjectReferenceCollection { get; set; }

        public List<DocumentObjectCopyAttributeCollection> CopyAttributeCollection { get; set; }

        public string DocumentLibraryId { get; set; }

        public string SubObjectId { get; set; }

        public Presentation Presentation { get; set; }

    }

    #region dependent classes
    public class DocumentObjectReference
    {
        public string DocumentLibraryId { get; set; }
        public string DocumentObjectId { get; set; }
    }

    public class DocumentObjectAttributeCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public List<string> Value { get; set; }
    }

    public class DocumentObjectFileDetails
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
    public class DocumentObjectSubObjAttrCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public string subObjectId { get; set; }

        public List<string> Value { get; set; }
    }
    public class DocumentObjectAttributeSetCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public List<string> Value { get; set; }
    }
    public class DocumentObjectCopyAttributeCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public List<ValueCollection> Value { get; set; }
    }

    public class FilterDocumentContentObjects
    {
        public string[] AttributeIds;
        public string ContentType;
        public List<Condition> SearchConditions;
        public string SearchWord;
    }
    #endregion
}
