/* ViewPortControl */

/******************************************************************************/
/******************************************************************************/

ViewPortControl.ControlID = "SVP";

/******************************************************************************/

ViewPortControl.prototype = new Control();
ViewPortControl.prototype.constructor = ViewPortControl;

/******************************************************************************/

function ViewPortControl(/*string*/ controlID, /*string*/ screenID)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "ViewPortControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";

	this.setFocus(false);
}

/******************************************************************************/

/*boolean*/ ViewPortControl.canOpen = function()
{
	if(window.external.MediaCenter)
		return true;

	return false;
}

/******************************************************************************/

/*boolean*/ ViewPortControl.isOpen = function()
{
	if(window.external.MediaCenter)
	{
		return window.external.MediaCenter.SharedViewPort.Visible;
	}

	return false;
}

/******************************************************************************/

/*void*/ ViewPortControl.prototype.setFocus = function(/*boolean*/ set)
{
	var wasFocused = this.fFocused;
	this.fFocused = set;

	if(set)
	{
		if(document.activeElement.id != this.fUIObj.id)
		{
			if(window.external.MediaCenter)
				window.external.MediaCenter.SharedViewPort.Focus();
		}

		if(!wasFocused)
			this.getScreen().onFocus(this.ControlID);
	}
}

/******************************************************************************/

/*void*/ ViewPortControl.prototype.playMedia = function(/*string*/ url)
{
	if(window.external.MediaCenter)
	{
		window.external.MediaCenter.playMedia(this.getMediaType(url), url);
		window.external.MediaCenter.Experience.GoToFullScreen();
		return;
	}

	showMsg("An error occurred trying to play Show.");
}

/******************************************************************************/

/*int*/ ViewPortControl.prototype.getMediaType = function(/*string*/ url)
{
	var parts = "x".split('.');
	parts = "".split('.');
	parts = "..".split('.');
	parts = url.split('.');

	if(parts.length > 1)
	{
		var ext = parts[parts.length - 1].toLowerCase();
		if(ext == 'mp3')
			return 1;
	}

	return 2;
}

/******************************************************************************/
/******************************************************************************/
