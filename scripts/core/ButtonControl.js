/* ButtonControl */

/******************************************************************************/
/******************************************************************************/

ButtonControl.prototype = new Control();
ButtonControl.prototype.constructor = ButtonControl;

/******************************************************************************/

function ButtonControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ButtonControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fUIObj.onmouseover = MainAppOnMouseOver;
	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;

	this.fFocused = false;

	this.setFocus(false);
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setText = function(/*string*/ text)
{
	this.fUIObj.innerHTML = text;
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setEnabled = function(/*boolean*/ enable)
{
	this.fEnabled = enable;
	checkClassName(this.fUIObj, this.fEnabled ? (this.fFocused ? 'hilite' : 'normal') : 'disabled');
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setFocus = function(/*boolean*/ set)
{
	var wasFocused = this.fFocused;
	checkClassName(this.fUIObj, set ? 'hilite' : 'normal');
	this.fFocused = set;
	if(set)
	{
		if(document.activeElement.id != this.fUIObj.id)
			this.fUIObj.focus();

		if(!wasFocused)
			this.getScreen().onFocus(this.ControlID);
	}
}

/******************************************************************************/

/*boolean*/ ButtonControl.prototype.key = function(/*int*/ key)
{
	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}

	return Control.prototype.key.call(this, key);
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.mouseClick = function(/*string*/ controlID)
{
	this.getScreen().onButton(this.ControlID);
}

/******************************************************************************/
/******************************************************************************/
