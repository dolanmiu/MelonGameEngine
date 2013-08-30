// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="OpenFunction.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MelonJSHelper
{
    /// <summary>
    /// Class OpenFunction
    /// </summary>
    class OpenFunction : ILine
    {
        /// <summary>
        /// The body of the function
        /// </summary>
        private string body;
        /// <summary>
        /// The arguments
        /// </summary>
        private string[] arguments;

        /// <summary>
        /// Initializes a new instance of the <see cref="OpenFunction"/> class.
        /// </summary>
        /// <param name="body">The body.</param>
        /// <param name="arguments">The arguments.</param>
        public OpenFunction(string body, params string[] arguments)
        {
            this.body = body;
            this.arguments = arguments;
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            string methodName = body + "(";
            for (int i = 0; i < arguments.Length - 1; i++)
            {
                methodName += arguments[i] + ", ";
            }
            methodName += arguments[arguments.Length - 1];
            return methodName;
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
        #endregion
    }
}
