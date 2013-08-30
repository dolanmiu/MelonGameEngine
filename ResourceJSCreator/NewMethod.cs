// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="NewMethod.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace MelonJSHelper
{
    /// <summary>
    /// Class NewMethod
    /// </summary>
    public class NewMethod : Code
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
        /// The code blocks
        /// </summary>
        private List<CodeBlock> codeBlocks = new List<CodeBlock>();

        /// <summary>
        /// Initializes a new instance of the <see cref="NewMethod"/> class.
        /// </summary>
        /// <param name="methodSignature">The method signature.</param>
        public NewMethod(string methodSignature)
        {
            Match match = Regex.Match(methodSignature, @"([A-Za-z0-9\-_]+)\s*:\s*function\s*\(([^)]*)\)\s*{?");
            string methodBody = match.Groups[1].Value;

            string argumentsRaw = match.Groups[2].Value;
            string[] methodArgs = argumentsRaw.Split(',');

            for (int j = 0; j < methodArgs.Length; j++)
            {
                methodArgs[j].Trim();
            }

            name = methodBody;
            arguments = methodArgs;
        }

        /// <summary>
        /// Adds the code block.
        /// </summary>
        /// <param name="lines">The lines.</param>
        public void AddCodeBlock(List<string> lines)
        {
            for (int i = 0; i < lines.Count; i++)
            {
                CodeBlock cb = null;
                Match match = Regex.Match(lines[i], @"([A-Za-z0-9\-_.]+)\s*=\s*([^;]+)");
                if (match.Groups[0].Value != "")
                {
                    cb = new CodeBlock(new StatementLine(match.Groups[1].Value, match.Groups[2].Value));
                }

                match = Regex.Match(lines[i], @"([A-Za-z0-9\-_.]+)\(([A-Za-z0-9\-_.]+)\)");
                if (match.Groups[0].Value != "")
                {
                    cb = new CodeBlock(new MethodLine(match.Groups[1].Value, Regex.Split(match.Groups[2].Value, "\\s*;\\s*")));
                }

                match = Regex.Match(lines[i], @"([A-Za-z0-9\-_.]+)\(([^;{]+)\s*{");
                if (match.Groups[0].Value != "")
                {
                    cb = new CodeBlock(new OpenFunction(match.Groups[1].Value, Regex.Split(match.Groups[2].Value, "\\s*,\\s*")));
                    int[] range = FetchMethodRange(lines, match.Groups[1].Value);
                    cb.AddCodeBlock(lines.GetRange(range[0] + 1, range[1] - 1));
                    i = range[0] + range[1];
                }
                codeBlocks.Add(cb);
            }
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            string output = "";
            output += "\n\t\t" + name + ": function (";
            for (int i = 0; i < arguments.Length - 1; i++)
            {
                output += arguments[i] + ", ";
            }
            output += arguments[arguments.Length - 1] + ") {";

            foreach (CodeBlock cb in codeBlocks)
            {
                output += "\n\t\t\t" + cb.ToString();
            }
            output += "\n\t\t}";
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
        /// Gets or sets the code blocks.
        /// </summary>
        /// <value>The code blocks.</value>
        public List<CodeBlock> CodeBlocks
        {
            get
            {
                return codeBlocks;
            }

            set
            {
                codeBlocks = value;
            }
        }
        #endregion
    }
}
