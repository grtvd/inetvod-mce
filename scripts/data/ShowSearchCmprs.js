/* ShowSearchCmprs.js */

/******************************************************************************/
/******************************************************************************/

function ShowSearchToIDCmpr(showID)
{
	this.ShowID = showID;
}

/******************************************************************************/

/*int*/ ShowSearchToIDCmpr.prototype.compare = function(oShowSearch)
{
	if(this.ShowID == oShowSearch.ShowID)
		return 0;
	if(this.ShowID < oShowSearch.ShowID)
		return -1;
	return 1;
}

/******************************************************************************/

function ShowSearchByNameCmpr(lhs, rhs)
{
	var rc = compareStringsIgnoreCase(lhs.Name, rhs.Name);

	if(rc != 0)
		return rc;

	return compareDates(rhs.ReleasedOn, lhs.ReleasedOn);	// reversed
}

/******************************************************************************/

function ShowSearchByDateCmpr(lhs, rhs)
{
	var rc = compareDates(lhs.ReleasedOn, rhs.ReleasedOn);

	//if(rc != 0)
		return rc;

	//return compareStringsIgnoreCase(lhs.EpisodeName, rhs.EpisodeName);
}

/******************************************************************************/

function ShowSearchByDateDescCmpr(lhs, rhs)
{
	var rc = compareDates(rhs.ReleasedOn, lhs.ReleasedOn);

	//if(rc != 0)
		return rc;

	//return compareStringsIgnoreCase(lhs.EpisodeName, rhs.EpisodeName);
}

/******************************************************************************/

function ShowSearchByCostCmpr(lhs, rhs)
{
	var lhsShowCost = lhs.ShowProviderList[0].ShowCost;
	var rhsShowCost = rhs.ShowProviderList[0].ShowCost;

	var rc = ShowCostTypeCmpr(lhsShowCost.ShowCostType, rhsShowCost.ShowCostType);

	if(rc != 0)
		return rc;

	if(lhsShowCost.ShowCostType == sct_PayPerView)
	{
		rc = compareNumbers(lhsShowCost.Cost.Amount, rhsShowCost.Cost.Amount);
		if(rc != 0)
			return rc;
	}

	// sort by Name as last resort
	return ShowSearchByNameCmpr(lhs, rhs);
}

/******************************************************************************/
/******************************************************************************/
