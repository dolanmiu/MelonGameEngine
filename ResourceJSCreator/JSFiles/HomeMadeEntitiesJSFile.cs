// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="HomeMadeEntitiesJSFile.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    /// <summary>
    /// Class HomeMadeEntitiesJSFile
    /// </summary>
    public class HomeMadeEntitiesJSFile : MelonJSFile
    {
        /// <summary>
        /// The entities
        /// </summary>
        private List<Entity> entities = new List<Entity>();

        /// <summary>
        /// Initializes a new instance of the <see cref="HomeMadeEntitiesJSFile"/> class.
        /// </summary>
        /// <param name="rootDirectory">The root directory.</param>
        public HomeMadeEntitiesJSFile(string rootDirectory) : base(rootDirectory, rootDirectory)
        {
            ReadFile(rootDirectory);
        }

        /// <summary>
        /// Reads the file and create entities to add to the entities List.
        /// </summary>
        /// <param name="directory">The file directory.</param>
        private new void ReadFile(string directory)
        {
            string[] lines = System.IO.File.ReadAllLines(directory);
            for (int i = 0; i < lines.Length; i++)
            {
                int bracketCounter = 0;
                bool started = false;
                bool scanClass = true;

                bool matched = MatchesMelonMethodSignature(lines[i]);
                if (matched)
                {
                    string gameObject = lines[i].Split('=')[0].Trim();
                    string gameObjectName = gameObject.Split('.')[1].Trim();
                    string[] baseClass = lines[i].Split('=')[1].Trim().Split('.');

                    Entity entity = new Entity(gameObjectName, baseClass[0] + "." + baseClass[2]);
                    entities.Add(entity);
                    while (scanClass)
                    {
                        i = CheckForMethods(entity, lines, i);

                        bracketCounter += CheckBracketInString(lines[i]);

                        if (bracketCounter == 0 && started == true)
                        {
                            scanClass = false;
                        }
                        started = true;
                        i++;
                    }
                }
            }
        }

        /// <summary>
        /// Checks for methods.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <param name="lines">The file in string array representation.</param>
        /// <param name="i">The line number.</param>
        /// <returns>System.Int32.</returns>
        private int CheckForMethods(MelonJSObject entity, string[] lines, int i)
        {
            i = CheckAndAddMethod(entity, lines, i, "init");
            i = CheckAndAddMethod(entity, lines, i, "update");
            i = CheckAndAddMethod(entity, lines, i, "onCollision");
            i = CheckAndAddMethod(entity, lines, i, "draw");
            return i;
        }

        #region Properties
        /// <summary>
        /// Gets the entities.
        /// </summary>
        /// <value>The entities.</value>
        public List<Entity> Entities
        {
            get
            {
                return entities;
            }
        }
        #endregion
    }
}
