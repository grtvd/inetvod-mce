#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Collections;
using System.IO;
using System.Text;
using System.Xml;

namespace iNetVOD.Common.Core
{
	public class XmlDataWriter : DataWriter
	{
		protected XmlTextWriter fXmlTextWriter;

		public XmlDataWriter(Stream stream)
		{
			fXmlTextWriter = new XmlTextWriter(stream, Encoding.UTF8);
			fXmlTextWriter.WriteStartDocument();
		}

		public bool PrettyPrint
		{
			set { fXmlTextWriter.Formatting = (value ? Formatting.Indented : Formatting.None); }
		}

		public void Close()
		{
			if(fXmlTextWriter != null)
			{
				fXmlTextWriter.WriteEndDocument();
				fXmlTextWriter.Close();
			}
		}

		public void Flush()
		{
			if(fXmlTextWriter != null)
				fXmlTextWriter.Flush();
		}

		public override void WriteByte(string fieldName, TByte data)
		{
			if(data.IsUndefined)
				return;

			fXmlTextWriter.WriteElementString(fieldName, data.ToString());
		}

		public override void WriteShort(string fieldName, TInt16 data)
		{
			if(data.IsUndefined)
				return;

			fXmlTextWriter.WriteElementString(fieldName, data.ToString());
		}

		public override void WriteInt(string fieldName, TInt32 data)
		{
			if(data.IsUndefined)
				return;

			fXmlTextWriter.WriteElementString(fieldName, data.ToString());
		}

		public override void WriteFloat(string fieldName, TFloat data)
		{
			if(data.IsUndefined)
				return;

			fXmlTextWriter.WriteElementString(fieldName, data.ToString());
		}

		public override void WriteDouble(string fieldName, TDouble data)
		{
			if(data.IsUndefined)
				return;

			fXmlTextWriter.WriteElementString(fieldName, data.ToString());
		}

		public override void WriteString(string fieldName, TString data, int maxLength)
		{
			if(data.IsUndefined)
				return;
			if(data.Value.Length > maxLength)
				throw new Exception(String.Format("invalid len({0}), maxLength({1})", data.Value.Length, maxLength));

			fXmlTextWriter.WriteElementString(fieldName, data.Value);
		}

		public override void WriteDate(string fieldName, TDate data)
		{
			if(data.IsUndefined)
				return;

			fXmlTextWriter.WriteElementString(fieldName, data.ToString());
		}

		public override void WriteDateTime(string fieldName, TDateTime data)
		{
			if(data.IsUndefined)
				return;

			fXmlTextWriter.WriteElementString(fieldName, data.ToString());
		}

		public override void WriteBoolean(string fieldName, TBool data)
		{
			if(data.IsUndefined)
				return;

			fXmlTextWriter.WriteElementString(fieldName, data.ToString().ToLower());
		}

		public override void WriteObject(string fieldName, Writeable data)
		{
			if(data == null)
				return;

			fXmlTextWriter.WriteStartElement(fieldName);
			data.WriteTo(this);
			fXmlTextWriter.WriteEndElement();
		}

		public override void WriteList(string fieldName, IList data)
		{
			foreach(Writeable item in data)
				WriteObject(fieldName, item);
		}

		public override void WriteStringList(string fieldName, IList data, int maxLength)
		{
			foreach(object item in data)
				WriteString(fieldName, new TString(item), maxLength);
		}

		public override void WriteDataID(string fieldName, DataID data, int maxLength)
		{
			WriteString(fieldName, new TString((data != null) ? data.ToString() : null), maxLength);
		}
	}
}
