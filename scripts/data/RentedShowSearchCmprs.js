/* RentedShowSearchCmprs.js */

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
	var rc = compareStringsIgnoreCase(lhs.Name, rhs.Name);

	if(rc != 0)
		return rc;

	return compareDates(lhs.ReleasedOn, rhs.ReleasedOn);
}

/******************************************************************************/

function RentedShowSearchByNameDescCmpr(lhs, rhs)
{
	var rc = compareStringsIgnoreCase(rhs.Name, lhs.Name);	// reversed

	if(rc != 0)
		return rc;

	return compareDates(rhs.ReleasedOn, lhs.ReleasedOn);	// reversed
}

/******************************************************************************/

function RentedShowSearchByReleasedOnCmpr(lhs, rhs)
{
	var rc = compareDates(lhs.ReleasedOn, rhs.ReleasedOn);

	if(rc != 0)
		return rc;

	return compareStringsIgnoreCase(lhs.Name, rhs.Name);
}

/******************************************************************************/

function RentedShowSearchByReleasedOnDescCmpr(lhs, rhs)
{
	var rc = compareDates(rhs.ReleasedOn, lhs.ReleasedOn);	// reversed

	if(rc != 0)
		return rc;

	return compareStringsIgnoreCase(rhs.Name, lhs.Name);	// reversed
}

/******************************************************************************/

function RentedShowSearchByRentedOnCmpr(lhs, rhs)
{
	return compareDates(lhs.RentedOn, rhs.RentedOn);
}

/******************************************************************************/

function RentedShowSearchByRentedOnDescCmpr(lhs, rhs)
{
	return compareDates(rhs.RentedOn, lhs.RentedOn);	// reversed
}

/******************************************************************************/

function RentedShowSearchByAvailableUntilCmpr(lhs, rhs)
{
	var rc = compareDates(lhs.AvailableUntil, rhs.AvailableUntil);

	if(rc != 0)
		return rc;

	return RentedShowSearchByNameCmpr(lhs, rhs);
}

/******************************************************************************/

function RentedShowSearchByAvailableUntilDescCmpr(lhs, rhs)
{
	var rc = compareDates(rhs.AvailableUntil, lhs.AvailableUntil);	// reversed

	if(rc != 0)
		return rc;

	return RentedShowSearchByNameDescCmpr(lhs, rhs);
}

/******************************************************************************/
/******************************************************************************/
