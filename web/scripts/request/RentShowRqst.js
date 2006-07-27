/* RentShowRqst */

/******************************************************************************/
/******************************************************************************/

RentShowRqst.newInstance = function()
{
	return new RentShowRqst();
}

/******************************************************************************/

function RentShowRqst()
{
	this.ShowID = null;
	this.ProviderID = null;
	this.ApprovedCost = null;
}

/******************************************************************************/

/*string*/ RentShowRqst.prototype.className = function()
{
	return "RentShowRqst";
}

/******************************************************************************/

/*void*/ RentShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowID", this.ShowID, ShowIDMaxLength);
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
	writer.writeObject("ApprovedCost", this.ApprovedCost);
}

/******************************************************************************/
/******************************************************************************/
