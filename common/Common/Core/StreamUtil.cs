#region Copyright
// Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
// iNetVOD Confidential and Proprietary.  See LEGAL.txt.
#endregion
using System;
using System.IO;

namespace iNetVOD.Common.Core
{
	public class StreamUtil
	{
		public static void StreamCopy (Stream input, Stream output, bool seekStart, bool keepPosition)
		{
			const int size = 4096;
			byte[] bytes = new byte[4096];
			int numBytes;
			long position = 0;

			if (keepPosition)
				position = input.Position;
			if (seekStart)
				input.Position = 0;

			while((numBytes = input.Read(bytes, 0, size)) > 0)
				output.Write(bytes, 0, numBytes);

			if (keepPosition)
				input.Position = position;
		}

		public static void StreamToFile (Stream stream, string file)
		{
			FileStream fileStream = new FileStream(file, FileMode.Create);
			try
			{
				StreamCopy (stream, fileStream, stream.CanSeek, stream.CanSeek);
			}
			finally
			{
				fileStream.Close();
			}
		}
	}
}
