/* ContainerControl.js */

/******************************************************************************/
/******************************************************************************/

function ContainerControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	if(controlID)	// default ctor will be called by inherited objects
		this.init(controlID, left, top);
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.init = function(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	this.ControlID = controlID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ContainerControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fLeft = left;
	this.fTop = top;
	this.fControlArray = new Array();
	this.fFocusedControlPos = -1;
	this.onNavigate = new Function("return null;");
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.moveTo = function(/*int*/ left, /*int*/ top)
{
	this.fUIObj.style.left = this.fLeft + left;
	this.fUIObj.style.top = this.fTop + top;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.show = function(show)
{
	setStyleDisplay(this.fUIObj, show);
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.newControl = function(oControl)
{
	this.fControlArray[this.fControlArray.length] = oControl;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.hasControl = function(/*string*/ controlID)
{
	if(this.ControlID == controlID)
		return true;

	return (this.findControl(controlID) != null);
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.findControl = function(controlID)
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.hasControl(controlID))
			return oControl;
	}

	return null;
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.findControlPos = function(controlID)
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.hasControl(controlID))
			return i;
	}

	return -1;
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.getControl = function(controlID)
{
	var oControl = this.findControl(controlID);

	if(oControl != null)
		return oControl;

	throw "ContainerControl.getControl: Invalid ControlID(" + controlID + ")";
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.deleteControl = function(controlID)
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.ControlID == controlID)
		{
			this.fControlArray.splice(i, 1);
			if(this.fFocusedControlPos >= this.fControlArray.length)
				this.fFocusedControlPos = this.fControlArray.length - 1;
			return;
		}
	}

	throw "ContainerControl.deleteControl: Invalid ControlID(" + controlID + ")";
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.loadData = function(/*object*/ oData)
{
	return true;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.unloadData = function(/*object*/ oData)
{
	return true;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.canFocus = function()
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.canFocus())
			return true;
	}

	return false;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.hasFocus = function()
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.hasFocus())
			return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.setFocus = function(/*boolean*/ set, /*string*/ controlID)
{
	var oControl;

	// was a control ID specified
	if(controlID)
	{
		if(this.ControlID != controlID)
		{
			oControl = this.findControl(controlID)
			if(oControl != null)
				this.focusControl(controlID, set);
		}
		return;
	}

	// does any control already has the focus?
	oControl = this.findFocusedControl();
	if(oControl != null)
	{
		if(oControl.canFocus())		// check canFocus in case control became disabled
		{
			oControl.setFocus(set);
			return;
		}
		this.fFocusedControlPos = -1;	// clear focused control
	}

	// if setting, give first child the focus
	if(set)
	{
		for(var i = 0; i < this.fControlArray.length; i++)
		{
			oControl = this.fControlArray[i];
			if(oControl.canFocus())
			{
				this.focusControl(oControl.ControlID, true);
				break;
			}
		}
	}
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.findFocusedControl = function()
{
	if(this.fFocusedControlPos >= 0)
		return this.fControlArray[this.fFocusedControlPos];

	return null;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.focusControl = function(/*string*/ controlID, /*boolean*/ set)
{
	var oControl;
	var pos;

	pos = this.findControlPos(controlID);
	if(pos < 0)
		return;
	oControl = this.fControlArray[pos];
	if(!oControl.canFocus())
		return;

	if(set)
	{
		if(this.fFocusedControlPos >= 0)
			this.fControlArray[this.fFocusedControlPos].setFocus(false);

		this.fFocusedControlPos = pos;
		oControl.setFocus(true);
	}
	else
		oControl.setFocus(false);
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.key = function(/*int*/ keyCode)
{
	var oCurControl = null;
	var focusedPos = this.fFocusedControlPos;
	var nextfocusPos = -1;

	if(focusedPos != -1)
	{
		oCurControl = this.fControlArray[focusedPos];
		if(oCurControl.key(keyCode))
			return true;

		var nextControlID = this.onNavigate(oCurControl.ControlID, keyCode);
		if(nextControlID != null)
			nextfocusPos = this.findControlPos(nextControlID);
	}

	if(nextfocusPos == -1)
	{
		if((keyCode == ek_DownButton) || (keyCode == ek_Tab))
		{
			for(var i = focusedPos + 1; i < this.fControlArray.length; i++)
				if(this.fControlArray[i].canFocus())
				{
					nextfocusPos = i;
					break;
				}
		}

		if(keyCode == ek_UpButton)
		{
			for(var i = focusedPos - 1; i >= 0; i--)
				if(this.fControlArray[i].canFocus())
				{
					nextfocusPos = i;
					break;
				}
		}
	}

	if(nextfocusPos != -1)
	{
		if(oCurControl != null)
			oCurControl.setFocus(false);
		this.fFocusedControlPos = nextfocusPos;
		this.fControlArray[nextfocusPos].setFocus(true);
		return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.idle = function()
{
	var focusedPos = this.fFocusedControlPos;
	if(focusedPos != -1)
		(this.fControlArray[focusedPos]).idle();
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.mouseClick = function(/*string*/ controlID)
{
	var oControl = this.findControl(controlID);

	if(oControl != null)
		oControl.mouseClick(controlID);
}

/******************************************************************************/

//TODO: needs to recursively setFocus()
/*void*/ ContainerControl.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
/*
	if(buttonDown)
		return;
*/

	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];

		if (oControl.hasControl(controlID))
		{
			if(oControl.canFocus())
			{
				var oFocusedControl = this.findFocusedControl();

				if(!oControl.hasFocus() || (oFocusedControl == null)
					|| (oFocusedControl.ControlID != oControl.ControlID))
				{
					if((oFocusedControl != null)
							&& (oFocusedControl.ControlID != oControl.ControlID))
						oFocusedControl.setFocus(false);

					this.fFocusedControlPos = i;
					oControl.setFocus(true);
				}
			}
			oControl.mouseMove(/*bool buttonDown,*/ controlID)

			return;
		}
	}
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.focusEvent = function(/*string*/ controlID)
{
	var oControl = this.findControl(controlID);
	if((oControl != null) && oControl.canFocus())
		this.setFocus(true, controlID);
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.blurEvent = function(/*string*/ controlID)
{
	var oControl = this.findControl(controlID);
	if((oControl != null) && oControl.canFocus())
		this.setFocus(false, controlID);
}

/******************************************************************************/
/******************************************************************************/
