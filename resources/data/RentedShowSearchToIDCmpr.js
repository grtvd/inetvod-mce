/* RentedShowSearchToIDCmpr.js */

/******************************************************************************/
/******************************************************************************/

function RentedShowSearchToIDCmpr(rentedShowID)
{
	this.RentedShowID = rentedShowID;
}

/******************************************************************************/

/*int*/ RentedShowSearchToIDCmpr.prototype.compare = function(oRentedShowSearch)
{
	if(this.RentedShowID == oRentedShowSearch.RentedShowID)
		return 0;
	if(this.RentedShowID < oRentedShowSearch.RentedShowID)
		return -1;
	return 1;
}

/******************************************************************************/
/******************************************************************************/
