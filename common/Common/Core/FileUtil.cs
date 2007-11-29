#region Copyright
// Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;

namespace iNetVOD.Common.Core
{
	public class FileUtil
	{
		private FileUtil()
		{
		}

		public static String DetermineFileExtFromURL(String url)
		{
			if(url == null)
				return null;

			int dotPos = url.LastIndexOf(".");
			if(dotPos < 0)
				return null;

			if(url.LastIndexOf("/") >= dotPos)
				return null;

			int paramPos = url.LastIndexOf("?");
			if(paramPos >= dotPos)
				return url.Substring(dotPos, paramPos - dotPos);

			return url.Substring(dotPos).Trim();
		}
	}
}