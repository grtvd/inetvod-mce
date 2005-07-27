/* SetupScreen.js */

/******************************************************************************/
/******************************************************************************/

SetupScreen.ScreenID = "Setup001";

/* SetupStep */
var ss_AskSignupStep = 0;
var ss_NeedLogonIDStep = 1;
var ss_HaveLogonIDStep =2;

/******************************************************************************/

SetupScreen.newInstance = function()
{
	MainApp.getThe().openScreen(new SetupScreen());
}

/******************************************************************************/

SetupScreen.prototype = new Screen();
SetupScreen.prototype.constructor = SetupScreen;

/******************************************************************************/

function SetupScreen()
{
	this.ScreenID = SetupScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);

	this.fStepControlID = AskSignedUpControl.ControlID;
	this.fSetupData = new SetupData();
	this.fCurStep = ss_AskSignupStep;
	this.openStep(ss_AskSignupStep);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.openStep = function(/*int*/ step)
{
	var oContainerControl;

	switch(step)
	{
		case ss_AskSignupStep:
		default:
			oContainerControl = AskSignedUpControl.newInstance();
			break;
		case ss_NeedLogonIDStep:
			oContainerControl = NeedLogonIDControl.newInstance();
			break;
		case ss_HaveLogonIDStep:
			oContainerControl = HaveLogonIDControl.newInstance();
			break;
	}

	oContainerControl.show(true);
	oContainerControl.setFocus(true);
	this.fContainerControl.newControl(oContainerControl);
	this.fStepControlID = oContainerControl.ControlID;
	this.fCurStep = step;
	oContainerControl.loadData(this.fSetupData);
}

/******************************************************************************/

/*boolean*/ SetupScreen.prototype.closeStep = function(/*boolean*/ doUnload)
{
	var oContainerControl = this.fContainerControl.getControl(this.fStepControlID);

	if(doUnload)
	{
		if(!oContainerControl.unloadData(this.fSetupData))
			return false;
	}

	oContainerControl.show(false);
	this.fContainerControl.deleteControl(this.fStepControlID);
	return true;
}

/******************************************************************************/

/*boolean*/ SetupScreen.prototype.key = function(/*int*/ key)
{
	if(key == ek_Back)
	{
		if(this.fCurStep == ss_NeedLogonIDStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskSignupStep);

			return true;
		}
		else if(this.fCurStep == ss_HaveLogonIDStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskSignupStep);

			return true;
		}
	}

	return Screen.prototype.key.call(this, key);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(this.fCurStep == ss_AskSignupStep)
	{
		if(controlID == AskSignedUpControl.NotRegisteredID)
		{
			if(this.closeStep(true))
				this.openStep(ss_NeedLogonIDStep);
			return;
		}
		else if(controlID == AskSignedUpControl.AlreadyRegisteredID)
		{
			if(this.canPingServer())
				if(this.closeStep(true))
					this.openStep(ss_HaveLogonIDStep);
			return;
		}
	}
	else if(this.fCurStep == ss_NeedLogonIDStep)
	{
		if(controlID == NeedLogonIDControl.HaveLogonID)
		{
			if(this.canPingServer())
				if(this.closeStep(true))
					this.openStep(ss_HaveLogonIDStep);
			return;
		}
	}
	else if(this.fCurStep == ss_HaveLogonIDStep)
	{
		if(controlID == HaveLogonIDControl.ContinueID)
		{
			this.doSetupSignon();
			return;
		}
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*bool*/ SetupScreen.prototype.canPingServer = function()
{
	var oSession = MainApp.getThe().getSession();

	if(!oSession.CanPingServer)
		if(!oSession.pingServer())
			return false;

	return true;
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.doSetupSignon = function()
{
	var oContainerControl = this.fContainerControl.getControl(this.fStepControlID);

	if(oContainerControl.unloadData(this.fSetupData))
	{
		if(StartupDoSetupSignon(this.fSetupData.UserID, this.fSetupData.UserPassword,
			this.fSetupData.RememberPassword))
		{
			this.close();
		}
	}
}

/******************************************************************************/
/******************************************************************************/
