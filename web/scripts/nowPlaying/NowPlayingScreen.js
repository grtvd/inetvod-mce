/* NowPlayingScreen.js */

/******************************************************************************/
/******************************************************************************/

NowPlayingScreen.ScreenID = "Show002";
NowPlayingScreen.ShowListID = "Show002_ShowList";
NowPlayingScreen.NameID = "Show002_Name";
NowPlayingScreen.EpisodeNameID = "Show002_EpisodeName";
NowPlayingScreen.ProviderID = "Show002_Provider";
NowPlayingScreen.SortByNameID = "Show002_SortByName";
NowPlayingScreen.SortByUntilID = "Show002_SortByUntil";
NowPlayingScreen.NoShowsTextID = "Show002_NoShowsText";

/******************************************************************************/

NowPlayingScreen.newInstance = function()
{
	MainApp.getThe().getSession().rentedShowList(NowPlayingScreen.afterRentedShowList);
}

/******************************************************************************/

/*void*/ NowPlayingScreen.afterRentedShowList = function(/*RentedShowSearchList*/ rentedShowSearchList,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		var oScreen = new NowPlayingScreen(rentedShowSearchList);
		MainApp.getThe().openScreen(oScreen);
		oScreen.focusControl(NowPlayingScreen.ShowListID, true);
		return oScreen;
	}
}

/******************************************************************************/

NowPlayingScreen.prototype = new Screen();
NowPlayingScreen.prototype.constructor = NowPlayingScreen;

/******************************************************************************/

