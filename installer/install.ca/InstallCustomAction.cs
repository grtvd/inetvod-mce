using System;
using System.Configuration.Install;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Windows.Forms;

using iNetVOD.Common.Data;

namespace iNetVOD.MCE.install.ca
{
	[RunInstaller(true)]
	public class InstallCustomAction : System.Configuration.Install.Installer
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

		public InstallCustomAction()
		{
			// This call is required by the Designer.
			InitializeComponent();

			AfterInstall += new InstallEventHandler(AfterInstallEventHandler);
			BeforeRollback += new InstallEventHandler(BeforeRollbackEventHandler);
			BeforeUninstall += new InstallEventHandler(BeforeUninstallEventHandler);
		}

		/// <summary> 
		/// Clean up any resources being used.
		/// </summary>
		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if(components != null)
				{
					components.Dispose();
				}
			}
			base.Dispose( disposing );
		}


		#region Component Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			components = new System.ComponentModel.Container();
		}
		#endregion

		private void CreateDataFiles()
		{
			try
			{
				ConfigDataMgr.CreateNew();
				UserDataMgr.CreateNew();
			}
			catch(Exception e)
			{
				String msg = String.Format("A failure occurred while creating the iNetVOD data files, Message: {0}.",
					e.Message);
				MessageBox.Show(msg);
			}
		}

		private void RegisterMCEApp(bool uninstall, bool raiseFailure)
		{
			try
			{
				//MessageBox.Show("before application");

				String exe = Path.Combine(Path.GetFullPath(Path.Combine(Environment.SystemDirectory,
					"..\\eHome\\")), "RegisterMCEApp.exe");
				String work = System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
				String args = (uninstall ? "/u " : "") + "/allusers iNetVOD.reg.xml";

				//MessageBox.Show(exe);  
				//MessageBox.Show(work);
				//MessageBox.Show(args);

				Process proc = new System.Diagnostics.Process();
				proc.EnableRaisingEvents = false;
				proc.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
				proc.StartInfo.FileName = exe;
				proc.StartInfo.WorkingDirectory = work;
				proc.StartInfo.Arguments = args;
				proc.Start();
				proc.WaitForExit();
				//MessageBox.Show(String.Format("{0}", proc.ExitCode));

				if(proc.ExitCode != 0)
					throw new Exception(String.Format("Bad exit code: {0}", proc.ExitCode));

				//MessageBox.Show("after application"); 
			}
			catch(Exception e)
			{
				String msg = String.Format("A failure occurred while registering iNetVOD under Media Center, Message: {0}.",
					e.Message);

				if(!raiseFailure)
					MessageBox.Show(msg);
				else
					throw new Exception(msg);
			}
		}


		private void AfterInstallEventHandler(object sender, InstallEventArgs ea)
		{
			//MessageBox.Show("InstallCustomAction.AfterInstall");
			CreateDataFiles();
			RegisterMCEApp(false, true);
		}

		private void BeforeRollbackEventHandler(object sender, InstallEventArgs ea)
		{
			//MessageBox.Show("InstallCustomAction.BeforeRollback");
			RegisterMCEApp(true, false);
		}

		private void BeforeUninstallEventHandler(object sender, InstallEventArgs ea)
		{
			//MessageBox.Show("InstallCustomAction.BeforeUninstall");
			RegisterMCEApp(true, false);
		}

//		public override void Install(System.Collections.IDictionary stateSaver)
//		{
//			MessageBox.Show("InstallCustomAction.Install");
//			base.Install (stateSaver);
//		}
//
//		public override void Commit(System.Collections.IDictionary savedState)
//		{
//			MessageBox.Show("InstallCustomAction.Commit");
//			base.Commit (savedState);
//		}
//
//		public override void Rollback(System.Collections.IDictionary savedState)
//		{
//			MessageBox.Show("InstallCustomAction.Rollback");
//			base.Rollback (savedState);
//		}
//
//		public override void Uninstall(System.Collections.IDictionary savedState)
//		{
//			MessageBox.Show("InstallCustomAction.Uninstall");
//			base.Uninstall (savedState);
//		}
	}
}
