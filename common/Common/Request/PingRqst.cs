using System;

using iNetVOD.Common.Core;

namespace iNetVOD.Common.Request
{
	public class PingRqst : Writeable
	{
		#region Constuction
		private PingRqst()
		{
		}

		public static PingRqst NewInstance()
		{
			return new PingRqst();
		}
		#endregion

		#region Implementation
		public void WriteTo(DataWriter writer)
		{
			// No Fields
		}
		#endregion
	}

	public class PingResp : Readable
	{
		#region Constuction
		public PingResp(DataReader reader)
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
