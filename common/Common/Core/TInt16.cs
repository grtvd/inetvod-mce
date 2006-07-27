#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;

namespace iNetVOD.Common.Core
{
	public struct TInt16
	{
		#region Constants
		private const short DEFAULT_VALUE = 0;

		public static TInt16 Undefined = new TInt16();
		public static TInt16 Zero = new TInt16(0);
		#endregion

		#region Fields
		private short fValue;
		public short Value
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
		public TInt16(short value)
		{
			fValue = value;
			fIsNotUndefined = true;
		}

		public TInt16(object value)
		{
			fIsNotUndefined = false;
			fValue = DEFAULT_VALUE;

			if(value != null)
			{
				if((value is string) && ((value as string).Length == 0))
					return;

				Value = Convert.ToInt16(value);
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

			return String.Format("{0}", fValue);
		}
		#endregion
	}
}
