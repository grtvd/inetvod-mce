/* ShowProviderListControl.js */

/******************************************************************************/
/******************************************************************************/

ShowProviderListControl.prototype = new ListControl();
ShowProviderListControl.prototype.constructor = ListControl;

/******************************************************************************/

function ShowProviderListControl(/*string*/ controlID, /*string*/ screenID, /*int*/ numRows,
	/*ListControlRowItemList*/ oRowItemList, /*Array*/ showProviderList)
{
	this.initShowProviderItemList(showProviderList);

	ListControl.prototype.init.call(this, controlID, screenID, numRows, oRowItemList);
}

/******************************************************************************/

/*void*/ ShowProviderListControl.prototype.initShowProviderItemList = function(/*Array*/ showProviderList)
{
	var showProvider;
	var showCost;
	var list = new Array();

	if(showProviderList)
	{
		for(var i = 0; i < showProviderList.length; i++)
		{
			showProvider = showProviderList[i];

			for(var j = 0; j < showProvider.ShowCostList.length; j++)
			{
				showCost = showProvider.ShowCostList[j];

				list.push(ShowProviderItem.newInstance(showProvider.ProviderID, showCost));
			}
		}
	}

	this.ShowProviderItemList = list;
}

/******************************************************************************/

/*void*/ ShowProviderListControl.prototype.setShowProviderList = function(
	/*Array*/ showProviderList, /*boolean*/ reset)
{
	this.initShowProviderItemList(showProviderList);
	this.recalcAfterDataChange(reset);
}

/******************************************************************************/

/*ShowProviderItem*/ ShowProviderListControl.prototype.getFocusedItemValue = function()
{
	var focusedItem = this.getFocusedItemPos();
	if((focusedItem >= 0) && (focusedItem < this.ShowProviderItemList.length))
		return this.ShowProviderItemList[focusedItem];

	return null;
}

/******************************************************************************/

/*int*/ ShowProviderListControl.prototype.getItemCount = function()
{
	return this.ShowProviderItemList.length;
}

/******************************************************************************/

/*void*/ ShowProviderListControl.prototype.drawItem = function(/*int*/ item,
	/*ListControlRow*/ oRow)
{
	var showProviderItem = this.ShowProviderItemList[item];
	var showCost = showProviderItem.ShowCost;

	oRow.drawRowItem(0, showProviderItem.Provider.Name);
	oRow.drawRowItem(1, showCost.formatRental());
	oRow.drawRowItem(2, showCost.CostDisplay);
}

/******************************************************************************/
/******************************************************************************/
