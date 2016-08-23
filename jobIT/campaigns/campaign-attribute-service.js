angular.module('jobit.campaign').factory("campaignAttributeService", [
    "$resource",
       function ($resource) {
           return $resource("/api/jobit/v1/CampaignAttribute/details", {}, {
               query: {
                   method: "GET",
                   headers: { 'Content-Type': 'application/json;charset=utf-8' },
                   url: '/api/jobit/v1/CampaignAttribute/details/:campaignId/:attributeSetId', isArray: true
               },
               create: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addTextAttributeList"
               },
               createInteger: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addIntergerAttributeList"
               },
               createDecimal: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addDecimalAttributeList"
               },
               createSequence: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addSequenceAttributeList"
               },
               createDate: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addDateAttributeList"
               },
               createTime: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addTimeAttributeList"
               },
               createDateAndTime: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addDateTimeAttributeList"
               },
               createYesNo: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addYesNoAttributeList"
               },
               createCopy: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addCopyAttributeList"
               },
               createList: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addListAttributeList"
               },
               createSubObject: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addSubObjectAttributeList"
               },
               addObjectReference: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addObjectReferenceAttributeList"
               },
               createImageReference: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addImageReferenceAttributeList"
               },
               createDocumentReference: {
                   method: "POST",
                   url: "/api/jobit/v1/CampaignAttribute/addDocumentReferenceAttributeList"
               },
               update: {
                   method: "PUT",
                   url: "/api/jobit/v1/CampaignAttribute/updateTextAttributeList"
               },
               remove: {
                   method: "DELETE",
                   url: "#"
               },
               getDefaultAttributes: {
                   method: "GET",
                   url: '/api/jobit/v1/CampaignAttribute/detailsByContentType/:campaignId/:attributeSetId', isArray: true
               },
           });
       }
]);