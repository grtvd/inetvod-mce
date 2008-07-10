/* Screen */

/******************************************************************************/
/******************************************************************************/

function Screen()
{
	this.ScreenID = null;
	this.ScreenTitle = "";
	this.ScreenTitleImage = "";
	this.fContainerControl = null;
}

/******************************************************************************/

/*booealn*/ Screen.prototype.isOpen = function()
{
	return (MainApp.getThe().findScreen(this.ScreenID) != null);
}

/******************************************************************************/

/*void*/ Screen.prototype.close = function()
{
	MainApp.getThe().closeScreen(this.ScreenID);
}

/******************************************************************************/

/*void*/ Screen.prototype.newControl = function(oControl)
{
	this.fContainerControl.newControl(oControl);
}

/******************************************************************************/

/*Control*/ Screen.prototype.findControl = function(/*string*/ controlID)
{
	if(this.fContainerControl != null)
		return this.fContainerControl.findControl(controlID);
	return null;
}

/******************************************************************************/

/*Control*/ Screen.prototype.getControl = function(/*string*/ controlID)
{
	return this.fContainerControl.getControl(controlID);
}

/******************************************************************************/

/*Control*/ Screen.prototype.deleteControl = function(/*string*/ controlID)
{
	return this.fContainerControl.deleteControl(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.moveTo = function(/*int*/ left, /*int*/ top)
{
	this.fContainerControl.moveTo(left, top);
}

/******************************************************************************/

/*void*/ Screen.prototype.show = function(show)
{
	this.fContainerControl.show(show);
}

/******************************************************************************/

/*void*/ Screen.prototype.setFocus = function(/*boolean*/ set)
{
	this.fContainerControl.setFocus(set);
}

/******************************************************************************/

/*void*/ Screen.prototype.focusControl = function(/*string*/ controlID, /*boolean*/ set)
{
	this.fContainerControl.focusControl(controlID, set);
}

/******************************************************************************/

/*boolean*/ Screen.prototype.key = function(/*int*/ keyCode)
{
	if(this.fContainerControl.key(keyCode))
		return true;

	if((keyCode == ek_Back) || (keyCode == ek_Backspace))
	{
		this.close();
		return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ Screen.prototype.idle = function()
{
	this.fContainerControl.idle();
}

/******************************************************************************/

/*void*/ Screen.prototype.mouseClick = function(/*string*/ controlID)
{
	this.fContainerControl.mouseClick(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
	this.fContainerControl.mouseMove(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.focusEvent = function(/*string*/ controlID)
{
	this.fContainerControl.focusEvent(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.blurEvent = function(/*string*/ controlID)
{
	this.fContainerControl.blurEvent(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.onButton = function(/*string*/ controlID)
{
	// default action is to proceed to the next field
	this.key(ek_DownButton);
}

/******************************************************************************/

/*void*/ Screen.prototype.onFocus = function(/*string*/ controlID)
{
}

/******************************************************************************/

/*void*/ Screen.prototype.onListItem = function(/*string*/ controlID)
{
}

/******************************************************************************/
/******************************************************************************/
