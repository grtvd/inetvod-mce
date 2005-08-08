/* CheckControl */

/******************************************************************************/
/******************************************************************************/

CheckControl.prototype = new Control();
CheckControl.prototype.constructor = CheckControl;

/******************************************************************************/

function CheckControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "CheckControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fFocused = false;
	this.fChecked = false;

	this.setFocus(false);
}

/******************************************************************************/

/*boolean*/ CheckControl.prototype.getChecked = function()
{
	return this.fChecked;
}

/******************************************************************************/

/*void*/ CheckControl.prototype.setChecked = function(/*boolean*/ checked)
{
	this.fChecked = (checked ? true : false);
	this.drawCheck();
}

/******************************************************************************/

/*void*/ CheckControl.prototype.drawCheck = function()
{
	checkClassName(this.fUIObj, (this.fChecked
		? (this.fFocused ? 'hilitechk' : 'normalchk')
		: (this.fFocused ? 'hilite' : 'normal')));
}

/******************************************************************************/

/*void*/ CheckControl.prototype.setFocus = function(/*boolean*/ set)
{
	var wasFocused = this.fFocused;
	this.fFocused = set;
	this.drawCheck();

	if(set)
	{
		if(document.activeElement.id != this.fUIObj.id)
			this.fUIObj.focus();

		if(!wasFocused)
			this.getScreen().onFocus(this.ControlID);
	}
}

/******************************************************************************/

/*boolean*/ CheckControl.prototype.key = function(/*int*/ key)
{
	if(key == ek_Select)
	{
		this.fChecked = !this.fChecked;
		this.drawCheck();

		return true;
	}

	return Control.prototype.key.call(this, key);
}

/******************************************************************************/

/*void*/ CheckControl.prototype.mouseClick = function(/*string*/ controlID)
{
	this.fChecked = !this.fChecked;
	this.drawCheck();
}

/******************************************************************************/
/******************************************************************************/
