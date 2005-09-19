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
		throw "DataRequestor.parseHeader: response.getResponseData() is null";

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

/*StatusCode*/ DataRequestor.prototype.enableAdultAccessRequest = function(
	/*EnableAdultAccessRqst*/ enableAdultAccessRqst)
{
	var enableAdultAccessResp = this.sendRequest(enableAdultAccessRqst);

	return this.fStatusCode;
}

/******************************************************************************/

/*ShowSearchResp*/ DataRequestor.prototype.showSearchRequest = function(
	/*ShowSearchRqst*/ showSearchRqst)
{
	return this.sendRequest(showSearchRqst);
}

/******************************************************************************/

/*ShowDetailResp*/ DataRequestor.prototype.showDetailRequest = function(
	/*ShowDetailRqst*/ showDetailRqst)
{
	return this.sendRequest(showDetailRqst);
}

/******************************************************************************/

/*StatusCode*/ DataRequestor.prototype.providerEnrollRequest = function(
	/*ProviderEnrollRqst*/ providerEnrollRqst)
{
	var providerEnrollResp = this.sendRequest(providerEnrollRqst);

	return this.fStatusCode;
}

/******************************************************************************/

/*StatusCode*/ DataRequestor.prototype.setProviderRequest = function(
	/*SetProviderRqst*/ setProviderRqst)
{
	var setProviderResp = this.sendRequest(setProviderRqst);

	return this.fStatusCode;
}

/******************************************************************************/

/*CheckShowAvailResp*/ DataRequestor.prototype.checkShowAvailRequest = function(
	/*CheckShowAvailRqst*/ checkShowAvailRqst)
{
	return this.sendRequest(checkShowAvailRqst);
}

/******************************************************************************/

/*RentShowResp*/ DataRequestor.prototype.rentShowRequest = function(
	/*RentShowRqst*/ rentShowRqst)
{
	return this.sendRequest(rentShowRqst);
}

/******************************************************************************/

/*RentedShowListResp*/ DataRequestor.prototype.rentedShowListRequest = function(
	/*RentedShowListRqst*/ rentedShowListRqst)
{
	return this.sendRequest(rentedShowListRqst);
}

/******************************************************************************/

/*RentedShowResp*/ DataRequestor.prototype.rentedShowRequest = function(
	/*RentedShowRqst*/ rentedShowRqst)
{
	return this.sendRequest(rentedShowRqst);
}

/******************************************************************************/

/*WatchShowResp*/ DataRequestor.prototype.watchShowRequest = function(
	/*WatchShowRqst*/ watchShowRqst)
{
	return this.sendRequest(watchShowRqst);
}

/******************************************************************************/

/*ReleaseShowResp*/ DataRequestor.prototype.releaseShowRequest = function(
	/*ReleaseShowRqst*/ releaseShowRqst)
{
	return this.sendRequest(releaseShowRqst);
}

/******************************************************************************/
/******************************************************************************/
