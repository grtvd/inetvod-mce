/* WelcomeScreen.js */

/******************************************************************************/
/******************************************************************************/

var WelcomeScreen_ScreenID = "Welcome001";
var WelcomeScreen_NowPlayingID = "Welcome001_NowPlaying";
var WelcomeScreen_FeaturedID = "Welcome001_Featured";
var WelcomeScreen_SearchByCategoryID = "Welcome001_SearchByCategory";
var WelcomeScreen_SearchByNameID = "Welcome001_SearchByName";
var WelcomeScreen_PreferencesID = "Welcome001_Preferences";

/******************************************************************************/

function WelcomeScreen_newInstance()
{
	GetTheMainApp().openScreen(new WelcomeScreen());
}

/******************************************************************************/

WelcomeScreen.prototype = new Screen();
WelcomeScreen.prototype.constructor = WelcomeScreen;

/******************************************************************************/

function WelcomeScreen()
{
	this.ScreenID = WelcomeScreen_ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 122, 182);
	this.fContainerControl.newControl(new ButtonControl(WelcomeScreen_NowPlayingID, this.ScreenID));
	this.fContainerControl.newControl(new ButtonControl(WelcomeScreen_FeaturedID, this.ScreenID));
	this.fContainerControl.newControl(new ButtonControl(WelcomeScreen_SearchByCategoryID, this.ScreenID));
	this.fContainerControl.newControl(new ButtonControl(WelcomeScreen_SearchByNameID, this.ScreenID));
	this.fContainerControl.newControl(new ButtonControl(WelcomeScreen_PreferencesID, this.ScreenID));
}

/******************************************************************************/

/*void*/ WelcomeScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(controlID == WelcomeScreen_NowPlayingID)
	{
		NowPlayingScreen_newInstance();
		return;
	}

	if(controlID == WelcomeScreen_FeaturedID)
	{
		var oSession = GetTheMainApp().getSession();
		var showSearchListRef = new Object();
		
		var oSearchData = new SearchData();
		oSearchData.CategoryID = Category_FeaturedCategoryID;

		if(oSession.showSearch(oSearchData, showSearchListRef))
			SearchResultsScreen_newInstance(showSearchListRef.ref);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
