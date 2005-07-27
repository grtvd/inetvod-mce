/* StartupFlows.js */

/******************************************************************************/
/******************************************************************************/

function StartupInitialCheck()
{
	var oSession = GetTheMainApp().getSession();

	/* connect to the server */
	if(!oSession.CanPingServer)
		if(!oSession.pingServer())
			return false;

	if(!oSession.loadDataSettings())
	{
		SetupScreen_newInstance();
		return true;
	}

	if(!oSession.haveUserPassword())
	{
		AskPINScreen_newInstance();
		return true;
	}

	var statusCode = oSession.signon();
	if(statusCode == sc_Success)
	{
		if(oSession.loadSystemData())
		{
			WelcomeScreen_newInstance();
			return true;
		}
		else
			oSession.clearLogonInfo();
	}

	return false;
}

/******************************************************************************/

function StartupDoSignonPassword(/*string*/ userPassword)
{
	var oSession = GetTheMainApp().getSession();

	var statusCode = oSession.signon(null, userPassword);
	if(statusCode == sc_Success)
	{
		oSession.saveDataSettings();	// for possible temp store of userPassword

		if(oSession.loadSystemData())
		{
			WelcomeScreen_newInstance();
			return true;
		}

		oSession.clearLogonInfo();
		StartScreen_newInstance();
		return true;
	}

	return false;
}

/******************************************************************************/

function StartupDoSetupSignon(/*string*/ userID, /*string*/ userPassword,
	/*boolean*/ rememberPassword)
{
	var oSession = GetTheMainApp().getSession();

	var statusCode = oSession.signon(userID, userPassword, rememberPassword);
	if(statusCode == sc_Success)
	{
		if(!oSession.saveDataSettings())
		{
			showMsg("An error occured while saving your settings.");
			return false;
		}

		if(oSession.loadSystemData())
		{
			WelcomeScreen_newInstance();
			return true;
		}

		oSession.clearLogonInfo();
		StartScreen_newInstance();
		return true;
	}

	return false;
}

/******************************************************************************/
/******************************************************************************/
