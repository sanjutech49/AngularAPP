using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class Presentation 
    {
        public string NamingExpression { get; set; }

        public SearchInterfaceType DefaultSearchType { get; set; }

        public SelectedImage DefaultImage { get; set; }

        public FileDetails DefaultIcon { get; set; }
    }

    public class SelectedAttributes
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public int Index { get; set; }

        public int DisplayOrder { get; set; }
    }

    public class SelectedImage
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public bool? IsAnyRole { get; set; }

        public List<ImageRole> ImageRoles { get; set; }

        public bool? IsAnyImageType { get; set; }

        public List<SelectedImageType> ImageTypes { get; set; }

        public int ImageIndex { get; set; }

        public int IndexPosition { get; set; }
    }

    public class SelectedImageType
    {
        public string Id { get; set; }

        public string Name { get; set; }
    }

    public class FileDetails
    {
        public string FileName { get; set; }

        public string FilePath { get; set; }

        public string FileSize { get; set; }

        public string FileData { get; set; }

        public string UpdateBy { get; set; }

        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
    }
}
