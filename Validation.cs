using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Aps.ManageIT
{
    public static class Validation
    {
     
         static Validation()
        {            
        }

        public static  bool  IsNullOrEmpty(string value)
        {            
            return string.IsNullOrEmpty(value)? true: false;
        }

        public static bool IsNullOrEmpty(float? value)
        {
            return value.HasValue;
        }

        public static bool RegularExpression(string expression, string value)
        {

            if (!string.IsNullOrEmpty(value))
            {
                Regex regex = new Regex(expression);
                Match match = regex.Match(value);
                return match.Success;
            }
            else
                return true;
          
        }

        public static bool RegularExpression(string expression, int? value)
        {           

            if (!string.IsNullOrEmpty(value.ToString()))
            {
                Regex regex = new Regex(expression);
                Match match = regex.Match(value.ToString());
                return match.Success;
            }
            else
                return true;

        }

        //public static bool RegularExpression(string expression, float? value)
        //{

        //    if (!string.IsNullOrEmpty(value.ToString()))
        //    {
        //        Regex regex = new Regex(expression);
        //        Match match = regex.Match(value.ToString());
        //        return match.Success;
        //    }
        //    else
        //        return true;

        //}

        public static bool StringLength(int? minimumLength, int? maxminumLength,  string value)
        {
            if (value.Length < minimumLength || value.Length > maxminumLength)
                return false;
            else
                return true;            
        }

        public static bool IsValidRange(int? minimumValue, int? maxminumValue, int? value)
        {
            if (value < minimumValue || value > maxminumValue)
                return false;
            else
                return true;
        }

        public static bool IsValidDecimalRange(decimal? minimumValue, decimal? maxminumValue, decimal? value)
        {
            if (value <= minimumValue || value >= maxminumValue)
                return false;
            else
                return true;
        }

        public static bool IsValidRange(float? minimumValue, float? maxminumValue, float? value)
        {
            if (value < minimumValue || value > maxminumValue)
                return false;
            else
                return true;
        }

        public static bool DataType(DataType type , string value)
        {
            if (value.GetType().ToString() == type.ToString())            
                return true;
            else
                return false;
        }        



    }

   
    public struct DataType
    {
        public const string TypeDateTime = "DateTime";
        public const string TypeInteger = "Integer";
        public const string TypeString = "String";
        
    }

}
