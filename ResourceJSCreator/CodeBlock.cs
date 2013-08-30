// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="CodeBlock.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace MelonJSHelper
{
    /// <summary>
    /// Class CodeBlock
    /// </summary>
    public class CodeBlock : Code
    {
        /// <summary>
        /// The line
        /// </summary>
        ILine line;
        /// <summary>
        /// The code blocks
        /// </summary>
        List<CodeBlock> codeBlocks = new List<CodeBlock>();
        /// <summary>
        /// Initializes a new instance of the <see cref="CodeBlock"/> class.
        /// </summary>
        /// <param name="line">The line.</param>
        public CodeBlock(ILine line)
        {
            this.line = line;
        }

        /// <summary>
        /// Adds the code block to the code block list.
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

                match = Regex.Match(lines[i], @"([A-Za-z0-9\-_.]+)\(([A-Za-z0-9\-_.]*)\)");
                if (match.Groups[0].Value != "")
                {
                    cb = new CodeBlock(new MethodLine(match.Groups[1].Value, Regex.Split(match.Groups[2].Value, "\\s*;\\s*")));
                }

                match = Regex.Match(lines[i], @"([A-Za-z0-9\-_.]+)\(([^;{]+)\s*{");
                if (match.Groups[0].Value != "")
                {
                    cb = new CodeBlock(new MethodLine(match.Groups[1].Value, Regex.Split(match.Groups[2].Value, "\\s*,\\s*")));
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
            output += line.ToString();
            if (codeBlocks.Count > 0)
            {
                output += " {";
            }
            foreach (CodeBlock cb in codeBlocks)
            {
                output += "\n\t\t\t\t" + cb.ToString() + ";";
            }
            if (codeBlocks.Count > 0)
            {
                output += "\n\t\t\t});";
            }
            return output;
        }

        #region Properties
        /// <summary>
        /// Gets the line.
        /// </summary>
        /// <value>The line.</value>
        public ILine Line
        {
            get
            {
                return line;
            }
        }

        /// <summary>
        /// Gets the code blocks.
        /// </summary>
        /// <value>The code blocks.</value>
        public List<CodeBlock> CodeBlocks
        {
            get
            {
                return codeBlocks;
            }
        }
        #endregion
    }
}
