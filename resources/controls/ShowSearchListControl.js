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

/*void*/ ShowSearchListControl.prototype.setShowSearchList = function(
	/*Array*/ showSearchList, /*boolean*/ reset)
{
	this.ShowSearchList = showSearchList;
	this.recalcAfterDataChange(reset);
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
	var date;
	var cost;
	var tempStr;

	date = "";
	if(showSearch.ReleasedOn)
		date = dateTimeToString(showSearch.ReleasedOn, dtf_M_YY, true);
	else if(showSearch.ReleasedYear)
		date = showSearch.ReleasedYear.toString();

	if(showSearch.ShowProviderList.length == 1)
	{
		showProvider = showSearch.ShowProviderList[0];
		cost = showProvider.ShowCostList[0].CostDisplay;	//TODO: Showing first ShowCost
	}
	else
		cost = "(...)";

	tempStr = showSearch.Name;
	if(testStrHasLen(showSearch.EpisodeName))
		tempStr += ' - "' + showSearch.EpisodeName + '"';
	oRow.drawRowItem(0, tempStr);
	oRow.drawRowItem(1, date);
	oRow.drawRowItem(2, cost);
}

/******************************************************************************/
/******************************************************************************/
