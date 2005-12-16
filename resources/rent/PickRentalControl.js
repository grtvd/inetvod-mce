/* PickRentalControl.js */

/******************************************************************************/
/******************************************************************************/

PickRentalControl.ControlID = "Rent001_PickRentalControl";

PickRentalControl.AvailTextID = "Rent001_PickRentalControl_AvailText";
PickRentalControl.ProviderListID = "Rent001_PickRentalControl_ProviderList";

/******************************************************************************/

PickRentalControl.newInstance = function()
{
	var containerControl = new PickRentalControl(PickRentalControl.ControlID, 0, 0);
	containerControl.onNavigate = PickRentalControl.onNavigate;

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Provider", 350));
	oRowItemList.push(new ListControlRowItem("Rental", 230));
	oRowItemList.push(new ListControlRowItem("Price", 100));

	containerControl.newControl(new TextControl(PickRentalControl.AvailTextID, RentScreen.ScreenID));
	containerControl.newControl(new ShowProviderListControl(PickRentalControl.ProviderListID,
		RentScreen.ScreenID, 3, oRowItemList, null));

	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, RentScreen.ScreenID));

	return containerControl;
}

/******************************************************************************/

PickRentalControl.prototype = new ContainerControl();
PickRentalControl.prototype.constructor = PickRentalControl;

/******************************************************************************/

function PickRentalControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ PickRentalControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(PickRentalControl.AvailTextID);
	tempStr = "'" + oRentData.ShowDetail.Name + "' is available through multiple rentals.";
	oControl.setText(tempStr);

	oControl = this.getControl(PickRentalControl.ProviderListID);
	oControl.setShowProviderList(oRentData.ShowDetail.ShowProviderList, true);

	return true;
}

/******************************************************************************/

/*boolean*/ PickRentalControl.prototype.unloadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var showProviderItem;

	showProviderItem = this.getControl(PickRentalControl.ProviderListID).getFocusedItemValue();
	oRentData.setRental(showProviderItem.Provider, showProviderItem.ShowCost);

	return true;
}

/******************************************************************************/

/*string*/ PickRentalControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
		if(fromControl == PickRentalControl.ProviderListID)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
