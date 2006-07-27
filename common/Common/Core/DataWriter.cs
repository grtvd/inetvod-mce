#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Collections;

namespace iNetVOD.Common.Core
{
	public abstract class DataWriter
	{
		/// <summary>
		/// Write a byte.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		public abstract void WriteByte(string fieldName, TByte data);

		/// <summary>
		/// Write a short.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		public abstract void WriteShort(string fieldName, TInt16 data);

		/// <summary>
		/// Write an int.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		public abstract void WriteInt(string fieldName, TInt32 data);

		/// <summary>
		/// Write a float.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		public abstract void WriteFloat(string fieldName, TFloat data);

		/// <summary>
		/// Write a double.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		public abstract void WriteDouble(string fieldName, TDouble data);

		/// <summary>
		/// Write a string.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		/// <param name="maxLength"></param>
		public abstract void WriteString(string fieldName, TString data, int maxLength);

		/// <summary>
		/// Write a Date.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		public abstract void WriteDate(string fieldName, TDate data);

		/// <summary>
		/// Write a DateTime.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		public abstract void WriteDateTime(string fieldName, TDateTime data);

		/// <summary>
		/// Write a boolean.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		public abstract void WriteBoolean(string fieldName, TBool data);

		/// <summary>
		/// Write a complex object.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		public abstract void WriteObject(string fieldName, Writeable data);

		/// <summary>
		/// Write a list of complex objects.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		public abstract void WriteList(string fieldName, IList data);

		/// <summary>
		/// Write a list of strings (or non-complex items than can be converted to a sting).
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		/// <param name="maxLength"></param>
		public abstract void WriteStringList(string fieldName, IList data, int maxLength);

		/// <summary>
		/// Write a DataID.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="data"></param>
		/// <param name="maxLength"></param>
		public abstract void WriteDataID(string fieldName, DataID data, int maxLength);
	}
}
