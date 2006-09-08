#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Reflection;

using iNetVOD.Common.Core;

namespace iNetVOD.Common.Data
{
	/// <summary>
	/// Summary description for Show.
	/// </summary>
	public class Show  : Readable, Writeable
	{
		#region Constants
		public static readonly ConstructorInfo CtorDataReader = typeof(Show).GetConstructor(new Type[] { typeof (DataReader) });
		private static readonly int ShowURLMaxLength = 4096;
		#endregion

		#region Fields
		private RentedShowID fRentedShowID;
		private TString fShowURL;
		private TString fDataFileName;
		private DownloadStatus fDownloadStatus;
		#endregion

		#region Properties
		public RentedShowID RentedShowID { get { return fRentedShowID; } }
		public TString ShowURL
		{
			get { return fShowURL; }
			set { fShowURL = value; }
		}
		public TString DataFileName
		{
			get { return fDataFileName; }
			set { fDataFileName = value; }
		}
		public DownloadStatus DownloadStatus
		{
			get {return fDownloadStatus; }
			set { fDownloadStatus = value; }
		}
		#endregion

		#region Constuction
		private Show(RentedShowID rentedShowID)
		{
			fRentedShowID = rentedShowID;
		}

		public Show(DataReader reader)
		{
			ReadFrom(reader);
		}

		public static Show NewInstance(RentedShowID rentedShowID)
		{
			return new Show(rentedShowID);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			fRentedShowID = (RentedShowID)reader.ReadDataID("RentedShowID", RentedShowID.MaxLength,
				RentedShowID.CtorString);
			fShowURL = reader.ReadString("ShowURL", ShowURLMaxLength);
			fDataFileName = reader.ReadString("DataFileName", 200);  
			fDownloadStatus = (DownloadStatus)Enum.Parse(typeof(DownloadStatus), 
				reader.ReadString("DownloadStatus", 32).Value, false);      
		}

		public void WriteTo(DataWriter writer)
		{
			writer.WriteDataID("RentedShowID",  fRentedShowID ,  64);
			writer.WriteString("ShowURL", fShowURL, ShowURLMaxLength);
			writer.WriteString("DataFileName", fDataFileName, 200);
			writer.WriteString("DownloadStatus", new TString(fDownloadStatus.ToString()), 32);
		}
		#endregion
	}
}
