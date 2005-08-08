/* NeedLogonIDControl.js */

/******************************************************************************/
/******************************************************************************/

NeedLogonIDControl.ControlID = "Setup001_NeedLogonIDControl";

NeedLogonIDControl.HaveLogonID = "Setup001_NeedLogonIDControl_HaveLogon";

/******************************************************************************/

NeedLogonIDControl.newInstance = function()
{
	var containerControl = new NeedLogonIDControl(NeedLogonIDControl.ControlID, 0, 0);

	containerControl.newControl(new ButtonControl(NeedLogonIDControl.HaveLogonID, SetupScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, SetupScreen.ScreenID));

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
