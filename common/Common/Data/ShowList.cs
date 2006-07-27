#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Collections;
using System.Reflection;

namespace iNetVOD.Common.Data
{
	public class ShowList : ArrayList
	{
		public static readonly ConstructorInfo Ctor = typeof(ShowList).GetConstructor(new Type[] {});

		public override object Clone()
		{
			ShowList showList = new ShowList();
			foreach(Show show in this)
				showList.Add(show);
			return showList;
		}

		public Show FindByRentedShowID(RentedShowID rentedShowID)
		{
			foreach(Show show in this)
				if(show.RentedShowID.Equals(rentedShowID))
					return show;
			return null;
		}

		public Show FindByDataFileName(String dataFileName)
		{
			foreach(Show show in this)
				if(show.DataFileName.Value.Equals(dataFileName))
					return show;
			return null;
		}

		public bool ContainsByRentedShowID(RentedShowID rentedShowID)
		{
			return FindByRentedShowID(rentedShowID) != null;
		}

		public bool ContainsByDataFileName(String dataFileName)
		{
			return FindByDataFileName(dataFileName) != null;
		}
	}
}
