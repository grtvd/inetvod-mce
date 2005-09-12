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

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Category", 438));

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);

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
	var showSearchListRef = new Object();

	var oSearchData = new SearchData();
	oSearchData.CategoryID = oTextListControl.getFocusedItemValue().Name;

	if(oSession.showSearch(oSearchData, showSearchListRef))
		SearchResultsScreen.newInstance(showSearchListRef.value);
}

/******************************************************************************/
/******************************************************************************/
