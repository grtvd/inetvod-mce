#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;

namespace iNetVOD.Common.Core
{
	public struct TString
	{
		#region Constants
		private const string DEFAULT_VALUE = "";

		public static TString Undefined = new TString();
		#endregion

		#region Fields
		private string fValue;
		public string Value
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
		public TString(object value)
		{
			fIsNotUndefined = false;
			fValue = DEFAULT_VALUE;

			if(value != null)
			{
				if((value is string) && ((value as string).Length == 0))
					return;

				Value = Convert.ToString(value);
			}
		}
		#endregion

		#region Implementation
		public override bool Equals(object obj)
		{
			if(!(obj is TString))
				return false;

			return fValue.Equals(((TString)obj).fValue);
		}

		public override int GetHashCode()
		{
			return fValue.GetHashCode();
		}

		public void Clear()
		{
			fIsNotUndefined = false;
			fValue = DEFAULT_VALUE;
		}

		public override string ToString()
		{
			if(IsUndefined)
				return null;

			return fValue;
		}
		#endregion
	}
}
