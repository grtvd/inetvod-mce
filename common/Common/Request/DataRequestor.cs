using System;
using System.IO;
using System.Net;
using System.Text;

using iNetVOD.Common.Core;
using iNetVOD.Common.Data;

namespace iNetVOD.Common.Request
{
	public class DataRequestor
	{
		#region Constants
		private static readonly int fRequestTimeoutMillis = 15000;
		#endregion

		#region Fields
		private static string fNetworkURL;

		private bool fResetNeeded;
		private TString fSessionData;

		private StatusCode fStatusCode = StatusCode.sc_Success;
		private TString fStatusMessage;
		#endregion

		#region Properties
		public StatusCode StatusCode { get { return fStatusCode; } }
		#endregion

		#region Construction
		public static void Initialize(TString networkURL)
		{
			fNetworkURL = networkURL.ToString();
		}

		private DataRequestor(TString sessionData)
		{
			fSessionData = sessionData;
		}

		public static DataRequestor NewInstance(TString sessionData)
		{
			return new DataRequestor(sessionData);
		}
		
		public static DataRequestor NewInstance()
		{
			return new DataRequestor(TString.Undefined);
		}
		#endregion

		#region Properties
		public bool ResetNeeded { get { return fResetNeeded; } }
		#endregion

		#region Implementation
		private INetVODPlayerRqst CreateHeader(Writeable payload)
		{
			INetVODPlayerRqst request;
			RequestData requestData;

			request = INetVODPlayerRqst.NewInstance();
			request.Version = "1.0.0";	//TODO:
			request.RequestID = Guid.NewGuid().ToString();
			request.SessionData = fSessionData.ToString();

			requestData = RequestData.NewInstance(payload);
			//requestData.Request = payload;
			request.RequestData = requestData;

			return request;
		}

		private Readable ParseHeader(INetVODPlayerResp response)
		{
			fStatusCode = response.StatusCode;
			fStatusMessage = response.StatusMessage;

			if(fStatusCode == StatusCode.sc_InvalidSession)
				fResetNeeded = true;

			if(response.ResponseData == null)
			{
				if(fStatusCode == StatusCode.sc_Success)
					fStatusCode = StatusCode.sc_GeneralError;
				return null;
			}

			return response.ResponseData.Response;
		}

		private Readable SendRequest(Writeable payload)
		{
			// build the request header
			INetVODPlayerRqst request = CreateHeader(payload);

			// build request data
			MemoryStream requestStream = new MemoryStream();
			XmlDataWriter requestWriter = new XmlDataWriter(requestStream);
			requestWriter.WriteObject(request.GetType().Name, request);
			requestWriter.Flush();
			if(Logger.Enabled)
				Logger.LogInfo(this, "SendRequest", String.Format("Request: {0}", Encoding.UTF8.GetString(requestStream.ToArray())));

			// send request
			MemoryStream responseStream = SendRequestViaHttp(requestStream);
			if(Logger.Enabled)
				Logger.LogInfo(this, "SendRequest", String.Format("Response: {0}", Encoding.UTF8.GetString(responseStream.ToArray())));

			// read response
			XmlDataReader responseReader = new XmlDataReader(responseStream);
			INetVODPlayerResp response = (INetVODPlayerResp)responseReader.ReadObject("INetVODPlayerResp", INetVODPlayerResp.CtorDataReader);

			// parse response header
			return ParseHeader(response);
		}

		public MemoryStream SendRequestViaHttp(MemoryStream requestData)
		{
			HttpWebRequest request = null;
			HttpWebResponse response = null;
			Stream requestStream = null;
			Stream responseStream = null;
			MemoryStream responseData = null;

			try
			{
				request = (HttpWebRequest)WebRequest.Create(fNetworkURL);
				//request.SendChunked = true;
				request.Method = "POST";
				request.Timeout = fRequestTimeoutMillis;

				// copy the request file to the request stream
				requestStream = request.GetRequestStream();
				StreamUtil.StreamCopy (requestData, requestStream, true, true);
				requestStream.Close();
				requestStream = null;

				// get web response
				response = (HttpWebResponse)request.GetResponse();

				// save response to memory stream
				responseStream = response.GetResponseStream();
				responseData = new MemoryStream();
				StreamUtil.StreamCopy (responseStream, responseData, false, false);
				responseData.Position = 0;

				responseStream.Close();
				responseStream = null;
				response.Close();
				response = null;
			}
			catch(Exception e)
			{
				Logger.LogError(this, "SendRequestViaHttp", e.Message, e);  
				throw e;
			}
			finally
			{
				if (requestStream != null) requestStream.Close();
				if (responseStream != null) responseStream.Close();
				if (response != null) response.Close();
			}

			return responseData;
		}

		public StatusCode PingRequest()
		{
			PingResp pingResp = (PingResp)SendRequest(PingRqst.NewInstance());

			return fStatusCode;
		}

		public SignonResp SignonRequest(SignonRqst signonRqst)
		{
			return (SignonResp)SendRequest(signonRqst);
		}

		public DownloadShowListResp DownloadShowListRequest(DownloadShowListRqst downloadShowListRqst)
		{
			return (DownloadShowListResp)SendRequest(downloadShowListRqst);
		}

		public ReleaseShowResp ReleaseShowRequest(ReleaseShowRqst releaseShowRqst)
		{
			return (ReleaseShowResp)SendRequest(releaseShowRqst);
		}
		#endregion
	}
}