function NowPlayingScreen(/*Array*/ rentedShowSearchList)
{
	this.fRentedShowSearchList = rentedShowSearchList;
	//no initial sort - this.fRentedShowSearchList.sort(RentedShowSearchByAvailableUntilCmpr);
	this.ScreenID = NowPlayingScreen.ScreenID;
	this.ScreenTitle = "playing";
	this.ScreenTitleImage = "titlePlaying.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Show", 550));
	oRowItemList.push(new ListControlRowItem("Until", 130));

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);
	this.fContainerControl.onNavigate = NowPlayingScreen.onNavigate;

	var oControl;

	if(rentedShowSearchList.length > 0)
	{
		this.newControl(new ButtonControl(NowPlayingScreen.SortByNameID, this.ScreenID));
		this.newControl(new ButtonControl(NowPlayingScreen.SortByUntilID, this.ScreenID));
	}

	oControl = new RentedShowListControl(NowPlayingScreen.ShowListID, this.ScreenID,
		6, oRowItemList, rentedShowSearchList);
	if(rentedShowSearchList.length > 0)
		this.newControl(oControl);
	oControl.show(rentedShowSearchList.length > 0);

	if(rentedShowSearchList.length > 0)
	{
		this.newControl(new TextControl(NowPlayingScreen.NameID, this.ScreenID));
		this.newControl(new TextControl(NowPlayingScreen.EpisodeNameID, this.ScreenID));
		this.newControl(new TextControl(NowPlayingScreen.ProviderID, this.ScreenID));
	}

	oControl = new TextControl(NowPlayingScreen.NoShowsTextID, this.ScreenID);
	if(rentedShowSearchList.length == 0)
		this.newControl(oControl);
	oControl.show(rentedShowSearchList.length == 0);

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.removeRentedShow = function(/*string*/ rentedShowID)
{
	var oControl;

	arrayRemoveByCmpr(this.fRentedShowSearchList, new RentedShowSearchToIDCmpr(rentedShowID));

	if(this.fRentedShowSearchList.length > 0)
	{
		var oRentedShowListControl = this.getControl(NowPlayingScreen.ShowListID);
		oRentedShowListControl.setRentedShowSearchList(this.fRentedShowSearchList, false);
	}
	else
	{
		oControl = this.getControl(NowPlayingScreen.ShowListID);
		oControl.show(false);
		this.deleteControl(NowPlayingScreen.ShowListID);
		this.deleteControl(NowPlayingScreen.SortByNameID);
		this.deleteControl(NowPlayingScreen.SortByUntilID);
		this.deleteControl(NowPlayingScreen.NameID);
		this.deleteControl(NowPlayingScreen.EpisodeNameID);
		this.deleteControl(NowPlayingScreen.ProviderID);

		oControl = new TextControl(NowPlayingScreen.NoShowsTextID, this.ScreenID);
		this.newControl(oControl);
		oControl.show(true);
	}
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();
	var oRentedShowListControl;

	if(controlID == NowPlayingScreen.ShowListID)
	{
		oRentedShowListControl = this.getControl(NowPlayingScreen.ShowListID);

		this.Callback = NowPlayingScreen.prototype.afterRentedShow;
		oSession.rentedShow(this, oRentedShowListControl.getFocusedItemValue().RentedShowID);
		return;
	}

	if((controlID == NowPlayingScreen.SortByNameID) || (controlID == NowPlayingScreen.SortByUntilID))
	{
		if(controlID == NowPlayingScreen.SortByNameID)
			this.fRentedShowSearchList.sort(RentedShowSearchByNameCmpr);
		else
			this.fRentedShowSearchList.sort(RentedShowSearchByAvailableUntilCmpr);

		oRentedShowListControl = this.getControl(NowPlayingScreen.ShowListID);
		oRentedShowListControl.setRentedShowSearchList(this.fRentedShowSearchList, true);
		this.focusControl(NowPlayingScreen.ShowListID, true);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.afterRentedShow = function(/*RentedShow*/ rentedShow,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		RentedShowDetailScreen.newInstance(rentedShow);
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.onListItem = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == NowPlayingScreen.ShowListID)
	{
		var rentedShowListControl = this.getControl(NowPlayingScreen.ShowListID);
		var rentedShowSearch = rentedShowListControl.getFocusedItemValue();
		var tempStr;

		this.getControl(NowPlayingScreen.NameID).setText(rentedShowSearch.Name);
		this.getControl(NowPlayingScreen.EpisodeNameID).setText(rentedShowSearch.EpisodeName);

		this.getControl(NowPlayingScreen.ProviderID).setText(
			oSession.getProviderName(rentedShowSearch.ProviderID)
			+ this.formatAvailableUntil(rentedShowSearch.AvailableUntil));
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*string*/ NowPlayingScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == NowPlayingScreen.ShowListID)
	{
		if(key == ek_LeftButton)
			return NowPlayingScreen.SortByNameID;
		if(key == ek_DownButton)
			return ViewPortControl.ControlID;
	}

	if(fromControl == NowPlayingScreen.SortByNameID)
		if(key == ek_RightButton)
			return NowPlayingScreen.ShowListID;

	if(fromControl == NowPlayingScreen.SortByUntilID)
	{
		if(key == ek_RightButton)
			return NowPlayingScreen.ShowListID;
		if(key == ek_DownButton)
			return ViewPortControl.ControlID;
	}

	if(fromControl == ViewPortControl.ControlID)
	{
		if(key == ek_RightButton)
			return NowPlayingScreen.ShowListID;
		if(key == ek_UpButton)
			return NowPlayingScreen.SortByUntilID;
	}

	return null;
}

/******************************************************************************/

/*string*/ NowPlayingScreen.prototype.formatAvailableUntil = function(/*Date*/ availableUntil)
{
	if(availableUntil == null)
		return "";

	var expires;
	var now = new Date();
	var totalDays = (availableUntil.getTime() - now.getTime()) / MillsPerDay;

	if(totalDays < 0)
		expires = ", Expired";
	else
		expires = ", Until " + dayOfWeekToString(availableUntil.getDay(), false)
			+ " " + dateTimeToString(availableUntil, dtf_M_D_H_MM_AM);

	return expires;
}

/******************************************************************************/
/******************************************************************************/
