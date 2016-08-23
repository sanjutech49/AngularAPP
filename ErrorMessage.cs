using System;

namespace Aps.ManageIT
{
    public class ErrorMessage
    {
        public ErrorMessage()
        {

        }
        public ErrorMessage(string error, string status)
        {
            Message = error;
            Code = status;
            Status = status;
        }

        public string Message { get; set; }

        public string Code { get; set; }

        public string Status { get; set; }

        public string MoreDetails { get; set; }

    }
}
