using System;

using iNetVOD.Common.Core;
using iNetVOD.Common.Data;

namespace iNetVOD.Common.Request
{
	public class SignonRqst : Writeable
	{
		#region Constants
		private static readonly int UserIDMaxLength = 128;
		private static readonly int PasswordMaxLength = 32;
		#endregion

		#region Fields
		private TString fUserID;
		private TString fPassword;
		private Player fPlayer;
		#endregion

		#region Properties
		public TString UserID { set { fUserID = value; } }
		public TString Password { set { fPassword = value; } }
		public Player Player { set { fPlayer = value; } }
		#endregion

		#region Constuction
		private SignonRqst()
		{
		}

		public static SignonRqst NewInstance()
		{
			return new SignonRqst();
		}
		#endregion

		#region Implementation
		public void WriteTo(DataWriter writer)
		{
			writer.WriteString("UserID", fUserID, UserIDMaxLength);
			writer.WriteString("Password", fPassword, PasswordMaxLength);
			writer.WriteObject("Player", fPlayer);
		}
		#endregion
	}

	public class SignonResp : Readable
	{
		#region Constants
		private static readonly int SessionDataMaxLength = Int16.MaxValue;
		#endregion

		#region Fields
		private TString fSessionData;
		private TDateTime fSessionExpires;
		#endregion

		#region Properties
		public TString SessionData { get { return fSessionData; } }
		public TDateTime SessionExpires { get { return fSessionExpires; } }
		#endregion

		#region Constuction
		public SignonResp(DataReader reader)
		{
			ReadFrom(reader);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			fSessionData = reader.ReadString("SessionData", SessionDataMaxLength);
			fSessionExpires = reader.ReadDateTime("SessionExpires");
			//TODO: fMemberState = reader.readObject("MemberState", MemberState);
		}
		#endregion
	}
}
