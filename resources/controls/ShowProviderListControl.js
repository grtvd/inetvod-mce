/* ShowProviderListControl.js */

/******************************************************************************/
/******************************************************************************/

ShowProviderListControl.prototype = new ListControl();
ShowProviderListControl.prototype.constructor = ListControl;

/******************************************************************************/

function ShowProviderListControl(/*string*/ controlID, /*string*/ screenID, /*int*/ numRows,
	/*ListControlRowItemList*/ oRowItemList, /*Array*/ showProviderList)
{
	this.ShowProviderList = showProviderList;

	ListControl.prototype.init.call(this, controlID, screenID, numRows, oRowItemList);
}

/******************************************************************************/

/*ShowProvider*/ ShowProviderListControl.prototype.getFocusedItemValue = function()
{
	var focusedItem = this.getFocusedItemPos();
	if((focusedItem >= 0) && (focusedItem < this.ShowProviderList.length))
		return this.ShowProviderList[focusedItem];

	return null;
}

/******************************************************************************/

/*int*/ ShowProviderListControl.prototype.getItemCount = function()
{
	return this.ShowProviderList.length;
}

/******************************************************************************/

/*void*/ ShowProviderListControl.prototype.drawItem = function(/*int*/ item,
	/*ListControlRow*/ oRow)
{
	var showProvider = this.ShowProviderList[item];

	oRow.drawRowItem(0, MainApp.getThe().getSession().getProviderName(showProvider.ProviderID));
	oRow.drawRowItem(1, showProvider.ShowCost.CostDisplay);
}

/******************************************************************************/
/******************************************************************************/
