// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="AssetFile.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    /// <summary>
    /// Class AssetFile
    /// </summary>
    public class AssetFile : BaseFile
    {
        /// <summary>
        /// The file type
        /// </summary>
        private string fileType;

        /// <summary>
        /// Initializes a new instance of the <see cref="AssetFile"/> class.
        /// </summary>
        /// <param name="rootDirectory">The root directory.</param>
        /// <param name="absDirectory">The absolute directory.</param>
        public AssetFile(string rootDirectory, string absDirectory) : base(rootDirectory, absDirectory)
        {
            this.fileType = GetType(Path.GetExtension(absDirectory));
        }

        /// <summary>
        /// Gets the type of file it is.
        /// </summary>
        /// <param name="extension">The file extension.</param>
        /// <returns>System.String.</returns>
        private string GetType(string extension)
        {
            switch (extension)
            {
                case ".mp3":
                case ".ogg":
                    return "audio";
                case ".png":
                case ".jpg":
                case ".bmp":
                    return "image";
                case ".tmx":
                    return "tmx";
                case ".json":
                    return "Type Not Found";
                default:
                    return "Type Not Found";
            }
        }

        /// <summary>
        /// Gets the type of the file.
        /// </summary>
        /// <value>The type of the file.</value>
        public string FileType
        {
            get
            {
                return fileType;
            }
        }
    }
}
