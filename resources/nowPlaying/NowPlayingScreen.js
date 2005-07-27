/* NowPlayingScreen.js */

/******************************************************************************/
/******************************************************************************/

var NowPlayingScreen_ScreenID = "Show002";
var NowPlayingScreen_ShowListID = "Show002_ShowList";
var NowPlayingScreen_NoShowsTextID = "Show002_NoShowsText";

/******************************************************************************/

function NowPlayingScreen_newInstance()
{
	GetTheMainApp().openScreen(new NowPlayingScreen());
}

/******************************************************************************/

NowPlayingScreen.prototype = new Screen();
NowPlayingScreen.prototype.constructor = NowPlayingScreen;

/******************************************************************************/

function NowPlayingScreen()
{
	this.ScreenID = NowPlayingScreen_ScreenID;

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Show", 550));
	oRowItemList.push(new ListControlRowItem("Provider", 230));
	oRowItemList.push(new ListControlRowItem("Until", 172));

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);
	this.fContainerControl.newControl(new ListControl(NowPlayingScreen_ShowListID,
		this.ScreenID, 8, oRowItemList, new RentedShowListControl()));
//	this.fContainerControl.newControl(new ButtonControl(NowPlayingScreen_NoShowsTextID, this.ScreenID));
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(controlID == NowPlayingScreen_ShowListID)
	{
		showMsg("NowPlayingScreen.onButton()");
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
