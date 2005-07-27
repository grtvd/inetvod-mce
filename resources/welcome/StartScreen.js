/* StartScreen.js */

/******************************************************************************/
/******************************************************************************/

var StartScreen_ScreenID = "StartUp001";
var StartScreen_StartID = "StartUp001_Start";

/******************************************************************************/

function StartScreen_newInstance()
{
	GetTheMainApp().openScreen(new StartScreen());
}

/******************************************************************************/

StartScreen.prototype = new Screen();
StartScreen.prototype.constructor = StartScreen;

/******************************************************************************/

function StartScreen()
{
	this.ScreenID = StartScreen_ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);
	this.fContainerControl.newControl(new ButtonControl(StartScreen_StartID, this.ScreenID));
}

/******************************************************************************/

/*void*/ StartScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(StartupInitialCheck())
		this.close();
}

/******************************************************************************/
/******************************************************************************/
