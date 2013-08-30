// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="EntityJSFile.cs" company="">
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
    /// Class EntityJSFile
    /// </summary>
    public class EntityJSFile : BaseFile
    {
        /// <summary>
        /// The game objects
        /// </summary>
        private List<string> gameObjects = new List<string>();
        /// <summary>
        /// The game object names
        /// </summary>
        private List<string> gameObjectNames = new List<string>();

        /// <summary>
        /// Initializes a new instance of the <see cref="EntityJSFile"/> class.
        /// </summary>
        /// <param name="rootDirectory">The root directory.</param>
        /// <param name="absDirectory">The absolute directory.</param>
        public EntityJSFile(string rootDirectory, string absDirectory) : base(rootDirectory, absDirectory)
        {
            ReadFile(absDirectory);
        }

        /// <summary>
        /// Reads the file and creates new game objects
        /// </summary>
        /// <param name="directory">The file directory.</param>
        private new void ReadFile(string directory) 
        {
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
        }

        /// <summary>
        /// Gets the game objects.
        /// </summary>
        /// <value>The game objects.</value>
        public List<string> GameObjects
        {
            get
            {
                return gameObjects;
            }
        }

        /// <summary>
        /// Gets the game object names.
        /// </summary>
        /// <value>The game object names.</value>
        public List<string> GameObjectNames
        {
            get
            {
                return gameObjectNames;
            }
        }
    }
}
