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

/*string*/ HTTPRequestor.prototype.sendRequest = function(/*string*/ request)
{
	var session = MainApp.getThe().getSession();

	var xmlHttp = createXMLHttpRequest();
	xmlHttp.open("POST", session.getNetworkURL(), false);
	xmlHttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
	xmlHttp.send(request);

	return xmlHttp.responseText;
}

/******************************************************************************/

/*void*/ HTTPRequestor.prototype.sendRequestAsync = function(/*string*/ request,
	/*object*/ callbackObj)
{
	try
	{
		var session = MainApp.getThe().getSession();

		var xmlHttp = createXMLHttpRequest();
		xmlHttp.onreadystatechange = function() { HTTPRequestor_checkRequest(xmlHttp, callbackObj); };
		xmlHttp.open("POST", session.getNetworkURL(), true);
		xmlHttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
		xmlHttp.send(request);
	}
	catch(e)
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
				HTTPRequestor_callback(callbackObj, xmlHttp.responseXML);
				return;
			}
		}
		catch(e)
		{
		}

		HTTPRequestor_callback(callbackObj, null);
	}
}

/******************************************************************************/

/*void*/ function HTTPRequestor_callback(/*object*/ callbackObj, /*object*/ data)
{
	if(callbackObj && callbackObj.Callback)
	{
		try
		{
			callbackObj.Callback(data);
		}
		catch(e)
		{
		}
	}
}

/******************************************************************************/

/*string*/ HTTPRequestor.prototype.sendGet = function(/*string*/ request)
{
	var session = MainApp.getThe().getSession();

	var xmlHttp = createXMLHttpRequest();
	xmlHttp.open("GET", session.getCryptoAPIURL() + request, false);
	xmlHttp.send(null);

	return xmlHttp.responseText;
}

/******************************************************************************/
/******************************************************************************/
