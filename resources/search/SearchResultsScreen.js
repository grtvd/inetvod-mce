/* NowPlayingScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchResultsScreen.ScreenID = "Search003";
SearchResultsScreen.ShowListID = "Search003_ShowList";
SearchResultsScreen.NameID = "Search003_Name";
SearchResultsScreen.EpisodeNameID = "Search003_EpisodeName";
SearchResultsScreen.ProviderID = "Search003_Provider";
SearchResultsScreen.SortByNameID = "Search003_SortByName";
SearchResultsScreen.SortByPriceID = "Search003_SortByPrice";
SearchResultsScreen.NoShowsTextID = "Search003_NoShowsText";

/******************************************************************************/

SearchResultsScreen.newInstance = function(/*Array*/ showSearchList)
{
	var oScreen = new SearchResultsScreen(showSearchList);
	MainApp.getThe().openScreen(oScreen);
	oScreen.focusControl(SearchResultsScreen.ShowListID, true);
	return oScreen;
}

/******************************************************************************/

SearchResultsScreen.prototype = new Screen();
SearchResultsScreen.prototype.constructor = SearchResultsScreen;

/******************************************************************************/

function SearchResultsScreen(/*Array*/ showSearchList)
{
	this.ScreenID = SearchResultsScreen.ScreenID;

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Show", 500));
	oRowItemList.push(new ListControlRowItem("Year", 80));
	oRowItemList.push(new ListControlRowItem("Cost", 100));

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);
	this.fContainerControl.onNavigate = SearchResultsScreen.onNavigate;

	var oControl;

	if(showSearchList.length > 0)
	{
		this.newControl(new ButtonControl(SearchResultsScreen.SortByNameID, this.ScreenID));
		this.newControl(new ButtonControl(SearchResultsScreen.SortByPriceID, this.ScreenID));
	}

	oControl = new ShowSearchListControl(SearchResultsScreen.ShowListID, this.ScreenID,
		6, oRowItemList, showSearchList);
	if(showSearchList.length > 0)
		this.newControl(oControl);
	oControl.show(showSearchList.length > 0);

	if(showSearchList.length > 0)
	{
		this.newControl(new TextControl(SearchResultsScreen.NameID, this.ScreenID));
		this.newControl(new TextControl(SearchResultsScreen.EpisodeNameID, this.ScreenID));
		this.newControl(new TextControl(SearchResultsScreen.ProviderID, this.ScreenID));
	}

	oControl = new TextControl(SearchResultsScreen.NoShowsTextID, this.ScreenID);
	if(showSearchList.length == 0)
		this.newControl(oControl);
	oControl.show(showSearchList.length == 0);

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
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

	if(controlID == SearchResultsScreen.SortByNameID)
	{
		showMsg("Not yet implemented");	//TODO: need to implement
		return;
	}

	if(controlID == SearchResultsScreen.SortByPriceID)
	{
		showMsg("Not yet implemented");	//TODO: need to implement
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ SearchResultsScreen.prototype.onListItem = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == SearchResultsScreen.ShowListID)
	{
		var oShowSearchListControl = this.getControl(SearchResultsScreen.ShowListID);
		var oShowSearch = oShowSearchListControl.getFocusedItemValue();
		var showProviderList = oShowSearch.ShowProviderList;
		var tempStr = "";;

		this.getControl(SearchResultsScreen.NameID).setText(oShowSearch.Name);
		this.getControl(SearchResultsScreen.EpisodeNameID).setText(oShowSearch.EpisodeName);

		for(var i = 0; i < showProviderList.length; i++)
		{
			if(testStrHasLen(tempStr))
				tempStr += ", ";
			tempStr += oSession.getProviderName(showProviderList[i].ProviderID);
			tempStr += " (" + showProviderList[i].ShowCost.CostDisplay + ")";
		}
		this.getControl(SearchResultsScreen.ProviderID).setText(tempStr);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*string*/ SearchResultsScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == SearchResultsScreen.ShowListID)
	{
		if(key == ek_LeftButton)
			return SearchResultsScreen.SortByNameID;
		if(key == ek_DownButton)
			return ViewPortControl.ControlID;
	}

	if(fromControl == SearchResultsScreen.SortByNameID)
		if(key == ek_RightButton)
			return SearchResultsScreen.ShowListID;

	if(fromControl == SearchResultsScreen.SortByPriceID)
	{
		if(key == ek_RightButton)
			return SearchResultsScreen.ShowListID;
		if(key == ek_DownButton)
			return ViewPortControl.ControlID;
	}

	if(fromControl == ViewPortControl.ControlID)
	{
		if(key == ek_RightButton)
			return SearchResultsScreen.ShowListID;
		if(key == ek_UpButton)
			return SearchResultsScreen.SortByPriceID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
