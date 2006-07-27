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
					bRentedShowIDFound_Flag  = showList.ContainsByRentedShowID(downloadShow.RentedShowID);
					if(!bRentedShowIDFound_Flag  ) 
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
				bRentedShowIDFound_Flag  = downloadShowList.ContainsByRentedShowID(show.RentedShowID);
				if(!bRentedShowIDFound_Flag)
				{
					//Delete Show From User List
					Logger.LogInfo(this, "CompareUserListDelete", "Delete Show From User List and HDD");
					try
					{
						new DriveInfo().DeleteShowFromHDD(show.DataFileName.ToString()); 
						bShowDeleted = true;
					}
					catch(Exception e)
					{
						Logger.LogError(this,  "CompareUserListDelete", e); 
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
			ShowList showList =  UserDataMgr.GetThe().ShowList; 
			ShowList newShowList = new ShowList();

			bool fileExistFlag = false;
			bool showDeleteFlag = false;

			foreach(Show show in showList)
			{
				if (show.DownloadStatus.ToString().Equals("Completed"))
				{
					try
					{
						fileExistFlag = new DriveInfo().CheckFileExistOnHDD(show.DataFileName.ToString());
					}
					catch(Exception e)
					{
						Logger.LogError(this,  "CompareUserListHDDDelete", e); 
					}

					if(!fileExistFlag)
					{
						//Delete File from the user list and download list 
						Logger.LogInfo(this, "CompareUserListHDDDelete", "Delete File from the userlist and downloadlist");
						Console.WriteLine("TODO : Uncomment the ReleaseShow in CompareUserListHDDDelete"); 
						//TODO : Uncommnet the ReleaseShow 
						//Session.GetThe().ReleaseShow(show.RentedShowID);
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

			String newFileName, FileName, FileExt, FilePath = "";
			FilePath = UserDataMgr.GetThe().LocalShowPath.ToString();   

			foreach(Show show in showList)
			{
				//Extention of File
				FileExt = Path.GetExtension(show.ShowURL.ToString()); 
				
				FileName = new DriveInfo().CheckFileName(show.DataFileName.ToString());

				if(show.DownloadStatus.ToString().Equals("NotStarted"))     
				{
					//Download File 
					Logger.LogInfo(this, "CompareUserListDownload", "DownloadFile");
					newFileName = DownloadFile(show, FileExt);

					//If File name is not blank then process further
					if (!newFileName.Equals("") )
					{
						/**********************************************************************************/
						//Convert To Media File
						System.Console.Out.WriteLine("-----------------ConvertToMediaFile-------------------");

						/**********************************************************************************/
						//Update File Status
						show.DataFileName = new TString(newFileName + FileExt);
						show.DownloadStatus = new TString("Completed");

						UserDataMgr.GetThe().SaveShowList(showList);
						return true; // only process one show at a time
					}
				}
			}//End foreach(Show show in showList)

			return false;
		}

		private String DownloadFile(Show show, String FileExt)
		{
			HttpWebRequest request = null;
			HttpWebResponse resp = null;
			Stream rcvStream = null;
			FileStream fs = null;
			String fileName = "";
			long fileSize = 0;

			try
			{
				String DownloadURL = show.ShowURL.ToString();
				DriveInfo driveInfo = new DriveInfo();
				request = (HttpWebRequest)WebRequest.Create(DownloadURL);
				resp = (HttpWebResponse)request.GetResponse();
				fileSize = (resp.ContentLength / 1024) / 1024; 

				//Check for Free space on Disk
				string localShowPath = UserDataMgr.GetThe().LocalShowPath.ToString();

				if(fileSize + driveInfo.DirectorySize(localShowPath) <= driveInfo.FreeSpceOnDisk(localShowPath))
				{
					long maxSizeForShows = UserDataMgr.GetThe().MaxSizeForShows.Value  * 1024 ;
					//Chcek for Max size allocated for shows
					if (fileSize + driveInfo.DirectorySize(localShowPath) <= maxSizeForShows)
					{
						rcvStream = resp.GetResponseStream();
						// File Name check 
						fileName = driveInfo.NewFileName(localShowPath, Path.GetFileNameWithoutExtension(show.DataFileName.ToString()), FileExt);

						String sFileName = Path.Combine(localShowPath, fileName + FileExt);
						StreamUtil.StreamToFile(rcvStream, sFileName);
					}
				}
				return fileName;
			}
			catch(Exception e)
			{
				Logger.LogError(this,  "DownloadFile", e); 
				return fileName;
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
			String fileExt = Path.GetExtension(downloadShow.ShowURL.ToString() ); 
			show.DataFileName = new TString(new DriveInfo().CheckFileName(downloadShow.RentedShowID.ToString() + fileExt)) ; 
			Console.Out.WriteLine("TODO : Change the Method for DataFileName in AddDownloadShowToList");
			show.DownloadStatus = new TString("NotStarted");
			return show;
		}
	}
}
