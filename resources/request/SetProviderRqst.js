/* SetProviderRqst */

/******************************************************************************/
/******************************************************************************/

SetProviderRqst.UserIDMaxLength = 128;
SetProviderRqst.PasswordMaxLength = 32;

/******************************************************************************/

SetProviderRqst.newInstance = function()
{
	return new SetProviderRqst();
}

/******************************************************************************/

function SetProviderRqst()
{
	this.ProviderID = null;
	this.UserID = null;
	this.Password = null;
}

/******************************************************************************/

/*string*/ SetProviderRqst.prototype.className = function()
{
	return "SetProviderRqst";
}

/******************************************************************************/

/*void*/ SetProviderRqst.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("ProviderID", this.ProviderID, ProviderIDMaxLength);
	writer.writeString("UserID", this.UserID, SetProviderRqst.UserIDMaxLength);
	writer.writeString("Password", this.Password, SetProviderRqst.PasswordMaxLength);
}

/******************************************************************************/
/******************************************************************************/
