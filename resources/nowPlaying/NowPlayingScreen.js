/* NowPlayingScreen.js */

/******************************************************************************/
/******************************************************************************/

NowPlayingScreen.ScreenID = "Show002";
NowPlayingScreen.ShowListID = "Show002_ShowList";
NowPlayingScreen.NoShowsTextID = "Show002_NoShowsText";

/******************************************************************************/

NowPlayingScreen.newInstance = function()
{
	var oSession = MainApp.getThe().getSession();
	var rentedShowSearchListRef = new Object();

	if(oSession.rentedShowList(rentedShowSearchListRef) == sc_Success)
		MainApp.getThe().openScreen(new NowPlayingScreen(rentedShowSearchListRef.value));
}

/******************************************************************************/

NowPlayingScreen.prototype = new Screen();
NowPlayingScreen.prototype.constructor = NowPlayingScreen;

/******************************************************************************/

function NowPlayingScreen(/*Array*/ rentedShowSearchList)
{
	this.fRentedShowSearchList = rentedShowSearchList;
	this.ScreenID = NowPlayingScreen.ScreenID;

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Show", 550));
	oRowItemList.push(new ListControlRowItem("Provider", 230));
	oRowItemList.push(new ListControlRowItem("Until", 172));

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);

	var oControl;

	oControl = new RentedShowListControl(NowPlayingScreen.ShowListID, this.ScreenID,
		6, oRowItemList, rentedShowSearchList);
	if(rentedShowSearchList.length > 0)
		this.newControl(oControl);
	oControl.show(rentedShowSearchList.length > 0);

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
		oRentedShowListControl.setRentedShowSearchList(this.fRentedShowSearchList);
	}
	else
	{
		oControl = this.getControl(NowPlayingScreen.ShowListID);
		oControl.show(false);
		this.deleteControl(NowPlayingScreen.ShowListID);

		oControl = new TextControl(NowPlayingScreen.NoShowsTextID, this.ScreenID);
		this.newControl(oControl);
		oControl.show(true);
	}
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == NowPlayingScreen.ShowListID)
	{
		var rentedShowListControl = this.getControl(NowPlayingScreen.ShowListID);
		var rentedShow = oSession.rentedShow(
			rentedShowListControl.getFocusedItemValue().RentedShowID);

		if(rentedShow != null)
			RentedShowDetailScreen.newInstance(rentedShow);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
