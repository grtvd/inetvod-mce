/* Category.js */

/******************************************************************************/
/******************************************************************************/

Category.AllCategoriesID = "all";
Category.AllCategoriesName = "All Categories";
Category.FeaturedCategoryID = "featured";

/******************************************************************************/

function Category(reader)
{
	this.CategoryID = null;
	this.Name = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Category.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.CategoryID = reader.readString("CategoryID", CategoryIDMaxLength);
	this.Name = reader.readString("Name", 64);
}

/******************************************************************************/
/******************************************************************************/
