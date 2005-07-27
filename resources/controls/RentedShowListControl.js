/* RentedShowListControl.js */

/******************************************************************************/
/******************************************************************************/

function RentedShowListControl()
{
}

/******************************************************************************/

/*int*/ RentedShowListControl.prototype.getItemCount = function()
{
	return 50;
}

/******************************************************************************/

/*void*/ RentedShowListControl.prototype.drawItem = function(/*int*/ item,
	/*ListControlRow*/ oRow)
{
	oRow.drawRowItem(0, "A" + item);
	oRow.drawRowItem(1, "B");
	oRow.drawRowItem(2, "C");
}

/******************************************************************************/
/******************************************************************************/
