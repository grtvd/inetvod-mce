/* Debugger.js */

/******************************************************************************/
/******************************************************************************/

var gDebuggerID = "Debugger";
var gDebugOutID = "Debugger_Out";
var gDebugOn = false;
var gDebugLines = new Array();
var gDebugCount = 0;

/******************************************************************************/

function DebugOn(on)
{
	gDebugOn = on ? true : false;

	setStyleDisplay(document.getElementById(gDebuggerID), gDebugOn);
}

function DebugOut(msg)
{
	try
	{
		if(!gDebugOn)
			return;

		gDebugCount++;
		gDebugLines.push("" + gDebugCount + ": " + msg);
		if(gDebugLines.length > 35)
			gDebugLines.splice(0, 1);

		var txt = "";
		for(var i = 0; i < gDebugLines.length; i++)
			txt += gDebugLines[i] + "<br>";

		document.getElementById(gDebugOutID).innerHTML = txt;
	}
	catch(e)
	{
	}
}

/******************************************************************************/

function DebugShow()
{
	var obj = document.getElementById(gDebugOutID);
	setStyleDisplay(obj, (obj.style.display == 'none'));
}

/******************************************************************************/

function DebugClear()
{
	gDebugLines = new Array();
	gDebugCount = 0;
	document.getElementById(gDebugOutID).innerHTML = "";
}

/******************************************************************************/
/******************************************************************************/
