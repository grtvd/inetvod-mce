/* ShowProvider.js */

/******************************************************************************/
/******************************************************************************/

function ShowProvider(reader)
{
	this.ProviderID = null;
	this.ShowCost = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowProvider.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.ShowCost = reader.readObject("ShowCost", ShowCost);
}

/******************************************************************************/
/******************************************************************************/
