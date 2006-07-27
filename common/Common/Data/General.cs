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
	public class General : Readable, Writeable
	{
		#region Constants
		public static readonly ConstructorInfo CtorDataReader = typeof(General).GetConstructor(new Type[] { typeof (DataReader) });
		#endregion

		#region Fields
		private TString fINetVODServiceURL;
		private TInt32 fLoopIntervalSecs;
		#endregion

		#region Properties
		public TString iNetVODServiceURL { get { return fINetVODServiceURL; } }
		public TInt32 LoopIntervalSecs  { get { return fLoopIntervalSecs; } }
		#endregion

		#region Constuction
		public General(DataReader reader)
		{
			ReadFrom(reader);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			fINetVODServiceURL = reader.ReadString("iNetVODServiceURL", 500);
			fLoopIntervalSecs = reader.ReadInt("LoopIntervalSecs"); 
		}

		public void WriteTo(DataWriter writer)
		{
			writer.WriteString("iNetVODServiceURL", fINetVODServiceURL, 500);
			writer.WriteInt("LoopIntervalSecs", fLoopIntervalSecs);
		}
		#endregion
	}

}
