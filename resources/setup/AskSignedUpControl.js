/* AskSignedUpControl.js */

/******************************************************************************/
/******************************************************************************/

var AskSignedUp_ControlID = "Setup001_AskSignedUpControl";

var AskSignedUpControl_AlreadyRegisteredID = "Setup001_AskSignedUpControl_AlreadyRegistered";
var AskSignedUpControl_NotRegisteredID = "Setup001_AskSignedUpControl_NotRegistered";

/******************************************************************************/

function AskSignedUpControl_newInstance()
{
	var containerControl = new AskSignedUpControl(AskSignedUp_ControlID, 0, 0);

	containerControl.newControl(new ButtonControl(AskSignedUpControl_AlreadyRegisteredID, SetupScreen_ScreenID));
	containerControl.newControl(new ButtonControl(AskSignedUpControl_NotRegisteredID, SetupScreen_ScreenID));

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
/******************************************************************************/
