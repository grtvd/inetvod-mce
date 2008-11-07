/* WaitScreen.js */

/******************************************************************************/
/******************************************************************************/

WaitScreen.ScreenID = "Wait001";

var gWaitScreen = null;
var gWaitScreenCount = 0;

/******************************************************************************/

WaitScreen.newInstance = function()
{
	if(!document.getElementById(WaitScreen.ScreenID))	//is WaitScreen available
		return null;
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

	setTimeout('WaitScreen_show()', 500);	//show after 1 second
}

/******************************************************************************/

/*boolean*/ function WaitScreen_isOpen()
{
	return (gWaitScreen != null);
}

/******************************************************************************/

/*void*/ function WaitScreen_show()
{
	if(gWaitScreen)
		gWaitScreen.fContainerControl.show(true);
}

/******************************************************************************/

/*void*/ function WaitScreen_close()
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
