/* SignonRqst */

/******************************************************************************/
/******************************************************************************/

SignonRqst.UserIDMaxLength = 128;
SignonRqst.PasswordMaxLength = 32;

/******************************************************************************/

SignonRqst.newInstance = function()
{
	return new SignonRqst();
}

/******************************************************************************/

function SignonRqst()
{
	this.UserID = null;
	this.Password = null;
	this.Player = null;
}

/******************************************************************************/

/*string*/ SignonRqst.prototype.className = function()
{
	return "SignonRqst";
}

/******************************************************************************/

/*void*/ SignonRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("UserID", this.UserID, SignonRqst.UserIDMaxLength);
	writer.writeString("Password", this.Password, SignonRqst.PasswordMaxLength);
	writer.writeObject("Player", this.Player);
}

/******************************************************************************/
/******************************************************************************/
