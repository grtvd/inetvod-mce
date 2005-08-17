/* EditControl */

/******************************************************************************/
/******************************************************************************/

/* EditControlType */
var ect_AlphaNumeric = 0;		// all upper and lower A - Z and 0 - 9
var ect_UpperAlphaNumeric = 1;	// upper only A - Z and 0 - 9
var ect_Numeric = 2;			// only 0 - 9

/******************************************************************************/

EditControl.AlphaNumericValidCharArray = null;
EditControl.UpperAlphaNumericValidCharArray = null;
EditControl.NumericValidCharArray = null;

/******************************************************************************/

EditControl.prototype = new Control();
EditControl.prototype.constructor = EditControl;

/******************************************************************************/

function EditControl(/*string*/ controlID, /*string*/ screenID, /*int*/ viewableChars)
{
	this.ControlID = controlID;
	this.ScreenID = screenID;
	this.fUIObj = document.getElementById(controlID);
	if(this.fUIObj == null)
		throw "EditControl::ctor(controlID): Can't find UI object, ID(" + controlID + ")";
	this.fFocused = false;

	this.Type = ect_Numeric;
	this.fText = new Array();

	this.fViewableChars = viewableChars;
	this.fFirstPos = 0;
	this.fCurPos = -1;
	this.MaxLength = 25;
	this.AutoButton = false;

	this.setFocus(false);
}

/******************************************************************************/

/*string*/ EditControl.prototype.getText = function()
{
	var txt = "";

	for(var i = 0; i < this.fText.length; i++)
		txt += this.fText[i];

	return txt;
}

/******************************************************************************/

/*Array*/ EditControl.prototype.getValidCharArray = function(/*EditControlType*/ editControlType)
{
	var arr;
	var ch;

//	if(editControlType == ect_AlphaNumeric)
//	{
//		if(EditControl.AlphaNumericValidCharArray != null)
//			return EditControl.AlphaNumericValidCharArray;

//		arr = new Array();
//		for(ch = 'A'; ch <= 'Z'; ch++)
//		{
//			arr.push(ch);
//			arr.push(tolower(ch));
//		}
//		for(ch = '0'; ch <= '9'; ++ch)
//			arr.push(ch);
//		arr.push(' ');

//		EditControl.AlphaNumericValidCharArray = arr;
//	}
//	else if(editControlType == ect_UpperAlphaNumeric)
//	{
//		if(EditControl.UpperAlphaNumericValidCharArray != null)
//			return EditControl.UpperAlphaNumericValidCharArray;

//		for(ch = 'A'; ch <= 'Z'; ++ch)
//			arr.push(ch);
//		for(ch = '0'; ch <= '9'; ++ch)
//			arr.push(ch);
//		arr.push(' ');
//
//		EditControl.UpperAlphaNumericValidCharArray = arr;
//	}
//	else
	if(editControlType == ect_Numeric)
	{
		arr = new Array();

		if(EditControl.NumericValidCharArray != null)
			return EditControl.NumericValidCharArray;

		for(ch = 48; ch <= 57; ch++)
			arr.push(ch);

		EditControl.NumericValidCharArray = arr;
		return EditControl.NumericValidCharArray;
	}
	else
		throw "EditControl.getValidCharArray: Invalid fType(" + editControlType + ")";
}

/******************************************************************************/

/*void*/ EditControl.prototype.setFocus = function(/*boolean*/ set)
{
	checkClassName(this.fUIObj, set ? 'hilite' : 'normal');
	this.fFocused = set;

	if(set)
	{
		if(this.fCurPos == -1)
		{
			var len = this.fText.length;

			if((this.fViewableChars == this.MaxLength) && (len == this.MaxLength))
				this.fCurPos = len - 1;
			else
				this.fCurPos = len;
			this.checkPositions();
		}

		if(document.activeElement.id != this.fUIObj.id)
			this.fUIObj.focus();
	}

	if(!set)
	{
		this.fCurPos = -1;
		this.fFirstPos = 0;
	}

	this.drawChars(set);

	if(set)
		this.getScreen().onFocus(this.ControlID);
}

