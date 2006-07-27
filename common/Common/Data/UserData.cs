#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Reflection;

using iNetVOD.Common.Core;

namespace iNetVOD.Common.Data
{
	/// <summary>
	/// Fetch Data from user.xml
	/// </summary>
	public class UserData : Readable, Writeable
	{
		#region Constants
		public static readonly ConstructorInfo CtorDataReader = typeof(UserData).GetConstructor(new Type[] { typeof (DataReader) });
		#endregion

		#region Fields
		private Settings fSettings;
		private ShowList fShowList;
		#endregion

		#region Properties
		public Settings Settings { get { return fSettings; } }
		public ShowList ShowList { get { return fShowList; } }
		#endregion

		#region Constuction
		public UserData(DataReader reader)
		{
			ReadFrom(reader);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			fSettings = (Settings)reader.ReadObject("Settings", Settings.CtorDataReader );
			fShowList = (ShowList)reader.ReadList("Show", ShowList.Ctor,  Show.CtorDataReader  );
		}

		public void WriteTo(DataWriter writer)
		{
			writer.WriteObject("Settings", fSettings);
			writer.WriteList("Show", fShowList);
		}
		#endregion	
	}
}

