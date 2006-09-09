#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.ServiceProcess;
using System.Threading;
using System.Timers;

using iNetVOD.Common.Core;
using iNetVOD.Common.Data;
using iNetVOD.MCE.DSL.Process;

namespace iNetVOD.MCE.DSL
{
#if DEBUG
	public class AppService
#else
	public class AppService : System.ServiceProcess.ServiceBase
#endif
	{
		public static string Name = "iNetVOD MCE Download Service";
		private static int SleepSecs = 2;

		/// <summary> 
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

#if !DEBUG
		private System.Timers.Timer fTimer;
		private bool fRunning = false;
#endif

		public AppService()
		{
			// This call is required by the Windows.Forms Component Designer.
			InitializeComponent();
#if !DEBUG
			CanStop = true;
			CanShutdown = true;

			// setup the timer
			fTimer = new System.Timers.Timer();
			fTimer.AutoReset = true;
			fTimer.Interval = SleepSecs * 1000;
			fTimer.Elapsed += new ElapsedEventHandler(OnTimerElapsed);
#endif

			// initialize Session from config file
			Session.GetThe().LoadFromConfig();
		}

		// The main entry point for the process
		static void Main()
		{
#if DEBUG
			(new AppService()).MainLoop();
#else
			System.ServiceProcess.ServiceBase[] ServicesToRun;
	
			// More than one user Service may run within the same process. To add
			// another service to this process, change the following line to
			// create a second service object. For example,
			//
			//   ServicesToRun = new System.ServiceProcess.ServiceBase[] {new AppService(), new MySecondUserService()};
			//
			ServicesToRun = new System.ServiceProcess.ServiceBase[] { new AppService() };
			System.ServiceProcess.ServiceBase.Run(ServicesToRun);
#endif
		}

		/// <summary> 
		/// Required method for Designer support - do not modify 
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			components = new System.ComponentModel.Container();
#if !DEBUG
			ServiceName = Name;
#endif
		}

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
#if !DEBUG
		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if (components != null) 
				{
					components.Dispose();
				}
			}
			base.Dispose( disposing );
		}
#endif

#if !DEBUG
		/// <summary>
		/// Set things in motion so your service can do its work.
		/// </summary>
		protected override void OnStart(string[] args)
		{
			Logger.LogInfo(this, "OnStart", null);
			fTimer.Enabled = true;
		}

		/// <summary>
		/// Stop this service.
		/// </summary>
		protected override void OnStop()
		{
			Logger.LogInfo(this, "OnStop", null);
			fTimer.Enabled = false;

			while(fRunning)
				Thread.Sleep(1000);
		}

		protected override void OnShutdown()
		{
			Logger.LogInfo(this, "OnShutdown", null);
			fTimer.Enabled = false;

			while(fRunning)
				Thread.Sleep(1000);
		}

		public void OnTimerElapsed(object sender, ElapsedEventArgs e)
		{
			fTimer.Enabled = false;
			fRunning = true;
			RunOnce();
			fRunning = false;
			fTimer.Enabled = true;
		}
#endif
		
#if DEBUG
		private void MainLoop()
		{
			int sleepMillis = SleepSecs * 1000;

			while(true)
			{
				RunOnce();

				// sleep for a bit
				Thread.Sleep(sleepMillis);
			}
		}
#endif

		private void RunOnce()
		{
			try
			{
				// get the Session
				Session session = Session.GetThe();

				// get the user data manager
				UserDataMgr userDataMgr = UserDataMgr.GetThe();

				// fetch next processing time
				long nextProcessTimeTicks = userDataMgr.GetNextProcessTick();
				if(DateTime.Now.Ticks >= nextProcessTimeTicks)
				{
					Logger.LogInfo(this, "RunOnce", "Processing");

					if(session.HaveUserCredentials && (!session.IsUserLoggedOn || session.HasSessionExpired))
					{
						if(session.PingServer())
							session.Signon();
					}

					if(session.IsUserLoggedOn)
					{
						DownloadShowList downloadShowList = session.DownloadShowList();
						if((downloadShowList != null) &&
								(new UpdateUserDataShowList()).DoUpdate(downloadShowList))
							return;	// progess again immediately
					}

					// increment next processing time in UserData
					userDataMgr.IncNextProcessTick(nextProcessTimeTicks);
				}
			}
			catch(Exception e)
			{
				Logger.LogError(this, "RunOnce", e.StackTrace);
			}
		}
	}
}
