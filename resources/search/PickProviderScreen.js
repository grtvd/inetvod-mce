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
	oRowItemList.push(new ListControlRowItem("Provider", 338));
	oRowItemList.push(new ListControlRowItem("Price", 100));

	this.fContainerControl = new ContainerControl(this.ScreenID, 212, 150);
	this.fContainerControl.onNavigate = PickProviderScreen.onNavigate;

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

		var oShowDetail = oSession.showDetail(this.ShowSearch.ShowID, oShowProvider.ProviderID);

		if(oShowDetail != null)
		{
			SearchDetailScreen.newInstance(oShowDetail);
			this.close();
		}
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*string*/ PickProviderScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
		if(fromControl == PickProviderScreen.ProviderListID)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
