/* RentScreen.js */

/******************************************************************************/
/******************************************************************************/

RentScreen.ScreenID = "Rent001";

/* RentStep */
var ss_Undefined = 0;
var ss_AskHaveProviderStep = 1;
var ss_NeedProviderStep = 2;
var ss_HaveProviderStep = 3;
var ss_ConfirmChargeStep = 4;

/******************************************************************************/

RentScreen.newInstance = function(/*ShowDetail*/ oShowDetail)
{
	var oScreen = new RentScreen(oShowDetail);

	MainApp.getThe().openScreen(oScreen);
	oScreen.createControls(ss_AskHaveProviderStep);

	return oScreen;
}

/******************************************************************************/

RentScreen.prototype = new Screen();
RentScreen.prototype.constructor = RentScreen;

/******************************************************************************/

function RentScreen(/*ShowDetail*/ oShowDetail)
{
	this.ScreenID = RentScreen.ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID, 130, 170);

	this.fStepControlID = AskHaveProviderControl.ControlID;
	this.fRentData = new RentData(oShowDetail);
	this.fCurStep = ss_AskHaveProviderStep;
}

/******************************************************************************/

/*void*/ RentScreen.prototype.close = function()
{
	if(this.fContainerControl != null)
	{
		var oContainerControl = this.fContainerControl.findControl(this.fStepControlID);
		if(oContainerControl != null)
			oContainerControl.show(false);
	}
	Screen.prototype.close.call(this);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.createControls = function()
{
	var oSession = MainApp.getThe().getSession();
	var oShowDetail = this.fRentData.ShowDetail;
	var oShowCost = oShowDetail.ShowCostList[0];	//TODO: is this OK to check "first" showCost as Free?

	if((oShowCost.ShowCostType == sct_Free) ||
		oSession.isMemberOfProvider(this.fRentData.getProviderID()))
	{
		var nextStep = this.checkShowAvail();
		if (nextStep == ss_Undefined)
			this.close();
		else
			this.openStep(nextStep);
	}
	else
		this.openStep(ss_AskHaveProviderStep);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.openStep = function(/*int*/ step)
{
	var oContainerControl;

	switch(step)
	{
		case ss_AskHaveProviderStep:
		default:
			oContainerControl = AskHaveProviderControl.newInstance();
			break;
		case ss_NeedProviderStep:
			oContainerControl = NeedProviderControl.newInstance();
			break;
		case ss_HaveProviderStep:
			oContainerControl = HaveProviderControl.newInstance();
			break;
		case ss_ConfirmChargeStep:
			oContainerControl = ConfirmChargeControl.newInstance();
			break;
	}

	oContainerControl.show(true);
	oContainerControl.setFocus(true);
	this.fContainerControl.newControl(oContainerControl);
	this.fStepControlID = oContainerControl.ControlID;
	this.fCurStep = step;
	oContainerControl.loadData(this.fRentData);
}

/******************************************************************************/

/*boolean*/ RentScreen.prototype.closeStep = function(/*boolean*/ doUnload)
{
	var oContainerControl = this.fContainerControl.getControl(this.fStepControlID);

	if(doUnload)
	{
		if(!oContainerControl.unloadData(this.fRentData))
			return false;
	}

	oContainerControl.show(false);
	this.deleteControl(this.fStepControlID);
	return true;
}

/******************************************************************************/

/*boolean*/ RentScreen.prototype.key = function(/*int*/ key)
{
	if(key == ek_Back)
	{
		if(this.fCurStep == ss_AskHaveProviderStep)
		{
			this.close();
			return true;
		}
		else if(this.fCurStep == ss_NeedProviderStep)
		{
			if(this.closeStep(false))
				this.openStep(ss_AskHaveProviderStep);

			return true;
		}
		else if(this.fCurStep == ss_HaveProviderStep)
		{
			if(this.closeStep(false))
			{
				var oSession = MainApp.getThe().getSession();

				if(oSession.isMemberOfProvider(this.fRentData.getProviderID()))
					this.close();
				else
					this.openStep(ss_AskHaveProviderStep);
			}

			return true;
		}
		else if(this.fCurStep == ss_ConfirmChargeStep)
		{
			this.close();
			return true;
		}
	}

	return Screen.prototype.key.call(this, key);
}

/******************************************************************************/

/*void*/ RentScreen.prototype.onButton = function(/*string*/ controlID)
{
	if(this.fCurStep == ss_AskHaveProviderStep)
	{
		if(controlID == AskHaveProviderControl.HaveMembershipID)
		{
			if(this.closeStep(true))
				this.openStep(ss_HaveProviderStep);
			return;
		}
		else if(controlID == AskHaveProviderControl.NeedMembershipID)
		{
			if(this.closeStep(true))
				this.openStep(ss_NeedProviderStep);
			return;
		}
	}
	else if(this.fCurStep == ss_NeedProviderStep)
	{
		if(controlID == NeedProviderControl.CreateMembershipID)
		{
			if(this.closeStep(true))
			{
				var nextStep = ss_Undefined;

				if(this.providerEnroll())
				{
					nextStep = this.checkShowAvail();
				}
				else
					nextStep = ss_NeedProviderStep;

				if (nextStep == ss_Undefined)
					this.close();
				else
					this.openStep(nextStep);
			}
			return;
		}
	}
	else if(this.fCurStep == ss_HaveProviderStep)
	{
		if(controlID == HaveProviderControl.ContinueID)
		{
			if(this.closeStep(true))
			{
				var nextStep = ss_Undefined;

				if(this.setProvider())
					nextStep = this.checkShowAvail();
				else
					nextStep = ss_HaveProviderStep;

				if (nextStep == ss_Undefined)
					this.close();
				else
					this.openStep(nextStep);
			}

			return;
		}
	}
	else if(this.fCurStep == ss_ConfirmChargeStep)
	{
		if(controlID == ConfirmChargeControl.ChargeAccountID)
		{
			this.rentShow();
			//if(this.fRentedShowID)
			//	this.close();
			return;
		}
		else if(controlID == ConfirmChargeControl.DontChargeAccountID)
		{
			this.close();
			return;
		}
	}

	Screen.prototype.onButton.call(this, controlID);
}

/******************************************************************************/

/*RentStep*/ RentScreen.prototype.checkShowAvail = function()
{
	var oSession = MainApp.getThe().getSession();
	var oCheckShowAvailResp;
	var statusCodeRef = new Object();
	var statusCode;

	oCheckShowAvailResp = oSession.checkShowAvail(this.fRentData.getShowID(),
		this.fRentData.getProviderID(), statusCodeRef);
	statusCode = statusCodeRef.value;
	if(statusCode == sc_InvalidProviderUserIDPassword)
		return ss_HaveProviderStep;
	if(statusCode != sc_Success)
		return ss_Undefined;

	var oShowCost = oCheckShowAvailResp.ShowCostList[0];	//TODO: If multiple, need to confirm rental period/cost with user

	this.fRentData.ShowCost = oShowCost;
	if(oShowCost.ShowCostType == sct_PayPerView)
		return ss_ConfirmChargeStep;

	this.rentShow();
	return ss_Undefined;
}

/******************************************************************************/

/*void*/ RentScreen.prototype.rentShow = function()
{
	var oSession = MainApp.getThe().getSession();
	var oRentShowResp;

	oRentShowResp = oSession.rentShow(this.fRentData.getShowID(),
		this.fRentData.getProviderID(), this.fRentData.ShowCost);
	if(oRentShowResp != null)
	{
		// close the SearchDetailScreen and this screen
		var oScreen = MainApp.getThe().findScreen(SearchDetailScreen.ScreenID);
		if(oScreen != null)
			oScreen.close();
		this.close();

		// fetch the rentedShow and open the
		var rentedShow = oSession.rentedShow(oRentShowResp.RentedShowID);
		if(rentedShow != null)
			RentedShowDetailScreen.newInstance(rentedShow);
		//this.fRentedShowID = oRentShowResp.RentedShowID;
	}
}

/******************************************************************************/

/*boolean*/ RentScreen.prototype.setProvider = function()
{
	var oSession = MainApp.getThe().getSession();
	var statusCode;

	statusCode = oSession.setProvider(this.fRentData.getProviderID(),
		this.fRentData.UserID, this.fRentData.Password);

	return (statusCode == sc_Success);
}

/******************************************************************************/

/*boolean*/ RentScreen.prototype.providerEnroll = function()
{
	var oSession = MainApp.getThe().getSession();
	var statusCode;
	var tempStr;

	statusCode = oSession.providerEnroll(this.fRentData.getProviderID());

	if(statusCode == sc_Success)
	{
		tempStr = "Congratulations! You have been successfully enrolled to ";
		tempStr += this.fRentData.getProviderName();
		tempStr += "'s membership.";

		showMsg(tempStr);
		return true;
	}

	return false;
}

/******************************************************************************/
/******************************************************************************/
