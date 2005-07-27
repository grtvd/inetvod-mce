/* NeedLogonIDControl.js */

/******************************************************************************/
/******************************************************************************/

var NeedLogonID_ControlID = "Setup001_NeedLogonIDControl";

var NeedLogonIDControl_HaveLogonID = "Setup001_NeedLogonIDControl_HaveLogon";

/******************************************************************************/

function NeedLogonIDControl_newInstance()
{
	var containerControl = new NeedLogonIDControl(NeedLogonID_ControlID, 0, 0);

	containerControl.newControl(new ButtonControl(NeedLogonIDControl_HaveLogonID, SetupScreen_ScreenID));

	return containerControl;
}

/******************************************************************************/

NeedLogonIDControl.prototype = new ContainerControl();
NeedLogonIDControl.prototype.constructor = NeedLogonIDControl;

/******************************************************************************/

function NeedLogonIDControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/
/******************************************************************************/
