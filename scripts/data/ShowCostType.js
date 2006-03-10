/* ShowCostType.js */

/******************************************************************************/
/******************************************************************************/

var ShowCostTypeMaxLength = 32;

var sct_Free = "Free";
var sct_Subscription = "Subscription";
var sct_PayPerView = "PayPerView";

var ShowCostTypeSortOrder = new Array(sct_Free, sct_Subscription, sct_PayPerView);

/******************************************************************************/

function ShowCostTypeCmpr(lhs, rhs)
{
	return compareNumbers(arrayIndexOf(ShowCostTypeSortOrder, lhs),
		arrayIndexOf(ShowCostTypeSortOrder, rhs));
}

/******************************************************************************/
/******************************************************************************/
