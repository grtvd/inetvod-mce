/* ListControl */

/******************************************************************************/
/******************************************************************************/

ListControl.prototype = new Control();
ListControl.prototype.constructor = ListControl;

/******************************************************************************/

function ListControl(/*string*/ controlID, /*string*/ screenID, /*int*/ numRows,
	/*ListControlRowItemList*/ oRowItemList)
{
	if(controlID)	// default ctor will be called by inherited objects
		this.init(controlID, screenID, numRows, oRowItemList);
}

/******************************************************************************/

/*void*/ ListControl.prototype.init = function(/*string*/ controlID, /*string*/ screenID,
	/*int*/ numRows, /*ListControlRowItemList*/ oRowItemList)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ListControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fFocused = false;
	this.fFocusedItem = null;			// focused item, null if no focused item

	this.fRowItemList = oRowItemList;
	this.fRowList = new Array();
	for(var i = 0; i < numRows; i++)
	{
		this.fRowList.push(new ListControlRow(controlID, i, oRowItemList));
	}

	this.fUIUpIconObj = document.getElementById(controlID + "_Up");
	this.fUIDownIconObj = document.getElementById(controlID + "_Down");
	this.fUICountObj = document.getElementById(controlID + "_Count");

	this.fTopItem = 0;
	this.fBottomItem = -1;

	this.recalcBottomItemFromTopItem();
	this.setFocus(false);
	this.drawItems(false);
	this.drawUpIcon(false);
	this.drawDownIcon(false);
	this.drawCount();
}

/******************************************************************************/

/*void*/ ListControl.prototype.recalcTopItemFromBottomItem = function()
{
	var totalItems = this.getItemCount();

	if(totalItems == 0)
	{
		this.fTopItem = 0;
		this.fBottomItem = -1;
		return;
	}

	if(this.fBottomItem >= totalItems)
		this.fBottomItem = totalItems - 1;

	this.fTopItem = this.fBottomItem - this.fRowList.length + 1;
	if(this.fTopItem < 0)
		this.fTopItem = 0;
}

/******************************************************************************/

/*void*/ ListControl.prototype.recalcBottomItemFromTopItem = function()
{
	var totalItems = this.getItemCount();

	this.fBottomItem = -1;
	if(totalItems == 0)
	{
		this.fTopItem = 0;
		return;
	}

	if(this.fTopItem >= totalItems)
		this.fTopItem = totalItems - 1;

	this.fBottomItem = this.fTopItem + this.fRowList.length - 1;
	if(this.fBottomItem >= totalItems)
		this.fBottomItem = totalItems - 1;
}

/******************************************************************************/

/*void*/ ListControl.prototype.recalcAfterDataChange = function(/*boolrean*/ reset)
{
	if(reset)
	{
		this.fTopItem = 0;
		this.fBottomItem = -1;

		this.recalcBottomItemFromTopItem();
		if(this.getItemCount() > 0)
			this.setFocusedItem(this.fRowList[0]);
	}
	else
	{
		this.recalcTopItemFromBottomItem();
		if((this.fFocusedItem != null) && (this.fBottomItem >= 0) && (this.fFocusedItem.RowIndex > this.fBottomItem))
			this.setFocusedItem(this.fRowList[this.fBottomItem]);
	}
	this.drawItems(false);
	this.drawUpIcon(false);
	this.drawDownIcon(false);
	this.drawCount();
}

/******************************************************************************/

/*ListControlRow*/ ListControl.prototype.findRow = function(controlID)
{
	var oRow;

	for(var i = 0; i < this.fRowList.length; i++)
	{
		oRow = this.fRowList[i];
		if(oRow.hasControl(controlID))
			return oRow;
	}

	return null;
}

/******************************************************************************/

/*int*/ ListControl.prototype.findRowPos = function(controlID)
{
	var oRow;

	for(var i = 0; i < this.fRowList.length; i++)
	{
		oRow = this.fRowList[i];
		if(oRow.hasControl(controlID))
			return i;
	}

	return -1;
}

/******************************************************************************/

