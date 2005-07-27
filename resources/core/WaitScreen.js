/* WaitScreen.js */

/******************************************************************************/
/******************************************************************************/

var WaitScreen_ScreenID = "Wait001";

/******************************************************************************/

function WaitScreen_newInstance()
{
	return new WaitScreen();
}

/******************************************************************************/

function WaitScreen()
{
	this.ScreenID = WaitScreen_ScreenID;
	this.fUIObj = document.getElementById(this.ScreenID);
	if(this.fUIObj == null)
		throw "WaitScreen::ctor: Can't find UI object, ID(" + this.ScreenID + ")";

	this.fContainerControl = new ContainerControl(this.ScreenID);
	//this.fContainerControl.newControl(new TextControl(this.ScreenID + '_Text'));

	this.fContainerControl.show(true);
}

/******************************************************************************/

/*ContainerControl*/ WaitScreen.prototype.getContainerControl = function()
{
	return this.fContainerControl;
}

/******************************************************************************/
/******************************************************************************/
