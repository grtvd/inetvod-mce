/* RentedShowSearch.js */

/******************************************************************************/
/******************************************************************************/

function RentedShowSearch(reader)
{
	this.RentedShowID = null;
	this.ShowID = null;
	this.ProviderID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.PictureURL = null;
	this.AvailableUntil = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShowSearch.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowID = reader.readString("RentedShowID", RentedShowIDMaxLength);
	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.PictureURL = reader.readString("PictureURL", 4096);	//TODO:
	this.AvailableUntil = reader.readDateTime("AvailableUntil");
}

/******************************************************************************/
/******************************************************************************/
