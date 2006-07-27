#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Collections;
using System.Reflection;

namespace iNetVOD.Common.Core
{
	public abstract class DataReader
	{
		/// <summary>
		/// Read a byte.  Will never return null, instead TByte.IsUndefined will be true.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <returns></returns>
		public abstract TByte ReadByte(string fieldName);

		/// <summary>
		/// Read a short.  Will never return null, instead TInt16.IsUndefined will be true.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <returns></returns>
		public abstract TInt16 ReadShort(string fieldName);

		/// <summary>
		/// Read a int.  Will never return null, instead TInt32.IsUndefined will be true.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <returns></returns>
		public abstract TInt32 ReadInt(string fieldName);

		/// <summary>
		/// Read a float.  Will never return null, instead TFloat.IsUndefined will be true.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <returns></returns>
		public abstract TFloat ReadFloat(string fieldName);

		/// <summary>
		/// Read a double.  Will never return null, instead TDouble.IsUndefined will be true.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <returns></returns>
		public abstract TDouble ReadDouble(string fieldName);

		/// <summary>
		/// Read a string.  Will never return null, instead TString.IsUndefined will be true.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="maxLength"></param>
		/// <returns></returns>
		public abstract TString ReadString(string fieldName, int maxLength);

		/// <summary>
		/// Read a Date.  Will never return null, instead TDate.IsUndefined will be true.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <returns></returns>
		public abstract TDate ReadDate(string fieldName);

		/// <summary>
		/// Read a DateTime.  Will never return null, instead TDateTime.IsUndefined will be true.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <returns></returns>
		public abstract TDateTime ReadDateTime(string fieldName);

		/// <summary>
		/// Read a boolean.  Will never return null, instead TBool.IsUndefined will be true.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <returns></returns>
		public abstract TBool ReadBoolean(string fieldName);

		/// <summary>
		/// Read a complex object.  May return null.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="ctorDataReader"></param>
		/// <returns></returns>
		public abstract Readable ReadObject(string fieldName, ConstructorInfo ctorDataReader);

		/// <summary>
		/// Read a list of complex objects.  Will never return null, instead will return an empty list.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="listCtor"></param>
		/// <param name="itemctorDataReader"></param>
		/// <returns></returns>
		public abstract IList ReadList(string fieldName, ConstructorInfo listCtor, ConstructorInfo itemCtorDataReader);

		/// <summary>
		/// Read a list of strings (or non-complex items than can be constructed from a sting).  Will never return null, instead will return an empty list.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="maxLength"></param>
		/// <param name="listCtor"></param>
		/// <param name="itemCtorString"></param>
		/// <returns></returns>
		public abstract IList ReadStringList(string fieldName, int maxLength, ConstructorInfo listCtor, ConstructorInfo itemCtorString);

		/// <summary>
		/// Read a DataID field.  Will never return null, instead DataID.IsUndefined will be true.
		/// </summary>
		/// <param name="fieldName"></param>
		/// <param name="maxLength"></param>
		/// <param name="ctorString"></param>
		/// <returns></returns>
		public abstract DataID ReadDataID(string fieldName, int maxLength, ConstructorInfo ctorString);
	}
}
