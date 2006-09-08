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

		public static ConfigDataMgr CreateNew()
		{
			fTheConfigDataMgr = new ConfigDataMgr(AppSettings.AppDataPath);
			fTheConfigDataMgr.CreateDataFile();
			return fTheConfigDataMgr;
		}

		public static ConfigDataMgr Initialize()
		{
			fTheConfigDataMgr = new ConfigDataMgr(AppSettings.AppDataPath);
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

		private void CreateDataFile()
		{
			string fileDir = Path.GetDirectoryName(fConfigFilePath);
			if(!Directory.Exists(fileDir))
				Directory.CreateDirectory(fileDir);

			if(File.Exists(fConfigFilePath))
				return;

			Stream stream = new FileStream(fConfigFilePath, FileMode.CreateNew, FileAccess.ReadWrite, FileShare.None);
			try
			{
				StreamWriter streamWriter = new StreamWriter(stream, Encoding.UTF8);
				streamWriter.Write(String.Format(
@"<?xml version=""1.0"" encoding=""utf-8""?>
<Config>
  <General>
    <iNetVODServiceURL>http://api.inetvod.com/inetvod/playerapi/xml</iNetVODServiceURL>
    <LoopIntervalSecs>300</LoopIntervalSecs>
  </General>
  <Player>
    <ManufacturerID>inetvod</ManufacturerID>
    <ModelNo>mce-dls</ModelNo>
    <SerialNo>{0}</SerialNo>
    <Version>1.0.0000</Version>
  </Player>
</Config>", Guid.NewGuid().ToString()));
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
					return new FileStream(fConfigFilePath, FileMode.Open, FileAccess.ReadWrite, FileShare.None);
				}
				catch(Exception)
				{
					//file locked by another process, do nothing
					Logger.LogWarning(this, "OpenDataFile", String.Format("Can't open file({0})", fConfigFilePath));
				}

				Thread.Sleep(FileOpenRetryWaitTicks);
			}

			throw new Exception(String.Format("Can't open file({0})", fConfigFilePath));
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
