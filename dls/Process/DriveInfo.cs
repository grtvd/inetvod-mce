#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.IO;
using System.Text.RegularExpressions; 
using System.Runtime.InteropServices;

using iNetVOD.Common.Data;

namespace iNetVOD.MCE.DSL.Process
{
	public class DriveInfo
	{
		private DriveInfo()
		{
		}

		public static void DeleteShowFromHDD(string fileName)
		{
			FileInfo fInfo = ReturnFileInfo(fileName);
			if (fInfo != null)
			{
				//Delete File from the HDD
				fInfo.Delete();
			}
		}

		public static bool CheckFileExistOnHDD(string fileName)
		{
			FileInfo fInfo = new FileInfo(Path.Combine(UserDataMgr.GetThe().LocalShowPath.ToString(), fileName)) ;
			if (fInfo.Exists)
				return true;
			else
				return false;
		}

		public static FileInfo ReturnFileInfo(string fileName)
		{
			//Check File Exist On HDD Return FileInfo
			FileInfo fInfo = new FileInfo(Path.Combine(UserDataMgr.GetThe().LocalShowPath.ToString(), fileName)) ;
			if (fInfo.Exists)
				return fInfo;
			else
				return null;
		}

		public static String NewFileName(String filePath, String fileName, String fileExt )
		{
			bool exists = true;
			int count = 1;
			fileName = CheckFileName(fileName);
			String originalFileName = fileName;
			String newFileName;
			while(exists)
			{
				newFileName = Path.Combine(filePath, fileName + fileExt);
				if(File.Exists(newFileName))
					fileName = String.Format("{0} ({1})", originalFileName, count);
				else 
					exists = false;

				count++;
			}
			return fileName + fileExt;
		}

		public static String CheckFileName(String fileName)
		{
			String find = "[/\\?*:|\"<>]"    ;
			return Regex.Replace(fileName, find, "");
		}

		public static long DirectorySize(String DrivePath)
		{
			DirectoryInfo  dInfo = new DirectoryInfo(DrivePath);
			long dirSize = 0;

			foreach(FileInfo fileInfo in dInfo.GetFiles())
				dirSize  += fileInfo.Length ;
			

			return BytesToMB(dirSize)  ;
		}

		private static long BytesToMB(long size)
		{
			Double sizeInGB; 
			sizeInGB = (size / 1024) / 1024;
			return (long)sizeInGB;
		}

		public static long FreeSpceOnDisk(String DrivePath)
		{
			long available, total, free, iAns;
			iAns = GetDiskFreeSpaceEx(DrivePath, out available, out total, out free);

			if (iAns > 0)
				return BytesToMB(available);
			else 
				return 0;
		}

		[DllImport("kernel32.dll", EntryPoint="GetDiskFreeSpaceExA")]
		private static extern long GetDiskFreeSpaceEx(string lpDirectoryName,
			out long lpFreeBytesAvailableToCaller,
			out long lpTotalNumberOfBytes,
			out long lpTotalNumberOfFreeBytes);
	}
}
