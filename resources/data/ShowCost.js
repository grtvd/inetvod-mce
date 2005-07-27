/* ShowCost.js */

/******************************************************************************/
/******************************************************************************/

function ShowCost(reader)
{
	this.ShowCostType = null;
	this.Cost = null;
	this.CostDisplay = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowCost.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowCostType = reader.readString("ShowCostType", ShowCostTypeMaxLength);
	this.Cost = reader.readObject("Cost", Money);
	this.CostDisplay = reader.readString("CostDisplay", 32);
}

/******************************************************************************/
/******************************************************************************/
