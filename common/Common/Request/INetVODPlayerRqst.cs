using System;
using System.Reflection;

using iNetVOD.Common.Core;

namespace iNetVOD.Common.Request
{
	public class INetVODPlayerRqst : Writeable
	{
		#region Constants
		private static readonly int VersionMaxLength = 16;
		private static readonly int RequestIDMaxLength = 64;
		private static readonly int SessionDataMaxLength = Int16.MaxValue;
		#endregion

		#region Fields
		private TString fVersion;
		private TString fRequestID;
		private TString fSessionData;
		private RequestData fRequestData;
		#endregion

		#region Properties
		public string Version { set { fVersion = new TString(value); } }
		public string RequestID { set { fRequestID = new TString(value); } }
		public string SessionData { set { fSessionData = new TString(value); } }
		public RequestData RequestData { set { fRequestData = value; } }
		#endregion

		#region Constuction
		private INetVODPlayerRqst()
		{
		}

		public static INetVODPlayerRqst NewInstance()
		{
			return new INetVODPlayerRqst();
		}
		#endregion

		#region Implementation
		public void WriteTo(DataWriter writer)
		{
			writer.WriteString("Version", fVersion, VersionMaxLength);
			writer.WriteString("RequestID", fRequestID, RequestIDMaxLength);
			writer.WriteString("SessionData", fSessionData, SessionDataMaxLength);

			writer.WriteObject("RequestData", fRequestData);
		}
		#endregion
	}

	public class INetVODPlayerResp : Readable
	{
		#region Constants
		public static readonly ConstructorInfo CtorDataReader = typeof(INetVODPlayerResp).GetConstructor(new Type[] { typeof (DataReader) });
		private static readonly int RequestIDMaxLength = 64;
		private static readonly int StatusMessageMaxLength = 1024;
		#endregion

		#region Fields
		private TString fRequestID;
		private StatusCode fStatusCode;
		private TString fStatusMessage;
		private ResponseData fResponseData;
		#endregion

		#region Properties
		public StatusCode StatusCode { get { return fStatusCode; } }
		public TString StatusMessage { get { return fStatusMessage; } }
		public ResponseData ResponseData { get { return fResponseData; } }
		#endregion

		#region Constuction
		public INetVODPlayerResp(DataReader reader)
		{
			ReadFrom(reader);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			fRequestID = reader.ReadString("RequestID", RequestIDMaxLength);
			fStatusCode = (StatusCode)reader.ReadInt("StatusCode").Value;
			fStatusMessage = reader.ReadString("StatusMessage", StatusMessageMaxLength);
			fResponseData = (ResponseData)reader.ReadObject("ResponseData", ResponseData.CtorDataReader);
		}
		#endregion
	}
}
