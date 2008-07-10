/* NeedProviderControl.js */

/******************************************************************************/
/******************************************************************************/

NeedProviderControl.ControlID = "Rent001_NeedProviderControl";

NeedProviderControl.MemberTextID = "Rent001_NeedProviderControl_MemberText";
NeedProviderControl.PlanTextID = "Rent001_NeedProviderControl_PlanText";
NeedProviderControl.CreateMembershipID = "Rent001_NeedProviderControl_CreateMembership";

/******************************************************************************/

NeedProviderControl.newInstance = function()
{
	var containerControl = new NeedProviderControl(NeedProviderControl.ControlID, 0, 0);
	containerControl.onNavigate = NeedProviderControl.onNavigate;

	containerControl.newControl(new TextControl(NeedProviderControl.MemberTextID, RentScreen.ScreenID));
	containerControl.newControl(new TextControl(NeedProviderControl.PlanTextID, RentScreen.ScreenID));
	containerControl.newControl(new ButtonControl(NeedProviderControl.CreateMembershipID, RentScreen.ScreenID));
	if(ViewPortControl.isOpen())
		containerControl.newControl(new ViewPortControl(ViewPortControl.ControlID, RentScreen.ScreenID));

	return containerControl
}

/******************************************************************************/

NeedProviderControl.prototype = new ContainerControl();
NeedProviderControl.prototype.constructor = NeedProviderControl;

/******************************************************************************/

function NeedProviderControl(/*int*/ controlID, /*int*/ left, /*int*/ top)
{
	ContainerControl.prototype.init.call(this, controlID, left, top);
}

/******************************************************************************/

/*boolean*/ NeedProviderControl.prototype.loadData = function(/*object*/ oData)
{
	var oRentData = oData;
	var oControl;
	var tempStr;

	oControl = this.getControl(NeedProviderControl.MemberTextID);
	tempStr = "Your iNetVOD membership information will be used to create a new FREE membership at ";
	tempStr += oRentData.getProviderName();
	tempStr += ".  Your credit card information, if on file, will not be sent to ";
	tempStr += oRentData.getProviderName();
	tempStr += ".";
	oControl.setText(tempStr);

	oControl = this.getControl(NeedProviderControl.PlanTextID);
	tempStr = oRentData.getProviderName();
	tempStr += " may have various member subscription plans that may be of interest to you.  Please visit the iNetVOD web site at www.inetvod.com for more information.";
	oControl.setText(tempStr);

	return true;
}

/******************************************************************************/

/*string*/ NeedProviderControl.onNavigate = function(/*string*/ fromControl, /*int*/ key)
{
	if(fromControl == ViewPortControl.ControlID)
		if(key == ek_RightButton)
			return NeedProviderControl.CreateMembershipID;

	if(fromControl == NeedProviderControl.CreateMembershipID)
		if(key == ek_LeftButton)
			return ViewPortControl.ControlID;

	return null;
}

/******************************************************************************/
/******************************************************************************/
