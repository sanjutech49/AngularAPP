using System;
using System.Collections.Generic;
using System.Linq;
namespace Aps.ManageIT
{
    public class Sequence : LogAttribute
    {
        private const string ExceptionStatus = "412";

        public string SequenceId { get; set; }

        public string SequenceName { get; set; }

        public string SequencePrefix { get; set; }

        public long? FirstNumber { get; set; }

        public int? PaddedLength { get; set; }   

        private List<ErrorMessage> errorMessageList = new List<ErrorMessage>();

        public void IsUnquie(string name)
        {
            if (SequenceName == name)
                IsValid = false;
            else
                IsValid = true;
        }

        public bool Validate()
        {
            try
            {
                // Validation for Sequence Name
                if (Validation.IsNullOrEmpty(SequenceName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Sequence Name Required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (SequenceName.Length > 32)
                {
                    ErrorMessage errorMessage = new ErrorMessage("Sequence Name must be less than or equal to 32 characters", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.RegularExpression("^.{1,32}$", SequenceName))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Sequence Name must be less than or equal to 32 characters", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                // Validation for Sequence Prefix
                if (SequencePrefix.Length > 8)
                {
                    ErrorMessage errorMessage = new ErrorMessage("Sequence Prefix must be less than or equal to 8 characters", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.RegularExpression("^.{0,8}$", SequencePrefix))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Sequence Prefix must be less than or equal to 8 characters", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                if (!FirstNumber.HasValue)
                {
                    ErrorMessage errorMessage = new ErrorMessage("First Number is required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                if (FirstNumber.HasValue && FirstNumber < 0)
                {
                    ErrorMessage errorMessage = new ErrorMessage("First Number must be greater than zero", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                if (FirstNumber > 9999999999999)
                {
                    ErrorMessage errorMessage = new ErrorMessage("First Number must be between zero and 9999999999999", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                //Validation for Padded Length
                if (PaddedLength > 13)
                {
                    ErrorMessage errorMessage = new ErrorMessage("Padded Length cannot be greater than 13", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                if (PaddedLength < 0)
                {
                    ErrorMessage errorMessage = new ErrorMessage("Padded Length must be greater than zero", ExceptionStatus);
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

        public IEnumerable<ErrorMessage> ErrorMessgae { get; set; }

    }
}
