/* PreferencesScreen.js */

/******************************************************************************/
/******************************************************************************/

PreferencesScreen.ScreenID = "Prefs001";
PreferencesScreen.AccessAdultValueID = "Prefs001_AccessAdultValue";
PreferencesScreen.AccessAdultButtonID = "Prefs001_AccessAdultButton";
PreferencesScreen.ResetFactoryButtonID = "Prefs001_ResetFactoryButton";

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
	this.fContainerControl.onNavigate = PreferencesScreen.onNavigate;

	oControl = new TextControl(PreferencesScreen.AccessAdultValueID, this.ScreenID);
	oControl.setText(oSession.CanAccessAdult ? "Enabled" : "Disabled");
	this.newControl(oControl);

	oControl = new ButtonControl(PreferencesScreen.AccessAdultButtonID, this.ScreenID);
	this.newControl(oControl);
	oControl.setEnabled(!oSession.CanAccessAdult && (oSession.IncludeAdult == ina_PromptPassword));

	this.newControl(new ButtonControl(PreferencesScreen.ResetFactoryButtonID, this.ScreenID));

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

	if(controlID == PreferencesScreen.ResetFactoryButtonID)
	{
		MainApp.getThe().getSession().resetDataSettings();
		MainApp.getThe().reset();
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

/*string*/ PreferencesScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == PreferencesScreen.AccessAdultButtonID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
