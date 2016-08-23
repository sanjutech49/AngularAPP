using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class Permissions : LogAttribute
    {      
        public string PermissionId { get; set; }

        public string ContentTypeId { get; set; }
        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set; }

        public string SubObjectId { get; set; }

        public ObjectPermission Objects { get; set; }

        public AttributePermission Attributes { get; set; }

   }

    public class SelectedRole
    {
        public string RoleId { get; set; }

        public string RoleName { get; set; }

        public string ContentTypeId { get; set; }

        public List<SelectedObject> SelectedAttributes { get; set; }

        public AccessLevel Permission { get; set; }
    }

    public class SelectedClassification
    {
        public string ClassificationId { get; set; }

        public string ClassificationName { get; set; }

        public string ContentTypeId { get; set; }

        public List<SelectedObject> SelectedAttributes { get; set; }

        public AccessLevel Permission { get; set; }
    }

    public class SelectedObject
    {
        public string ContentTypeId { get; set; }

        public string AttributeId { get; set; }

        public string AttributeName { get; set; }

        public AccessLevel Permission { get; set; }

    }

    public class ObjectPermission
    {
        public List<SelectedRole> SelectedRoles { get; set; }

        public List<SelectedClassification> SelectedClassifications { get; set; }

    }

    public class AttributePermission
    {
        public List<SelectedRole> SelectedRoles { get; set; }

        public List<SelectedClassification> SelectedClassifications { get; set; }        
    }

    public class AccessLevel
    {
        public bool? Add { get; set; }

        public bool? View { get; set; }

        public bool? Edit { get; set; }

        public bool? Delete { get; set; }

        public bool? Modify { get; set; }

        public bool? Search { get; set; }

        public bool? AddItem { get; set; }

        public bool? UnLinkItem { get; set; }

        public bool? LinkItem { get; set; }
    }

    public enum AccessState
    {
        Allow,
        Deny,
        Default
    }

    public class ManageITRoles
    {
        public string RoleId { get; set; }

        public string RoleName { get; set; }
    }

}
