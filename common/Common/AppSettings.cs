using System;
using System.IO;

namespace iNetVOD.Common
{
	public class AppSettings
	{
		#region Fields
		private static string fAppDataPath = Path.Combine(Path.Combine(Environment.GetFolderPath(
			Environment.SpecialFolder.CommonApplicationData), "iNetVOD"), "MCE");
		#endregion

		#region Properties
		public static string AppDataPath { get { return fAppDataPath; } }
		#endregion
	}
}
