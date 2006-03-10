/* ProviderEnrollRqst */

/******************************************************************************/
/******************************************************************************/

ProviderEnrollRqst.newInstance = function()
{
	return new ProviderEnrollRqst();
}

/******************************************************************************/

function ProviderEnrollRqst()
{
	this.ProviderID = null;
}

/******************************************************************************/

/*string*/ ProviderEnrollRqst.prototype.className = function()
{
	return "ProviderEnrollRqst";
}

/******************************************************************************/

/*void*/ ProviderEnrollRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
