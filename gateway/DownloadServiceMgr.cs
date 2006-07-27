#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.IO;
using System.Reflection;

using iNetVOD.Common.Core;
using iNetVOD.Common.Data;

namespace iNetVOD.MCE.Gateway
{
	public class DownloadServiceMgr : IObjectSafety
	{
		#region Constants
		private static String AppPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
		#endregion

		#region Fields
		private ConfigDataMgr fConfigDataMgr;
		private UserDataMgr fUserDataMgr;
		#endregion

		#region Implementation
		public DownloadServiceMgr()
		{
			fConfigDataMgr = ConfigDataMgr.Initialize(AppPath);
			fUserDataMgr = UserDataMgr.Initialize(AppPath,
				fConfigDataMgr.GetConfig().General.LoopIntervalSecs.Value);
			Logger.Initialize(Path.Combine(AppPath, "logs"), fUserDataMgr.EnableLog.Value);
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
			Show show = fUserDataMgr.ShowList.FindByRentedShowID(new RentedShowID(rentedShowID));
			if(show == null)
				return null;
			return show.DownloadStatus.ToString();
		}
		#endregion
	}
}
