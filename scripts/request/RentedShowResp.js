/* RentedShowResp */

/******************************************************************************/
/******************************************************************************/

function RentedShowResp(reader)
{
	this.RentedShow = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShow = reader.readObject("RentedShow", RentedShow);
}

/******************************************************************************/
/******************************************************************************/
