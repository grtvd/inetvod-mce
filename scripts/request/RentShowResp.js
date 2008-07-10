/* RentShowResp */

/******************************************************************************/
/******************************************************************************/

function RentShowResp(reader)
{
	this.RentShowID = null;
	this.License = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowID = reader.readString("RentedShowID", RentedShowIDMaxLength);
	this.License = reader.readObject("License", License);
}

/******************************************************************************/
/******************************************************************************/
