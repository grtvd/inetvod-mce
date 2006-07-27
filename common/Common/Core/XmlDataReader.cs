#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Collections;
using System.IO;
using System.Reflection;
using System.Xml;

namespace iNetVOD.Common.Core
{
	public class XmlDataReader : DataReader
	{
		protected XmlDocument fDocument;
		protected ArrayList fCurNodeList;

		public XmlDataReader(Stream stream)
		{
			fDocument = new XmlDocument();
			fDocument.Load(stream);
			fCurNodeList = new ArrayList();
			fCurNodeList.Add(fDocument);
		}

		private XmlNode FindChildNode(string fieldName)
		{
			if(fCurNodeList.Count == 0)
				throw new Exception("No current node");

			foreach(XmlNode node in ((XmlNode)(fCurNodeList[fCurNodeList.Count - 1])).ChildNodes)
			{
				if(node.LocalName.Equals(fieldName))
					return node;
			}

			return null;
		}

		private ArrayList FindChildNodes(string fieldName)
		{
			if(fCurNodeList.Count == 0)
				throw new Exception("No current node");

			ArrayList nodes = new ArrayList();

			foreach(XmlNode node in ((XmlNode)(fCurNodeList[fCurNodeList.Count - 1])).ChildNodes)
			{
				if(node.LocalName.Equals(fieldName))
					nodes.Add(node);
			}

			return nodes;
		}

		public override TByte ReadByte(string fieldName)
		{
			return new TByte(ReadString(fieldName));
		}

		public override TInt16 ReadShort(string fieldName)
		{
			return new TInt16(ReadString(fieldName));
		}

		public override TInt32 ReadInt(string fieldName)
		{
			return new TInt32(ReadString(fieldName));
		}

		public override TFloat ReadFloat(string fieldName)
		{
			return new TFloat(ReadString(fieldName));
		}

		public override TDouble ReadDouble(string fieldName)
		{
			return new TDouble(ReadString(fieldName));
		}

		protected string ReadString(string fieldName)
		{
			XmlNode node = FindChildNode(fieldName);
			if(node == null)
				return null;

			return node.InnerText;
		}

		public override TString ReadString(string fieldName, int maxLength)
		{
			TString data = new TString (ReadString(fieldName));
			int len = data.Value.Length;

			if(len > maxLength)
				throw new Exception(String.Format("invalid len({0}), maxLength({1})", len, maxLength));

			return data;
		}

		public override TDate ReadDate(string fieldName)
		{
			return new TDate(ReadString(fieldName));
		}

		public override TDateTime ReadDateTime(string fieldName)
		{
			return new TDateTime(ReadString(fieldName));
		}

		public override TBool ReadBoolean(string fieldName)
		{
			return new TBool(ReadString(fieldName));
		}

		public override Readable ReadObject(string fieldName, ConstructorInfo ctorDataReader)
		{
			XmlNode node = FindChildNode(fieldName);
			if(node == null)
				return null;

			fCurNodeList.Add(node);
			Readable readable = (Readable)ctorDataReader.Invoke(new object[] { this });
			fCurNodeList.RemoveAt(fCurNodeList.Count - 1);

			return readable;
		}

		public override IList ReadList(string fieldName, ConstructorInfo listCtor, ConstructorInfo itemCtorDataReader)
		{
			IList list = (IList)listCtor.Invoke(new object[] {});

			ArrayList nodes = FindChildNodes(fieldName);
			if(nodes.Count == 0)
				return list;

			foreach(XmlNode node in nodes)
			{
				fCurNodeList.Add(node);
				Readable readable = (Readable)itemCtorDataReader.Invoke(new object[] { this });
				list.Add(readable);
				fCurNodeList.RemoveAt(fCurNodeList.Count - 1);
			}

			return list;
		}

		public override IList ReadStringList(string fieldName, int maxLength, ConstructorInfo listCtor, ConstructorInfo itemCtorString)
		{
			IList list = (IList)listCtor.Invoke(new object[] {});

			ArrayList nodes = FindChildNodes(fieldName);
			if(nodes.Count == 0)
				return list;

			foreach(XmlNode node in nodes)
			{
				Readable readable = (Readable)itemCtorString.Invoke(new object[] { node.InnerText });
				list.Add(readable);
			}

			return list;
		}

		public override DataID ReadDataID(string fieldName, int maxLength, ConstructorInfo stringConstructorInfo)
		{
			TString data = ReadString(fieldName, maxLength);

			// supports data.IsUndefined.  data.Value returns empty string, which converts to DataID.IsUndefined.
			return (DataID)stringConstructorInfo.Invoke(new object[] { data.Value });
		}
	}
}
