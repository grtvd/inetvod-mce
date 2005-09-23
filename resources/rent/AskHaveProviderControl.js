/* AskHaveProviderControl.js */

/******************************************************************************/
/******************************************************************************/

AskHaveProviderControl.ControlID = "Rent001_AskHaveProviderControl";

AskHaveProviderControl.WelcomeTextID = "Rent001_AskHaveProviderControl_WelcomeText";
AskHaveProviderControl.MembershipTextID = "Rent001_AskHaveProviderControl_MembershipText";
AskHaveProviderControl.HaveMembershipID = "Rent001_AskHaveProviderControl_HaveMembership";
AskHaveProviderControl.NeedMembershipID = "Rent001_AskHaveProviderControl_NeedMembership";

/******************************************************************************/

AskHaveProviderControl.newInstance = function()
{
	var containerControl = new AskHaveProviderControl(AskHaveProviderControl.ControlID, 0, 0);
	containerControl.onNavigate = AskHaveProviderControl.onNavigate;

	containerControl.newControl(new TextControl(AskHaveProviderControl.WelcomeTextID, RentScreen.ScreenID));
	containerControl.newControl(new TextControl(AskHaveProviderControl.MembershipTextID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(AskHaveProviderControl.HaveMembershipID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(AskHaveProviderControl.NeedMembershipID, RentScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

AskHaveProviderControl.prototype = new ContainerControl();
AskHaveProviderControl.prototype.constructor = AskHaveProviderControl;

/******************************************************************************/

function AskHaveProviderControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ AskHaveProviderControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(AskHaveProviderControl.WelcomeTextID);
	tempStr = "This show requires a membership with the provider, ";
	tempStr += oRentData.getProviderName();
	tempStr += ".";
	oControl.setText(tempStr);

	oControl = this.getControl(AskHaveProviderControl.MembershipTextID);
	tempStr = "Do you already have a membership with ";
	tempStr += oRentData.getProviderName();
	tempStr += "?";
	oControl.setText(tempStr);

	return true;
}

/******************************************************************************/

/*string*/ AskHaveProviderControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return AskHaveProviderControl.NeedMembershipID;

	if((fromControl == AskHaveProviderControl.HaveMembershipID)
		|| (fromControl == AskHaveProviderControl.NeedMembershipID))
	{
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;
	}

	return null;
}

/******************************************************************************/
/******************************************************************************/
