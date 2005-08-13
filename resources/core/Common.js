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

function showError(loc, e)
{
	var msg;

	if(isUndefined(e.message))
		msg = e.toString();
	else
		msg = e.name + ": " + e.message;

	msg = loc + ": caught: " + msg;

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
/******************************************************************************/

function forceRedraw(pauseMills)
{
	var val = "javascript:document.writeln('<" + "script" + ">setTimeout(\\\'window.close()\\\', "
		+ ((pauseMills) ? pauseMills : 1) + ");</" + "script" + ">')";
	window.showModalDialog(val);
}

/******************************************************************************/
/******************************************************************************/

function ArrayIndexOf(arr, item)
{
	for(var i = 0; i < arr.length; i++)
		if(item == arr[i])
			return i;

	return -1;
}

/******************************************************************************/
/******************************************************************************/
