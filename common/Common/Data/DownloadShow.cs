#region Copyright
// Copyright � 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Reflection;

using iNetVOD.Common.Core;

namespace iNetVOD.Common.Data
{
	public class DownloadShow : Readable
	{
		#region Constants
		public static readonly ConstructorInfo CtorDataReader = typeof(DownloadShow).GetConstructor(new Type[] { typeof (DataReader) });
		private static readonly int ShowURLMaxLength = 4096;
		#endregion

		#region Fields
		private RentedShowID fRentedShowID;
		private TString fShowURL;
		#endregion

		#region Properties
		public RentedShowID RentedShowID { get { return fRentedShowID; } }
		public TString ShowURL { get { return fShowURL; } }
		#endregion

		#region Constuction
		public DownloadShow(DataReader reader)
		{
			ReadFrom(reader);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			fRentedShowID = (RentedShowID)reader.ReadDataID("RentedShowID", RentedShowID.MaxLength,
				RentedShowID.CtorString);
			fShowURL = reader.ReadString("ShowURL", ShowURLMaxLength);
		}
		#endregion
	}
}
