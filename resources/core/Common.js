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

// This function detects whether user is in a remote session on a Media Center Extender device

function IsMCExtender()
{
	try
	{
		if(!window.external.MediaCenter)
			return false;

		// if this is not a console session ...
		if (window.external.MediaCenter.Capabilities.IsConsole == false)
		{
			/* ...then it is either a Media Center Extender session or a traditional Remote Desktop session.
			 To tell which type of session it is, check if video is allowed. If video is allowed... */
			if (window.external.MediaCenter.Capabilities.IsVideoAllowed == true)
			{
				// ... then it is an extender session, so return true
				return true
			}
			// Media Center does not allow video in a traditional Remote Desktop session. So if video is not allowed ...
			else
			{
				/* IsConsole and IsVideoAllowed are both false false, so user is accessing through a traditional Remote
				Desktop session, rather than from an extender device. That means that they probably have access to a keyboard
				and mouse, but they cannot play video. If your application features video playback, you may want to
				adjust your functionality for this user accordingly.
				Returning false simply indicates that this is not an Extender session.  */
				return false
			}
		}
		else
		{
			// If not, this is a Media Center session on the console PC, so return false
			return false
		}
	}
	catch(e)
	{
		/* If above cause errors, user is probably accessing from a browser outside of Media Center.
		Return false to indicate that it is not an extender session. */
		return false
	}
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
