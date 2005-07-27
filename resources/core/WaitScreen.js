/* WaitScreen.js */

/******************************************************************************/
/******************************************************************************/

WaitScreen.ScreenID = "Wait001";

/******************************************************************************/

WaitScreen.newInstance = function()
{
	return new WaitScreen();
}

/******************************************************************************/

function WaitScreen()
{
	this.ScreenID = WaitScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 0, 0);

	// adjust position
	var mainTable = document.getElementById("MainTable");
	this.fContainerControl.moveTo(mainTable.offsetLeft, mainTable.offsetTop);

	this.fContainerControl.show(true);
	forceRedraw();
}

/******************************************************************************/

/*void*/ WaitScreen.prototype.close = function()
{
	this.fContainerControl.show(false);
}

/******************************************************************************/
/******************************************************************************/
