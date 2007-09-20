/* DataRequestor.js */

/******************************************************************************/
/******************************************************************************/

DataRequestor.newInstance = function(/*string*/ sessionData)
{
	return new DataRequestor(sessionData);
}

/******************************************************************************/

function DataRequestor(/*string*/ sessionData)
{
	this.Callback = null;
	this.CallerCallback = null;

	this.fSessionData = null;
	if(testStrHasLen(sessionData))
		this.fSessionData = sessionData;

	this.fStatusCode = sc_GeneralError;
	this.fStatusMessage = null;
}

/******************************************************************************/

/*INetVODPlayerRqst*/ DataRequestor.prototype.createHeader = function(/*Streamable*/ payload)
{
	var request;
	var requestData;

	request = INetVODPlayerRqst.newInstance();
	request.setVersion("1.0.0");	//TODO:
	request.setRequestID("1");	//TODO:
	request.setSessionData(this.fSessionData);

	requestData = RequestData.newInstance();
	requestData.setRequest(payload);
	request.setRequestData(requestData);

	return request;
}

/******************************************************************************/

/*Streamable*/ DataRequestor.prototype.parseHeader = function(/*INetVODPlayerResp*/ response)
{
	this.fStatusCode = response.StatusCode;
	this.fStatusMessage = response.StatusMessage;

	if(this.fStatusCode == sc_InvalidSession)
		MainApp.getThe().reset();

	if(isNull(response.ResponseData))
	{
		if(this.fStatusCode == sc_Success)
			this.fStatusCode = sc_GeneralError;
		return null;
	}

	return response.ResponseData.Response;
}

/******************************************************************************/

/*Streamable*/ DataRequestor.prototype.sendRequest = function(/*Streamable*/ payload)
{
	var httpRequestor = HTTPRequestor.newInstance();

	// build the request header
	var request = this.createHeader(payload);

	// build request data
	var dataWriter = new XmlDataWriter();
	dataWriter.writeObject("INetVODPlayerRqst", request);

	var response = httpRequestor.sendRequest(dataWriter.toString());
	var dataReader = new XmlDataReader(response);

	var requestable = dataReader.readObject("INetVODPlayerResp", INetVODPlayerResp);
	return this.parseHeader(requestable);
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.sendRequestAsync = function(/*Streamable*/ payload,
	/*object*/ callbackObj)
{
	try
	{
		var httpRequestor = HTTPRequestor.newInstance();

		// build the request header
		var request = this.createHeader(payload);

		// build request data
		var dataWriter = new XmlDataWriter();
		dataWriter.writeObject("INetVODPlayerRqst", request);

		this.Callback = DataRequestor.prototype.parseResponse;
		this.CallerCallback = callbackObj;
		httpRequestor.sendRequestAsync(dataWriter.toString(), this);
	}
	catch(e)
	{
		this.callbackCaller(null);
	}
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.parseResponse = function(/*Streamable*/ response)
{
	try
	{
		var dataReader = new XmlDataReader(response);
		var requestable = dataReader.readObject("INetVODPlayerResp", INetVODPlayerResp);
		this.callbackCaller(this.parseHeader(requestable));
	}
	catch(e)
	{
		this.callbackCaller(null);
	}
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.callbackCaller = function(/*object*/ data)
{
	if(isObject(this.CallerCallback) && isFunction(this.CallerCallback.Callback))
	{
		try
		{
			this.CallerCallback.Callback(data, this.fStatusCode, this.fStatusMessage);
		}
		catch(e)
		{
		}
	}
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.startRequest = function(/*object*/ request,
	/*object*/ callbackObj)
{
	this.sendRequestAsync(request, callbackObj);
}

/******************************************************************************/
/******************************************************************************/
