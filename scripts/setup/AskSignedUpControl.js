/* AskSignedUpControl.js */

/******************************************************************************/
/******************************************************************************/

AskSignedUpControl.ControlID = "Setup001_AskSignedUpControl";

AskSignedUpControl.AlreadyRegisteredID = "Setup001_AskSignedUpControl_AlreadyRegistered";
AskSignedUpControl.NotRegisteredID = "Setup001_AskSignedUpControl_NotRegistered";

/******************************************************************************/

AskSignedUpControl.newInstance = function()
{
	var containerControl = new AskSignedUpControl(AskSignedUpControl.ControlID, 0, 0);
	containerControl.onNavigate = AskSignedUpControl.onNavigate;

	containerControl.newControl(new ButtonControl(AskSignedUpControl.AlreadyRegisteredID, SetupScreen.ScreenID));
	containerControl.newControl(new ButtonControl(AskSignedUpControl.NotRegisteredID, SetupScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, SetupScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

AskSignedUpControl.prototype = new ContainerControl();
AskSignedUpControl.prototype.constructor = AskSignedUpControl;

/******************************************************************************/

function AskSignedUpControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*string*/ AskSignedUpControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return AskSignedUpControl.NotRegisteredID;

	if((AskSignedUpControl.AlreadyRegisteredID) || (fromControl == AskSignedUpControl.NotRegisteredID))
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
