/* CheckShowAvailRqst */

/******************************************************************************/
/******************************************************************************/

CheckShowAvailRqst.newInstance = function()
{
	return new CheckShowAvailRqst();
}

/******************************************************************************/

function CheckShowAvailRqst()
{
	this.ShowID = null;
	this.ProviderID = null;
	this.ShowCost = null;
}

/******************************************************************************/

/*string*/ CheckShowAvailRqst.prototype.className = function()
{
	return "CheckShowAvailRqst";
}

/******************************************************************************/

/*void*/ CheckShowAvailRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowID", this.ShowID, ShowIDMaxLength);
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
	writer.writeObject("ShowCost", this.ShowCost);
}

/******************************************************************************/
/******************************************************************************/