/*void*/ ListControl.prototype.setFocus = function(/*boolean*/ set)
{
	var wasFocused = this.fFocused;
	this.fFocused = set;

	if(set && !wasFocused)
		this.getScreen().onFocus(this.ControlID);

	if(set)
	{
		if(this.fFocusedItem != null)
			this.fFocusedItem.setFocus(true);
		else
		{
			if(this.getItemCount() > 0)
				this.setFocusedItem(this.fRowList[0]);
		}
	}
	else
	{
		if(this.fFocusedItem != null)
			this.fFocusedItem.setFocus(false);
	}
}

/******************************************************************************/

/*int*/ ListControl.prototype.getFocusedItemPos = function()
{
	if(this.fFocusedItem != null)
		return this.findRowPos(this.fFocusedItem.ControlID) + this.fTopItem;

	return -1;
}

/******************************************************************************/

/*void*/ ListControl.prototype.setFocusedItem = function(/*ListControlRow*/ oRow)
{
	if(this.fFocusedItem != null)
	{
		if((oRow != null) && (this.fFocusedItem.ControlID == oRow.ControlID))
		{
			this.getScreen().onListItem(this.ControlID);
			return;
		}

		this.fFocusedItem.setFocus(false);
		this.fFocusedItem = null;
	}

	this.fFocusedItem = oRow;
	if(this.fFocusedItem != null)
	{
		this.fFocusedItem.setFocus(true);
		this.getScreen().onListItem(this.ControlID);
	}
}

/******************************************************************************/

