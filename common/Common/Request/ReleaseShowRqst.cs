using System;

using iNetVOD.Common.Core;
using iNetVOD.Common.Data;

namespace iNetVOD.Common.Request
{
	public class ReleaseShowRqst : Writeable
	{
		#region Constants
		#endregion

		#region Fields
		private RentedShowID fRentedShowID;
		#endregion

		#region Properties
		public RentedShowID RentedShowID { set { fRentedShowID = value; } }
		#endregion

		#region Constuction
		private ReleaseShowRqst()
		{
		}

		public static ReleaseShowRqst NewInstance()
		{
			return new ReleaseShowRqst();
		}
		#endregion

		#region Implementation
		public void WriteTo(DataWriter writer)
		{
			writer.WriteDataID("RentedShowID", fRentedShowID, Data.RentedShowID.MaxLength);
		}
		#endregion
	}

	public class ReleaseShowResp : Readable
	{
		#region Constuction
		public ReleaseShowResp(DataReader reader)
		{
			ReadFrom(reader);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			// No Fields
		}
		#endregion
	}
}
