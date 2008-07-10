/* CheckShowAvailResp */

/******************************************************************************/
/******************************************************************************/

function CheckShowAvailResp(reader)
{
	this.ShowCost = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ CheckShowAvailResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowCost = reader.readObject("ShowCost", ShowCost);
}

/******************************************************************************/
/******************************************************************************/
