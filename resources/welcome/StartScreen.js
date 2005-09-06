/* StartScreen.js */

/******************************************************************************/
/******************************************************************************/

StartScreen.ScreenID = "StartUp001";
StartScreen.StartID = "StartUp001_Start";

/******************************************************************************/

StartScreen.newInstance = function()
{
	MainApp.getThe().openScreen(new StartScreen());
}

/******************************************************************************/

StartScreen.prototype = new Screen();
StartScreen.prototype.constructor = StartScreen;

/******************************************************************************/

function StartScreen()
{
	this.ScreenID = StartScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 130, 200);
	this.fContainerControl.newControl(new ButtonControl(StartScreen.StartID, this.ScreenID));
	if(ViewPortControl.isOpen())
		this.fContainerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ StartScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(StartupInitialCheck())
		this.close();
}

/******************************************************************************/
/******************************************************************************/
