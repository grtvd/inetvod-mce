/* MemberState.js */

/******************************************************************************/
/******************************************************************************/

function MemberState(reader)
{
	this.MemberPrefs = null;
	this.MemberProviderList = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ MemberState.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.MemberPrefs = reader.readObject("MemberPrefs", MemberPrefs);
	this.MemberProviderList = reader.readList("MemberProvider", MemberProvider);
}

/******************************************************************************/
/******************************************************************************/
