/* ShowSearch.js */

/******************************************************************************/
/******************************************************************************/

function ShowSearch(reader)
{
	this.ShowID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.ReleasedYear = null;
	this.ShowProviderList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowSearch.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.ReleasedYear = reader.readShort("ReleasedYear");
	this.ShowProviderList = reader.readList("ShowProvider", ShowProvider);
}

/******************************************************************************/
/******************************************************************************/
