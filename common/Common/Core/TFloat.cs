#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;

namespace iNetVOD.Common.Core
{
	public struct TFloat
	{
		#region Constants
		private const float DEFAULT_VALUE = 0;

		public static TFloat Undefined = new TFloat();
		public static TFloat Zero = new TFloat(0);
		#endregion

		#region Fields
		private float fValue;
		public float Value
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
		public TFloat(float value)
		{
			fValue = value;
			fIsNotUndefined = true;
		}

		public TFloat(object value)
		{
			fIsNotUndefined = false;
			fValue = DEFAULT_VALUE;

			if(value != null)
			{
				if((value is string) && ((value as string).Length == 0))
					return;

				Value = Convert.ToSingle(value);
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