/*void*/ ListControl.prototype.setFocusedItemByPos = function(/*int*/ focusedItem)
{
	if((focusedItem >= 0) && (focusedItem < this.getItemCount()))
	{
		if(focusedItem < this.fTopItem)
			focusedItem = this.fTopItem;
		this.recalcBottomItemFromTopItem();

		if(focusedItem > this.fBottomItem)
		{
			this.fBottomItem = focusedItem;
			this.recalcTopItemFromBottomItem();
		}

		this.setFocusedItem(this.fRowList[focusedItem - this.fTopItem]);
		this.drawItems(true);
		this.drawUpIcon(false);
		this.drawDownIcon(false);
		this.drawCount();
	}
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawUpIcon = function(/*boolean*/ showFocus)
{
	var enabled = (this.fTopItem > 0);

	checkClassName(this.fUIUpIconObj, enabled ? (showFocus ? 'hilite' : 'normal') : 'disabled');
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawDownIcon = function(/*boolean*/ showFocus)
{
	var enabled = (this.fBottomItem < this.getItemCount() - 1);

	checkClassName(this.fUIDownIconObj, enabled ? (showFocus ? 'hilite' : 'normal') : 'disabled');
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawCount = function()
{
	var itemCount = this.getItemCount();
	var current = -1;
	var value = "";

	if(itemCount > 0)
	{
		if(this.fFocusedItem != null)
			current = this.findRowPos(this.fFocusedItem.ControlID) + this.fTopItem + 1;

		if(current == -1)
			current = this.fTopItem + 1;

		value = "" + current + "/" + itemCount;
	}

	this.fUICountObj.innerHTML = value;
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawItems = function(/*boolean*/ showFocus)
{
	//this.recalcBottomItemFromTopItem();

	var rowIndex = 0;
	var oRow;
	var focusedControlID = null;

	if(this.fFocusedItem != null)
		focusedControlID = this.fFocusedItem.ControlID;

	for(var dataIndex = this.fTopItem; dataIndex <= this.fBottomItem; dataIndex++)
	{
		oRow = this.fRowList[rowIndex];
		this.drawItem(dataIndex, oRow);
		if(showFocus && (oRow.ControlID == focusedControlID))
			oRow.setFocus(true);
		else
			oRow.show(true);
		rowIndex++;
	}

	for(; rowIndex < this.fRowList.length; rowIndex++)
	{
		oRow = this.fRowList[rowIndex];
		oRow.clearRowItems();
		oRow.show(false);
	}
}

/******************************************************************************/

/*boolean*/ ListControl.prototype.hasControl = function(/*string*/ controlID)
{
	if(this.ControlID == controlID)
		return true;

	for(var i = 0; i < this.fRowList.length; i++)
		if(this.fRowList[i].hasControl(controlID))
			return true;

	if(this.fUIUpIconObj.id == controlID)
		return true;
	if(this.fUIDownIconObj.id == controlID)
		return true;

	return false;
}


/******************************************************************************/

/*int*/ ListControl.prototype.getItemCount = function()
{
	throw "ListControl.getItemCount: this method should be overridden";
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawItem = function(/*int*/ item, /*ListControlRow*/ oRow)
{
	throw "ListControl.drawItem: this method should be overridden";
}

/******************************************************************************/

/*boolean*/ ListControl.prototype.key = function(/*int*/ key)
{
	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}

	var focusedItem = this.fTopItem - 1;

	if(this.fFocusedItem != null)
		focusedItem = this.findRowPos(this.fFocusedItem.ControlID) + this.fTopItem;

	if(key == ek_DownButton)
	{
		var itemCount = this.getItemCount();

		if(focusedItem < this.getItemCount() - 1)
			focusedItem++;
		else
			return false;

		if(focusedItem > this.fBottomItem)
		{
			this.fBottomItem = focusedItem;
			this.recalcTopItemFromBottomItem();
			this.drawItems(true);
			this.drawUpIcon(false);
			this.drawDownIcon(false);
		}

		this.setFocusedItem((focusedItem >= 0) ? this.fRowList[focusedItem - this.fTopItem] : null);
		this.drawCount();
		return true;
	}

	if(key == ek_UpButton)
	{
		if(focusedItem > 0)
			--focusedItem;
		else
			return false;

		if(focusedItem < this.fTopItem)
		{
			this.fTopItem = focusedItem;
			this.recalcBottomItemFromTopItem();
			this.drawItems(true);
			this.drawUpIcon(false);
			this.drawDownIcon(false);
		}

		this.setFocusedItem((focusedItem >= 0) ? this.fRowList[focusedItem - this.fTopItem] : null);
		this.drawCount();
		return true;
	}

	if(key == ek_PageDown)
	{
		var itemCount = this.getItemCount();
		var pageCount = (this.fBottomItem - this.fTopItem + 1);

		this.fBottomItem += pageCount;
		if(this.fBottomItem >= itemCount)
			this.fBottomItem = itemCount - 1;
		focusedItem += pageCount;
		if(focusedItem >= itemCount)
			focusedItem = itemCount - 1;
		this.recalcTopItemFromBottomItem();

		this.drawItems(true);
		this.drawUpIcon(false);
		this.drawDownIcon(false);
		this.setFocusedItem((focusedItem >= 0) ? this.fRowList[focusedItem - this.fTopItem] : null);
		this.drawCount();

		return true;
	}

	if(key == ek_PageUp)
	{
		var pageCount = (this.fBottomItem - this.fTopItem + 1);

		this.fTopItem -= pageCount;
		if(this.fTopItem < 0)
			this.fTopItem = 0;
		focusedItem -= pageCount;
		if(focusedItem < 0)
			focusedItem = 0;
		this.recalcBottomItemFromTopItem();

		this.drawItems(true);
		this.drawUpIcon(false);
		this.drawDownIcon(false);
		this.setFocusedItem((focusedItem >= 0) ? this.fRowList[focusedItem - this.fTopItem] : null);
		this.drawCount();

		return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ ListControl.prototype.mouseClick = function(/*string*/ controlID)
{
	// check more icons
	if(controlID == this.fUIUpIconObj.id)
	{
		this.key(ek_PageUp);
		return;
	}

	if(controlID == this.fUIDownIconObj.id)
	{
		this.key(ek_PageDown);
		return;
	}

	// must be in list row
	this.getScreen().onButton(this.ControlID);
}

/******************************************************************************/

/*void*/ ListControl.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
	// check rows
	var oRow = this.findRow(controlID);
	if(oRow != null)
	{
		this.setFocusedItem(oRow);
		this.drawUpIcon(false);
		this.drawDownIcon(false);
		this.drawCount(true);
	}

	// check more icons
	this.drawUpIcon(controlID == this.fUIUpIconObj.id);
	this.drawDownIcon(controlID == this.fUIDownIconObj.id);
}

/******************************************************************************/
/******************************************************************************/
