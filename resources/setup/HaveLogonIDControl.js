/* HaveLogonIDControl.js */

/******************************************************************************/
/******************************************************************************/

var HaveLogonID_ControlID = "Setup001_HaveLogonIDControl";

var HaveLogonIDControl_LogonID = "Setup001_HaveLogonIDControl_Logon";
var HaveLogonIDControl_PINID = "Setup001_HaveLogonIDControl_PIN";
var HaveLogonIDControl_RememberPINID = "Setup001_HaveLogonIDControl_RememberPIN";
var HaveLogonIDControl_ContinueID = "Setup001_HaveLogonIDControl_Continue";

/******************************************************************************/

function HaveLogonIDControl_newInstance()
{
	var containerControl = new HaveLogonIDControl(HaveLogonID_ControlID, 0, 0);
	var control;

	containerControl.newControl(new EditControl(HaveLogonIDControl_LogonID, SetupScreen_ScreenID));
	containerControl.newControl(new EditControl(HaveLogonIDControl_PINID, SetupScreen_ScreenID));

	control = new CheckControl(HaveLogonIDControl_RememberPINID, SetupScreen_ScreenID);
	control.setChecked(true);
	containerControl.newControl(control);

	containerControl.newControl(new ButtonControl(HaveLogonIDControl_ContinueID, SetupScreen_ScreenID));

	return containerControl
}

/******************************************************************************/

HaveLogonIDControl.prototype = new ContainerControl();
HaveLogonIDControl.prototype.constructor = AskSignedUpControl;

/******************************************************************************/

function HaveLogonIDControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ HaveLogonIDControl.prototype.unloadData = function(/*object*/ oData)
{
	var data;
	var oSetupData = oData;

	data = this.getControl(HaveLogonIDControl_LogonID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("Logon ID must be entered.");
		return false;
	}
	oSetupData.UserID = data;

	data = this.getControl(HaveLogonIDControl_PINID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("PIN must be entered.");
		return false;
	}
	oSetupData.UserPassword = data;

	oSetupData.RememberPassword = this.getControl(HaveLogonIDControl_RememberPINID).getChecked();

	return true;
}

/******************************************************************************/
/******************************************************************************/
