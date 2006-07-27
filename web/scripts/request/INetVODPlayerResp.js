/* INetVODPlayerResp */

/******************************************************************************/
/******************************************************************************/

function INetVODPlayerResp(reader)
{
	this.RequestIDMaxLength = 64;
	this.StatusMessageMaxLength = 1024;

	this.RequestID = null;
	this.StatusCode = 0;
	this.StatusMessage = null;
	this.ResponseData = null;
	
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ INetVODPlayerResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RequestID = reader.readString("RequestID", this.RequestIDMaxLength);
	this.StatusCode = reader.readInt("StatusCode");
	this.StatusMessage = reader.readString("StatusMessage", this.StatusMessageMaxLength);
	this.ResponseData = reader.readObject("ResponseData", ResponseData);
}

/******************************************************************************/
/******************************************************************************/
