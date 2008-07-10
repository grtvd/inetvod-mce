/* INetVODPlayerRqst.js */

/******************************************************************************/
/******************************************************************************/

INetVODPlayerRqst.newInstance = function()
{
	return new INetVODPlayerRqst();
}

/******************************************************************************/

function INetVODPlayerRqst()
{
	this.VersionMaxLength = 16;
	this.RequestIDMaxLength = 64;
	this.SessionDataMaxLength = 32768;

	this.fVersion = null;
	this.fRequestID = 0;
	this.fSessionData = null;
	this.fRequestData = null;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setVersion = function(/*string*/ version)
{
	this.fVersion = version;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setRequestID = function(/*string*/ requestID)
{
	this.fRequestID = requestID;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setSessionData = function(/*string*/ sessionData)
{
	this.fSessionData = sessionData;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setRequestData = function(/*RequestData*/ requestData)
{
	this.fRequestData = requestData;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("Version", this.fVersion, this.VersionMaxLength);
	writer.writeString("RequestID", this.fRequestID, this.RequestIDMaxLength);
	writer.writeString("SessionData", this.fSessionData, this.SessionDataMaxLength);

	writer.writeObject("RequestData", this.fRequestData);
}

/******************************************************************************/
/******************************************************************************/
