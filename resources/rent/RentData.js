/* RentData.js */

/******************************************************************************/
/******************************************************************************/

function RentData(/*ShowDetail*/ oShowDetail)
{
	var oSession = MainApp.getThe().getSession();

	this.ShowDetail = oShowDetail;

	var showProvider = this.ShowDetail.ShowProviderList[0];			//TODO: just get first provider for now
	this.ShowCost = showProvider.ShowCostList[0];					//TODO: just get first show cost for now

	this.Provider = oSession.getProvider(showProvider.ProviderID);

	this.UserID = null;
	this.Password = null;
}

/******************************************************************************/

/*string*/ RentData.prototype.getShowID = function()
{
	return this.ShowDetail.ShowID;
}

/******************************************************************************/

/*string*/ RentData.prototype.getProviderID = function()
{
	return this.Provider.ProviderID;
}

/******************************************************************************/

/*string*/ RentData.prototype.getProviderName = function()
{
	return this.Provider.Name;
}

/******************************************************************************/
/******************************************************************************/
