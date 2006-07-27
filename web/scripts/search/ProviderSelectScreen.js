/* ProviderSelectScreen.js */

/******************************************************************************/
/******************************************************************************/

ProviderSelectScreen.ScreenID = "Search001";
ProviderSelectScreen.ProvidersID = "Search001_Providers";

/******************************************************************************/

ProviderSelectScreen.newInstance = function(/*SearchDataPtr*/ oSearchData)
{
	var oScreen = MainApp.getThe().openScreen(new ProviderSelectScreen(oSearchData));

	if(testStrHasLen(oSearchData.ProviderID))
	{
		var oTextListControl = oScreen.getControl(ProviderSelectScreen.ProvidersID);
		oTextListControl.setFocusedItemByName(oSearchData.ProviderID);
	}

	return oScreen;
}

/******************************************************************************/

ProviderSelectScreen.prototype = new Screen();
ProviderSelectScreen.prototype.constructor = ProviderSelectScreen;

/******************************************************************************/

function ProviderSelectScreen(/*SearchDataPtr*/ oSearchData)
{
	this.ScreenID = ProviderSelectScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Provider", 438));

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);
	this.fContainerControl.onNavigate = ProviderSelectScreen.onNavigate;

	this.fSearchData = oSearchData;

	// load the Providers
	var oSession = MainApp.getThe().getSession();
	var providerList = oSession.getProviderList();
	var itemList = new Array();

	itemList.push(new NameValuePair(Provider.AllProvidersID, oSession.getProviderName(Provider.AllProvidersID)));
	for(var i = 0; i < providerList.length; i++)
		itemList.push(new NameValuePair(providerList[i].ProviderID, providerList[i].Name));

	this.newControl(new TextListControl(ProviderSelectScreen.ProvidersID, this.ScreenID, 8,
		oRowItemList, itemList));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ ProviderSelectScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oTextListControl = this.getControl(ProviderSelectScreen.ProvidersID);
	this.fSearchData.ProviderID = oTextListControl.getFocusedItemValue().Name;

	var oSession = MainApp.getThe().getSession();
	var oScreen = MainApp.getThe().getScreen(SearchScreen.ScreenID);
	var oButtonControl = oScreen.getControl(SearchScreen.ProviderID);
	oButtonControl.setText(oSession.getProviderName(this.fSearchData.ProviderID));

	this.close();
}

/******************************************************************************/

/*string*/ ProviderSelectScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
		if(fromControl == ProviderSelectScreen.ProvidersID)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
