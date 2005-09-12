/* Session.js */

/******************************************************************************/
/******************************************************************************/

Session.newInstance = function()
{
	var session = new Session();

	session.loadAppSettings();

	return session;
}

/******************************************************************************/

function Session()
{
	this.fNetworkURL = "http://" + location.hostname + "/inetvod/playerapi/xml";
	this.CanPingServer = false;

	this.fPlayer = null;

	this.fIsUserLoggedOn = false;
	this.fUserID = null;
	this.fUserPassword = null;
	this.fRememberPassword = false;
	this.fSessionData = null;
	this.fSessionExpires = null;
	this.fMemberPrefs = null;
	this.fMemberProviderList = new Array();

	this.fIncludeAdult = ina_Never;
	this.fCanAccessAdult = false;

	this.fIsSystemDataLoaded = false;
	this.fProviderList = null;
	this.fCategoryList = null;
	this.fRatingList = null;
}

/******************************************************************************/

/*boolean*/ Session.prototype.loadAppSettings = function()
{
	this.fPlayer = Player.newInstance();

	this.fPlayer.ManufacturerID = "inetvod";
	this.fPlayer.ModelNo = "mce";
	this.fPlayer.SerialNo = "9876543210";
	this.fPlayer.Version = "0.0.0001";
}

/******************************************************************************/

/*string*/ Session.prototype.getNetworkURL = function()
{
	return this.fNetworkURL;
}

/******************************************************************************/

/*boolean*/ Session.prototype.isUserLoggedOn = function()
{
	return this.fIsUserLoggedOn;
}

/*boolean*/ Session.prototype.haveUserID = function()
{
	return testStrHasLen(this.fUserID);
}

/******************************************************************************/

/*boolean*/ Session.prototype.haveUserPassword = function()
{
	return testStrHasLen(this.fUserPassword);
}

/******************************************************************************/

/*void*/ Session.prototype.clearLogonInfo = function()
{
	this.fIsUserLoggedOn = false;
	this.fUserID = null;
	this.fUserPassword = null;
}

/******************************************************************************/

/*Provider*/ Session.prototype.getProvider = function(/*string*/ providerID)
{
	var provider = arrayFindItemByCmpr(this.fProviderList, new ProviderIDCmpr(providerID));

	if(provider != null)
		return provider;

	throw "Session.getProvider: can't find ProviderID(" + providerID + ")";
}

/******************************************************************************/

/*string*/ Session.prototype.getProviderName = function(/*string*/ providerID)
{
	return this.getProvider(providerID).Name;
}

/******************************************************************************/

/*string*/ Session.prototype.getCategoryName = function(/*string*/ categoryID)
{
	if(categoryID == Category.AllCategoriesID)
		return Category.AllCategoriesName;

	for(var i = 0; i < this.fCategoryList.length; i++)
		if(this.fCategoryList[i].CategoryID == categoryID)
			return this.fCategoryList[i].Name;

	throw "Session.getCategoryName: can't find CategoryID(" + categoryID + ")";
}

/******************************************************************************/

/*string*/ Session.prototype.getCategoryNames = function(/*Array*/ categoryIDList)
{
	var names = "";

	for(var i = 0; i < categoryIDList.length; i++)
	{
		if(names.length > 0)
			names += ", ";
		names += this.getCategoryName(categoryIDList[i]);
	}

	return names;
}

/******************************************************************************/

/*boolean*/ Session.prototype.loadDataSettings = function()
{
	this.fUserID = getCookie("user");
	this.fUserPassword = getCookie("password");
	this.fRememberPassword = (getCookie("remember") == "true");

	if(!testStrHasLen(this.fUserPassword))
		this.fRememberPassword = false;

	return testStrHasLen(this.fUserID);
}

/******************************************************************************/

/*boolean*/ Session.prototype.saveDataSettings = function()
{
	deleteCookie("user");
	deleteCookie("password");
	deleteCookie("remember");

	setCookie("user", this.fUserID, false);
	setCookie("password", this.fUserPassword, !this.fRememberPassword);
	setCookie("remember", this.fRememberPassword ? "true" : "false", true);

	return true;
}

/******************************************************************************/

/*void*/ Session.prototype.showRequestError = function(/*string*/ message)
{
	if(!testStrHasLen(message))
		showMsg("An error occurred trying to communicate with the iNetVOD servers. Please check you network connection and try again.");
	else
		showMsg(message);
}

/******************************************************************************/

/*boolean*/ Session.prototype.pingServer = function()
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance();
		statusCode = dataRequestor.pingRequest();

		oWaitScreen.close();
		if(statusCode == sc_Success)
		{
			this.CanPingServer = true;
			return this.CanPingServer;
		}

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.pingServer", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return this.CanPingServer;
}

/******************************************************************************/

