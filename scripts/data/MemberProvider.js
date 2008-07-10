/* MemberProvider.js */

/******************************************************************************/
/******************************************************************************/

MemberProvider.newInstance = function(/*string*/ providerID)
{
	var oMemberProvider = new MemberProvider();

	oMemberProvider.ProviderID = providerID;

	return oMemberProvider;
}

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

/*void*/ MemberProvider.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
