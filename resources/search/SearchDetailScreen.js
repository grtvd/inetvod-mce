/* SearchDetailScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchDetailScreen.ScreenID = "Search004";
SearchDetailScreen.NameID = "Search004_Name";
SearchDetailScreen.EpisodeID = "Search004_Episode";
SearchDetailScreen.ReleasedID = "Search004_Released";
SearchDetailScreen.DescriptionID = "Search004_Description";
SearchDetailScreen.RunningMinsID = "Search004_RunningMins";
SearchDetailScreen.CategoryID = "Search004_Category";
SearchDetailScreen.ProviderID = "Search004_Provider";
SearchDetailScreen.RatingID = "Search004_Rating";
SearchDetailScreen.CostID = "Search004_Cost";
SearchDetailScreen.RentalHoursID = "Search004_RentalHours";
SearchDetailScreen.RentNowID = "Search004_RentNow";

/******************************************************************************/

SearchDetailScreen.newInstance = function(/*RentedShow*/ showDetail)
{
	return MainApp.getThe().openScreen(new SearchDetailScreen(showDetail));
}

/******************************************************************************/

SearchDetailScreen.prototype = new Screen();
SearchDetailScreen.prototype.constructor = SearchDetailScreen;

/******************************************************************************/

function SearchDetailScreen(/*RentedShow*/ showDetail)
{
	var oSession = MainApp.getThe().getSession();
	var oControl;
	var tempStr;

	this.fShowDetail = showDetail;
	this.ScreenID = SearchDetailScreen.ScreenID;
	this.ScreenTitle = "search";

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);

	this.newControl(new ButtonControl(SearchDetailScreen.RentNowID, this.ScreenID));


	oControl = new TextControl(SearchDetailScreen.NameID, this.ScreenID);
	oControl.setText(this.fShowDetail.Name);
	this.newControl(oControl);

	tempStr = "";
	if(testStrHasLen(this.fShowDetail.EpisodeName) || testStrHasLen(this.fShowDetail.EpisodeNumber))
	{
		if(testStrHasLen(this.fShowDetail.EpisodeName))
		{
			tempStr = '"' + this.fShowDetail.EpisodeName + '"';
			if(testStrHasLen(this.fShowDetail.EpisodeNumber))
				tempStr += " (" + this.fShowDetail.EpisodeNumber + ")";
		}
		else
			tempStr = "Episode: " + this.fShowDetail.EpisodeNumber;

	}
	oControl = new TextControl(SearchDetailScreen.EpisodeID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.DescriptionID, this.ScreenID);
	oControl.setText(this.fShowDetail.Description);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fShowDetail.ReleasedOn)
		tempStr = dateTimeToString(this.fShowDetail.ReleasedOn, dtf_M_D_YYYY, true);
	else if(this.fShowDetail.ReleasedYear)
		tempStr = this.fShowDetail.ReleasedYear.toString();
	oControl = new TextControl(SearchDetailScreen.ReleasedID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fShowDetail.RunningMins)
		tempStr = this.fShowDetail.RunningMins + " mins";
	oControl = new TextControl(SearchDetailScreen.RunningMinsID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	//TODO: show Rating
	oControl = new TextControl(SearchDetailScreen.RatingID, this.ScreenID);
	oControl.setText("n/a");
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.CategoryID, this.ScreenID);
	oControl.setText(oSession.getCategoryNames(this.fShowDetail.CategoryIDList));
	this.newControl(oControl);

	var showProvider = this.fShowDetail.ShowProviderList[0];	//TODO: Need to deal with multiple

	oControl = new TextControl(SearchDetailScreen.ProviderID, this.ScreenID);
	oControl.setText(oSession.getProviderName(showProvider.ProviderID));
	this.newControl(oControl);

	var showCost = showProvider.ShowCostList[0];	//TODO: Need to deal with multiple

	oControl = new TextControl(SearchDetailScreen.CostID, this.ScreenID);
	oControl.setText(showCost.CostDisplay);
	this.newControl(oControl);

	tempStr = "n/a";
	oControl = new TextControl(SearchDetailScreen.RentalHoursID, this.ScreenID);
	if(showCost.RentalHours)
		tempStr = showCost.RentalHours + " hrs";
	oControl.setText(tempStr);
	this.newControl(oControl);

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ SearchDetailScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == SearchDetailScreen.RentNowID)
	{
		RentScreen.newInstance(this.fShowDetail);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
