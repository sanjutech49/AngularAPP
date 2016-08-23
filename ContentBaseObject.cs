using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class ContentBaseObject
    {

        public Properties ContentProperties { get; set; }

        public List<SubObject> ContentSubObjects { get; set; }

        public List<AttributeSet> AttributeSets { get; set; }

        public List<Classification> Classifications { get; set; }

        public List<Composition> Compositions { get; set; }

        //public Permission Permissions { get; set; }

        public List<SearchInterface> SearchInterfaces { get; set; }

        public List<UserInterface> UserInterfaces { get; set; }

        public List<Layouts> Layouts { get; set; }

        public ContentBaseObject()
        {
            this.ContentProperties = new Properties();
            this.ContentSubObjects = new List<SubObject>();
            this.AttributeSets = new List<AttributeSet>();
            this.Classifications = new List<Classification>();
            this.Compositions = new List<Composition>();
            //this.Permissions = new Permission();
            this.SearchInterfaces = new List<SearchInterface>();
            this.UserInterfaces = new List<UserInterface>();
            this.Layouts = new List<Layouts>();
        }
    }
}
