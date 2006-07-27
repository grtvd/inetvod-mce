#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;

namespace iNetVOD.Common.Core
{
	public struct TByte
	{
		#region Constants
		private const byte DEFAULT_VALUE = 0;

		public static TByte Undefined = new TByte();
		public static TByte Zero = new TByte(0);
		#endregion

		#region Fields
		private byte fValue;
		public byte Value
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
		public TByte(byte value)
		{
			fValue = value;
			fIsNotUndefined = true;
		}

		public TByte(object value)
		{
			fIsNotUndefined = false;
			fValue = DEFAULT_VALUE;

			if(value != null)
			{
				if((value is string) && ((value as string).Length == 0))
					return;

				Value = Convert.ToByte(value);
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
