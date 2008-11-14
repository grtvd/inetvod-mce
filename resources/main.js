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

function isMediaCenter()
{
	try
	{
		if(window.external.MediaCenter)
			return true;
	}
	catch(ignore)
	{
	}
	return false;
}

/******************************************************************************/

function showMsg(msg)
{
	if(isMediaCenter())
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

	if(isMediaCenter())
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

function ltrim(str)
{
	if(!isString(str))
		return str;

	return str.replace( /^\s*/, "" )
}

/******************************************************************************/

function rtrim(str)
{
	if(!isString(str))
		return str;

	return str.replace( /\s*$/, "" );
}

/******************************************************************************/

function trim(str)
{
	return rtrim(ltrim(str));
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

/*void*/ function setStyleProperty(/*object*/ oObj, /*string*/ property, /*strung*/ value)
{
	if(oObj && oObj.style)
		if (oObj.style.setAttribute)	// IE
			oObj.style.setAttribute(property, value);
		else
			oObj.style.setProperty(property, value, "");
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
		lhs = (new Date(0));
	if(!rhs)
		rhs = (new Date(0));

	if(lhs.getTime() == rhs.getTime())
		return 0;
	if(lhs.getTime() < rhs.getTime())
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
/* Debugger.js */

/******************************************************************************/
/******************************************************************************/

var gDebuggerID = "Debugger";
var gDebugOutID = "Debugger_Out";
var gDebugOn = false;
var gDebugLines = new Array();
var gDebugCount = 0;

/******************************************************************************/

function DebugOn(on)
{
	gDebugOn = on ? true : false;

	setStyleDisplay(document.getElementById(gDebuggerID), gDebugOn);
}

function DebugOut(msg)
{
	try
	{
		if(!gDebugOn)
			return;

		gDebugCount++;
		gDebugLines.push("" + gDebugCount + ": " + msg);
		if(gDebugLines.length > 35)
			gDebugLines.splice(0, 1);

		var txt = "";
		for(var i = 0; i < gDebugLines.length; i++)
			txt += gDebugLines[i] + "<br>";

		document.getElementById(gDebugOutID).innerHTML = txt;
	}
	catch(e)
	{
	}
}

/******************************************************************************/

function DebugShow()
{
	var obj = document.getElementById(gDebugOutID);
	setStyleDisplay(obj, (obj.style.display == 'none'));
}

/******************************************************************************/

function DebugClear()
{
	gDebugLines = new Array();
	gDebugCount = 0;
	document.getElementById(gDebugOutID).innerHTML = "";
}

/******************************************************************************/
/******************************************************************************/
/* DateTimeUtil.js */

/******************************************************************************/
/******************************************************************************/


/* DateTimeFormat */
var dtf_ISO8601_Date = 0;			// CCYY-MM-DD
var dtf_ISO8601_DateTime = 1;		// CCYY-MM-DDThh:mm:ss
//var dtf_M_D_YY = 2;				// 2/3/04
var dtf_M_D_YYYY = 3;				// 2/3/2004
var dtf_M_YY = 4;					// 2/04
var dtf_M_D = 5;					// 2/3
//var dtf_M_D_YYYY_H_MM_AM = x;		// 2/3/2004 1:05 PM
//var dtf_M_D_YYYY_H_MM_SS_AM = x;	// 2/3/2004 1:05:07 PM
var dtf_M_D_H_MM_AM = 7;			// 2/3 1:05 PM
//var dtf_H_AM = 8;					// 1 PM
var dtf_Ha = 9;						// 1p
//var dtf_H_MM_AM = 10;				// 1:05 PM
var dtf_H_MMa = 11;					// 1:05p

var DateSeparator = "/";
var TimeSeparator = ":";

var DaysOfWeekShort = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
var DaysOfWeekLong = new Array("Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday");

var MillsPerDay = (24 * 60 * 60 * 1000);

/******************************************************************************/

/*Date*/ function today()
{
	return dateOnly(new Date());
}

/******************************************************************************/

/*Date*/ function now()
{
	return new Date();
}

/******************************************************************************/

/*Date*/ function dateOnly(dateTime)
{
	if(!isDate(dateTime))
		return null;

	var year = dateTime.getFullYear();
	var month = dateTime.getMonth();
	var day = dateTime.getDate();

	return new Date(year, month, day);
}

/******************************************************************************/

/*string*/ function dateTimeToString(/*Date*/ dateTime, /*DateTimeFormat*/ format, /*boolean*/ showInUTC)
{
	if(!isDate(dateTime))
		return "";

	var year;
	var month;
	var day;
	var hour;
	var minute;
	var secs;
	var isPM;
	var timeStr;
	var minStr;

	if((format == dtf_ISO8601_Date) || (format == dtf_ISO8601_DateTime))
		showInUTC = true;

	if(showInUTC)
	{
		year = dateTime.getUTCFullYear();
		month = dateTime.getUTCMonth() + 1;
		day = dateTime.getUTCDate();

		hour = dateTime.getUTCHours();
		minute = dateTime.getUTCMinutes();
		secs = dateTime.getUTCSeconds();
	}
	else
	{
		year = dateTime.getFullYear();
		month = dateTime.getMonth() + 1;
		day = dateTime.getDate();

		hour = dateTime.getHours();
		minute = dateTime.getMinutes();
		secs = dateTime.getSeconds();
	}

	isPM = (hour >= 12);
	if(format != dtf_ISO8601_DateTime)
	{
	if(hour == 0)
		hour = 12;
	else if(hour > 12)
		hour -= 12;
	}

	minStr = prefixZeroToNum(minute);

	switch(format)
	{
		case dtf_ISO8601_Date:
			timeStr = year + "-" + prefixZeroToNum(month) + "-" + prefixZeroToNum(day);
			break;

		case dtf_ISO8601_DateTime:
			timeStr = year + "-" + prefixZeroToNum(month) + "-" + prefixZeroToNum(day) + "T" + prefixZeroToNum(hour)
				+ ":" + minStr + ":" + prefixZeroToNum(secs) + "Z";
			break;

		case dtf_M_D_YYYY:
			timeStr = month + DateSeparator + day + DateSeparator + year;
			break;

		case dtf_M_YY:
			timeStr = month + DateSeparator + (((year % 100) < 10) ? "0" : "") + (year % 100);
			break;

		case dtf_M_D:
			timeStr = month + DateSeparator + day;
			break;

		case dtf_M_D_H_MM_AM:
			timeStr = month + DateSeparator + day + " " + hour + TimeSeparator + minStr + " " + getAMPM(isPM, true);
			break;

		case dtf_Ha:
			timeStr = hour + getAMPM(isPM, false);
			break;

		case dtf_H_MMa:
			timeStr = hour + TimeSeparator + minStr + getAMPM(isPM, false);
			break;
	}

	return timeStr;
}

/******************************************************************************/

/*string*/ function dayOfWeekToString(/*int*/ dayOfWeek, /*bool*/ longFormat)
{
	return (longFormat) ? DaysOfWeekLong[dayOfWeek] : DaysOfWeekShort[dayOfWeek];
}

/******************************************************************************/

/*string*/ function getAMPM(/*bool*/ isPM, /*bool*/ longFormat)
{
	if(isPM)
		return (longFormat) ? "pm" : "p";
	return (longFormat) ? "am" : "a";
}

/******************************************************************************/

/*string*/ function prefixZeroToNum(/*int*/ num)
{
	if(num < 10)
		return "0" + num;

	return "" + num;
}

/******************************************************************************/

/*Date*/ function ISO8601DateFromString(/*string*/ value)
{
	if(!testStrHasLen(value))
		return null;

	var parts = value.split("-");
	if(parts.length == 3)
	{
		var year = parseInt(parts[0], 10);
		var month = parseInt(parts[1], 10);
		var day = parseInt(parts[2], 10);

		return new Date(Date.UTC(year, month - 1, day));
	}

	throw "ISO8601DateFromString: cannot parse date(" + value + ")";
}

/******************************************************************************/

/*Date*/ function ISO8601DateTimeFromString(/*string*/ value)
{
	if(!testStrHasLen(value))
		return null;

	var year = 0;
	var month = 0;
	var day = 0;

	var parts = value.split("T");
	if(parts.length == 1)
	{
		return ISO8601DateFromString(value);
	}
	else if(parts.length == 2)
	{
		var datePart = ISO8601DateFromString(parts[0]);
		var timePart = ISO8601TimeFromString(parts[1]);

		var dateValue = new Date(0);
		dateValue.setTime(datePart.getTime() + timePart);
		return dateValue;
	}

	throw "ISO8601DateTimeFromString: cannot parse date(" + value + ")";
}

/******************************************************************************/

/*int ticks*/ function ISO8601TimeFromString(/*string*/ value)
{
	if(!testStrHasLen(value))
		return 0;

	if(value.length >= 8)
	{
		var timeZoneTicks = 0;

		if(value.length > 8)
			timeZoneTicks = ISO8601TimeZoneFromString(value.substr(8));

		var timePart = value.substr(0,8);
		var parts = value.substr(0,8).split(":");
		if(parts.length == 3)
		{
			var hour = parseInt(parts[0], 10);
			var minute = parseInt(parts[1], 10);
			var second = parseInt(parts[2], 10);

			return (hour * 3600000) + (minute * 60000) + (second * 1000) + timeZoneTicks;
		}

	}

	throw "ISO8601TimeFromString: cannot parse time(" + value + ")";
}

/******************************************************************************/

/*int ticks*/ function ISO8601TimeZoneFromString(/*string*/ value)
{
	if(!testStrHasLen(value))
		return 0;

	if(value.length == 1)
	{
		if(value == "Z")
			return 0;
	}
	else if(value.length == 6)
	{
		var parts = value.substr(1,5).split(":");
		if(parts.length == 2)
		{
			var hour = parseInt(parts[0], 10);
			var minute = parseInt(parts[1], 10);

			var tzValue = (hour * 3600000) + (minute * 60000);

			if(value.substr(0,1) == "-")
				return tzValue;
			if(value.substr(0,1) == "+")
				return tzValue * -1;
		}
	}

	return 0;
}

/******************************************************************************/
/******************************************************************************/
/* Cookie.js */

/******************************************************************************/
/******************************************************************************/

function setCookie(name, value, sessionOnly, expires, path, domain, secure)
{
	var tenYearExpires = new Date((new Date()).getTime() + 315360000000);	//expires in 10 years

	var curCookie = name + "=" + encodeURIComponent(value);

	if(!sessionOnly)
		curCookie += ("; expires=" + ((expires)
			? expires.toGMTString() : tenYearExpires.toGMTString()));

	curCookie += "; path=" + ((path) ? path : "/")
		+ ((domain) ? "; domain=" + domain : "")
		+ ((secure) ? "; secure" : "");

	document.cookie = curCookie;
}

/******************************************************************************/

function getCookie(name)
{
	var dc = document.cookie;
	var prefix = name + "=";

	var begin = dc.indexOf("; " + prefix);
	if(begin == -1)
	{
		begin = dc.indexOf(prefix);
		if (begin != 0)
			return null;
	}
	else
		begin += 2;

	var end = document.cookie.indexOf(";", begin);
	if(end == -1)
		end = dc.length;

	return decodeURIComponent(dc.substring(begin + prefix.length, end));
}

/******************************************************************************/

function deleteCookie(name, path, domain)
{
	if(getCookie(name))
	{
		var delCookie = name + "="
			+ "; path=" + ((path) ? path : "/")
			+ ((domain) ? "; domain=" + domain : "")
			+ "; expires=" + (new Date(0)).toGMTString();

		document.cookie = delCookie;
	}
}

/******************************************************************************/
/******************************************************************************/
/* NameValuePair.js */

/******************************************************************************/
/******************************************************************************/

function NameValuePair(name, value)
{
	this.Name = null;
	this.Value = null;

	if(testStrHasLen(name))
		this.Name = name;
	if(testStrHasLen(value))
		this.Value = value;
}

/******************************************************************************/
/******************************************************************************/
/* NameValuePairCmpr.js */

/******************************************************************************/
/******************************************************************************/

function NameValuePairCmpr(/*string*/ name)
{
	this.Name = name;
}

/******************************************************************************/

/*int*/ NameValuePairCmpr.prototype.compare = function(oNameValuePair)
{
	if(this.Name == oNameValuePair.Name)
		return 0;
	if(this.Name < oNameValuePair.Name)
		return -1;
	return 1;
}

/******************************************************************************/
/******************************************************************************/
/* Money.js */

/******************************************************************************/
/******************************************************************************/

var CurrencyIDMaxLength = 3;

var cur_USD = "USD";

/******************************************************************************/

function Money(reader)
{
	this.CurrencyID = null;
	this.Amount = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Money.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.CurrencyID = reader.readString("CurrencyID", CurrencyIDMaxLength);
	this.Amount = reader.readDouble("Amount");
}

/******************************************************************************/

/*void*/ Money.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("CurrencyID", this.CurrencyID, CurrencyIDMaxLength);
	writer.writeDouble("Amount", this.Amount);
}

/******************************************************************************/
/******************************************************************************/
/* MediaCenter.js */

/******************************************************************************/
/******************************************************************************/

function IsMCEEnabled()
{
	return true;
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
/* MainApp.js */

/******************************************************************************/
/******************************************************************************/

/* Event Keys */
var ek_Backspace = 8;
var ek_Tab = 9;
var ek_Select = 256;
var ek_Back = 257;
var ek_NextValue = 258;
var ek_PrevValue = 259;
var ek_UpButton = 260;
var ek_DownButton = 261;
var ek_LeftButton = 262;
var ek_RightButton = 263;
var ek_PageUp = 264;
var ek_PageDown = 265;

/* Colors */
var g_Color_White = "#F0F0F0";
var g_Color_Black = "#101010";

/******************************************************************************/

var gMainApp = null;

/******************************************************************************/
/******************************************************************************/

function onRemoteEvent(keyCode)
{
	// for the numerics on the Remote, MCE returns both "keypress" and "onremote" events, causing double chars.
	// so "eat" the numerics from the Remote, they'll be handled by "keypress" event.
	if((keyCode >= 48) && (keyCode <= 57))
		return true;

	return !MainAppOnRemoteEvent(keyCode);
}

/******************************************************************************/

function onScaleEvent(vScale)
{
	if(!isMediaCenter())
		document.getElementById("ScaleText").innerHTML = vScale;
	if(isString(document.body.style.zoom))
		document.body.style.zoom = vScale;
}

/******************************************************************************/

function DoScale()
{
	MainApp.getThe().onScale();
}

/******************************************************************************/

function DoShowSVP(show)
{
	var oDiv = document.getElementById("SVP");
	var oLink = document.getElementById("ShowSVPLink");
	var oBlockTop = document.getElementById("MCEBlock_Top");
	var oBlockBottom = document.getElementById("MCEBlock_Bottom");

	if(show == undefined)
		show = oDiv.style.display == "none";

	setStyleDisplay(oDiv, show);
	oLink.innerHTML = show ? "Hide SVP" : "Show SVP";
	setStyleDisplay(oBlockTop, show);
	setStyleDisplay(oBlockBottom, show);
}

/******************************************************************************/
/******************************************************************************/

MainApp.getThe = function()
{
	if(gMainApp == null)
		gMainApp = new MainApp();
	return gMainApp;
}

/******************************************************************************/

function MainApp()
{
	this.fInit = false;
	this.fScreenList = new Array();
	this.fSession = Session.newInstance();
	this.fMainTable = null;
	this.fScreenTitle = null;
	this.fScreenTitleImageDiv = null;
	this.fScreenTitleImage = null;
	this.fFirstMouseMove = false;
}

/******************************************************************************/
/******************************************************************************/

/*void*/ MainApp.prototype.reset = function()
{
	this.closeAllScreens();
	this.fSession = Session.newInstance();
	StartScreen.newInstance();
}

/******************************************************************************/

/*void*/ MainApp.prototype.init = function()
{
	if(this.fInit)
		return;
	this.fInit = true;
	//DebugOn(true);

	document.onkeyup = MainAppOnKeyUp;
	document.onkeydown = MainAppOnKeyDown;
	document.onkeypress = MainAppOnKeyPress;
	window.onresize = MainAppOnResize;

	if(isMediaCenter())
		window.external.MediaCenter.BGColor = "#002651";
	document.body.scroll = "no";
	document.body.focus();

	this.fMainTable = document.getElementById("MainTable");
	this.fScreenTitle = document.getElementById("ScreenTitle");
	this.fScreenTitleImageDiv = document.getElementById("ScreenTitleImageDiv");
	this.fScreenTitleImage = document.getElementById("ScreenTitleImage");

	if(!isMediaCenter())
	{
		DoShowSVP(false);
		setStyleDisplay(document.getElementById("ShowSVPDiv"), true);
		DoScale();
		setStyleDisplay(document.getElementById("ScaleDiv"), true);
	}

	enableErrors(!isMediaCenter());
	window.setTimeout("MainAppIdle()", 500);
	StartScreen.newInstance();
}

/******************************************************************************/

/*Screen*/ MainApp.prototype.openScreen = function(/*Screen*/ oScreen)
{
	var oCurScreen = null;

	if(this.fScreenList.length > 0)
		oCurScreen = this.fScreenList[this.fScreenList.length - 1];

	this.fScreenList.push(oScreen);

	this.fFirstMouseMove = true;
	this.showScreenTitle(oScreen);
	oScreen.moveTo(this.fMainTable.offsetLeft, this.fMainTable.offsetTop);
	oScreen.show(true);
	oScreen.setFocus(true);

	if(oCurScreen != null)
	{
		oCurScreen.show(false);
		oCurScreen.setFocus(false);
	}

	return oScreen;
}

/******************************************************************************/

/*void*/ MainApp.prototype.closeScreen = function(/*int*/ screenID)
{
	var oScreen;
	var pos = -1;

	// search for screenID, hiding all
	for(var i = 0; i < this.fScreenList.length; i++)
	{
		oScreen = this.fScreenList[i];
		oScreen.show(false);

		if(oScreen.ScreenID == screenID)
			pos = i;
	}

	if(pos >= 0)
		this.fScreenList.splice(pos, 1);

	if(this.fScreenList.length > 0)
	{
		oScreen = this.fScreenList[this.fScreenList.length - 1];
		this.showScreenTitle(oScreen);
		oScreen.show(true);
		oScreen.setFocus(true);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.closeAllScreens = function()
{
	for(var i = this.fScreenList.length - 1; i >= 0; i--)
		this.fScreenList[i].close();
}

/******************************************************************************/

/*Screen*/ MainApp.prototype.findScreen = function(/*string */ screenID)
{
	for(var i = 0; i < this.fScreenList.length; i++)
		if(this.fScreenList[i].ScreenID == screenID)
			return this.fScreenList[i];

	return null;
}

/******************************************************************************/

/*Screen*/ MainApp.prototype.getScreen = function(/*string */ screenID)
{
	var oScreen = this.findScreen(screenID);

	if(oScreen != null)
		return oScreen;

	throw "MainApp.getScreen: can't find screen, ID(" + screenID + ")";
}

/******************************************************************************/

/*void*/ MainApp.prototype.showScreenTitle = function(/*Screen*/ oScreen)
{
	if(oScreen.ScreenTitleImage && (oScreen.ScreenTitleImage.length > 0))
	{
		this.fScreenTitleImage.src = "images/" + oScreen.ScreenTitleImage;
		setStyleDisplay(this.fScreenTitleImageDiv, true);
		setStyleDisplay(this.fScreenTitle, false);
	}
	else
	{
		this.fScreenTitle.innerHTML = oScreen.ScreenTitle;
		setStyleDisplay(this.fScreenTitle, true);
		setStyleDisplay(this.fScreenTitleImageDiv, false);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.onResize = function()
{
	if(this.fScreenList.length > 0)
	{
		var oCurScreen = this.fScreenList[this.fScreenList.length - 1];
		oCurScreen.moveTo(this.fMainTable.offsetLeft, this.fMainTable.offsetTop);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.onScale = function()
{
// scale to the current window size
//		var newScale = (document.body.style.zoom.length > 0)
//			? ((document.body.style.zoom * document.body.clientWidth) / 1024)
//			: (document.body.clientWidth / 1024);
//
//		onScaleEvent(newScale);

	// toggle on scaling on and off
	var newScale = "";

	if(isString(document.body.style.zoom) && (document.body.style.zoom.length == 0))
	{
		var horzScale = document.body.getBoundingClientRect().right / 1024;
		var vertScale = document.body.getBoundingClientRect().bottom / 768;

		newScale = (horzScale > vertScale) ? vertScale : horzScale;
	}

	onScaleEvent(newScale);
	this.onResize();
}

/******************************************************************************/

/*void*/ MainApp.prototype.key = function(/*int*/ keyCode)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];
		var handled = oScreen.key(keyCode);

		// if going back and all screens have been closed, return control to browser
		if((keyCode == ek_Back) && (this.fScreenList.length == 0))
			return false;
		if((keyCode == ek_Backspace) && (this.fScreenList.length == 0))
			return false;

		//IE converts a Backspace into the <Back> button, if we have an open screen, don't pass event to IE
		if((keyCode == ek_Backspace) && (this.fScreenList.length > 0))
			handled = true;
		//IE don't let IE/MCE handle Tab key
		if(keyCode == ek_Tab)
			handled = true;

		if(!handled)
			;	//TODO: beep sound

		return handled;
	}

	return false;
}

/******************************************************************************/

/*void*/ MainApp.prototype.idle = function()
{
	// If fFirstMouseMove has not yet been cleared, clear it.  IE and non full-screen MCE don't get the bogus
	// mouse move events.
	if(this.fFirstMouseMove)
		this.fFirstMouseMove = false;

	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.idle();
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.mouseClick = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.mouseClick(controlID);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.mouseMove = function(/*string*/ controlID)
{
	// One MCX and full-screen MCE at console, a bogus mouse move event if shifting focus to center of screen.
	// Need to "eat" first event, subsequent events are valid.
	if(this.fFirstMouseMove)
	{
		this.fFirstMouseMove = false;
		return;
	}

	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.mouseMove(controlID);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.focusEvent = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.focusEvent(controlID);
	}
}


/******************************************************************************/

/*void*/ MainApp.prototype.blurEvent = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.blurEvent(controlID);
	}
}

/******************************************************************************/

/*Session*/ MainApp.prototype.getSession = function()
{
	return this.fSession;
}

/******************************************************************************/
/******************************************************************************/

function MainAppOnKeyDown(evt)
{
	var keyCode = evt ? evt.keyCode : event.keyCode;
	if((keyCode == 8)
			|| (keyCode == 9)
			|| (keyCode == 13)
			|| ((keyCode >= 33) && (keyCode <= 34))
			|| ((keyCode >= 37) && (keyCode <= 40)))
		return MainAppOnRemoteEvent(keyCode);
	return true;
}

/******************************************************************************/

function MainAppOnKeyUp()
{
	return true;
}

/******************************************************************************/

function MainAppOnKeyPress(evt)
{
	var keyCode = evt ? evt.keyCode : event.keyCode;
	if((keyCode != 8)
			&& (keyCode != 9)
			&& (keyCode != 13))
		return MainAppOnRemoteEvent(keyCode);
	return true;
}

/******************************************************************************/

function MainAppOnRemoteEvent(keyCode)
{
	try
	{
		if(!WaitScreen_isOpen())
			return !MainApp.getThe().key(MainAppMapKey(keyCode));
	}
	catch(e)
	{
		showError("MainAppOnRemoteEvent", e);
	}

	return true;
}

/******************************************************************************/

function MainAppMapKey(key)
{
	if(key == 13)
		key = ek_Select;
	else if(key == 166)
		key = ek_Back;
	else if(key == 33)
		key = ek_PageUp;
	else if(key == 34)
		key = ek_PageDown;
	else if(key == 37)
		key = ek_LeftButton;
	else if(key == 38)
		key = ek_UpButton;
	else if(key == 39)
		key = ek_RightButton;
	else if(key == 40)
		key = ek_DownButton;

	return key;
}

/******************************************************************************/

function MainAppIdle()
{
	window.setTimeout("MainAppIdle()", 500);
	try
	{
		MainApp.getThe().idle();
	}
	catch(e)
	{
		showError("MainAppIdle", e);
	}
}

/******************************************************************************/

function MainAppOnMouseClick(evt)
{
	try
	{
		if(!WaitScreen_isOpen())
		{
			var obj = evt ? evt.target : event.srcElement;
			obj = findObjectWithID(obj);
			if(obj != null)
				MainApp.getThe().mouseClick(obj.id);
		}
	}
	catch(e)
	{
		showError("MainAppOnMouseClick", e);
	}
}

/******************************************************************************/

function MainAppOnMouseOver(evt)
{
	try
	{
		var obj = evt ? evt.target : event.srcElement;
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().mouseMove(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnMouseOver", e);
	}
}

/******************************************************************************/

function MainAppOnFocus(evt)
{
	try
	{
		var obj = evt ? evt.target : event.srcElement;
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().focusEvent(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnFocus", e);
	}
}

/******************************************************************************/

function MainAppOnBlur(evt)
{
	try
	{
		var obj = evt ? evt.target : event.srcElement;
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().blurEvent(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnBlur", e);
	}
}

/******************************************************************************/

function MainAppOnResize()
{
	try
	{
		MainApp.getThe().onResize();
	}
	catch(e)
	{
		showError("MainAppOnMouseOver", e);
	}
}

/******************************************************************************/
/******************************************************************************/
/* Screen */

/******************************************************************************/
/******************************************************************************/

function Screen()
{
	this.ScreenID = null;
	this.ScreenTitle = "";
	this.ScreenTitleImage = "";
	this.fContainerControl = null;
}

/******************************************************************************/

/*booealn*/ Screen.prototype.isOpen = function()
{
	return (MainApp.getThe().findScreen(this.ScreenID) != null);
}

/******************************************************************************/

/*void*/ Screen.prototype.close = function()
{
	MainApp.getThe().closeScreen(this.ScreenID);
}

/******************************************************************************/

/*void*/ Screen.prototype.newControl = function(oControl)
{
	this.fContainerControl.newControl(oControl);
}

/******************************************************************************/

/*Control*/ Screen.prototype.findControl = function(/*string*/ controlID)
{
	if(this.fContainerControl != null)
		return this.fContainerControl.findControl(controlID);
	return null;
}

/******************************************************************************/

/*Control*/ Screen.prototype.getControl = function(/*string*/ controlID)
{
	return this.fContainerControl.getControl(controlID);
}

/******************************************************************************/

/*Control*/ Screen.prototype.deleteControl = function(/*string*/ controlID)
{
	return this.fContainerControl.deleteControl(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.moveTo = function(/*int*/ left, /*int*/ top)
{
	this.fContainerControl.moveTo(left, top);
}

/******************************************************************************/

/*void*/ Screen.prototype.show = function(show)
{
	this.fContainerControl.show(show);
}

/******************************************************************************/

/*void*/ Screen.prototype.setFocus = function(/*boolean*/ set)
{
	this.fContainerControl.setFocus(set);
}

/******************************************************************************/

/*void*/ Screen.prototype.focusControl = function(/*string*/ controlID, /*boolean*/ set)
{
	this.fContainerControl.focusControl(controlID, set);
}

/******************************************************************************/

/*boolean*/ Screen.prototype.key = function(/*int*/ keyCode)
{
	if(this.fContainerControl.key(keyCode))
		return true;

	if((keyCode == ek_Back) || (keyCode == ek_Backspace))
	{
		this.close();
		return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ Screen.prototype.idle = function()
{
	this.fContainerControl.idle();
}

/******************************************************************************/

/*void*/ Screen.prototype.mouseClick = function(/*string*/ controlID)
{
	this.fContainerControl.mouseClick(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
	this.fContainerControl.mouseMove(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.focusEvent = function(/*string*/ controlID)
{
	this.fContainerControl.focusEvent(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.blurEvent = function(/*string*/ controlID)
{
	this.fContainerControl.blurEvent(controlID);
}

/******************************************************************************/

/*void*/ Screen.prototype.onButton = function(/*string*/ controlID)
{
	// default action is to proceed to the next field
	this.key(ek_DownButton);
}

/******************************************************************************/

/*void*/ Screen.prototype.onFocus = function(/*string*/ controlID)
{
}

/******************************************************************************/

/*void*/ Screen.prototype.onListItem = function(/*string*/ controlID)
{
}

/******************************************************************************/
/******************************************************************************/
/* Control */

/******************************************************************************/
/******************************************************************************/

function Control()
{
	this.ControlID = null;
	this.ScreenID = null;
	this.fUIObj = null;
	this.fEnabled = true;
	this.fFocused = false;
}

/******************************************************************************/

/*Screen*/ Control.prototype.getScreen = function()
{
	return MainApp.getThe().getScreen(this.ScreenID);
}

/******************************************************************************/

/*void*/ Control.prototype.show = function(show)
{
	setStyleDisplay(this.fUIObj, show);
}

/******************************************************************************/

/*boolean*/ Control.prototype.isEnabled = function() { return this.fEnabled; }

/******************************************************************************/

/*void*/ Control.prototype.setEnabled = function(/*boolean*/ enable)
{
	this.fEnabled = enable;
}

/******************************************************************************/

/*boolean*/ Control.prototype.canFocus = function() { return this.fEnabled; }

/******************************************************************************/

/*boolean*/ Control.prototype.hasFocus = function() { return this.fFocused; }

/******************************************************************************/

/*void*/ Control.prototype.setFocus = function(/*boolean*/ set)
{
}

/******************************************************************************/

/*boolean*/ Control.prototype.hasControl = function(/*string*/ controlID)
{
	return this.ControlID == controlID;
}

/******************************************************************************/

/*boolean*/ Control.prototype.key = function(/*int*/ key)
{
	return false;
}

/******************************************************************************/

/*void*/ Control.prototype.idle = function()
{
}

/******************************************************************************/

/*void*/ Control.prototype.mouseClick = function(/*string*/ controlID)
{
}

/******************************************************************************/

/*void*/ Control.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
}

/******************************************************************************/
/******************************************************************************/
/* ContainerControl.js */

/******************************************************************************/
/******************************************************************************/

function ContainerControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	if(controlID)	// default ctor will be called by inherited objects
		this.init(controlID, left, top);
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.init = function(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	this.ControlID = controlID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ContainerControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fLeft = left;
	this.fTop = top;
	this.fControlArray = new Array();
	this.fFocusedControlPos = -1;
	this.DefaultFocusControlID = null;
	this.onNavigate = new Function("return null;");
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.moveTo = function(/*int*/ left, /*int*/ top)
{
	this.fUIObj.style.left = this.fLeft + left;
	this.fUIObj.style.top = this.fTop + top;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.show = function(show)
{
	setStyleDisplay(this.fUIObj, show);
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.isEnabled = function() { return true; }

/******************************************************************************/

/*void*/ ContainerControl.prototype.newControl = function(oControl)
{
	this.fControlArray[this.fControlArray.length] = oControl;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.hasControl = function(/*string*/ controlID)
{
	if(this.ControlID == controlID)
		return true;

	return (this.findControl(controlID) != null);
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.findControl = function(controlID)
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.hasControl(controlID))
			return oControl;
	}

	return null;
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.findControlPos = function(controlID)
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.hasControl(controlID))
			return i;
	}

	return -1;
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.getControl = function(controlID)
{
	var oControl = this.findControl(controlID);

	if(oControl != null)
		return oControl;

	throw "ContainerControl.getControl: Invalid ControlID(" + controlID + ")";
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.deleteControl = function(controlID)
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.ControlID == controlID)
		{
			this.fControlArray.splice(i, 1);
			if(this.fFocusedControlPos >= this.fControlArray.length)
				this.fFocusedControlPos = this.fControlArray.length - 1;
			return;
		}
	}

	throw "ContainerControl.deleteControl: Invalid ControlID(" + controlID + ")";
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.loadData = function(/*object*/ oData)
{
	return true;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.unloadData = function(/*object*/ oData)
{
	return true;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.canFocus = function()
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.canFocus())
			return true;
	}

	return false;
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.hasFocus = function()
{
	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];
		if(oControl.hasFocus())
			return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.setFocus = function(/*boolean*/ set, /*string*/ controlID)
{
	var oControl;

	// was a control ID specified
	if(controlID)
	{
		if(this.ControlID != controlID)
		{
			oControl = this.findControl(controlID)
			if(oControl != null)
				this.focusControl(controlID, set);
		}
		return;
	}

	// does any control already has the focus?
	oControl = this.findFocusedControl();
	if(oControl != null)
	{
		if(oControl.canFocus())		// check canFocus in case control became disabled
		{
			oControl.setFocus(set);
			return;
		}
		this.fFocusedControlPos = -1;	// clear focused control
	}

	// was a "default" control specified?
	if(this.DefaultFocusControlID)
	{
		oControl = this.findControl(this.DefaultFocusControlID);
		if(oControl != null)
		{
			if(oControl.canFocus())		// check canFocus in case control became disabled
			{
				this.focusControl(this.DefaultFocusControlID, set);
				return;
			}
		}
	}

	// if setting, give first child the focus
	if(set)
	{
		for(var i = 0; i < this.fControlArray.length; i++)
		{
			oControl = this.fControlArray[i];
			if(oControl.canFocus())
			{
				this.focusControl(oControl.ControlID, true);
				break;
			}
		}
	}
}

/******************************************************************************/

/*Control*/ ContainerControl.prototype.findFocusedControl = function()
{
	if(this.fFocusedControlPos >= 0)
		return this.fControlArray[this.fFocusedControlPos];

	return null;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.focusControl = function(/*string*/ controlID, /*boolean*/ set)
{
	var oControl;
	var pos;

	pos = this.findControlPos(controlID);
	if(pos < 0)
		return;
	oControl = this.fControlArray[pos];
	if(!oControl.canFocus())
		return;

	if(set)
	{
		if(this.fFocusedControlPos >= 0)
			this.fControlArray[this.fFocusedControlPos].setFocus(false);

		this.fFocusedControlPos = pos;
		oControl.setFocus(true);
	}
	else
		oControl.setFocus(false);
}

/******************************************************************************/

/*boolean*/ ContainerControl.prototype.key = function(/*int*/ keyCode)
{
	var oCurControl = null;
	var focusedPos = this.fFocusedControlPos;
	var nextfocusPos = -1;

	if(focusedPos != -1)
	{
		oCurControl = this.fControlArray[focusedPos];
		if(oCurControl.key(keyCode))
			return true;

		var nextControlID = this.onNavigate(oCurControl.ControlID, keyCode);
		if(nextControlID != null)
			nextfocusPos = this.findControlPos(nextControlID);
	}

	if(nextfocusPos == -1)
	{
		if((keyCode == ek_DownButton) || (keyCode == ek_Tab))
		{
			for(var i = focusedPos + 1; i < this.fControlArray.length; i++)
				if(this.fControlArray[i].canFocus())
				{
					nextfocusPos = i;
					break;
				}
		}

		if(keyCode == ek_UpButton)
		{
			for(var i = focusedPos - 1; i >= 0; i--)
				if(this.fControlArray[i].canFocus())
				{
					nextfocusPos = i;
					break;
				}
		}
	}

	if(nextfocusPos != -1)
	{
		if(oCurControl != null)
			oCurControl.setFocus(false);
		this.fFocusedControlPos = nextfocusPos;
		this.fControlArray[nextfocusPos].setFocus(true);
		return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.idle = function()
{
	var focusedPos = this.fFocusedControlPos;
	if(focusedPos != -1)
		(this.fControlArray[focusedPos]).idle();
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.mouseClick = function(/*string*/ controlID)
{
	var oControl = this.findControl(controlID);

	if((oControl != null) && oControl.isEnabled())
		oControl.mouseClick(controlID);
}

/******************************************************************************/

//TODO: needs to recursively setFocus()
/*void*/ ContainerControl.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
/*
	if(buttonDown)
		return;
*/

	var oControl;

	for(var i = 0; i < this.fControlArray.length; i++)
	{
		oControl = this.fControlArray[i];

		if (oControl.hasControl(controlID))
		{
			if(oControl.canFocus())
			{
				var oFocusedControl = this.findFocusedControl();

				if(!oControl.hasFocus() || (oFocusedControl == null)
					|| (oFocusedControl.ControlID != oControl.ControlID))
				{
					if((oFocusedControl != null)
							&& (oFocusedControl.ControlID != oControl.ControlID))
						oFocusedControl.setFocus(false);

					this.fFocusedControlPos = i;
					oControl.setFocus(true);
				}
			}
			oControl.mouseMove(/*bool buttonDown,*/ controlID)

			return;
		}
	}
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.focusEvent = function(/*string*/ controlID)
{
	var oControl = this.findControl(controlID);
	if((oControl != null) && oControl.canFocus())
		this.setFocus(true, controlID);
}

/******************************************************************************/

/*void*/ ContainerControl.prototype.blurEvent = function(/*string*/ controlID)
{
	var oControl = this.findControl(controlID);
	if((oControl != null) && oControl.canFocus())
		this.setFocus(false, controlID);
}

/******************************************************************************/
/******************************************************************************/
/* ButtonControl */

/******************************************************************************/
/******************************************************************************/

ButtonControl.prototype = new Control();
ButtonControl.prototype.constructor = ButtonControl;

/******************************************************************************/

function ButtonControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ButtonControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fUIObj.onmouseover = MainAppOnMouseOver;
	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;

	this.fFocused = false;

	this.setFocus(false);
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setText = function(/*string*/ text)
{
	this.fUIObj.innerHTML = text;
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setEnabled = function(/*boolean*/ enable)
{
	this.fEnabled = enable;
	checkClassName(this.fUIObj, this.fEnabled ? (this.fFocused ? 'hilite' : 'normal') : 'disabled');
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.setFocus = function(/*boolean*/ set)
{
	var wasFocused = this.fFocused;
	checkClassName(this.fUIObj, set ? 'hilite' : 'normal');
	this.fFocused = set;
	if(set)
	{
		if(document.activeElement.id != this.fUIObj.id)
			this.fUIObj.focus();

		if(!wasFocused)
			this.getScreen().onFocus(this.ControlID);
	}
}

/******************************************************************************/

/*boolean*/ ButtonControl.prototype.key = function(/*int*/ key)
{
	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}

	return Control.prototype.key.call(this, key);
}

/******************************************************************************/

/*void*/ ButtonControl.prototype.mouseClick = function(/*string*/ controlID)
{
	this.getScreen().onButton(this.ControlID);
}

/******************************************************************************/
/******************************************************************************/
/* EditControl */

/******************************************************************************/
/******************************************************************************/

/* EditControlType */
var ect_AlphaNumeric = 0;		// all upper and lower A - Z and 0 - 9
var ect_UpperAlphaNumeric = 1;	// upper only A - Z and 0 - 9
var ect_Numeric = 2;			// only 0 - 9

/******************************************************************************/

EditControl.AlphaNumericValidCharArray = null;
EditControl.UpperAlphaNumericValidCharArray = null;
EditControl.NumericValidCharArray = null;
EditControl.TripleTapKeyArray = null;

/******************************************************************************/

EditControl.prototype = new Control();
EditControl.prototype.constructor = EditControl;

/******************************************************************************/

function EditControl(/*string*/ controlID, /*string*/ screenID, /*int*/ viewableChars)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "EditControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fUIObj.onmouseover = MainAppOnMouseOver;
	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;
	this.fFocused = false;

	this.Type = ect_Numeric;
	this.fText = new Array();

	this.fViewableChars = viewableChars;
	this.fFirstPos = 0;
	this.fCurPos = -1;
	this.fNextTTKeyTime = -1;
	this.MaxLength = 25;
	this.AutoButton = false;

	this.setFocus(false);
}

/******************************************************************************/

/*string*/ EditControl.prototype.getText = function()
{
	var txt = "";

	for(var i = 0; i < this.fText.length; i++)
		txt += this.fText[i];

	return txt;
}

/******************************************************************************/

/*Array*/ EditControl.prototype.getValidCharArray = function(/*EditControlType*/ editControlType)
{
	var invalidAlphaUpper = false;
	var invalidAlphaLower = false;
	var includeNumeric = false;
	var includeSpecial = false;

	if(editControlType == ect_AlphaNumeric)
	{
		if(EditControl.AlphaNumericValidCharArray != null)
			return EditControl.AlphaNumericValidCharArray;

		invalidAlphaUpper = true;
		invalidAlphaLower = true;
		includeNumeric = true;
		includeSpecial = true;
	}
	else if(editControlType == ect_UpperAlphaNumeric)
	{
		if(EditControl.UpperAlphaNumericValidCharArray != null)
			return EditControl.UpperAlphaNumericValidCharArray;

		invalidAlphaUpper = true;
		includeNumeric = true;
		includeSpecial = true;
	}
	else if(editControlType == ect_Numeric)
	{
		if(EditControl.NumericValidCharArray != null)
			return EditControl.NumericValidCharArray;

		includeNumeric = true;
	}
	else
		throw "EditControl.getValidCharArray: Invalid fType(" + editControlType + ")";

	var arr;
	var ch;

	arr = new Array();

	if(invalidAlphaUpper)
	{
		for(ch = 65; ch <= 90; ch++)
			arr.push(ch);
	}
	if(invalidAlphaLower)
	{
		for(ch = 97; ch <= 122; ch++)
			arr.push(ch);
	}
	if(includeNumeric)
	{
		for(ch = 48; ch <= 57; ch++)
			arr.push(ch);
	}
	if(includeSpecial)
	{
		arr.push(32);	// space
		arr.push(64);	// @
		arr.push(46);	// .
		arr.push(45);	//-
		arr.push(33);	//!
		arr.push(34);	//"
		arr.push(35);	//#
		arr.push(36);	//$
		arr.push(37);	//%
		arr.push(38);	//&
		arr.push(39);	//'
		arr.push(40);	//(
		arr.push(41);	//)
		arr.push(42);	//*
		arr.push(43);	//+
		arr.push(44);	//,
		arr.push(47);	///
		arr.push(58);	//:
		arr.push(59);	//;
		arr.push(60);	//<
		arr.push(61);	//=
		arr.push(62);	//>
		arr.push(63);	//?
		arr.push(91);	//[
		arr.push(92);	//\
		arr.push(93);	//]
		arr.push(94);	//^
		arr.push(95);	//_
		arr.push(96);	//`
		arr.push(123);	//{
		arr.push(124);	//|
		arr.push(125);	//}
		arr.push(126);	//~
	}

	if(editControlType == ect_AlphaNumeric)
		EditControl.AlphaNumericValidCharArray = arr;
	else if(editControlType == ect_UpperAlphaNumeric)
		EditControl.UpperAlphaNumericValidCharArray = arr;
	else if(editControlType == ect_Numeric)
		EditControl.NumericValidCharArray = arr;

	return arr;
}

/******************************************************************************/

/*Array*/ EditControl.prototype.getTripleTapKeyArray = function()
{
	if(EditControl.TripleTapKeyArray != null)
		return EditControl.TripleTapKeyArray;

	EditControl.TripleTapKeyArray = new Array();

	/* 0: 0, space */
	EditControl.TripleTapKeyArray.push(new Array(48, 32));

	/* 1: 1, @, ., -, !, ", #, $, %, &, ', (, ), *, +, ,, /, :, ;, <, =, >, ?, [, \. ], ^, _, `, {, |, }, ~ */
	EditControl.TripleTapKeyArray.push(new Array(49, 64, 46, 45, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 47,
		58, 59, 60, 61, 62, 63, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126));

	/* 2: 2, A, B, C, a, b, c */
	EditControl.TripleTapKeyArray.push(new Array(50, 65, 66, 67, 97, 98, 99));

	/* 3: 3, D, E, F, d, e, f */
	EditControl.TripleTapKeyArray.push(new Array(51, 68, 69, 70, 100, 101, 102));

	/* 4: 4, G, H, I, g, h, i */
	EditControl.TripleTapKeyArray.push(new Array(52, 71, 72, 73, 103, 104, 105));

	/* 5: 5, J, K, L, j, k, l */
	EditControl.TripleTapKeyArray.push(new Array(53, 74, 75, 76, 106, 107, 108));

	/* 6: 6, M, N, O, m, n, o */
	EditControl.TripleTapKeyArray.push(new Array(54, 77, 78, 79, 109, 110, 111));

	/* 7: 7, P, Q, R, S, p, q, r, s */
	EditControl.TripleTapKeyArray.push(new Array(55, 80, 81, 82, 83, 112, 113, 114, 115));

	/* 8: 8, T, U, V, t, u, v */
	EditControl.TripleTapKeyArray.push(new Array(56, 84, 85, 86, 116, 117, 118));

	/* 9: 9, W, X, Y, Z, w, x, y, z */
	EditControl.TripleTapKeyArray.push(new Array(57, 87, 88, 89, 90, 119, 120, 121, 122));

	return EditControl.TripleTapKeyArray;
}

/******************************************************************************/

/*boolean*/ EditControl.prototype.isTripleTapKey = function(/*int*/ key)
{
	if(this.Type == ect_Numeric)
		return false;
	return ((key >= 48) && (key <= 57));
}


/******************************************************************************/

/*boolean*/ EditControl.prototype.sameTripleTapKey = function(/*int*/ key, /*int*/ curKey)
{
	if(!this.isTripleTapKey(key))
		return false;

	var ttKeyArray = this.getTripleTapKeyArray()[key - 48];
	return (arrayIndexOf(ttKeyArray, curKey) >= 0);
}


/******************************************************************************/

/*int*/ EditControl.prototype.mapTripleTapKey = function(/*int*/ key, /*int*/ curKey, /*array*/ validCharArray)
{
	if(!this.isTripleTapKey(key))
		return key;

	var ttKeyArray = this.getTripleTapKeyArray()[key - 48];
	var nextKey = -1;
	var curPos;

	while(true)
	{
		curPos = arrayIndexOf(ttKeyArray, curKey)
		if(curPos < 0)
			curKey = ttKeyArray[0];
		else if(curPos < ttKeyArray.length - 1)
			curKey = ttKeyArray[curPos + 1];
		else
			curKey = ttKeyArray[0];

		if(arrayIndexOf(validCharArray, curKey) >= 0)
			return curKey;
	}
}

/******************************************************************************/

/*void*/ EditControl.prototype.setFocus = function(/*boolean*/ set)
{
	checkClassName(this.fUIObj, set ? 'hilite' : 'normal');
	this.fFocused = set;

	if(set)
	{
		if(this.fCurPos == -1)
		{
			var len = this.fText.length;

			if((this.fViewableChars == this.MaxLength) && (len == this.MaxLength))
				this.fCurPos = len - 1;
			else
				this.fCurPos = len;
			this.checkPositions();
		}

		if(document.activeElement.id != this.fUIObj.id)
			this.fUIObj.focus();
	}

	if(!set)
	{
		this.fCurPos = -1;
		this.fFirstPos = 0;
	}

	this.drawChars(set);

	if(set)
		this.getScreen().onFocus(this.ControlID);
}

/******************************************************************************/

/*void*/ EditControl.prototype.checkPositions = function()
{
	var len = this.fText.length;

	if(this.fCurPos < 0)
		this.fCurPos = 0;
	else if(this.fCurPos > len)
		this.fCurPos = len;

	if(this.fCurPos < this.fFirstPos)
		this.fFirstPos = this.fCurPos;
	else if(this.fFirstPos < this.fCurPos - this.fViewableChars + 1)
		this.fFirstPos = this.fCurPos - this.fViewableChars + 1;

	if((this.fFirstPos > 0) & (this.fText.length + 1 <= this.fFirstPos + this.fViewableChars))
	{
		this.fFirstPos = this.fText.length + 1 - this.fViewableChars;
		if(this.fFirstPos < 0)
			this.fFirstPos = 0;
	}
}

/******************************************************************************/

/*void*/ EditControl.prototype.drawChars = function(/*boolean*/ showFocus)
{
	var oUIChar;
	var textLen = this.fText.length;
	var numChars = textLen + 1;
	var focusedChar;
	var ch;

	if(numChars > this.fViewableChars)
		numChars = this.fViewableChars;

	for(var i = 0; i < numChars; i++)
	{
		focusedChar = (showFocus && this.fFocused && (i + this.fFirstPos == this.fCurPos));

		oUIChar = document.getElementById(this.ControlID + "_" + i);
		ch = (i + this.fFirstPos < textLen) ?  this.fText[i + this.fFirstPos] : "";
		if(ch == "<")
			ch = "&lt;";
		else if(ch == "&")
			ch = "&amp;";
		oUIChar.innerHTML = ch; 
		checkClassName(oUIChar, focusedChar ? 'hilite' : 'normal');
	}

	for(i = numChars; i < this.fViewableChars; i++)
	{
		oUIChar = document.getElementById(this.ControlID + "_" + i);
		oUIChar.innerHTML = "";
		checkClassName(oUIChar, 'normal');
	}
}

/******************************************************************************/

/*boolean*/ EditControl.prototype.key = function(/*int*/ key)
{
	var validCharArray = this.getValidCharArray(this.Type);
	var pos;

	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}
//	else if(key == ek_RightButton)
//	{
//		if(this.fCurPos < this.MaxLength - 1)
//		{
//			if(this.fCurPos < this.fText.length)
//			{
//				this.fCurPos++;
//				this.checkPositions();
//				this.drawChars(this.fFocused);
//				return true;
//			}
//			else if((this.fText.length == 0) || (this.fText[this.fText.length - 1] != " "))
//			{
//				// see if spaces are supported, add a space char
//				pos = arrayIndexOf(validCharArray, 32);
//				if(pos >= 0)
//				{
//					this.fText.push(" ");
//					this.fCurPos = this.fText.length;
//					this.checkPositions();
//					this.drawChars(this.fFocused);
//					return true;
//				}
//			}
//		}
//	}
	else if((key == ek_Backspace) || (key == ek_LeftButton))
	{
		if(this.fCurPos > 0)
		{
			if(this.fCurPos >= this.fText.length)
				this.fCurPos--;

			if(this.fCurPos <= this.fText.length)
				this.fText.splice(this.fCurPos, 1);

			this.checkPositions();
			this.drawChars(this.fFocused);
			return true;
		}
		else if (this.fCurPos == 0)
		{
			if(this.fText.length > 0)
			{
				this.fText.splice(0,this.fText.length);
				this.drawChars(this.fFocused);
				return true;
			}
		}
	}

	// force upper case
	if(this.Type == ect_UpperAlphaNumeric)
	{
		if ((key >= 97) && (key <= 122))
			key -= 32;
	}

	var ttKey = key;
	var curKey = 0;
	var isTripleTapKey = this.isTripleTapKey(key);
	if(isTripleTapKey)
	{
		if(this.fCurPos < this.fText.length)
			curKey = this.fText[this.fCurPos].charCodeAt(0);
		key = this.mapTripleTapKey(key, curKey, validCharArray);
		this.fNextTTKeyTime = (new Date()).getTime() + 2000;
	}
	else
		this.fNextTTKeyTime = -1;

	pos = arrayIndexOf(validCharArray, key);
	if(pos >= 0)
	{
		if(isTripleTapKey && !this.sameTripleTapKey(ttKey, curKey))
			if((this.fCurPos < this.fText.length) && (this.fCurPos < this.MaxLength - 1))
				this.fCurPos++;

		if(this.fCurPos >= this.fText.length)
		{
			this.fText.push(" ");
			this.fCurPos = this.fText.length - 1;
		}
		this.fText[this.fCurPos] = String.fromCharCode(key);

		if(this.fCurPos < this.fText.length)
			if(this.fCurPos < this.MaxLength - 1)
				if(!isTripleTapKey)
					this.fCurPos++;
		this.checkPositions();
		this.drawChars(this.fFocused);

		if(this.AutoButton && (this.fText.length == this.MaxLength))
			this.getScreen().onButton(this.ControlID);

		return true;
	}

	return Control.prototype.key.call(this, key);
}

/******************************************************************************/

/*void*/ EditControl.prototype.idle = function()
{
	if((this.fNextTTKeyTime >= 0) && ((new Date()) >= this.fNextTTKeyTime))
	{
		this.fNextTTKeyTime = -1;
		if(this.fCurPos < this.fText.length)
			if(this.fCurPos < this.MaxLength - 1)
			{
				this.fCurPos++;
				this.checkPositions();
				this.drawChars(this.fFocused);
			}
	}
}

/******************************************************************************/
/******************************************************************************/
/* ListControl */

/******************************************************************************/
/******************************************************************************/

ListControl.prototype = new Control();
ListControl.prototype.constructor = ListControl;

/******************************************************************************/

function ListControl(/*string*/ controlID, /*string*/ screenID, /*int*/ numRows,
	/*ListControlRowItemList*/ oRowItemList)
{
	if(controlID)	// default ctor will be called by inherited objects
		this.init(controlID, screenID, numRows, oRowItemList);
}

/******************************************************************************/

/*void*/ ListControl.prototype.init = function(/*string*/ controlID, /*string*/ screenID,
	/*int*/ numRows, /*ListControlRowItemList*/ oRowItemList)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ListControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fUIObj.onmouseover = MainAppOnMouseOver;
	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;
	this.fFocused = false;
	this.fFocusedItem = null;			// focused item, null if no focused item

	this.fRowItemList = oRowItemList;
	this.fRowList = new Array();
	for(var i = 0; i < numRows; i++)
	{
		this.fRowList.push(new ListControlRow(controlID, i, oRowItemList));
	}

	this.fUIUpIconObj = document.getElementById(controlID + "_Up");
	this.fUIUpIconObj.onmouseover = MainAppOnMouseOver;
	this.fUIUpIconObj.onclick = MainAppOnMouseClick;
	this.fUIDownIconObj = document.getElementById(controlID + "_Down");
	this.fUIDownIconObj.onmouseover = MainAppOnMouseOver;
	this.fUIDownIconObj.onclick = MainAppOnMouseClick;
	this.fUICountObj = document.getElementById(controlID + "_Count");

	this.fTopItem = 0;
	this.fBottomItem = -1;

	this.recalcBottomItemFromTopItem();
	this.setFocus(false);
	this.drawItems(false);
	this.drawUpIcon(false);
	this.drawDownIcon(false);
	this.drawCount();
}

/******************************************************************************/

/*void*/ ListControl.prototype.recalcTopItemFromBottomItem = function()
{
	var totalItems = this.getItemCount();

	if(totalItems == 0)
	{
		this.fTopItem = 0;
		this.fBottomItem = -1;
		return;
	}

	if(this.fBottomItem >= totalItems)
		this.fBottomItem = totalItems - 1;

	this.fTopItem = this.fBottomItem - this.fRowList.length + 1;
	if(this.fTopItem < 0)
		this.fTopItem = 0;
}

/******************************************************************************/

/*void*/ ListControl.prototype.recalcBottomItemFromTopItem = function()
{
	var totalItems = this.getItemCount();

	this.fBottomItem = -1;
	if(totalItems == 0)
	{
		this.fTopItem = 0;
		return;
	}

	if(this.fTopItem >= totalItems)
		this.fTopItem = totalItems - 1;

	this.fBottomItem = this.fTopItem + this.fRowList.length - 1;
	if(this.fBottomItem >= totalItems)
		this.fBottomItem = totalItems - 1;
}

/******************************************************************************/

/*void*/ ListControl.prototype.recalcAfterDataChange = function(/*boolrean*/ reset)
{
	if(reset)
	{
		this.fTopItem = 0;
		this.fBottomItem = -1;

		this.recalcBottomItemFromTopItem();
		if(this.getItemCount() > 0)
			this.setFocusedItem(this.fRowList[0]);
	}
	else
	{
		this.recalcTopItemFromBottomItem();
		if((this.fFocusedItem != null) && (this.fBottomItem >= 0) && (this.fFocusedItem.RowIndex > this.fBottomItem))
			this.setFocusedItem(this.fRowList[this.fBottomItem]);
	}
	this.drawItems(true);
	this.drawUpIcon(false);
	this.drawDownIcon(false);
	this.drawCount();
}

/******************************************************************************/

/*ListControlRow*/ ListControl.prototype.findRow = function(controlID)
{
	var oRow;

	for(var i = 0; i < this.fRowList.length; i++)
	{
		oRow = this.fRowList[i];
		if(oRow.hasControl(controlID))
			return oRow;
	}

	return null;
}

/******************************************************************************/

/*int*/ ListControl.prototype.findRowPos = function(controlID)
{
	var oRow;

	for(var i = 0; i < this.fRowList.length; i++)
	{
		oRow = this.fRowList[i];
		if(oRow.hasControl(controlID))
			return i;
	}

	return -1;
}

/******************************************************************************/

/*void*/ ListControl.prototype.setFocus = function(/*boolean*/ set)
{
	var wasFocused = this.fFocused;
	this.fFocused = set;

	if(set && !wasFocused)
		this.getScreen().onFocus(this.ControlID);

	if(set)
	{
		if(this.fFocusedItem != null)
			this.fFocusedItem.setFocus(true);
		else
		{
			if(this.getItemCount() > 0)
				this.setFocusedItem(this.fRowList[0]);
		}
	}
	else
	{
		if(this.fFocusedItem != null)
			this.fFocusedItem.setFocus(false);
	}
}

/******************************************************************************/

/*int*/ ListControl.prototype.getFocusedItemPos = function()
{
	if(this.fFocusedItem != null)
		return this.findRowPos(this.fFocusedItem.ControlID) + this.fTopItem;

	return -1;
}

/******************************************************************************/

/*void*/ ListControl.prototype.setFocusedItem = function(/*ListControlRow*/ oRow)
{
	if(this.fFocusedItem != null)
	{
		if((oRow != null) && (this.fFocusedItem.ControlID == oRow.ControlID))
		{
			this.getScreen().onListItem(this.ControlID);
			return;
		}

		this.fFocusedItem.setFocus(false);
		this.fFocusedItem = null;
	}

	this.fFocusedItem = oRow;
	if(this.fFocusedItem != null)
	{
		this.fFocusedItem.setFocus(true);
		this.getScreen().onListItem(this.ControlID);
	}
}

/******************************************************************************/

/*void*/ ListControl.prototype.setFocusedItemByPos = function(/*int*/ focusedItem)
{
	if((focusedItem >= 0) && (focusedItem < this.getItemCount()))
	{
		if(focusedItem < this.fTopItem)
			focusedItem = this.fTopItem;
		this.recalcBottomItemFromTopItem();

		if(focusedItem > this.fBottomItem)
		{
			this.fBottomItem = focusedItem;
			this.recalcTopItemFromBottomItem();
		}

		this.setFocusedItem(this.fRowList[focusedItem - this.fTopItem]);
		this.drawItems(true);
		this.drawUpIcon(false);
		this.drawDownIcon(false);
		this.drawCount();
	}
}

/******************************************************************************/

/*boolean*/ ListControl.prototype.isUpIconEnabled = function()
{
	return (this.fTopItem > 0);
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawUpIcon = function(/*boolean*/ showFocus)
{
	var enabled = this.isUpIconEnabled();

	checkClassName(this.fUIUpIconObj, enabled ? (showFocus ? 'hilite' : 'normal') : 'disabled');
}

/******************************************************************************/

/*boolean*/ ListControl.prototype.isDownIconEnabled = function()
{
	return (this.fBottomItem < this.getItemCount() - 1);
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawDownIcon = function(/*boolean*/ showFocus)
{
	var enabled = this.isDownIconEnabled();

	checkClassName(this.fUIDownIconObj, enabled ? (showFocus ? 'hilite' : 'normal') : 'disabled');
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawCount = function()
{
	var itemCount = this.getItemCount();
	var current = -1;
	var value = "";

	if(itemCount > 0)
	{
		if(this.fFocusedItem != null)
			current = this.findRowPos(this.fFocusedItem.ControlID) + this.fTopItem + 1;

		if(current == -1)
			current = this.fTopItem + 1;

		value = "" + current + "/" + itemCount;
	}

	this.fUICountObj.innerHTML = value;
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawItems = function(/*boolean*/ showFocus)
{
	//this.recalcBottomItemFromTopItem();

	var rowIndex = 0;
	var oRow;
	var focusedControlID = null;

	if(this.fFocusedItem != null)
		focusedControlID = this.fFocusedItem.ControlID;

	for(var dataIndex = this.fTopItem; dataIndex <= this.fBottomItem; dataIndex++)
	{
		oRow = this.fRowList[rowIndex];
		this.drawItem(dataIndex, oRow);
		if(showFocus && (oRow.ControlID == focusedControlID))
			oRow.setFocus(true);
		else
			oRow.show(true);
		rowIndex++;
	}

	for(; rowIndex < this.fRowList.length; rowIndex++)
	{
		oRow = this.fRowList[rowIndex];
		oRow.clearRowItems();
		oRow.show(false);
	}
}

/******************************************************************************/

/*boolean*/ ListControl.prototype.hasControl = function(/*string*/ controlID)
{
	if(this.ControlID == controlID)
		return true;

	for(var i = 0; i < this.fRowList.length; i++)
		if(this.fRowList[i].hasControl(controlID))
			return true;

	if(this.fUIUpIconObj.id == controlID)
		return true;
	if(this.fUIDownIconObj.id == controlID)
		return true;

	return false;
}


/******************************************************************************/

/*int*/ ListControl.prototype.getItemCount = function()
{
	throw "ListControl.getItemCount: this method should be overridden";
}

/******************************************************************************/

/*void*/ ListControl.prototype.drawItem = function(/*int*/ item, /*ListControlRow*/ oRow)
{
	throw "ListControl.drawItem: this method should be overridden";
}

/******************************************************************************/

/*boolean*/ ListControl.prototype.key = function(/*int*/ key)
{
	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}

	var focusedItem = this.fTopItem - 1;

	if(this.fFocusedItem != null)
		focusedItem = this.findRowPos(this.fFocusedItem.ControlID) + this.fTopItem;

	if(key == ek_DownButton)
	{
		var itemCount = this.getItemCount();

		if(focusedItem < this.getItemCount() - 1)
			focusedItem++;
		else
			return false;

		if(focusedItem > this.fBottomItem)
		{
			this.fBottomItem = focusedItem;
			this.recalcTopItemFromBottomItem();
			this.drawItems(true);
			this.drawUpIcon(false);
			this.drawDownIcon(false);
		}

		this.setFocusedItem((focusedItem >= 0) ? this.fRowList[focusedItem - this.fTopItem] : null);
		this.drawCount();
		return true;
	}

	if(key == ek_UpButton)
	{
		if(focusedItem > 0)
			--focusedItem;
		else
			return false;

		if(focusedItem < this.fTopItem)
		{
			this.fTopItem = focusedItem;
			this.recalcBottomItemFromTopItem();
			this.drawItems(true);
			this.drawUpIcon(false);
			this.drawDownIcon(false);
		}

		this.setFocusedItem((focusedItem >= 0) ? this.fRowList[focusedItem - this.fTopItem] : null);
		this.drawCount();
		return true;
	}

	if(key == ek_PageDown)
	{
		var itemCount = this.getItemCount();
		var pageCount = (this.fBottomItem - this.fTopItem + 1);

		this.fBottomItem += pageCount;
		if(this.fBottomItem >= itemCount)
			this.fBottomItem = itemCount - 1;
		focusedItem += pageCount;
		if(focusedItem >= itemCount)
			focusedItem = itemCount - 1;
		this.recalcTopItemFromBottomItem();

		this.drawItems(true);
		this.drawUpIcon(false);
		this.drawDownIcon(false);
		this.setFocusedItem((focusedItem >= 0) ? this.fRowList[focusedItem - this.fTopItem] : null);
		this.drawCount();

		return true;
	}

	if(key == ek_PageUp)
	{
		var pageCount = (this.fBottomItem - this.fTopItem + 1);

		this.fTopItem -= pageCount;
		if(this.fTopItem < 0)
			this.fTopItem = 0;
		focusedItem -= pageCount;
		if(focusedItem < 0)
			focusedItem = 0;
		this.recalcBottomItemFromTopItem();

		this.drawItems(true);
		this.drawUpIcon(false);
		this.drawDownIcon(false);
		this.setFocusedItem((focusedItem >= 0) ? this.fRowList[focusedItem - this.fTopItem] : null);
		this.drawCount();

		return true;
	}

	return false;
}

/******************************************************************************/

/*void*/ ListControl.prototype.mouseClick = function(/*string*/ controlID)
{
	// check more icons
	if(controlID == this.fUIUpIconObj.id)
	{
		if(this.isUpIconEnabled())
			this.key(ek_PageUp);
		return;
	}

	if(controlID == this.fUIDownIconObj.id)
	{
		if(this.isDownIconEnabled())
			this.key(ek_PageDown);
		return;
	}

	// must be in list row
	var rowPos = this.findRowPos(controlID);
	if((rowPos >= 0) && (rowPos < this.getItemCount()))
		this.getScreen().onButton(this.ControlID);
}

/******************************************************************************/

/*void*/ ListControl.prototype.mouseMove = function(/*bool buttonDown,*/ controlID)
{
	// check rows
	var rowPos = this.findRowPos(controlID);
	if((rowPos >= 0) && (rowPos < this.getItemCount()))
	{
		this.setFocusedItem(this.fRowList[rowPos]);
		this.drawUpIcon(false);
		this.drawDownIcon(false);
		this.drawCount();
		return;
	}

	// check more icons
	this.drawUpIcon(controlID == this.fUIUpIconObj.id);
	this.drawDownIcon(controlID == this.fUIDownIconObj.id);
}

/******************************************************************************/
/******************************************************************************/
/* ListControlRow */

/******************************************************************************/
/******************************************************************************/

function ListControlRow(/*string*/ controlID, /*int*/ rowIndex,
	/*ListControlRowItemList*/ oRowItemList)
{
	this.ControlID = controlID + "_" + new String(rowIndex);
	this.RowIndex = rowIndex;
	this.fUIObj = document.getElementById(this.ControlID);
	if(this.fUIObj == null)
		throw "ListControlRow::ctor(controlID): Can't find UI object, ID(" + this.ControlID + ")";

	var oRowItem;
	var oUIObj;

	this.fRowItemList = oRowItemList;
	for(var i = 0; i < this.fRowItemList.length; i++)
	{
		oRowItem = this.fRowItemList[i];
		controlID = this.getRowItemControlID(i);
		oUIObj = document.getElementById(controlID);
		if(oUIObj == null)
			throw "ListControlRow::ctor(controlID): Can't find UI object, ID(" + controlID + ")";

		oUIObj.style.width = oRowItem.Width;
		checkClassName(oUIObj, 'normal');
	}
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.setFocus = function(/*boolean*/ set)
{
	checkClassName(this.fUIObj, set ? 'hilite' : 'normal');

	for(var i = 0; i < this.fRowItemList.length; i++)
		this.focusRowItem(i, set);

	if(set)
		if(document.activeElement.id != this.fUIObj.id)
			this.fUIObj.focus();
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.show = function(/*boolean*/ show)
{
	checkClassName(this.fUIObj, show ? 'normal' : 'hide');
}

/******************************************************************************/

/*boolean*/ ListControlRow.prototype.hasControl = function(/*string*/ controlID)
{
	if(this.ControlID == controlID)
		return true;

	for(var i = 0; i < this.fRowItemList.length; i++)
		if(this.getRowItemControlID(i) == controlID)
			return true;

	return false;
}

/******************************************************************************/

/*string*/ ListControlRow.prototype.getRowItemControlID = function(/*int*/ rowItemIndex)
{
	if(rowItemIndex >= this.fRowItemList.length)
		throw "ListControlRow::getRowItemControlID: rowItemIndex(" + rowItemIndex + ") >= this.fRowItemList.length(" + this.fRowItemList.length + ")";

	var oRowItem = this.fRowItemList[rowItemIndex];
	return this.ControlID + "_" + oRowItem.Name;
}

/******************************************************************************/

/*object*/ ListControlRow.prototype.getRowItemObj = function(/*int*/ rowItemIndex)
{
	var controlID = this.getRowItemControlID(rowItemIndex);
	var oUIObj = document.getElementById(controlID);

	if(oUIObj == null)
		throw "ListControlRow::getRowItemObj: Can't find UI object, ID(" + controlID + ")";

	return oUIObj;
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.drawRowItem = function(/*int*/ rowItemIndex, /*string*/ value)
{
	var oUIObj = this.getRowItemObj(rowItemIndex);

	oUIObj.innerHTML = value;
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.focusRowItem = function(/*int*/ rowItemIndex, /*string*/ set)
{
	var oUIObj = this.getRowItemObj(rowItemIndex);

	checkClassName(oUIObj, set ? 'hilite' : 'normal');
}

/******************************************************************************/

/*void*/ ListControlRow.prototype.clearRowItems = function()
{
	var oUIObj;

	for(var i = 0; i < this.fRowItemList.length; i++)
	{
		oUIObj = this.getRowItemObj(i);
		oUIObj.innerHTML = "";
	}
}

/******************************************************************************/
/******************************************************************************/
/* ListControlRowItem */

/******************************************************************************/
/******************************************************************************/

function ListControlRowItem(/*string*/ name, /*int*/ width)
{
	this.Name = name;
	this.Width = width;
}

/******************************************************************************/
/******************************************************************************/
/* CheckControl */

/******************************************************************************/
/******************************************************************************/

CheckControl.prototype = new Control();
CheckControl.prototype.constructor = CheckControl;

/******************************************************************************/

function CheckControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "CheckControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fUIObj.onmouseover = MainAppOnMouseOver;
	this.fUIObj.onclick = MainAppOnMouseClick;
	this.fUIObj.onfocus = MainAppOnFocus;
	this.fUIObj.onblur = MainAppOnBlur;
	this.fFocused = false;
	this.fChecked = false;

	this.setFocus(false);
}

/******************************************************************************/

/*boolean*/ CheckControl.prototype.getChecked = function()
{
	return this.fChecked;
}

/******************************************************************************/

/*void*/ CheckControl.prototype.setChecked = function(/*boolean*/ checked)
{
	this.fChecked = (checked ? true : false);
	this.drawCheck();
}

/******************************************************************************/

/*void*/ CheckControl.prototype.drawCheck = function()
{
	checkClassName(this.fUIObj, (this.fChecked
		? (this.fFocused ? 'hilitechk' : 'normalchk')
		: (this.fFocused ? 'hilite' : 'normal')));
}

/******************************************************************************/

/*void*/ CheckControl.prototype.setFocus = function(/*boolean*/ set)
{
	var wasFocused = this.fFocused;
	this.fFocused = set;
	this.drawCheck();

	if(set)
	{
		if(document.activeElement.id != this.fUIObj.id)
			this.fUIObj.focus();

		if(!wasFocused)
			this.getScreen().onFocus(this.ControlID);
	}
}

/******************************************************************************/

/*boolean*/ CheckControl.prototype.key = function(/*int*/ key)
{
	if(key == ek_Select)
	{
		this.fChecked = !this.fChecked;
		this.drawCheck();

		return true;
	}

	return Control.prototype.key.call(this, key);
}

/******************************************************************************/

/*void*/ CheckControl.prototype.mouseClick = function(/*string*/ controlID)
{
	this.fChecked = !this.fChecked;
	this.drawCheck();
}

/******************************************************************************/
/******************************************************************************/
/* TextControl */

/******************************************************************************/
/******************************************************************************/

TextControl.prototype = new Control();
TextControl.prototype.constructor = TextControl;

/******************************************************************************/

function TextControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "TextControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fFocused = false;

	this.setFocus(false);
	this.show(true);
}

/******************************************************************************/

/*void*/ TextControl.prototype.setText = function(/*string*/ text)
{
	this.fUIObj.innerHTML = (testStrHasLen(text) ? text : "");
}

/******************************************************************************/

/*boolean*/ TextControl.prototype.canFocus = function() { return false; }

/******************************************************************************/
/******************************************************************************/
/* ImageControl */

/******************************************************************************/
/******************************************************************************/

ImageControl.prototype = new Control();
ImageControl.prototype.constructor = ImageControl;

/******************************************************************************/

function ImageControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ImageControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fFocused = false;

	this.setFocus(false);
	this.show(true);
}

/******************************************************************************/

/*void*/ ImageControl.prototype.setSource = function(/*string*/ src)
{
	this.fUIObj.src = src;
}

/******************************************************************************/

/*boolean*/ ImageControl.prototype.canFocus = function() { return false; }

/******************************************************************************/
/******************************************************************************/
/* ViewPortControl */

/******************************************************************************/
/******************************************************************************/

ViewPortControl.ControlID = "SVP";

/******************************************************************************/

ViewPortControl.prototype = new Control();
ViewPortControl.prototype.constructor = ViewPortControl;

/******************************************************************************/

function ViewPortControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ViewPortControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";

	this.setFocus(false);
}

/******************************************************************************/

/*boolean*/ ViewPortControl.canOpen = function()
{
	return isMediaCenter();
}

/******************************************************************************/

/*boolean*/ ViewPortControl.isOpen = function()
{
	if(isMediaCenter())
	{
		return window.external.MediaCenter.SharedViewPort.Visible;
	}

	return false;
}

/******************************************************************************/

/*void*/ ViewPortControl.prototype.setFocus = function(/*boolean*/ set)
{
	var wasFocused = this.fFocused;
	this.fFocused = set;

	if(set)
	{
		if(document.activeElement.id != this.fUIObj.id)
		{
			if(isMediaCenter())
				window.external.MediaCenter.SharedViewPort.Focus();
		}

		if(!wasFocused)
			this.getScreen().onFocus(this.ControlID);
	}
}

/******************************************************************************/

/*void*/ ViewPortControl.prototype.playMedia = function(/*string*/ url)
{
	if(isMediaCenter())
	{
		window.external.MediaCenter.playMedia(this.getMediaType(url), url);
		window.external.MediaCenter.Experience.GoToFullScreen();
		return;
	}

	showMsg("An error occurred trying to play Show.");
}

/******************************************************************************/

/*int*/ ViewPortControl.prototype.getMediaType = function(/*string*/ url)
{
	var parts = "x".split('.');
	parts = "".split('.');
	parts = "..".split('.');
	parts = url.split('.');

	if(parts.length > 1)
	{
		var ext = parts[parts.length - 1].toLowerCase();
		if(ext == 'mp3')
			return 1;
	}

	return 2;
}

/******************************************************************************/
/******************************************************************************/
/* XmlDataReader */

/******************************************************************************/
/******************************************************************************/

function XmlDataReader(xmlDocument)
{
	this.fDocument = xmlDocument;
	this.fCurNodeList = new Array();
	this.fCurNodeList.push(this.fDocument);
}

/******************************************************************************/

/*Node*/ XmlDataReader.prototype.findChildNode = function(/*string*/ fieldName)
{
	if(this.fCurNodeList.length == 0)
		throw "XmlDataReader.findChildNode: No current node";

	var nodeList = this.fCurNodeList[this.fCurNodeList.length - 1].childNodes;
	var node;

	for(var i = 0; i < nodeList.length; i++)
	{
		node = nodeList.item(i);
		if(node.nodeName == fieldName)
			return node;
	}

	return null;
}

/******************************************************************************/

/*Array*/ XmlDataReader.prototype.findChildNodes = function(/*string*/ fieldName)
{
	if(this.fCurNodeList.length == 0)
		throw "XmlDataReader.findChildNodes: No current node";

	var nodeList = this.fCurNodeList[this.fCurNodeList.length - 1].childNodes;
	var nodes = new Array();
	var node;

	for(var i = 0; i < nodeList.length; i++)
	{
		node = nodeList.item(i);
		if(node.nodeName == fieldName)
			nodes.push(node);
	}

	return nodes;
}

/******************************************************************************/

/*string*/ XmlDataReader.prototype.getNodeText = function(/*Node*/ node)
{
	var nodeList = node.childNodes;
	var childNode;

	for(var i = 0; i < nodeList.length; i++)
	{
		childNode = nodeList.item(i);
		if(childNode.nodeType == 3 /*TEXT_NODE*/)
			return childNode.nodeValue;
	}

	return null;
}

/******************************************************************************/
/* Read a Short. May return null */

/*int*/ XmlDataReader.prototype.readShort = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return parseInt(data, 10);
}

/******************************************************************************/
/* Read a Integer. May return null */

/*int*/ XmlDataReader.prototype.readInt = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return parseInt(data, 10);
}

/******************************************************************************/
/* Read a Double. May return null */

/*float*/ XmlDataReader.prototype.readDouble = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return parseFloat(data);
}

/******************************************************************************/
/* Internal read a String. May return null */

/*string*/ XmlDataReader.prototype.internalReadString = function(/*string*/ fieldName)
{
	var node = this.findChildNode(fieldName);
	if(node == null)
		return null;

	var data = this.getNodeText(node);
	if (data == null)
		return null;

	if(data.length == 0)
		return null;

	return data;
}

/******************************************************************************/
/* Read a String. May return null */

/*string*/ XmlDataReader.prototype.readString = function(/*string*/ fieldName,
	/*int*/ maxLength)
{
	var data = this.internalReadString(fieldName);
	if(data == null)
		return null;
	var len = data.length;

	if(len > maxLength)
		throw "XmlDataReader.readString: invalid len(" + len + "), maxLength(" + maxLength + ")";

	return data;
}

/******************************************************************************/
/* Read a Date, no Time component. May return null */

/*string*/ XmlDataReader.prototype.readDate = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return ISO8601DateFromString(data);
}

/******************************************************************************/
/* Read a Date with a Time component. May return null */

/*string*/ XmlDataReader.prototype.readDateTime = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return ISO8601DateTimeFromString(data);
}

/******************************************************************************/
/* Read a Boolean. May return null */

/*int*/ XmlDataReader.prototype.readBoolean = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return ((data == "true") || (data == "0"));
}

/******************************************************************************/
/* Read an Object. May return null */

/*Readable*/ XmlDataReader.prototype.readObject = function(/*string*/ fieldName,
	/*Constructor*/ ctorDataFiler)
{
	var node = this.findChildNode(fieldName);
	if(node == null)
		return null;

	this.fCurNodeList.push(node);
	var readable = new ctorDataFiler(this);
	this.fCurNodeList.pop();

	return readable;
}

/******************************************************************************/
/* Read a list of complex Objects. */

/*Array*/ XmlDataReader.prototype.readList = function(/*string*/ fieldName,
	/*Constructor*/ itemCtorDataFiler)
{
	var list = new Array();

	var nodes = this.findChildNodes(fieldName);
	if(nodes.length == 0)
		return list;

	for(var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		this.fCurNodeList.push(node);
		var readable = new itemCtorDataFiler(this);
		list.push(readable);
		this.fCurNodeList.pop();
	}

	return list;
}

/******************************************************************************/
/* Read a list of Strings (or non-complex items than can be constructed from a sting). */

/*Array*/ XmlDataReader.prototype.readStringList = function(/*string*/ fieldName,
	/*Constructor*/ itemCtorDataFiler)
{
	var list = new Array();

	var nodes = this.findChildNodes(fieldName);
	if(nodes.length == 0)
		return list;

	for(var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		var readable = new itemCtorDataFiler(this.getNodeText(node));
		list.push(readable);
	}

	return list;
}

/******************************************************************************/
/******************************************************************************/
/* XmlDataWriter */

/******************************************************************************/
/******************************************************************************/

//TODO: see the webapi version, uses OutputStream for writing
function XmlDataWriter()
{
	this.fStream = '';

	var characterEncoding = "UTF-8";
	this.writeStartDocument(characterEncoding);
}

/******************************************************************************/

/*void*/ XmlDataWriter.prototype.toString = function()
{
	return this.fStream;
}

/******************************************************************************/

/*void*/ XmlDataWriter.prototype.writeStartDocument = function(/*string*/ encoding)
{
	this.internalWriteString('<?xml version="1.0" encoding="' + encoding + '"?>');
}

/******************************************************************************/

/*Node*/ XmlDataWriter.prototype.internalWriteString = function(/*string*/ data)
{
	this.fStream += data;
}

/******************************************************************************/

/*string*/ XmlDataWriter.prototype.escapeString = function(str)
{
	if(str.indexOf("&") >= 0)
		str = str.replace(/\&/g, "&amp;");
	if(str.indexOf("<") >= 0)
		str = str.replace(/</g, "&lt;");

	return str;
}

/******************************************************************************/
/* Write an opending XML element tag */

/*void*/ XmlDataWriter.prototype.writeStartElement = function(/*string*/ name)
{
	this.internalWriteString("<");
	this.internalWriteString(name);
	this.internalWriteString(">");
}

/******************************************************************************/
/* Write a closing XML element tag */

/*void*/ XmlDataWriter.prototype.writeEndElement = function(/*string*/ name)
{
	this.internalWriteString("</");
	this.internalWriteString(name);
	this.internalWriteString(">");
}

/******************************************************************************/
/* Write opening and closing XML element with value */

/*void*/ XmlDataWriter.prototype.writeElement = function(/*string*/ name, /*string*/ value)
{
	if(!testStrHasLen(value))
		return;

	this.writeStartElement(name);
	this.internalWriteString(this.escapeString(value));
	this.writeEndElement(name);
}

/******************************************************************************/
/* Write an Short */

/*void*/ XmlDataWriter.prototype.writeShort = function(/*string*/ fieldName, /*int*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data.toString());
}

/******************************************************************************/
/* Write an Integer */

/*void*/ XmlDataWriter.prototype.writeInt = function(/*string*/ fieldName, /*int*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data.toString());
}

/******************************************************************************/
/* Write an Double */

/*void*/ XmlDataWriter.prototype.writeDouble = function(/*string*/ fieldName, /*float*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data.toString());
}

/******************************************************************************/
/* Write a String */

/*void*/ XmlDataWriter.prototype.writeString = function(/*string*/ fieldName,
	/*string*/ data, /*int*/ maxLength)
{
	var len = testStrHasLen(data) ? data.length : 0;
	if(len > maxLength)
		throw new String("invalid len(" + len + "), maxLength(" + maxLength + ")");

	this.writeElement(fieldName, data);
}

/******************************************************************************/
/* Write a date, no Time component */

/*void*/ XmlDataWriter.prototype.writeDate = function(/*string*/ fieldName,
	/*Date*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, dateTimeToString(data, dtf_ISO8601_Date));
}

/******************************************************************************/
/* Write a Date with a Time component */

/*void*/ XmlDataWriter.prototype.writeDateTime = function(/*string*/ fieldName,
	/*Date*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, dateTimeToString(data, dtf_ISO8601_DateTime));
}

/******************************************************************************/
/* Write a Boolean */

/*void*/ XmlDataWriter.prototype.writeBoolean = function(/*string*/ fieldName,
	/*int*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data ? "true" : "false");
}

/******************************************************************************/
/* Write a complex Object */

/*void*/ XmlDataWriter.prototype.writeObject = function(/*string*/ fieldName,
	/*Writeable*/ data)
{
	if(isNull(data))
		return;

	this.writeStartElement(fieldName);
	data.writeTo(this);
	this.writeEndElement(fieldName);
}

/******************************************************************************/
/* Write a list of complex Objects */

/*void*/ XmlDataWriter.prototype.writeList = function(/*String*/ fieldName,
	/*Array*/ data)
{
	for(var i = 0; i < data.length; i++)
		this.writeObject(fieldName, data[i]);
}

/******************************************************************************/
/* Write a list of Strings (or non-complex items than can be converted to a sting) */

/*void*/ XmlDataWriter.prototype.writeStringList = function(/*string*/ fieldName,
	/*Array*/ data, /*int*/ maxLength)
{
	for(var i = 0; i < data.length; i++)
		this.writeString(fieldName, data[i].toString(), maxLength);
}

/******************************************************************************/
/******************************************************************************/
/* WaitScreen.js */

/******************************************************************************/
/******************************************************************************/

WaitScreen.ScreenID = "Wait001";

var gWaitScreen = null;
var gWaitScreenCount = 0;

/******************************************************************************/

WaitScreen.newInstance = function()
{
	if(!document.getElementById(WaitScreen.ScreenID))	//is WaitScreen available
		return null;
	if(gWaitScreenCount == 0)
		gWaitScreen = new WaitScreen();
	gWaitScreenCount++;
	return gWaitScreen;
}

/******************************************************************************/

function WaitScreen()
{
	this.ScreenID = WaitScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 0, 0);

	// adjust position
	var mainTable = document.getElementById("MainTable");
	this.fContainerControl.moveTo(mainTable.offsetLeft, mainTable.offsetTop);

	setTimeout('WaitScreen_show()', 500);	//show after 1 second
}

/******************************************************************************/

/*boolean*/ function WaitScreen_isOpen()
{
	return (gWaitScreen != null);
}

/******************************************************************************/

/*void*/ function WaitScreen_show()
{
	if(gWaitScreen)
		gWaitScreen.fContainerControl.show(true);
}

/******************************************************************************/

/*void*/ function WaitScreen_close()
{
	if(gWaitScreen)
		gWaitScreen.close();
}

/******************************************************************************/

/*void*/ WaitScreen.prototype.close = function()
{
	if(gWaitScreenCount > 0)
		gWaitScreenCount--;
	if(gWaitScreenCount == 0)
	{
		this.fContainerControl.show(false);
		gWaitScreen = null;
	}
}

/******************************************************************************/
/******************************************************************************/
/* TextListControl.js */

/******************************************************************************/
/******************************************************************************/

TextListControl.prototype = new ListControl();
TextListControl.prototype.constructor = ListControl;

/******************************************************************************/

function TextListControl(/*string*/ controlID, /*string*/ screenID, /*int*/ numRows,
	/*ListControlRowItemList*/ oRowItemList, /*Array*/ nameValuePairList)
{
	this.NameValuePairList = nameValuePairList;

	ListControl.prototype.init.call(this, controlID, screenID, numRows, oRowItemList);
}

/******************************************************************************/

/*void*/ TextListControl.prototype.setFocusedItemByName = function(/*string*/ name)
{
	var pos = arrayIndexOfByCmpr(this.NameValuePairList, new NameValuePairCmpr(name));
	this.setFocusedItemByPos(pos);
}

/******************************************************************************/

/*NameValuePair*/ TextListControl.prototype.getFocusedItemValue = function()
{
	var focusedItem = this.getFocusedItemPos();
	if((focusedItem >= 0) && (focusedItem < this.NameValuePairList.length))
		return this.NameValuePairList[focusedItem];

	return null;
}

/******************************************************************************/

/*int*/ TextListControl.prototype.getItemCount = function()
{
	return this.NameValuePairList.length;
}

/******************************************************************************/

/*void*/ TextListControl.prototype.drawItem = function(/*int*/ item,
	/*ListControlRow*/ oRow)
{
	var nameValuePair = this.NameValuePairList[item];

	oRow.drawRowItem(0, nameValuePair.Value);
}

/******************************************************************************/
/******************************************************************************/
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
	{
		now = new Date();
		totalDays = (now.getTime() - showSearch.ReleasedOn.getTime()) / MillsPerDay;

		if(totalDays < 1)
			date = "Today";
		else if(totalDays <= 7)
			date = dayOfWeekToString(showSearch.ReleasedOn.getUTCDay());
		else if(totalDays <= 365)
			date = dateTimeToString(showSearch.ReleasedOn, dtf_M_D, true);
		else
			date = showSearch.ReleasedOn.getUTCFullYear().toString();
	}
	else if(showSearch.ReleasedYear)
		date = showSearch.ReleasedYear.toString();

	showProvider = showSearch.ShowProviderList[0];
	cost = showProvider.ShowCostList[0].CostDisplay;
	if((showSearch.ShowProviderList.length > 1) || (showProvider.ShowCostList.length > 1))
		cost = "*" + cost;

	tempStr = showSearch.Name;
	if(testStrHasLen(showSearch.EpisodeName))
		tempStr += ' - "' + showSearch.EpisodeName + '"';
	oRow.drawRowItem(0, tempStr);
	oRow.drawRowItem(1, date);
	oRow.drawRowItem(2, cost);
}

/******************************************************************************/
/******************************************************************************/
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
/* ShowProviderItem.js */

/******************************************************************************/
/******************************************************************************/

ShowProviderItem.newInstance = function(/*ProviderID*/ providerID, /*ShowCost*/ showCost)
{
	return new ShowProviderItem(providerID, showCost);
}

/******************************************************************************/

function ShowProviderItem(/*ProviderID*/ providerID, /*ShowCost*/ showCost)
{
	var oSession = MainApp.getThe().getSession();

	this.Provider = oSession.getProvider(providerID);
	this.ShowCost = showCost;
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowListControl.js */

/******************************************************************************/
/******************************************************************************/

RentedShowListControl.prototype = new ListControl();
RentedShowListControl.prototype.constructor = ListControl;

/******************************************************************************/

function RentedShowListControl(/*string*/ controlID, /*string*/ screenID, /*int*/ numRows,
	/*ListControlRowItemList*/ oRowItemList, /*Array*/ rentedShowSearchList)
{
	this.RentedShowSearchList = rentedShowSearchList;

	ListControl.prototype.init.call(this, controlID, screenID, numRows, oRowItemList);
}

/******************************************************************************/

/*void*/ RentedShowListControl.prototype.setRentedShowSearchList = function(
	/*Array*/ rentedShowSearchList, /*boolean*/ reset)
{
	this.RentedShowSearchList = rentedShowSearchList;
	this.recalcAfterDataChange(reset);
}

/******************************************************************************/

/*RentedShowSearch*/ RentedShowListControl.prototype.getFocusedItemValue = function()
{
	var focusedItem = this.getFocusedItemPos();
	if((focusedItem >= 0) && (focusedItem < this.RentedShowSearchList.length))
		return this.RentedShowSearchList[focusedItem];

	return null;
}

/******************************************************************************/

/*int*/ RentedShowListControl.prototype.getItemCount = function()
{
	return this.RentedShowSearchList.length;
}

/******************************************************************************/

/*void*/ RentedShowListControl.prototype.drawItem = function(/*int*/ item,
	/*ListControlRow*/ oRow)
{
	var rentedShowSearch = this.RentedShowSearchList[item];
	var expires = "n/a";
	var tempStr;
	var totalDays;
	var now;

	if(rentedShowSearch.AvailableUntil != null)
	{
		now = new Date();
		totalDays = (rentedShowSearch.AvailableUntil.getTime() - now.getTime())
			/ MillsPerDay;

		if(totalDays < 0)
			expires = "Expired";
		else if(totalDays <= 1)
			expires = dateTimeToString(rentedShowSearch.AvailableUntil, dtf_H_MMa);
		else if(totalDays <= 7)
		{
			expires = dayOfWeekToString(rentedShowSearch.AvailableUntil.getDay(), false)
				+ " " + dateTimeToString(rentedShowSearch.AvailableUntil, dtf_Ha);
		}
		else
			expires = dateTimeToString(rentedShowSearch.AvailableUntil, dtf_M_D);
	}

	tempStr = rentedShowSearch.Name;
	if(testStrHasLen(rentedShowSearch.EpisodeName))
		tempStr += ' - "' + rentedShowSearch.EpisodeName + '"';

	oRow.drawRowItem(0, tempStr);
	oRow.drawRowItem(1, expires);
}

/******************************************************************************/
/******************************************************************************/
/* Session.js */

/******************************************************************************/
/******************************************************************************/

var DownloadStatus_NotStarted = "NotStarted";
var DownloadStatus_InProgress = "InProgress";
var DownloadStatus_Completed = "Completed";

/******************************************************************************/

Session.newInstance = function()
{
	var session = new Session();

	session.loadAppSettings();

	return session;
}

/******************************************************************************/

function Session()
{
	this.fDownloadServiceMgr = null;

	this.fNetworkURL = location.protocol + "//" + location.hostname + "/webapi/playerapi/xml";
	this.fCryptoAPIURL = location.protocol + "//" + location.hostname + "/webapi/cryptoapi";

	this.CanPingServer = false;

	this.fPlayer = null;

	this.fIsUserLoggedOn = false;
	this.fUserID = null;
	this.fUserPassword = null;
	this.fRememberPassword = false;
	this.fSessionData = null;
	this.fSessionExpires = null;
	this.fMemberPrefs = null;
	this.fMemberProviderList = new Array();

	this.IncludeAdult = ina_Never;
	this.CanAccessAdult = false;

	this.fIsSystemDataLoaded = false;
	this.fProviderList = null;
	this.fCategoryList = null;
	this.fRatingList = null;

	this.fLastProviderID = null;
}

/******************************************************************************/

/*boolean*/ Session.prototype.loadAppSettings = function()
{
	this.fPlayer = Player.newInstance();

	this.fPlayer.ManufacturerID = "inetvod";
	this.fPlayer.ModelNo = "mce";
	this.fPlayer.SerialNo = "1";
	this.fPlayer.Version = "1.0.0000";

	this.checkInstall();
	if (this.fDownloadServiceMgr && this.fDownloadServiceMgr.getPlayerSerialNo())
		this.fPlayer.SerialNo = this.fDownloadServiceMgr.getPlayerSerialNo();
}

/******************************************************************************/

/*string*/ Session.prototype.getNetworkURL = function()
{
	return this.fNetworkURL;
}

/******************************************************************************/

/*string*/ Session.prototype.getCryptoAPIURL = function()
{
	return this.fCryptoAPIURL;
}

/******************************************************************************/

/*boolean*/ Session.prototype.isUserLoggedOn = function()
{
	return this.fIsUserLoggedOn;
}

/******************************************************************************/

/*boolean*/ Session.prototype.haveUserID = function()
{
	return testStrHasLen(this.fUserID);
}

/******************************************************************************/

/*boolean*/ Session.prototype.haveUserPassword = function()
{
	return testStrHasLen(this.fUserPassword);
}

/******************************************************************************/

/*void*/ Session.prototype.clearLogonInfo = function()
{
	this.fIsUserLoggedOn = false;
	this.fUserID = null;
	this.fUserPassword = null;
}

/******************************************************************************/

/*ProviderList*/ Session.prototype.getProviderList = function()
{
	return this.fProviderList;
}

/******************************************************************************/

/*Provider*/ Session.prototype.getProvider = function(/*string*/ providerID)
{
	var provider = arrayFindItemByCmpr(this.fProviderList, new ProviderIDCmpr(providerID));

	if(provider != null)
		return provider;

	throw "Session.getProvider: can't find ProviderID(" + providerID + ")";
}

/******************************************************************************/

/*string*/ Session.prototype.getProviderName = function(/*string*/ providerID)
{
	if(Provider.AllProvidersID == providerID)
		return Provider.AllProvidersName;

	return this.getProvider(providerID).Name;
}

/******************************************************************************/

/*CategoryList*/ Session.prototype.getCategoryList = function()
{
	return this.fCategoryList;
}

/******************************************************************************/

/*string*/ Session.prototype.getCategoryName = function(/*string*/ categoryID)
{
	if(categoryID == Category.AllCategoriesID)
		return Category.AllCategoriesName;

	for(var i = 0; i < this.fCategoryList.length; i++)
		if(this.fCategoryList[i].CategoryID == categoryID)
			return this.fCategoryList[i].Name;

	throw "Session.getCategoryName: can't find CategoryID(" + categoryID + ")";
}

/******************************************************************************/

/*string*/ Session.prototype.getCategoryNames = function(/*Array*/ categoryIDList)
{
	var names = "";

	for(var i = 0; i < categoryIDList.length; i++)
	{
		if(names.length > 0)
			names += ", ";
		names += this.getCategoryName(categoryIDList[i]);
	}

	return names;
}

/******************************************************************************/

/*RatingList*/ Session.prototype.getRatingList = function()
{
	return this.fRatingList;
}

/******************************************************************************/

/*string*/ Session.prototype.getRatingName = function(/*string*/ ratingID)
{
	if(ratingID == Rating.AllRatingsID)
		return Rating.AllRatingsName;

	for(var i = 0; i < this.fRatingList.length; i++)
		if(this.fRatingList[i].RatingID == ratingID)
			return this.fRatingList[i].Name;

	throw "Session.getRatingName: can't find RatingID(" + ratingID + ")";
}

/******************************************************************************/

/*boolean*/ Session.prototype.checkInstall = function()
{
	if(this.fDownloadServiceMgr == null)
	{
		try
		{
//			this.fDownloadServiceMgr = new ActiveXObject("iNetVOD.DLS.Gateway.DownloadServiceMgr");
			this.fDownloadServiceMgr = document.getElementById("DownloadServiceMgr");
			this.fDownloadServiceMgr.getPlayerSerialNo();	//force test to validate, throwing execption if fails
		}
		catch(ignore)
		{
			this.fDownloadServiceMgr = null;
		}
	}

	return this.fDownloadServiceMgr != null;
}

/******************************************************************************/

/*boolean*/ Session.prototype.loadDataSettings = function()
{
	if(this.fDownloadServiceMgr != null)
	{
		this.fUserID = this.fDownloadServiceMgr.getUserLogonID();
		this.fUserPassword = this.fDownloadServiceMgr.getUserPIN();
		this.fRememberPassword = this.fDownloadServiceMgr.getRememberUserPIN();

		if(!this.fRememberPassword)
			this.fUserPassword = null;
	}
	else
	{
		this.fUserID = getCookie("user");
		this.fUserPassword = getCookie("password");
		this.fRememberPassword = (getCookie("remember") == "true");

		if(!testStrHasLen(this.fUserPassword))
			this.fRememberPassword = false;
	}

	return testStrHasLen(this.fUserID) && testStrIsAllNumbers(this.fUserID);
}

/******************************************************************************/

/*boolean*/ Session.prototype.saveDataSettings = function()
{
	if(this.fDownloadServiceMgr != null)
	{
		this.fDownloadServiceMgr.setUserCredentials(this.fUserID, this.fUserPassword,
			this.fRememberPassword);
		this.fDownloadServiceMgr.processNow();
	}
	else
	{
		deleteCookie("user");
		deleteCookie("password");
		deleteCookie("remember");

		setCookie("user", this.fUserID, false);
		setCookie("password", this.fUserPassword, !this.fRememberPassword);
		setCookie("remember", this.fRememberPassword ? "true" : "false", true);
	}

	return true;
}

/******************************************************************************/

/*void*/ Session.prototype.resetDataSettings = function()
{
	if(this.fDownloadServiceMgr != null)
		this.fDownloadServiceMgr.setUserCredentials("", "", false);
	else
	{
		deleteCookie("user");
		deleteCookie("password");
		deleteCookie("remember");
	}
}

/******************************************************************************/

/*void*/ Session.prototype.showRequestError = function(/*string*/ message)
{
	if(!testStrHasLen(message))
		showMsg("An error occurred trying to communicate with the iNetVOD servers. Please check you network connection and try again.");
	else
		showMsg(message);
}

/******************************************************************************/

/*void*/ Session.prototype.callbackCaller = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(isObject(this.CallerCallback) && isFunction(this.CallerCallback.Callback))
	{
		try
		{
			this.CallerCallback.Callback(data, statusCode, statusMessage);
		}
		catch(e)
		{
			showError("Session.callbackCaller", e);
		}
	}
	else if(isFunction(this.CallerCallback))
	{
		try
		{
			this.CallerCallback(data, statusCode, statusMessage);
		}
		catch(e)
		{
			showError("Session.callbackCaller", e);
		}
	}
}

/******************************************************************************/

/*void*/ Session.prototype.pingServer = function(/*object*/ callbackObj)
{
	WaitScreen.newInstance();
	this.Callback = Session.prototype.pingServerResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance().startRequest(PingRqst.newInstance(), this);
}

/******************************************************************************/

/*void*/ Session.prototype.pingServerResponse = function(/*PingResp*/ pingResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.CanPingServer = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.signon = function(/*object*/ callbackObj,
	/*string*/ userID, /*string*/ password, /*boolean*/ rememberPassword)
{
	this.fIsUserLoggedOn = false;

	if(testStrHasLen(userID))
		this.fUserID = userID;
	if(testStrHasLen(password))
		this.fUserPassword = CryptoAPI.newInstance().digest(password);
	if(isBoolean(rememberPassword))
		this.fRememberPassword = rememberPassword;

	if(!testStrHasLen(this.fUserID))
		throw "Session::signon: Missing UserID";
	if(!testStrHasLen(this.fUserPassword))
		throw "Session::signon: Missing UserPassword";

	var signonRqst;

	signonRqst = SignonRqst.newInstance();
	signonRqst.UserID = this.fUserID;
	signonRqst.Password = this.fUserPassword;
	signonRqst.Player = this.fPlayer;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.signonResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance().startRequest(signonRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.signonResponse = function(/*SignonResp*/ signonResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.fSessionData = signonResp.SessionData;
		this.fSessionExpires = signonResp.SessionExpires;
		this.fMemberPrefs = signonResp.MemberState.MemberPrefs;
		this.IncludeAdult = this.fMemberPrefs.IncludeAdult;
		this.CanAccessAdult = (this.IncludeAdult == ina_Always);
		this.fMemberProviderList = signonResp.MemberState.MemberProviderList;

		this.fIsUserLoggedOn = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}
	else if(statusCode == sc_InvalidUserIDPassword)
		this.fUserPassword = null;

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*boolean*/ Session.prototype.isMemberOfProvider = function(/*string*/ providerID)
{
	return(arrayFindItemByCmpr(this.fMemberProviderList, new ProviderIDCmpr(providerID)) != null)
}

/******************************************************************************/

/*void*/ Session.prototype.loadSystemData = function(/*object*/ callbackObj)
{
	WaitScreen.newInstance();
	this.Callback = Session.prototype.loadSystemDataResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(SystemDataRqst.newInstance(), this);
}

/******************************************************************************/

/*void*/ Session.prototype.loadSystemDataResponse = function(/*SystemDataResp*/ systemDataResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.fProviderList = systemDataResp.ProviderList;
		this.fCategoryList = systemDataResp.CategoryList;
		this.fRatingList = systemDataResp.RatingList;

		this.fIsSystemDataLoaded = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.enableAdultAccess = function(/*object*/ callbackObj,
	/*string*/ password)
{
	var enableAdultAccessRqst;

	enableAdultAccessRqst = EnableAdultAccessRqst.newInstance();
	enableAdultAccessRqst.Password = CryptoAPI.newInstance().digest(password);

	WaitScreen.newInstance();
	this.Callback = Session.prototype.enableAdultAccessResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(enableAdultAccessRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.enableAdultAccessResponse = function(
	/*EnableAdultAccessResp*/ enableAdultAccessResp, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.CanAccessAdult = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.showSearch = function(/*object*/ callbackObj,
	/*SearchData*/ searchData)
{
	var showSearchRqst;

	var providerIDList = new Array();
	var categoryIDList = new Array();
	var ratingIDList = new Array();

	if(searchData.ProviderID != Provider.AllProvidersID)
		providerIDList.push(searchData.ProviderID);
	if(searchData.CategoryID != Category.AllCategoriesID)
		categoryIDList.push(searchData.CategoryID);
	if(searchData.RatingID != Rating.AllRatingsID)
		ratingIDList.push(searchData.RatingID);

	showSearchRqst = ShowSearchRqst.newInstance();
	showSearchRqst.Search = searchData.Search;
	showSearchRqst.ProviderIDList = providerIDList;
	showSearchRqst.CategoryIDList = categoryIDList;
	showSearchRqst.RatingIDList = ratingIDList;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.showSearchResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(showSearchRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.showSearchResponse = function(/*ShowSearchResp*/ showSearchResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(showSearchResp.ReachedMax)
			showMsg("Over " + ShowSearchRqst.MaxResults + " shows were found.  Please try narrowing your search criteria.");

		this.callbackCaller(showSearchResp.ShowSearchList, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.showDetail = function(/*object*/ callbackObj,
	/*string*/ showID)
{
	var showDetailRqst;

	showDetailRqst = ShowDetailRqst.newInstance();
	showDetailRqst.ShowID = showID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.showDetailResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(showDetailRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.showDetailResponse = function(/*ShowDetailResp*/ showDetailResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(showDetailResp.ShowDetail, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.providerEnroll = function(/*object*/ callbackObj, /*string*/ providerID)
{
	var providerEnrollRqst;

	providerEnrollRqst = ProviderEnrollRqst.newInstance();
	providerEnrollRqst.ProviderID = providerID;

	this.fLastProviderID = providerID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.providerEnrollResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(providerEnrollRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.providerEnrollResponse = function(/*ProviderEnrollResp*/ providerEnrollResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.fMemberProviderList.push(MemberProvider.newInstance(this.fLastProviderID));

		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*StatusCode*/ Session.prototype.setProvider = function(/*object*/ callbackObj,
	/*string*/ providerID, /*string*/ userID, /*string*/ password)
{
	var setProviderRqst;

	//TODO: encrypt UserID and Password

	setProviderRqst = SetProviderRqst.newInstance();
	setProviderRqst.ProviderID = providerID;
	setProviderRqst.UserID = userID;
	setProviderRqst.Password = password;

	this.fLastProviderID = providerID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.setProviderResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(setProviderRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.setProviderResponse = function(/*SetProviderResp*/ setProviderResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(arrayFindItemByCmpr(this.fMemberProviderList, new ProviderIDCmpr(this.fLastProviderID)) == null)
			this.fMemberProviderList.push(MemberProvider.newInstance(this.fLastProviderID));

		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.checkShowAvail = function(/*object*/ callbackObj,
	/*string*/ showID, /*string*/ providerID, /*ShowCost*/ showCost)
{
	var checkShowAvailRqst;

	checkShowAvailRqst = CheckShowAvailRqst.newInstance();
	checkShowAvailRqst.ShowID = showID;
	checkShowAvailRqst.ProviderID = providerID;
	checkShowAvailRqst.ShowCost = showCost;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.checkShowAvailResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(checkShowAvailRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.checkShowAvailResponse = function(/*CheckShowAvailResp*/ checkShowAvailResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(checkShowAvailResp, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.rentShow = function(/*object*/ callbackObj, /*string*/ showID,
	/*string*/ providerID, /*ShowCost*/ oApprovedCost)
{
	var rentShowRqst;

	rentShowRqst = RentShowRqst.newInstance();
	rentShowRqst.ShowID = showID;
	rentShowRqst.ProviderID = providerID;
	rentShowRqst.ApprovedCost = oApprovedCost;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.rentShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(rentShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.rentShowResponse = function(/*RentShowResp*/ rentShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(this.fDownloadServiceMgr != null)
			this.fDownloadServiceMgr.processNow();
		this.callbackCaller(rentShowResp, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShowList = function(/*object*/ callbackObj)
{
	var rentedShowListRqst;

	rentedShowListRqst = RentedShowListRqst.newInstance();

	WaitScreen.newInstance();
	this.Callback = Session.prototype.rentedShowListResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(rentedShowListRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShowListResponse = function(/*RentedShowListResp*/ rentedShowListResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(rentedShowListResp.RentedShowSearchList, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShow = function(/*object*/ callbackObj, /*string*/ rentedShowID)
{
	var rentedShowRqst;

	rentedShowRqst = RentedShowRqst.newInstance();
	rentedShowRqst.RentedShowID = rentedShowID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.rentedShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(rentedShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShowResponse = function(/*RentedShowResp*/ rentedShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(rentedShowResp.RentedShow, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.downloadRefresh = function()
{
	if(this.fDownloadServiceMgr == null)
		return;

	this.fDownloadServiceMgr.refresh();
}

/******************************************************************************/

/*string*/ Session.prototype.getDownloadRentedShowStatus = function(/*string*/ rentedShowID)
{
	if(this.fDownloadServiceMgr == null)
		return null;

	return this.fDownloadServiceMgr.getRentedShowStatus(rentedShowID);
}

/******************************************************************************/

/*string*/ Session.prototype.getDownloadRentedShowPath = function(/*string*/ rentedShowID)
{
	if(this.fDownloadServiceMgr == null)
		return null;

	return this.fDownloadServiceMgr.getRentedShowPath(rentedShowID);
}

/******************************************************************************/

/*void*/ Session.prototype.watchShow = function(/*object*/ callbackObj, /*string*/ rentedShowID)
{
	var watchShowRqst;

	watchShowRqst = WatchShowRqst.newInstance();
	watchShowRqst.RentedShowID = rentedShowID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.watchShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(watchShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.watchShowResponse = function(/*WatchShowResp*/ watchShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(watchShowResp.License, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.releaseShow = function(/*object*/ callbackObj, /*string*/ rentedShowID)
{
	var releaseShowRqst;

	releaseShowRqst = ReleaseShowRqst.newInstance();
	releaseShowRqst.RentedShowID = rentedShowID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.releaseShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(releaseShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.releaseShowResponse = function(/*ReleaseShowResp*/ releaseShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(this.fDownloadServiceMgr != null)
			this.fDownloadServiceMgr.processNow();
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/
/******************************************************************************/
/* CryptoAPI.js */

/******************************************************************************/
/******************************************************************************/

CryptoAPI.newInstance = function()
{
	return new CryptoAPI();
}

/******************************************************************************/

function CryptoAPI()
{
}

/******************************************************************************/

/*string*/ CryptoAPI.prototype.digest = function(/*string*/ data)
{
	var session = MainApp.getThe().getSession();
	var httpRequestor = HTTPRequestor.newInstance();

	return httpRequestor.sendGet(session.getCryptoAPIURL() + "/digest/" + data).responseText;
}

/******************************************************************************/
/******************************************************************************/

/* DataID.js */

/******************************************************************************/
/******************************************************************************/

var ManufacturerIDMaxLength = 32;
var ProviderIDMaxLength = 32;
var ShowIDMaxLength = 64;
var RentedShowIDMaxLength = 64;
var CategoryIDMaxLength = 32;
var RatingIDMaxLength = 32;

/******************************************************************************/
/******************************************************************************/
/* Player.js */

/******************************************************************************/
/******************************************************************************/

Player.ModelNoMaxLength = 32;
Player.SerialNoMaxLength = 64;
Player.VersionMaxLength = 16;

/******************************************************************************/

Player.newInstance = function()
{
	return new Player();
}

/******************************************************************************/

function Player()
{
	this.ManufacturerID = null;
	this.ModelNo = null;
	this.SerialNo = null;
	this.Version = null;
}

/******************************************************************************/

/*void*/ Player.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ManufacturerID", this.ManufacturerID, ManufacturerIDMaxLength);
	writer.writeString("ModelNo", this.ModelNo, Player.ModelNoMaxLength);
	writer.writeString("SerialNo", this.SerialNo, Player.SerialNoMaxLength);
	writer.writeString("Version", this.Version, Player.VersionMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* MemberState.js */

/******************************************************************************/
/******************************************************************************/

function MemberState(reader)
{
	this.MemberPrefs = null;
	this.MemberProviderList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ MemberState.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.MemberPrefs = reader.readObject("MemberPrefs", MemberPrefs);
	this.MemberProviderList = reader.readList("MemberProvider", MemberProvider);
}

/******************************************************************************/
/******************************************************************************/
/* MemberPrefs.js */

/******************************************************************************/
/******************************************************************************/

function MemberPrefs(reader)
{
	this.IncludeAdult = ina_Never;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ MemberPrefs.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.IncludeAdult = reader.readString("IncludeAdult", IncludeAdultMaxLength);
}

/******************************************************************************/

/*void*/ MemberPrefs.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("IncludeAdult", this.IncludeAdult, IncludeAdultMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* IncludeAdult.js */

/******************************************************************************/
/******************************************************************************/

var IncludeAdultMaxLength = 32;

var ina_Never = "Never";
var ina_PromptPassword = "PromptPassword";
var ina_Always = "Always";

/******************************************************************************/
/******************************************************************************/
/* Provider.js */

/******************************************************************************/
/******************************************************************************/

Provider.AllProvidersID = "all";
Provider.AllProvidersName = "All Providers";

/******************************************************************************/

function Provider(reader)
{
	this.ProviderID = null;
	this.Name = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Provider.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.Name = reader.readString("Name", 64);
}

/******************************************************************************/
/******************************************************************************/
/* ProviderIDCmpr.js */

/******************************************************************************/
/******************************************************************************/

function ProviderIDCmpr(providerID)
{
	this.ProviderID = providerID;
}

/******************************************************************************/

/*int*/ ProviderIDCmpr.prototype.compare = function(oCompare)
{
	if(this.ProviderID == oCompare.ProviderID)
		return 0;
	if(this.ProviderID < oCompare.ProviderID)
		return -1;
	return 1;
}

/******************************************************************************/
/******************************************************************************/
/* Category.js */

/******************************************************************************/
/******************************************************************************/

Category.AllCategoriesID = "all";
Category.AllCategoriesName = "All Categories";
Category.FeaturedCategoryID = "featured";

/******************************************************************************/

function Category(reader)
{
	this.CategoryID = null;
	this.Name = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Category.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.CategoryID = reader.readString("CategoryID", CategoryIDMaxLength);
	this.Name = reader.readString("Name", 64);
}

/******************************************************************************/
/******************************************************************************/
/* Rating.js */

/******************************************************************************/
/******************************************************************************/

Rating.AllRatingsID = "all";
Rating.AllRatingsName = "All Ratings";

/******************************************************************************/

function Rating(reader)
{
	this.RatingID = null;
	this.Name = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Rating.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RatingID = reader.readString("RatingID", RatingIDMaxLength);
	this.Name = reader.readString("Name", 64);
}

/******************************************************************************/
/******************************************************************************/
/* MemberProvider.js */

/******************************************************************************/
/******************************************************************************/

MemberProvider.newInstance = function(/*string*/ providerID)
{
	var oMemberProvider = new MemberProvider();

	oMemberProvider.ProviderID = providerID;

	return oMemberProvider;
}

/******************************************************************************/

function MemberProvider(reader)
{
	this.ProviderID = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ MemberProvider.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
}

/******************************************************************************/

/*void*/ MemberProvider.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* ShowSearch.js */

/******************************************************************************/
/******************************************************************************/

function ShowSearch(reader)
{
	this.ShowID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.ReleasedOn = null;
	this.ReleasedYear = null;
	this.PictureURL = null;
	this.ShowProviderList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowSearch.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.ReleasedOn = reader.readDateTime("ReleasedOn");
	this.ReleasedYear = reader.readShort("ReleasedYear");
	this.PictureURL = reader.readString("PictureURL", 4096);	//TODO:
	this.ShowProviderList = reader.readList("ShowProvider", ShowProvider);
}

/******************************************************************************/
/******************************************************************************/
/* ShowSearchCmprs.js */

/******************************************************************************/
/******************************************************************************/

function ShowSearchToIDCmpr(showID)
{
	this.ShowID = showID;
}

/******************************************************************************/

/*int*/ ShowSearchToIDCmpr.prototype.compare = function(oShowSearch)
{
	if(this.ShowID == oShowSearch.ShowID)
		return 0;
	if(this.ShowID < oShowSearch.ShowID)
		return -1;
	return 1;
}

/******************************************************************************/

function ShowSearchByNameCmpr(lhs, rhs)
{
	var rc = compareStringsIgnoreCase(lhs.Name, rhs.Name);

	if(rc != 0)
		return rc;

	return compareDates(rhs.ReleasedOn, lhs.ReleasedOn);	// reversed
}

/******************************************************************************/

function ShowSearchByDateCmpr(lhs, rhs)
{
	var rc = compareDates(lhs.ReleasedOn, rhs.ReleasedOn);

	//if(rc != 0)
		return rc;

	//return compareStringsIgnoreCase(lhs.EpisodeName, rhs.EpisodeName);
}

/******************************************************************************/

function ShowSearchByDateDescCmpr(lhs, rhs)
{
	var rc = compareDates(rhs.ReleasedOn, lhs.ReleasedOn);

	//if(rc != 0)
		return rc;

	//return compareStringsIgnoreCase(lhs.EpisodeName, rhs.EpisodeName);
}

/******************************************************************************/

function ShowSearchByCostCmpr(lhs, rhs)
{
	var lhsShowCost = lhs.ShowProviderList[0].ShowCost;
	var rhsShowCost = rhs.ShowProviderList[0].ShowCost;

	var rc = ShowCostTypeCmpr(lhsShowCost.ShowCostType, rhsShowCost.ShowCostType);

	if(rc != 0)
		return rc;

	if(lhsShowCost.ShowCostType == sct_PayPerView)
	{
		rc = compareNumbers(lhsShowCost.Cost.Amount, rhsShowCost.Cost.Amount);
		if(rc != 0)
			return rc;
	}

	// sort by Name as last resort
	return ShowSearchByNameCmpr(lhs, rhs);
}

/******************************************************************************/
/******************************************************************************/
/* ShowDetail.js */

/******************************************************************************/
/******************************************************************************/

function ShowDetail(reader)
{
	this.ShowID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.EpisodeNumber= null;

	this.ReleasedOn = null;
	this.ReleasedYear = null;
	this.Description = null;
	this.RunningMins = null;
	this.PictureURL = null;

	this.CategoryIDList = null;
	this.RatingID = null;
	this.IsAdult = false;

	this.ShowProviderList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowDetail.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.EpisodeNumber = reader.readString("EpisodeNumber", 32);

	this.ReleasedOn = reader.readDateTime("ReleasedOn");
	this.ReleasedYear = reader.readShort("ReleasedYear");
	this.Description = reader.readString("Description", 4096);	//TODO:
	this.RunningMins = reader.readShort("RunningMins");
	this.PictureURL = reader.readString("PictureURL", 4096);	//TODO:

	this.CategoryIDList = reader.readStringList("CategoryID", String);
	this.RatingID = reader.readString("RatingID", RatingIDMaxLength);
	this.IsAdult = reader.readBoolean("IsAdult");

	this.ShowProviderList = reader.readList("ShowProvider", ShowProvider);
}

/******************************************************************************/
/******************************************************************************/
/* ShowProvider.js */

/******************************************************************************/
/******************************************************************************/

function ShowProvider(reader)
{
	this.ProviderID = null;
	this.ShowCostList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowProvider.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.ShowCostList = reader.readList("ShowCost", ShowCost);
}

/******************************************************************************/
/******************************************************************************/
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
/* ShowCost.js */

/******************************************************************************/
/******************************************************************************/

ShowCost.CostDisplayMaxLength = 32;

/******************************************************************************/

function ShowCost(reader)
{
	this.ShowCostType = null;
	this.Cost = null;
	this.CostDisplay = null;
	this.RentalWindowDays = null;
	this.RentalPeriodHours = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*string*/ ShowCost.prototype.formatRental = function()
{
	var tempStr = "";

	if(this.RentalPeriodHours)
	{
		if(this.RentalPeriodHours > 48)
			tempStr = (this.RentalPeriodHours / 24) + " days";
		else
			tempStr = this.RentalPeriodHours + " hrs.";
	}
	if(this.RentalWindowDays)
	{
		if(tempStr.length > 0)
			tempStr += " / ";
		tempStr += this.RentalWindowDays + " days";
	}

	if(tempStr.length == 0)
		return "n/a";
	return tempStr;
}

/******************************************************************************/

/*void*/ ShowCost.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowCostType = reader.readString("ShowCostType", ShowCostTypeMaxLength);
	this.Cost = reader.readObject("Cost", Money);
	this.CostDisplay = reader.readString("CostDisplay", ShowCost.CostDisplayMaxLength);
	this.RentalWindowDays = reader.readShort("RentalWindowDays");
	this.RentalPeriodHours = reader.readShort("RentalPeriodHours");
}

/******************************************************************************/

/*void*/ ShowCost.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowCostType", this.ShowCostType, ShowCostTypeMaxLength);
	writer.writeObject("Cost", this.Cost);
	writer.writeString("CostDisplay", this.CostDisplay, ShowCost.CostDisplayMaxLength);
	writer.writeShort("RentalWindowDays", this.RentalWindowDays);
	writer.writeShort("RentalPeriodHours", this.RentalPeriodHours);
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowSearch.js */

/******************************************************************************/
/******************************************************************************/

function RentedShowSearch(reader)
{
	this.RentedShowID = null;
	this.ShowID = null;
	this.ProviderID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.ReleasedOn = null;
	this.ReleasedYear = null;
	this.PictureURL = null;
	this.RentedOn = null;
	this.AvailableUntil = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShowSearch.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowID = reader.readString("RentedShowID", RentedShowIDMaxLength);
	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.ReleasedOn = reader.readDateTime("ReleasedOn");
	this.ReleasedYear = reader.readShort("ReleasedYear");
	this.PictureURL = reader.readString("PictureURL", 4096);	//TODO:
	this.RentedOn = reader.readDateTime("RentedOn");
	this.AvailableUntil = reader.readDateTime("AvailableUntil");
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowSearchCmprs.js */

/******************************************************************************/
/******************************************************************************/

function RentedShowSearchToIDCmpr(rentedShowID)
{
	this.RentedShowID = rentedShowID;
}

/******************************************************************************/

/*int*/ RentedShowSearchToIDCmpr.prototype.compare = function(oRentedShowSearch)
{
	if(this.RentedShowID == oRentedShowSearch.RentedShowID)
		return 0;
	if(this.RentedShowID < oRentedShowSearch.RentedShowID)
		return -1;
	return 1;
}

/******************************************************************************/
/******************************************************************************/

function RentedShowSearchByNameCmpr(lhs, rhs)
{
	var rc = compareStringsIgnoreCase(lhs.Name, rhs.Name);

	if(rc != 0)
		return rc;

	return compareDates(lhs.ReleasedOn, rhs.ReleasedOn);
}

/******************************************************************************/

function RentedShowSearchByNameDescCmpr(lhs, rhs)
{
	var rc = compareStringsIgnoreCase(rhs.Name, lhs.Name);	// reversed

	if(rc != 0)
		return rc;

	return compareDates(rhs.ReleasedOn, lhs.ReleasedOn);	// reversed
}

/******************************************************************************/

function RentedShowSearchByReleasedOnCmpr(lhs, rhs)
{
	var rc = compareDates(lhs.ReleasedOn, rhs.ReleasedOn);

	if(rc != 0)
		return rc;

	return compareStringsIgnoreCase(lhs.Name, rhs.Name);
}

/******************************************************************************/

function RentedShowSearchByReleasedOnDescCmpr(lhs, rhs)
{
	var rc = compareDates(rhs.ReleasedOn, lhs.ReleasedOn);	// reversed

	if(rc != 0)
		return rc;

	return compareStringsIgnoreCase(rhs.Name, lhs.Name);	// reversed
}

/******************************************************************************/

function RentedShowSearchByRentedOnCmpr(lhs, rhs)
{
	return compareDates(lhs.RentedOn, rhs.RentedOn);
}

/******************************************************************************/

function RentedShowSearchByRentedOnDescCmpr(lhs, rhs)
{
	return compareDates(rhs.RentedOn, lhs.RentedOn);	// reversed
}

/******************************************************************************/

function RentedShowSearchByAvailableUntilCmpr(lhs, rhs)
{
	var rc = compareDates(lhs.AvailableUntil, rhs.AvailableUntil);

	if(rc != 0)
		return rc;

	return RentedShowSearchByNameCmpr(lhs, rhs);
}

/******************************************************************************/

function RentedShowSearchByAvailableUntilDescCmpr(lhs, rhs)
{
	var rc = compareDates(rhs.AvailableUntil, lhs.AvailableUntil);	// reversed

	if(rc != 0)
		return rc;

	return RentedShowSearchByNameDescCmpr(lhs, rhs);
}

/******************************************************************************/
/******************************************************************************/
/* RentedShow.js */

/******************************************************************************/
/******************************************************************************/

function RentedShow(reader)
{
	this.RentedShowID = null;

	this.ShowID = null;
	this.ProviderID = null;
	this.Name = null;
	this.EpisodeName = null;
	this.EpisodeNumber= null;

	this.ReleasedOn = null;
	this.ReleasedYear = null;
	this.Description = null;
	this.RunningMins = null;
	this.PictureURL = null;

	this.CategoryIDList = null;
	this.RatingID = null;
	this.IsAdult = false;

	this.ShowCost = null;
	this.RentedOn = null;
	this.AvailableUntil = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShow.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowID = reader.readString("RentedShowID", RentedShowIDMaxLength);

	this.ShowID = reader.readString("ShowID", ShowIDMaxLength);
	this.ProviderID = reader.readString("ProviderID", ProviderIDMaxLength);
	this.Name = reader.readString("Name", 64);
	this.EpisodeName = reader.readString("EpisodeName", 64);
	this.EpisodeNumber = reader.readString("EpisodeNumber", 32);

	this.ReleasedOn = reader.readDateTime("ReleasedOn");
	this.ReleasedYear = reader.readShort("ReleasedYear");
	this.Description = reader.readString("Description", 4096);	//TODO:
	this.RunningMins = reader.readShort("RunningMins");
	this.PictureURL = reader.readString("PictureURL", 4096);	//TODO:

	this.CategoryIDList = reader.readStringList("CategoryID", String);
	this.RatingID = reader.readString("RatingID", RatingIDMaxLength);
	this.IsAdult = reader.readBoolean("IsAdult");

	this.ShowCost = reader.readObject("ShowCost", ShowCost);
	this.RentedOn = reader.readDateTime("RentedOn");
	this.AvailableUntil = reader.readDateTime("AvailableUntil");
}

/******************************************************************************/
/******************************************************************************/
/* License.js */

/******************************************************************************/
/******************************************************************************/

License.ShowURLMaxLength = 4096;
License.LicenseURLMaxLength = 4096;
License.ContentIDMaxLength = 64;
License.UserIDMaxLength = 64;
License.PasswordMaxLength = 32;

/******************************************************************************/

function License(reader)
{
	this.LicenseMethod = null;
	this.ShowURL = null;
	this.LicenseURL = null;
	this.ContentID = null;
	this.UserID = null;
	this.Password = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ License.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.LicenseMethod = reader.readString("LicenseMethod", LicenseMethodMaxLength);
	this.ShowURL = reader.readString("ShowURL", License.ShowURLMaxLength);
	this.LicenseURL = reader.readString("LicenseURL", License.LicenseURLMaxLength);
	this.ContentID = reader.readString("ContentID", License.ContentIDMaxLength);
	this.UserID = reader.readString("UserID", License.UserIDMaxLength);
	this.Password = reader.readString("Password", License.MaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* LicenseMethod.js */

/******************************************************************************/
/******************************************************************************/

var LicenseMethodMaxLength = 32;

var lm_URLOnly = "URLOnly";
var lm_LicenseServer = "LicenseServer";

/******************************************************************************/
/******************************************************************************/
/* StatusCode.js */

/******************************************************************************/
/******************************************************************************/

var sc_Success = 0;

var sc_InvalidUserIDPassword = 1000;
var sc_InvalidSession = 1001;
var sc_InvalidProviderUserIDPassword = 1003;

var sc_GeneralError = 9999;

/******************************************************************************/
/******************************************************************************/
/* HTTPRequestor.js */

/******************************************************************************/
/******************************************************************************/

HTTPRequestor.newInstance = function()
{
	return new HTTPRequestor();
}

/******************************************************************************/

function HTTPRequestor()
{
}

/******************************************************************************/

/*XMLHttpRequest*/ HTTPRequestor.prototype.sendRequest = function(/*string*/ url,
	/*string*/ request)
{

	var xmlHttp = createXMLHttpRequest();
	xmlHttp.open("POST", url, false);
	xmlHttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
	xmlHttp.send(request);

	return xmlHttp;
}

/******************************************************************************/

/*void*/ HTTPRequestor.prototype.sendRequestAsync = function(/*string*/ url,
	/*string*/ request, /*object*/ callbackObj)
{
	try
	{
		var session = MainApp.getThe().getSession();

		var xmlHttp = createXMLHttpRequest();
		xmlHttp.onreadystatechange = function() { HTTPRequestor_checkRequest(xmlHttp, callbackObj); };
		xmlHttp.open("POST", url, true);
		xmlHttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
		xmlHttp.send(request);
	}
	catch(ignore)
	{
		HTTPRequestor_callback(callbackObj, null);
	}
}

/******************************************************************************/

/*void*/ function HTTPRequestor_checkRequest(/*XMLHttpRequest*/ xmlHttp,
	/*object*/ callbackObj)
{
	if(xmlHttp.readyState == 4)
	{
		try
		{
			if(xmlHttp.status == 200)
			{
				HTTPRequestor_callback(callbackObj, xmlHttp);
				return;
			}
		}
		catch(ignore)
		{
		}

		HTTPRequestor_callback(callbackObj, null);
	}
}

/******************************************************************************/

/*void*/ function HTTPRequestor_callback(/*object*/ callbackObj, /*object*/ data)
{
	if(isObject(callbackObj) && isFunction(callbackObj.Callback))
	{
		try
		{
			callbackObj.Callback(data);
		}
		catch(e)
		{
			showError("HTTPRequestor_callback", e);
		}
	}
	else if(isFunction(callbackObj))
	{
		try
		{
			callbackObj(data);
		}
		catch(e)
		{
			showError("HTTPRequestor_callback", e);
		}
	}
}

/******************************************************************************/

/*XMLHttpRequest*/ HTTPRequestor.prototype.sendGet = function(/*string*/ url)
{
	var xmlHttp = createXMLHttpRequest();
	xmlHttp.open("GET", url, false);
	xmlHttp.send(null);

	return xmlHttp;
}

/******************************************************************************/
/******************************************************************************/
/* DataRequestor.js */

/******************************************************************************/
/******************************************************************************/

DataRequestor.newInstance = function(/*string*/ sessionData)
{
	return new DataRequestor(sessionData);
}

/******************************************************************************/

function DataRequestor(/*string*/ sessionData)
{
	this.Callback = null;
	this.CallerCallback = null;

	this.fSessionData = null;
	if(testStrHasLen(sessionData))
		this.fSessionData = sessionData;

	this.fStatusCode = sc_GeneralError;
	this.fStatusMessage = null;
}

/******************************************************************************/

/*INetVODPlayerRqst*/ DataRequestor.prototype.createHeader = function(/*Streamable*/ payload)
{
	var request;
	var requestData;

	request = INetVODPlayerRqst.newInstance();
	request.setVersion("1.0.0");	//TODO:
	request.setRequestID("1");	//TODO:
	request.setSessionData(this.fSessionData);

	requestData = RequestData.newInstance();
	requestData.setRequest(payload);
	request.setRequestData(requestData);

	return request;
}

/******************************************************************************/

/*Streamable*/ DataRequestor.prototype.parseHeader = function(/*INetVODPlayerResp*/ response)
{
	this.fStatusCode = response.StatusCode;
	this.fStatusMessage = response.StatusMessage;

	if(this.fStatusCode == sc_InvalidSession)
		MainApp.getThe().reset();

	if(isNull(response.ResponseData))
	{
		if(this.fStatusCode == sc_Success)
			this.fStatusCode = sc_GeneralError;
		return null;
	}

	return response.ResponseData.Response;
}

/******************************************************************************/

/*Streamable*/ DataRequestor.prototype.sendRequest = function(/*Streamable*/ payload)
{
	var session = MainApp.getThe().getSession();
	var httpRequestor = HTTPRequestor.newInstance();

	// build the request header
	var request = this.createHeader(payload);

	// build request data
	var dataWriter = new XmlDataWriter();
	dataWriter.writeObject("INetVODPlayerRqst", request);

	var xmlHttp = httpRequestor.sendRequest(session.getNetworkURL(), dataWriter.toString());
	var dataReader = new XmlDataReader(xmlHttp.responseXML);

	var requestable = dataReader.readObject("INetVODPlayerResp", INetVODPlayerResp);
	return this.parseHeader(requestable);
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.sendRequestAsync = function(/*Streamable*/ payload,
	/*object*/ callbackObj)
{
	try
	{
		var session = MainApp.getThe().getSession();
		var httpRequestor = HTTPRequestor.newInstance();

		// build the request header
		var request = this.createHeader(payload);

		// build request data
		var dataWriter = new XmlDataWriter();
		dataWriter.writeObject("INetVODPlayerRqst", request);

		this.Callback = DataRequestor.prototype.parseResponse;
		this.CallerCallback = callbackObj;
		httpRequestor.sendRequestAsync(session.getNetworkURL(), dataWriter.toString(), this);
	}
	catch(e)
	{
		showError("DataRequestor.sendRequestAsync", e);
		this.callbackCaller(null);
	}
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.parseResponse = function(/*XMLHttpRequest*/ xmlHttp)
{
	try
	{
		if(xmlHttp)
		{
			var dataReader = new XmlDataReader(xmlHttp.responseXML);
			var requestable = dataReader.readObject("INetVODPlayerResp", INetVODPlayerResp);
			this.callbackCaller(this.parseHeader(requestable));
		}
		else
			this.callbackCaller(null);
	}
	catch(e)
	{
		showError("DataRequestor.parseResponse", e);
		this.callbackCaller(null);
	}
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.callbackCaller = function(/*object*/ data)
{
	if(isObject(this.CallerCallback) && isFunction(this.CallerCallback.Callback))
	{
		try
		{
			this.CallerCallback.Callback(data, this.fStatusCode, this.fStatusMessage);
		}
		catch(e)
		{
			showError("DataRequestor.callbackCaller", e);
		}
	}
}

/******************************************************************************/

/*void*/ DataRequestor.prototype.startRequest = function(/*object*/ request,
	/*object*/ callbackObj)
{
	this.sendRequestAsync(request, callbackObj);
}

/******************************************************************************/
/******************************************************************************/
/* INetVODPlayerRqst.js */

/******************************************************************************/
/******************************************************************************/

INetVODPlayerRqst.newInstance = function()
{
	return new INetVODPlayerRqst();
}

/******************************************************************************/

function INetVODPlayerRqst()
{
	this.VersionMaxLength = 16;
	this.RequestIDMaxLength = 64;
	this.SessionDataMaxLength = 32768;

	this.fVersion = null;
	this.fRequestID = 0;
	this.fSessionData = null;
	this.fRequestData = null;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setVersion = function(/*string*/ version)
{
	this.fVersion = version;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setRequestID = function(/*string*/ requestID)
{
	this.fRequestID = requestID;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setSessionData = function(/*string*/ sessionData)
{
	this.fSessionData = sessionData;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.setRequestData = function(/*RequestData*/ requestData)
{
	this.fRequestData = requestData;
}

/******************************************************************************/

/*void*/ INetVODPlayerRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("Version", this.fVersion, this.VersionMaxLength);
	writer.writeString("RequestID", this.fRequestID, this.RequestIDMaxLength);
	writer.writeString("SessionData", this.fSessionData, this.SessionDataMaxLength);

	writer.writeObject("RequestData", this.fRequestData);
}

/******************************************************************************/
/******************************************************************************/
/* INetVODPlayerResp */

/******************************************************************************/
/******************************************************************************/

function INetVODPlayerResp(reader)
{
	this.RequestIDMaxLength = 64;
	this.StatusMessageMaxLength = 1024;

	this.RequestID = null;
	this.StatusCode = 0;
	this.StatusMessage = null;
	this.ResponseData = null;
	
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ INetVODPlayerResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RequestID = reader.readString("RequestID", this.RequestIDMaxLength);
	this.StatusCode = reader.readInt("StatusCode");
	this.StatusMessage = reader.readString("StatusMessage", this.StatusMessageMaxLength);
	this.ResponseData = reader.readObject("ResponseData", ResponseData);
}

/******************************************************************************/
/******************************************************************************/
/* RequestData.js */

/******************************************************************************/
/******************************************************************************/

RequestData.newInstance = function()
{
	return new RequestData();
}

/******************************************************************************/

function RequestData()
{
	this.RequestTypeMaxLength = 64;

	this.fRequestType = null;
	this.fRequest = null;
}

/******************************************************************************/

/*void*/ RequestData.prototype.setRequest = function(/*Requestable*/ request)
{
	this.fRequestType = request.className();
	this.fRequest = request;
}

/******************************************************************************/

/*void*/ RequestData.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RequestType", this.fRequestType, this.RequestTypeMaxLength);
	writer.writeObject(this.fRequestType, this.fRequest);
}

/******************************************************************************/
/******************************************************************************/
/* ResponseData.js */

/******************************************************************************/
/******************************************************************************/

function ResponseData(reader)
{
	this.ResponseTypeMaxLength = 64;

	this.fResponseType = null;
	this.Response = null;
	
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ResponseData.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.fResponseType = reader.readString("ResponseType", this.ResponseTypeMaxLength);
	this.Response = reader.readObject(this.fResponseType, eval(this.fResponseType));
}

/******************************************************************************/
/******************************************************************************/
/* PingRqst */

/******************************************************************************/
/******************************************************************************/

PingRqst.newInstance = function()
{
	return new PingRqst();
}

/******************************************************************************/

function PingRqst()
{
}

/******************************************************************************/

/*string*/ PingRqst.prototype.className = function()
{
	return "PingRqst";
}

/******************************************************************************/

/*void*/ PingRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* PingResp */

/******************************************************************************/
/******************************************************************************/

function PingResp(reader)
{
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ PingResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* SignonRqst */

/******************************************************************************/
/******************************************************************************/

SignonRqst.UserIDMaxLength = 128;
SignonRqst.PasswordMaxLength = 32;

/******************************************************************************/

SignonRqst.newInstance = function()
{
	return new SignonRqst();
}

/******************************************************************************/

function SignonRqst()
{
	this.UserID = null;
	this.Password = null;
	this.Player = null;
}

/******************************************************************************/

/*string*/ SignonRqst.prototype.className = function()
{
	return "SignonRqst";
}

/******************************************************************************/

/*void*/ SignonRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("UserID", this.UserID, SignonRqst.UserIDMaxLength);
	writer.writeString("Password", this.Password, SignonRqst.PasswordMaxLength);
	writer.writeObject("Player", this.Player);
}

/******************************************************************************/
/******************************************************************************/
/* SignonResp */

/******************************************************************************/
/******************************************************************************/

SignonResp.SessionDataMaxLength = 32767;

/******************************************************************************/

function SignonResp(reader)
{
	this.SessionData = null;
	this.SessionExpires = null;
	this.MemberState = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ SignonResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.SessionData = reader.readString("SessionData", SignonResp.SessionDataMaxLength);
	this.SessionExpires = reader.readDateTime("SessionExpires");
	this.MemberState = reader.readObject("MemberState", MemberState);
}

/******************************************************************************/
/******************************************************************************/
/* SystemDataRqst */

/******************************************************************************/
/******************************************************************************/

SystemDataRqst.newInstance = function()
{
	return new SystemDataRqst();
}

/******************************************************************************/

function SystemDataRqst()
{
}

/******************************************************************************/

/*string*/ SystemDataRqst.prototype.className = function()
{
	return "SystemDataRqst";
}

/******************************************************************************/

/*void*/ SystemDataRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* SystemDataResp */

/******************************************************************************/
/******************************************************************************/

function SystemDataResp(reader)
{
	this.ProviderList = null;
	this.CategoryList = null;
	this.RatingList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ SystemDataResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ProviderList = reader.readList("Provider", Provider);
	this.CategoryList = reader.readList("Category", Category);
	this.RatingList = reader.readList("Rating", Rating);
}

/******************************************************************************/
/******************************************************************************/
/* EnableAdultAccessRqst */

/******************************************************************************/
/******************************************************************************/

EnableAdultAccessRqst.PasswordMaxLength = 32;

/******************************************************************************/

EnableAdultAccessRqst.newInstance = function()
{
	return new EnableAdultAccessRqst();
}

/******************************************************************************/

function EnableAdultAccessRqst()
{
	this.Password = null;
}

/******************************************************************************/

/*string*/ EnableAdultAccessRqst.prototype.className = function()
{
	return "EnableAdultAccessRqst";
}

/******************************************************************************/

/*void*/ EnableAdultAccessRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("Password", this.Password, EnableAdultAccessRqst.PasswordMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* EnableAdultAccessResp */

/******************************************************************************/
/******************************************************************************/

function EnableAdultAccessResp(reader)
{
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ EnableAdultAccessResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* ShowSearchRqst */

/******************************************************************************/
/******************************************************************************/

ShowSearchRqst.MaxResults = 1000;	//TODO: ???

/******************************************************************************/

ShowSearchRqst.newInstance = function()
{
	return new ShowSearchRqst();
}

/******************************************************************************/

function ShowSearchRqst()
{
	this.Search = null;

	this.ProviderIDList = null;
	this.CategoryIDList = null;
	this.RatingIDList = null;

	this.MaxResults = ShowSearchRqst.MaxResults;
}

/******************************************************************************/

/*string*/ ShowSearchRqst.prototype.className = function()
{
	return "ShowSearchRqst";
}

/******************************************************************************/

/*void*/ ShowSearchRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("Search", this.Search, 64);	//TODO: Show_NameMaxLength

	writer.writeStringList("ProviderID", this.ProviderIDList, ProviderIDMaxLength);
	writer.writeStringList("CategoryID", this.CategoryIDList, CategoryIDMaxLength);
	writer.writeStringList("RatingID", this.RatingIDList, RatingIDMaxLength);

	writer.writeShort("MaxResults", this.MaxResults);
}

/******************************************************************************/
/******************************************************************************/
/* ShowSearchResp */

/******************************************************************************/
/******************************************************************************/

function ShowSearchResp(reader)
{
	this.ShowSearchList = null;
	this.ReachedMax = false;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowSearchResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowSearchList = reader.readList("ShowSearch", ShowSearch);
	this.ReachedMax = reader.readBoolean("ReachedMax");
}

/******************************************************************************/
/******************************************************************************/
/* ShowDetailRqst */

/******************************************************************************/
/******************************************************************************/

ShowDetailRqst.newInstance = function()
{
	return new ShowDetailRqst();
}

/******************************************************************************/

function ShowDetailRqst()
{
	this.ShowID = null;
}

/******************************************************************************/

/*string*/ ShowDetailRqst.prototype.className = function()
{
	return "ShowDetailRqst";
}

/******************************************************************************/

/*void*/ ShowDetailRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowID", this.ShowID, ShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* ShowDetailResp */

/******************************************************************************/
/******************************************************************************/

function ShowDetailResp(reader)
{
	this.ShowDetail = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ShowDetailResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowDetail = reader.readObject("ShowDetail", ShowDetail);
}

/******************************************************************************/
/******************************************************************************/
/* ProviderEnrollRqst */

/******************************************************************************/
/******************************************************************************/

ProviderEnrollRqst.newInstance = function()
{
	return new ProviderEnrollRqst();
}

/******************************************************************************/

function ProviderEnrollRqst()
{
	this.ProviderID = null;
}

/******************************************************************************/

/*string*/ ProviderEnrollRqst.prototype.className = function()
{
	return "ProviderEnrollRqst";
}

/******************************************************************************/

/*void*/ ProviderEnrollRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* ProviderEnrollResp */

/******************************************************************************/
/******************************************************************************/

function ProviderEnrollResp(reader)
{
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ProviderEnrollResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* SetProviderRqst */

/******************************************************************************/
/******************************************************************************/

SetProviderRqst.UserIDMaxLength = 128;
SetProviderRqst.PasswordMaxLength = 32;

/******************************************************************************/

SetProviderRqst.newInstance = function()
{
	return new SetProviderRqst();
}

/******************************************************************************/

function SetProviderRqst()
{
	this.ProviderID = null;
	this.UserID = null;
	this.Password = null;
}

/******************************************************************************/

/*string*/ SetProviderRqst.prototype.className = function()
{
	return "SetProviderRqst";
}

/******************************************************************************/

/*void*/ SetProviderRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
	writer.writeString("UserID", this.UserID, SetProviderRqst.UserIDMaxLength);
	writer.writeString("Password", this.Password, SetProviderRqst.PasswordMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* SetProviderResp */

/******************************************************************************/
/******************************************************************************/

function SetProviderResp(reader)
{
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ SetProviderResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* CheckShowAvailRqst */

/******************************************************************************/
/******************************************************************************/

CheckShowAvailRqst.newInstance = function()
{
	return new CheckShowAvailRqst();
}

/******************************************************************************/

function CheckShowAvailRqst()
{
	this.ShowID = null;
	this.ProviderID = null;
	this.ShowCost = null;
}

/******************************************************************************/

/*string*/ CheckShowAvailRqst.prototype.className = function()
{
	return "CheckShowAvailRqst";
}

/******************************************************************************/

/*void*/ CheckShowAvailRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowID", this.ShowID, ShowIDMaxLength);
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
	writer.writeObject("ShowCost", this.ShowCost);
}

/******************************************************************************/
/******************************************************************************/
/* CheckShowAvailResp */

/******************************************************************************/
/******************************************************************************/

function CheckShowAvailResp(reader)
{
	this.ShowCost = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ CheckShowAvailResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.ShowCost = reader.readObject("ShowCost", ShowCost);
}

/******************************************************************************/
/******************************************************************************/
/* RentShowRqst */

/******************************************************************************/
/******************************************************************************/

RentShowRqst.newInstance = function()
{
	return new RentShowRqst();
}

/******************************************************************************/

function RentShowRqst()
{
	this.ShowID = null;
	this.ProviderID = null;
	this.ApprovedCost = null;
}

/******************************************************************************/

/*string*/ RentShowRqst.prototype.className = function()
{
	return "RentShowRqst";
}

/******************************************************************************/

/*void*/ RentShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ShowID", this.ShowID, ShowIDMaxLength);
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
	writer.writeObject("ApprovedCost", this.ApprovedCost);
}

/******************************************************************************/
/******************************************************************************/
/* RentShowResp */

/******************************************************************************/
/******************************************************************************/

function RentShowResp(reader)
{
	this.RentShowID = null;
	this.License = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowID = reader.readString("RentedShowID", RentedShowIDMaxLength);
	this.License = reader.readObject("License", License);
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowListRqst */

/******************************************************************************/
/******************************************************************************/

RentedShowListRqst.newInstance = function()
{
	return new RentedShowListRqst();
}

/******************************************************************************/

function RentedShowListRqst()
{
}

/******************************************************************************/

/*string*/ RentedShowListRqst.prototype.className = function()
{
	return "RentedShowListRqst";
}

/******************************************************************************/

/*void*/ RentedShowListRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowListResp */

/******************************************************************************/
/******************************************************************************/

function RentedShowListResp(reader)
{
	this.RentedShowSearchList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShowListResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShowSearchList = reader.readList("RentedShowSearch", RentedShowSearch);
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowRqst */

/******************************************************************************/
/******************************************************************************/

RentedShowRqst.newInstance = function()
{
	return new RentedShowRqst();
}

/******************************************************************************/

function RentedShowRqst()
{
	this.RentedShowID = null;
}

/******************************************************************************/

/*string*/ RentedShowRqst.prototype.className = function()
{
	return "RentedShowRqst";
}

/******************************************************************************/

/*void*/ RentedShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RentedShowID", this.RentedShowID, RentedShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowResp */

/******************************************************************************/
/******************************************************************************/

function RentedShowResp(reader)
{
	this.RentedShow = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ RentedShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.RentedShow = reader.readObject("RentedShow", RentedShow);
}

/******************************************************************************/
/******************************************************************************/
/* WatchShowRqst */

/******************************************************************************/
/******************************************************************************/

WatchShowRqst.newInstance = function()
{
	return new WatchShowRqst();
}

/******************************************************************************/

function WatchShowRqst()
{
	this.RentedShowID = null;
}

/******************************************************************************/

/*string*/ WatchShowRqst.prototype.className = function()
{
	return "WatchShowRqst";
}

/******************************************************************************/

/*void*/ WatchShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RentedShowID", this.RentedShowID, RentedShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* WatchShowResp */

/******************************************************************************/
/******************************************************************************/

function WatchShowResp(reader)
{
	this.License = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ WatchShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.License = reader.readObject("License", License);
}

/******************************************************************************/
/******************************************************************************/
/* ReleaseShowRqst */

/******************************************************************************/
/******************************************************************************/

ReleaseShowRqst.newInstance = function()
{
	return new ReleaseShowRqst();
}

/******************************************************************************/

function ReleaseShowRqst()
{
	this.RentedShowID = null;
}

/******************************************************************************/

/*string*/ ReleaseShowRqst.prototype.className = function()
{
	return "ReleaseShowRqst";
}

/******************************************************************************/

/*void*/ ReleaseShowRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("RentedShowID", this.RentedShowID, RentedShowIDMaxLength);
}

/******************************************************************************/
/******************************************************************************/
/* ReleaseShowResp */

/******************************************************************************/
/******************************************************************************/

function ReleaseShowResp(reader)
{
	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ ReleaseShowResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	/* no fields */
}

/******************************************************************************/
/******************************************************************************/
/* StartScreen.js */

/******************************************************************************/
/******************************************************************************/

StartScreen.ScreenID = "StartUp001";
StartScreen.StartID = "StartUp001_Start";

/******************************************************************************/

StartScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new StartScreen());
}

/******************************************************************************/

StartScreen.prototype = new Screen();
StartScreen.prototype.constructor = StartScreen;

/******************************************************************************/

function StartScreen()
{
	this.ScreenID = StartScreen.ScreenID;
	this.ScreenTitle = "welcome";
	this.ScreenTitleImage = "titleWelcome.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 130, 200);
	this.fContainerControl.onNavigate = StartScreen.onNavigate;

	this.newControl(new ButtonControl(StartScreen.StartID, this.ScreenID));
	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ StartScreen.prototype.onButton = function(/*string*/ controlID)
{
	this.close();
	StartupInitialCheck();
}

/******************************************************************************/

/*string*/ StartScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == StartScreen.StartID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* WelcomeScreen.js */

/******************************************************************************/
/******************************************************************************/

WelcomeScreen.ScreenID = "Welcome001";
WelcomeScreen.NowPlayingID = "Welcome001_NowPlaying";
WelcomeScreen.FeaturedID = "Welcome001_Featured";
WelcomeScreen.SearchByCategoryID = "Welcome001_SearchByCategory";
WelcomeScreen.SearchByNameID = "Welcome001_SearchByName";
WelcomeScreen.PreferencesID = "Welcome001_Preferences";
WelcomeScreen.HelpID = "Welcome001_Help";

/******************************************************************************/

WelcomeScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new WelcomeScreen());
}

/******************************************************************************/

WelcomeScreen.prototype = new Screen();
WelcomeScreen.prototype.constructor = WelcomeScreen;

/******************************************************************************/

function WelcomeScreen()
{
	this.ScreenID = WelcomeScreen.ScreenID;
	this.ScreenTitle = "welcome";
	this.ScreenTitleImage = "titleWelcome.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 122, 182);
	this.newControl(new ButtonControl(WelcomeScreen.NowPlayingID, this.ScreenID));
	this.newControl(new ButtonControl(WelcomeScreen.FeaturedID, this.ScreenID));
	this.newControl(new ButtonControl(WelcomeScreen.SearchByCategoryID, this.ScreenID));
	this.newControl(new ButtonControl(WelcomeScreen.SearchByNameID, this.ScreenID));
	this.newControl(new ButtonControl(WelcomeScreen.PreferencesID, this.ScreenID));
	this.newControl(new TextControl(WelcomeScreen.HelpID, this.ScreenID));
	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ WelcomeScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(controlID == WelcomeScreen.NowPlayingID)
	{
		NowPlayingScreen.newInstance();
		return;
	}

	if(controlID == WelcomeScreen.FeaturedID)
	{
		var oSession = MainApp.getThe().getSession();

		var oSearchData = new SearchData();
		oSearchData.CategoryID = Category.FeaturedCategoryID;

		this.Callback = WelcomeScreen.prototype.afterShowSearch;
		oSession.showSearch(this, oSearchData);
		return;
	}

	if(controlID == WelcomeScreen.SearchByCategoryID)
	{
		CategorySearchScreen.newInstance();
		return;
	}

	if(controlID == WelcomeScreen.SearchByNameID)
	{
		SearchScreen.newInstance();
		return;
	}

	if(controlID == WelcomeScreen.PreferencesID)
	{
		PreferencesScreen.newInstance();
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ WelcomeScreen.prototype.afterShowSearch = function(/*ShowSearchList*/ showSearchList,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		SearchResultsScreen.newInstance(showSearchList);
}

/******************************************************************************/

/*void*/ WelcomeScreen.prototype.onFocus = function(/*string*/ controlID)
{
	var oTextControl = this.getControl(WelcomeScreen.HelpID);

	if(controlID == WelcomeScreen.NowPlayingID)
		oTextControl.setText("\"Now Playing\" lists the shows that you have previously rented and have available for viewing.");
	else if(controlID == WelcomeScreen.FeaturedID)
		oTextControl.setText("\"Featured\" lists shows that are currently featured.");
	else if(controlID == WelcomeScreen.SearchByCategoryID)
		oTextControl.setText("Use \"Search by Category\" to find shows by a specific category.");
	else if(controlID == WelcomeScreen.SearchByNameID)
		oTextControl.setText("Use \"Search by Title\" to find shows by a partial show title.");
	else if(controlID == WelcomeScreen.PreferencesID)
		oTextControl.setText("\"Preferences\" allows you to update your iNetVOD settings.");
	else
		oTextControl.setText("");
}

/******************************************************************************/
/******************************************************************************/
/* StartupFlows.js */

/******************************************************************************/
/******************************************************************************/

function StartupInitialCheck()
{
	var oSession = MainApp.getThe().getSession();

	/* has the app been installed locally? */
	if(!oSession.checkInstall())
	{
		NotInstalledScreen.newInstance();
		return;
	}

	/* connect to the server */
	if(!oSession.CanPingServer)
	{
		oSession.pingServer(StartupInitial_afterPingServer);
	}
	else
		StartupInitial_afterPingServer(null, sc_Success, null);
}

/******************************************************************************/

/*void*/ function StartupInitial_afterPingServer(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	if(statusCode != sc_Success)
	{
		StartScreen.newInstance();
		return;
	}

	var oSession = MainApp.getThe().getSession();

	if(!oSession.loadDataSettings())
	{
		SetupScreen.newInstance();
		return;
	}

	if(!oSession.haveUserPassword())
	{
		AskPINScreen.newInstance();
		return;
	}

	oSession.signon(StartupInitial_afterSignon);
}

/******************************************************************************/

/*void*/ function StartupInitial_afterSignon(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		oSession.loadSystemData(StartupInitial_afterLoadSystemData);
	}
	else if(statusCode == sc_InvalidUserIDPassword)
	{
		AskPINScreen.newInstance();
	}
}

/******************************************************************************/

/*void*/ function StartupInitial_afterLoadSystemData(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		WelcomeScreen.newInstance();
	}
	else
	{
		oSession.clearLogonInfo();
		StartScreen.newInstance();
	}
}

/******************************************************************************/
/******************************************************************************/
/* NotInstalledScreen.js */

/******************************************************************************/
/******************************************************************************/

NotInstalledScreen.ScreenID = "StartUp002";
NotInstalledScreen.ContinueID = "StartUp002_Continue";

/******************************************************************************/

NotInstalledScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new NotInstalledScreen());
}

/******************************************************************************/

NotInstalledScreen.prototype = new Screen();
NotInstalledScreen.prototype.constructor = NotInstalledScreen;

/******************************************************************************/

function NotInstalledScreen()
{
	this.ScreenID = NotInstalledScreen.ScreenID;
	this.ScreenTitle = "setup";
	this.ScreenTitleImage = "titleSetup.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 130, 200);
	this.fContainerControl.onNavigate = NotInstalledScreen.onNavigate;

	this.newControl(new ButtonControl(NotInstalledScreen.ContinueID, this.ScreenID));
	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ NotInstalledScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(MainApp.getThe().getSession().checkInstall())
	{
		this.close();
		StartupInitialCheck();
	}
	else
		showMsg("iNetVOD has not yet been installed.");
}

/******************************************************************************/

/*string*/ NotInstalledScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == NotInstalledScreen.ContinueID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* AskPINScreen.js */

/******************************************************************************/
/******************************************************************************/

AskPINScreen.ScreenID = "Startup004";

AskPINScreen.PINID = "Startup004_PIN";
AskPINScreen.ContinueID = "Startup004_Continue";

/******************************************************************************/

AskPINScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new AskPINScreen());
}

/******************************************************************************/

AskPINScreen.prototype = new Screen();
AskPINScreen.prototype.constructor = AskPINScreen;

/******************************************************************************/

function AskPINScreen()
{
	var oControl;

	this.ScreenID = AskPINScreen.ScreenID;
	this.ScreenTitle = "enter pin";
	this.ScreenTitleImage = "titleEnterpin.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 200, 200);
	this.fContainerControl.onNavigate = AskPINScreen.onNavigate;

	oControl = new EditControl(AskPINScreen.PINID, this.ScreenID, 6);
	this.newControl(oControl);
	oControl.MaxLength = 6;
	oControl.AutoButton = true;
	this.newControl(new ButtonControl(AskPINScreen.ContinueID, this.ScreenID));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*boolean*/ AskPINScreen.prototype.key = function(/*int*/ key)
{
	var handled = Screen.prototype.key.call(this, key);

	if((key == ek_Back) || (key == ek_Backspace))
	{
		if(!this.isOpen())
			StartScreen.newInstance();
	}

	return handled;
}

/******************************************************************************/

/*void*/ AskPINScreen.prototype.onButton = function(/*string*/ controlID)
{
	var data;

	data = this.getControl(AskPINScreen.PINID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("PIN must be entered.");
		return;
	}

	var oSession = MainApp.getThe().getSession();

	this.Callback = AskPINScreen.prototype.afterSignon;
	oSession.signon(this, null, data);

	//Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ AskPINScreen.prototype.afterSignon = function(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.close();

		oSession.saveDataSettings();	// for possible temp store of userPassword

		oSession.loadSystemData(StartupInitial_afterLoadSystemData);
	}
}

/******************************************************************************/

/*string*/ AskPINScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
		if((fromControl == AskPINScreen.PINID) || (fromControl == AskPINScreen.ContinueID))
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* SetupScreen.js */

/******************************************************************************/
/******************************************************************************/

SetupScreen.ScreenID = "Setup001";

/* SetupStep */
var ss_AskSignedUpStep = 0;
var ss_NeedLogonIDStep = 1;
var ss_HaveLogonIDStep = 2;

/******************************************************************************/

SetupScreen.newInstance = function()
{
	var oScreen = new SetupScreen();

	MainApp.getThe().openScreen(oScreen);
	oScreen.openStep(ss_AskSignedUpStep);

	return oScreen;
}

/******************************************************************************/

SetupScreen.prototype = new Screen();
SetupScreen.prototype.constructor = SetupScreen;

/******************************************************************************/

function SetupScreen()
{
	this.ScreenID = SetupScreen.ScreenID;
	this.ScreenTitle = "setup";
	this.ScreenTitleImage = "titleSetup.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 130, 170);

	this.fStepControlID = AskSignedUpControl.ControlID;
	this.fSetupData = new SetupData();
	this.fCurStep = ss_AskSignedUpStep;
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.close = function()
{
	var oContainerControl = this.findControl(this.fStepControlID);
	if(oContainerControl != null)
		oContainerControl.show(false);
	Screen.prototype.close.call(this);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.openStep = function(/*int*/ step)
{
	var oContainerControl;

	switch(step)
	{
		case ss_AskSignedUpStep:
		default:
			oContainerControl = AskSignedUpControl.newInstance();
			break;
		case ss_NeedLogonIDStep:
			oContainerControl = NeedLogonIDControl.newInstance();
			break;
		case ss_HaveLogonIDStep:
			oContainerControl = HaveLogonIDControl.newInstance();
			break;
	}

	oContainerControl.show(true);
	oContainerControl.setFocus(true);
	this.newControl(oContainerControl);
	this.fStepControlID = oContainerControl.ControlID;
	this.fCurStep = step;
	oContainerControl.loadData(this.fSetupData);
}

/******************************************************************************/

/*boolean*/ SetupScreen.prototype.closeStep = function(/*boolean*/ doUnload)
{
	var oContainerControl = this.getControl(this.fStepControlID);

	if(doUnload)
	{
		if(!oContainerControl.unloadData(this.fSetupData))
			return false;
	}

	oContainerControl.show(false);
	this.deleteControl(this.fStepControlID);
	return true;
}

/******************************************************************************/

/*boolean*/ SetupScreen.prototype.key = function(/*int*/ key)
{
	if((key == ek_Back) || (key == ek_Backspace))
	{
		if(this.fContainerControl.key(key))
			return true;

		if(this.fCurStep == ss_AskSignedUpStep)
		{
			StartScreen.newInstance();
			this.close();
			return true;
		}
		else if(this.fCurStep == ss_NeedLogonIDStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskSignedUpStep);

			return true;
		}
		else if(this.fCurStep == ss_HaveLogonIDStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskSignedUpStep);

			return true;
		}
	}

	return Screen.prototype.key.call(this, key);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(this.fCurStep == ss_AskSignedUpStep)
	{
		if(controlID == AskSignedUpControl.NotRegisteredID)
		{
			if(this.closeStep(true))
				this.openStep(ss_NeedLogonIDStep);
			return;
		}
		else if(controlID == AskSignedUpControl.AlreadyRegisteredID)
		{
			if(this.closeStep(true))
				this.openStep(ss_HaveLogonIDStep);
			return;
		}
	}
	else if(this.fCurStep == ss_NeedLogonIDStep)
	{
		if(controlID == NeedLogonIDControl.HaveLogonID)
		{
			if(this.closeStep(true))
				this.openStep(ss_HaveLogonIDStep);
			return;
		}
	}
	else if(this.fCurStep == ss_HaveLogonIDStep)
	{
		if(controlID == HaveLogonIDControl.ContinueID)
		{
			this.doSetupSignon();
			return;
		}
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.doSetupSignon = function()
{
	var oContainerControl = this.getControl(this.fStepControlID);

	if(oContainerControl.unloadData(this.fSetupData))
	{
		var oSession = MainApp.getThe().getSession();

		this.Callback = SetupScreen.prototype.doSetupAfterSignon;
		oSession.signon(this, this.fSetupData.UserID, this.fSetupData.UserPassword,
			this.fSetupData.RememberPassword);
	}
}

/******************************************************************************/

/*void*/ SetupScreen.prototype.doSetupAfterSignon = function(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		this.close();

		if(!oSession.saveDataSettings())
		{
			showMsg("An error occured while saving your settings.");
			SetupScreen.newInstance();
			return;
		}

		oSession.loadSystemData(StartupInitial_afterLoadSystemData);
	}
}

/******************************************************************************/
/******************************************************************************/
/* SetupData.js */

/******************************************************************************/
/******************************************************************************/

function SetupData()
{
	this.UserID = null;
	this.UserPassword = null;
	this.RememberPassword = false;
}

/******************************************************************************/
/******************************************************************************/
/* AskSignedUpControl.js */

/******************************************************************************/
/******************************************************************************/

AskSignedUpControl.ControlID = "Setup001_AskSignedUpControl";

AskSignedUpControl.AlreadyRegisteredID = "Setup001_AskSignedUpControl_AlreadyRegistered";
AskSignedUpControl.NotRegisteredID = "Setup001_AskSignedUpControl_NotRegistered";

/******************************************************************************/

AskSignedUpControl.newInstance = function()
{
	var containerControl = new AskSignedUpControl(AskSignedUpControl.ControlID, 0, 0);
	containerControl.onNavigate = AskSignedUpControl.onNavigate;

	containerControl.newControl(new ButtonControl(AskSignedUpControl.AlreadyRegisteredID, SetupScreen.ScreenID));
	containerControl.newControl(new ButtonControl(AskSignedUpControl.NotRegisteredID, SetupScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, SetupScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

AskSignedUpControl.prototype = new ContainerControl();
AskSignedUpControl.prototype.constructor = AskSignedUpControl;

/******************************************************************************/

function AskSignedUpControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*string*/ AskSignedUpControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return AskSignedUpControl.NotRegisteredID;

	if((AskSignedUpControl.AlreadyRegisteredID) || (fromControl == AskSignedUpControl.NotRegisteredID))
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* NeedLogonIDControl.js */

/******************************************************************************/
/******************************************************************************/

NeedLogonIDControl.ControlID = "Setup001_NeedLogonIDControl";

NeedLogonIDControl.HaveLogonID = "Setup001_NeedLogonIDControl_HaveLogon";

/******************************************************************************/

NeedLogonIDControl.newInstance = function()
{
	var containerControl = new NeedLogonIDControl(NeedLogonIDControl.ControlID, 0, 0);
	containerControl.onNavigate = NeedLogonIDControl.onNavigate;

	containerControl.newControl(new ButtonControl(NeedLogonIDControl.HaveLogonID, SetupScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, SetupScreen.ScreenID));

	return containerControl;
}

/******************************************************************************/

NeedLogonIDControl.prototype = new ContainerControl();
NeedLogonIDControl.prototype.constructor = NeedLogonIDControl;

/******************************************************************************/

function NeedLogonIDControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*string*/ NeedLogonIDControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return NeedLogonIDControl.HaveLogonID;

	if(fromControl == NeedLogonIDControl.HaveLogonID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* HaveLogonIDControl.js */

/******************************************************************************/
/******************************************************************************/

HaveLogonIDControl.ControlID = "Setup001_HaveLogonIDControl";

HaveLogonIDControl.LogonID = "Setup001_HaveLogonIDControl_Logon";
HaveLogonIDControl.PINID = "Setup001_HaveLogonIDControl_PIN";
HaveLogonIDControl.RememberPINID = "Setup001_HaveLogonIDControl_RememberPIN";
HaveLogonIDControl.ContinueID = "Setup001_HaveLogonIDControl_Continue";

/******************************************************************************/

HaveLogonIDControl.newInstance = function()
{
	var containerControl = new HaveLogonIDControl(HaveLogonIDControl.ControlID, 0, 0);
	containerControl.onNavigate = HaveLogonIDControl.onNavigate;

	var oControl;

	oControl = new EditControl(HaveLogonIDControl.LogonID, SetupScreen.ScreenID, 9)
	containerControl.newControl(oControl);
	oControl.MaxLength = 9;
	oControl = new EditControl(HaveLogonIDControl.PINID, SetupScreen.ScreenID, 6);
	oControl.MaxLength = 6;
	containerControl.newControl(oControl);

	oControl = new CheckControl(HaveLogonIDControl.RememberPINID, SetupScreen.ScreenID);
	oControl.setChecked(true);
	containerControl.newControl(oControl);

	containerControl.newControl(new ButtonControl(HaveLogonIDControl.ContinueID, SetupScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, SetupScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

HaveLogonIDControl.prototype = new ContainerControl();
HaveLogonIDControl.prototype.constructor = AskSignedUpControl;

/******************************************************************************/

function HaveLogonIDControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ HaveLogonIDControl.prototype.loadData = function(/*object*/ oData)
{
	return true;
}

/******************************************************************************/

/*boolean*/ HaveLogonIDControl.prototype.unloadData = function(/*object*/ oData)
{
	var data;
	var oSetupData = oData;

	data = this.getControl(HaveLogonIDControl.LogonID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("Logon ID must be entered.");
		return false;
	}
	oSetupData.UserID = data;

	data = this.getControl(HaveLogonIDControl.PINID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("PIN must be entered.");
		return false;
	}
	oSetupData.UserPassword = data;

	oSetupData.RememberPassword = this.getControl(HaveLogonIDControl.RememberPINID).getChecked();

	return true;
}

/******************************************************************************/

/*string*/ HaveLogonIDControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return HaveLogonIDControl.ContinueID;

	if(key == ek_LeftButton)
	{
		if((fromControl == HaveLogonIDControl.LogonID)
				|| (fromControl == HaveLogonIDControl.PINID)
				|| (fromControl == HaveLogonIDControl.RememberPINID)
				|| (fromControl == HaveLogonIDControl.ContinueID))
			return ViewPortControl.ControlID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* CategorySearchScreen.js */

/******************************************************************************/
/******************************************************************************/

CategorySearchScreen.ScreenID = "Search010";
CategorySearchScreen.CategoriesID = "Search010_Categories";

/******************************************************************************/

CategorySearchScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new CategorySearchScreen());
}

/******************************************************************************/

CategorySearchScreen.prototype = new Screen();
CategorySearchScreen.prototype.constructor = CategorySearchScreen;

/******************************************************************************/

function CategorySearchScreen()
{
	this.ScreenID = CategorySearchScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Category", 438));

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);
	this.fContainerControl.onNavigate = CategorySearchScreen.onNavigate;

	// load the Categories
	var oSession = MainApp.getThe().getSession();
	var categoryList = oSession.getCategoryList();
	var itemList = new Array();

	for(var i = 0; i < categoryList.length; i++)
		itemList.push(new NameValuePair(categoryList[i].CategoryID, categoryList[i].Name));

	this.newControl(new TextListControl(CategorySearchScreen.CategoriesID, this.ScreenID, 8,
		oRowItemList, itemList));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ CategorySearchScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();
	var oTextListControl = this.getControl(CategorySearchScreen.CategoriesID);

	var oSearchData = new SearchData();
	oSearchData.CategoryID = oTextListControl.getFocusedItemValue().Name;

	this.Callback = CategorySearchScreen.prototype.afterShowSearch;
	oSession.showSearch(this, oSearchData);
}

/******************************************************************************/

/*void*/ CategorySearchScreen.prototype.afterShowSearch = function(/*ShowSearchList*/ showSearchList,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		SearchResultsScreen.newInstance(showSearchList);
}

/******************************************************************************/

/*string*/ CategorySearchScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
		if(fromControl == CategorySearchScreen.CategoriesID)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* SearchScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchScreen.ScreenID = "Search006";
SearchScreen.ShowNameID = "Search006_ShowName";
SearchScreen.SearchID = "Search006_Search";
SearchScreen.ProviderID = "Search006_Provider";
SearchScreen.CategoryID = "Search006_Category";
SearchScreen.RatingID = "Search006_Rating";

/******************************************************************************/

SearchScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new SearchScreen());
}

/******************************************************************************/

SearchScreen.prototype = new Screen();
SearchScreen.prototype.constructor = SearchScreen;

/******************************************************************************/

function SearchScreen()
{
	var oControl;

	this.ScreenID = SearchScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);
	this.fContainerControl.onNavigate = SearchScreen.onNavigate;

	oControl = new EditControl(SearchScreen.ShowNameID, this.ScreenID, 16);
	this.newControl(oControl);
	oControl.Type = ect_UpperAlphaNumeric;
	this.newControl(new ButtonControl(SearchScreen.SearchID, this.ScreenID));

	this.newControl(new ButtonControl(SearchScreen.ProviderID, this.ScreenID));
	this.newControl(new ButtonControl(SearchScreen.CategoryID, this.ScreenID));
	this.newControl(new ButtonControl(SearchScreen.RatingID, this.ScreenID));

	this.fSearchData = new SearchData();

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ SearchScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();
	var oControl;

	if((controlID == SearchScreen.SearchID) || (controlID == SearchScreen.ShowNameID))
	{
		oControl = this.getControl(SearchScreen.ShowNameID);
		this.fSearchData.Search = oControl.getText();

		this.Callback = SearchScreen.prototype.afterShowSearch;
		oSession.showSearch(this, this.fSearchData);
		return;
	}

	if(controlID == SearchScreen.ProviderID)
	{
		ProviderSelectScreen.newInstance(this.fSearchData);
		return;
	}

	if(controlID == SearchScreen.CategoryID)
	{
		CategorySelectScreen.newInstance(this.fSearchData);
		return;
	}

	if(controlID == SearchScreen.RatingID)
	{
		RatingSelectScreen.newInstance(this.fSearchData);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ SearchScreen.prototype.afterShowSearch = function(/*ShowSearchList*/ showSearchList,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		SearchResultsScreen.newInstance(showSearchList);
}

/******************************************************************************/

/*string*/ SearchScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
	{
		if(fromControl == SearchScreen.SearchID)
			return SearchScreen.ShowNameID;
		if((fromControl == SearchScreen.ShowNameID)
				|| (fromControl == SearchScreen.ProviderID)
				|| (fromControl == SearchScreen.CategoryID)
				|| (fromControl == SearchScreen.RatingID))
			return ViewPortControl.ControlID;
	}

	if(key == ek_RightButton)
	{
		if((fromControl == SearchScreen.ShowNameID)
				|| (fromControl == SearchScreen.ProviderID)
				|| (fromControl == SearchScreen.CategoryID)
				|| (fromControl == SearchScreen.RatingID))
			return SearchScreen.SearchID;
	}

	if(key == ek_DownButton)
	{
		if(fromControl == SearchScreen.ShowNameID)
			return SearchScreen.ProviderID;
	}

	if(key == ek_UpButton)
	{
		if(fromControl == SearchScreen.ProviderID)
			return SearchScreen.ShowNameID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* SearchData.js */

/******************************************************************************/
/******************************************************************************/

function SearchData()
{
	this.Search = null;

	this.ProviderID = Provider.AllProvidersID;
	this.CategoryID = Category.AllCategoriesID;
	this.RatingID = Rating.AllRatingsID;
}

/******************************************************************************/
/******************************************************************************/
/* ProviderSelectScreen.js */

/******************************************************************************/
/******************************************************************************/

ProviderSelectScreen.ScreenID = "Search001";
ProviderSelectScreen.ProvidersID = "Search001_Providers";

/******************************************************************************/

ProviderSelectScreen.newInstance = function(/*SearchDataPtr*/ oSearchData)
{
	var oScreen = MainApp.getThe().openScreen(new ProviderSelectScreen(oSearchData));

	if(testStrHasLen(oSearchData.ProviderID))
	{
		var oTextListControl = oScreen.getControl(ProviderSelectScreen.ProvidersID);
		oTextListControl.setFocusedItemByName(oSearchData.ProviderID);
	}

	return oScreen;
}

/******************************************************************************/

ProviderSelectScreen.prototype = new Screen();
ProviderSelectScreen.prototype.constructor = ProviderSelectScreen;

/******************************************************************************/

function ProviderSelectScreen(/*SearchDataPtr*/ oSearchData)
{
	this.ScreenID = ProviderSelectScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Provider", 438));

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);
	this.fContainerControl.onNavigate = ProviderSelectScreen.onNavigate;

	this.fSearchData = oSearchData;

	// load the Providers
	var oSession = MainApp.getThe().getSession();
	var providerList = oSession.getProviderList();
	var itemList = new Array();

	itemList.push(new NameValuePair(Provider.AllProvidersID, oSession.getProviderName(Provider.AllProvidersID)));
	for(var i = 0; i < providerList.length; i++)
		itemList.push(new NameValuePair(providerList[i].ProviderID, providerList[i].Name));

	this.newControl(new TextListControl(ProviderSelectScreen.ProvidersID, this.ScreenID, 8,
		oRowItemList, itemList));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ ProviderSelectScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oTextListControl = this.getControl(ProviderSelectScreen.ProvidersID);
	this.fSearchData.ProviderID = oTextListControl.getFocusedItemValue().Name;

	var oSession = MainApp.getThe().getSession();
	var oScreen = MainApp.getThe().getScreen(SearchScreen.ScreenID);
	var oButtonControl = oScreen.getControl(SearchScreen.ProviderID);
	oButtonControl.setText(oSession.getProviderName(this.fSearchData.ProviderID));

	this.close();
}

/******************************************************************************/

/*string*/ ProviderSelectScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
		if(fromControl == ProviderSelectScreen.ProvidersID)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* CategorySelectScreen.js */

/******************************************************************************/
/******************************************************************************/

CategorySelectScreen.ScreenID = "Search002";
CategorySelectScreen.CategoriesID = "Search002_Categories";

/******************************************************************************/

CategorySelectScreen.newInstance = function(/*SearchDataPtr*/ oSearchData)
{
	var oScreen = MainApp.getThe().openScreen(new CategorySelectScreen(oSearchData));

	if(testStrHasLen(oSearchData.CategoryID))
	{
		var oTextListControl = oScreen.getControl(CategorySelectScreen.CategoriesID);
		oTextListControl.setFocusedItemByName(oSearchData.CategoryID);
	}

	return oScreen;
}

/******************************************************************************/

CategorySelectScreen.prototype = new Screen();
CategorySelectScreen.prototype.constructor = CategorySelectScreen;

/******************************************************************************/

function CategorySelectScreen(/*SearchDataPtr*/ oSearchData)
{
	this.ScreenID = CategorySelectScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Category", 438));

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);
	this.fContainerControl.onNavigate = CategorySelectScreen.onNavigate;

	this.fSearchData = oSearchData;

	// load the Categories
	var oSession = MainApp.getThe().getSession();
	var categoryList = oSession.getCategoryList();
	var itemList = new Array();

	itemList.push(new NameValuePair(Category.AllCategoriesID, oSession.getCategoryName(Category.AllCategoriesID)));
	for(var i = 0; i < categoryList.length; i++)
		itemList.push(new NameValuePair(categoryList[i].CategoryID, categoryList[i].Name));

	this.newControl(new TextListControl(CategorySelectScreen.CategoriesID, this.ScreenID, 8,
		oRowItemList, itemList));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ CategorySelectScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oTextListControl = this.getControl(CategorySelectScreen.CategoriesID);
	this.fSearchData.CategoryID = oTextListControl.getFocusedItemValue().Name;

	var oSession = MainApp.getThe().getSession();
	var oScreen = MainApp.getThe().getScreen(SearchScreen.ScreenID);
	var oButtonControl = oScreen.getControl(SearchScreen.CategoryID);
	oButtonControl.setText(oSession.getCategoryName(this.fSearchData.CategoryID));

	this.close();
}

/******************************************************************************/

/*string*/ CategorySelectScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
		if(fromControl == CategorySelectScreen.CategoriesID)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* RatingSelectScreen.js */

/******************************************************************************/
/******************************************************************************/

RatingSelectScreen.ScreenID = "Search008";
RatingSelectScreen.RatingsID = "Search008_Ratings";

/******************************************************************************/

RatingSelectScreen.newInstance = function(/*SearchDataPtr*/ oSearchData)
{
	var oScreen = MainApp.getThe().openScreen(new RatingSelectScreen(oSearchData));

	if(testStrHasLen(oSearchData.RatingID))
	{
		var oTextListControl = oScreen.getControl(RatingSelectScreen.RatingsID);
		oTextListControl.setFocusedItemByName(oSearchData.RatingID);
	}

	return oScreen;
}

/******************************************************************************/

RatingSelectScreen.prototype = new Screen();
RatingSelectScreen.prototype.constructor = RatingSelectScreen;

/******************************************************************************/

function RatingSelectScreen(/*SearchDataPtr*/ oSearchData)
{
	this.ScreenID = RatingSelectScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Rating", 438));

	this.fContainerControl = new ContainerControl(this.ScreenID, 100, 150);
	this.fContainerControl.onNavigate = RatingSelectScreen.onNavigate;

	this.fSearchData = oSearchData;

	// load the Ratings
	var oSession = MainApp.getThe().getSession();
	var ratingList = oSession.getRatingList();
	var itemList = new Array();

	itemList.push(new NameValuePair(Rating.AllRatingsID, oSession.getRatingName(Rating.AllRatingsID)));
	for(var i = 0; i < ratingList.length; i++)
		itemList.push(new NameValuePair(ratingList[i].RatingID, ratingList[i].Name));

	this.newControl(new TextListControl(RatingSelectScreen.RatingsID, this.ScreenID, 8,
		oRowItemList, itemList));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ RatingSelectScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oTextListControl = this.getControl(RatingSelectScreen.RatingsID);
	this.fSearchData.RatingID = oTextListControl.getFocusedItemValue().Name;

	var oSession = MainApp.getThe().getSession();
	var oScreen = MainApp.getThe().getScreen(SearchScreen.ScreenID);
	var oButtonControl = oScreen.getControl(SearchScreen.RatingID);
	oButtonControl.setText(oSession.getRatingName(this.fSearchData.RatingID));

	this.close();
}

/******************************************************************************/

/*string*/ RatingSelectScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
		if(fromControl == RatingSelectScreen.RatingsID)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* SearchResultsScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchResultsScreen.ScreenID = "Search003";
SearchResultsScreen.BodyID = "Search003_Body";
SearchResultsScreen.ShowListID = "Search003_ShowList";
SearchResultsScreen.NameID = "Search003_Name";
SearchResultsScreen.EpisodeNameID = "Search003_EpisodeName";
SearchResultsScreen.ProviderID = "Search003_Provider";
SearchResultsScreen.SortByNameID = "Search003_SortByName";
SearchResultsScreen.SortByDateID = "Search003_SortByDate";
SearchResultsScreen.SortByPriceID = "Search003_SortByPrice";
SearchResultsScreen.NoShowsTextID = "Search003_NoShowsText";

/******************************************************************************/

SearchResultsScreen.newInstance = function(/*Array*/ showSearchList)
{
	var oScreen = new SearchResultsScreen(showSearchList);
	MainApp.getThe().openScreen(oScreen);
	return oScreen;
}

/******************************************************************************/

SearchResultsScreen.prototype = new Screen();
SearchResultsScreen.prototype.constructor = SearchResultsScreen;

/******************************************************************************/

function SearchResultsScreen(/*Array*/ showSearchList)
{
	this.fShowSearchList = showSearchList;
	this.fShowSearchList.sort(ShowSearchByNameCmpr);
	this.ScreenID = SearchResultsScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Show", 495));
	oRowItemList.push(new ListControlRowItem("Date", 85));
	oRowItemList.push(new ListControlRowItem("Cost", 100));

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);
	this.fContainerControl.onNavigate = SearchResultsScreen.onNavigate;
	this.fContainerControl.DefaultFocusControlID = SearchResultsScreen.ShowListID;

	var oControl;

	if(showSearchList.length > 0)
	{
		this.newControl(new ButtonControl(SearchResultsScreen.SortByNameID, this.ScreenID));
		this.newControl(new ButtonControl(SearchResultsScreen.SortByDateID, this.ScreenID));
		this.newControl(new ButtonControl(SearchResultsScreen.SortByPriceID, this.ScreenID));
	}

	oControl = new ShowSearchListControl(SearchResultsScreen.ShowListID, this.ScreenID,
		6, oRowItemList, showSearchList);
	if(showSearchList.length > 0)
		this.newControl(oControl);
	(new ContainerControl(SearchResultsScreen.BodyID, 0, 0)).show(showSearchList.length > 0);

	if(showSearchList.length > 0)
	{
		this.newControl(new TextControl(SearchResultsScreen.NameID, this.ScreenID));
		this.newControl(new TextControl(SearchResultsScreen.EpisodeNameID, this.ScreenID));
		this.newControl(new TextControl(SearchResultsScreen.ProviderID, this.ScreenID));
	}

	oControl = new TextControl(SearchResultsScreen.NoShowsTextID, this.ScreenID);
	if(showSearchList.length == 0)
		this.newControl(oControl);
	oControl.show(showSearchList.length == 0);

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ SearchResultsScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();
	var oShowSearchListControl;

	if(controlID == SearchResultsScreen.ShowListID)
	{
		oShowSearchListControl = this.getControl(SearchResultsScreen.ShowListID);
		var oShowSearch = oShowSearchListControl.getFocusedItemValue();

		this.Callback = SearchResultsScreen.prototype.afterShowDetail;
		oSession.showDetail(this, oShowSearch.ShowID);
		return;
	}

	if((controlID == SearchResultsScreen.SortByNameID) || (controlID == SearchResultsScreen.SortByDateID)
		|| (controlID == SearchResultsScreen.SortByPriceID))
	{
		if(controlID == SearchResultsScreen.SortByNameID)
			this.fShowSearchList.sort(ShowSearchByNameCmpr);
		else if(controlID == SearchResultsScreen.SortByDateID)
			this.fShowSearchList.sort(ShowSearchByDateDescCmpr);
		else
			this.fShowSearchList.sort(ShowSearchByCostCmpr);

		oShowSearchListControl = this.getControl(SearchResultsScreen.ShowListID);
		oShowSearchListControl.setShowSearchList(this.fShowSearchList, true);
		this.focusControl(SearchResultsScreen.ShowListID, true);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ SearchResultsScreen.prototype.afterShowDetail = function(/*ShowDetail*/ showDetail,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		SearchDetailScreen.newInstance(showDetail);
}

/******************************************************************************/

/*void*/ SearchResultsScreen.prototype.onListItem = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == SearchResultsScreen.ShowListID)
	{
		var oShowSearchListControl = this.getControl(SearchResultsScreen.ShowListID);
		var oShowSearch = oShowSearchListControl.getFocusedItemValue();
		var showProviderList = oShowSearch.ShowProviderList;
		var tempStr = "";;

		this.getControl(SearchResultsScreen.NameID).setText(oShowSearch.Name);
		this.getControl(SearchResultsScreen.EpisodeNameID).setText(oShowSearch.EpisodeName);

		for(var i = 0; i < showProviderList.length; i++)
		{
			if(testStrHasLen(tempStr))
				tempStr += ", ";
			tempStr += oSession.getProviderName(showProviderList[i].ProviderID);
			tempStr += " (" + showProviderList[i].ShowCostList[0].CostDisplay + ")";	//TODO: Showing first ShowCost
		}
		this.getControl(SearchResultsScreen.ProviderID).setText(tempStr);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*string*/ SearchResultsScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == SearchResultsScreen.ShowListID)
	{
		if(key == ek_LeftButton)
			return SearchResultsScreen.SortByNameID;
		if(key == ek_DownButton)
			return ViewPortControl.ControlID;
	}

	if(fromControl == SearchResultsScreen.SortByNameID)
		if(key == ek_RightButton)
			return SearchResultsScreen.ShowListID;

	if(fromControl == SearchResultsScreen.SortByDateID)
		if(key == ek_RightButton)
			return SearchResultsScreen.ShowListID;

	if(fromControl == SearchResultsScreen.SortByPriceID)
	{
		if(key == ek_RightButton)
			return SearchResultsScreen.ShowListID;
		if(key == ek_DownButton)
			return ViewPortControl.ControlID;
	}

	if(fromControl == ViewPortControl.ControlID)
	{
		if(key == ek_RightButton)
			return SearchResultsScreen.ShowListID;
		if(key == ek_UpButton)
			return SearchResultsScreen.SortByPriceID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* SearchDetailScreen.js */

/******************************************************************************/
/******************************************************************************/

SearchDetailScreen.ScreenID = "Search004";
SearchDetailScreen.NameID = "Search004_Name";
SearchDetailScreen.EpisodeID = "Search004_Episode";
SearchDetailScreen.ReleasedID = "Search004_Released";
SearchDetailScreen.DescriptionID = "Search004_Description";
SearchDetailScreen.RunningMinsID = "Search004_RunningMins";
SearchDetailScreen.CategoryID = "Search004_Category";
SearchDetailScreen.ProviderID = "Search004_Provider";
SearchDetailScreen.RatingID = "Search004_Rating";
SearchDetailScreen.CostID = "Search004_Cost";
SearchDetailScreen.RentalPeriodHoursID = "Search004_RentalPeriodHours";
SearchDetailScreen.MultiRentalsID = "Search004_MultiRentals";
SearchDetailScreen.RentNowID = "Search004_RentNow";

/******************************************************************************/

SearchDetailScreen.newInstance = function(/*RentedShow*/ showDetail)
{
	return MainApp.getThe().openScreen(new SearchDetailScreen(showDetail));
}

/******************************************************************************/

SearchDetailScreen.prototype = new Screen();
SearchDetailScreen.prototype.constructor = SearchDetailScreen;

/******************************************************************************/

function SearchDetailScreen(/*RentedShow*/ showDetail)
{
	var oSession = MainApp.getThe().getSession();
	var oControl;
	var tempStr;

	this.fShowDetail = showDetail;
	this.ScreenID = SearchDetailScreen.ScreenID;
	this.ScreenTitle = "search";
	this.ScreenTitleImage = "titleSearch.gif";

	var showProvider = this.fShowDetail.ShowProviderList[0];
	var showCost = showProvider.ShowCostList[0];

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);

	oControl = new ButtonControl(SearchDetailScreen.RentNowID, this.ScreenID);
	oControl.setText((showCost.ShowCostType == sct_Free) ? "Get Now" : "Rent Now");
	this.newControl(oControl);


	oControl = new TextControl(SearchDetailScreen.NameID, this.ScreenID);
	oControl.setText(this.fShowDetail.Name);
	this.newControl(oControl);

	tempStr = "";
	if(testStrHasLen(this.fShowDetail.EpisodeName) || testStrHasLen(this.fShowDetail.EpisodeNumber))
	{
		if(testStrHasLen(this.fShowDetail.EpisodeName))
		{
			tempStr = '"' + this.fShowDetail.EpisodeName + '"';
			if(testStrHasLen(this.fShowDetail.EpisodeNumber))
				tempStr += " (" + this.fShowDetail.EpisodeNumber + ")";
		}
		else
			tempStr = "Episode: " + this.fShowDetail.EpisodeNumber;

	}
	oControl = new TextControl(SearchDetailScreen.EpisodeID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.DescriptionID, this.ScreenID);
	oControl.setText(this.fShowDetail.Description);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fShowDetail.ReleasedOn)
		tempStr = dateTimeToString(this.fShowDetail.ReleasedOn, dtf_M_D_YYYY, true);
	else if(this.fShowDetail.ReleasedYear)
		tempStr = this.fShowDetail.ReleasedYear.toString();
	oControl = new TextControl(SearchDetailScreen.ReleasedID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fShowDetail.RunningMins)
		tempStr = this.fShowDetail.RunningMins + " mins";
	oControl = new TextControl(SearchDetailScreen.RunningMinsID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fShowDetail.RatingID)
		tempStr = oSession.getRatingName(this.fShowDetail.RatingID)
	oControl = new TextControl(SearchDetailScreen.RatingID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.CategoryID, this.ScreenID);
	oControl.setText(oSession.getCategoryNames(this.fShowDetail.CategoryIDList));
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.ProviderID, this.ScreenID);
	oControl.setText(oSession.getProviderName(showProvider.ProviderID));
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.CostID, this.ScreenID);
	oControl.setText(showCost.CostDisplay);
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.RentalPeriodHoursID, this.ScreenID);
	oControl.setText(showCost.formatRental());
	this.newControl(oControl);

	oControl = new TextControl(SearchDetailScreen.MultiRentalsID, this.ScreenID);
	if((this.fShowDetail.ShowProviderList.length > 1) || (showProvider.ShowCostList.length > 1))
		oControl.setText("* Additional rentals available.");
	else
		oControl.setText("");
	this.newControl(oControl);

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ SearchDetailScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == SearchDetailScreen.RentNowID)
	{
		RentScreen.newInstance(this.fShowDetail);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/
/******************************************************************************/
/* RentData.js */

/******************************************************************************/
/******************************************************************************/

function RentData(/*ShowDetail*/ oShowDetail)
{
	var oSession = MainApp.getThe().getSession();

	this.ShowDetail = oShowDetail;

	this.HasMultipleRentals = true;
	this.Provider = null;
	this.ShowCost = null;

	if(this.ShowDetail.ShowProviderList.length == 1)
		if(this.ShowDetail.ShowProviderList[0].ShowCostList.length == 1)
		{
			this.HasMultipleRentals = false;
			this.Provider = oSession.getProvider(this.ShowDetail.ShowProviderList[0].ProviderID);
			this.ShowCost = this.ShowDetail.ShowProviderList[0].ShowCostList[0];
		}

	this.UserID = null;
	this.Password = null;
}

/******************************************************************************/

/*string*/ RentData.prototype.getShowID = function()
{
	return this.ShowDetail.ShowID;
}

/******************************************************************************/

/*string*/ RentData.prototype.getProviderID = function()
{
	return this.Provider.ProviderID;
}

/******************************************************************************/

/*string*/ RentData.prototype.getProviderName = function()
{
	return this.Provider.Name;
}

/******************************************************************************/

/*void*/ RentData.prototype.setRental = function(/*Provider*/ provider, /*ShowCost*/ showCost)
{
	this.Provider = provider;
	this.ShowCost = showCost;
}

/******************************************************************************/
/******************************************************************************/
/* RentScreen.js */

/******************************************************************************/
/******************************************************************************/

RentScreen.ScreenID = "Rent001";

/* RentStep */
var ss_Undefined = 0;
var ss_PickRentalStep = 1;
var ss_AskHaveProviderStep = 2;
var ss_NeedProviderStep = 3;
var ss_HaveProviderStep = 4;
var ss_ConfirmChargeStep = 5;

/******************************************************************************/

RentScreen.newInstance = function(/*ShowDetail*/ oShowDetail)
{
	var oScreen = new RentScreen(oShowDetail);

	MainApp.getThe().openScreen(oScreen);
	oScreen.createControls();

	return oScreen;
}

/******************************************************************************/

RentScreen.prototype = new Screen();
RentScreen.prototype.constructor = RentScreen;

/******************************************************************************/

function RentScreen(/*ShowDetail*/ oShowDetail)
{
	this.ScreenID = RentScreen.ScreenID;
	this.ScreenTitle = "rent";
	this.ScreenTitleImage = "titleRent.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 130, 170);

	this.fStepControlID = null;
	this.fRentData = new RentData(oShowDetail);
	this.fCurStep = ss_Undefined;
}

/******************************************************************************/

/*void*/ RentScreen.prototype.close = function()
{
	var oContainerControl = this.findControl(this.fStepControlID);
	if(oContainerControl != null)
		oContainerControl.show(false);
	Screen.prototype.close.call(this);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.createControls = function()
{
	var oSession = MainApp.getThe().getSession();

	if(this.fRentData.HasMultipleRentals)
		this.openStep(ss_PickRentalStep);
	else
	{
		var nextStep = this.allowAnonymous();
		if (nextStep != ss_Undefined)
			this.openStep(nextStep);
	}
}

/******************************************************************************/

/*void*/ RentScreen.prototype.openStep = function(/*int*/ step)
{
	var oContainerControl;

	switch(step)
	{
		case ss_PickRentalStep:
		default:
			oContainerControl = PickRentalControl.newInstance();
			break;
		case ss_AskHaveProviderStep:
			oContainerControl = AskHaveProviderControl.newInstance();
			break;
		case ss_NeedProviderStep:
			oContainerControl = NeedProviderControl.newInstance();
			break;
		case ss_HaveProviderStep:
			oContainerControl = HaveProviderControl.newInstance();
			break;
		case ss_ConfirmChargeStep:
			oContainerControl = ConfirmChargeControl.newInstance();
			break;
	}

	oContainerControl.show(true);
	this.newControl(oContainerControl);
	this.fStepControlID = oContainerControl.ControlID;
	this.fCurStep = step;
	oContainerControl.loadData(this.fRentData);
	this.fContainerControl.setFocus(true);
}

/******************************************************************************/

/*boolean*/ RentScreen.prototype.closeStep = function(/*boolean*/ doUnload)
{
	var oContainerControl = this.getControl(this.fStepControlID);

	if(doUnload)
	{
		if(!oContainerControl.unloadData(this.fRentData))
			return false;
	}

	oContainerControl.show(false);
	this.deleteControl(this.fStepControlID);
	return true;
}

/******************************************************************************/

/*boolean*/ RentScreen.prototype.key = function(/*int*/ key)
{
	if((key == ek_Back) || (key == ek_Backspace))
	{
		if(this.fContainerControl.key(key))
			return true;

		if(this.fCurStep == ss_PickRentalStep)
		{
			if(this.closeStep(false))
				this.close();
			return true;
		}
		else if(this.fCurStep == ss_AskHaveProviderStep)
		{
			if(this.closeStep(false))
			{
				if(this.fRentData.HasMultipleRentals)
					this.openStep(ss_PickRentalStep);
				else
					this.close();
			}

			return true;
		}
		else if(this.fCurStep == ss_NeedProviderStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskHaveProviderStep);

			return true;
		}
		else if(this.fCurStep == ss_HaveProviderStep)
		{
			if(this.closeStep(false))
			{
				var oSession = MainApp.getThe().getSession();

				if(oSession.isMemberOfProvider(this.fRentData.getProviderID()))
					this.close();
				else
					this.openStep(ss_AskHaveProviderStep);
			}

			return true;
		}
		else if(this.fCurStep == ss_ConfirmChargeStep)
		{
			if(this.closeStep(false))
			{
				if(this.fRentData.HasMultipleRentals)
					this.openStep(ss_PickRentalStep);
				else
					this.close();
			}

			return true;
		}
	}

	return Screen.prototype.key.call(this, key);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(this.fCurStep == ss_PickRentalStep)
	{
		if(controlID == PickRentalControl.ProviderListID)
		{
			if(this.closeStep(true))
			{
				var nextStep = this.allowAnonymous();
				if (nextStep != ss_Undefined)
					this.openStep(nextStep);
			}
			return;
		}
	}
	else if(this.fCurStep == ss_AskHaveProviderStep)
	{
		if(controlID == AskHaveProviderControl.HaveMembershipID)
		{
			if(this.closeStep(true))
				this.openStep(ss_HaveProviderStep);
			return;
		}
		else if(controlID == AskHaveProviderControl.NeedMembershipID)
		{
			if(this.closeStep(true))
				this.openStep(ss_NeedProviderStep);
			return;
		}
	}
	else if(this.fCurStep == ss_NeedProviderStep)
	{
		if(controlID == NeedProviderControl.CreateMembershipID)
		{
			if(this.closeStep(true))
				this.providerEnroll();
			return;
		}
	}
	else if(this.fCurStep == ss_HaveProviderStep)
	{
		if(controlID == HaveProviderControl.ContinueID)
		{
			if(this.closeStep(true))
				this.setProvider();

			return;
		}
	}
	else if(this.fCurStep == ss_ConfirmChargeStep)
	{
		if(controlID == ConfirmChargeControl.ChargeAccountID)
		{
			if(this.closeStep(true))
				this.rentShow();
			//if(this.fRentedShowID)
			//	this.close();
			return;
		}
		else if(controlID == ConfirmChargeControl.DontChargeAccountID)
		{
			if(this.closeStep(true))
				this.close();
			return;
		}
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*RentStep*/ RentScreen.prototype.allowAnonymous = function()
{
	var oSession = MainApp.getThe().getSession();

	if((this.fRentData.ShowCost.ShowCostType == sct_Free) ||
		oSession.isMemberOfProvider(this.fRentData.getProviderID()))
	{
		this.checkShowAvail();
		return ss_Undefined;
	}
	else
		return ss_AskHaveProviderStep;
}

/******************************************************************************/

/*void*/ RentScreen.prototype.checkShowAvail = function()
{
	var oSession = MainApp.getThe().getSession();

	this.Callback = RentScreen.prototype.afterCheckShowAvail;
	oSession.checkShowAvail(this, this.fRentData.getShowID(), this.fRentData.getProviderID(),
		this.fRentData.ShowCost);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.afterCheckShowAvail = function(/*CheckShowAvailResp*/ oCheckShowAvailResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_InvalidProviderUserIDPassword)
	{
		this.openStep(ss_HaveProviderStep);
		return;
	}
	if(statusCode != sc_Success)
	{
		this.close();
		return;
	}

	var oShowCost = oCheckShowAvailResp.ShowCost;

	this.fRentData.ShowCost = oShowCost;
	if(oShowCost.ShowCostType == sct_PayPerView)
	{
		this.openStep(ss_ConfirmChargeStep);
		return;
	}

	this.rentShow();
}

/******************************************************************************/

/*void*/ RentScreen.prototype.rentShow = function()
{
	var oSession = MainApp.getThe().getSession();

	this.Callback = RentScreen.prototype.afterRentShow;
	oSession.rentShow(this, this.fRentData.getShowID(),
		this.fRentData.getProviderID(), this.fRentData.ShowCost);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.afterRentShow = function(/*RentShowResp*/ oRentShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	// close the SearchDetailScreen and this screen
	var oScreen = MainApp.getThe().findScreen(SearchDetailScreen.ScreenID);
	if(oScreen != null)
		oScreen.close();
	this.close();

	if(oRentShowResp != null)
	{
		// fetch the rentedShow and open the screen
		this.Callback = RentScreen.prototype.afterRentedShow;
		oSession.rentedShow(this, oRentShowResp.RentedShowID);
	}
}

/******************************************************************************/

/*void*/ RentScreen.prototype.afterRentedShow = function(/*RentedShow*/ rentedShow,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		RentedShowDetailScreen.newInstance(rentedShow);
	}

	// show message last, or will have focus problems
	showMsg("This Show has been successfully added to your Now Playing list.");
}

/******************************************************************************/

/*void*/ RentScreen.prototype.setProvider = function()
{
	var oSession = MainApp.getThe().getSession();

	this.Callback = RentScreen.prototype.afterSetProvider;
	oSession.setProvider(this, this.fRentData.getProviderID(),
		this.fRentData.UserID, this.fRentData.Password);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.afterSetProvider = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		this.checkShowAvail();
	else
		this.openStep(ss_HaveProviderStep);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.providerEnroll = function()
{
	var oSession = MainApp.getThe().getSession();

	this.Callback = RentScreen.prototype.afterProviderEnroll;
	oSession.providerEnroll(this, this.fRentData.getProviderID());
}

/******************************************************************************/

/*void*/ RentScreen.prototype.afterProviderEnroll = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();
	var tempStr;

	if(statusCode == sc_Success)
	{
		tempStr = "Congratulations! You have been successfully enrolled to ";
		tempStr += this.fRentData.getProviderName();
		tempStr += "'s membership.";

		showMsg(tempStr);

		this.checkShowAvail();
	}
	else
		this.openStep(ss_NeedProviderStep);
}

/******************************************************************************/
/******************************************************************************/
/* PickRentalControl.js */

/******************************************************************************/
/******************************************************************************/

PickRentalControl.ControlID = "Rent001_PickRentalControl";

PickRentalControl.AvailTextID = "Rent001_PickRentalControl_AvailText";
PickRentalControl.ProviderListID = "Rent001_PickRentalControl_ProviderList";

/******************************************************************************/

PickRentalControl.newInstance = function()
{
	var containerControl = new PickRentalControl(PickRentalControl.ControlID, 0, 0);
	containerControl.onNavigate = PickRentalControl.onNavigate;

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Provider", 350));
	oRowItemList.push(new ListControlRowItem("Rental", 230));
	oRowItemList.push(new ListControlRowItem("Price", 100));

	containerControl.newControl(new TextControl(PickRentalControl.AvailTextID, RentScreen.ScreenID));
	containerControl.newControl(new ShowProviderListControl(PickRentalControl.ProviderListID,
		RentScreen.ScreenID, 3, oRowItemList, null));

	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, RentScreen.ScreenID));

	return containerControl;
}

/******************************************************************************/

PickRentalControl.prototype = new ContainerControl();
PickRentalControl.prototype.constructor = PickRentalControl;

/******************************************************************************/

function PickRentalControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ PickRentalControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(PickRentalControl.AvailTextID);
	tempStr = "'" + oRentData.ShowDetail.Name + "' is available through multiple rentals.";
	oControl.setText(tempStr);

	oControl = this.getControl(PickRentalControl.ProviderListID);
	oControl.setShowProviderList(oRentData.ShowDetail.ShowProviderList, true);

	return true;
}

/******************************************************************************/

/*boolean*/ PickRentalControl.prototype.unloadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var showProviderItem;

	showProviderItem = this.getControl(PickRentalControl.ProviderListID).getFocusedItemValue();
	oRentData.setRental(showProviderItem.Provider, showProviderItem.ShowCost);

	return true;
}

/******************************************************************************/

/*string*/ PickRentalControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(key == ek_LeftButton)
		if(fromControl == PickRentalControl.ProviderListID)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* AskHaveProviderControl.js */

/******************************************************************************/
/******************************************************************************/

AskHaveProviderControl.ControlID = "Rent001_AskHaveProviderControl";

AskHaveProviderControl.WelcomeTextID = "Rent001_AskHaveProviderControl_WelcomeText";
AskHaveProviderControl.MembershipTextID = "Rent001_AskHaveProviderControl_MembershipText";
AskHaveProviderControl.HaveMembershipID = "Rent001_AskHaveProviderControl_HaveMembership";
AskHaveProviderControl.NeedMembershipID = "Rent001_AskHaveProviderControl_NeedMembership";

/******************************************************************************/

AskHaveProviderControl.newInstance = function()
{
	var containerControl = new AskHaveProviderControl(AskHaveProviderControl.ControlID, 0, 0);
	containerControl.onNavigate = AskHaveProviderControl.onNavigate;

	containerControl.newControl(new TextControl(AskHaveProviderControl.WelcomeTextID, RentScreen.ScreenID));
	containerControl.newControl(new TextControl(AskHaveProviderControl.MembershipTextID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(AskHaveProviderControl.HaveMembershipID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(AskHaveProviderControl.NeedMembershipID, RentScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

AskHaveProviderControl.prototype = new ContainerControl();
AskHaveProviderControl.prototype.constructor = AskHaveProviderControl;

/******************************************************************************/

function AskHaveProviderControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ AskHaveProviderControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(AskHaveProviderControl.WelcomeTextID);
	tempStr = "This show requires a membership with the provider, ";
	tempStr += oRentData.getProviderName();
	tempStr += ".";
	oControl.setText(tempStr);

	oControl = this.getControl(AskHaveProviderControl.MembershipTextID);
	tempStr = "Do you already have a membership with ";
	tempStr += oRentData.getProviderName();
	tempStr += "?";
	oControl.setText(tempStr);

	return true;
}

/******************************************************************************/

/*string*/ AskHaveProviderControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return AskHaveProviderControl.NeedMembershipID;

	if((fromControl == AskHaveProviderControl.HaveMembershipID)
		|| (fromControl == AskHaveProviderControl.NeedMembershipID))
	{
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* NeedProviderControl.js */

/******************************************************************************/
/******************************************************************************/

NeedProviderControl.ControlID = "Rent001_NeedProviderControl";

NeedProviderControl.MemberTextID = "Rent001_NeedProviderControl_MemberText";
NeedProviderControl.PlanTextID = "Rent001_NeedProviderControl_PlanText";
NeedProviderControl.CreateMembershipID = "Rent001_NeedProviderControl_CreateMembership";

/******************************************************************************/

NeedProviderControl.newInstance = function()
{
	var containerControl = new NeedProviderControl(NeedProviderControl.ControlID, 0, 0);
	containerControl.onNavigate = NeedProviderControl.onNavigate;

	containerControl.newControl(new TextControl(NeedProviderControl.MemberTextID, RentScreen.ScreenID));
	containerControl.newControl(new TextControl(NeedProviderControl.PlanTextID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(NeedProviderControl.CreateMembershipID, RentScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

NeedProviderControl.prototype = new ContainerControl();
NeedProviderControl.prototype.constructor = NeedProviderControl;

/******************************************************************************/

function NeedProviderControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ NeedProviderControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(NeedProviderControl.MemberTextID);
	tempStr = "Your iNetVOD membership information will be used to create a new FREE membership at ";
	tempStr += oRentData.getProviderName();
	tempStr += ".  Your credit card information, if on file, will not be sent to ";
	tempStr += oRentData.getProviderName();
	tempStr += ".";
	oControl.setText(tempStr);

	oControl = this.getControl(NeedProviderControl.PlanTextID);
	tempStr = oRentData.getProviderName();
	tempStr += " may have various member subscription plans that may be of interest to you.  Please visit the iNetVOD web site at www.inetvod.com for more information.";
	oControl.setText(tempStr);

	return true;
}

/******************************************************************************/

/*string*/ NeedProviderControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return NeedProviderControl.CreateMembershipID;

	if(fromControl == NeedProviderControl.CreateMembershipID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* HaveProviderControl.js */

/******************************************************************************/
/******************************************************************************/

HaveProviderControl.ControlID = "Rent001_HaveProviderControl";

HaveProviderControl.DescriptionID = "Rent001_HaveProviderControl_Description";
HaveProviderControl.UserID = "Rent001_HaveProviderControl_UserID";
HaveProviderControl.PasswordID = "Rent001_HaveProviderControl_Password";
HaveProviderControl.ContinueID = "Rent001_HaveProviderControl_Continue";

/******************************************************************************/

HaveProviderControl.newInstance = function()
{
	var containerControl = new HaveProviderControl(HaveProviderControl.ControlID, 0, 0);
	containerControl.onNavigate = HaveProviderControl.onNavigate;

	var oControl;

	containerControl.newControl(new TextControl(HaveProviderControl.DescriptionID, RentScreen.ScreenID));

	oControl = new EditControl(HaveProviderControl.UserID, RentScreen.ScreenID, 9)
	containerControl.newControl(oControl);
	oControl.Type = ect_AlphaNumeric;
	oControl.MaxLength = 64;
	oControl = new EditControl(HaveProviderControl.PasswordID, RentScreen.ScreenID, 6);
	oControl.Type = ect_AlphaNumeric;
	oControl.MaxLength = 16;
	containerControl.newControl(oControl);

	containerControl.newControl(new ButtonControl(HaveProviderControl.ContinueID, RentScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

HaveProviderControl.prototype = new ContainerControl();
HaveProviderControl.prototype.constructor = HaveProviderControl;

/******************************************************************************/

function HaveProviderControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ HaveProviderControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(HaveProviderControl.DescriptionID);
	tempStr = "Please enter your logon information for ";
	tempStr += oRentData.getProviderName();
	tempStr += ":";
	oControl.setText(tempStr);

	return true;
}

/******************************************************************************/

/*boolean*/ HaveProviderControl.prototype.unloadData = function(/*object*/ oData)
{
	var data;
	var oRentData = oData;

	data = this.getControl(HaveProviderControl.UserID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("User ID must be entered.");
		return false;
	}
	oRentData.UserID = data;

	data = this.getControl(HaveProviderControl.PasswordID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("Password must be entered.");
		return false;
	}
	oRentData.Password = data;

	return true;
}

/******************************************************************************/

/*string*/ HaveProviderControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return HaveProviderControl.ContinueID;

	if((fromControl == HaveProviderControl.UserID)
		|| (fromControl == HaveProviderControl.PasswordID)
		|| (fromControl == HaveProviderControl.ContinueID))
	{
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* ConfirmChargeControl.js */

/******************************************************************************/
/******************************************************************************/

ConfirmChargeControl.ControlID = "Rent001_ConfirmChargeControl";

ConfirmChargeControl.ChargeTextID = "Rent001_ConfirmChargeControl_ChargeText";
ConfirmChargeControl.ChargeAccountID = "Rent001_ConfirmChargeControl_ChargeAccount";
ConfirmChargeControl.DontChargeAccountID = "Rent001_ConfirmChargeControl_DontChargeAccount";

/******************************************************************************/

ConfirmChargeControl.newInstance = function()
{
	var containerControl = new ConfirmChargeControl(ConfirmChargeControl.ControlID, 0, 0);
	containerControl.onNavigate = ConfirmChargeControl.onNavigate;

	containerControl.newControl(new TextControl(ConfirmChargeControl.ChargeTextID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(ConfirmChargeControl.ChargeAccountID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(ConfirmChargeControl.DontChargeAccountID, RentScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

ConfirmChargeControl.prototype = new ContainerControl();
ConfirmChargeControl.prototype.constructor = ConfirmChargeControl;

/******************************************************************************/

function ConfirmChargeControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ ConfirmChargeControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oShowCost = oRentData.ShowCost;
	var oTextControl;
	var tempStr;

	oTextControl = this.getControl(ConfirmChargeControl.ChargeTextID);
	tempStr = "This show has a cost of ";
	tempStr += oShowCost.CostDisplay;
	tempStr += ".  This cost will be charged to your account at ";
	tempStr += oRentData.getProviderName();
	tempStr += ".";
	oTextControl.setText(tempStr);

	return true;
}

/******************************************************************************/

/*string*/ ConfirmChargeControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return ConfirmChargeControl.DontChargeAccountID;

	if((fromControl == ConfirmChargeControl.ChargeAccountID)
		|| (fromControl == ConfirmChargeControl.DontChargeAccountID))
	{
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* NowPlayingScreen.js */

/******************************************************************************/
/******************************************************************************/

NowPlayingScreen.ScreenID = "Show002";
NowPlayingScreen.BodyID = "Show002_Body";
NowPlayingScreen.ShowListID = "Show002_ShowList";
NowPlayingScreen.NameID = "Show002_Name";
NowPlayingScreen.EpisodeNameID = "Show002_EpisodeName";
NowPlayingScreen.ProviderID = "Show002_Provider";
NowPlayingScreen.SortByNameID = "Show002_SortByName";
NowPlayingScreen.SortByUntilID = "Show002_SortByUntil";
NowPlayingScreen.NoShowsTextID = "Show002_NoShowsText";

/******************************************************************************/

NowPlayingScreen.newInstance = function()
{
	MainApp.getThe().getSession().rentedShowList(NowPlayingScreen.afterRentedShowList);
}

/******************************************************************************/

/*void*/ NowPlayingScreen.afterRentedShowList = function(/*RentedShowSearchList*/ rentedShowSearchList,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		var oScreen = new NowPlayingScreen(rentedShowSearchList);
		MainApp.getThe().openScreen(oScreen);
		return oScreen;
	}
}

/******************************************************************************/

NowPlayingScreen.prototype = new Screen();
NowPlayingScreen.prototype.constructor = NowPlayingScreen;

/******************************************************************************/

function NowPlayingScreen(/*Array*/ rentedShowSearchList)
{
	this.fRentedShowSearchList = rentedShowSearchList;
	//no initial sort - this.fRentedShowSearchList.sort(RentedShowSearchByAvailableUntilCmpr);
	this.ScreenID = NowPlayingScreen.ScreenID;
	this.ScreenTitle = "playing";
	this.ScreenTitleImage = "titlePlaying.gif";

	var oRowItemList = new Array();
	oRowItemList.push(new ListControlRowItem("Show", 550));
	oRowItemList.push(new ListControlRowItem("Until", 130));

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);
	this.fContainerControl.onNavigate = NowPlayingScreen.onNavigate;
	this.fContainerControl.DefaultFocusControlID = NowPlayingScreen.ShowListID;

	var oControl;

	if(rentedShowSearchList.length > 0)
	{
		this.newControl(new ButtonControl(NowPlayingScreen.SortByNameID, this.ScreenID));
		this.newControl(new ButtonControl(NowPlayingScreen.SortByUntilID, this.ScreenID));
	}

	oControl = new RentedShowListControl(NowPlayingScreen.ShowListID, this.ScreenID,
		6, oRowItemList, rentedShowSearchList);
	if(rentedShowSearchList.length > 0)
		this.newControl(oControl);
	(new ContainerControl(NowPlayingScreen.BodyID, 0, 0)).show(rentedShowSearchList.length > 0);

	if(rentedShowSearchList.length > 0)
	{
		this.newControl(new TextControl(NowPlayingScreen.NameID, this.ScreenID));
		this.newControl(new TextControl(NowPlayingScreen.EpisodeNameID, this.ScreenID));
		this.newControl(new TextControl(NowPlayingScreen.ProviderID, this.ScreenID));
	}

	oControl = new TextControl(NowPlayingScreen.NoShowsTextID, this.ScreenID);
	if(rentedShowSearchList.length == 0)
		this.newControl(oControl);
	oControl.show(rentedShowSearchList.length == 0);

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.removeRentedShow = function(/*string*/ rentedShowID)
{
	var oControl;

	arrayRemoveByCmpr(this.fRentedShowSearchList, new RentedShowSearchToIDCmpr(rentedShowID));

	if(this.fRentedShowSearchList.length > 0)
	{
		var oRentedShowListControl = this.getControl(NowPlayingScreen.ShowListID);
		oRentedShowListControl.setRentedShowSearchList(this.fRentedShowSearchList, false);
	}
	else
	{
		(new ContainerControl(NowPlayingScreen.BodyID, 0, 0)).show(false);
		this.deleteControl(NowPlayingScreen.ShowListID);
		this.deleteControl(NowPlayingScreen.SortByNameID);
		this.deleteControl(NowPlayingScreen.SortByUntilID);
		this.deleteControl(NowPlayingScreen.NameID);
		this.deleteControl(NowPlayingScreen.EpisodeNameID);
		this.deleteControl(NowPlayingScreen.ProviderID);

		oControl = new TextControl(NowPlayingScreen.NoShowsTextID, this.ScreenID);
		this.newControl(oControl);
		oControl.show(true);
	}
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();
	var oRentedShowListControl;

	if(controlID == NowPlayingScreen.ShowListID)
	{
		oRentedShowListControl = this.getControl(NowPlayingScreen.ShowListID);

		this.Callback = NowPlayingScreen.prototype.afterRentedShow;
		oSession.rentedShow(this, oRentedShowListControl.getFocusedItemValue().RentedShowID);
		return;
	}

	if((controlID == NowPlayingScreen.SortByNameID) || (controlID == NowPlayingScreen.SortByUntilID))
	{
		if(controlID == NowPlayingScreen.SortByNameID)
			this.fRentedShowSearchList.sort(RentedShowSearchByNameCmpr);
		else
			this.fRentedShowSearchList.sort(RentedShowSearchByAvailableUntilCmpr);

		oRentedShowListControl = this.getControl(NowPlayingScreen.ShowListID);
		oRentedShowListControl.setRentedShowSearchList(this.fRentedShowSearchList, true);
		this.focusControl(NowPlayingScreen.ShowListID, true);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.afterRentedShow = function(/*RentedShow*/ rentedShow,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
		RentedShowDetailScreen.newInstance(rentedShow);
}

/******************************************************************************/

/*void*/ NowPlayingScreen.prototype.onListItem = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == NowPlayingScreen.ShowListID)
	{
		var rentedShowListControl = this.getControl(NowPlayingScreen.ShowListID);
		var rentedShowSearch = rentedShowListControl.getFocusedItemValue();
		var tempStr;

		this.getControl(NowPlayingScreen.NameID).setText(rentedShowSearch.Name);
		this.getControl(NowPlayingScreen.EpisodeNameID).setText(rentedShowSearch.EpisodeName);

		this.getControl(NowPlayingScreen.ProviderID).setText(
			oSession.getProviderName(rentedShowSearch.ProviderID)
			+ this.formatAvailableUntil(rentedShowSearch.AvailableUntil));
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*string*/ NowPlayingScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == NowPlayingScreen.ShowListID)
	{
		if(key == ek_LeftButton)
			return NowPlayingScreen.SortByNameID;
		if(key == ek_DownButton)
			return ViewPortControl.ControlID;
	}

	if(fromControl == NowPlayingScreen.SortByNameID)
		if(key == ek_RightButton)
			return NowPlayingScreen.ShowListID;

	if(fromControl == NowPlayingScreen.SortByUntilID)
	{
		if(key == ek_RightButton)
			return NowPlayingScreen.ShowListID;
		if(key == ek_DownButton)
			return ViewPortControl.ControlID;
	}

	if(fromControl == ViewPortControl.ControlID)
	{
		if(key == ek_RightButton)
			return NowPlayingScreen.ShowListID;
		if(key == ek_UpButton)
			return NowPlayingScreen.SortByUntilID;
	}

	return null;
}

/******************************************************************************/

/*string*/ NowPlayingScreen.prototype.formatAvailableUntil = function(/*Date*/ availableUntil)
{
	if(availableUntil == null)
		return "";

	var expires;
	var now = new Date();
	var totalDays = (availableUntil.getTime() - now.getTime()) / MillsPerDay;

	if(totalDays < 0)
		expires = ", Expired";
	else
		expires = ", Until " + dayOfWeekToString(availableUntil.getDay(), false)
			+ " " + dateTimeToString(availableUntil, dtf_M_D_H_MM_AM);

	return expires;
}

/******************************************************************************/
/******************************************************************************/
/* RentedShowDetailScreen.js */

/******************************************************************************/
/******************************************************************************/

RentedShowDetailScreen.ScreenID = "Show003";
RentedShowDetailScreen.StatusIconID = "Show003_StatusIcon";
RentedShowDetailScreen.NameID = "Show003_Name";
RentedShowDetailScreen.EpisodeID = "Show003_Episode";
RentedShowDetailScreen.ReleasedID = "Show003_Released";
RentedShowDetailScreen.DescriptionID = "Show003_Description";
RentedShowDetailScreen.RunningMinsID = "Show003_RunningMins";
RentedShowDetailScreen.CategoryID = "Show003_Category";
RentedShowDetailScreen.ProviderID = "Show003_Provider";
RentedShowDetailScreen.RatingID = "Show003_Rating";
RentedShowDetailScreen.CostID = "Show003_Cost";
RentedShowDetailScreen.RentalPeriodHoursID = "Show003_RentalPeriodHours";
RentedShowDetailScreen.RentedOnLabelID = "Show003_RentedOnLabel";
RentedShowDetailScreen.RentedOnID = "Show003_RentedOn";
RentedShowDetailScreen.AvailableUntilID = "Show003_AvailableUntil";
RentedShowDetailScreen.WatchNowID = "Show003_WatchNow";
RentedShowDetailScreen.DeleteNowID = "Show003_DeleteNow";

/******************************************************************************/

RentedShowDetailScreen.newInstance = function(/*RentedShow*/ rentedShow)
{
	return MainApp.getThe().openScreen(new RentedShowDetailScreen(rentedShow));
}

/******************************************************************************/

RentedShowDetailScreen.prototype = new Screen();
RentedShowDetailScreen.prototype.constructor = RentedShowDetailScreen;

/******************************************************************************/

function RentedShowDetailScreen(/*RentedShow*/ rentedShow)
{
	var oSession = MainApp.getThe().getSession();
	var oControl;
	var tempStr;

	this.fRentedShow = rentedShow;
	this.ScreenID = RentedShowDetailScreen.ScreenID;
	this.ScreenTitle = "playing";
	this.ScreenTitleImage = "titlePlaying.gif";
	this.fDownloadStatus = "";

	this.fContainerControl = new ContainerControl(this.ScreenID, 30, 120);

	this.newControl(new ButtonControl(RentedShowDetailScreen.WatchNowID, this.ScreenID));
	this.newControl(new ButtonControl(RentedShowDetailScreen.DeleteNowID, this.ScreenID));

	oControl = new ImageControl(RentedShowDetailScreen.StatusIconID, this.ScreenID);
	oControl.setSource("images/ballRed32.gif");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.NameID, this.ScreenID);
	oControl.setText(this.fRentedShow.Name);
	this.newControl(oControl);

	tempStr = "";
	if(testStrHasLen(this.fRentedShow.EpisodeName) || testStrHasLen(this.fRentedShow.EpisodeNumber))
	{
		if(testStrHasLen(this.fRentedShow.EpisodeName))
		{
			tempStr = '"' + this.fRentedShow.EpisodeName + '"';
			if(testStrHasLen(this.fRentedShow.EpisodeNumber))
				tempStr += " (" + this.fRentedShow.EpisodeNumber + ")";
		}
		else
			tempStr = "Episode: " + this.fRentedShow.EpisodeNumber;

	}
	oControl = new TextControl(RentedShowDetailScreen.EpisodeID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.DescriptionID, this.ScreenID);
	oControl.setText(this.fRentedShow.Description);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fRentedShow.ReleasedOn)
		tempStr = dateTimeToString(this.fRentedShow.ReleasedOn, dtf_M_D_YYYY, true);
	else if(this.fRentedShow.ReleasedYear)
		tempStr = this.fRentedShow.ReleasedYear.toString();
	oControl = new TextControl(RentedShowDetailScreen.ReleasedID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fRentedShow.RunningMins)
		tempStr = this.fRentedShow.RunningMins + " mins";
	oControl = new TextControl(RentedShowDetailScreen.RunningMinsID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	tempStr = "n/a";
	if(this.fRentedShow.RatingID)
		tempStr = oSession.getRatingName(this.fRentedShow.RatingID)
	oControl = new TextControl(RentedShowDetailScreen.RatingID, this.ScreenID);
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.CategoryID, this.ScreenID);
	oControl.setText(oSession.getCategoryNames(this.fRentedShow.CategoryIDList));
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.ProviderID, this.ScreenID);
	oControl.setText(oSession.getProviderName(this.fRentedShow.ProviderID));
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.CostID, this.ScreenID);
	oControl.setText(this.fRentedShow.ShowCost.CostDisplay);
	this.newControl(oControl);

	tempStr = "n/a";
	oControl = new TextControl(RentedShowDetailScreen.RentalPeriodHoursID, this.ScreenID);
	if(this.fRentedShow.ShowCost.RentalPeriodHours)
		tempStr = this.fRentedShow.ShowCost.RentalPeriodHours + " hrs";
	oControl.setText(tempStr);
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.RentedOnLabelID, this.ScreenID)
	oControl.setText((this.fRentedShow.ShowCost.ShowCostType == sct_Free) ? "Added On:" : "Rented On:");
	this.newControl(oControl);

	oControl = new TextControl(RentedShowDetailScreen.RentedOnID, this.ScreenID);
	oControl.setText(dateTimeToString(this.fRentedShow.RentedOn, dtf_M_D_H_MM_AM));
	this.newControl(oControl);

	tempStr = "n/a";
	oControl = new TextControl(RentedShowDetailScreen.AvailableUntilID, this.ScreenID);
	if(this.fRentedShow.AvailableUntil)
		tempStr = dateTimeToString(this.fRentedShow.AvailableUntil, dtf_M_D_H_MM_AM);
	oControl.setText(tempStr);
	this.newControl(oControl);

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.idle = function()
{
	if(this.fDownloadStatus != DownloadStatus_Completed)
	{
		var oSession = MainApp.getThe().getSession();

		oSession.downloadRefresh();
		var newDownloadStatus = oSession.getDownloadRentedShowStatus(this.fRentedShow.RentedShowID);

		if(this.fDownloadStatus != newDownloadStatus)
		{
			this.fDownloadStatus = newDownloadStatus;

			var oControl = this.findControl(RentedShowDetailScreen.StatusIconID);

			if(this.fDownloadStatus == DownloadStatus_InProgress)
				oControl.setSource("images/ballYellow32.gif");
			else if(this.fDownloadStatus == DownloadStatus_Completed)
				oControl.setSource("images/ballGreen32.gif");
			else //if(this.fDownloadStatus == DownloadStatus_NotStarted)
				oControl.setSource("images/ballRed32.gif");
			//else
			//	oControl.setSource("images/ballOrange32.gif");
		}
	}

	Screen.prototype.idle.call(this);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.onButton = function(/*string*/ controlID)
{
	var oSession = MainApp.getThe().getSession();

	if(controlID == RentedShowDetailScreen.WatchNowID)
	{
		oSession.downloadRefresh();
		var downloadStatus = oSession.getDownloadRentedShowStatus(this.fRentedShow.RentedShowID);

		if(downloadStatus == DownloadStatus_NotStarted)
		{
			showMsg("This show cannot be played until it has first been downloaded.");
			return;
		}

		if(downloadStatus == DownloadStatus_InProgress)
		{
			showMsg("This show cannot be played until it has finished downloading.");
			return;
		}

		this.Callback = RentedShowDetailScreen.prototype.afterWatchShow;
		oSession.watchShow(this, this.fRentedShow.RentedShowID);
		return;
	}
	else if(controlID == RentedShowDetailScreen.DeleteNowID)
	{
		this.Callback = RentedShowDetailScreen.prototype.afterReleaseShow;
		oSession.releaseShow(this, this.fRentedShow.RentedShowID);
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.afterWatchShow = function(/*License*/ license,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode != sc_Success)
		return;

	if(!ViewPortControl.canOpen())
	{
		showMsg("This player does not play audio or video content.");
		return;
	}

	var oSession = MainApp.getThe().getSession();

	var oControl = this.findControl(ViewPortControl.ControlID);
	if(oControl == null)
	{
		oControl = new ViewPortControl(ViewPortControl.ControlID, this.ScreenID);
		this.newControl(oControl);
	}

	this.fContainerControl.focusControl(ViewPortControl.ControlID, true);
	var localURL = oSession.getDownloadRentedShowPath(this.fRentedShow.RentedShowID);
	if(testStrHasLen(localURL))
		oControl.playMedia(localURL);
	else
		oControl.playMedia(license.ShowURL);
}

/******************************************************************************/

/*void*/ RentedShowDetailScreen.prototype.afterReleaseShow = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		this.close();

		var oNowPlayingScreen = MainApp.getThe().findScreen(NowPlayingScreen.ScreenID);
		if(oNowPlayingScreen != null)
			oNowPlayingScreen.removeRentedShow(this.fRentedShow.RentedShowID);
	}
}

/******************************************************************************/
/******************************************************************************/
/* PreferencesScreen.js */

/******************************************************************************/
/******************************************************************************/

PreferencesScreen.ScreenID = "Prefs001";
PreferencesScreen.AccessAdultValueID = "Prefs001_AccessAdultValue";
PreferencesScreen.AccessAdultButtonID = "Prefs001_AccessAdultButton";
PreferencesScreen.ResetFactoryButtonID = "Prefs001_ResetFactoryButton";

/******************************************************************************/

PreferencesScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new PreferencesScreen());
}

/******************************************************************************/

PreferencesScreen.prototype = new Screen();
PreferencesScreen.prototype.constructor = PreferencesScreen;

/******************************************************************************/

function PreferencesScreen()
{
	var oSession = MainApp.getThe().getSession();
	var oControl;

	this.ScreenID = PreferencesScreen.ScreenID;
	this.ScreenTitle = "prefs";
	this.ScreenTitleImage = "titlePrefs.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 122, 182);
	this.fContainerControl.onNavigate = PreferencesScreen.onNavigate;

	oControl = new TextControl(PreferencesScreen.AccessAdultValueID, this.ScreenID);
	this.newControl(oControl);

	oControl = new ButtonControl(PreferencesScreen.AccessAdultButtonID, this.ScreenID);
	this.newControl(oControl);

	this.newControl(new ButtonControl(PreferencesScreen.ResetFactoryButtonID, this.ScreenID));

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));

	this.updateAdultAccess();
}

/******************************************************************************/

/*void*/ PreferencesScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(controlID == PreferencesScreen.AccessAdultButtonID)
	{
		AskAdultPINScreen.newInstance();
		return;
	}

	if(controlID == PreferencesScreen.ResetFactoryButtonID)
	{
		MainApp.getThe().getSession().resetDataSettings();
		MainApp.getThe().reset();
		return;
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*boolean*/ PreferencesScreen.prototype.updateAdultAccess = function()
{
	var oSession = MainApp.getThe().getSession();

	var oControl = this.getControl(PreferencesScreen.AccessAdultValueID);
	oControl.setText(oSession.CanAccessAdult ? "Enabled" : "Disabled");

	oControl = this.getControl(PreferencesScreen.AccessAdultButtonID);
	oControl.setEnabled(!oSession.CanAccessAdult && (oSession.IncludeAdult == ina_PromptPassword));
}

/******************************************************************************/

/*string*/ PreferencesScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == PreferencesScreen.AccessAdultButtonID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
/* AskAdultPINScreen.js */

/******************************************************************************/
/******************************************************************************/

AskAdultPINScreen.ScreenID = "Prefs002";

AskAdultPINScreen.PINID = "Prefs002_PIN";

/******************************************************************************/

AskAdultPINScreen.newInstance = function()
{
	return MainApp.getThe().openScreen(new AskAdultPINScreen());
}

/******************************************************************************/

AskAdultPINScreen.prototype = new Screen();
AskAdultPINScreen.prototype.constructor = AskAdultPINScreen;

/******************************************************************************/

function AskAdultPINScreen()
{
	var oControl;

	this.ScreenID = AskAdultPINScreen.ScreenID;
	this.ScreenTitle = "enter pin";
	this.ScreenTitleImage = "titleEnterpin.gif";

	this.fContainerControl = new ContainerControl(this.ScreenID, 200, 200);
	this.fContainerControl.onNavigate = AskAdultPINScreen.onNavigate;

	oControl = new EditControl(AskAdultPINScreen.PINID, this.ScreenID, 6);
	this.newControl(oControl);
	oControl.Type = ect_Numeric;
	oControl.MaxLength = 6;
	oControl.AutoButton = true;

	if(ViewPortControl.isOpen())
		this.newControl(new ViewPortControl(ViewPortControl.ControlID, this.ScreenID));
}

/******************************************************************************/

/*void*/ AskAdultPINScreen.prototype.onButton = function(/*string*/ controlID)
{
	var data;

	data = this.getControl(AskAdultPINScreen.PINID).getText();
	if(!testStrHasLen(data))
	{
		showMsg("PIN must be entered.");
		return;
	}

	var oSession = MainApp.getThe().getSession();

	this.Callback = AskAdultPINScreen.prototype.afterEnableAdultAccess;
	oSession.enableAdultAccess(this, data);
}

/******************************************************************************/

/*void*/ AskAdultPINScreen.prototype.afterEnableAdultAccess = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		MainApp.getThe().getScreen(PreferencesScreen.ScreenID).updateAdultAccess();

		var oSession = MainApp.getThe().getSession();
		this.Callback = AskAdultPINScreen.prototype.afterLoadSystemData;
		oSession.loadSystemData(this);
	}
}

/******************************************************************************/

/*void*/ AskAdultPINScreen.prototype.afterLoadSystemData = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(statusCode == sc_Success)
	{
		this.close();
	}
}

/******************************************************************************/

/*string*/ AskAdultPINScreen.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == AskAdultPINScreen.PINID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
