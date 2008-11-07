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

