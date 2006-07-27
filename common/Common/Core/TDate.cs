#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;

namespace iNetVOD.Common.Core
{
	public struct TDate
	{
		#region Constants
		private static readonly DateTime DEFAULT_VALUE = DateTime.MinValue;

		public static TDate Undefined = new TDate();
		#endregion

		#region Fields
		private DateTime fValue;
		public DateTime Value
		{
			get
			{
				if(IsUndefined)
					return DEFAULT_VALUE;
				return fValue;
			}
			set
			{
				fIsNotUndefined = true;
				fValue = value;
			}
		}

		private bool fIsNotUndefined;	// needs to be 'not' so that 'struct' ctor defaults to false
		public bool IsUndefined
		{
			get { return !fIsNotUndefined; }
		}
		#endregion

		#region Constuction
		public TDate(DateTime value)
		{
			fValue = value;
			fIsNotUndefined = true;
		}

		public TDate(object value)
		{
			fIsNotUndefined = false;
			fValue = DEFAULT_VALUE;

			if(value != null)
			{
				if((value is string) && ((value as string).Length == 0))
					return;

				Value = Convert.ToDateTime(value);
			}
		}
		#endregion

		#region Implementation
		public void Clear()
		{
			fIsNotUndefined = false;
			fValue = DEFAULT_VALUE;
		}

		public override string ToString()
		{
			if(IsUndefined)
				return null;

			return fValue.ToString("yyyy'-'MM'-'dd");
		}
		#endregion
	}
}
