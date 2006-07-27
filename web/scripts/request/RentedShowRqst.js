/* RentedShowRqst */

/******************************************************************************/
/******************************************************************************/

RentedShowRqst.newInstance = function()
{
	return new RentedShowRqst();
}

/******************************************************************************/

function RentedShowRqst()
{
	this.RentedShowID = null;
}

/******************************************************************************/

/*string*/ RentedShowRqst.prototype.className = function()
{
	return "RentedShowRqst";
}

/******************************************************************************/

/*void*/ RentedShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RentedShowID", this.RentedShowID, RentedShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
