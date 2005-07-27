/* NowPlayingScreen.js */

/******************************************************************************/
/******************************************************************************/

NowPlayingScreen.ScreenID = "Show002";
NowPlayingScreen.ShowListID = "Show002_ShowList";
NowPlayingScreen.NoShowsTextID = "Show002_NoShowsText";

/******************************************************************************/

NowPlayingScreen.newInstance = function()
{
	MainApp.getThe().openScreen(new NowPlayingScreen());
}

/******************************************************************************/

NowPlayingScreen.prototype = new Screen();
NowPlayingScreen.prototype.constructor = NowPlayingScreen;

/******************************************************************************/

function NowPlayingScreen()
{
	this.ScreenID = NowPlayingScreen.ScreenID;

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Show", 550));
	oRowItemList.push(new ListControlRowItem("Provider", 230));
	oRowItemList.push(new ListControlRowItem("Until", 172));

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);
	this.fContainerControl.newControl(new ListControl(NowPlayingScreen.ShowListID,
		this.ScreenID, 8, oRowItemList, new RentedShowListControl()));
//	this.fContainerControl.newControl(new ButtonControl(NowPlayingScreen.NoShowsTextID, this.ScreenID));
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(controlID == NowPlayingScreen.ShowListID)
	{
		showMsg("NowPlayingScreen.onButton()");
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
