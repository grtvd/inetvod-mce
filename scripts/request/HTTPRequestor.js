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
