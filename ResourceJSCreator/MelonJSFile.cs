// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-24-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="MelonJSFile.cs" company="">
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
    /// Class MelonJSFile
    /// </summary>
    public class MelonJSFile : BaseFile, IMelonJSFile
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MelonJSFile"/> class.
        /// </summary>
        /// <param name="rootDirectory">The root directory.</param>
        /// <param name="absDirectory">The abs directory.</param>
        public MelonJSFile(string rootDirectory, string absDirectory) : base(rootDirectory, absDirectory)
        {

        }

        /// <summary>
        /// Parses the method inside a Melon File. For example, init: function() { },
        /// </summary>
        /// <param name="lines">The lines.</param>
        /// <param name="lineNo">The line no.</param>
        /// <param name="methodName">Name of the method.</param>
        /// <returns>Tuple{System.Int32System.StringList{System.String}}.</returns>
        private Tuple<int, string, List<string>> ParseMethod(string[] lines, int lineNo, string methodName)
        {
            int bracketCounter = 0;
            int startLineNo = lineNo;
            bool started = false;
            bool scanClass = true;
            string methodSignature = null;
            List<string> methodLines = new List<string>();
            Match match = Regex.Match(lines[lineNo], methodName + @"\s*:\s*function\s*\(([A-Za-z0-9\-_, ]*)\)\s*({*)");
            if (match.Success)
            {
                methodSignature = lines[lineNo];
                while (scanClass)
                {
                    if (lines[lineNo].Contains("{"))
                    {
                        bracketCounter++;
                        started = true;
                    }

                    if (lines[lineNo].Contains("}"))
                    {
                        bracketCounter--;
                    }

                    if (bracketCounter != 0 && lineNo - startLineNo > 0)
                    {
                        methodLines.Add(lines[lineNo].Trim());
                    }

                    if (bracketCounter == 0 && started == true && lineNo - startLineNo > 1)
                    {
                        scanClass = false;
                    }
                    lineNo++;
                }

            }

            return new Tuple<int, string, List<string>>(lineNo, methodSignature, methodLines);
        }

        /// <summary>
        /// Checks if method is valid and adds the method into the appropriate object within the Melon file.
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <param name="lines">The lines.</param>
        /// <param name="i">The line number.</param>
        /// <param name="methodName">Name of the method.</param>
        /// <returns>System.Int32.</returns>
        protected int CheckAndAddMethod(MelonJSObject obj, string[] lines, int i, string methodName)
        {
            Tuple<int, string, List<string>> method = ParseMethod(lines, i, methodName);
            i = method.Item1;
            if (method.Item2 != null)
            {
                obj.AddMethodFromString(method.Item2, method.Item3);
            }
            return i;
        }

        /// <summary>
        /// Increments or decrements the value of the the method counter. Used in deciding if a code block has ended or not.
        /// </summary>
        /// <param name="str">The string.</param>
        /// <returns>System.Int32.</returns>
        protected int CheckBracketInString(string str)
        {
            int offset = 0;
            if (str.Contains("{"))
            {
                offset++;
            }

            if (str.Contains("}"))
            {
                offset--;
            }
            return offset;
        }

        /// <summary>
        /// Checks if an object matches the MelonJS signature.
        /// </summary>
        /// <param name="line">The line.</param>
        /// <returns><c>true</c> if it matches, <c>false</c> otherwise</returns>
        protected bool MatchesMelonMethodSignature(string line)
        {
            Match match = Regex.Match(line, @"game\.([A-Za-z0-9\-_]+) = ([A-Za-z0-9\-_]+)\.([A-Za-z0-9\-_]+)\.extend\({");
            return (match.Success);
        }

        /// <summary>
        /// Reads the file.
        /// </summary>
        /// <param name="directory">The directory.</param>
        public new void ReadFile(string directory)
        {

        }
    }
}
