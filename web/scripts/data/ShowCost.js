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

/*string*/ ShowCost.prototype.formatRental = function()
{
	var tempStr = "";

	if(this.RentalPeriodHours)
	{
		if(this.RentalPeriodHours > 48)
			tempStr = (this.RentalPeriodHours / 24) + " days";
		else
			tempStr = this.RentalPeriodHours + " hrs.";
	}
	if(this.RentalWindowDays)
	{
		if(tempStr.length > 0)
			tempStr += " / ";
		tempStr += this.RentalWindowDays + " days";
	}

	if(tempStr.length == 0)
		return "n/a";
	return tempStr;
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
