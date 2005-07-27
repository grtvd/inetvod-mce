/* HTTPRequestor.js */

/******************************************************************************/
/******************************************************************************/

function HTTPRequestor_newInstance()
{
	return new HTTPRequestor();
}

/******************************************************************************/

function HTTPRequestor(/*string*/ sessionData)
{
    this.fXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
}

/******************************************************************************/

/*string*/ HTTPRequestor.prototype.sendRequest = function(/*string*/ request)
{
	var session = GetTheMainApp().getSession();

	this.fXmlHttp.open("POST", session.getNetworkURL(), false);
	this.fXmlHttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
	this.fXmlHttp.send(request);

	return this.fXmlHttp.responseText;
}

/******************************************************************************/
/******************************************************************************/
