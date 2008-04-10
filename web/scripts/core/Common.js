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

	if(window.external && window.external.MediaCenter)
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

	if(window.external && window.external.MediaCenter)
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

function testStrIsAllNumbers(str)
{
	return /^\d+$/.test(str);
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

/*Event*/ function getEvent(/*Event*/ evt)
{
	if(isObject(evt))
		return evt;
	return event;
}

/******************************************************************************/

/*Object*/ function getEventSource(/*Event*/ evt)
{
	if(isObject(evt))
	{
		if(isObject(evt.target))
			return evt.target;
		if(isObject(evt.srcElement))
			return evt.srcElement;
	}

	return null;
}

/******************************************************************************/

/*int*/ function getEventKeyCode(/*Event*/ evt)
{
	if(isObject(evt))
	{
		if(evt.keyCode)
			return evt.keyCode;
		if(evt.which)
			return evt.which;
	}

	return 0;
}

/******************************************************************************/

//TODO IE ONLY
///*void*/ function setEventKeyCode(/*Event*/ evt, /*int*/ newKeyCode)
//{
//	if(isObject(evt))
//	{
//		if(evt.keyCode)
//			evt.keyCode = newKeyCode;
//		else if(evt.which)
//			evt.which = newKeyCode;
//	}
//}

/******************************************************************************/

function isEventKeyCodeNavigation(/*int*/ key)
{
	return (key == ek_Backspace)
		|| (key == ek_Tab)
		|| (key == ek_Escape)
		|| (key == ek_Select)
		|| (key == ek_Back)
		|| (key == ek_NextValue)
		|| (key == ek_PrevValue)
		|| (key == ek_UpButton)
		|| (key == ek_DownButton)
		|| (key == ek_LeftButton)
		|| (key == ek_RightButton)
		|| (key == ek_PageUp)
		|| (key == ek_PageUp);
}

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

function getWindowInnerWidth()
{
	// all except Explorer
	if(self && self.innerHeight)
		return self.innerWidth;

	// Explorer 6 Strict Mode
	if(document.documentElement && document.documentElement.clientHeight)
		return document.documentElement.clientWidth;

	// other Explorers
	if(document.body && document.body.clientWidth)
		return document.body.clientWidth;

	throw "getWindowInnerWidth: can't get width";
}

/******************************************************************************/

function getWindowInnerHeight()
{
	// all except Explorer
	if(self && self.innerHeight)
		return self.innerHeight;

	// Explorer 6 Strict Mode
	if(document.documentElement && document.documentElement.clientHeight)
		return document.documentElement.clientHeight;

	// other Explorers
	if(document.body)
		return document.body.clientHeight;

	throw "getWindowInnerHeight: can't get height";
}

/******************************************************************************/
/******************************************************************************/

function getElementWidth(obj)
{
	if(!obj)
		return 0;

	if(window.getComputedStyle)
	{
		try
		{
			var objStyle = window.getComputedStyle(obj, null);
			if(objStyle && objStyle.width && (objStyle.width.length > 0))
			{
				var pxPos = objStyle.width.lastIndexOf("px");
				if(pxPos > 0)
					return parseInt(objStyle.width.substring(0, pxPos));

				return parseInt(objStyle.width);
			}
		}
		catch(e)
		{
		}
	}

	if(obj.style && obj.style.pixelWidth)
	{
		return obj.style.pixelWidth;
	}
	
	return 0;
}

/******************************************************************************/
/******************************************************************************/

/*string*/ function determineFileExtFromURL(/*string*/ url)
{
	if(!testStrHasLen(url))
		return null;

	var dotPos = url.lastIndexOf(".");
	if(dotPos < 0)
		return null;

	if(url.lastIndexOf("/") >= dotPos)
		return null;

	var paramPos = url.lastIndexOf("?");
	if(paramPos >= dotPos)
		return url.substring(dotPos, paramPos);

	return url.substring(dotPos);
}

/******************************************************************************/
/******************************************************************************/

/*XMLHttp*/ function createXMLHttpRequest()
{
	var xmlHttp = null;

	if (window.ActiveXObject) // IE
	{
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if(window.XMLHttpRequest) // Mozilla, Safari, ...
	{
		xmlHttp = new XMLHttpRequest();
		if(xmlHttp.overrideMimeType)
			xmlHttp.overrideMimeType('text/xml');
	}

	return xmlHttp;
}

/******************************************************************************/

/*XMLDocument*/ function createXmlDocument(data)
{
	var xmlDoc = null;

	if (window.ActiveXObject) // IE
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(data);
	}
	else // others
	{
		var domParser = new DOMParser();
		xmlDoc = domParser.parseFromString(data, "text/xml");
	}

	return xmlDoc;
}

/******************************************************************************/
/******************************************************************************/
