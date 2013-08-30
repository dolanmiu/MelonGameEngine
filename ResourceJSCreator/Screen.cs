// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-23-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="Screen.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MelonJSHelper
{
    /// <summary>
    /// Class Screen
    /// </summary>
    public class Screen : MelonJSObject
    {
        /// <summary>
        /// The state of the screen
        /// </summary>
        private State state;

        /// <summary>
        /// Initializes a new instance of the <see cref="MelonJSObject" /> class.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="baseClass">The base class.</param>
        public Screen(string name, string baseClass) : base(name, baseClass)
        {

        }

        /// <summary>
        /// Gets the set state string.
        /// </summary>
        /// <returns>System.String.</returns>
        public string GetSetStateString()
        {
            if (state == null) return "";
            string output = "me.state.set(" + state.ToString() + ", " + "new game." + name + "());";
            return output;
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            string output = "game." + Name + " = me.ScreenObject.extend({";
            foreach (Method method in methods)
            {
                output += method.ToString();
            }
            output += "});\n";
            return output;
        }

        #region Properties
        /// <summary>
        /// Gets or sets the state.
        /// </summary>
        /// <value>The state.</value>
        public State State
        {
            get
            {
                return state;
            }

            set
            {
                state = value;
            }
        }

        /// <summary>
        /// Gets or sets the level.
        /// </summary>
        /// <value>The level.</value>
        public string Level
        {
            get
            {
                if (GetMethodLineArguments("me.levelDirector.loadLevel") == null) return null;
                string output = GetMethodLineArguments("me.levelDirector.loadLevel")[0];
                return output;
            }

            set
            {
                SetMethodLineArgument("me.levelDirector.loadLevel", "onResetEvent", value);
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether [variable level].
        /// </summary>
        /// <value><c>true</c> if [variable level]; otherwise, <c>false</c>.</value>
        public bool VariableLevel
        {
            get
            {
                if (GetMethodLineArguments("me.levelDirector.loadLevel") == null) return false;
                string level = GetMethodLineArguments("me.levelDirector.loadLevel")[0];
                if (level == "this.level")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

            set
            {
                if (value == true)
                {
                    SetMethodLineArgument("me.levelDirector.loadLevel", "onResetEvent", "this.level");
                    Method method = GetMethod("onResetEvent");
                    method.Arguments[0] = "level";
                }
                else
                {
                    SetMethodLineArgument("me.levelDirector.loadLevel", "onResetEvent", "");
                    Method method = GetMethod("onResetEvent");
                    method.Arguments[0] = "";
                }
            }
        }
        #endregion
    }
}
