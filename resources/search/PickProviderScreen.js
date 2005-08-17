/* PickProviderScreen.js */

/******************************************************************************/
/******************************************************************************/

PickProviderScreen.ScreenID = "Search009";
PickProviderScreen.AvailTextID = "Search009_AvailText";
PickProviderScreen.ProviderListID = "Search009_ProviderList";

/******************************************************************************/

PickProviderScreen.newInstance = function(/*ShowSearch*/ oShowSearch)
{
	return MainApp.getThe().openScreen(new PickProviderScreen(oShowSearch));
}

/******************************************************************************/

PickProviderScreen.prototype = new Screen();
PickProviderScreen.prototype.constructor = PickProviderScreen;

/******************************************************************************/

function PickProviderScreen(/*ShowSearch*/ oShowSearch)
{
	this.ShowSearch = oShowSearch;
	this.ScreenID = PickProviderScreen.ScreenID;

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Provider", 318));
	oRowItemList.push(new ListControlRowItem("Price", 120));

	this.fContainerControl = new ContainerControl(this.ScreenID, 212, 150);

	var oControl = new TextControl(PickProviderScreen.AvailTextID, this.ScreenID);
	var tempStr = "'" + oShowSearch.Name + "' is available from multiple providers.";
	oControl.setText(tempStr);
	this.newControl(oControl);

	this.newControl(new ShowProviderListControl(PickProviderScreen.ProviderListID,
		this.ScreenID, 2, oRowItemList, oShowSearch.ShowProviderList));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ PickProviderScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == PickProviderScreen.ProviderListID)
	{
		var oShowProviderListControl = this.getControl(PickProviderScreen.ProviderListID);
		var oShowProvider = oShowProviderListControl.getFocusedItemValue();

		showMsg("PickProviderScreen.onButton: open showDetail for ShowID(" + this.ShowSearch.ShowID + "), ProviderID(" + oShowProvider.ProviderID + ")");
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
