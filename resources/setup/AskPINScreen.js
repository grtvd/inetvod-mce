/* AskPINScreen.js */

/******************************************************************************/
/******************************************************************************/

AskPINScreen.ScreenID = "Startup004";

AskPINScreen.PINID = "Startup004_PIN";
AskPINScreen.ContinueID = "Startup004_Continue";

/******************************************************************************/

AskPINScreen.newInstance = function()
{
	var oScreen = new AskPINScreen();
	MainApp.getThe().openScreen(oScreen);
	oScreen.focusControl(AskPINScreen.ContinueID);	//TODO: remove after focus working on EditControl
	return oScreen;
}

/******************************************************************************/

AskPINScreen.prototype = new Screen();
AskPINScreen.prototype.constructor = AskPINScreen;

/******************************************************************************/

function AskPINScreen()
{
	this.ScreenID = AskPINScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 200, 150);
	this.fContainerControl.newControl(new EditControl(AskPINScreen.PINID, this.ScreenID));
	this.fContainerControl.newControl(new ButtonControl(AskPINScreen.ContinueID, this.ScreenID));
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

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
