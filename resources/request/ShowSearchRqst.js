/* ShowSearchRqst */

/******************************************************************************/
/******************************************************************************/

function ShowSearchRqst_newInstance()
{
	return new ShowSearchRqst();
}

/******************************************************************************/

function ShowSearchRqst()
{
	this.PartialName = null;

	this.ProviderIDList = null;
	this.CategoryIDList = null;
	this.RatingIDList = null;

	this.MaxResults = 1000;	//TODO: ???
}

/******************************************************************************/

/*string*/ ShowSearchRqst.prototype.className = function()
{
	return "ShowSearchRqst";
}

/******************************************************************************/

/*void*/ ShowSearchRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("PartialName", this.PartialName, 64);	//TODO: Show_NameMaxLength

	writer.writeStringList("ProviderID", this.ProviderIDList, ProviderIDMaxLength);
	writer.writeStringList("CategoryID", this.CategoryIDList, CategoryIDMaxLength);
	writer.writeStringList("RatingID", this.RatingIDList, RatingIDMaxLength);

	writer.writeShort("MaxResults", this.MaxResults);
}

/******************************************************************************/
/******************************************************************************/
