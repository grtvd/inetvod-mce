/* ResponseData.js */

/******************************************************************************/
/******************************************************************************/

function ResponseData(reader)
{
	this.ResponseTypeMaxLength = 64;

	this.fResponseType = null;
	this.Response = null;
	
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ResponseData.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.fResponseType = reader.readString("ResponseType", this.ResponseTypeMaxLength);
	this.Response = reader.readObject(this.fResponseType, eval(this.fResponseType));
}

/******************************************************************************/
/******************************************************************************/
