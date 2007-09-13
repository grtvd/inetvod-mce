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
	this.ScreenTitle = "prefs";
	this.ScreenTitleImage = "titlePrefs.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 122, 182);
	this.fContainerControl.onNavigate = PreferencesScreen.onNavigate;

	oControl = new TextControl(PreferencesScreen.AccessAdultValueID, this.ScreenID);
	this.newControl(oControl);

	oControl = new ButtonControl(PreferencesScreen.AccessAdultButtonID, this.ScreenID);
	this.newControl(oControl);

	this.newControl(new ButtonControl(PreferencesScreen.ResetFactoryButtonID, this.ScreenID));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));

	this.updateAdultAccess();
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

/*boolean*/ PreferencesScreen.prototype.updateAdultAccess = function()
{
	var oSession = MainApp.getThe().getSession();

	var oControl = this.getControl(PreferencesScreen.AccessAdultValueID);
	oControl.setText(oSession.CanAccessAdult ? "Enabled" : "Disabled");

	oControl = this.getControl(PreferencesScreen.AccessAdultButtonID);
	oControl.setEnabled(!oSession.CanAccessAdult && (oSession.IncludeAdult == ina_PromptPassword));
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
