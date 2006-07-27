#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Collections;
using System.Reflection;

namespace iNetVOD.Common.Data
{
	public class DownloadShowList : ArrayList
	{
		public static readonly ConstructorInfo Ctor = typeof(DownloadShowList).GetConstructor(new Type[] {});

		public DownloadShow FindByRentedShowID(RentedShowID rentedShowID)
		{
			foreach(DownloadShow downloadShow in this)
				if(downloadShow.RentedShowID.Equals(rentedShowID))
					return downloadShow;
			return null;
		}

		public bool ContainsByRentedShowID(RentedShowID rentedShowID)
		{
			return FindByRentedShowID(rentedShowID) != null;
		}
	}
}
