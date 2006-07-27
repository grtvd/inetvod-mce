/* ShowDetailResp */

/******************************************************************************/
/******************************************************************************/

function ShowDetailResp(reader)
{
	this.ShowDetail = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowDetailResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowDetail = reader.readObject("ShowDetail", ShowDetail);
}

/******************************************************************************/
/******************************************************************************/
