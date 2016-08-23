using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aps.ManageIT
{
    public static class ResponseStatus
    {

        public static readonly int OK = 200;
        public static readonly int Created = 201;
        public static readonly int Accepted = 202;
        public static readonly int BadRequest = 400;
        public static readonly int AuthenticationFailure = 401;
        public static readonly int Forbidden = 403;
        public static readonly int ResourceNotFound = 404;
        public static readonly int MethodNotAllowed = 405;
        public static readonly int Conflict = 409;
        public static readonly int PreconditionFailed = 412;
        public static readonly int RequestEntityTooLarge = 413;
        public static readonly int InternalServerError = 500;
        public static readonly int NotImplemented = 501;
        public static readonly int ServiceUnavailable = 503;

    }
}
