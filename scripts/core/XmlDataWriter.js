/* XmlDataWriter */

/******************************************************************************/
/******************************************************************************/

//TODO: see the webapi version, uses OutputStream for writing
function XmlDataWriter()
{
	this.fStream = '';

	var characterEncoding = "UTF-8";
	this.writeStartDocument(characterEncoding);
}

/******************************************************************************/

/*void*/ XmlDataWriter.prototype.toString = function()
{
	return this.fStream;
}

/******************************************************************************/

/*void*/ XmlDataWriter.prototype.writeStartDocument = function(/*string*/ encoding)
{
	this.internalWriteString('<?xml version="1.0" encoding="' + encoding + '"?>');
}

/******************************************************************************/

/*Node*/ XmlDataWriter.prototype.internalWriteString = function(/*string*/ data)
{
	this.fStream += data;
}

/******************************************************************************/

/*string*/ XmlDataWriter.prototype.escapeString = function(str)
{
	if(str.indexOf("&") >= 0)
		str = str.replace(/\&/g, "&amp;");
	if(str.indexOf("<") >= 0)
		str = str.replace(/</g, "&lt;");

	return str;
}

/******************************************************************************/
/* Write an opending XML element tag */

/*void*/ XmlDataWriter.prototype.writeStartElement = function(/*string*/ name)
{
	this.internalWriteString("<");
	this.internalWriteString(name);
	this.internalWriteString(">");
}

/******************************************************************************/
/* Write a closing XML element tag */

/*void*/ XmlDataWriter.prototype.writeEndElement = function(/*string*/ name)
{
	this.internalWriteString("</");
	this.internalWriteString(name);
	this.internalWriteString(">");
}

/******************************************************************************/
/* Write opening and closing XML element with value */

/*void*/ XmlDataWriter.prototype.writeElement = function(/*string*/ name, /*string*/ value)
{
	if(!testStrHasLen(value))
		return;

	this.writeStartElement(name);
	this.internalWriteString(this.escapeString(value));
	this.writeEndElement(name);
}

/******************************************************************************/
/* Write an Short */

/*void*/ XmlDataWriter.prototype.writeShort = function(/*string*/ fieldName, /*int*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data.toString());
}

/******************************************************************************/
/* Write an Integer */

/*void*/ XmlDataWriter.prototype.writeInt = function(/*string*/ fieldName, /*int*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data.toString());
}

/******************************************************************************/
/* Write an Double */

/*void*/ XmlDataWriter.prototype.writeDouble = function(/*string*/ fieldName, /*float*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data.toString());
}

/******************************************************************************/
/* Write a String */

/*void*/ XmlDataWriter.prototype.writeString = function(/*string*/ fieldName,
	/*string*/ data, /*int*/ maxLength)
{
	var len = testStrHasLen(data) ? data.length : 0;
	if(len > maxLength)
		throw new String("invalid len(" + len + "), maxLength(" + maxLength + ")");

	this.writeElement(fieldName, data);
}

/******************************************************************************/
/* Write a date, no Time component */

/*void*/ XmlDataWriter.prototype.writeDate = function(/*string*/ fieldName,
	/*Date*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, dateTimeToString(data, dtf_ISO8601_Date));
}

/******************************************************************************/
/* Write a Date with a Time component */

/*void*/ XmlDataWriter.prototype.writeDateTime = function(/*string*/ fieldName,
	/*Date*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, dateTimeToString(data, dtf_ISO8601_DateTime));
}

/******************************************************************************/
/* Write a Boolean */

/*void*/ XmlDataWriter.prototype.writeBoolean = function(/*string*/ fieldName,
	/*int*/ data)
{
	if(isNull(data) || isUndefined(data))
		return;

	this.writeElement(fieldName, data ? "true" : "false");
}

/******************************************************************************/
/* Write a complex Object */

/*void*/ XmlDataWriter.prototype.writeObject = function(/*string*/ fieldName,
	/*Writeable*/ data)
{
	if(isNull(data))
		return;

	this.writeStartElement(fieldName);
	data.writeTo(this);
	this.writeEndElement(fieldName);
}

/******************************************************************************/
/* Write a list of complex Objects */

/*void*/ XmlDataWriter.prototype.writeList = function(/*String*/ fieldName,
	/*Array*/ data)
{
	for(var i = 0; i < data.length; i++)
		this.writeObject(fieldName, data[i]);
}

/******************************************************************************/
/* Write a list of Strings (or non-complex items than can be converted to a sting) */

/*void*/ XmlDataWriter.prototype.writeStringList = function(/*string*/ fieldName,
	/*Array*/ data, /*int*/ maxLength)
{
	for(var i = 0; i < data.length; i++)
		this.writeString(fieldName, data[i].toString(), maxLength);
}

/******************************************************************************/
/******************************************************************************/
