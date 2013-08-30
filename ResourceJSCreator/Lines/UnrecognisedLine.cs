// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="UnrecognisedLine.cs" company="">
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
    /// Class UnrecognisedLine
    /// </summary>
    class UnrecognisedLine : ILine
    {
        /// <summary>
        /// The line
        /// </summary>
        private string line;

        /// <summary>
        /// Initializes a new instance of the <see cref="UnrecognisedLine"/> class.
        /// </summary>
        /// <param name="line">The line.</param>
        public UnrecognisedLine(string line)
        {
            this.line = line;
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            return line;
        }

        /// <summary>
        /// Gets the body if the line.
        /// </summary>
        /// <value>The body.</value>
        public string Body
        {
            get
            {
                return line;
            }
        }
    }
}
