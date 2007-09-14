/* CategorySearchScreen.js */

/******************************************************************************/
/******************************************************************************/

CategorySearchScreen.ScreenID = "Search010";
CategorySearchScreen.CategoriesID = "Search010_Categories";

/******************************************************************************/

CategorySearchScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new CategorySearchScreen());
}

/******************************************************************************/

CategorySearchScreen.prototype = new Screen();
CategorySearchScreen.prototype.constructor = CategorySearchScreen;

/******************************************************************************/

function CategorySearchScreen()
{
	this.ScreenID = CategorySearchScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Category", 438));

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);
	this.fContainerControl.onNavigate = CategorySearchScreen.onNavigate;

	// load the Categories
	var oSession = MainApp.getThe().getSession();
	var categoryList = oSession.getCategoryList();
	var itemList = new Array();

	for(var i = 0; i < categoryList.length; i++)
		itemList.push(new NameValuePair(categoryList[i].CategoryID, categoryList[i].Name));

	this.newControl(new TextListControl(CategorySearchScreen.CategoriesID, this.ScreenID, 8,
		oRowItemList, itemList));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ CategorySearchScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();
	var oTextListControl = this.getControl(CategorySearchScreen.CategoriesID);

	var oSearchData = new SearchData();
	oSearchData.CategoryID = oTextListControl.getFocusedItemValue().Name;

	this.Callback = CategorySearchScreen.prototype.afterShowSearch;
	oSession.showSearch(this, oSearchData);
}

/******************************************************************************/

/*void*/ CategorySearchScreen.prototype.afterShowSearch = function(/*ShowSearchList*/ showSearchList,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		SearchResultsScreen.newInstance(showSearchList);
}

/******************************************************************************/

/*string*/ CategorySearchScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
		if(fromControl == CategorySearchScreen.CategoriesID)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