/*StatusCode*/ Session.prototype.signon = function(/*string*/ userID,
	/*string*/ password, /*boolean*/ rememberPassword)
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	this.fIsUserLoggedOn = false;

	if(testStrHasLen(userID))
		this.fUserID = userID;
	if(testStrHasLen(password))
		this.fUserPassword = password;
	if(isBoolean(rememberPassword))
		this.fRememberPassword = rememberPassword;

	if(!testStrHasLen(this.fUserID))
		throw "Session::signon: Missing UserID";
	if(!testStrHasLen(this.fUserPassword))
		throw "Session::signon: Missing UserPassword";

	var signonRqst;
	var signonResp;

	//TODO: encrypt UserID and Password

	signonRqst = SignonRqst.newInstance();
	signonRqst.UserID = this.fUserID;
	signonRqst.Password = this.fUserPassword;
	signonRqst.Player = this.fPlayer;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance();
		signonResp = dataRequestor.signonRequest(signonRqst);
		statusCode = dataRequestor.getStatusCode();

		oWaitScreen.close();
		if(statusCode == sc_Success)
		{
			this.fSessionData = signonResp.SessionData;
			this.fSessionExpires = signonResp.SessionExpires;
			this.fMemberPrefs = signonResp.MemberState.MemberPrefs;
			this.fIncludeAdult = this.fMemberPrefs.IncludeAdult;
			this.fCanAccessAdult = (this.fIncludeAdult == ina_Always);
			this.fMemberProviderList = signonResp.MemberState.MemberProviderList;

			this.fIsUserLoggedOn = true;
			return statusCode;
		}
		else if((statusCode == sc_UserIDPasswordMismatch) || (statusCode == sc_InvalidUserID))
			this.UserPassword = null;

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.signon", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return statusCode;
}

/******************************************************************************/

/*boolean*/ Session.prototype.isMemberOfProvider = function(/*string*/ providerID)
{
	return(arrayFindItemByCmpr(this.fMemberProviderList, new ProviderIDCmpr(providerID)) != null)
}

/******************************************************************************/

/*boolean*/ Session.prototype.loadSystemData = function()
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		var systemDataResp = dataRequestor.systemDataRequest();
		statusCode = dataRequestor.getStatusCode();

		oWaitScreen.close();
		if(statusCode == sc_Success)
		{
			this.fProviderList = systemDataResp.ProviderList;
			this.fCategoryList = systemDataResp.CategoryList;
			this.fRatingList = systemDataResp.RatingList;

			this.fIsSystemDataLoaded = true;
			return this.fIsSystemDataLoaded;
		}

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.loadSystemData", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return this.fIsSystemDataLoaded;
}

/******************************************************************************/

/*boolean*/ Session.prototype.showSearch = function(/*SearchData*/ searchData,
	/*ShowSearchList reference*/ showSearchListRef)
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var showSearchRqst;
	var showSearchResp;

	var providerIDList = new Array();
	var categoryIDList = new Array();
	var ratingIDList = new Array();

	if(searchData.ProviderID != Provider.AllProvidersID)
		providerIDList.push(searchData.ProviderID);
	if(searchData.CategoryID != Category.AllCategoriesID)
		categoryIDList.push(searchData.CategoryID);
	if(searchData.RatingID != Rating.AllRatingsID)
		ratingIDList.push(searchData.RatingID);

	showSearchRqst = ShowSearchRqst.newInstance();
	showSearchRqst.PartialName = searchData.PartialName;
	showSearchRqst.ProviderIDList = providerIDList;
	showSearchRqst.CategoryIDList = categoryIDList;
	showSearchRqst.RatingIDList = ratingIDList;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		showSearchResp = dataRequestor.showSearchRequest(showSearchRqst);
		statusCode = dataRequestor.getStatusCode();

		oWaitScreen.close();
		if(statusCode == sc_Success)
		{
			showSearchListRef.value = showSearchResp.ShowSearchList;
			return true;
		}

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.showSearch", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return false;
}

/******************************************************************************/

/*ShowDetail*/ Session.prototype.showDetail = function(/*string*/ showID, /*string*/ providerID)
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var showDetailRqst;
	var showDetailResp;

	showDetailRqst = ShowDetailRqst.newInstance();
	showDetailRqst.ShowID = showID;
	showDetailRqst.ProviderID = providerID;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		showDetailResp = dataRequestor.showDetailRequest(showDetailRqst);
		statusCode = dataRequestor.getStatusCode();

		oWaitScreen.close();
		if(statusCode == sc_Success)
			return showDetailResp.ShowDetail;

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.showDetail", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return null;
}

/******************************************************************************/

/*StatusCode*/ Session.prototype.providerEnroll = function(/*string*/ providerID)
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var providerEnrollRqst;

	providerEnrollRqst = ProviderEnrollRqst.newInstance();
	providerEnrollRqst.ProviderID = providerID;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		statusCode = dataRequestor.providerEnrollRequest(providerEnrollRqst);

		oWaitScreen.close();
		if(statusCode == sc_Success)
		{
			this.fMemberProviderList.push(MemberProvider.newInstance(providerID));
			return statusCode;
		}

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.providerEnroll", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return statusCode;
}

/******************************************************************************/

