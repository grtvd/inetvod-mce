/* Control */

/******************************************************************************/
/******************************************************************************/

function Control()
{
	this.ControlID = null;
	this.ScreenID = null;
	this.fUIObj = null;
	this.fFocused = false;
}

/******************************************************************************/

/*Screen*/ Control.prototype.getScreen = function()
{
	return GetTheMainApp().getScreen(this.ScreenID);
}

/******************************************************************************/

/*boolean*/ Control.prototype.canFocus = function() { return true; }
/*boolean*/ Control.prototype.hasFocus = function() { return this.fFocused; }
/*void*/ Control.prototype.setFocus = function(/*boolean*/ set)
{
	checkClassName(this.fUIObj, set ? 'hilite' : 'normal');
	this.fFocused = set;
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

/*void*/ Control.prototype.mouseClick = function(/*string*/ controlID)
{
}

/******************************************************************************/

/*void*/ Control.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
}

/******************************************************************************/
/******************************************************************************/
