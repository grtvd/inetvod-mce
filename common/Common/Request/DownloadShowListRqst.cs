using System;

using iNetVOD.Common.Core;
using iNetVOD.Common.Data;

namespace iNetVOD.Common.Request
{
	public class DownloadShowListRqst : Writeable
	{
		#region Constuction
		private DownloadShowListRqst()
		{
		}

		public static DownloadShowListRqst NewInstance()
		{
			return new DownloadShowListRqst();
		}
		#endregion

		#region Implementation
		public void WriteTo(DataWriter writer)
		{
			// No Fields
		}
		#endregion
	}

	public class DownloadShowListResp : Readable
	{
		#region Constants
		#endregion

		#region Fields
		private DownloadShowList fDownloadShowList = new DownloadShowList();
		#endregion

		#region Properties
		public DownloadShowList DownloadShowList { get { return fDownloadShowList; } }
		#endregion

		#region Constuction
		public DownloadShowListResp(DataReader reader)
		{
			ReadFrom(reader);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			fDownloadShowList = (DownloadShowList)reader.ReadList("DownloadShow",
				DownloadShowList.Ctor, DownloadShow.CtorDataReader);
		}
		#endregion
	}
}
