/* RentedShowDetailScreen.js */

/******************************************************************************/
/******************************************************************************/

RentedShowDetailScreen.ScreenID = "Show003";
RentedShowDetailScreen.NameID = "Show003_Name";
RentedShowDetailScreen.EpisodeID = "Show003_Episode";
RentedShowDetailScreen.ReleasedID = "Show003_Released";
RentedShowDetailScreen.DescriptionID = "Show003_Description";
RentedShowDetailScreen.RunningMinsID = "Show003_RunningMins";
RentedShowDetailScreen.CategoryID = "Show003_Category";
RentedShowDetailScreen.ProviderID = "Show003_Provider";
RentedShowDetailScreen.RatingID = "Show003_Rating";
RentedShowDetailScreen.CostID = "Show003_Cost";
RentedShowDetailScreen.RentalPeriodHoursID = "Show003_RentalPeriodHours";
RentedShowDetailScreen.RentedOnID = "Show003_RentedOn";
RentedShowDetailScreen.AvailableUntilID = "Show003_AvailableUntil";
RentedShowDetailScreen.WatchNowID = "Show003_WatchNow";
RentedShowDetailScreen.DeleteNowID = "Show003_DeleteNow";

/******************************************************************************/

RentedShowDetailScreen.newInstance = function(/*RentedShow*/ rentedShow)
{
	return MainApp.getThe().openScreen(new RentedShowDetailScreen(rentedShow));
}

/******************************************************************************/

RentedShowDetailScreen.prototype = new Screen();
RentedShowDetailScreen.prototype.constructor = RentedShowDetailScreen;

/******************************************************************************/

function RentedShowDetailScreen(/*RentedShow*/ rentedShow)
{
	var oSession = MainApp.getThe().getSession();
	var oControl;
	var tempStr;

	this.fRentedShow = rentedShow;
	this.ScreenID = RentedShowDetailScreen.ScreenID;
	this.ScreenTitle = "playing";

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);

	this.newControl(new ButtonControl(RentedShowDetailScreen.WatchNowID, this.ScreenID));
	this.newControl(new ButtonControl(RentedShowDetailScreen.DeleteNowID, this.ScreenID));


	oControl = new TextControl(RentedShowDetailScreen.NameID, this.ScreenID);
	oControl.setText(this.fRentedShow.Name);
	this.newControl(oControl);

	tempStr = "";
	if(testStrHasLen(this.fRentedShow.EpisodeName) || testStrHasLen(this.fRentedShow.EpisodeNumber))
	{
		if(testStrHasLen(this.fRentedShow.EpisodeName))
		{
			tempStr = '"' + this.fRentedShow.EpisodeName + '"';
			if(testStrHasLen(this.fRentedShow.EpisodeNumber))
				tempStr += " (" + this.fRentedShow.EpisodeNumber + ")";
		}
		else
			tempStr = "Episode: " + this.fRentedShow.EpisodeNumber;

	}
	oControl = new TextControl(RentedShowDetailScreen.EpisodeID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.DescriptionID, this.ScreenID);
	oControl.setText(this.fRentedShow.Description);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fRentedShow.ReleasedOn)
		tempStr = dateTimeToString(this.fRentedShow.ReleasedOn, dtf_M_D_YYYY, true);
	else if(this.fRentedShow.ReleasedYear)
		tempStr = this.fRentedShow.ReleasedYear.toString();
	oControl = new TextControl(RentedShowDetailScreen.ReleasedID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fRentedShow.RunningMins)
		tempStr = this.fRentedShow.RunningMins + " mins";
	oControl = new TextControl(RentedShowDetailScreen.RunningMinsID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	//TODO: show Rating
	oControl = new TextControl(RentedShowDetailScreen.RatingID, this.ScreenID);
	oControl.setText("n/a");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.CategoryID, this.ScreenID);
	oControl.setText(oSession.getCategoryNames(this.fRentedShow.CategoryIDList));
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.ProviderID, this.ScreenID);
	oControl.setText(oSession.getProviderName(this.fRentedShow.ProviderID));
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.ProviderID, this.ScreenID);
	oControl.setText(oSession.getProviderName(this.fRentedShow.ProviderID));
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.CostID, this.ScreenID);
	oControl.setText(this.fRentedShow.ShowCost.CostDisplay);
	this.newControl(oControl);

	tempStr = "n/a";
	oControl = new TextControl(RentedShowDetailScreen.RentalPeriodHoursID, this.ScreenID);
	if(this.fRentedShow.ShowCost.RentalPeriodHours)
		tempStr = this.fRentedShow.ShowCost.RentalPeriodHours + " hrs";
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.RentedOnID, this.ScreenID);
	oControl.setText(dateTimeToString(this.fRentedShow.RentedOn, dtf_M_D_H_MM_AM));
	this.newControl(oControl);

	tempStr = "n/a";
	oControl = new TextControl(RentedShowDetailScreen.AvailableUntilID, this.ScreenID);
	if(this.fRentedShow.AvailableUntil)
		tempStr = dateTimeToString(this.fRentedShow.AvailableUntil, dtf_M_D_H_MM_AM);
	oControl.setText(tempStr);
	this.newControl(oControl);

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == RentedShowDetailScreen.WatchNowID)
	{
		var watchShowResp = oSession.watchShow(this.fRentedShow.RentedShowID);
		if(watchShowResp == null)
			return;

		if(!ViewPortControl.canOpen())
		{
			showMsg("This player does not play audio or video content.");
			return;
		}

		var oControl = this.findControl(ViewPortControl.ControlID);
		if(oControl == null)
		{
			oControl = new ViewPortControl(ViewPortControl.ControlID, this.ScreenID);
			this.newControl(oControl);
		}

		this.fContainerControl.focusControl(ViewPortControl.ControlID, true);
		oControl.playVideo(watchShowResp.License.ShowURL);
		return;
	}
	else if(controlID == RentedShowDetailScreen.DeleteNowID)
	{
		var statusCode = oSession.releaseShow(this.fRentedShow.RentedShowID);

		if(statusCode == sc_Success)
		{
			this.close();

			var oNowPlayingScreen = MainApp.getThe().findScreen(NowPlayingScreen.ScreenID);
			if(oNowPlayingScreen != null)
				oNowPlayingScreen.removeRentedShow(this.fRentedShow.RentedShowID);
		}
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
