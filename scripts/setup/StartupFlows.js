/* StartupFlows.js */

/******************************************************************************/
/******************************************************************************/

function StartupInitialCheck()
{
	var oSession = MainApp.getThe().getSession();

	/* has the app been installed locally? */
	if(!oSession.checkInstall())
	{
		NotInstalledScreen.newInstance();
		return;
	}

	/* connect to the server */
	if(!oSession.CanPingServer)
	{
		oSession.pingServer(StartupInitial_afterPingServer);
	}
	else
		StartupInitial_afterPingServer(null, sc_Success, null);
}

/******************************************************************************/

/*void*/ function StartupInitial_afterPingServer(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	if(statusCode != sc_Success)
	{
		StartScreen.newInstance();
		return;
	}

	var oSession = MainApp.getThe().getSession();

	if(!oSession.loadDataSettings())
	{
		SetupScreen.newInstance();
		return;
	}

	if(!oSession.haveUserPassword())
	{
		AskPINScreen.newInstance();
		return;
	}

	oSession.signon(StartupInitial_afterSignon);
}

/******************************************************************************/

/*void*/ function StartupInitial_afterSignon(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		oSession.loadSystemData(StartupInitial_afterLoadSystemData);
	}
	else if(statusCode == sc_InvalidUserIDPassword)
	{
		AskPINScreen.newInstance();
	}
}

/******************************************************************************/

/*void*/ function StartupInitial_afterLoadSystemData(/*object*/ data, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	var oSession = MainApp.getThe().getSession();

	if(statusCode == sc_Success)
	{
		WelcomeScreen.newInstance();
	}
	else
	{
		oSession.clearLogonInfo();
		StartScreen.newInstance();
	}
}

/******************************************************************************/
/******************************************************************************/
