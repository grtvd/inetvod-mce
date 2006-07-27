#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;

namespace iNetVOD.Common.Core
{
	/// <summary>
	/// Supports writing to a DataWriter
	/// </summary>
	public interface Writeable
	{
		void WriteTo(DataWriter writer);
	}
}
