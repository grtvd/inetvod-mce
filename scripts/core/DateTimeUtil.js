/* DateTimeUtil.js */

/******************************************************************************/
/******************************************************************************/


/* DateTimeFormat */
//var dtf_ISO8601_Date = 0;
//var dtf_ISO8601_DateTime = 1;
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

/*string*/ function dateTimeToString(/*Date*/ dateTime, /*DateTimeFormat*/ format, /*boolean*/ showInUTC)
{
	if(!isDate(dateTime))
		return "";

	var year;
	var month;
	var day;
	var hour;
	var minute;
	var isPM;
	var timeStr;
	var minStr;

	if(showInUTC)
	{
		year = dateTime.getUTCFullYear();
		month = dateTime.getUTCMonth() + 1;
		day = dateTime.getUTCDate();

		hour = dateTime.getUTCHours();
		minute = dateTime.getUTCMinutes();
	}
	else
	{
		year = dateTime.getFullYear();
		month = dateTime.getMonth() + 1;
		day = dateTime.getDate();

		hour = dateTime.getHours();
		minute = dateTime.getMinutes();
	}

	isPM = (hour >= 12);
	if(hour == 0)
		hour = 12;
	else if(hour > 12)
		hour -= 12;

	if(minute < 10)
		minStr = "0" + minute;
	else
		minStr = "" + minute;

	switch(format)
	{
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
}

/******************************************************************************/
/******************************************************************************/
