#region Copyright
// Copyright © 2006-2007 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;

using iNetVOD.Common.Core;
using iNetVOD.Common.Data;

namespace iNetVOD.MCE.Gateway
{
	public class DownloadServiceMgr : IObjectSafety
	{
		#region Constants
		private static string QuickTimePlayer = "qt";
		private static string WindowsMediaPlayer = "wm";
		private static string InternetExplorer = "ie";
		#endregion

		#region Fields
		private ConfigDataMgr fConfigDataMgr;
		private UserDataMgr fUserDataMgr;
		#endregion

		#region Implementation
		public DownloadServiceMgr()
		{
			fConfigDataMgr = ConfigDataMgr.Initialize();
			fUserDataMgr = UserDataMgr.Initialize(fConfigDataMgr.GetConfig()
				.General.LoopIntervalSecs.Value);
			Logger.Initialize(fUserDataMgr.EnableLog.Value);
		}

		public void GetInterfaceSafetyOptions(ref Guid riid, out int supportedOptions, out int enabledOptions)
		{
			supportedOptions = 3;
			enabledOptions = 3;
		}

		public void SetInterfaceSafetyOptions(ref Guid riid, int optionSetMask, int enabledOptions)
		{
		}

		public void refresh()
		{
			fUserDataMgr.Refresh();
		}

		public string getPlayerSerialNo()
		{
			return fConfigDataMgr.GetConfig().Player.SerialNo.ToString();   
		}

		public int getMaxSizeForShows()
		{
			return fUserDataMgr.MaxSizeForShows.Value;
		}

		public void setMaxSizeForShows(int maxSizeForShows)
		{
			fUserDataMgr.SetMaxSizeForShows(maxSizeForShows);
		}

		public string getUserLogonID()
		{
			return fUserDataMgr.UserLogonID.ToString();
		}

		public string getUserPIN()
		{
			return fUserDataMgr.UserPIN.ToString();     
		}

		public bool getRememberUserPIN()
		{
			return fUserDataMgr.RememberUserPIN.Value;  
		}

		public void setUserCredentials(string userLogonID, string userPIN, bool rememberUserPIN)
		{
			Logger.LogInfo(this, "setUserCredentials", String.Format("userLogonID({0}), userPIN({1}), rememberUserPIN({2})", userLogonID, userPIN, rememberUserPIN));

			fUserDataMgr.SetUserCredentials(new TString(userLogonID), new TString(userPIN),
				new TBool(rememberUserPIN));
		}

		public bool getEnableLog()
		{
			return fUserDataMgr.EnableLog.Value;
		}

		public void setEnableLog(bool enable)
		{
			fUserDataMgr.SetEnableLog(enable);
		}

		public void processNow()
		{
			fUserDataMgr.SetNextProcessNow();
		}

		public string getRentedShowPath(string rentedShowID)
		{
			Show show = fUserDataMgr.ShowList.FindByRentedShowID(new RentedShowID(rentedShowID));
			if(show == null)
				return null;
			return Path.Combine(fUserDataMgr.LocalShowPath.ToString(), show.DataFileName.ToString());
		}

		public string getRentedShowStatus(string rentedShowID)
		{
			Logger.LogInfo(this, "getRentedShowStatus", String.Format("rentedShowID({0})", rentedShowID));
			Show show = fUserDataMgr.ShowList.FindByRentedShowID(new RentedShowID(rentedShowID));
			if(show == null)
				return null;
			return show.DownloadStatus.ToString();
		}

		public bool playRentedShow(string rentedShowID, string useApp)
		{
			Logger.LogInfo(this, "playRentedShow", String.Format("rentedShowID({0}), useApp({1})", rentedShowID, useApp));
			Show show = fUserDataMgr.ShowList.FindByRentedShowID(new RentedShowID(rentedShowID));
			if(show == null)
				return false;
			return openPlayer(Path.Combine(fUserDataMgr.LocalShowPath.ToString(), show.DataFileName.ToString()),
				useApp);
		}

		private bool openPlayer(string mediaFile, string useApp)
		{
			Logger.LogInfo(this, "openPlayer", String.Format("mediaFile({0}), useApp({1})", mediaFile, useApp));
			if(QuickTimePlayer.Equals(useApp))
				openQuickTime(mediaFile);
			else if(WindowsMediaPlayer.Equals(useApp))
				openMediaPlayer(mediaFile);
			else if(InternetExplorer.Equals(useApp))
				openInternetExplorer(mediaFile);
			else
				return false;

			return true;
		}

		private void openMediaPlayer(string mediaFile)
		{
			Process proc = new System.Diagnostics.Process();
			proc.EnableRaisingEvents = false;
			//proc.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
			proc.StartInfo.FileName = "C:\\Program Files\\Windows Media Player\\wmplayer.exe";
			//proc.StartInfo.WorkingDirectory = work;
			proc.StartInfo.Arguments = "/prefetch:9 /Play \"" + mediaFile + "\"";
			proc.Start();
			//proc.WaitForExit();
		}

		private void openQuickTime(string mediaFile)
		{
			Process proc = new System.Diagnostics.Process();
			proc.EnableRaisingEvents = false;
			//proc.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
			proc.StartInfo.FileName = "C:\\Program Files\\QuickTime\\QuickTimePlayer.exe";
			//proc.StartInfo.WorkingDirectory = work;
			proc.StartInfo.Arguments = "\"" + mediaFile + "\"";
			proc.Start();
			//proc.WaitForExit();
		}

		private void openInternetExplorer(string mediaFile)
		{
			Process proc = new System.Diagnostics.Process();
			proc.EnableRaisingEvents = false;
			//proc.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
			proc.StartInfo.FileName = "C:\\Program Files\\Internet Explorer\\iexplore.exe";
			//proc.StartInfo.WorkingDirectory = work;
			proc.StartInfo.Arguments = mediaFile;
			proc.Start();
			//proc.WaitForExit();
		}
		#endregion
	}
}
