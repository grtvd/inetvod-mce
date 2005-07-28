/* RentedShowListResp */

/******************************************************************************/
/******************************************************************************/

function RentedShowListResp(reader)
{
	this.RentedShowSearchList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShowListResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowSearchList = reader.readList("RentedShowSearch", RentedShowSearch);
}

/******************************************************************************/
/******************************************************************************/
