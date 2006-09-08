#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.IO;
using System.Reflection;

using iNetVOD.Common.Core;
using iNetVOD.Common.Data;
using iNetVOD.Common.Request;

namespace iNetVOD.MCE.DSL
{
	public class Session
	{
		#region Fields
		private static Session fTheSession;

		private TString fNetworkURL;
		private bool fCanPingServer = false;

		private Player fPlayer = null;

		private bool fIsUserLoggedOn = false;
		private TString fUserID;
		private TString fUserPassword;
		private bool fBadUserCredentials = false;
		private TString fSessionData;
		private TDateTime fSessionExpires;
		#endregion

		#region Properties
		public bool CanPingServer { get { return fCanPingServer; } }

		public bool HaveUserCredentials
		{
			get
			{
				if(!fUserID.Equals(UserDataMgr.GetThe().UserLogonID))
				{
					fUserID = UserDataMgr.GetThe().UserLogonID;
					fBadUserCredentials = false;
				}

				if(!fUserPassword.Equals(UserDataMgr.GetThe().UserPIN))
				{
					fUserPassword = UserDataMgr.GetThe().UserPIN;
					fBadUserCredentials = false;
				}
				
				return !fBadUserCredentials && !fUserID.IsUndefined && !fUserPassword.IsUndefined;
			}
		}

		public bool IsUserLoggedOn { get { return fIsUserLoggedOn; } }

		public bool HasSessionExpired
		{
			get
			{
				if(fSessionExpires.IsUndefined)
					return false;
				return fSessionExpires.Value < DateTime.Now;
			}
		}
		#endregion

		#region Construction
		private Session()
		{
		}

		public static Session GetThe()
		{
			if(fTheSession == null)
				fTheSession = new Session();
			return fTheSession;
		}

		public static void Reset()
		{
			if(fTheSession != null)
			{
				fTheSession.fCanPingServer = false;
				fTheSession.fIsUserLoggedOn = false;
				fTheSession.fSessionData = TString.Undefined;
				fTheSession.fSessionExpires = TDateTime.Undefined;
			}
		}

		public void LoadFromConfig()
		{
			/************************************************************************/
			ConfigDataMgr configDataMgr = ConfigDataMgr.Initialize();
			Config config = configDataMgr.GetConfig();
			fNetworkURL = config.General.iNetVODServiceURL;
			fPlayer = config.Player;

			DataRequestor.Initialize(fNetworkURL);
			/************************************************************************/

			/************************************************************************/
			UserDataMgr userDataMgr = UserDataMgr.Initialize(config.General.LoopIntervalSecs.Value);

			fUserID = userDataMgr.UserLogonID;
			fUserPassword = userDataMgr.UserPIN;
			/************************************************************************/

			Logger.Initialize(userDataMgr.EnableLog.Value);
		}
		#endregion

		#region Implementation
		public bool PingServer()
		{
			StatusCode statusCode = StatusCode.sc_GeneralError;

			try
			{
				DataRequestor dataRequestor = DataRequestor.NewInstance();
				statusCode = dataRequestor.PingRequest();

				if(statusCode == StatusCode.sc_Success)
				{
					fCanPingServer = true;
					return fCanPingServer;
				}
			}
			catch(Exception)
			{
			}

			return fCanPingServer;
		}

		public StatusCode Signon()
		{
			StatusCode statusCode = StatusCode.sc_GeneralError;

			fIsUserLoggedOn = false;

			if(fUserID.IsUndefined)
				throw new Exception("Session.Signon: Missing UserID");
			if(fUserPassword.IsUndefined)
				throw new Exception("Session.Signon: Missing UserPassword");

			SignonRqst signonRqst;
			SignonResp signonResp;

			//TODO: encrypt UserID and Password

			signonRqst = SignonRqst.NewInstance();
			signonRqst.UserID = fUserID;
			signonRqst.Password = fUserPassword;
			signonRqst.Player = fPlayer;

			try
			{
				DataRequestor dataRequestor = DataRequestor.NewInstance();
				signonResp = dataRequestor.SignonRequest(signonRqst);
				statusCode = dataRequestor.StatusCode;

				if(statusCode == StatusCode.sc_Success)
				{
					fSessionData = signonResp.SessionData;
					fSessionExpires = signonResp.SessionExpires;
					//fMemberPrefs = signonResp.MemberState.MemberPrefs;
					//fIncludeAdult = fMemberPrefs.IncludeAdult;
					//fCanAccessAdult = (fIncludeAdult == ina_Always);
					//fMemberProviderList = signonResp.MemberState.MemberProviderList;

					fIsUserLoggedOn = true;
					return statusCode;
				}
				else if(statusCode == StatusCode.sc_InvalidUserIDPassword)
					fBadUserCredentials = true;
			}
			catch(Exception)
			{
			}

			return statusCode;
		}

		public DownloadShowList DownloadShowList()
		{
			StatusCode statusCode = StatusCode.sc_GeneralError;

			DownloadShowListRqst downloadShowListRqst;
			DownloadShowListResp downloadShowListResp;

			downloadShowListRqst = DownloadShowListRqst.NewInstance();

			try
			{
				DataRequestor dataRequestor = DataRequestor.NewInstance(fSessionData);
				downloadShowListResp = dataRequestor.DownloadShowListRequest(downloadShowListRqst);
				statusCode = dataRequestor.StatusCode;
				if(dataRequestor.ResetNeeded)
					Reset();

				if(statusCode == StatusCode.sc_Success)
					return downloadShowListResp.DownloadShowList;
			}
			catch(Exception)
			{
			}

			return null;
		}

		public StatusCode ReleaseShow(RentedShowID rentedShowID)
		{
			StatusCode statusCode = StatusCode.sc_GeneralError;

			ReleaseShowRqst releaseShowRqst;
			ReleaseShowResp releaseShowResp;

			releaseShowRqst = ReleaseShowRqst.NewInstance();
			releaseShowRqst.RentedShowID = rentedShowID;

			try
			{
				DataRequestor dataRequestor = DataRequestor.NewInstance(fSessionData);
				releaseShowResp = dataRequestor.ReleaseShowRequest(releaseShowRqst);
				statusCode = dataRequestor.StatusCode;
				if(dataRequestor.ResetNeeded)
					Reset();
			}
			catch(Exception)
			{
			}

			return statusCode;
		}
		#endregion
	}
}
