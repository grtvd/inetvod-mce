/* ShowCost.js */

/******************************************************************************/
/******************************************************************************/

ShowCost.CostDisplayMaxLength = 32;

/******************************************************************************/

function ShowCost(reader)
{
	this.ShowCostType = null;
	this.Cost = null;
	this.CostDisplay = null;
	this.RentalWindowDays = null;
	this.RentalPeriodHours = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowCost.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowCostType = reader.readString("ShowCostType", ShowCostTypeMaxLength);
	this.Cost = reader.readObject("Cost", Money);
	this.CostDisplay = reader.readString("CostDisplay", ShowCost.CostDisplayMaxLength);
	this.RentalWindowDays = reader.readShort("RentalWindowDays");
	this.RentalPeriodHours = reader.readShort("RentalPeriodHours");
}

/******************************************************************************/

/*void*/ ShowCost.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowCostType", this.ShowCostType, ShowCostTypeMaxLength);
	writer.writeObject("Cost", this.Cost);
	writer.writeString("CostDisplay", this.CostDisplay, ShowCost.CostDisplayMaxLength);
	writer.writeShort("RentalWindowDays", this.RentalWindowDays);
	writer.writeShort("RentalPeriodHours", this.RentalPeriodHours);
}

/******************************************************************************/
/******************************************************************************/
