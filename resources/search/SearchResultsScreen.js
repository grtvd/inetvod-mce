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
	oRowItemList.push(new ListControlRowItem("Year", 95));
	oRowItemList.push(new ListControlRowItem("Provider", 215));
	oRowItemList.push(new ListControlRowItem("Cost", 120));

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);

	var oControl;

	oControl = new ShowSearchListControl(SearchResultsScreen.ShowListID, this.ScreenID,
		6, oRowItemList, showSearchList);
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
	var oSession = MainApp.getThe().getSession();

	if(controlID == SearchResultsScreen.ShowListID)
	{
		var oShowSearchListControl = this.getControl(SearchResultsScreen.ShowListID);
		var oShowSearch = oShowSearchListControl.getFocusedItemValue();
		var showProviderList = oShowSearch.ShowProviderList;
		var providerID;

		if(showProviderList.length == 1)
		{
			var oShowProvider = showProviderList[0];
			var oShowDetail = oSession.showDetail(oShowSearch.ShowID, oShowProvider.ProviderID);

			if(oShowDetail != null)
				SearchDetailScreen.newInstance(oShowDetail);
		}
		else
		{
			PickProviderScreen.newInstance(oShowSearch);
		}

		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
