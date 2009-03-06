/* PlayerRqst.js */

/******************************************************************************/
/******************************************************************************/

PlayerRqst.newInstance = function()
{
	return new PlayerRqst();
}

/******************************************************************************/

function PlayerRqst()
{
	this.VersionMaxLength = 16;
	this.SessionDataMaxLength = 32768;

	this.fVersion = null;
	this.fSessionData = null;
	this.fRequestData = null;
}

/******************************************************************************/

/*void*/ PlayerRqst.prototype.setVersion = function(/*string*/ version)
{
	this.fVersion = version;
}

/******************************************************************************/

/*void*/ PlayerRqst.prototype.setSessionData = function(/*string*/ sessionData)
{
	this.fSessionData = sessionData;
}

/******************************************************************************/

/*void*/ PlayerRqst.prototype.setRequestData = function(/*RequestData*/ requestData)
{
	this.fRequestData = requestData;
}

/******************************************************************************/

/*void*/ PlayerRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("Version", this.fVersion, this.VersionMaxLength);
	writer.writeString("SessionData", this.fSessionData, this.SessionDataMaxLength);

	writer.writeObject("RequestData", this.fRequestData);
}

/******************************************************************************/
/******************************************************************************/
