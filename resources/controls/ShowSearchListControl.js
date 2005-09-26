/* ShowSearchListControl.js */

/******************************************************************************/
/******************************************************************************/

ShowSearchListControl.prototype = new ListControl();
ShowSearchListControl.prototype.constructor = ListControl;

/******************************************************************************/

function ShowSearchListControl(/*string*/ controlID, /*string*/ screenID, /*int*/ numRows,
	/*ListControlRowItemList*/ oRowItemList, /*Array*/ showSearchList)
{
	this.ShowSearchList = showSearchList;

	ListControl.prototype.init.call(this, controlID, screenID, numRows, oRowItemList);
}

/******************************************************************************/

/*ShowSearch*/ ShowSearchListControl.prototype.getFocusedItemValue = function()
{
	var focusedItem = this.getFocusedItemPos();
	if((focusedItem >= 0) && (focusedItem < this.ShowSearchList.length))
		return this.ShowSearchList[focusedItem];

	return null;
}

/******************************************************************************/

/*int*/ ShowSearchListControl.prototype.getItemCount = function()
{
	return this.ShowSearchList.length;
}

/******************************************************************************/

/*void*/ ShowSearchListControl.prototype.drawItem = function(/*int*/ item,
	/*ListControlRow*/ oRow)
{
	var showSearch = this.ShowSearchList[item];
	var showProvider;
	var cost;
	var tempStr;

	if(showSearch.ShowProviderList.length == 1)
	{
		showProvider = showSearch.ShowProviderList[0];
		cost = showProvider.ShowCost.CostDisplay;
	}
	else
		cost = "(...)";

	tempStr = showSearch.Name;
	if(testStrHasLen(showSearch.EpisodeName))
		tempStr += ' - "' + showSearch.EpisodeName + '"';
	oRow.drawRowItem(0, tempStr);
	oRow.drawRowItem(1, showSearch.ReleasedYear);
	oRow.drawRowItem(2, cost);
}

/******************************************************************************/
/******************************************************************************/
