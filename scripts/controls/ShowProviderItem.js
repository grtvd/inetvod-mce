/* ShowProviderItem.js */

/******************************************************************************/
/******************************************************************************/

ShowProviderItem.newInstance = function(/*ProviderID*/ providerID, /*ShowCost*/ showCost)
{
	return new ShowProviderItem(providerID, showCost);
}

/******************************************************************************/

function ShowProviderItem(/*ProviderID*/ providerID, /*ShowCost*/ showCost)
{
	var oSession = MainApp.getThe().getSession();

	this.Provider = oSession.getProvider(providerID);
	this.ShowCost = showCost;
}

/******************************************************************************/
/******************************************************************************/
