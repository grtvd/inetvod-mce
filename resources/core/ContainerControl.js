/* ContainerControl.js */

/******************************************************************************/
/******************************************************************************/

function ContainerControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	if(controlID)	// default ctor will be called by inherited objects
		this.init(controlID, left, top);
}

/******************************************************************************/

function ContainerControl.prototype.init(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	this.ControlID = controlID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ContainerControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fLeft = left;
	this.fTop = top;
	this.fControlArray = new Array();
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
	this.fUIObj.style.display = show ? 'inline' : 'none';
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
	return (this.findFocusedPos() >= 0);
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.setFocus = function(/*boolean*/ set)
{
	var oControl;

	// make sure to unfocus child controls
	oControl = this.findFocusedControl();
	if(oControl != null)
		oControl.setFocus(false);

	// if setting, first first child the focus
	if(set)
	{
		for(var i = 0; i < this.fControlArray.length; i++)
		{
			oControl = this.fControlArray[i];
			if(oControl.canFocus())
			{
				oControl.setFocus(true);
				break;
			}
		}
	}
}

/******************************************************************************/

/*int*/ ContainerControl.prototype.findFocusedPos = function()
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.hasFocus())
			return i;
	}

	return -1;
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.findFocusedControl = function()
{
	var pos = this.findFocusedPos();

	if(pos >= 0)
		return this.fControlArray[pos];

	return null;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.focusControl = function(/*string*/ controlID)
{
	var oControl;
	var pos;

	oControl = this.getControl(controlID);
	if(!oControl.canFocus())
		return;

	var pos = this.findFocusedPos();
	if(pos >= 0)
		this.fControlArray[pos].setFocus(false);

	oControl.setFocus(true);
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.key = function(/*int*/ keyCode)
{
	var oCurControl = null;
	var focusedPos = this.findFocusedPos();

	if(focusedPos != -1)
	{
		oCurControl = this.fControlArray[focusedPos];
		if(oCurControl.key(keyCode))
			return true;
	}

	if((keyCode == ek_DownButton) || (keyCode == ek_RightButton))
	{
		for(var i = focusedPos + 1; i < this.fControlArray.length; i++)
		{
			if(this.fControlArray[i].canFocus())
			{
				if(oCurControl != null)
					oCurControl.setFocus(false);
				this.fControlArray[i].setFocus(true);
				return true;
			}
		}
	}

	if((keyCode == ek_UpButton) || (keyCode == ek_LeftButton))
	{
		for(var i = focusedPos - 1; i >= 0; i--)
		{
			if(this.fControlArray[i].canFocus())
			{
				if(oCurControl != null)
					oCurControl.setFocus(false);
				this.fControlArray[i].setFocus(true);
				return true;
			}
		}
	}

	return false;
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

				if((oFocusedControl == null) || (oFocusedControl.ControlID
					!= oControl.ControlID))
				{
					if(oFocusedControl != null)
						oFocusedControl.setFocus(false);

					oControl.setFocus(true);
				}
			}
			oControl.mouseMove(/*bool buttonDown,*/ controlID)

			return;
		}
	}
}

/******************************************************************************/
/******************************************************************************/
