#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.IO;
using System.Threading;
using System.Text;

using iNetVOD.Common;
using iNetVOD.Common.Core;

namespace iNetVOD.Common.Data
{
	public class UserDataMgr
	{
		#region Constants
		public static string UserFileName = "user.xml";
		private static string UserElement = "UserData";
		private static int FileOpenTries = 5;
		private static int FileOpenRetryWaitTicks = 1000;
		#endregion

		#region Fields
		private static UserDataMgr fTheUserDataMgr;

		private string fUserFilePath;
		private long fNextProcessTimeIncTicks;

		private Settings fSettings;	// short-term cache of Settings data
		private ShowList fShowList;	// short-term cache of Shows data
		#endregion

		#region Properties
		public TString LocalShowPath { get { return fSettings.LocalShowPath; } }
		public TInt32 MaxSizeForShows { get { return fSettings.MaxSizeForShows; } }
		public TString UserLogonID { get { return fSettings.UserLogonID; } }
		public TString UserPIN { get { return fSettings.UserPIN; } }
		public TBool RememberUserPIN { get { return fSettings.RememberUserPIN; } }
		public TBool EnableLog { get { return fSettings.EnableLog; } }
		public ShowList ShowList { get { return (ShowList)fShowList.Clone(); } }
		#endregion

		#region Construction
		private UserDataMgr(string fileLocation, long nextProcessTimeIncSecs)
		{
			fUserFilePath = Path.Combine(fileLocation, UserFileName);
			fNextProcessTimeIncTicks = nextProcessTimeIncSecs * TimeSpan.TicksPerSecond;
		}

		public static void CreateNew()
		{
			UserDataMgr userDataMgr = new UserDataMgr(AppSettings.AppDataPath, 0);
			userDataMgr.CreateDataFile();
		}

		public static UserDataMgr Initialize(long nextProcessTimeIncSecs)
		{
			fTheUserDataMgr = new UserDataMgr(AppSettings.AppDataPath, nextProcessTimeIncSecs);
			fTheUserDataMgr.Refresh();
			return fTheUserDataMgr;
		}

		public static UserDataMgr GetThe()
		{
			return fTheUserDataMgr;
		}
		#endregion

		#region Implementation
		public void Refresh()
		{
			Stream stream = OpenDataFile();
			try
			{
				ReadDataFile(stream);
			}
			finally
			{
				stream.Close();
			}
		}

		public void SetMaxSizeForShows(int maxSizeForShows)
		{
			Stream stream = OpenDataFile();
			try
			{
				UserData userData = ReadDataFile(stream);

				userData.Settings.MaxSizeForShows = new TInt32(maxSizeForShows);

				WriteDataFile(stream, userData);
			}
			finally
			{
				stream.Close();
			}
		}

		public void SetShowsConfigDetails(int maxSizeForShows, string pathForShows)
		{
			Stream stream = OpenDataFile();
			try
			{
				UserData userData = ReadDataFile(stream);

				userData.Settings.MaxSizeForShows = new TInt32(maxSizeForShows);
				userData.Settings.LocalShowPath = new TString(pathForShows);

				WriteDataFile(stream, userData);
			}
			finally
			{
				stream.Close();
			}
		}

		public void SetUserCredentials(TString userLogonID, TString userPIN, TBool rememberUserPIN)
		{
			Stream stream = OpenDataFile();
			try
			{
				UserData userData = ReadDataFile(stream);

				fSettings.UserLogonID = userLogonID;
				fSettings.UserPIN = userPIN;
				fSettings.RememberUserPIN = rememberUserPIN;

				WriteDataFile(stream, userData);
			}
			finally
			{
				stream.Close();
			}
		}

		public void SetEnableLog(bool enableLog)
		{
			Stream stream = OpenDataFile();
			try
			{
				UserData userData = ReadDataFile(stream);

				userData.Settings.EnableLog = new TBool(enableLog);

				WriteDataFile(stream, userData);
			}
			finally
			{
				stream.Close();
			}
		}

