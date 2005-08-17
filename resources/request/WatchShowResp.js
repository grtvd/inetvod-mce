/* WatchShowResp */

/******************************************************************************/
/******************************************************************************/

function WatchShowResp(reader)
{
	this.ShowURL = null;
	this.ShowAccessKey = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ WatchShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowURL = reader.readString("ShowURL", 4096);
	this.ShowAccessKey = reader.readString("ShowAccessKey", 4096);	//TODO: length is wrong
}

/******************************************************************************/
/******************************************************************************/
