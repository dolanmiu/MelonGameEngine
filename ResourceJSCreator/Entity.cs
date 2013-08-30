// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-24-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="Entity.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MelonJSHelper
{
    /// <summary>
    /// Class Entity
    /// </summary>
    public class Entity : MelonJSObject
    {
        /// <summary>
        /// The follow axis
        /// </summary>
        private string[] followAxis = new string[] {"me.game.viewport.AXIS.HORIZONTAL", "me.game.viewport.AXIS.VERTICAL", "me.game.viewport.AXIS.BOTH"};

        /// <summary>
        /// Initializes a new instance of the <see cref="Entity"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="baseClass">The base class.</param>
        public Entity(string name, string baseClass) : base(name, baseClass)
        {
        }

        /// <summary>
        /// _s the get statement value.
        /// </summary>
        /// <param name="variable">The variable.</param>
        private void _GetStatementValue(string variable)
        {
            //string val = GetStatementValue(variable);
            //if (val == null) return false;
            //return bool.Parse(val);
        }

        /// <summary>
        /// Sets the statement.
        /// </summary>
        /// <param name="variable">The variable.</param>
        /// <param name="value">The value.</param>
        /// <param name="method">The method.</param>
        private void SetStatement(string variable, string value, Method method)
        {
            StatementLine sl = (StatementLine)GetLine(variable);
            if (sl == null)
            {
                StatementLine newSl = new StatementLine(variable, value);
            }
            else
            {
                sl.Value = value;
            }
            method.AddLine(sl);
        }

        #region Properties
        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="Entity"/> is visible.
        /// </summary>
        /// <value><c>true</c> if visible; otherwise, <c>false</c>.</value>
        public bool Visible
        {
            get
            {
                string val = GetStatementValue("this.visible");
                if (val == null) return true;
                return bool.Parse(val);
            }

            set
            {
                SetStatement("this.visible", value.ToString(), GetMethod("init"));
            }
        }
        /// <summary>
        /// Gets or sets a value indicating whether [always update].
        /// </summary>
        /// <value><c>true</c> if [always update]; otherwise, <c>false</c>.</value>
        public bool AlwaysUpdate
        {
            get
            {
                string val = GetStatementValue("this.alwaysUpdate");
                if (val == null) return false;
                return bool.Parse(val);
            }

            set
            {
                SetStatement("this.alwaysUpdate", value.ToString(), GetMethod("init"));
            }
        }
        /// <summary>
        /// Gets or sets the gravity.
        /// </summary>
        /// <value>The gravity.</value>
        public float Gravity
        {
            get
            {
                string val = GetStatementValue("this.gravity");
                if (val == null) return 0.98f;
                return float.Parse(val);
            }

            set
            {
                SetStatement("this.gravity", value.ToString(), GetMethod("init"));
            }
        }

        /// <summary>
        /// Gets the follow direction.
        /// </summary>
        /// <value>The follow direction.</value>
        public string FollowDirection
        {
            get
            {
                string[] args = GetMethodLineArguments("me.game.viewport.follow");
                if (args == null) return null;
                string direction = args[1];
                foreach (string axis in followAxis)
                {
                    if (direction == axis)
                    {
                        return axis;
                    }
                }
                return "";
            }
        }
        #endregion
    }
}
