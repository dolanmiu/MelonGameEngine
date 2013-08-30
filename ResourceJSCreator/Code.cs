// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="Code.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace MelonJSHelper
{
    /// <summary>
    /// Class Code
    /// </summary>
    public abstract class Code
    {
        /// <summary>
        /// Fetches the class method range. The line number it starts from to the line number it ends at.
        /// </summary>
        /// <param name="lines">The lines.</param>
        /// <param name="methodName">Name of the method.</param>
        /// <returns>System.Int32[][].</returns>
        protected int[] FetchClassMethodRange(List<string> lines, string methodName)
        {
            int bracketCounter = 0;
            bool started = false;
            bool scanClass = true;
            int lineNo = 0;
            int methodStartNo = 0;
            for (lineNo = 0; lineNo < lines.Count; lineNo++)
            {
                Match match = Regex.Match(lines[lineNo], methodName + @"\s*:\s*function\s*\(([A-Za-z0-9\-_, ]*)\)\s*({*)");
                if (match.Success)
                {
                    methodStartNo = lineNo;
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

                        if (bracketCounter == 0 && started == true && lineNo > 1)
                        {
                            return new int[] { methodStartNo, lineNo - methodStartNo };
                        }
                        lineNo++;
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// Fetches the method range. The line number it starts from to the line number it ends at.
        /// </summary>
        /// <param name="lines">The lines.</param>
        /// <param name="methodName">Name of the method.</param>
        /// <returns>System.Int32[][].</returns>
        protected int[] FetchMethodRange(List<string> lines, string methodName)
        {
            int bracketCounter = 0;
            bool started = false;
            bool scanClass = true;
            int lineNo = 0;
            int methodStartNo = 0;
            for (lineNo = 0; lineNo < lines.Count; lineNo++)
            {
                Match match = Regex.Match(lines[lineNo], methodName + @"\(([^;{]+)\s*{");
                if (match.Success)
                {
                    methodStartNo = lineNo;
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

                        if (bracketCounter == 0 && started == true && lineNo > 1)
                        {
                            return new int[] { methodStartNo, lineNo - methodStartNo };
                        }
                        lineNo++;
                    }
                }
            }
            return null;
        }
    }
}
