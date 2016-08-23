using System;
using System.Collections.Generic;
using System.Linq;


namespace Aps.ManageIT
{
    #region [Public base Class BaseAttribute]

   
    public abstract class BaseAttribute : LogAttribute
    {
        public string AttributeId { get; set; }
        //public string DomainId { get; set; }
        public string ImageLibraryId { get; set; }
        public string DocumentLibraryId { get; set; }

        public string ContentTypeId { get; set; }

        public string AttributeSetId { get; set; }

        public string AttributeSetName { get; set; }

        public string SubObjectName { get; set; }

        public string SubObjectId { get; set; }

        public string AttributeType { get; set; }

        protected const string ExceptionStatus = "500";

        protected List<ErrorMessage> errorMessageList = new List<ErrorMessage>();

        public string ParentId { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public bool? Mandatory { get; set; }

        public bool? ReadOnly { get; set; }

        public bool? UniqueValues { get; set; }

        public bool? IsSingularityUnique { get; set; }

        /// <summary>
        /// The unique group data format eg: name+brand+cap
        /// </summary>
        public string UniqueGroup { get; set; }

        public string UniqueGroupName { get; set; }

        public List<UniqueGroup> UniqueGroupList { get; set; }

        public UniqueGroup CompositeGroup { get; set; }

        public MultipleValues MultipleValues { get; set; }

        public string Description { get; set; }

        public bool IsContentTypeAttribute { get; set; }

        public bool IsAttributeSetAttribute { get; set; }

        public bool IsSubObjectAttribute { get; set; }

        public int OrderNo { get; set; }
             
        public abstract bool Validate();

        public BaseAttribute()
        {
            this.MultipleValues = new MultipleValues();
            CompositeGroup = new UniqueGroup();
            this.errorMessageList = new List<ErrorMessage>();
        }
    }

    #endregion

    #region [Public Integer Attribute Class derived from BaseAttribute]
    public class IntegerAttribute : BaseAttribute
    {
       
        public long? MinimumValue { get; set; }

        public long? MaximumValue { get; set; }

        public float? DefaultValue { get; set; }

        public long? DecimalPlaces { get; set; }

        public float? DecimalValues { get; set; }

        public ValueType? ValueType { get; set; }

        public string CurrencyType { get; set; }

        public bool? InheritFromContext { get; set; }
     
        public override bool Validate()
        {
            try
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

                // Validation for Minimum Value
                if (!Validation.IsValidRange(-9999999999999, 9999999999999, this.MinimumValue))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid Range", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                
                // Validation for Maximum Value
                if (!Validation.IsValidRange(-9999999999999, 9999999999999, this.MaximumValue))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid Range", ExceptionStatus);
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
    }
    #endregion

    #region [Public Decimal Attribute Class derived from BaseAttribute]
    public class DecimalAttribute : BaseAttribute
    {
        public decimal? MinimumValue { get; set; }

        public decimal? MaximumValue { get; set; }

        public decimal? DefaultValue { get; set; }

        public decimal? DecimalPlaces { get; set; }

        public decimal? DecimalValues { get; set; }

        public ValueType? ValueType { get; set; }

        public string CurrencyType { get; set; }

        public bool? InheritFromContext { get; set; }

        public override bool Validate()
        {
            try
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

                // Validation for Minimum Value
                if (!Validation.IsValidDecimalRange(-10000, 10000, this.MinimumValue))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Minimum Value must be -9999.999999999  to 9999.999999999 ", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                // Validation for Maximum Value
                if (!Validation.IsValidDecimalRange(-10000, 10000, this.MaximumValue))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Maximum Value must be -9999.999999999  to 9999.999999999 ", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                // Validation for Maximum Value
                if (!Validation.IsValidDecimalRange(-10000, 10000, this.DefaultValue))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Default Value must be -9999.999999999  to 9999.999999999 ", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                // Validation for Decimal Places
                //if (!Validation.IsValidRange(0, 9, this.DecimalPlaces))
                //{
                //    ErrorMessage errorMessage = new ErrorMessage("Invalid Range", ExceptionStatus);
                //    errorMessageList.Add(errorMessage);
                //}

                ErrorMessage = errorMessageList.AsEnumerable();
                return errorMessageList.Count > 0 ? false : true;
            }
            catch
            {
                ErrorMessage = errorMessageList.AsEnumerable();
                return false;
            }
        }
    }
    #endregion

    #region [Public Sequence Attribute Class derived from BaseAttribute]
    public class SequenceAttribute : BaseAttribute
    {
        public string SequenceGenerator { get; set; }

        public override bool Validate()
        {
            try
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
                ErrorMessage = errorMessageList.AsEnumerable();
                return errorMessageList.Count > 0 ? false : true;
            }
            catch
            {
                ErrorMessage = errorMessageList.AsEnumerable();
                return false;
            }
        }
    }
    #endregion

