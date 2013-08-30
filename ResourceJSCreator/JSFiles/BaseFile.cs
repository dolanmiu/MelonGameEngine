// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="BaseFile.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    /// <summary>
    /// Class BaseFile
    /// </summary>
    public abstract class BaseFile : Code
    {
        //protected string absDirectory;
        /// <summary>
        /// The relative directory
        /// </summary>
        protected string relativeDirectory;
        /// <summary>
        /// The file name
        /// </summary>
        protected string fileName;
        /// <summary>
        /// The file extension
        /// </summary>
        protected string extension;

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseFile"/> class.
        /// </summary>
        /// <param name="rootFolder">The root folder.</param>
        /// <param name="absDirectory">The absolute directory.</param>
        protected BaseFile(string rootFolder, string absDirectory)
        {
            //this.absDirectory = absDirectory;
            this.relativeDirectory = MakeRelativePath(rootFolder, absDirectory);
            this.fileName = Path.GetFileNameWithoutExtension(absDirectory);
            this.extension = Path.GetExtension(absDirectory);
        }

        /// <summary>
        /// Makes the relative path.
        /// </summary>
        /// <param name="fromPath">From path.</param>
        /// <param name="toPath">To path.</param>
        /// <returns>System.String.</returns>
        /// <exception cref="System.ArgumentNullException">
        /// fromPath
        /// or
        /// toPath
        /// </exception>
        private string MakeRelativePath(string fromPath, string toPath)
        {
            if (String.IsNullOrEmpty(fromPath)) throw new ArgumentNullException("fromPath");
            if (String.IsNullOrEmpty(toPath)) throw new ArgumentNullException("toPath");

            Uri fromUri = new Uri(fromPath);
            Uri toUri = new Uri(toPath);

            Uri relativeUri = fromUri.MakeRelativeUri(toUri);
            String relativePath = Uri.UnescapeDataString(relativeUri.ToString());

            return relativePath.Replace('/', Path.DirectorySeparatorChar);
        }

        /// <summary>
        /// Reads the file.
        /// </summary>
        /// <param name="directory">The file directory.</param>
        /// <returns>Tuple{List{System.String}List{System.String}}.</returns>
        protected Tuple<List<string>, List<string>> ReadFile(string directory)
        {
            List<string> gameObjects = new List<string>();
            List<string> gameObjectNames = new List<string>();
            string[] lines = System.IO.File.ReadAllLines(directory);
            foreach (string line in lines)
            {
                Match match = Regex.Match(line, @"game\.([A-Za-z0-9\-_]+) = ([A-Za-z0-9\-_]+)\.([A-Za-z0-9\-_]+)\.extend\({");
                if (match.Success)
                {
                    string gameObject = line.Split('=')[0].Trim();
                    string gameObjectName = gameObject.Split('.')[1].Trim();
                    gameObjects.Add(gameObject);
                    gameObjectNames.Add(gameObjectName);
                }
            }
            return new Tuple<List<string>, List<string>>(gameObjects, gameObjectNames);
        }

        #region Properties
        /// <summary>
        /// Gets the folder relative path.
        /// </summary>
        /// <value>The folder relative path.</value>
        public string FolderRelativePath
        {
            get
            {
                string dir = Path.GetDirectoryName(relativeDirectory) + "/";
                dir = dir.Replace(@"\", "/");
                return dir;
            }
        }

        /// <summary>
        /// Gets the name of the file.
        /// </summary>
        /// <value>The name of the file.</value>
        public string FileName
        {
            get
            {
                return fileName;
            }
        }

        /// <summary>
        /// Gets the file relative path.
        /// </summary>
        /// <value>The file relative path.</value>
        public string FileRelativePath
        {
            get
            {
                string dir = relativeDirectory;
                dir = dir.Replace(@"\", "/");
                return dir;
            }
        }
        #endregion
    }
}
