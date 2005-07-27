/* ShowSearchListControl.js */

/******************************************************************************/
/******************************************************************************/

function ShowSearchListControl(/*Array*/ showSearchList)
{
	this.ShowSearchList = showSearchList;
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
	var providerName;
	var cost = null;
	var tempStr;

	if(showSearch.ShowProviderList.length == 1)
	{
		showProvider = showSearch.ShowProviderList[0];

		providerName = MainApp.getThe().getSession().getProviderName(showProvider.ProviderID);
		cost = showProvider.ShowCost.CostDisplay;
	}
	else
		providerName = "(multiple)";

	tempStr = showSearch.Name;
	if(testStrHasLen(showSearch.EpisodeName))
		tempStr += ' - "' + showSearch.EpisodeName + '"';
	oRow.drawRowItem(0, tempStr);
	oRow.drawRowItem(1, showSearch.ReleasedYear);
	oRow.drawRowItem(2, providerName);
	oRow.drawRowItem(3, cost);
}

/******************************************************************************/
/******************************************************************************/
