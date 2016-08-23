using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class ImageLibraryObject : LogAttribute
    {
        public string ImageObjectId { get; set; }

        public string Name { get; set; }
        public List<ImageObjectAttributeCollection> AttributeCollection { get; set; }

        public List<ImageObjectFileDetails> FileDetails { get; set; }

        public List<ImageObjectSubObjAttrCollection> SubObjAttrCollection { get; set; }

        public List<ImageObjectAttributeSetCollection> AttributeSetCollection { get; set; }

        public List<ImageObjectReference> ObjectReferenceCollection { get; set; }

        public List<ImageObjectCopyAttributeCollection> CopyAttributeCollection { get; set; }

        public string ImageLibraryId { get; set; }

        public string SubObjectId { get; set; }

        public Presentation Presentation { get; set; }
      
    }

    #region  dependent classes
    public class ImageObjectReference
    {
        public string ImageLibraryId { get; set; }
        public string ImageObjectId { get; set; }
    }

    public class ImageObjectAttributeCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public List<string> Value { get; set; }
    }

    public class ImageObjectFileDetails
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
    public class ImageObjectSubObjAttrCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public string subObjectId { get; set; }

        public List<string> Value { get; set; }
    }
    public class ImageObjectAttributeSetCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public List<string> Value { get; set; }
    }
    public class ImageObjectCopyAttributeCollection
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public string Type { get; set; }

        public List<ValueCollection> Value { get; set; }
    }

    public class FilterImageContentObjects
    {
        public string[] AttributeIds;
        public string ContentType;
        public List<Condition> SearchConditions;
        public string SearchWord;
    }
    #endregion
}
