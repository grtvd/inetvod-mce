/* License.js */

/******************************************************************************/
/******************************************************************************/

License.ShowURLMaxLength = 4096;
License.LicenseURLMaxLength = 4096;
License.ContentIDMaxLength = 64;
License.UserIDMaxLength = 64;
License.PasswordMaxLength = 32;

/******************************************************************************/

function License(reader)
{
	this.LicenseMethod = null;
	this.ShowURL = null;
	this.LicenseURL = null;
	this.ContentID = null;
	this.UserID = null;
	this.Password = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ License.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.LicenseMethod = reader.readString("LicenseMethod", LicenseMethodMaxLength);
	this.ShowURL = reader.readString("ShowURL", License.ShowURLMaxLength);
	this.LicenseURL = reader.readString("LicenseURL", License.LicenseURLMaxLength);
	this.ContentID = reader.readString("ContentID", License.ContentIDMaxLength);
	this.UserID = reader.readString("UserID", License.UserIDMaxLength);
	this.Password = reader.readString("Password", License.MaxLength);
}

/******************************************************************************/
/******************************************************************************/
