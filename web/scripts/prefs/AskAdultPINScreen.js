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
	this.ScreenTitle = "enter pin";
	this.ScreenTitleImage = "titleEnterpin.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 200, 200);
	this.fContainerControl.onNavigate = AskAdultPINScreen.onNavigate;

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

	var oSession = MainApp.getThe().getSession();

	this.Callback = AskAdultPINScreen.prototype.afterEnableAdultAccess;
	oSession.enableAdultAccess(this, data);
}

/******************************************************************************/

/*void*/ AskAdultPINScreen.prototype.afterEnableAdultAccess = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		MainApp.getThe().getScreen(PreferencesScreen.ScreenID).updateAdultAccess();
		this.close();
	}
}

/******************************************************************************/

/*string*/ AskAdultPINScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == AskAdultPINScreen.PINID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
