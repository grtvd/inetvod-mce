/* Common.js */

/******************************************************************************/
/******************************************************************************/

function tryit(m)
{
	try
	{
		eval(m);
	}
	catch(e)
	{
		showError("tryit", e);
		//top.location = 'error.html?e=' + msg;
	}
}

/******************************************************************************/

function showMsg(msg)
{

	if(window.external.MediaCenter)
		window.external.MediaCenter.Dialog(msg, "", 1, 5, false);
	else
		alert(msg);
}

/******************************************************************************/

var gShowErrors = false;

function enableErrors(/*boolean*/ enable)
{
	gShowErrors = enable;
}

/******************************************************************************/

function showError(loc, e)
{
	var msg;

	if(isUndefined(e.message))
		msg = e.toString();
	else
		msg = e.name + ": " + e.message;

	msg = loc + ": caught: " + msg;

	DebugOut(msg);

	if(!gShowErrors)
		return;

	if(window.external.MediaCenter)
		window.external.MediaCenter.Dialog(msg, "Error", 1, 5, false);
	else
		alert(msg);
}

/******************************************************************************/
/******************************************************************************/

function isAlien(a)
{
	return isObject(a) && typeof a.constructor != 'function';
}

/******************************************************************************/

function isArray(a)
{
	return isObject(a) && a.constructor == Array;
}

/******************************************************************************/

function isBoolean(a)
{
	return typeof a == 'boolean';
}

/******************************************************************************/

function isDate(a)
{
	return (typeof a == 'object') && a.getTime;
}

/******************************************************************************/

/* isEmpty(a) returns true if a is an object or array or function containing no enumerable members. */
function isEmpty(o)
{
	var i, v;
	if (isObject(o))
	{
		for (i in o)
		{
			v = o[i];
			if (isUndefined(v) && isFunction(v))
			{
				return false;
			}
		}
	}
	return true;
}

/******************************************************************************/

function isFunction(a)
{
	return typeof a == 'function';
}

/******************************************************************************/

function isNull(a)
{
	return typeof a == 'object' && !a;
}

/******************************************************************************/

function isNumber(a)
{
	return typeof a == 'number' && isFinite(a);
}

/******************************************************************************/

function isObject(a)
{
	return (a && typeof a == 'object') || isFunction(a);
}

/******************************************************************************/

function isString(a)
{
	return typeof a == 'string';
}

/******************************************************************************/

function isUndefined(a)
{
	return typeof a == 'undefined';
}

/******************************************************************************/

//function isNull(value)
//{
//	if((value == undefined) || (value == null))
//		return true;
//	return false;
//}

function testNull(value, defaultValue)
{
	return isNull(value) ? defaultValue : value;
}

/******************************************************************************/

function validateStrNotNull(str, method)
{
	if(str == undefined)
		throw testNull(method, "Unknown") + ":validateStrNotNull: is undefined";

	if(str == null)
		throw testNull(method, "Unknown") + ":validateStrNotNull: is null";
}

/******************************************************************************/

function testStrHasLen(str)
{
	if(!isString(str))
		return false;

	return (str.length > 0);
}

/******************************************************************************/

function validateStrHasLen(str, method)
{
	if(str == undefined)
		throw testNull(method, "Unknown") + ":validateStrHasLen: is undefined";

	if(str == null)
		throw testNull(method, "Unknown") + ":validateStrHasLen: is null";

	if(str.length == undefined)
		throw testNull(method, "Unknown") + ":validateStrHasLen: length is undefined";

	if(str.length == 0)
		throw testNull(method, "Unknown") + ":validateStrHasLen: length == 0";
}

/******************************************************************************/
/******************************************************************************/

function getClassNameBase(curr)
{
	if(curr == undefined)
		return '';

	var parts = curr.split('_');
	if(parts.length != 2)
		return curr;
	return parts[0];
}

/******************************************************************************/

function buildClassName(curr, ext)
{
	if(curr == undefined)
		return '';

	var parts = curr.split('_');
	if(parts.length != 2)
		return curr;
	return parts[0] + '_' + ext;
}

/******************************************************************************/

function checkClassName(obj, classNameExt)
{
	if(obj.className == undefined)
		return;

	var className = obj.className;
	var newName = buildClassName(className, classNameExt)
	if(newName != className)
		obj.className = newName;
}

/******************************************************************************/

/*object*/ function findObjectWithID(/*object */ obj)
{
	var testObj = obj;

	if(!isObject(obj))
		return null;

	while(true)
	{
		if(testStrHasLen(testObj.id))
			return testObj;

		if(isObject(testObj.parentElement))
			testObj = testObj.parentElement;
		else
			return null;
	}
}

/******************************************************************************/

/*void*/ function setStyleDisplay(/*object*/ oObj, /*bool*/ show)
{
	var newDisplay = (show) ? 'inline' : 'none';

	// only change display if new value, resetting to same value seems to effect the focus.
	if(oObj && oObj.style)
		if(oObj.style.display != newDisplay)
			oObj.style.display = newDisplay;

}

/******************************************************************************/
/******************************************************************************/

function compareStrings(lhs, rhs)
{
	if(!lhs)
		lhs = "";
	if(!rhs)
		rhs = "";

	if(lhs == rhs)
		return 0;
	if(lhs < rhs)
		return -1;
	return 1;
}

/******************************************************************************/

function compareStringsIgnoreCase(lhs, rhs)
{
	return compareStrings((lhs ? lhs.toUpperCase() : lhs), (rhs ? rhs.toUpperCase() : rhs));
}

/******************************************************************************/

function compareNumbers(lhs, rhs)
{
	if(!lhs)
		lhs = 0;
	if(!rhs)
		rhs = 0;

	if(lhs == rhs)
		return 0;
	if(lhs < rhs)
		return -1;
	return 1;
}

/******************************************************************************/

function compareDates(lhs, rhs)
{
	if(!lhs)
		lhs = (new Date());
	if(!rhs)
		rhs = (new Date());

	if(lhs == rhs)
		return 0;
	if(lhs < rhs)
		return -1;
	return 1;
}

/******************************************************************************/
/******************************************************************************/

function arrayIndexOf(arr, item)
{
	for(var i = 0; i < arr.length; i++)
		if(item == arr[i])
			return i;

	return -1;
}

/******************************************************************************/

function arrayIndexOfByCmpr(arr, itemComparer)
{
	for(var i = 0; i < arr.length; i++)
		if(itemComparer.compare(arr[i]) == 0)
			return i;

	return -1;
}

/******************************************************************************/

function arrayFindItemByCmpr(arr, itemComparer)
{
	for(var i = 0; i < arr.length; i++)
		if(itemComparer.compare(arr[i]) == 0)
			return arr[i];

	return null;
}

/******************************************************************************/

function arrayRemoveByCmpr(arr, itemComparer)
{
	var pos = arrayIndexOfByCmpr(arr, itemComparer);

	if(pos < 0)
		return;

	arr.splice(pos, 1);
}

/******************************************************************************/
/******************************************************************************/

function stopEventPropagation(evt)
{
	if(!isObject(evt) && isObject(event))
		evt = event;
	if(isObject(evt))
	{
		if(isFunction(evt.stopPropagation))
			evt.stopPropagation();
		else if(isBoolean(evt.cancelBubble))
			evt.cancelBubble = true;
	}
}

/******************************************************************************/
/******************************************************************************/
