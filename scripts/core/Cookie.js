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
