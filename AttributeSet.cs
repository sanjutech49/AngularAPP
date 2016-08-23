using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class AttributeSet : LogAttribute
    {

        public AttributeSet()
        {
            //Initilization
            Attributes = new List<BaseAttribute>();
            ViewClassification = new List<ViewEditClassification>();
            EditClassification = new List<ViewEditClassification>();

        }

        #region [Properties & Fields]

        private const string ExceptionStatus = "412";

        public string AttributeSetId { get; set; }
        public string ContentTypeId { get; set; }
        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set;}
        public string AttributeSetName { get; set; }

        public bool? DisplayHeading { get; set; }

        public bool? AttributeSetViewNegationOperator { get; set; }

        public bool? AttributeSetEditNegationOperator { get; set; }

        public int DisplayOrder { get; set; }

        public List<ViewEditClassification> ViewClassification { get; set; }

        public List<ViewEditClassification> EditClassification { get; set; }

        public bool IsAnyViewClassification { get; set; }

        public bool IsAnyEditClassification { get; set; }

        public List<BaseAttribute> Attributes { get; set; }

        private List<ErrorMessage> errorMessageList = new List<ErrorMessage>();

       

        #endregion

        #region [ Public method to validate the fields]
        public bool Validate()
        {
            try
            {

                // Validation for AttributeSet Name
                if (Validation.IsNullOrEmpty(this.AttributeSetName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.StringLength(1, 64, this.AttributeSetName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid String Length", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.RegularExpression("^.{1,64}$", this.AttributeSetName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid String", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                ErrorMessage = errorMessageList.AsEnumerable();
                return errorMessageList.Count > 0 ? false : true;

            }
            catch
            {
                ErrorMessage = errorMessageList.AsEnumerable();
                return false;
            }
        }
        #endregion
    }
}
