#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Runtime.InteropServices;

namespace iNetVOD.MCE.Gateway
{
	/// <summary>
	/// See Internet SDK, IObjectSafety.
	/// </summary>
	[ComVisible(true)]
	[ComImport]
	[Guid("CB5BDC81-93C1-11cf-8F20-00805F2CD064")]
	[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
	public interface IObjectSafety
	{
		void GetInterfaceSafetyOptions(ref Guid riid, out int
			supportedOptions, out int enabledOptions);
		void SetInterfaceSafetyOptions(ref Guid riid, int
			optionSetMask, int enabledOptions);
	}

}
