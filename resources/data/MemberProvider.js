/* MemberProvider.js */

/******************************************************************************/
/******************************************************************************/

function MemberProvider(reader)
{
	this.ProviderID = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ MemberProvider.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
