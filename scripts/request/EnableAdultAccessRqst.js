/* EnableAdultAccessRqst */

/******************************************************************************/
/******************************************************************************/

EnableAdultAccessRqst.PasswordMaxLength = 32;

/******************************************************************************/

EnableAdultAccessRqst.newInstance = function()
{
	return new EnableAdultAccessRqst();
}

/******************************************************************************/

function EnableAdultAccessRqst()
{
	this.Password = null;
}

/******************************************************************************/

/*string*/ EnableAdultAccessRqst.prototype.className = function()
{
	return "EnableAdultAccessRqst";
}

/******************************************************************************/

/*void*/ EnableAdultAccessRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("Password", this.Password, EnableAdultAccessRqst.PasswordMaxLength);
}

/******************************************************************************/
/******************************************************************************/
