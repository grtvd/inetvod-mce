#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.IO;
using System.Net;

using iNetVOD.Common.Core;
using iNetVOD.Common.Data;

namespace iNetVOD.MCE.DSL.Process
{
	public class UpdateUserDataShowList
	{
		public bool DoUpdate(DownloadShowList downloadShowList)
		{
			//Omnie : Compare downloadlist item with UserList. If not found in User List then insert in UserList
			CompareUserListInsert(downloadShowList);

			//Omnie : Compare UserList item with DownloadList. If not found in DownloadList then Delete From UserList
			CompareUserListDelete(downloadShowList);

			//Omnie : Compare UserList item with HDD Files. If not found on HDD Delete From UserList & DownloadList
			CompareUserListHDDDelete();

			//Omnie : If Not found on HDD and status is Notstarted then download file
			return CompareUserListDownload();
		}

		private void CompareUserListInsert(DownloadShowList downloadShowList)
		{
			//Insert Show in UserList
			ShowList showList = UserDataMgr.GetThe().ShowList;
			
			bool bRentedShowIDFound_Flag = false;
			bool bNewShowInserted = false;
			if(downloadShowList != null)
			{
				foreach(DownloadShow downloadShow in downloadShowList)
				{
					bRentedShowIDFound_Flag = false;
					bRentedShowIDFound_Flag = showList.ContainsByRentedShowID(downloadShow.RentedShowID);
					if(!bRentedShowIDFound_Flag) 
					{
						//Insert Show In User List
						Logger.LogInfo(this, "CompareUserListInsert", "Insert Show In User List");
						showList.Add(AddDownloadShowToList(downloadShow)); 
						bNewShowInserted = true;
					}
				}

				//Write User Xml if any show is inserted
				if(bNewShowInserted)
				{
					// Write user XML
					UserDataMgr.GetThe().SaveShowList(showList);
					//Session.GetThe().WriteUserDataToXML(userData);
				}
			}
		}

		private void CompareUserListDelete(DownloadShowList downloadShowList)
		{
			//Delete Show From UserList
			ShowList showList = UserDataMgr.GetThe().ShowList;
			ShowList newShowList = new ShowList();
			
			bool bRentedShowIDFound_Flag = false;
			bool bShowDeleted = false;

			foreach(Show show in showList)
			{
				bRentedShowIDFound_Flag = downloadShowList.ContainsByRentedShowID(show.RentedShowID);
				if(!bRentedShowIDFound_Flag)
				{
					//Delete Show From User List
					Logger.LogInfo(this, "CompareUserListDelete", "Delete Show From User List and HDD");
					try
					{
						DriveInfo.DeleteShowFromHDD(show.DataFileName.ToString()); 
						bShowDeleted = true;
					}
					catch(Exception e)
					{
						Logger.LogError(this, "CompareUserListDelete", e); 
					}
				}
				else
				{
					newShowList.Add(show);
				}
			}

			// Write user XML if any show is deleted
			if(bShowDeleted)
				UserDataMgr.GetThe().SaveShowList(newShowList);
		}

		private void CompareUserListHDDDelete()
		{
			ShowList showList = UserDataMgr.GetThe().ShowList; 
			ShowList newShowList = new ShowList();

			bool fileExistFlag = false;
			bool showDeleteFlag = false;

			foreach(Show show in showList)
			{
				if (DownloadStatus.Completed.Equals(show.DownloadStatus))
				{
					try
					{
						fileExistFlag = DriveInfo.CheckFileExistOnHDD(show.DataFileName.ToString());
					}
					catch(Exception e)
					{
						Logger.LogError(this, "CompareUserListHDDDelete", e); 
					}

					if(!fileExistFlag)
					{
						//Delete File from the user list and download list 
						Logger.LogInfo(this, "CompareUserListHDDDelete", "Delete File from the userlist and downloadlist");
						Session.GetThe().ReleaseShow(show.RentedShowID);
						showDeleteFlag = true;
					}
					else
					{
						newShowList.Add(show);
					}
				}
				else
				{
					newShowList.Add(show);
				}
			}

			//if any show is deleted from showlist then Write new User.XML
			if (showDeleteFlag)
				UserDataMgr.GetThe().SaveShowList(newShowList);
		}

