manageitModule.factory("attributeService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:attributeType/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/:attributeType/details/:id', isArray: true },
               create: { method: "POST" },
               get: { method: "GET", url: "/api/manageit/v1/:attributeType/details/:contentTypeId/:id" },
               getLib: { method: "GET", url: "/api/manageit/v1/:attributeType/details/:domainId/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/:attributeType/details/:contentTypeId/:id" },
               update: {
                   method: "PUT", url: "/api/manageit/v1/:attributeType/details/:id"
               }
           });
       }
]);

manageitModule.factory("uniqueGroupService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/UniqueGroup/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/UniqueGroup/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/UniqueGroup/addUniqueGroup" },
               createLib: { method: "POST", url: "/api/manageit/v1/UniqueGroup/addUniqueGroup/:domainId" }
           });
       }
]);

manageitModule.factory("textAttributeService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:attributeType/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/:attributeType/details/:id', isArray: true },
               Libsquery: { method: "GET", url: '/api/manageit/v1/attributeType/listDetails/:domainId/:id', isArray: true },
               getAllAttributesInContentType:
                   { method: "GET", url: '/api/manageit/v1/:attributeType/allDetails/:id', isArray: true },
               // getAllAttributesInLibrary:                   { method: "GET", url: '/api/manageit/v1/:attributeType/allLibraryDetails/:domainId/:id/:attributeSetId', isArray: true },
               getAllAttributesInLibrary:
                  { method: "GET", url: '/api/manageit/v1/:attributeType/details/:domainId/:contentTypeId/:isAllAttributes', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/:attributeType/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/:attributeType/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/:attributeType/details/:contentTypeId/:id" },
               getByContentTypeId: { method: "GET", url: "/api/manageit/v1/:attributeType/details/:contentTypeId", isArray: true },
               remove: { method: "POST", url: "/api/manageit/v1/:attributeType/removeAttribute/:id" },
               update: { method: "PUT", url: "/api/manageit/v1/:attributeType/updateAttribute/:id" },
               removeLib: { method: "POST", url: "/api/manageit/v1/:attributeType/removeAttribute/:domainId" },
               //added the domainId for isUnique check 
               updateLib: { method: "PUT", url: "/api/manageit/v1/:attributeType/updateAttribute/:domainId" },
               updateOrderNo: { method: "POST", url: "/api/manageit/v1/:attributeType/updateOrderNo/" }
           });
       }
]);


manageitModule.factory("sequenceAttributeService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/SequenceAttribute/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/SequenceAttribute/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/SequenceAttribute/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/SequenceAttribute/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/SequenceAttribute/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/SequenceAttribute/details/:contentTypeId/:id" },
               //  remove: { method: "DELETE", url: "/api/manageit/v1/SequenceAttribute/removeSequenceAttribute" },
               update: { method: "PUT", url: "/api/manageit/v1/SequenceAttribute/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/SequenceAttribute/updateAttribute/:domainId" }
           });
       }
]);


manageitModule.factory("yesNoAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/YesNoAttribute/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/YesNoAttribute/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/YesNoAttribute/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/YesNoAttribute/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/YesNoAttribute/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/YesNoAttribute/details/:contentTypeId/:id" },
               //  remove: { method: "DELETE", url: "/api/manageit/v1/YesNoAttribute/removeYesNoAttribute" },
               update: { method: "PUT", url: "/api/manageit/v1/YesNoAttribute/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/YesNoAttribute/updateAttribute/:domainId" }
           });
       }
]);

// Service layer method for decimal attribute
manageitModule.factory("decimalAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/DecimalAttribute/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/DecimalAttribute/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/DecimalAttribute/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/DecimalAttribute/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/DecimalAttribute/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/DecimalAttribute/details/:contentTypeId/:id" },
               //remove: { method: "DELETE", url: "/api/manageit/v1/DecimalAttribute/removeDecimalAttribute" },
               update: { method: "PUT", url: "/api/manageit/v1/DecimalAttribute/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/DecimalAttribute/updateAttribute/:domainId" }
           });
       }
]);
// Service layer method for decimal attribute
manageitModule.factory("integerAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/IntegerAttribute/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/IntegerAttribute/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/IntegerAttribute/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/IntegerAttribute/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/IntegerAttribute/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/IntegerAttribute/details/:contentTypeId/:id" },
               //remove: { method: "DELETE", url: "/api/manageit/v1/IntegerAttribute/removeIntegerAttribute" },
               update: { method: "PUT", url: "/api/manageit/v1/IntegerAttribute/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/IntegerAttribute/updateAttribute/:domainId" }
           });
       }
]);

