/* ProviderIDCmpr.js */

/******************************************************************************/
/******************************************************************************/

function ProviderIDCmpr(providerID)
{
	this.ProviderID = providerID;
}

/******************************************************************************/

/*int*/ ProviderIDCmpr.prototype.compare = function(oCompare)
{
	if(this.ProviderID == oCompare.ProviderID)
		return 0;
	if(this.ProviderID < oCompare.ProviderID)
		return -1;
	return 1;
}

/******************************************************************************/
/******************************************************************************/
