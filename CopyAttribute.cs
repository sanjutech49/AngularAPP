using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public class CopyAttribute : BaseAttribute
    {
        public CopyAttribute()
        {
            CopyFieldDetails = new List<TextAttribute>();
        }

        public List<TextAttribute> CopyFieldDetails { get; set; }

        public List<string> ContextId { get; set; }

        public List<string> CopyFieldNames { get; set; }

        public override bool Validate()
        {
            // Validation for Attribute Name
            if (Validation.IsNullOrEmpty(this.Name))
            {
                ErrorMessage errorMessage = new ErrorMessage("Attribute Name is Required", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }
            else if (Name.Length > 64)
            {
                ErrorMessage errorMessage = new ErrorMessage("Attribute Name cannot be greater than 64 characters", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }


            // Validation for Attribute Identifier
            if (Validation.IsNullOrEmpty(this.Identifier))
            {
                ErrorMessage errorMessage = new ErrorMessage("Attribute Identifier is Required", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }
            else if (Identifier.Length > 64)
            {
                ErrorMessage errorMessage = new ErrorMessage("Attribute Identifier cannot be greater than 64 characters", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }

            // Validation for Attribute Description
            if (Description != null && Description.Length > 128)
            {
                ErrorMessage errorMessage = new ErrorMessage("Description cannot be greater than 128 characters.", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }

            if (MultipleValues != null && !Validation.IsValidRange(0, 999, MultipleValues.MinimumValue))
            {
                ErrorMessage errorMessage = new ErrorMessage("Minimum value must be between 0 and 999", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }

            if (MultipleValues != null && !Validation.IsValidRange(0, 999, MultipleValues.MaximumValue))
            {
                ErrorMessage errorMessage = new ErrorMessage("Minimum value must be between 0 and 999", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }

            if (ContextId == null)
            {
                ErrorMessage errorMessage = new ErrorMessage("Please select context type.", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }

            if (ContextId != null && ContextId.Count == 0)
            {
                ErrorMessage errorMessage = new ErrorMessage("Please select context type.", ExceptionStatus);
                errorMessageList.Add(errorMessage);
            }

            ErrorMessage = errorMessageList.AsEnumerable();

            return errorMessageList.Count > 0 ? false : true;
        }
    }

}
