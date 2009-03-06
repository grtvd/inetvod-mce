/* PlayerResp */

/******************************************************************************/
/******************************************************************************/

function PlayerResp(reader)
{
	this.StatusMessageMaxLength = 1024;

	this.StatusCode = 0;
	this.StatusMessage = null;
	this.ResponseData = null;
	
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ PlayerResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.StatusCode = reader.readInt("StatusCode");
	this.StatusMessage = reader.readString("StatusMessage", this.StatusMessageMaxLength);
	this.ResponseData = reader.readObject("ResponseData", ResponseData);
}

/******************************************************************************/
/******************************************************************************/
