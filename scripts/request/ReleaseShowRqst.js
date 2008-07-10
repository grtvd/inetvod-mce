/* ReleaseShowRqst */

/******************************************************************************/
/******************************************************************************/

ReleaseShowRqst.newInstance = function()
{
	return new ReleaseShowRqst();
}

/******************************************************************************/

function ReleaseShowRqst()
{
	this.RentedShowID = null;
}

/******************************************************************************/

/*string*/ ReleaseShowRqst.prototype.className = function()
{
	return "ReleaseShowRqst";
}

/******************************************************************************/

/*void*/ ReleaseShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RentedShowID", this.RentedShowID, RentedShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
