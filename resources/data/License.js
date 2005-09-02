/* License.js */

/******************************************************************************/
/******************************************************************************/

License.ShowURLMaxLength = 4096;
License.LicenseURLMaxLength = 4096;

/******************************************************************************/

function License(reader)
{
	this.LicenseMethod = null;
	this.ShowURL = null;
	this.LicenseURL = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ License.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.LicenseMethod = reader.readString("LicenseMethod", LicenseMethodMaxLength);
	this.ShowURL = reader.readString("ShowURL", License.ShowURLMaxLength);
	this.LicenseURL = reader.readString("LicenseURL", License.LicenseURLMaxLength);
}

/******************************************************************************/
/******************************************************************************/
