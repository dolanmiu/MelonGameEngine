// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-23-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="Method.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace MelonJSHelper
{
    /// <summary>
    /// Class Method
    /// </summary>
    public class Method
    {
        /// <summary>
        /// The name
        /// </summary>
        private string name;
        /// <summary>
        /// The arguments
        /// </summary>
        private string[] arguments;
        /// <summary>
        /// The lines
        /// </summary>
        private List<ILine> lines = new List<ILine>();

        /// <summary>
        /// Initializes a new instance of the <see cref="Method"/> class.
        /// </summary>
        /// <param name="methodSignature">The method signature.</param>
        public Method(string methodSignature)
        {
            string methodBody = methodSignature.Split(':')[0];
            methodBody = methodBody.Trim();

            string argumentsRaw = Regex.Match(methodSignature, @"\(([^)]*)\)").Groups[1].Value;
            string[] methodArgs = argumentsRaw.Split(',');

            for (int j = 0; j < methodArgs.Length; j++)
            {
                methodArgs[j] = methodArgs[j].Trim();
            }

            name = methodBody;
            arguments = methodArgs;
        }

        /// <summary>
        /// Adds a line to the method.
        /// </summary>
        /// <param name="line">The line.</param>
        public void AddLine(ILine line)
        {
            lines.Add(line);
        }

        /// <summary>
        /// Converts the methods arguments to string.
        /// </summary>
        /// <returns>System.String.</returns>
        public string ArgumentToString()
        {
            string argumentString = "";
            for (int i = 0; i < arguments.Length - 1; i++)
            {
                argumentString += arguments[i] + ", ";
            }
            argumentString += arguments[arguments.Length - 1];
            return argumentString;
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            string output = "\n\t" + name + ": function (" + ArgumentToString() + ") {";
            foreach (ILine line in lines)
            {
                output += "\n\t\t\t" + line.ToString();
            }
            output += "\n\t},\n";
            return output;
        }

        #region Properties
        /// <summary>
        /// Gets the name.
        /// </summary>
        /// <value>The name.</value>
        public string Name
        {
            get
            {
                return name;
            }
        }

        /// <summary>
        /// Gets the arguments.
        /// </summary>
        /// <value>The arguments.</value>
        public string[] Arguments
        {
            get
            {
                return arguments;
            }
        }

        /// <summary>
        /// Gets the signature.
        /// </summary>
        /// <value>The signature.</value>
        public string Signature
        {
            get
            {
                string output;
                output = name + "(";
                for (int i = 0; i < arguments.Length - 1; i++)
                {
                    output += arguments[i] + ", ";
                }
                output += arguments[arguments.Length - 1] + ")";
                return output;
            }
        }
        /// <summary>
        /// Gets the lines.
        /// </summary>
        /// <value>The lines.</value>
        public List<ILine> Lines
        {
            get
            {
                return lines;
            }
        }
        #endregion
    }
}
