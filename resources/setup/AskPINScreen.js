/* AskPINScreen.js */

/******************************************************************************/
/******************************************************************************/

AskPINScreen.ScreenID = "Startup004";

AskPINScreen.PINID = "Startup004_PIN";
AskPINScreen.ContinueID = "Startup004_Continue";

/******************************************************************************/

AskPINScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new AskPINScreen());
}

/******************************************************************************/

AskPINScreen.prototype = new Screen();
AskPINScreen.prototype.constructor = AskPINScreen;

/******************************************************************************/

function AskPINScreen()
{
	var oControl;

	this.ScreenID = AskPINScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 200, 200);
	oControl = new EditControl(AskPINScreen.PINID, this.ScreenID, 6);
	this.fContainerControl.newControl(oControl);
	oControl.MaxLength = 6;
	oControl.AutoButton = true;
	this.fContainerControl.newControl(new ButtonControl(AskPINScreen.ContinueID, this.ScreenID));

	if(ViewPortControl.isOpen())
		this.fContainerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*boolean*/ AskPINScreen.prototype.key = function(/*int*/ key)
{
	var handled = Screen.prototype.key.call(this, key);

	if((key == ek_Back) || (key == ek_Backspace))
	{
		if(!this.isOpen())
			StartScreen.newInstance();
	}

	return handled;
}

/******************************************************************************/

/*void*/ AskPINScreen.prototype.onButton = function(/*string*/ controlID)
{
	var data;

	data = this.fContainerControl.getControl(AskPINScreen.PINID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("PIN must be entered.");
		return;
	}

	if(StartupDoSignonPassword(data))
	{
		this.close();
		return;
	}

	//Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
