// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="MethodLine.cs" company="">
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
    /// Class MethodLine
    /// </summary>
    public class MethodLine : ILine
    {
        /// <summary>
        /// The body of the line
        /// </summary>
        private string body;
        /// <summary>
        /// The arguments of the line
        /// </summary>
        private string[] arguments;

        /// <summary>
        /// The valid method lines which it can be
        /// </summary>
        private static List<MethodLine> validMethodLines = new List<MethodLine>();

        /// <summary>
        /// Initializes static members of the <see cref="MethodLine"/> class. It creates valid methods it can take.
        /// </summary>
        static MethodLine()
        {
            validMethodLines.Add(new MethodLine("me.levelDirector.loadLevel", "levelName"));
            validMethodLines.Add(new MethodLine("me.game.disableHUD"));
            validMethodLines.Add(new MethodLine("me.state.set", "stateName", "levelObject"));

            validMethodLines.Add(new MethodLine("this.parent", "arg1"));

            validMethodLines.Add(new MethodLine("this.updateColRect"));
            validMethodLines.Add(new MethodLine("this.anchorPoint.set"));
            validMethodLines.Add(new MethodLine("this.bindKey"));
            validMethodLines.Add(new MethodLine("me.game.viewport.follow"));
            validMethodLines.Add(new MethodLine("this.setVelocity"));
            validMethodLines.Add(new MethodLine("this.bindKey"));
            validMethodLines.Add(new MethodLine("this.bindKey"));

        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MethodLine"/> class.
        /// </summary>
        /// <param name="body">The body of the method.</param>
        /// <param name="arguments">The arguments.</param>
        public MethodLine(string body, params string[] arguments)
        {
            this.body = body;
            this.arguments = arguments;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MethodLine"/> class.
        /// </summary>
        /// <param name="body">The body of the method.</param>
        /// <param name="numberOfArgs">The number of args.</param>
        public MethodLine(string body, int numberOfArgs)
        {
            this.body = body;
            this.arguments = new string[numberOfArgs];
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString() {
            string methodName = body + "(";
            for (int i = 0; i < arguments.Length - 1; i++)
            {
                methodName += arguments[i] + ", ";
            }
            methodName += arguments[arguments.Length - 1] + ");";
            return methodName;
        }

        /// <summary>
        /// Determines whether [is recognised method line] [the specified method].
        /// </summary>
        /// <param name="method">The method.</param>
        /// <returns><c>true</c> if [is recognised method line] [the specified method]; otherwise, <c>false</c>.</returns>
        public static bool IsRecognisedMethodLine(string method)
        {
            string methodBody = method.Split('(')[0];
            for (int i = 0; i < validMethodLines.Count; i++)
            {
                if (validMethodLines[i].Body == methodBody)
                {
                    return true;
                }
            }
            return false;
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
                return body;
            }
        }

        /// <summary>
        /// Gets or sets the arguments.
        /// </summary>
        /// <value>The arguments.</value>
        public string[] Arguments
        {
            get
            {
                return arguments;
            }

            set
            {
                arguments = value;
            }
        }
        #endregion
    }
}