// Service layer method for List attribute
manageitModule.factory("listAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/ListAttribute/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/ListAttribute/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/ListAttribute/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/ListAttribute/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/ListAttribute/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/ListAttribute/details/:contentTypeId/:id" },
               //remove: { method: "DELETE", url: "/api/manageit/v1/ListAttribute/removeListAttribute" },
               update: { method: "PUT", url: "/api/manageit/v1/ListAttribute/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/ListAttribute/updateAttribute/:domainId" }
           });
       }
]);
// Service layer method for sub-objects attribute
manageitModule.factory("subObjectsAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/SubObjectAttribute/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/SubObjectAttribute/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/SubObjectAttribute/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/SubObjectAttribute/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/SubObjectAttribute/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/SubObjectAttribute/details/:contentTypeId/:id" },
               //remove: { method: "DELETE", url: "/api/manageit/v1/SubObjectAttribute/removeSubObjectAttribute" },
               update: { method: "PUT", url: "/api/manageit/v1/SubObjectAttribute/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/SubObjectAttribute/updateAttribute/:domainId" }
           });
       }
]);

// Service layer method for datetime attribute
manageitModule.factory("dateTimeAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/DateTimeAttribute/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/DateTimeAttribute/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/DateTimeAttribute/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/DateTimeAttribute/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/DateTimeAttribute/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/DateTimeAttribute/details/:contentTypeId/:id" },
               //remove: { method: "DELETE", url: "/api/manageit/v1/DateTimeAttribute/removeDateTimeAttribute" },
               update: { method: "PUT", url: "/api/manageit/v1/DateTimeAttribute/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/DateTimeAttribute/updateAttribute/:domainId" }
           });
       }
]);

// Service layer method for date attribute
manageitModule.factory("dateAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/DateAttribute/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/DateAttribute/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/DateAttribute/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/DateAttribute/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/DateAttribute/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/DateAttribute/details/:contentTypeId/:id" },
               //remove: { method: "DELETE", url: "/api/manageit/v1/DateAttribute/removeDateAttribute" },
               update: { method: "PUT", url: "/api/manageit/v1/DateAttribute/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/DateAttribute/updateAttribute/:domainId" }
           });
       }
]);

// Service layer method for date attribute
manageitModule.factory("timeAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/TimeAttribute/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/TimeAttribute/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/TimeAttribute/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/TimeAttribute/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/TimeAttribute/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/TimeAttribute/details/:contentTypeId/:id" },
               //remove: { method: "DELETE", url: "/api/manageit/v1/TimeAttribute/removeTimeAttribute" },
               update: { method: "PUT", url: "/api/manageit/v1/TimeAttribute/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/TimeAttribute/updateAttribute/:domainId" }
           });
       }
]);

// Service layer method for image reference attribute
manageitModule.factory("imageReferenceAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/ImageReference/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/ImageReference/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/ImageReference/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/ImageReference/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/ImageReference/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/ImageReference/details/:contentTypeId/:id" },
               //remove: { method: "DELETE", url: "/api/manageit/v1/ImageReference/removeImageReference" },
               update: { method: "PUT", url: "/api/manageit/v1/ImageReference/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/ImageReference/updateAttribute/:domainId" }
           });
       }
]);

// Service layer method for object reference attribute
manageitModule.factory("objectReferenceAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/ContentReference/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/ContentReference/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/ContentReference/addAttribute" },
               createLib: { method: "POST", url: "/api/manageit/v1/ContentReference/addAttribute/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/ContentReference/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/ContentReference/details/:contentTypeId/:id" },
               //remove: { method: "DELETE", url: "/api/manageit/v1/ContentReference/removeContentReference" },
               update: { method: "PUT", url: "/api/manageit/v1/ContentReference/updateAttribute" },
               updateLib: { method: "PUT", url: "/api/manageit/v1/ContentReference/updateAttribute/:domainId" }
           });
       }
]);

// Service layer method for copy attribute
manageitModule.factory("copyAttributeService", [
    "$resource",
       function ($resource) {

           return $resource("/api/manageit/v1/CopyAttribute/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/CopyAttribute/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/CopyAttribute/addAttribute" },
               get: { method: "GET", url: "/api/manageit/v1/CopyAttribute/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/CopyAttribute/details/:contentTypeId/:id" },
               //remove: { method: "DELETE", url: "/api/manageit/v1/CopyAttribute/removeCopyAttribute" },
               update: { method: "PUT", url: "/api/manageit/v1/CopyAttribute/updateAttribute" }
           });
       }
]);

