/* SignonResp */

/******************************************************************************/
/******************************************************************************/

SignonResp.SessionDataMaxLength = 32767;

/******************************************************************************/

function SignonResp(reader)
{
	this.SessionData = null;
	this.SessionExpires = null;
	this.MemberState = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ SignonResp.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.SessionData = reader.readString("SessionData", SignonResp.SessionDataMaxLength);
	this.SessionExpires = reader.readDateTime("SessionExpires");
	this.MemberState = reader.readObject("MemberState", MemberState);
}

/******************************************************************************/
/******************************************************************************/
