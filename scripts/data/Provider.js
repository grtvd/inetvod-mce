/* Provider.js */

/******************************************************************************/
/******************************************************************************/

Provider.AllProvidersID = "all";
Provider.AllProvidersName = "All Providers";

/******************************************************************************/

function Provider(reader)
{
	this.ProviderID = null;
	this.Name = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Provider.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.Name = reader.readString("Name", 64);
}

/******************************************************************************/
/******************************************************************************/
