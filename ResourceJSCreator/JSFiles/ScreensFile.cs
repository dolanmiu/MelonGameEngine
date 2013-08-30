// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="ScreensFile.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace MelonJSHelper
{
    /// <summary>
    /// Class ScreensFile
    /// </summary>
    public class ScreensFile : MelonJSFile
    {
        /// <summary>
        /// The screens
        /// </summary>
        private List<Screen> screens = new List<Screen>();

        /// <summary>
        /// Initializes a new instance of the <see cref="MelonJSFile" /> class.
        /// </summary>
        /// <param name="rootDirectory">The root directory.</param>
        /// <param name="absDirectory">The absolute directory.</param>
        public ScreensFile(string rootDirectory, string absDirectory) : base(rootDirectory, absDirectory)
        {
            ReadFile(absDirectory);
        }

        /// <summary>
        /// Reads the file and creates screens in the screens list.
        /// </summary>
        /// <param name="directory">The directory.</param>
        public new void ReadFile(string directory)
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

                    Screen screen = new Screen(gameObjectName, baseClass[0] + "." + baseClass[2]);
                    screens.Add(screen);
                    while (scanClass)
                    {
                        i = CheckForMethods(screen, lines, i);

                        bracketCounter += CheckBracketInString(lines[i]);

                        if (bracketCounter == 0 && started == true)
                        {
                            scanClass = false;
                        }
                        started = true;
                        i++;
                    }
                }

                Match match = Regex.Match(lines[i], @"game\.loadStates\s*=\s*function\s*\(\s*\)\s*{");
                if (match.Success)
                {
                    while (scanClass)
                    {
                        bracketCounter += CheckBracketInString(lines[i]);

                        if (lines[i].Contains("me.state.set(")) 
                        {
                            string stateArgsFull = lines[i].Replace("me.state.set(", "").Replace(");", "");
                            stateArgsFull = stateArgsFull.Replace("(", "");
                            stateArgsFull = stateArgsFull.Replace(")", "");
                            stateArgsFull = stateArgsFull.Replace(" ", "");
                            stateArgsFull = stateArgsFull.Replace("new", "");
                            string[] stateArgs = stateArgsFull.Split(',');
                            string name = stateArgs[1].Split('.')[1];

                            for (int j = 0; j < screens.Count; j++)
                            {
                                if (screens[j].Name == name)
                                {
                                    screens[j].State = new State(stateArgs[0].Split('.')[2]);
                                }
                            }
                        }
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
        /// Checks for methods within the plugin.
        /// </summary>
        /// <param name="screen">The screen.</param>
        /// <param name="lines">The lines of the plugin.</param>
        /// <param name="i">The number line of plugin.</param>
        /// <returns>System.Int32.</returns>
        private int CheckForMethods(MelonJSObject screen, string[] lines, int i)
        {
            i = CheckAndAddMethod(screen, lines, i, "init");
            i = CheckAndAddMethod(screen, lines, i, "onResetEvent");

            return i;
        }

        /// <summary>
        /// Creates the Screen JS file.
        /// </summary>
        /// <returns>System.String[][].</returns>
        public string[] CreateJSFile()
        {
            List<string> fileStrings = new List<string>();
            foreach (Screen screen in screens)
            {
                fileStrings.Add(screen.ToString());
            }

            fileStrings.Add("game.loadStates = function () {");
            for (int i = 0; i < Settings.Screens.Count; i++)
            {
                if (Settings.Screens[i].State != null)
                {
                    fileStrings.Add("\t" + Settings.Screens[i].GetSetStateString() + "\n");
                }
            }
            fileStrings.Add("}");
            return fileStrings.ToArray();
        }

        #region Properties
        /// <summary>
        /// Gets the screens.
        /// </summary>
        /// <value>The screens.</value>
        public List<Screen> Screens
        {
            get
            {
                return screens;
            }
        }
        #endregion
    }
}
