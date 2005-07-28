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
	this.fSessionData = null;
	if(testStrHasLen(sessionData))
		this.fSessionData = sessionData;

	this.fStatusCode = sc_Success;
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

	//TODO: should we check StatusCode here?

	if(isNull(response.ResponseData))
		throw new Exception("DataRequestor.parseHeader", "response.getResponseData() is null");

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

/*StatusCode*/ DataRequestor.prototype.getStatusCode = function()
{
	return this.fStatusCode;
}

/******************************************************************************/

/*string*/ DataRequestor.prototype.getStatusMessage = function()
{
	return this.fStatusMessage;
}

/******************************************************************************/

/*StatusCode*/ DataRequestor.prototype.pingRequest = function()
{
	var pingResp = this.sendRequest(PingRqst.newInstance());

	return this.fStatusCode;
}

/******************************************************************************/

/*SignonResp*/ DataRequestor.prototype.signonRequest = function(/*SignonRqst*/ signonRqst)
{
	return this.sendRequest(signonRqst);
}

/******************************************************************************/

/*SystemDataResp*/ DataRequestor.prototype.systemDataRequest = function()
{
	return this.sendRequest(SystemDataRqst.newInstance());
}

/******************************************************************************/

/*ShowSearchResp*/ DataRequestor.prototype.showSearchRequest = function(/*ShowSearchRqst*/ showSearchRqst)
{
	return this.sendRequest(showSearchRqst);
}

/******************************************************************************/

/*RentedShowListResp*/ DataRequestor.prototype.rentedShowListRequest = function(
	/*RentedShowListRqst*/ rentedShowListRqst)
{
	return this.sendRequest(rentedShowListRqst);
}

/******************************************************************************/
/******************************************************************************/
