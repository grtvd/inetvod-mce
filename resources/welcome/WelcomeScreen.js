/* WelcomeScreen.js */

/******************************************************************************/
/******************************************************************************/

WelcomeScreen.ScreenID = "Welcome001";
WelcomeScreen.NowPlayingID = "Welcome001_NowPlaying";
WelcomeScreen.FeaturedID = "Welcome001_Featured";
WelcomeScreen.SearchByCategoryID = "Welcome001_SearchByCategory";
WelcomeScreen.SearchByNameID = "Welcome001_SearchByName";
WelcomeScreen.PreferencesID = "Welcome001_Preferences";
WelcomeScreen.HelpID = "Welcome001_Help";

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
	this.newControl(new ButtonControl(WelcomeScreen.NowPlayingID, this.ScreenID));
	this.newControl(new ButtonControl(WelcomeScreen.FeaturedID, this.ScreenID));
	this.newControl(new ButtonControl(WelcomeScreen.SearchByCategoryID, this.ScreenID));
	this.newControl(new ButtonControl(WelcomeScreen.SearchByNameID, this.ScreenID));
	this.newControl(new ButtonControl(WelcomeScreen.PreferencesID, this.ScreenID));
	this.newControl(new TextControl(WelcomeScreen.HelpID, this.ScreenID));
	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
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
			SearchResultsScreen.newInstance(showSearchListRef.value);
		return;
	}

	if(controlID == WelcomeScreen.SearchByCategoryID)
	{
		CategorySearchScreen.newInstance();
		return;
	}

	if(controlID == WelcomeScreen.SearchByNameID)
	{
		SearchScreen.newInstance();
		return;
	}

	showMsg("WelcomeScreen.onButton: to-do");
	//Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ WelcomeScreen.prototype.onFocus = function(/*string*/ controlID)
{
	var oTextControl = this.getControl(WelcomeScreen.HelpID);

	if(controlID == WelcomeScreen.NowPlayingID)
		oTextControl.setText("\"Now Playing\" lists the shows that you have previously rented and have available for viewing.");
	else if(controlID == WelcomeScreen.FeaturedID)
		oTextControl.setText("\"Featured\" lists shows that are currently featured.");
	else if(controlID == WelcomeScreen.SearchByCategoryID)
		oTextControl.setText("Use \"Search by Category\" to find shows by a specific category.");
	else if(controlID == WelcomeScreen.SearchByNameID)
		oTextControl.setText("Use \"Search by Title\" to find shows by a partial show title.");
	else if(controlID == WelcomeScreen.PreferencesID)
		oTextControl.setText("\"Preferences\" allows you to update your iNetVOD settings.");
	else
		oTextControl.setText("");
}

/******************************************************************************/
/******************************************************************************/
