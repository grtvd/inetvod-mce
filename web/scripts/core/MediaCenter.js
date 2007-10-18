/* MediaCenter.js */

/******************************************************************************/
/******************************************************************************/

function IsMCEEnabled()
{
	return true;
}

/******************************************************************************/

// This function detects whether user is in a remote session on a Media Center Extender device

function IsMCExtender()
{
	try
	{
		if(!window.external.MediaCenter)
			return false;

		// if this is not a console session ...
		if (window.external.MediaCenter.Capabilities.IsConsole == false)
		{
			/* ...then it is either a Media Center Extender session or a traditional Remote Desktop session.
			 To tell which type of session it is, check if video is allowed. If video is allowed... */
			if (window.external.MediaCenter.Capabilities.IsVideoAllowed == true)
			{
				// ... then it is an extender session, so return true
				return true
			}
			// Media Center does not allow video in a traditional Remote Desktop session. So if video is not allowed ...
			else
			{
				/* IsConsole and IsVideoAllowed are both false false, so user is accessing through a traditional Remote
				Desktop session, rather than from an extender device. That means that they probably have access to a keyboard
				and mouse, but they cannot play video. If your application features video playback, you may want to
				adjust your functionality for this user accordingly.
				Returning false simply indicates that this is not an Extender session.  */
				return false
			}
		}
		else
		{
			// If not, this is a Media Center session on the console PC, so return false
			return false
		}
	}
	catch(e)
	{
		/* If above cause errors, user is probably accessing from a browser outside of Media Center.
		Return false to indicate that it is not an extender session. */
		return false
	}
}

/******************************************************************************/
/******************************************************************************/
