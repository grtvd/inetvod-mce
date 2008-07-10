/* XmlDataReader */

/******************************************************************************/
/******************************************************************************/

function XmlDataReader(xmlDocument)
{
	this.fDocument = xmlDocument;
	this.fCurNodeList = new Array();
	this.fCurNodeList.push(this.fDocument);
}

/******************************************************************************/

/*Node*/ XmlDataReader.prototype.findChildNode = function(/*string*/ fieldName)
{
	if(this.fCurNodeList.length == 0)
		throw "XmlDataReader.findChildNode: No current node";

	var nodeList = this.fCurNodeList[this.fCurNodeList.length - 1].childNodes;
	var node;

	for(var i = 0; i < nodeList.length; i++)
	{
		node = nodeList.item(i);
		if(node.nodeName == fieldName)
			return node;
	}

	return null;
}

/******************************************************************************/

/*Array*/ XmlDataReader.prototype.findChildNodes = function(/*string*/ fieldName)
{
	if(this.fCurNodeList.length == 0)
		throw "XmlDataReader.findChildNodes: No current node";

	var nodeList = this.fCurNodeList[this.fCurNodeList.length - 1].childNodes;
	var nodes = new Array();
	var node;

	for(var i = 0; i < nodeList.length; i++)
	{
		node = nodeList.item(i);
		if(node.nodeName == fieldName)
			nodes.push(node);
	}

	return nodes;
}

/******************************************************************************/

/*string*/ XmlDataReader.prototype.getNodeText = function(/*Node*/ node)
{
	var nodeList = node.childNodes;
	var childNode;

	for(var i = 0; i < nodeList.length; i++)
	{
		childNode = nodeList.item(i);
		if(childNode.nodeType == 3 /*TEXT_NODE*/)
			return childNode.nodeValue;
	}

	return null;
}

/******************************************************************************/
/* Read a Short. May return null */

/*int*/ XmlDataReader.prototype.readShort = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return parseInt(data, 10);
}

/******************************************************************************/
/* Read a Integer. May return null */

/*int*/ XmlDataReader.prototype.readInt = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return parseInt(data, 10);
}

/******************************************************************************/
/* Read a Double. May return null */

/*float*/ XmlDataReader.prototype.readDouble = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return parseFloat(data);
}

/******************************************************************************/
/* Internal read a String. May return null */

/*string*/ XmlDataReader.prototype.internalReadString = function(/*string*/ fieldName)
{
	var node = this.findChildNode(fieldName);
	if(node == null)
		return null;

	var data = this.getNodeText(node);
	if (data == null)
		return null;

	if(data.length == 0)
		return null;

	return data;
}

/******************************************************************************/
/* Read a String. May return null */

/*string*/ XmlDataReader.prototype.readString = function(/*string*/ fieldName,
	/*int*/ maxLength)
{
	var data = this.internalReadString(fieldName);
	if(data == null)
		return null;
	var len = data.length;

	if(len > maxLength)
		throw "XmlDataReader.readString: invalid len(" + len + "), maxLength(" + maxLength + ")";

	return data;
}

/******************************************************************************/
/* Read a Date, no Time component. May return null */

/*string*/ XmlDataReader.prototype.readDate = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return ISO8601DateFromString(data);
}

/******************************************************************************/
/* Read a Date with a Time component. May return null */

/*string*/ XmlDataReader.prototype.readDateTime = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return ISO8601DateTimeFromString(data);
}

/******************************************************************************/
/* Read a Boolean. May return null */

/*int*/ XmlDataReader.prototype.readBoolean = function(/*string*/ fieldName)
{
	var data = this.internalReadString(fieldName);

	if(data == null)
		return null;

	return ((data == "true") || (data == "0"));
}

/******************************************************************************/
/* Read an Object. May return null */

/*Readable*/ XmlDataReader.prototype.readObject = function(/*string*/ fieldName,
	/*Constructor*/ ctorDataFiler)
{
	var node = this.findChildNode(fieldName);
	if(node == null)
		return null;

	this.fCurNodeList.push(node);
	var readable = new ctorDataFiler(this);
	this.fCurNodeList.pop();

	return readable;
}

/******************************************************************************/
/* Read a list of complex Objects. */

/*Array*/ XmlDataReader.prototype.readList = function(/*string*/ fieldName,
	/*Constructor*/ itemCtorDataFiler)
{
	var list = new Array();

	var nodes = this.findChildNodes(fieldName);
	if(nodes.length == 0)
		return list;

	for(var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		this.fCurNodeList.push(node);
		var readable = new itemCtorDataFiler(this);
		list.push(readable);
		this.fCurNodeList.pop();
	}

	return list;
}

/******************************************************************************/
/* Read a list of Strings (or non-complex items than can be constructed from a sting). */

/*Array*/ XmlDataReader.prototype.readStringList = function(/*string*/ fieldName,
	/*Constructor*/ itemCtorDataFiler)
{
	var list = new Array();

	var nodes = this.findChildNodes(fieldName);
	if(nodes.length == 0)
		return list;

	for(var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		var readable = new itemCtorDataFiler(this.getNodeText(node));
		list.push(readable);
	}

	return list;
}

/******************************************************************************/
/******************************************************************************/
