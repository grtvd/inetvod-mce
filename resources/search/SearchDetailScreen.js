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

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);

	this.fContainerControl.newControl(new ButtonControl(SearchDetailScreen.RentNowID, this.ScreenID));


	oControl = new TextControl(SearchDetailScreen.NameID, this.ScreenID);
	oControl.setText(this.fShowDetail.Name);
	this.fContainerControl.newControl(oControl);

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
	this.fContainerControl.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.DescriptionID, this.ScreenID);
	oControl.setText(this.fShowDetail.Description);
	this.fContainerControl.newControl(oControl);

	tempStr = "";
	if(this.fShowDetail.ReleasedOn)
		tempStr = dateTimeToString(this.fShowDetail.ReleasedOn, dtf_M_D_YYYY, true);
	else if(this.fShowDetail.ReleasedYear)
		tempStr = this.fShowDetail.ReleasedYear;
	oControl = new TextControl(SearchDetailScreen.ReleasedID, this.ScreenID);
	oControl.setText(tempStr);
	this.fContainerControl.newControl(oControl);

	tempStr = "";
	if(this.fShowDetail.RunningMins)
		tempStr = this.fShowDetail.RunningMins + " mins";
	oControl = new TextControl(SearchDetailScreen.RunningMinsID, this.ScreenID);
	oControl.setText(tempStr);
	this.fContainerControl.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.CategoryID, this.ScreenID);
	oControl.setText(oSession.getCategoryNames(this.fShowDetail.CategoryIDList));
	this.fContainerControl.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.ProviderID, this.ScreenID);
	oControl.setText(oSession.getProviderName(this.fShowDetail.ProviderID));
	this.fContainerControl.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.ProviderID, this.ScreenID);
	oControl.setText(oSession.getProviderName(this.fShowDetail.ProviderID));
	this.fContainerControl.newControl(oControl);

	var showCost = this.fShowDetail.ShowCostList[0];	//TODO: Need to deal with multiple

	oControl = new TextControl(SearchDetailScreen.CostID, this.ScreenID);
	oControl.setText(showCost.CostDisplay);
	this.fContainerControl.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.RentalHoursID, this.ScreenID);
	oControl.setText(showCost.RentalHours + " hrs.");
	this.fContainerControl.newControl(oControl);

	if(ViewPortControl.isOpen())
		this.fContainerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
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
