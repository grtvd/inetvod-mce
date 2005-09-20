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
