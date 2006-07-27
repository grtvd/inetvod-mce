#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Reflection;

using iNetVOD.Common.Core;

namespace iNetVOD.Common.Data
{

	public class Settings : Readable, Writeable
	{
		#region Constants
		public static readonly ConstructorInfo CtorDataReader = typeof(Settings).GetConstructor(new Type[] { typeof (DataReader) });
		#endregion

		#region Fields
		private TString fLocalShowPath;
		private TInt32 fMaxSizeForShows;
		private TString fUserLogonID;
		private TString fUserPIN;
		private TBool fRememberUserPIN;
		private TBool fEnableLog;
		private TDateTime fNextProcessTime;
		#endregion

		#region Properties
		public TString LocalShowPath 
		{ 
			get { return fLocalShowPath; } 
			set { fLocalShowPath = value; }
		}
		public TInt32 MaxSizeForShows  
		{ 
			get { return fMaxSizeForShows; } 
			set { fMaxSizeForShows = value; }
		}
		public TString UserLogonID 
		{ 
			get { return fUserLogonID; } 
			set { fUserLogonID = value; }
		}
		public TString UserPIN 
		{ 
			get { return fUserPIN; } 
			set { fUserPIN = value; }
		}
		public TBool RememberUserPIN 
		{ 
			get { return fRememberUserPIN; } 
			set { fRememberUserPIN = value; }
		}
		public TBool EnableLog 
		{ 
			get { return fEnableLog; } 
			set { fEnableLog = value; }
		}
		public TDateTime NextProcessTime
		{
			get { return fNextProcessTime; }
			set { fNextProcessTime = value; }
		}
		#endregion

		#region Constuction
		public Settings(DataReader reader)
		{
			ReadFrom(reader);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			fLocalShowPath = reader.ReadString("LocalShowPath", 500);
			fMaxSizeForShows = reader.ReadInt("MaxSizeForShows");
			fUserLogonID = reader.ReadString("UserLogonID", 500);
			fUserPIN = reader.ReadString("UserPIN", 500);
			fRememberUserPIN = reader.ReadBoolean("RememberUserPIN");
			fEnableLog = reader.ReadBoolean("EnableLog"); 
			fNextProcessTime = reader.ReadDateTime("NextProcessTime");
		}

		public void WriteTo(DataWriter writer)
		{
			writer.WriteString("LocalShowPath",  fLocalShowPath, 500);
			writer.WriteInt("MaxSizeForShows",  fMaxSizeForShows);
			writer.WriteString("UserLogonID",  fUserLogonID, 500);
			writer.WriteString("UserPIN",  fUserPIN, 500);
			writer.WriteBoolean("RememberUserPIN",  fRememberUserPIN);
			writer.WriteBoolean("EnableLog", fEnableLog); 
			writer.WriteDateTime("NextProcessTime",   fNextProcessTime);
		}
		#endregion
	}
}
