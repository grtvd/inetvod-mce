/* SystemDataResp */

/******************************************************************************/
/******************************************************************************/

function SystemDataResp(reader)
{
	this.ProviderList = null;
	this.CategoryList = null;
	this.RatingList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ SystemDataResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderList = reader.readList("Provider", Provider);
	this.CategoryList = reader.readList("Category", Category);
	this.RatingList = reader.readList("Rating", Rating);
}

/******************************************************************************/
/******************************************************************************/
