/* RentedShow.js */

/******************************************************************************/
/******************************************************************************/

function RentedShow(reader)
{
	this.RentedShowID = null;

	this.ShowID = null;
	this.ProviderID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.EpisodeNumber= null;

	this.ReleasedOn = null;
	this.ReleasedYear = null;
	this.Description = null;
	this.RunningMins = null;
	this.PictureURL = null;

	this.CategoryIDList = null;
	this.RatingID = null;
	this.IsAdult = false;

	this.ShowCost = null;
	this.RentedOn = null;
	this.AvailableUntil = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShow.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowID = reader.readString("RentedShowID", RentedShowIDMaxLength);

	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.EpisodeNumber = reader.readString("EpisodeNumber", 32);

	this.ReleasedOn = reader.readDate("ReleasedOn");
	this.ReleasedYear = reader.readShort("ReleasedYear");
	this.Description = reader.readString("Description", 4096);	//TODO:
	this.RunningMins = reader.readShort("RunningMins");
	this.PictureURL = reader.readString("PictureURL", 4096);	//TODO:

	this.CategoryIDList = reader.readStringList("CategoryID", String);
	this.RatingID = reader.readString("RatingID", RatingIDMaxLength);
	this.IsAdult = reader.readBoolean("IsAdult");

	this.ShowCost = reader.readObject("ShowCost", ShowCost);
	this.RentedOn = reader.readDateTime("RentedOn");
	this.AvailableUntil = reader.readDateTime("AvailableUntil");
}

/******************************************************************************/
/******************************************************************************/
