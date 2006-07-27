#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;

namespace iNetVOD.Common.Core
{
	/// <summary>
	/// A type of ID, independant of internally stored type
	/// </summary>
	public interface DataID
	{
		bool IsUndefined { get; }
		// Objects implementing this interface should also override ToString()
	}

	/// <summary>
	/// A type of DataID whose internal type is a string
	/// </summary>
	public class StringID : DataID
	{
		private string fID;
		private int fHashCode;

		public StringID() : this(null)
		{
		}

		public StringID(string value)
		{
			fID = value;
		}

		public bool IsUndefined
		{
			get
			{
				return (fID == null) || (fID.Length == 0);
			}

		}

		public override string ToString()
		{
			return (fID == null) ? "" : fID;
		}

		public override bool Equals(object o)
		{
			if(!(o is StringID))
				return false;

			return fID.Equals(((StringID)o).fID);
		}

		public override int GetHashCode()
		{
			if((fHashCode == 0) && (fID != null))
				fHashCode = fID.GetHashCode();
			return fHashCode;
		}

		public static bool operator == (StringID lhs, StringID rhs)
		{
			object oLHS = lhs;
			object oRHS = rhs;

			if((oLHS == null) && (oLHS == null))
				return true;

			if((oLHS == null) || (oLHS == null))
				return false;

			return lhs.fID == rhs.fID;
		}

		public static bool operator != (StringID lhs, StringID rhs)
		{
			object oLHS = lhs;
			object oRHS = rhs;

			if((oLHS == null) && (oRHS == null))
				return false;

			if((oLHS == null) || (oRHS == null))
				return true;

			return lhs.fID != rhs.fID;
		}
	}

}
