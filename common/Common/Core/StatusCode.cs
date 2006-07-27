#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;

namespace iNetVOD.Common.Core
{
	public enum StatusCode
	{
		sc_Success = 0,

		sc_InvalidUserIDPassword = 1000,
		sc_InvalidSession = 1001,

		sc_GeneralError = 9999
	}
}
