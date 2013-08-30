// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-23-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="State.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MelonJSHelper
{
    /// <summary>
    /// Class State
    /// </summary>
    public class State
    {

        /// <summary>
        /// The name
        /// </summary>
        private string name;

        /// <summary>
        /// Initializes a new instance of the <see cref="State"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        public State(string name)
        {
            this.name = name;
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            string state;
            state = name.ToUpper();
            state = state.Replace(" ", "_");
            string output = "me.state." + state;
            return output;
        }

        /// <summary>
        /// Formats a string to that the first character is upper case and everything else is lower case.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <returns>System.String.</returns>
        private string ToUpperFirstLetter(string source)
        {
            if (string.IsNullOrEmpty(source))
                return string.Empty;
            source = source.ToLower();
            char[] letters = source.ToCharArray();
            letters[0] = char.ToUpper(letters[0]);
            return new string(letters);
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
                return ToUpperFirstLetter(name);
            }
        }
        #endregion
    }
}
