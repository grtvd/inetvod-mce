/* WatchShowRqst */

/******************************************************************************/
/******************************************************************************/

WatchShowRqst.newInstance = function()
{
	return new WatchShowRqst();
}

/******************************************************************************/

function WatchShowRqst()
{
	this.RentedShowID = null;
}

/******************************************************************************/

/*string*/ WatchShowRqst.prototype.className = function()
{
	return "WatchShowRqst";
}

/******************************************************************************/

/*void*/ WatchShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RentedShowID", this.RentedShowID, RentedShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
