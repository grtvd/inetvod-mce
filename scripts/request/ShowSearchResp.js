/* ShowSearchResp */

/******************************************************************************/
/******************************************************************************/

function ShowSearchResp(reader)
{
	this.ShowSearchList = null;
	this.ReachedMax = false;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowSearchResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowSearchList = reader.readList("ShowSearch", ShowSearch);
	this.ReachedMax = reader.readBoolean("ReachedMax");
}

/******************************************************************************/
/******************************************************************************/
