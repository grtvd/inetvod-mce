/* CheckShowAvailResp */

/******************************************************************************/
/******************************************************************************/

function CheckShowAvailResp(reader)
{
	this.ShowCostList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ CheckShowAvailResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowCostList = reader.readList("ShowCost", ShowCost);
}

/******************************************************************************/
/******************************************************************************/