		private bool CompareUserListDownload()
		{
			ShowList showList = UserDataMgr.GetThe().ShowList;
			String filePath = UserDataMgr.GetThe().LocalShowPath.ToString();

			if(!Directory.Exists(filePath))
				Directory.CreateDirectory(filePath);

			foreach(Show show in showList)
			{
				if(DownloadStatus.NotStarted.Equals(show.DownloadStatus) ||
					DownloadStatus.InProgress.Equals(show.DownloadStatus))
				{
					//Download File 
					Logger.LogInfo(this, "CompareUserListDownload", "DownloadFile");

					// Mark show as started download
					show.DownloadStatus = DownloadStatus.InProgress;
					UserDataMgr.GetThe().SaveShowList(showList);

					String fileName = DriveInfo.CheckFileName(show.RentedShowID.ToString());
					String origFullFileName = Path.Combine(filePath, fileName);
					if(DownloadFile(show.ShowURL.ToString(), origFullFileName))
					{
						/**********************************************************************************/
						//Convert To Media File
						System.Console.Out.WriteLine("-----------------ConvertToMediaFile-------------------");

						/**********************************************************************************/

						// Determine new file name
						String newFileName = DriveInfo.NewFileName(filePath,
							DriveInfo.CheckFileName(show.DataFileName.ToString()),
							Path.GetExtension(show.ShowURL.ToString()));
						String newFullFileName = Path.Combine(filePath, newFileName);

						// Rename file
						File.Move(origFullFileName, newFullFileName);

						//Update Show
						show.DataFileName = new TString(newFileName);
						show.DownloadStatus = DownloadStatus.Completed;
					}
					else
						show.DownloadStatus = DownloadStatus.NotStarted;

					UserDataMgr.GetThe().SaveShowList(showList);
					return true; // only process one show at a time
				}
			}//End foreach(Show show in showList)

			return false;
		}

		private bool DownloadFile(String sDownloadURL, String sFileName)
		{
			HttpWebRequest request = null;
			HttpWebResponse resp = null;
			Stream rcvStream = null;
			FileStream fs = null;
			long fileSize = 0;

			try
			{
				request = (HttpWebRequest)WebRequest.Create(sDownloadURL);
				resp = (HttpWebResponse)request.GetResponse();
				fileSize = (resp.ContentLength / 1024) / 1024; 

				//Check for Free space on Disk
				string localShowPath = UserDataMgr.GetThe().LocalShowPath.ToString();

				if(fileSize + DriveInfo.DirectorySize(localShowPath) <= DriveInfo.FreeSpceOnDisk(localShowPath))
				{
					long maxSizeForShows = UserDataMgr.GetThe().MaxSizeForShows.Value * 1024 ;
					//Chcek for Max size allocated for shows
					if (fileSize + DriveInfo.DirectorySize(localShowPath) <= maxSizeForShows)
					{
						rcvStream = resp.GetResponseStream();
						StreamUtil.StreamToFile(rcvStream, sFileName);
					}
				}
				return true;
			}
			catch(Exception e)
			{
				Logger.LogError(this, "DownloadFile", e); 
				return false;
			}
			finally
			{
				if (resp != null) resp.Close();
				if (rcvStream != null) rcvStream.Close();
				if (fs != null) fs.Close();
			}			
		}


		//Create Show from DownloadShow
		private Show AddDownloadShowToList(DownloadShow downloadShow)
		{
			Show show = Show.NewInstance(downloadShow.RentedShowID);
			show.ShowURL = downloadShow.ShowURL;
			show.DataFileName = new TString(DriveInfo.CheckFileName(downloadShow.DataFileName.ToString())) ; 
			show.DownloadStatus = DownloadStatus.NotStarted;
			return show;
		}
	}
}
