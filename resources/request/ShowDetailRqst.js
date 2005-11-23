/* ShowDetailRqst */

/******************************************************************************/
/******************************************************************************/

ShowDetailRqst.newInstance = function()
{
	return new ShowDetailRqst();
}

/******************************************************************************/

function ShowDetailRqst()
{
	this.ShowID = null;
}

/******************************************************************************/

/*string*/ ShowDetailRqst.prototype.className = function()
{
	return "ShowDetailRqst";
}

/******************************************************************************/

/*void*/ ShowDetailRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowID", this.ShowID, ShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
