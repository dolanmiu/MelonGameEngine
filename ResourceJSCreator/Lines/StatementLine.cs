// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="StatementLine.cs" company="">
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
    /// Class StatementLine
    /// </summary>
    public class StatementLine : ILine
    {

        /// <summary>
        /// The statements
        /// </summary>
        private static List<StatementLine> statements = new List<StatementLine>();
        /// <summary>
        /// The variable
        /// </summary>
        private string variable;
        /// <summary>
        /// The value
        /// </summary>
        private string value;

        /// <summary>
        /// Initializes a new instance of the <see cref="StatementLine"/> class.
        /// </summary>
        /// <param name="variable">The variable.</param>
        /// <param name="value">The value.</param>
        public StatementLine(string variable, string value)
        {
            this.variable = variable;
            this.value = value;
        }

        /// <summary>
        /// Initializes static members of the <see cref="StatementLine"/> class.
        /// </summary>
        static StatementLine()
        {
            statements.Add(new StatementLine("this.gravity", "0"));
            statements.Add(new StatementLine("this.vel.x", "0"));
            statements.Add(new StatementLine("this.vel.y", "0"));
            statements.Add(new StatementLine("this.visible", "true"));
            statements.Add(new StatementLine("this.collidable", "true"));
            statements.Add(new StatementLine("this.type", "true"));
            //statements.Add(new StatementLine("this.visible", "true"));
            //statements.Add(new StatementLine("this.visible", "true"));

        }

        /// <summary>
        /// Determines whether [is recognised statement line] [the specified line].
        /// </summary>
        /// <param name="line">The line.</param>
        /// <returns><c>true</c> if [is recognised statement line] [the specified line]; otherwise, <c>false</c>.</returns>
        public static bool IsRecognisedStatementLine(string line) {
            string[] parts = line.Split('=');
            for (int i = 0; i < statements.Count; i++)
            {
                if (statements[i].Variable == parts[0].Trim())
                {
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            string output = variable + " = " + value;
            return output;
        }

        #region Properties
        /// <summary>
        /// Gets the body if the line.
        /// </summary>
        /// <value>The body.</value>
        public string Body
        {
            get
            {
                return variable;
            }
        }
        /// <summary>
        /// Gets the variable.
        /// </summary>
        /// <value>The variable.</value>
        public string Variable
        {
            get
            {
                return variable;
            }
        }

        /// <summary>
        /// Gets or sets the value.
        /// </summary>
        /// <value>The value.</value>
        public string Value
        {
            get
            {
                return value;
            }

            set
            {
                this.value = value;
            }
        }
        #endregion
    }
}
