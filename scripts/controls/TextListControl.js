/* TextListControl.js */

/******************************************************************************/
/******************************************************************************/

TextListControl.prototype = new ListControl();
TextListControl.prototype.constructor = ListControl;

/******************************************************************************/

function TextListControl(/*string*/ controlID, /*string*/ screenID, /*int*/ numRows,
	/*ListControlRowItemList*/ oRowItemList, /*Array*/ nameValuePairList)
{
	this.NameValuePairList = nameValuePairList;

	ListControl.prototype.init.call(this, controlID, screenID, numRows, oRowItemList);
}

/******************************************************************************/

/*void*/ TextListControl.prototype.setFocusedItemByName = function(/*string*/ name)
{
	var pos = arrayIndexOfByCmpr(this.NameValuePairList, new NameValuePairCmpr(name));
	this.setFocusedItemByPos(pos);
}

/******************************************************************************/

/*NameValuePair*/ TextListControl.prototype.getFocusedItemValue = function()
{
	var focusedItem = this.getFocusedItemPos();
	if((focusedItem >= 0) && (focusedItem < this.NameValuePairList.length))
		return this.NameValuePairList[focusedItem];

	return null;
}

/******************************************************************************/

/*int*/ TextListControl.prototype.getItemCount = function()
{
	return this.NameValuePairList.length;
}

/******************************************************************************/

/*void*/ TextListControl.prototype.drawItem = function(/*int*/ item,
	/*ListControlRow*/ oRow)
{
	var nameValuePair = this.NameValuePairList[item];

	oRow.drawRowItem(0, nameValuePair.Value);
}

/******************************************************************************/
/******************************************************************************/
