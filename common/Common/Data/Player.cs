#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Reflection;

using iNetVOD.Common.Core;

namespace iNetVOD.Common.Data
{
	public class Player : Readable, Writeable
	{
		#region Constants
		public static readonly ConstructorInfo CtorDataReader = typeof(Player).GetConstructor(new Type[] { typeof (DataReader) });
		private static readonly int ModelNoMaxLength = 32;
		private static readonly int SerialNoMaxLength = 64;
		private static readonly int VersionMaxLength = 16;
		#endregion

		#region Fields
		private ManufacturerID fManufacturerID;
		private TString fModelNo;
		private TString fSerialNo;
		private TString fVersion;
		#endregion

		#region Properties
		public ManufacturerID ManufacturerID { set { fManufacturerID = value; } }
		public TString ModelNo { set { fModelNo = value; } }
		public TString SerialNo 
		{ 
			set { fSerialNo = value; } 
			get { return fSerialNo; }
		}
		public TString Version { set { fVersion = value; } }
		#endregion

		#region Constuction
		private Player()
		{
		}

		public Player(DataReader reader)
		{
			ReadFrom(reader);
		}

		public static Player NewInstance()
		{
			return new Player();
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			fManufacturerID = (ManufacturerID)reader.ReadDataID("ManufacturerID",
				Data.ManufacturerID.MaxLength, Data.ManufacturerID.CtorString);
			fModelNo = reader.ReadString("ModelNo", ModelNoMaxLength);
			fSerialNo = reader.ReadString("SerialNo", SerialNoMaxLength);
			fVersion = reader.ReadString("Version", VersionMaxLength);
		}

		public void WriteTo(DataWriter writer)
		{
			writer.WriteDataID("ManufacturerID", fManufacturerID, Data.ManufacturerID.MaxLength);
			writer.WriteString("ModelNo", fModelNo, ModelNoMaxLength);
			writer.WriteString("SerialNo", fSerialNo, SerialNoMaxLength);
			writer.WriteString("Version", fVersion, VersionMaxLength);
		}
		#endregion
	}
}
