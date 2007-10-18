/* Control */

/******************************************************************************/
/******************************************************************************/

function Control()
{
	this.ControlID = null;
	this.ScreenID = null;
	this.fUIObj = null;
	this.fEnabled = true;
	this.fFocused = false;
}

/******************************************************************************/

/*Screen*/ Control.prototype.getScreen = function()
{
	return MainApp.getThe().getScreen(this.ScreenID);
}

/******************************************************************************/

/*void*/ Control.prototype.show = function(show)
{
	setStyleDisplay(this.fUIObj, show);
}

/******************************************************************************/

/*boolean*/ Control.prototype.isEnabled = function() { return this.fEnabled; }

/******************************************************************************/

/*void*/ Control.prototype.setEnabled = function(/*boolean*/ enable)
{
	this.fEnabled = enable;
}

/******************************************************************************/

/*boolean*/ Control.prototype.canFocus = function() { return this.fEnabled; }

/******************************************************************************/

/*boolean*/ Control.prototype.hasFocus = function() { return this.fFocused; }

/******************************************************************************/

/*void*/ Control.prototype.setFocus = function(/*boolean*/ set)
{
}

/******************************************************************************/

/*boolean*/ Control.prototype.hasControl = function(/*string*/ controlID)
{
	return this.ControlID == controlID;
}

/******************************************************************************/

/*boolean*/ Control.prototype.key = function(/*int*/ key)
{
	return false;
}

/******************************************************************************/

/*void*/ Control.prototype.idle = function()
{
}

/******************************************************************************/

/*void*/ Control.prototype.mouseClick = function(/*string*/ controlID)
{
}

/******************************************************************************/

/*void*/ Control.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
}

/******************************************************************************/
/******************************************************************************/
