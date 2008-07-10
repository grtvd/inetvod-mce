/* StartScreen.js */

/******************************************************************************/
/******************************************************************************/

StartScreen.ScreenID = "StartUp001";
StartScreen.StartID = "StartUp001_Start";

/******************************************************************************/

StartScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new StartScreen());
}

/******************************************************************************/

StartScreen.prototype = new Screen();
StartScreen.prototype.constructor = StartScreen;

/******************************************************************************/

function StartScreen()
{
	this.ScreenID = StartScreen.ScreenID;
	this.ScreenTitle = "welcome";
	this.ScreenTitleImage = "titleWelcome.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 130, 200);
	this.fContainerControl.onNavigate = StartScreen.onNavigate;

	this.newControl(new ButtonControl(StartScreen.StartID, this.ScreenID));
	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ StartScreen.prototype.onButton = function(/*string*/ controlID)
{
	this.close();
	StartupInitialCheck();
}

/******************************************************************************/

/*string*/ StartScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == StartScreen.StartID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
