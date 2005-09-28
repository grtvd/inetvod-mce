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

function RentedShowSearchByNameCmpr(lhs, rhs)
{
	return compareStringsIgnoreCase(lhs.Name, rhs.Name);
}

/******************************************************************************/

function RentedShowSearchByAvailableUntilCmpr(lhs, rhs)
{
	return compareDates(lhs.AvailableUntil, rhs.AvailableUntil);
}

/******************************************************************************/
/******************************************************************************/
