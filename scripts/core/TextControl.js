/* TextControl */

/******************************************************************************/
/******************************************************************************/

TextControl.prototype = new Control();
TextControl.prototype.constructor = TextControl;

/******************************************************************************/

function TextControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "TextControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fFocused = false;

	this.setFocus(false);
	this.show(true);
}

/******************************************************************************/

/*void*/ TextControl.prototype.setText = function(/*string*/ text)
{
	this.fUIObj.innerHTML = (testStrHasLen(text) ? text : "");
}

/******************************************************************************/

/*boolean*/ TextControl.prototype.canFocus = function() { return false; }

/******************************************************************************/
/******************************************************************************/
