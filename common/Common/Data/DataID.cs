#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.Collections;
using System.Reflection;

using iNetVOD.Common.Core;

namespace iNetVOD.Common.Data
{

	#region ManufacturerID
	public class ManufacturerID : StringID
	{
		public static readonly ManufacturerID Undefined = new ManufacturerID();
		public static readonly ConstructorInfo CtorString = typeof(ManufacturerID).GetConstructor(new Type[] { typeof (string) });

		public ManufacturerID() : base()
		{
		}

		public ManufacturerID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 64; } }
	}
	#endregion

	#region ProviderID
	public class ProviderID : StringID
	{
		public static readonly ProviderID Undefined = new ProviderID();
		public static readonly ConstructorInfo CtorString = typeof(ProviderID).GetConstructor(new Type[] { typeof (string) });

		public ProviderID() : base()
		{
		}

		public ProviderID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 64; } }
	}

	public class ProviderIDList : ArrayList
	{
		public static readonly ConstructorInfo Ctor = typeof(ProviderIDList).GetConstructor(new Type[] {});

		#region Group Methods
		public new ProviderID this[int index]
		{
			get { return (ProviderID)(base[index]); }
		}
		#endregion

		#region Group Methods
		public int IndexOf(ProviderID providerID)
		{
			for(int i = 0; i < Count; i++)
				if(this[i] == providerID)
					return i;

			return -1;
		}

		public bool Contains(ProviderID providerID)
		{
			return (IndexOf(providerID) >= 0);
		}
		#endregion
	}
	#endregion
	
	#region CategoryID
	public class CategoryID : StringID
	{
		public static readonly CategoryID Undefined = new CategoryID();
		public static readonly ConstructorInfo CtorString = typeof(CategoryID).GetConstructor(new Type[] { typeof (string) });

		public CategoryID() : base()
		{
		}

		public CategoryID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 32; } }
	}

	public class CategoryIDList : ArrayList
	{
		public static readonly ConstructorInfo Ctor = typeof(CategoryIDList).GetConstructor(new Type[] {});
	}
	#endregion

	#region RatingID
	public class RatingID : StringID
	{
		public static readonly RatingID Undefined = new RatingID();
		public static readonly ConstructorInfo CtorString = typeof(RatingID).GetConstructor(new Type[] { typeof (string) });

		public RatingID() : base()
		{
		}

		public RatingID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 32; } }
	}

	public class RatingIDList : ArrayList
	{
		public static readonly ConstructorInfo Ctor = typeof(RatingIDList).GetConstructor(new Type[] {});
	}
	#endregion

	#region MemberID
	public class MemberID : StringID
	{
		public static readonly MemberID Undefined = new MemberID();
		public static readonly ConstructorInfo CtorString = typeof(MemberID).GetConstructor(new Type[] { typeof (string) });

		public MemberID() : base()
		{
		}

		public MemberID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 64; } }
	}
	#endregion

	#region ShowID
	public class ShowID : StringID
	{
		public static readonly ShowID Undefined = new ShowID();
		public static readonly ConstructorInfo CtorString = typeof(ShowID).GetConstructor(new Type[] { typeof (string) });

		public ShowID() : base()
		{
		}

		public ShowID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 64; } }
	}
	#endregion

	#region ShowProviderID
	/// <summary>
	/// iNetVOD assigned ID for a Show as provided by a Provider
	/// </summary>
	public class ShowProviderID : StringID
	{
		public static readonly ShowProviderID Undefined = new ShowProviderID();
		public static readonly ConstructorInfo CtorString = typeof(ShowProviderID).GetConstructor(new Type[] { typeof (string) });

		public ShowProviderID() : base()
		{
		}

		public ShowProviderID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 64; } }
	}
	#endregion

	#region ProviderShowID
	/// <summary>
	/// ID for a Show as defined by Provider (not necessary unique)
	/// </summary>
	public class ProviderShowID : StringID
	{
		public static readonly ProviderShowID Undefined = new ProviderShowID();
		public static readonly ConstructorInfo CtorString = typeof(ProviderShowID).GetConstructor(new Type[] { typeof (string) });

		public ProviderShowID() : base()
		{
		}

		public ProviderShowID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 64; } }
	}
	#endregion

	#region ShowCategoryID
	public class ShowCategoryID : StringID
	{
		public static readonly ShowCategoryID Undefined = new ShowCategoryID();
		public static readonly ConstructorInfo CtorString = typeof(ShowCategoryID).GetConstructor(new Type[] { typeof (string) });

		public ShowCategoryID() : base()
		{
		}

		public ShowCategoryID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 64; } }
	}
	#endregion

	#region RentedShowID
	public class RentedShowID : StringID
	{
		public static readonly RentedShowID Undefined = new RentedShowID();
		public static readonly ConstructorInfo CtorString = typeof(RentedShowID).GetConstructor(new Type[] { typeof (string) });

		public RentedShowID() : base()
		{
		}

		public RentedShowID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 64; } }
	}
	#endregion

	#region ShowFormatID
	public class ShowFormatID : StringID
	{
		public static readonly ShowFormatID Undefined = new ShowFormatID();
		public static readonly ConstructorInfo CtorString = typeof(ShowFormatID).GetConstructor(new Type[] { typeof (string) });

		public ShowFormatID() : base()
		{
		}

		public ShowFormatID(string value) : base(value)
		{
		}

		public static int MaxLength { get { return 32; } }
	}

	public class ShowFormatIDList : ArrayList
	{
		public static readonly ConstructorInfo Ctor = typeof(ShowFormatIDList).GetConstructor(new Type[] {});
	}
	#endregion
}
