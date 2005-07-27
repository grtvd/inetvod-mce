
var SearchScreen_ScreenID = "Search006";

function SearchScreen()
{
	this.ScreenID = SearchScreen_ScreenID;

	this.fContainerControl = new ContainerControl(this.ScreenID);
	this.fContainerControl.newControl(new ButtonControl(this.ScreenID + '_Description'));
	this.fContainerControl.newControl(new ButtonControl(this.ScreenID + '_ShowNameLabel'));
	this.fContainerControl.newControl(new ButtonControl(this.ScreenID + '_ShowName'));
	this.fContainerControl.newControl(new ButtonControl(this.ScreenID + '_Search'));
	this.fContainerControl.newControl(new ButtonControl(this.ScreenID + '_SearchName'));

	this.fContainerControl.show(true);
}

/*ContainerControl*/ SearchScreen.prototype.getContainerControl = function()
{
	return this.fContainerControl;
}
