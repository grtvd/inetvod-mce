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

function showMsg(msg)
{

	if(window.external.MediaCenter)
		window.external.MediaCenter.Dialog(msg, "", 1, 5, false);
	else
		alert(msg);
}

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

function isAlien(a)
{
   return isObject(a) && typeof a.constructor != 'function';
}

function isArray(a)
{
    return isObject(a) && a.constructor == Array;
}

function isBoolean(a)
{
    return typeof a == 'boolean';
}

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

function isFunction(a)
{
    return typeof a == 'function';
}

function isNull(a)
{
    return typeof a == 'object' && !a;
}

function isNumber(a)
{
    return typeof a == 'number' && isFinite(a);
}

function isObject(a)
{
    return (a && typeof a == 'object') || isFunction(a);
}

function isString(a)
{
    return typeof a == 'string';
}

function isUndefined(a)
{
    return typeof a == 'undefined';
} 

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

function validateStrNotNull(str, method)
{
	if(str == undefined)
		throw testNull(method, "Unknown") + ":validateStrNotNull: is undefined";

	if(str == null)
		throw testNull(method, "Unknown") + ":validateStrNotNull: is null";
}

function testStrHasLen(str)
{
	if(!isString(str))
		return false;

	return (str.length > 0);
}

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

function buildClassName(curr, ext)
{
	if(curr == undefined)
		return '';

	var parts = curr.split('_');
	if(parts.length != 2)
		return curr;
	return parts[0] + '_' + ext;
}

function checkClassName(obj, classNameExt)
{
	if(obj.className == undefined)
		return;

	var className = obj.className;
	var newName = buildClassName(className, classNameExt)
	if(newName != className)
		obj.className = newName;
}

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


/*Date*/ function ISO8601DateFromString(/*string*/ value)
{
	if(!testStrHasLen(value))
		return null;

	var parts = value.split("-");
	if(parts.length == 3)
	{
		var year = parseInt(parts[0]);
		var month = parseInt(parts[1]);
		var day = parseInt(parts[2]);

		return new Date(Date.UTC(year, month - 1, day));
	}

	throw "ISO8601DateFromString: cannot parse date(" + value + ")";
}

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
			var hour = parseInt(parts[0]);
			var minute = parseInt(parts[1]);
			var second = parseInt(parts[2]);

			return (hour * 3600000) + (minute * 60000) + (second * 1000) + timeZoneTicks;
		}

	}

	throw "ISO8601TimeFromString: cannot parse time(" + value + ")";
}

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
			var hour = parseInt(parts[0]);
			var minute = parseInt(parts[1]);

			var tzValue = (hour * 3600000) + (minute * 60000);

			if(value.substr(0,1) == "-")
				return tzValue;
			if(value.substr(0,1) == "+")
				return tzValue * -1;
		}
	}
}
