/* WaitScreen.js */

/******************************************************************************/
/******************************************************************************/

WaitScreen.ScreenID = "Wait001";

var gWaitScreen = null;
var gWaitScreenCount = 0;

/******************************************************************************/

WaitScreen.newInstance = function()
{
	if(gWaitScreenCount == 0)
		gWaitScreen = new WaitScreen();
	gWaitScreenCount++;
	return gWaitScreen;
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

function WaitScreen_close()
{
	if(gWaitScreen)
		gWaitScreen.close();
}

/******************************************************************************/

/*void*/ WaitScreen.prototype.close = function()
{
	if(gWaitScreenCount > 0)
		gWaitScreenCount--;
	if(gWaitScreenCount == 0)
	{
		this.fContainerControl.show(false);
		gWaitScreen = null;
	}
}

/******************************************************************************/
/******************************************************************************/
