/* HTTPRequestor.js */

/******************************************************************************/
/******************************************************************************/

HTTPRequestor.newInstance = function()
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
	var session = MainApp.getThe().getSession();

	this.fXmlHttp.open("POST", session.getNetworkURL(), false);
	this.fXmlHttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
	this.fXmlHttp.send(request);

	return this.fXmlHttp.responseText;
}

/******************************************************************************/

/*string*/ HTTPRequestor.prototype.sendGet = function(/*string*/ request)
{
	var session = MainApp.getThe().getSession();

	this.fXmlHttp.open("GET", session.getCryptoAPIURL() + request, false);
	this.fXmlHttp.send();

	return this.fXmlHttp.responseText;
}

/******************************************************************************/
/******************************************************************************/
