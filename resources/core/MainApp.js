/* MainApp.js */

/******************************************************************************/
/******************************************************************************/

/* Event Keys */
var ek_Backspace = 8;
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

/******************************************************************************/
/******************************************************************************/

function IsMCEEnabled()
{
	return true
}

/******************************************************************************/

function onRemoteEvent(keyCode)
{
	// for the numerics on the Remote, MCE returns both "keypress" and "onremote" events, causing double chars.
	// so "eat" the numerics from the Remote, they'll be handled by "keypress" event.
	if((keyCode >= 48) && (keyCode <= 57))
		return true;

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
	this.fInit = false;
	this.fScreenList = new Array();
	this.fSession = Session.newInstance();
	this.fMainTable = null;
}

/******************************************************************************/
/******************************************************************************/

/*void*/ MainApp.prototype.init = function()
{
	if(this.fInit)
		return;
	this.fInit = true;

	if(window.external.MediaCenter)
		window.external.MediaCenter.BGColor = g_Color_Black;
	document.body.scroll = "no";
	document.body.focus;

	this.fMainTable = document.getElementById("MainTable");

	if(!window.external.MediaCenter)
		document.getElementById("ScaleDiv").style.display = "inline";

	StartScreen.newInstance();
}

/******************************************************************************/

/*void*/ MainApp.prototype.openScreen = function(/*Screen*/ oScreen)
{
	var oCurScreen = null;

	if(this.fScreenList.length > 0)
		oCurScreen = this.fScreenList[this.fScreenList.length - 1];

	this.fScreenList.push(oScreen);

	oScreen.moveTo(this.fMainTable.offsetLeft, this.fMainTable.offsetTop);
	oScreen.show(true);
	oScreen.setFocus(true);

	if(oCurScreen != null)
	{
		oCurScreen.show(false);
		oCurScreen.setFocus(false);
	}
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
		oScreen.setFocus(true);
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
		if((keyCode == ek_Backspace) && (this.fScreenList.length == 0))
			return false;

		//IE converts a Backspace into the <Back> button, if we have an open screen, don't pass event to IE
		if((keyCode == ek_Backspace) && (this.fScreenList.length > 0))
			handled = true;

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

/*void*/ MainApp.prototype.focusEvent = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.focusEvent(controlID);
	}
}


/******************************************************************************/

/*void*/ MainApp.prototype.blurEvent = function(/*string*/ controlID)
{
	if(this.fScreenList.length > 0)
	{
		var oScreen = this.fScreenList[this.fScreenList.length - 1];

		oScreen.blurEvent(controlID);
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
	else if(key == 166)
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
		if(IsMCExtender())
			return;

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

function MainAppOnFocus(obj)
{
	try
	{
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().focusEvent(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnFocus", e);
	}
}

/******************************************************************************/

function MainAppOnBlur(obj)
{
	try
	{
		obj = findObjectWithID(obj);
		if(obj != null)
			MainApp.getThe().blurEvent(obj.id);
	}
	catch(e)
	{
		showError("MainAppOnBlur", e);
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
