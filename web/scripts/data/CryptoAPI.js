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
	var httpRequestor = HTTPRequestor.newInstance();

	return httpRequestor.sendGet("/digest/" + data);
}

/******************************************************************************/
/******************************************************************************/
