/* MainApp.js */

/******************************************************************************/
/******************************************************************************/

/* Event Keys */
var ek_Select = 256;
var ek_Back = 257;
var ek_NextValue = 258;
var ek_PrevValue = 259;
var ek_UpButton = 260;
var ek_DownButton = 261;
var ek_LeftButton = 262;
var ek_RightButton = 263;
var ek_PageUp = 264;
var ek_PageDown = 265;

/* Colors */
var g_Color_White = "#F0F0F0";
var g_Color_Black = "#101010";

/******************************************************************************/

var gMainApp = null;
var gMainTable = null;
var gSession = null;
var gCurrentScreen = null;

/******************************************************************************/
/******************************************************************************/

function IsMCEEnabled()
{
   return true
}

/******************************************************************************/

function onRemoteEvent(keyCode)
{
	return MainAppOnRemoteEvent(keyCode);
}

/******************************************************************************/

function onScaleEvent(vScale)
{
	try
	{
		if(!window.external.MediaCenter)
			document.getElementById("ScaleText").innerHTML = vScale;
		document.body.style.zoom = vScale;
	}
	catch(e)
	{
		// ignore error
	}
}

/******************************************************************************/

function DoScale()
{
	MainApp.getThe().onScale();
}

/******************************************************************************/
/******************************************************************************/

MainApp.getThe = function()
{
	if(gMainApp == null)
		gMainApp = new MainApp();
	return gMainApp;
}

/******************************************************************************/

function MainApp()
{
	this.fScreenList = new Array();
	this.fSession = Session.newInstance();
	this.fMainTable = null;
}

/******************************************************************************/
/******************************************************************************/

/*void*/ MainApp.prototype.init = function()
{
	if(window.external.MediaCenter)
		window.external.MediaCenter.BGColor = g_Color_Black;
	document.body.scroll = "no";
	document.body.focus;

	this.fMainTable = document.getElementById("MainTable");

	if(!window.external.MediaCenter)
		document.getElementById("ScaleDiv").style.display = "inline";
}

/******************************************************************************/

/*void*/ MainApp.prototype.openScreen = function(/*Screen*/ oScreen)
{
	if(this.fScreenList.length > 0)
	{
		var oCurScreen = this.fScreenList[this.fScreenList.length - 1];
		oCurScreen.show(false);
	}

	this.fScreenList.push(oScreen);

	oScreen.moveTo(this.fMainTable.offsetLeft, this.fMainTable.offsetTop);
	oScreen.show(true);
	oScreen.setFocus(true);
}

/******************************************************************************/

/*void*/ MainApp.prototype.closeScreen = function(/*int*/ screenID)
{
	var oScreen;
	var pos = -1;

	// search for screenID, hiding all
	for(var i = 0; i < this.fScreenList.length; i++)
	{
		oScreen = this.fScreenList[i];
		oScreen.show(false);

		if(oScreen.ScreenID == screenID)
			pos = i;
	}

	if(pos >= 0)
		this.fScreenList.splice(pos, 1);

	if(this.fScreenList.length > 0)
	{
		oScreen = this.fScreenList[this.fScreenList.length - 1];
		oScreen.show(true);
	}
}

/******************************************************************************/

/*Screen*/ MainApp.prototype.getScreen = function(/*string */ screenID)
{
	for(var i = 0; i < this.fScreenList.length; i++)
		if(this.fScreenList[i].ScreenID == screenID)
			return this.fScreenList[i];

	return null;
}

/******************************************************************************/

/*void*/ MainApp.prototype.onResize = function()
{
	if(this.fScreenList.length > 0)
	{
		var oCurScreen = this.fScreenList[this.fScreenList.length - 1];
		oCurScreen.moveTo(this.fMainTable.offsetLeft, this.fMainTable.offsetTop);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.onScale = function()
{
// scale to the current window size
//		var newScale = (document.body.style.zoom.length > 0)
//			? ((document.body.style.zoom * document.body.clientWidth) / 1024)
//			: (document.body.clientWidth / 1024);
//
//		onScaleEvent(newScale);

	// toggle on scaling on and off
	var newScale = "";
	
	if(document.body.style.zoom.length == 0)
		newScale = document.body.getBoundingClientRect().right / 1024;

	onScaleEvent(newScale);
	this.onResize();
}

/******************************************************************************/

/*void*/ MainApp.prototype.key = function(/*int*/ keyCode)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];
		var handled = oScreen.key(keyCode);

		// if going back and all screens have been closed, return control to browser
		if((keyCode == ek_Back) && (this.fScreenList.length == 0))
			return false;

		if(!handled)
			;	//TODO: beep sound

		return handled;
	}

	return false;
}

/******************************************************************************/

/*void*/ MainApp.prototype.mouseClick = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.mouseClick(controlID);
	}
}

/******************************************************************************/

/*void*/ MainApp.prototype.mouseMove = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.mouseMove(controlID);
	}
}

/******************************************************************************/

/*Session*/ MainApp.prototype.getSession = function()
{
	return this.fSession;
}

/******************************************************************************/
/******************************************************************************/

function MainAppOnKeyDown()
{
	if((event.keyCode == 8)
			|| (event.keyCode == 13)
			|| ((event.keyCode >= 33) && (event.keyCode <= 34))
			|| ((event.keyCode >= 37) && (event.keyCode <= 40)))
		return MainAppOnRemoteEvent(event.keyCode);
	return false;
}

/******************************************************************************/

function MainAppOnKeyUp()
{
	return false;
}

/******************************************************************************/

function MainAppOnKeyPress()
{
	if((event.keyCode != 8)
			&& (event.keyCode != 13))
		return MainAppOnRemoteEvent(event.keyCode);
	return false;
}

/******************************************************************************/

function MainAppOnRemoteEvent(keyCode)
{
	try
	{
		return MainApp.getThe().key(MainAppMapKey(keyCode));
	}
	catch(e)
	{
		showError("MainAppOnRemoteEvent", e);
	}

	return false;
}

/******************************************************************************/

function MainAppMapKey(key)
{
	if(key == 13)
		key = ek_Select;
	else if(key == 27)
		key = ek_Back;
	else if(key == 166)
		key = ek_Back;
	else if(key == 8)
		key = ek_Back;
	else if(key == 33)
		key = ek_PageUp;
	else if(key == 34)
		key = ek_PageDown;
	else if(key == 37)
		key = ek_LeftButton;
	else if(key == 38)
		key = ek_UpButton;
	else if(key == 39)
		key = ek_RightButton;
	else if(key == 40)
		key = ek_DownButton;

	return key;
}

/******************************************************************************/

function MainAppOnMouseClick(obj)
{
	try
	{
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().mouseClick(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnMouseClick", e);
	}
}

/******************************************************************************/

function MainAppOnMouseOver(obj)
{
	try
	{
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().mouseMove(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnMouseOver", e);
	}
}

/******************************************************************************/

function MainAppOnResize()
{
	try
	{
		MainApp.getThe().onResize();
	}
	catch(e)
	{
		showError("MainAppOnMouseOver", e);
	}
}

/******************************************************************************/
/******************************************************************************/
