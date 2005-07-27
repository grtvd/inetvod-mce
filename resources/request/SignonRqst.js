/* SignonRqst */

/******************************************************************************/
/******************************************************************************/

SignonRqst.newInstance = function()
{
	return new SignonRqst();
}

/******************************************************************************/

function SignonRqst()
{
	this.UserIDMaxLength = 64;
	this.PasswordMaxLength = 16;

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
	writer.writeString("UserID", this.UserID, this.UserIDMaxLength);
	writer.writeString("Password", this.Password, this.PasswordMaxLength);
	writer.writeObject("Player", this.Player);
}

/******************************************************************************/
/******************************************************************************/
