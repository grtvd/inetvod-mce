/* Session.js */

/******************************************************************************/
/******************************************************************************/

var DownloadStatus_NotStarted = "NotStarted";
var DownloadStatus_InProgress = "InProgress";
var DownloadStatus_Completed = "Completed";

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
	this.fDownloadServiceMgr = null;

	this.fNetworkURL = "http://" + location.hostname + "/inetvod/playerapi/xml";
	this.fCryptoAPIURL = "http://" + location.hostname + "/inetvod/cryptoapi";
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

	this.IncludeAdult = ina_Never;
	this.CanAccessAdult = false;

	this.fIsSystemDataLoaded = false;
	this.fProviderList = null;
	this.fCategoryList = null;
	this.fRatingList = null;

	this.fLastProviderID = null;
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

/*string*/ Session.prototype.getCryptoAPIURL = function()
{
	return this.fCryptoAPIURL;
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

/*ProviderList*/ Session.prototype.getProviderList = function()
{
	return this.fProviderList;
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
	if(Provider.AllProvidersID == providerID)
		return Provider.AllProvidersName;

	return this.getProvider(providerID).Name;
}

/******************************************************************************/

/*CategoryList*/ Session.prototype.getCategoryList = function()
{
	return this.fCategoryList;
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

/*RatingList*/ Session.prototype.getRatingList = function()
{
	return this.fRatingList;
}

/******************************************************************************/

/*string*/ Session.prototype.getRatingName = function(/*string*/ ratingID)
{
	if(ratingID == Rating.AllRatingsID)
		return Rating.AllRatingsName;

	for(var i = 0; i < this.fRatingList.length; i++)
		if(this.fRatingList[i].RatingID == ratingID)
			return this.fRatingList[i].Name;

	throw "Session.getRatingName: can't find RatingID(" + ratingID + ")";
}

/******************************************************************************/

/*boolean*/ Session.prototype.checkInstall = function()
{
	if(this.fDownloadServiceMgr == null)
	{
		try
		{
			this.fDownloadServiceMgr = new ActiveXObject("iNetVOD.MCE.Gateway.DownloadServiceMgr");

			this.fPlayer.SerialNo = this.fDownloadServiceMgr.getPlayerSerialNo();
		}
		catch(e) {}
	}

	return this.fDownloadServiceMgr != null;
}

/******************************************************************************/

/*boolean*/ Session.prototype.loadDataSettings = function()
{
	if(this.fDownloadServiceMgr != null)
	{
		this.fUserID = this.fDownloadServiceMgr.getUserLogonID();
		this.fUserPassword = this.fDownloadServiceMgr.getUserPIN();
		this.fRememberPassword = this.fDownloadServiceMgr.getRememberUserPIN();

		if(!this.fRememberPassword)
			this.fUserPassword = null;
	}
	else
	{
		this.fUserID = getCookie("user");
		this.fUserPassword = getCookie("password");
		this.fRememberPassword = (getCookie("remember") == "true");

		if(!testStrHasLen(this.fUserPassword))
			this.fRememberPassword = false;
	}

	return testStrHasLen(this.fUserID);
}

/******************************************************************************/

/*boolean*/ Session.prototype.saveDataSettings = function()
{
	if(this.fDownloadServiceMgr != null)
	{
		this.fDownloadServiceMgr.setUserCredentials(this.fUserID, this.fUserPassword,
			this.fRememberPassword);
		this.fDownloadServiceMgr.processNow();
	}
	else
	{
		deleteCookie("user");
		deleteCookie("password");
		deleteCookie("remember");

		setCookie("user", this.fUserID, false);
		setCookie("password", this.fUserPassword, !this.fRememberPassword);
		setCookie("remember", this.fRememberPassword ? "true" : "false", true);
	}

	return true;
}

/******************************************************************************/

/*void*/ Session.prototype.resetDataSettings = function()
{
	if(this.fDownloadServiceMgr != null)
		this.fDownloadServiceMgr.setUserCredentials("", "", false);
	else
	{
		deleteCookie("user");
		deleteCookie("password");
		deleteCookie("remember");
	}
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

/*void*/ Session.prototype.callbackCaller = function(/*object*/ data,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	if(isObject(this.CallerCallback) && isFunction(this.CallerCallback.Callback))
	{
		try
		{
			this.CallerCallback.Callback(data, statusCode, statusMessage);
		}
		catch(e)
		{
		}
	}
	else if(isFunction(this.CallerCallback))
	{
		try
		{
			this.CallerCallback(data, statusCode, statusMessage);
		}
		catch(e)
		{
		}
	}
}

/******************************************************************************/

/*void*/ Session.prototype.pingServer = function(/*object*/ callbackObj)
{
	WaitScreen.newInstance();
	this.Callback = Session.prototype.pingServerResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance().startRequest(PingRqst.newInstance(), this);
}

/******************************************************************************/

/*void*/ Session.prototype.pingServerResponse = function(/*PingResp*/ pingResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.CanPingServer = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.signon = function(/*object*/ callbackObj,
	/*string*/ userID, /*string*/ password, /*boolean*/ rememberPassword)
{
	this.fIsUserLoggedOn = false;

	if(testStrHasLen(userID))
		this.fUserID = userID;
	if(testStrHasLen(password))
		this.fUserPassword = CryptoAPI.newInstance().digest(password);
	if(isBoolean(rememberPassword))
		this.fRememberPassword = rememberPassword;

	if(!testStrHasLen(this.fUserID))
		throw "Session::signon: Missing UserID";
	if(!testStrHasLen(this.fUserPassword))
		throw "Session::signon: Missing UserPassword";

	var signonRqst;
	var signonResp;

	signonRqst = SignonRqst.newInstance();
	signonRqst.UserID = this.fUserID;
	signonRqst.Password = this.fUserPassword;
	signonRqst.Player = this.fPlayer;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.signonResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance().startRequest(signonRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.signonResponse = function(/*SignonResp*/ signonResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.fSessionData = signonResp.SessionData;
		this.fSessionExpires = signonResp.SessionExpires;
		this.fMemberPrefs = signonResp.MemberState.MemberPrefs;
		this.IncludeAdult = this.fMemberPrefs.IncludeAdult;
		this.CanAccessAdult = (this.IncludeAdult == ina_Always);
		this.fMemberProviderList = signonResp.MemberState.MemberProviderList;

		this.fIsUserLoggedOn = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}
	else if(statusCode == sc_InvalidUserIDPassword)
		this.fUserPassword = null;

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*boolean*/ Session.prototype.isMemberOfProvider = function(/*string*/ providerID)
{
	return(arrayFindItemByCmpr(this.fMemberProviderList, new ProviderIDCmpr(providerID)) != null)
}

/******************************************************************************/

/*void*/ Session.prototype.loadSystemData = function(/*object*/ callbackObj)
{
	WaitScreen.newInstance();
	this.Callback = Session.prototype.loadSystemDataResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(SystemDataRqst.newInstance(), this);
}

/******************************************************************************/

/*void*/ Session.prototype.loadSystemDataResponse = function(/*SystemDataResp*/ systemDataResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.fProviderList = systemDataResp.ProviderList;
		this.fCategoryList = systemDataResp.CategoryList;
		this.fRatingList = systemDataResp.RatingList;

		this.fIsSystemDataLoaded = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.enableAdultAccess = function(/*object*/ callbackObj,
	/*string*/ password)
{
	var enableAdultAccessRqst;

	enableAdultAccessRqst = EnableAdultAccessRqst.newInstance();
	enableAdultAccessRqst.Password = CryptoAPI.newInstance().digest(password);

	WaitScreen.newInstance();
	this.Callback = Session.prototype.enableAdultAccessResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(enableAdultAccessRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.enableAdultAccessResponse = function(
	/*EnableAdultAccessResp*/ enableAdultAccessResp, /*StatusCode*/ statusCode,
	/*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.CanAccessAdult = true;
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.showSearch = function(/*object*/ callbackObj,
	/*SearchData*/ searchData)
{
	var showSearchRqst;

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
	showSearchRqst.Search = searchData.Search;
	showSearchRqst.ProviderIDList = providerIDList;
	showSearchRqst.CategoryIDList = categoryIDList;
	showSearchRqst.RatingIDList = ratingIDList;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.showSearchResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(showSearchRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.showSearchResponse = function(/*ShowSearchResp*/ showSearchResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(showSearchResp.ReachedMax)
			showMsg("Over " + ShowSearchRqst.MaxResults + " shows were found.  Please try narrowing your search criteria.");

		this.callbackCaller(showSearchResp.ShowSearchList, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.showDetail = function(/*object*/ callbackObj,
	/*string*/ showID)
{
	var showDetailRqst;

	showDetailRqst = ShowDetailRqst.newInstance();
	showDetailRqst.ShowID = showID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.showDetailResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(showDetailRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.showDetailResponse = function(/*ShowDetailResp*/ showDetailResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(showDetailResp.ShowDetail, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.providerEnroll = function(/*object*/ callbackObj, /*string*/ providerID)
{
	var providerEnrollRqst;

	providerEnrollRqst = ProviderEnrollRqst.newInstance();
	providerEnrollRqst.ProviderID = providerID;

	this.fLastProviderID = providerID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.providerEnrollResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(providerEnrollRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.providerEnrollResponse = function(/*ProviderEnrollResp*/ providerEnrollResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.fMemberProviderList.push(MemberProvider.newInstance(this.fLastProviderID));

		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*StatusCode*/ Session.prototype.setProvider = function(/*object*/ callbackObj,
	/*string*/ providerID, /*string*/ userID, /*string*/ password)
{
	var setProviderRqst;

	//TODO: encrypt UserID and Password

	setProviderRqst = SetProviderRqst.newInstance();
	setProviderRqst.ProviderID = providerID;
	setProviderRqst.UserID = userID;
	setProviderRqst.Password = password;

	this.fLastProviderID = providerID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.setProviderResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(setProviderRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.setProviderResponse = function(/*SetProviderResp*/ setProviderResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(arrayFindItemByCmpr(this.fMemberProviderList, new ProviderIDCmpr(this.fLastProviderID)) == null)
			this.fMemberProviderList.push(MemberProvider.newInstance(this.fLastProviderID));

		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.checkShowAvail = function(/*object*/ callbackObj,
	/*string*/ showID, /*string*/ providerID, /*ShowCost*/ showCost)
{
	var checkShowAvailRqst;

	checkShowAvailRqst = CheckShowAvailRqst.newInstance();
	checkShowAvailRqst.ShowID = showID;
	checkShowAvailRqst.ProviderID = providerID;
	checkShowAvailRqst.ShowCost = showCost;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.checkShowAvailResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(checkShowAvailRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.checkShowAvailResponse = function(/*CheckShowAvailResp*/ checkShowAvailResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(checkShowAvailResp, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.rentShow = function(/*object*/ callbackObj, /*string*/ showID,
	/*string*/ providerID, /*ShowCost*/ oApprovedCost)
{
	var rentShowRqst;

	rentShowRqst = RentShowRqst.newInstance();
	rentShowRqst.ShowID = showID;
	rentShowRqst.ProviderID = providerID;
	rentShowRqst.ApprovedCost = oApprovedCost;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.rentShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(rentShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.rentShowResponse = function(/*RentShowResp*/ rentShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		if(this.fDownloadServiceMgr != null)
			this.fDownloadServiceMgr.processNow();
		this.callbackCaller(rentShowResp, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShowList = function(/*object*/ callbackObj)
{
	var rentedShowListRqst;

	rentedShowListRqst = RentedShowListRqst.newInstance();

	WaitScreen.newInstance();
	this.Callback = Session.prototype.rentedShowListResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(rentedShowListRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShowListResponse = function(/*RentedShowListResp*/ rentedShowListResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(rentedShowListResp.RentedShowSearchList, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShow = function(/*object*/ callbackObj, /*string*/ rentedShowID)
{
	var rentedShowRqst;

	rentedShowRqst = RentedShowRqst.newInstance();
	rentedShowRqst.RentedShowID = rentedShowID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.rentedShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(rentedShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.rentedShowResponse = function(/*RentedShowResp*/ rentedShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(rentedShowResp.RentedShow, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.downloadRefresh = function()
{
	if(this.fDownloadServiceMgr == null)
		return;

	this.fDownloadServiceMgr.refresh();
}

/******************************************************************************/

/*string*/ Session.prototype.getDownloadRentedShowStatus = function(/*string*/ rentedShowID)
{
	if(this.fDownloadServiceMgr == null)
		return null;

	return this.fDownloadServiceMgr.getRentedShowStatus(rentedShowID);
}

/******************************************************************************/

/*string*/ Session.prototype.getDownloadRentedShowPath = function(/*string*/ rentedShowID)
{
	if(this.fDownloadServiceMgr == null)
		return null;

	return this.fDownloadServiceMgr.getRentedShowPath(rentedShowID);
}

/******************************************************************************/

/*void*/ Session.prototype.watchShow = function(/*object*/ callbackObj, /*string*/ rentedShowID)
{
	var watchShowRqst;

	watchShowRqst = WatchShowRqst.newInstance();
	watchShowRqst.RentedShowID = rentedShowID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.watchShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(watchShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.watchShowResponse = function(/*WatchShowResp*/ watchShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(watchShowResp.License, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/

/*void*/ Session.prototype.releaseShow = function(/*object*/ callbackObj, /*string*/ rentedShowID)
{
	var releaseShowRqst;

	releaseShowRqst = ReleaseShowRqst.newInstance();
	releaseShowRqst.RentedShowID = rentedShowID;

	WaitScreen.newInstance();
	this.Callback = Session.prototype.releaseShowResponse;
	this.CallerCallback = callbackObj;
	DataRequestor.newInstance(this.fSessionData).startRequest(releaseShowRqst, this);
}

/******************************************************************************/

/*void*/ Session.prototype.releaseShowResponse = function(/*WatchShowResp*/ releaseShowResp,
	/*StatusCode*/ statusCode, /*string*/ statusMessage)
{
	WaitScreen_close();
	if(statusCode == sc_Success)
	{
		this.callbackCaller(null, statusCode, statusMessage);
		return;
	}

	this.showRequestError(statusMessage);
	this.callbackCaller(null, statusCode, statusMessage);
}

/******************************************************************************/
/******************************************************************************/