/*StatusCode*/ Session.prototype.setProvider = function(/*string*/ providerID,
	/*string*/ userID, /*string*/ password)
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var setProviderRqst;

	//TODO: encrypt UserID and Password

	setProviderRqst = SetProviderRqst.newInstance();
	setProviderRqst.ProviderID = providerID;
	setProviderRqst.UserID = userID;
	setProviderRqst.Password = password;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		statusCode = dataRequestor.setProviderRequest(setProviderRqst);

		oWaitScreen.close();
		if(statusCode == sc_Success)
		{
			if(arrayFindItemByCmpr(this.fMemberProviderList, new ProviderIDCmpr(providerID)) == null)
				this.fMemberProviderList.push(MemberProvider.newInstance(providerID));
			return statusCode;
		}

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.setProvider", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return statusCode;
}

/******************************************************************************/

/*CheckShowAvailResp*/ Session.prototype.checkShowAvail = function(/*string*/ showID,
	/*string*/ providerID, /*StatusCode reference*/ statusCodeRef)
{
	var statusMessage = null;

	statusCodeRef.value = sc_GeneralError;

	var checkShowAvailRqst;
	var checkShowAvailResp;

	checkShowAvailRqst = CheckShowAvailRqst.newInstance();
	checkShowAvailRqst.ShowID = showID;
	checkShowAvailRqst.ProviderID = providerID;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		checkShowAvailResp = dataRequestor.checkShowAvailRequest(checkShowAvailRqst);
		statusCodeRef.value = dataRequestor.getStatusCode();

		oWaitScreen.close();
		if(statusCodeRef.value == sc_Success)
			return checkShowAvailResp;

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.checkShowAvail", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return null;
}

/******************************************************************************/

/*RentShowResp*/ Session.prototype.rentShow = function(/*string*/ showID,
	/*string*/ providerID, /*ShowCost*/ oApprovedCost)
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var rentShowRqst;
	var rentShowResp;

	rentShowRqst = RentShowRqst.newInstance();
	rentShowRqst.ShowID = showID;
	rentShowRqst.ProviderID = providerID;
	rentShowRqst.ApprovedCost = oApprovedCost;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		rentShowResp = dataRequestor.rentShowRequest(rentShowRqst);
		statusCode = dataRequestor.getStatusCode();

		oWaitScreen.close();
		if(statusCode == sc_Success)
			return rentShowResp;

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.rentShow", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return null;
}

/******************************************************************************/

/*StatusCode*/ Session.prototype.rentedShowList = function(/*RentedShowSearch reference*/ rentedShowSearchListRef)
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var rentedShowListRqst;
	var rentedShowListResp;

	rentedShowListRqst = RentedShowListRqst.newInstance();

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		rentedShowListResp = dataRequestor.rentedShowListRequest(rentedShowListRqst);
		statusCode = dataRequestor.getStatusCode();

		oWaitScreen.close();
		if(statusCode == sc_Success)
		{
			rentedShowSearchListRef.value = rentedShowListResp.RentedShowSearchList;
			return sc_Success;
		}

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.rentedShowList", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return statusCode;
}

/******************************************************************************/

/*RentedShow*/ Session.prototype.rentedShow = function(/*string*/ rentedShowID)
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var rentedShowRqst;
	var rentedShowResp;

	rentedShowRqst = RentedShowRqst.newInstance();
	rentedShowRqst.RentedShowID = rentedShowID;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		rentedShowResp = dataRequestor.rentedShowRequest(rentedShowRqst);
		statusCode = dataRequestor.getStatusCode();

		oWaitScreen.close();
		if(statusCode == sc_Success)
			return rentedShowResp.RentedShow;

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.rentedShow", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return null;
}

/******************************************************************************/

/*WatchShowResp*/ Session.prototype.watchShow = function(/*string*/ rentedShowID)
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var watchShowRqst;
	var watchShowResp;

	watchShowRqst = WatchShowRqst.newInstance();
	watchShowRqst.RentedShowID = rentedShowID;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		watchShowResp = dataRequestor.watchShowRequest(watchShowRqst);
		statusCode = dataRequestor.getStatusCode();

		oWaitScreen.close();
		if(statusCode == sc_Success)
			return watchShowResp;

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.watchShow", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return null;
}

/******************************************************************************/

/*StatusCode*/ Session.prototype.releaseShow = function(/*string*/ rentedShowID)
{
	var statusCode = sc_GeneralError;
	var statusMessage = null;

	var releaseShowRqst;
	var releaseShowResp;

	releaseShowRqst = ReleaseShowRqst.newInstance();
	releaseShowRqst.RentedShowID = rentedShowID;

	var oWaitScreen = WaitScreen.newInstance();
	try
	{
		var dataRequestor = DataRequestor.newInstance(this.fSessionData);
		releaseShowResp = dataRequestor.releaseShowRequest(releaseShowRqst);
		statusCode = dataRequestor.getStatusCode();

		oWaitScreen.close();
		if(statusCode == sc_Success)
			return statusCode;

		statusMessage = dataRequestor.getStatusMessage();
	}
	catch(e)
	{
		showError("Session.releaseShow", e);
	}
	oWaitScreen.close();

	this.showRequestError(statusMessage);

	return statusCode;
}

/******************************************************************************/
/******************************************************************************/
