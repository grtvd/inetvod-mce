/* MemberPrefs.js */

/******************************************************************************/
/******************************************************************************/

function MemberPrefs(reader)
{
	this.IncludeAdult = ina_Never;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ MemberPrefs.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.IncludeAdult = reader.readString("IncludeAdult", IncludeAdultMaxLength);
}

/******************************************************************************/
/******************************************************************************/
