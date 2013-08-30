// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="IfStatement.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    /// <summary>
    /// Class IfStatement
    /// </summary>
    public class IfStatement : ILine
    {

        /// <summary>
        /// The if statement condition
        /// </summary>
        private string condition;
        /// <summary>
        /// The lines
        /// </summary>
        private List<ILine> lines = new List<ILine>();
        /// <summary>
        /// The valid if statements
        /// </summary>
        private static List<IfStatement> validIfStatements = new List<IfStatement>();

        /// <summary>
        /// Initializes a new instance of the <see cref="IfStatement"/> class.
        /// </summary>
        /// <param name="condition">The condition.</param>
        public IfStatement(string condition)
        {
            this.condition = condition;
        }

        /// <summary>
        /// Initializes static members of the <see cref="IfStatement"/> class.
        /// </summary>
        static IfStatement()
        {
            validIfStatements.Add(new IfStatement("res"));
        }

        /// <summary>
        /// Determines whether [is recognised if statement] [the specified line].
        /// </summary>
        /// <param name="line">The line.</param>
        /// <returns><c>true</c> if [is recognised if statement] [the specified line]; otherwise, <c>false</c>.</returns>
        public static bool IsRecognisedIfStatement(string line)
        {
            line.Trim();
            if (line.StartsWith("if"))
            {
                string cond = Regex.Match(line, @"\(([^)]*)\)").Groups[1].Value;
                foreach (IfStatement ifStatement in validIfStatements)
                {
                    if (ifStatement.Condition == cond)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        /// <summary>
        /// Adds the line.
        /// </summary>
        /// <param name="line">The line.</param>
        public void AddLine(ILine line)
        {
            lines.Add(line);
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            string output = "\t\tif (" + condition + ") {";
            foreach (ILine line in lines)
            {
                output += "\n\t\t\t" + line.ToString();
            }
            output += "\t\t}";
            return output;
        }

        #region Properties
        /// <summary>
        /// Gets the body.
        /// </summary>
        /// <value>The body.</value>
        public string Body
        {
            get
            {
                return condition;
            }
        }

        /// <summary>
        /// Gets the condition.
        /// </summary>
        /// <value>The condition.</value>
        public string Condition
        {
            get
            {
                return condition;
            }
        }
        #endregion
    }
}
