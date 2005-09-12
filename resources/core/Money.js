/* Money.js */

/******************************************************************************/
/******************************************************************************/

var CurrencyIDMaxLength = 3;

var cur_USD = "USD";

/******************************************************************************/

function Money(reader)
{
	this.CurrencyID = null;
	this.Amount = null;

	if(reader != undefined)
		this.readFrom(reader);
}

/******************************************************************************/

/*void*/ Money.prototype.readFrom = function(/*DataReader*/ reader)
{
	this.CurrencyID = reader.readString("CurrencyID", CurrencyIDMaxLength);
	this.Amount = reader.readDouble("Amount");
}

/******************************************************************************/

/*void*/ Money.prototype.writeTo = function(/*DataWriter*/ writer)
{
	writer.writeString("CurrencyID", this.CurrencyID, CurrencyIDMaxLength);
	writer.writeDouble("Amount", this.Amount);
}

/******************************************************************************/
/******************************************************************************/
