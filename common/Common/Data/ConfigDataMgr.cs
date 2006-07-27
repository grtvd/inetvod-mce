#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.IO;
using System.Threading;

using iNetVOD.Common.Core;
using iNetVOD.Common.Data;

namespace iNetVOD.Common.Data
{
	public class ConfigDataMgr
	{
		#region Constants
		public static string ConfigFileName = "config.xml";
		private static string ConfigElement = "Config";
		private static int FileOpenTries = 5;
		private static int FileOpenRetryWaitTicks = 1000;
		#endregion

		#region Fields
		private static ConfigDataMgr fTheConfigDataMgr;
		private string fConfigFilePath;
		#endregion

		#region Construction
		private ConfigDataMgr(string fileLocation)
		{
			fConfigFilePath = Path.Combine(fileLocation, ConfigFileName);
		}

		public static ConfigDataMgr Initialize(string fileLocation)
		{
			fTheConfigDataMgr = new ConfigDataMgr(fileLocation);
			return fTheConfigDataMgr;
		}

		public static ConfigDataMgr GetThe()
		{
			return fTheConfigDataMgr;
		}
		#endregion

		#region Implementation
		public Config GetConfig()
		{
			Stream stream = OpenDataFile();
			try
			{
				return ReadDataFile(stream);
			}
			finally
			{
				stream.Close();
			}
		}

		public void SetSerialNo()
		{
			Stream stream = OpenDataFile();
			try
			{
				Config config = ReadDataFile(stream);

				config.Player.SerialNo = new TString(Guid.NewGuid());
   
				WriteDataFile(stream, config);
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
					return new FileStream(fConfigFilePath, FileMode.Open, FileAccess.ReadWrite, FileShare.None);
				}
				catch(Exception)
				{
					//file locked by another process, do nothing
					Logger.LogWarning(this, "OpenDataFile", String.Format("Can't open file({0})", fConfigFilePath));
				}

				Thread.Sleep(FileOpenRetryWaitTicks);
			}

			return null;
		}

		private Config ReadDataFile(Stream stream)
		{
			XmlDataReader reader = new XmlDataReader(stream);
			return (Config)reader.ReadObject(ConfigElement, Config.CtorDataReader);
		}

		/* Save, file is read-only*/
		private void WriteDataFile(Stream stream, Config config)
		{
			stream.Seek(0, SeekOrigin.Begin);
			stream.SetLength(0);
			XmlDataWriter writer = new XmlDataWriter(stream);
			try
			{
				writer.PrettyPrint = true;
				writer.WriteObject(ConfigElement, config);
			}
			finally
			{
				writer.Close();
			}
		}
		
		#endregion
	}
}
