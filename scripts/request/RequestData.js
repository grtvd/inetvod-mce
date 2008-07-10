/* RequestData.js */

/******************************************************************************/
/******************************************************************************/

RequestData.newInstance = function()
{
	return new RequestData();
}

/******************************************************************************/

function RequestData()
{
	this.RequestTypeMaxLength = 64;

	this.fRequestType = null;
	this.fRequest = null;
}

/******************************************************************************/

/*void*/ RequestData.prototype.setRequest = function(/*Requestable*/ request)
{
	this.fRequestType = request.className();
	this.fRequest = request;
}

/******************************************************************************/

/*void*/ RequestData.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RequestType", this.fRequestType, this.RequestTypeMaxLength);
	writer.writeObject(this.fRequestType, this.fRequest);
}

/******************************************************************************/
/******************************************************************************/
