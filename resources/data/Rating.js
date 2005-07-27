/* Rating.js */

/******************************************************************************/
/******************************************************************************/

var Rating_AllRatingsID = "all";

/******************************************************************************/

function Rating(reader)
{
	this.RatingID = null;
	this.Name = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Rating.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RatingID = reader.readString("RatingID", RatingIDMaxLength);
	this.Name = reader.readString("Name", 64);
}

/******************************************************************************/
/******************************************************************************/