/******************************************************************************/

/*void*/ EditControl.prototype.checkPositions = function()
{
	var len = this.fText.length;

	if(this.fCurPos < 0)
		this.fCurPos = 0;
	else if(this.fCurPos > len)
		this.fCurPos = len;

	if(this.fCurPos < this.fFirstPos)
		this.fFirstPos = this.fCurPos;
	else if(this.fFirstPos < this.fCurPos - this.fViewableChars + 1)
		this.fFirstPos = this.fCurPos - this.fViewableChars + 1;
}

/******************************************************************************/

/*void*/ EditControl.prototype.drawChars = function(/*boolean*/ showFocus)
{
	var oUIChar;
	var textLen = this.fText.length;
	var numChars = textLen + 1;
	var focusedChar;

	if(numChars > this.fViewableChars)
		numChars = this.fViewableChars;

	for(var i = 0; i < numChars; i++)
	{
		focusedChar = (showFocus && this.fFocused && (i + this.fFirstPos == this.fCurPos));

		oUIChar = document.getElementById(this.ControlID + "_" + i);
		oUIChar.innerHTML = (i + this.fFirstPos < textLen) ?  this.fText[i + this.fFirstPos] : "";
		checkClassName(oUIChar, focusedChar ? 'hilite' : 'normal');
	}

	for(i = numChars; i < this.fViewableChars; i++)
	{
		oUIChar = document.getElementById(this.ControlID + "_" + i);
		oUIChar.innerHTML = "";
		checkClassName(oUIChar, 'normal');
	}
}

/******************************************************************************/

/*boolean*/ EditControl.prototype.key = function(/*int*/ key)
{
	var validCharArray = this.getValidCharArray(this.Type);
	var pos;

	if(key == ek_Select)
	{
		this.getScreen().onButton(this.ControlID);
		return true;
	}
	else if(key == ek_RightButton)
	{
		if(this.fCurPos < this.MaxLength - 1)
		{
			if(this.fCurPos < this.fText.length)
			{
				this.fCurPos++;
				this.checkPositions();
				this.drawChars(this.fFocused);
				return true;
			}
			else if((this.fText.length == 0) || (this.fText[this.fText.length - 1] != " "))
			{
				// see if spaces are supported, add a space char
				pos = arrayIndexOf(validCharArray, 32);
				if(pos >= 0)
				{
					this.fText.push(" ");
					this.fCurPos = this.fText.length;
					this.checkPositions();
					this.drawChars(this.fFocused);
					return true;
				}
			}
		}
	}
	else if((key == ek_Backspace) || (key == ek_LeftButton))
	{
		if(this.fCurPos > 0)
		{
			if(this.fCurPos < this.fText.length)
				this.fText.splice(this.fCurPos, 1);

			this.fCurPos--;
			this.checkPositions();
			this.drawChars(this.fFocused);
			return true;
		}
		else if (this.fCurPos == 0)
		{
			if(this.fText.length > 0)
			{
				this.fText.splice(0,this.fText.length);
				this.drawChars(this.fFocused);
				return true;
			}
		}
	}

	var validCharArray = this.getValidCharArray(this.Type);
	var pos;

	pos = arrayIndexOf(validCharArray, key);
	if(pos >= 0)
	{
		if(this.fCurPos >= this.fText.length)
		{
			this.fText.push(" ");
			this.fCurPos = this.fText.length - 1;
		}
		this.fText[this.fCurPos] = String.fromCharCode(key);

		if(this.fCurPos < this.fText.length)
			if(this.fCurPos < this.MaxLength - 1)
				this.fCurPos++;
		this.checkPositions();
		this.drawChars(this.fFocused);

		if(this.AutoButton && (this.fText.length == this.MaxLength))
			this.getScreen().onButton(this.ControlID);

		return true;
	}

	return Control.prototype.key.call(this, key);
}

/******************************************************************************/
/******************************************************************************/
