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
	/// Summary description for General.
	/// </summary>

	public class Config : Readable, Writeable
	{
		#region Constants
		public static readonly ConstructorInfo CtorDataReader = typeof(Config).GetConstructor(new Type[] { typeof (DataReader) });
		#endregion

		#region Fields
		private General fGeneral;
		private Player fPlayer;
		#endregion

		#region Properties
		public General General { get { return fGeneral; } }
		public Player Player { get { return fPlayer; } }
		#endregion

		#region Constuction
		public Config(DataReader reader)
		{
			ReadFrom(reader);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			fGeneral = (General)reader.ReadObject("General", General.CtorDataReader );
			fPlayer = (Player)reader.ReadObject("Player", Player.CtorDataReader);
		}

		public void WriteTo(DataWriter writer)
		{
			writer.WriteObject("General", fGeneral);
			writer.WriteObject("Player", fPlayer);
		}
		#endregion	
	}
}
