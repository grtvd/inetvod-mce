/* NowPlayingScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchResultsScreen.ScreenID = "Search003";
SearchResultsScreen.ShowListID = "Search003_ShowList";
SearchResultsScreen.NoShowsTextID = "Search003_NoShowsText";

/******************************************************************************/

SearchResultsScreen.newInstance = function(/*Array*/ showSearchList)
{
	MainApp.getThe().openScreen(new SearchResultsScreen(showSearchList));
}

/******************************************************************************/

SearchResultsScreen.prototype = new Screen();
SearchResultsScreen.prototype.constructor = SearchResultsScreen;

/******************************************************************************/

function SearchResultsScreen(/*Array*/ showSearchList)
{
	this.ScreenID = SearchResultsScreen.ScreenID;

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Show", 522));
	oRowItemList.push(new ListControlRowItem("Year", 90));
	oRowItemList.push(new ListControlRowItem("Provider", 220));
	oRowItemList.push(new ListControlRowItem("Cost", 120));

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);

	var oControl;

	oControl = new ShowSearchListControl(SearchResultsScreen.ShowListID, this.ScreenID,
		8, oRowItemList, showSearchList);
	if(showSearchList.length > 0)
		this.fContainerControl.newControl(oControl);
	oControl.show(showSearchList.length > 0);

	oControl = new TextControl(SearchResultsScreen.NoShowsTextID, this.ScreenID);
	if(showSearchList.length == 0)
		this.fContainerControl.newControl(oControl);
	oControl.show(showSearchList.length == 0);
}

/******************************************************************************/

/*void*/ SearchResultsScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(controlID == SearchResultsScreen.ShowListID)
	{
		showMsg("SearchResultsScreen.onButton()");
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