    #region [Public Date Attribute Class derived from BaseAttribute]
    public class DateAttribute : BaseAttribute
    {

        public DateAttribute()
        {
            MinDateTimeValues = new DateTimeOffset();
            MaxDateTimeValues = new DateTimeOffset();
            DefaultDateTimeValues = new DateTimeOffset();
        }

        public DateFormatDefaultValues? DateFormat { get; set; }

        public TimeFormatDefaultValues? TimeFormat { get; set; }

        public MinMaxDateTimeDefaultValues? MinimumDateTime { get; set; }

        public MinMaxDateTimeDefaultValues? MaximumDateTime { get; set; }

        public MinMaxDateTimeDefaultValues? DefaultDateTime { get; set; }

        public DateTimeOffset MinDateTimeValues { get; set; }
        public DateTimeOffset MaxDateTimeValues { get; set; }
        public DateTimeOffset DefaultDateTimeValues { get; set; }

        public TimeOffsetType? TimeOffsetType { get; set; }

        public override bool Validate()
        {
            try
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

                ErrorMessage = errorMessageList.AsEnumerable();

                return errorMessageList.Count > 0 ? false : true;
            }
            catch
            {
                ErrorMessage = errorMessageList.AsEnumerable();
                return false;
            }
        }
    }
    #endregion

    #region [Public Time Attribute Class derived from BaseAttribute]
    public class TimeAttribute : BaseAttribute
    {
        public TimeAttribute()
        {
            MinDateTimeValues = new DateTimeOffset();
            MaxDateTimeValues = new DateTimeOffset();
            DefaultDateTimeValues = new DateTimeOffset();
        }

        public DateFormatDefaultValues? DateFormat { get; set; }

        public TimeFormatDefaultValues? TimeFormat { get; set; }

        public MinMaxDateTimeDefaultValues? MinimumDateTime { get; set; }

        public MinMaxDateTimeDefaultValues? MaximumDateTime { get; set; }

        public MinMaxDateTimeDefaultValues? DefaultDateTime { get; set; }

        public DateTimeOffset MinDateTimeValues { get; set; }
        public DateTimeOffset MaxDateTimeValues { get; set; }
        public DateTimeOffset DefaultDateTimeValues { get; set; }

        public TimeOffsetType? TimeOffsetType { get; set; }

        public override bool Validate()
        {
            try
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

                ErrorMessage = errorMessageList.AsEnumerable();

                return errorMessageList.Count > 0 ? false : true;
            }
            catch
            {
                ErrorMessage = errorMessageList.AsEnumerable();
                return false;
            }
        }
    }

    #endregion

    #region [Public DateTime Attribute Class derived from BaseAttribute]
    public class DateTimeAttribute : BaseAttribute
    {
        public DateTimeAttribute()
        {
            MinDateTimeValues = new DateTimeOffset();
            MaxDateTimeValues = new DateTimeOffset();
            DefaultDateTimeValues = new DateTimeOffset();
        }

        public DateFormatDefaultValues? DateFormat { get; set; }

        public TimeFormatDefaultValues? TimeFormat { get; set; }

        public MinMaxDateTimeDefaultValues? MinimumDateTime { get; set; }

        public MinMaxDateTimeDefaultValues? MaximumDateTime { get; set; }

        public MinMaxDateTimeDefaultValues? DefaultDateTime { get; set; }

        public DateTimeOffset MinDateTimeValues { get; set; }
        public DateTimeOffset MaxDateTimeValues { get; set; }
        public DateTimeOffset DefaultDateTimeValues { get; set; }

        public override bool Validate()
        {
            try
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

                ErrorMessage = errorMessageList.AsEnumerable();

                return errorMessageList.Count > 0 ? false : true;
            }
            catch
            {
                ErrorMessage = errorMessageList.AsEnumerable();
                return false;
            }
        }
    }

    public class DateTimeOffset
    {
        public DateTime? Date { get; set; }

        public DateTime? Time { get; set; }

        public int? TimeOffset { get; set; }

        public TimeOffsetType? TimeOffsetType { get; set; }
    }
    #endregion

    #region [Public Text Attribute Class derived from BaseAttribute]
    public class TextAttribute : BaseAttribute
    {
        public Format? Format { get; set; }

        public int? FieldWidth { get; set; }

        public int? MinimumLength { get; set; }

        public int? MaximumLength { get; set; }

        public WordType? MinWordType { get; set; }

        public WordType? MaxWordType { get; set; }

        public string DefaultValue { get; set; }


        public override bool Validate()
        {
            try
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

                // Validation for Attribute DefaultValue
                if (!Validation.IsNullOrEmpty(this.DefaultValue) && !Validation.StringLength(1, 64, this.DefaultValue))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid String Length", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.IsNullOrEmpty(this.DefaultValue) && !Validation.RegularExpression("^.{1,64}$", this.DefaultValue))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid String", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
               
                // Validation for Te Minimum Length
                if (!Validation.IsNullOrEmpty(this.MinimumLength) && !Validation.IsValidRange(1, 2000, this.MinimumLength))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid Range", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.IsNullOrEmpty(this.MinimumLength) && !Validation.RegularExpression("^[0-9]*$", this.MinimumLength))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid number", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                // Validation for Te Maximum Length
                if (!Validation.IsNullOrEmpty(this.MaximumLength) && !Validation.IsValidRange(1, 2000, this.MaximumLength))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid Range", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.IsNullOrEmpty(this.MaximumLength) && !Validation.RegularExpression("^[0-9]*$", this.MaximumLength))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid number", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                // Validation for Te Field Width 
                if (!Validation.IsNullOrEmpty(this.FieldWidth))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.IsNullOrEmpty(this.FieldWidth) && !Validation.IsValidRange(1, 2000, this.FieldWidth))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid Range", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }
                else if (!Validation.IsNullOrEmpty(this.FieldWidth) && !Validation.RegularExpression("^[0-9]*$", this.FieldWidth))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Invalid number", ExceptionStatus);
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
    }
    #endregion

    #region [Public YesNo Attribute Class derived from BaseAttribute]
    public class YesNoAttribute : BaseAttribute
    {
        public string YesValue { get; set; }

        public string NoValue { get; set; }

        public int DefaultValue { get; set; }

        public DisplayType? DisplayType { get; set; }
        public override bool Validate()
        {
            try
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

                // Validation for Attribute Yes Value
                if (Validation.IsNullOrEmpty(this.YesValue))
                {
                    ErrorMessage errorMessage = new ErrorMessage("Yes Value is Required", ExceptionStatus);
                    errorMessageList.Add(errorMessage);
                }

                // Validation for Attribute No Value
                if (Validation.IsNullOrEmpty(this.NoValue))
                {
                    ErrorMessage errorMessage = new ErrorMessage("No Value isRequired", ExceptionStatus);
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
    }
    #endregion

    #region [Public List Attribute Class derived from BaseAttribute]
    public class ListAttribute : BaseAttribute
    {
        public List<ListOptions> ListValues { get; set; }

        public string ListOption { get; set; }

        public ListType? ListType { get; set; }

        public List<string> DefaultSelection { get; set; }

        public DisplayType? DisplayInputType { get; set; }

        public override bool Validate()
        {
            try
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

                ErrorMessage = errorMessageList.AsEnumerable();
                return errorMessageList.Count > 0 ? false : true;
            }
            catch
            {
                ErrorMessage = errorMessageList.AsEnumerable();
                return false;
            }
        }
    }

    public class ListOptions
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SearchId { get; set; }
        public string ContentTypeId { get; set; }
        public string DomainId { get; set; }
    }
    #endregion
    #region [Public SubObject Attribute Class derived from BaseAttribute]
    public class SubObjectAttribute : BaseAttribute
    {
        public string SubObjectType { get; set; }

        public string CustomViewInterface { get; set; }

        public string CustomEditInterface { get; set; }

        public string ViewSubObjectTypeUsing { get; set; }

        public string EditSubObjectTypeUsing { get; set; }

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
            ErrorMessage = errorMessageList.AsEnumerable();
            return errorMessageList.Count > 0 ? false : true;
        }
    }
    #endregion

    #region [Public Enums]

    public enum DocumentClassification
    {
        Any,
        Active,
        Approved,
        Archived
    }

    public enum DocumentType
    {
        AnyDocument,
        SpecificDocument
    }

    public enum Format
    {
        SingleLine,
        MultiLine

    }

    public enum WordType
    {
        Words,
        Characters
    }

    public enum ValueType
    {
        Price,
        Percentage
    }

    public enum DisplayType
    {
        DropDownList,
        RadioButtonList,
        AutoComplete

    }

    public enum InterfaceType
    {
        List,
        Table,
        Custom
    }

    public enum TimeOffsetType
    {
        Days,
        Hours,
        Minutes
    }

    public enum MinMaxDateTimeDefaultValues
    {
        SepecificDate,
        NotSpecified,
        CurrentTimeOffset
    }

    public enum DateFormatDefaultValues
    {
        ddmmyyyy,
        mmddyyyy,
        yyyymmdd
    }

    public enum TimeFormatDefaultValues
    {
        TT24hrs,
        TT2400hrs,
        TT12hrs,
        TT1200hrs
    }

    public enum ListType
    {
        SingleValueSelect,
        MultipleValueSelect
    }

    public class MultipleValues
    {
        public bool? AllowMultipleValues { get; set; }

        public bool? IsUnique { get; set; }

        public bool? IsReArranged { get; set; }

        public int? MinimumValue { get; set; }

        public int? MaximumValue { get; set; }

    }

    #endregion

}
