/* SearchScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchScreen.ScreenID = "Search006";
SearchScreen.ShowNameID = "Search006_ShowName";
SearchScreen.SearchID = "Search006_Search";
SearchScreen.ProviderID = "Search006_Provider";
SearchScreen.CategoryID = "Search006_Category";
SearchScreen.RatingID = "Search006_Rating";

/******************************************************************************/

SearchScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new SearchScreen());
}

/******************************************************************************/

SearchScreen.prototype = new Screen();
SearchScreen.prototype.constructor = SearchScreen;

/******************************************************************************/

function SearchScreen()
{
	var oControl;

	this.ScreenID = SearchScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);
	this.fContainerControl.onNavigate = SearchScreen.onNavigate;

	oControl = new EditControl(SearchScreen.ShowNameID, this.ScreenID, 16);
	this.newControl(oControl);
	oControl.Type = ect_UpperAlphaNumeric;
	this.newControl(new ButtonControl(SearchScreen.SearchID, this.ScreenID));

	this.newControl(new ButtonControl(SearchScreen.ProviderID, this.ScreenID));
	this.newControl(new ButtonControl(SearchScreen.CategoryID, this.ScreenID));
	this.newControl(new ButtonControl(SearchScreen.RatingID, this.ScreenID));

	this.fSearchData = new SearchData();

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ SearchScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();
	var oControl;

	if((controlID == SearchScreen.SearchID) || (controlID == SearchScreen.ShowNameID))
	{
		oControl = this.getControl(SearchScreen.ShowNameID);
		this.fSearchData.Search = oControl.getText();

		this.Callback = SearchScreen.prototype.afterShowSearch;
		oSession.showSearch(this, this.fSearchData);
		return;
	}

	if(controlID == SearchScreen.ProviderID)
	{
		ProviderSelectScreen.newInstance(this.fSearchData);
		return;
	}

	if(controlID == SearchScreen.CategoryID)
	{
		CategorySelectScreen.newInstance(this.fSearchData);
		return;
	}

	if(controlID == SearchScreen.RatingID)
	{
		RatingSelectScreen.newInstance(this.fSearchData);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ SearchScreen.prototype.afterShowSearch = function(/*ShowSearchList*/ showSearchList,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		SearchResultsScreen.newInstance(showSearchList);
}

/******************************************************************************/

/*string*/ SearchScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
	{
		if(fromControl == SearchScreen.SearchID)
			return SearchScreen.ShowNameID;
		if((fromControl == SearchScreen.ShowNameID)
				|| (fromControl == SearchScreen.ProviderID)
				|| (fromControl == SearchScreen.CategoryID)
				|| (fromControl == SearchScreen.RatingID))
			return ViewPortControl.ControlID;
	}

	if(key == ek_RightButton)
	{
		if((fromControl == SearchScreen.ShowNameID)
				|| (fromControl == SearchScreen.ProviderID)
				|| (fromControl == SearchScreen.CategoryID)
				|| (fromControl == SearchScreen.RatingID))
			return SearchScreen.SearchID;
	}

	if(key == ek_DownButton)
	{
		if(fromControl == SearchScreen.ShowNameID)
			return SearchScreen.ProviderID;
	}

	if(key == ek_UpButton)
	{
		if(fromControl == SearchScreen.ProviderID)
			return SearchScreen.ShowNameID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
