/* Debugger.js */

/******************************************************************************/
/******************************************************************************/

var gDebugOutID = "Debugger_Out";
var gDebugLines = new Array();
var gDebugCount = 0;

/******************************************************************************/

function DebugOut(msg)
{
	try
	{
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
	obj.style.display = (obj.style.display == 'none') ? 'inline' : 'none';
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
