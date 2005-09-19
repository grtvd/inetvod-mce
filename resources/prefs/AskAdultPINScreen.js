/* AskAdultPINScreen.js */

/******************************************************************************/
/******************************************************************************/

AskAdultPINScreen.ScreenID = "Prefs002";

AskAdultPINScreen.PINID = "Prefs002_PIN";

/******************************************************************************/

AskAdultPINScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new AskAdultPINScreen());
}

/******************************************************************************/

AskAdultPINScreen.prototype = new Screen();
AskAdultPINScreen.prototype.constructor = AskAdultPINScreen;

/******************************************************************************/

function AskAdultPINScreen()
{
	var oControl;

	this.ScreenID = AskAdultPINScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 200, 200);
	oControl = new EditControl(AskAdultPINScreen.PINID, this.ScreenID, 6);
	this.newControl(oControl);
	oControl.Type = ect_Numeric;
	oControl.MaxLength = 6;
	oControl.AutoButton = true;

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ AskAdultPINScreen.prototype.onButton = function(/*string*/ controlID)
{
	var data;

	data = this.getControl(AskAdultPINScreen.PINID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("PIN must be entered.");
		return;
	}

	var oScreen = MainApp.getThe().getScreen(PreferencesScreen.ScreenID);
	if(oScreen.doPIN(data))
		this.close();
}

/******************************************************************************/
/******************************************************************************/
