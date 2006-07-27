using System;
using System.Reflection;

using iNetVOD.Common.Core;

namespace iNetVOD.Common.Request
{
	public class RequestData : Writeable
	{
		#region Fields
		protected TString fRequestType;
		protected Writeable fRequest;
		#endregion

		#region Constuction
		private RequestData(Writeable request)
		{
			fRequestType = new TString(request.GetType().Name);
			fRequest = request;
		}

		public static RequestData NewInstance(Writeable request)
		{
			return new RequestData(request);
		}
		#endregion

		#region Implementation
		public void WriteTo(DataWriter writer)
		{
			writer.WriteString("RequestType", fRequestType, 64);
			writer.WriteObject(fRequestType.Value, fRequest);
		}
		#endregion

	}

	public class ResponseData : Readable
	{
		public static readonly ConstructorInfo CtorDataReader = typeof(ResponseData).GetConstructor(new Type[] { typeof (DataReader) });

		#region Fields
		private TString fResponseType;
		private Readable fResponse;
		#endregion

		#region Properties
		public Readable Response { get { return fResponse; } }
		#endregion

		#region Constuction
		public ResponseData(DataReader reader)
		{
			ReadFrom(reader);
		}
		#endregion

		#region Implementation
		public void ReadFrom(DataReader reader)
		{
			string nameSpace = GetType().Namespace;

			fResponseType = reader.ReadString("ResponseType", 64);
			//TODO: should/can this be optimized?
			//fRequest = (Requestable)GetType().Assembly.CreateInstance(nameSpace + "." + fRequestType);
			string typeName = nameSpace + "." + fResponseType;
			ConstructorInfo ctor = GetType().Assembly.GetType(nameSpace + "." + fResponseType
				).GetConstructor(new Type[] { typeof(DataReader) });
			if(ctor == null)
				throw new Exception(String.Format("failed getting ctor for type({0})", typeName));
			fResponse = reader.ReadObject(fResponseType.Value, ctor);
		}
		#endregion
	}

}
