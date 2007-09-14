/* ShowSearchRqst */

/******************************************************************************/
/******************************************************************************/

ShowSearchRqst.MaxResults = 1000;	//TODO: ???

/******************************************************************************/

ShowSearchRqst.newInstance = function()
{
	return new ShowSearchRqst();
}

/******************************************************************************/

function ShowSearchRqst()
{
	this.Search = null;

	this.ProviderIDList = null;
	this.CategoryIDList = null;
	this.RatingIDList = null;

	this.MaxResults = ShowSearchRqst.MaxResults;
}

/******************************************************************************/

/*string*/ ShowSearchRqst.prototype.className = function()
{
	return "ShowSearchRqst";
}

/******************************************************************************/

/*void*/ ShowSearchRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("Search", this.Search, 64);	//TODO: Show_NameMaxLength

	writer.writeStringList("ProviderID", this.ProviderIDList, ProviderIDMaxLength);
	writer.writeStringList("CategoryID", this.CategoryIDList, CategoryIDMaxLength);
	writer.writeStringList("RatingID", this.RatingIDList, RatingIDMaxLength);

	writer.writeShort("MaxResults", this.MaxResults);
}

/******************************************************************************/
/******************************************************************************/
