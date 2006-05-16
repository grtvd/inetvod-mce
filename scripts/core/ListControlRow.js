/* ListControlRow */

/******************************************************************************/
/******************************************************************************/

function ListControlRow(/*string*/ controlID, /*int*/ rowIndex,
	/*ListControlRowItemList*/ oRowItemList)
{
	this.ControlID = controlID + "_" + new String(rowIndex);
	this.RowIndex = rowIndex;
	this.fUIObj = document.getElementById(this.ControlID);
	if(this.fUIObj == null)
		throw "ListControlRow::ctor(controlID): Can't find UI object, ID(" + this.ControlID + ")";

	var oRowItem;
	var oUIObj;

	this.fRowItemList = oRowItemList;
	for(var i = 0; i < this.fRowItemList.length; i++)
	{
		oRowItem = this.fRowItemList[i];
		controlID = this.getRowItemControlID(i);
		oUIObj = document.getElementById(controlID);
		if(oUIObj == null)
			throw "ListControlRow::ctor(controlID): Can't find UI object, ID(" + controlID + ")";

		oUIObj.style.width = oRowItem.Width;
		checkClassName(oUIObj, 'normal');
	}
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.setFocus = function(/*boolean*/ set)
{
	checkClassName(this.fUIObj, set ? 'hilite' : 'normal');

	for(var i = 0; i < this.fRowItemList.length; i++)
		this.focusRowItem(i, set);

	if(set)
		if(document.activeElement.id != this.fUIObj.id)
			this.fUIObj.focus();
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.show = function(/*boolean*/ show)
{
	checkClassName(this.fUIObj, show ? 'normal' : 'hide');
}

/******************************************************************************/

/*boolean*/ ListControlRow.prototype.hasControl = function(/*string*/ controlID)
{
	if(this.ControlID == controlID)
		return true;

	for(var i = 0; i < this.fRowItemList.length; i++)
		if(this.getRowItemControlID(i) == controlID)
			return true;

	return false;
}

/******************************************************************************/

/*string*/ ListControlRow.prototype.getRowItemControlID = function(/*int*/ rowItemIndex)
{
	if(rowItemIndex >= this.fRowItemList.length)
		throw "ListControlRow::getRowItemControlID: rowItemIndex(" + rowItemIndex + ") >= this.fRowItemList.length(" + this.fRowItemList.length + ")";

	var oRowItem = this.fRowItemList[rowItemIndex];
	return this.ControlID + "_" + oRowItem.Name;
}

/******************************************************************************/

/*object*/ ListControlRow.prototype.getRowItemObj = function(/*int*/ rowItemIndex)
{
	var controlID = this.getRowItemControlID(rowItemIndex);
	var oUIObj = document.getElementById(controlID);

	if(oUIObj == null)
		throw "ListControlRow::getRowItemObj: Can't find UI object, ID(" + controlID + ")";

	return oUIObj;
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.drawRowItem = function(/*int*/ rowItemIndex, /*string*/ value)
{
	var oUIObj = this.getRowItemObj(rowItemIndex);

	oUIObj.innerHTML = value;
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.focusRowItem = function(/*int*/ rowItemIndex, /*string*/ set)
{
	var oUIObj = this.getRowItemObj(rowItemIndex);

	checkClassName(oUIObj, set ? 'hilite' : 'normal');
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.clearRowItems = function()
{
	var oUIObj;

	for(var i = 0; i < this.fRowItemList.length; i++)
	{
		oUIObj = this.getRowItemObj(i);
		oUIObj.innerHTML = "";
	}
}

/******************************************************************************/
/******************************************************************************/