		public long GetNextProcessTick()
		{
			Stream stream = OpenDataFile();
			try
			{
				return ReadDataFile(stream).Settings.NextProcessTime.Value.Ticks;
			}
			finally
			{
				stream.Close();
			}
		}

		public void SetNextProcessNow()
		{
			Stream stream = OpenDataFile();
			try
			{
				UserData userData = ReadDataFile(stream);

				userData.Settings.NextProcessTime = new TDateTime(DateTime.Now);

				WriteDataFile(stream, userData);
			}
			finally
			{
				stream.Close();
			}
		}

		public long IncNextProcessTick(long lastProcessTick)
		{
			Stream stream = OpenDataFile();
			try
			{
				UserData userData = ReadDataFile(stream);
				long nextProcessTick;

				if(userData.Settings.NextProcessTime.Value.Ticks == lastProcessTick)
				{
					nextProcessTick = lastProcessTick + (((DateTime.Now.Ticks
						- lastProcessTick) / fNextProcessTimeIncTicks) + 1)
						* fNextProcessTimeIncTicks;

					userData.Settings.NextProcessTime = new TDateTime(new DateTime(nextProcessTick));
					WriteDataFile(stream, userData);
				}
				else
					nextProcessTick = userData.Settings.NextProcessTime.Value.Ticks;

				return nextProcessTick;
			}
			finally
			{
				stream.Close();
			}
		}

		public void SaveShowList(ShowList showList)
		{
			Stream stream = OpenDataFile();
			try
			{
				UserData userData = ReadDataFile(stream);

				userData.ShowList.Clear();
				userData.ShowList.AddRange(showList);

				WriteDataFile(stream, userData);
			}
			finally
			{
				stream.Close();
			}
		}

		private void CreateDataFile()
		{
			string fileDir = Path.GetDirectoryName(fUserFilePath);
			if(!Directory.Exists(fileDir))
				Directory.CreateDirectory(fileDir);

			if(File.Exists(fUserFilePath))
				return;

			Stream stream = new FileStream(fUserFilePath, FileMode.CreateNew, FileAccess.ReadWrite, FileShare.None);
			try
			{
				string localShowPath = Path.Combine(Path.GetFullPath(Path.Combine(Path.Combine(
					Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData),
					".."), "Documents")), "iNetVOD");

				StreamWriter streamWriter = new StreamWriter(stream, Encoding.UTF8);
				streamWriter.Write(String.Format(
@"<?xml version=""1.0"" encoding=""utf-8""?>
<UserData>
  <Settings>
    <LocalShowPath>{0}</LocalShowPath>
    <MaxSizeForShows>20</MaxSizeForShows>
  </Settings>
</UserData>", localShowPath));
				streamWriter.Flush();
			}
			finally
			{
				stream.Close();
			}
		}

		private FileStream OpenDataFile()
		{
			for(int i = 0; i < FileOpenTries; i++)
			{
				try
				{
					return new FileStream(fUserFilePath, FileMode.Open, FileAccess.ReadWrite, FileShare.None);
				}
				catch(Exception)
				{
					//file locked by another process, do nothing
					Logger.LogWarning(this, "OpenDataFile", String.Format("Can't open file({0})", fUserFilePath));
				}

				Thread.Sleep(FileOpenRetryWaitTicks);
			}

			throw new Exception(String.Format("Can't open file({0})", fUserFilePath));
		}

		private UserData ReadDataFile(Stream stream)
		{
			XmlDataReader reader = new XmlDataReader(stream);
			UserData userData = (UserData)reader.ReadObject(UserElement, UserData.CtorDataReader);

			fSettings = userData.Settings;
			fShowList = userData.ShowList;

			return userData;
		}

		private void WriteDataFile(Stream stream, UserData userData)
		{
			stream.Seek(0, SeekOrigin.Begin);
			stream.SetLength(0);
			XmlDataWriter writer = new XmlDataWriter(stream);
			try
			{
				writer.PrettyPrint = true;
				writer.WriteObject(UserElement, userData);
			}
			finally
			{
				writer.Close();
			}
		}
		#endregion
	}
}
