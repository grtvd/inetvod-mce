/* CategorySelectScreen.js */

/******************************************************************************/
/******************************************************************************/

CategorySelectScreen.ScreenID = "Search002";
CategorySelectScreen.CategoriesID = "Search002_Categories";

/******************************************************************************/

CategorySelectScreen.newInstance = function(/*SearchDataPtr*/ oSearchData)
{
	return MainApp.getThe().openScreen(new CategorySelectScreen(oSearchData));
}

/******************************************************************************/

CategorySelectScreen.prototype = new Screen();
CategorySelectScreen.prototype.constructor = CategorySelectScreen;

/******************************************************************************/

function CategorySelectScreen(/*SearchDataPtr*/ oSearchData)
{
	this.ScreenID = CategorySelectScreen.ScreenID;

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Category", 438));

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);

	this.fSearchData = oSearchData;

	// load the Categories
	var oSession = MainApp.getThe().getSession();
	var categoryList = oSession.getCategoryList();
	var itemList = new Array();

	itemList.push(new NameValuePair(Category.AllCategoriesID, oSession.getCategoryName(Category.AllCategoriesID)));
	for(var i = 0; i < categoryList.length; i++)
		itemList.push(new NameValuePair(categoryList[i].CategoryID, categoryList[i].Name));

	this.newControl(new TextListControl(CategorySelectScreen.CategoriesID, this.ScreenID, 8,
		oRowItemList, itemList));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ CategorySelectScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oTextListControl = this.getControl(CategorySelectScreen.CategoriesID);
	this.fSearchData.CategoryID = oTextListControl.getFocusedItemValue().Name;

	var oSession = MainApp.getThe().getSession();
	var oScreen = MainApp.getThe().getScreen(SearchScreen.ScreenID);
	var oButtonControl = oScreen.getControl(SearchScreen.CategoryID);
	oButtonControl.setText(oSession.getCategoryName(this.fSearchData.CategoryID));

	this.close();
}

/******************************************************************************/
/******************************************************************************/