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

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);

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
		var showSearchListRef = new Object();

		oControl = this.getControl(SearchScreen.ShowNameID);
		this.fSearchData.PartialName = oControl.getText();

		if(oSession.showSearch(this.fSearchData, showSearchListRef))
			SearchResultsScreen.newInstance(showSearchListRef.value);
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
/******************************************************************************/
