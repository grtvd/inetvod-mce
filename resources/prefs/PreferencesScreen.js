/* PreferencesScreen.js */

/******************************************************************************/
/******************************************************************************/

PreferencesScreen.ScreenID = "Prefs001";
PreferencesScreen.AccessAdultValueID = "Prefs001_AccessAdultValue";
PreferencesScreen.AccessAdultButtonID = "Prefs001_AccessAdultButton";

/******************************************************************************/

PreferencesScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new PreferencesScreen());
}

/******************************************************************************/

PreferencesScreen.prototype = new Screen();
PreferencesScreen.prototype.constructor = PreferencesScreen;

/******************************************************************************/

function PreferencesScreen()
{
	var oSession = MainApp.getThe().getSession();
	var oControl;

	this.ScreenID = PreferencesScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 122, 182);

	oControl = new TextControl(PreferencesScreen.AccessAdultValueID, this.ScreenID);
	oControl.setText(oSession.CanAccessAdult ? "Enabled" : "Disabled");
	this.newControl(oControl);

	oControl = new ButtonControl(PreferencesScreen.AccessAdultButtonID, this.ScreenID);
	this.newControl(oControl);
	oControl.setEnabled(!oSession.CanAccessAdult && (oSession.IncludeAdult == ina_PromptPassword));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ PreferencesScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(controlID == PreferencesScreen.AccessAdultButtonID)
	{
		AskAdultPINScreen.newInstance();
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*boolean*/ PreferencesScreen.prototype.doPIN = function(/*string*/ adultPassword)
{
	var oSession = MainApp.getThe().getSession();

	if(oSession.enableAdultAccess(adultPassword) == sc_Success)
	{
		//this.fContainerControl.setFocus(false);

		var oControl = this.getControl(PreferencesScreen.AccessAdultValueID);
		oControl.setText("Enabled");

		oControl = this.getControl(PreferencesScreen.AccessAdultButtonID);
		oControl.setEnabled(false);

		return true;
	}

	return false;
}

/******************************************************************************/
/******************************************************************************/
