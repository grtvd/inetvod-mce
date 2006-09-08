#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.IO;

using iNetVOD.Common;

namespace iNetVOD.Common.Core
{
	/// <summary>
	/// Summary description for logger.
	/// </summary>
	public class Logger
	{
		#region Constants
		private static String LogFileNameFormat = "log-{0}.txt";
		#endregion

		#region Fields
		private static bool fLoggerEnabled = false;
		private static string fLogDir;
		private static string fLogFile;
		#endregion

		#region Properties
		public static bool Enabled { get { return fLoggerEnabled; } }
		#endregion

		#region Construction
		private Logger()
		{
		}

		public static void Initialize(bool enable)
		{
			fLoggerEnabled = enable;
			fLogDir = Path.Combine(AppSettings.AppDataPath, "logs");

			if(fLoggerEnabled)
			{
				DirectoryInfo dirInfo = new DirectoryInfo(fLogDir);
				if(!dirInfo.Exists)  
					dirInfo.Create();

				fLogFile = Path.Combine(fLogDir, String.Format(LogFileNameFormat,
					DateTime.Now.ToString("yyyy-MM-dd")));
			}
		}
		#endregion

		#region Implementation
		public static void LogWarning(object objClass, string method, string warning)
		{
			LogFile(string.Format("{0}|{1}|{2}|{3}", "WARN",  objClass, method, warning));
		}

		public static void LogInfo(object objClass, string method, string info)
		{
			LogFile(string.Format("{0}|{1}|{2}|{3}", "INFO",  objClass, method, info));
		}

		public static void LogError(object objClass, string method, Exception ex)
		{
			LogFile(string.Format("{0}|{1}|{2}|{3}", "ERROR",  objClass, method, ex));
		}

		public static void LogError(object objClass, string method, string message, Exception ex)
		{
			LogFile(string.Format("{0}|{1}|{2}|{3}|{4}", "ERROR",  objClass, method, message, ex));
		}

		public static void LogError(object objClass, string method, string message)
		{
			LogFile(string.Format("{0}|{1}|{2}|{3}", "ERROR",  objClass, method, message));
		}

		private static void LogFile(string log) 
		{
			try
			{
				if(fLoggerEnabled)
				{
					StreamWriter sw = new StreamWriter(fLogFile, true);
					sw.WriteLine(string.Format("{0}|{1}", DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss"),  log));
					sw.Close(); 
				}
			}
			catch(Exception)
			{
			}
		}
		#endregion
	}
}
