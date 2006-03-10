/* ConfirmChargeControl.js */

/******************************************************************************/
/******************************************************************************/

ConfirmChargeControl.ControlID = "Rent001_ConfirmChargeControl";

ConfirmChargeControl.ChargeTextID = "Rent001_ConfirmChargeControl_ChargeText";
ConfirmChargeControl.ChargeAccountID = "Rent001_ConfirmChargeControl_ChargeAccount";
ConfirmChargeControl.DontChargeAccountID = "Rent001_ConfirmChargeControl_DontChargeAccount";

/******************************************************************************/

ConfirmChargeControl.newInstance = function()
{
	var containerControl = new ConfirmChargeControl(ConfirmChargeControl.ControlID, 0, 0);
	containerControl.onNavigate = ConfirmChargeControl.onNavigate;

	containerControl.newControl(new TextControl(ConfirmChargeControl.ChargeTextID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(ConfirmChargeControl.ChargeAccountID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(ConfirmChargeControl.DontChargeAccountID, RentScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

ConfirmChargeControl.prototype = new ContainerControl();
ConfirmChargeControl.prototype.constructor = ConfirmChargeControl;

/******************************************************************************/

function ConfirmChargeControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ ConfirmChargeControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oShowCost = oRentData.ShowCost;
	var oTextControl;
	var tempStr;

	oTextControl = this.getControl(ConfirmChargeControl.ChargeTextID);
	tempStr = "This show has a cost of ";
	tempStr += oShowCost.CostDisplay;
	tempStr += ".  This cost will be charged to your account at ";
	tempStr += oRentData.getProviderName();
	tempStr += ".";
	oTextControl.setText(tempStr);

	return true;
}

/******************************************************************************/

/*string*/ ConfirmChargeControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return ConfirmChargeControl.DontChargeAccountID;

	if((fromControl == ConfirmChargeControl.ChargeAccountID)
		|| (fromControl == ConfirmChargeControl.DontChargeAccountID))
	{
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
