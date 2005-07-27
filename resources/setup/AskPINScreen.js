/* AskPINScreen.js */

/******************************************************************************/
/******************************************************************************/

var AskPINScreen_ScreenID = "Startup004";

var AskPINScreen_PINID = "AskPINScreen_PIN";
var AskPINScreen_ContinueID = "AskPINScreen_Continue";

/******************************************************************************/

function AskPINScreen_newInstance()
{
	GetTheMainApp().openScreen(new AskPINScreen());
}

/******************************************************************************/

AskPINScreen.prototype = new Screen();
AskPINScreen.prototype.constructor = AskPINScreen;

/******************************************************************************/

function AskPINScreen()
{
	this.ScreenID = AskPINScreen_ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 200, 150);
	this.fContainerControl.newControl(new EditControl(AskPINScreen_PINID, this.ScreenID));
	this.fContainerControl.newControl(new ButtonControl(AskPINScreen_ContinueID, this.ScreenID));
}

/******************************************************************************/

/*void*/ AskPINScreen.prototype.onButton = function(/*string*/ controlID)
{
	var data;

	data = this.fContainerControl.getControl(AskPINScreen_PINID).getText();
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
