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
EditControl.TripleTapKeyArray = null;

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
	this.fNextTTKeyTime = -1;
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
//	else
	if(editControlType == ect_UpperAlphaNumeric)
	{
		if(EditControl.UpperAlphaNumericValidCharArray != null)
			return EditControl.UpperAlphaNumericValidCharArray;

		arr = new Array();

		for(ch = 65; ch <= 90; ch++)
			arr.push(ch);
		for(ch = 48; ch <= 57; ch++)
			arr.push(ch);
		arr.push(64);	// @
		arr.push(46);	// .
		arr.push(32);	// space

		EditControl.UpperAlphaNumericValidCharArray = arr;
		return EditControl.UpperAlphaNumericValidCharArray;
	}
	if(editControlType == ect_Numeric)
	{
		if(EditControl.NumericValidCharArray != null)
			return EditControl.NumericValidCharArray;

		arr = new Array();

		for(ch = 48; ch <= 57; ch++)
			arr.push(ch);

		EditControl.NumericValidCharArray = arr;
		return EditControl.NumericValidCharArray;
	}
	else
		throw "EditControl.getValidCharArray: Invalid fType(" + editControlType + ")";
}

/******************************************************************************/

/*Array*/ EditControl.prototype.getTripleTapKeyArray = function()
{
	if(EditControl.TripleTapKeyArray != null)
		return EditControl.TripleTapKeyArray;

	EditControl.TripleTapKeyArray = new Array();

	/* 0: 0, space */
	EditControl.TripleTapKeyArray.push(new Array(48, 32));

	/* 1: 1, @, . */
	EditControl.TripleTapKeyArray.push(new Array(49, 64, 46));

	/* 2: 2, A, B, C */
	EditControl.TripleTapKeyArray.push(new Array(50, 65, 66, 67));

	/* 3: 3, D, E, F */
	EditControl.TripleTapKeyArray.push(new Array(51, 68, 69, 70));

	/* 4: 4, G, H, I */
	EditControl.TripleTapKeyArray.push(new Array(52, 71, 72, 73));

	/* 5: 5, J, K, L */
	EditControl.TripleTapKeyArray.push(new Array(53, 74, 75, 76));

	/* 6: 6, M, N, O */
	EditControl.TripleTapKeyArray.push(new Array(54, 77, 78, 79));

	/* 7: 7, P, Q, R, S */
	EditControl.TripleTapKeyArray.push(new Array(55, 80, 81, 82, 83));

	/* 8: 8, T, U, V */
	EditControl.TripleTapKeyArray.push(new Array(56, 84, 85, 86));

	/* 9: 9, W, X, Y, Z */
	EditControl.TripleTapKeyArray.push(new Array(57, 87, 88, 89, 90));

	return EditControl.TripleTapKeyArray;
}

/******************************************************************************/

/*boolean*/ EditControl.prototype.isTripleTapKey = function(/*int*/ key)
{
	if(this.Type != ect_UpperAlphaNumeric)
		return false;
	return ((key >= 48) && (key <= 57));
}


/******************************************************************************/

/*boolean*/ EditControl.prototype.sameTripleTapKey = function(/*int*/ key, /*int*/ curKey)
{
	if(!this.isTripleTapKey(key))
		return false;

	var ttKeyArray = this.getTripleTapKeyArray()[key - 48];
	return (arrayIndexOf(ttKeyArray, curKey) >= 0);
}


/******************************************************************************/

/*int*/ EditControl.prototype.mapTripleTapKey = function(/*int*/ key, /*int*/ curKey)
{
	if(!this.isTripleTapKey(key))
		return key;

	var ttKeyArray = this.getTripleTapKeyArray()[key - 48];
	var curPos = arrayIndexOf(ttKeyArray, curKey)

	if(curPos < 0)
		return ttKeyArray[0];
	if(curPos < ttKeyArray.length - 1)
		return ttKeyArray[curPos + 1];

	return ttKeyArray[0];
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

	if((this.fFirstPos > 0) & (this.fText.length + 1 <= this.fFirstPos + this.fViewableChars))
	{
		this.fFirstPos = this.fText.length + 1 - this.fViewableChars;
		if(this.fFirstPos < 0)
			this.fFirstPos = 0;
	}
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
//	else if(key == ek_RightButton)
//	{
//		if(this.fCurPos < this.MaxLength - 1)
//		{
//			if(this.fCurPos < this.fText.length)
//			{
//				this.fCurPos++;
//				this.checkPositions();
//				this.drawChars(this.fFocused);
//				return true;
//			}
//			else if((this.fText.length == 0) || (this.fText[this.fText.length - 1] != " "))
//			{
//				// see if spaces are supported, add a space char
//				pos = arrayIndexOf(validCharArray, 32);
//				if(pos >= 0)
//				{
//					this.fText.push(" ");
//					this.fCurPos = this.fText.length;
//					this.checkPositions();
//					this.drawChars(this.fFocused);
//					return true;
//				}
//			}
//		}
//	}
	else if((key == ek_Backspace) || (key == ek_LeftButton))
	{
		if(this.fCurPos > 0)
		{
			if(this.fCurPos >= this.fText.length)
				this.fCurPos--;

			if(this.fCurPos <= this.fText.length)
				this.fText.splice(this.fCurPos, 1);

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

	// force upper case
	if ((key >= 97) && (key <= 122))
		key -= 32;

	var ttKey = key;
	var curKey = 0;
	var isTripleTapKey = this.isTripleTapKey(key);
	if(isTripleTapKey)
	{
		if(this.fCurPos < this.fText.length)
			curKey = this.fText[this.fCurPos].charCodeAt(0);
		key = this.mapTripleTapKey(key, curKey);
		this.fNextTTKeyTime = (new Date()).getTime() + 2000;
	}
	else
		this.fNextTTKeyTime = -1;

	pos = arrayIndexOf(validCharArray, key);
	if(pos >= 0)
	{
		if(isTripleTapKey && !this.sameTripleTapKey(ttKey, curKey))
			if((this.fCurPos < this.fText.length) && (this.fCurPos < this.MaxLength - 1))
				this.fCurPos++;

		if(this.fCurPos >= this.fText.length)
		{
			this.fText.push(" ");
			this.fCurPos = this.fText.length - 1;
		}
		this.fText[this.fCurPos] = String.fromCharCode(key);

		if(this.fCurPos < this.fText.length)
			if(this.fCurPos < this.MaxLength - 1)
				if(!isTripleTapKey)
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

/*void*/ EditControl.prototype.idle = function()
{
	if((this.fNextTTKeyTime >= 0) && ((new Date()) >= this.fNextTTKeyTime))
	{
		this.fNextTTKeyTime = -1;
		if(this.fCurPos < this.fText.length)
			if(this.fCurPos < this.MaxLength - 1)
			{
				this.fCurPos++;
				this.checkPositions();
				this.drawChars(this.fFocused);
			}
	}
}

/******************************************************************************/
/******************************************************************************/
