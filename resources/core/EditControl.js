/* EditControl */

/******************************************************************************/
/******************************************************************************/

EditControl.prototype = new Control();
EditControl.prototype.constructor = EditControl;

/******************************************************************************/

function EditControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "EditControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fUITextObj = document.getElementById(controlID + "_Text");
	if(this.fUITextObj == null)
		throw "EditControl::ctor(controlID): Can't find UI object, ID(" + controlID + "_Text)";
	this.fFocused = false;

	this.setFocus(false);
}

/******************************************************************************/

/*string*/ EditControl.prototype.getText = function()
{
	return this.fUITextObj.GetInputText();
}

/******************************************************************************/

/*void*/ EditControl.prototype.setFocus = function(/*boolean*/ set)
{
	checkClassName(this.fUIObj, set ? 'hilite' : 'normal');
	this.fFocused = set;

	if(set)
	{
		if(document.activeElement.id != this.fUITextObj.id)
			this.fUITextObj.SetInputFocus();

		this.getScreen().onFocus(this.ControlID);
	}
}

/******************************************************************************/

/*boolean*/ EditControl.prototype.key = function(/*int*/ key)
{
	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}

	return Control.prototype.key.call(this, key);
}

/******************************************************************************/
/******************************************************************************/
