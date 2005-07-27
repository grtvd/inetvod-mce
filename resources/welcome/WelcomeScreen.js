/* WelcomeScreen.js */

/******************************************************************************/
/******************************************************************************/

WelcomeScreen.ScreenID = "Welcome001";
WelcomeScreen.NowPlayingID = "Welcome001_NowPlaying";
WelcomeScreen.FeaturedID = "Welcome001_Featured";
WelcomeScreen.SearchByCategoryID = "Welcome001_SearchByCategory";
WelcomeScreen.SearchByNameID = "Welcome001_SearchByName";
WelcomeScreen.PreferencesID = "Welcome001_Preferences";

/******************************************************************************/

WelcomeScreen.newInstance = function()
{
	MainApp.getThe().openScreen(new WelcomeScreen());
}

/******************************************************************************/

WelcomeScreen.prototype = new Screen();
WelcomeScreen.prototype.constructor = WelcomeScreen;

/******************************************************************************/

function WelcomeScreen()
{
	this.ScreenID = WelcomeScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 122, 182);
	this.fContainerControl.newControl(new ButtonControl(WelcomeScreen.NowPlayingID, this.ScreenID));
	this.fContainerControl.newControl(new ButtonControl(WelcomeScreen.FeaturedID, this.ScreenID));
	this.fContainerControl.newControl(new ButtonControl(WelcomeScreen.SearchByCategoryID, this.ScreenID));
	this.fContainerControl.newControl(new ButtonControl(WelcomeScreen.SearchByNameID, this.ScreenID));
	this.fContainerControl.newControl(new ButtonControl(WelcomeScreen.PreferencesID, this.ScreenID));
}

/******************************************************************************/

/*void*/ WelcomeScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(controlID == WelcomeScreen.NowPlayingID)
	{
		NowPlayingScreen.newInstance();
		return;
	}

	if(controlID == WelcomeScreen.FeaturedID)
	{
		var oSession = MainApp.getThe().getSession();
		var showSearchListRef = new Object();
		
		var oSearchData = new SearchData();
		oSearchData.CategoryID = Category.FeaturedCategoryID;

		if(oSession.showSearch(oSearchData, showSearchListRef))
			SearchResultsScreen.newInstance(showSearchListRef.ref);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
