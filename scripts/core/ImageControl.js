/* ImageControl */

/******************************************************************************/
/******************************************************************************/

ImageControl.prototype = new Control();
ImageControl.prototype.constructor = ImageControl;

/******************************************************************************/

function ImageControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ImageControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fFocused = false;

	this.setFocus(false);
	this.show(true);
}

/******************************************************************************/

/*void*/ ImageControl.prototype.setSource = function(/*string*/ src)
{
	this.fUIObj.src = src;
}

/******************************************************************************/

/*boolean*/ ImageControl.prototype.canFocus = function() { return false; }

/******************************************************************************/
/******************************************************************************/
