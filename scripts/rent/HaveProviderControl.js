/* HaveProviderControl.js */

/******************************************************************************/
/******************************************************************************/

HaveProviderControl.ControlID = "Rent001_HaveProviderControl";

HaveProviderControl.DescriptionID = "Rent001_HaveProviderControl_Description";
HaveProviderControl.UserID = "Rent001_HaveProviderControl_UserID";
HaveProviderControl.PasswordID = "Rent001_HaveProviderControl_Password";
HaveProviderControl.ContinueID = "Rent001_HaveProviderControl_Continue";

/******************************************************************************/

HaveProviderControl.newInstance = function()
{
	var containerControl = new HaveProviderControl(HaveProviderControl.ControlID, 0, 0);
	containerControl.onNavigate = HaveProviderControl.onNavigate;

	var oControl;

	containerControl.newControl(new TextControl(HaveProviderControl.DescriptionID, RentScreen.ScreenID));

	oControl = new EditControl(HaveProviderControl.UserID, RentScreen.ScreenID, 9)
	containerControl.newControl(oControl);
	oControl.Type = ect_AlphaNumeric;
	oControl.MaxLength = 64;
	oControl = new EditControl(HaveProviderControl.PasswordID, RentScreen.ScreenID, 6);
	oControl.Type = ect_AlphaNumeric;
	oControl.MaxLength = 16;
	containerControl.newControl(oControl);

	containerControl.newControl(new ButtonControl(HaveProviderControl.ContinueID, RentScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

HaveProviderControl.prototype = new ContainerControl();
HaveProviderControl.prototype.constructor = HaveProviderControl;

/******************************************************************************/

function HaveProviderControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ HaveProviderControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(HaveProviderControl.DescriptionID);
	tempStr = "Please enter your logon information for ";
	tempStr += oRentData.getProviderName();
	tempStr += ":";
	oControl.setText(tempStr);

	return true;
}

/******************************************************************************/

/*boolean*/ HaveProviderControl.prototype.unloadData = function(/*object*/ oData)
{
	var data;
	var oRentData = oData;

	data = this.getControl(HaveProviderControl.UserID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("User ID must be entered.");
		return false;
	}
	oRentData.UserID = data;

	data = this.getControl(HaveProviderControl.PasswordID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("Password must be entered.");
		return false;
	}
	oRentData.Password = data;

	return true;
}

/******************************************************************************/

/*string*/ HaveProviderControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return HaveProviderControl.ContinueID;

	if((fromControl == HaveProviderControl.UserID)
		|| (fromControl == HaveProviderControl.PasswordID)
		|| (fromControl == HaveProviderControl.ContinueID))
	{
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
