/* RentData.js */

/******************************************************************************/
/******************************************************************************/

function RentData(/*ShowDetail*/ oShowDetail)
{
	var oSession = MainApp.getThe().getSession();

	this.ShowDetail = oShowDetail;

	this.HasMultipleRentals = true;
	this.Provider = null;
	this.ShowCost = null;

	if(this.ShowDetail.ShowProviderList.length == 1)
		if(this.ShowDetail.ShowProviderList[0].ShowCostList.length == 1)
		{
			this.HasMultipleRentals = false;
			this.Provider = oSession.getProvider(this.ShowDetail.ShowProviderList[0].ProviderID);
			this.ShowCost = this.ShowDetail.ShowProviderList[0].ShowCostList[0];
		}

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

/*void*/ RentData.prototype.setRental = function(/*Provider*/ provider, /*ShowCost*/ showCost)
{
	this.Provider = provider;
	this.ShowCost = showCost;
}

/******************************************************************************/
/******************************************************************************/
