/* NeedLogonIDControl.js */

/******************************************************************************/
/******************************************************************************/

NeedLogonIDControl.ControlID = "Setup001_NeedLogonIDControl";

NeedLogonIDControl.HaveLogonID = "Setup001_NeedLogonIDControl_HaveLogon";

/******************************************************************************/

NeedLogonIDControl.newInstance = function()
{
	var containerControl = new NeedLogonIDControl(NeedLogonIDControl.ControlID, 0, 0);
	containerControl.onNavigate = NeedLogonIDControl.onNavigate;

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

/*string*/ NeedLogonIDControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return NeedLogonIDControl.HaveLogonID;

	if(fromControl == NeedLogonIDControl.HaveLogonID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
