// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="Plugin.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Collections.Generic;

namespace MelonJSHelper
{
    /// <summary>
    /// Class Plugin
    /// </summary>
    public class Plugin : MelonJSObject
    {
        /// <summary>
        /// The version the plugin is for
        /// </summary>
        private string version;
        /// <summary>
        /// The methods of that plugin
        /// </summary>
        private List<NewMethod> methods = new List<NewMethod>();

        /// <summary>
        /// Initializes a new instance of the <see cref="Plugin"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        public Plugin(string name) : base(name, "me.plugin.base") 
        {
        }

        /// <summary>
        /// Adds a method from an List of strings.
        /// </summary>
        /// <param name="methodLines">The method lines.</param>
        public void AddMethodFromString(List<string> methodLines)
        {
            NewMethod method = new NewMethod(methodLines[0]);
            methods.Add(method);

            method.AddCodeBlock(methodLines.GetRange(1, methodLines.Count - 1));
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            string output = "";
            output += "\tvar " + name + " = " + baseClass + ".extend({";
            output += "\n\t\tversion: \"" + version + "\",";
            foreach (NewMethod method in methods)
            {
                output += method.ToString();
            }
            output += "\n\t});";
            return output;
        }

        #region Properties
        /// <summary>
        /// Gets or sets the version.
        /// </summary>
        /// <value>The version.</value>
        public string Version
        {
            get
            {
                return version;
            }

            set
            {
                version = value;
            }
        }

        /// <summary>
        /// Gets the method.
        /// </summary>
        /// <param name="methodName">Name of the method.</param>
        /// <returns>NewMethod.</returns>
        private NewMethod GetMethod(string methodName)
        {
            foreach (NewMethod method in methods)
            {
                if (method.Name == methodName)
                {
                    return method;
                }
            }
            NewMethod newMethod = new NewMethod(methodName + ": function()");
            methods.Add(newMethod);
            return newMethod;
        }

        /// <summary>
        /// Gets the open function from method.
        /// </summary>
        /// <param name="method">The method.</param>
        /// <param name="lineBody">The line body.</param>
        /// <returns>OpenFunction.</returns>
        private OpenFunction GetOpenFunctionFromMethod(NewMethod method, string lineBody) 
        {
            foreach (CodeBlock cb in method.CodeBlocks)
            {
                if (cb.Line.Body == lineBody)
                {
                    return (OpenFunction)cb.Line;
                }
            }
            OpenFunction of = new OpenFunction(lineBody, "", "", "function()");
            CodeBlock newCB = new CodeBlock(of);
            CodeBlock blankCodeBlock = new CodeBlock(new UnrecognisedLine("//Write your plugin here!"));
            newCB.CodeBlocks.Add(blankCodeBlock);
            method.CodeBlocks.Add(newCB);
            return of;
        }

        /// <summary>
        /// Gets the line.
        /// </summary>
        /// <param name="methodName">Name of the method.</param>
        /// <param name="lineBody">The line body.</param>
        /// <returns>ILine.</returns>
        private ILine GetLine(string methodName, string lineBody)
        {
            foreach (NewMethod method in methods)
            {
                if (method.Name == methodName)
                {
                    foreach (CodeBlock cb in method.CodeBlocks)
                    {
                        if (cb.Line.Body == lineBody)
                        {
                            return cb.Line;
                        }
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// Gets or sets the object patched.
        /// </summary>
        /// <value>The object patched.</value>
        public string ObjectPatched
        {
            get
            {
                if ((OpenFunction)GetLine("init", "this.patch") != null)
                {
                    return ((OpenFunction)GetLine("init", "this.patch")).Arguments[0];
                }
                return null;
            }

            set
            {
                if ((OpenFunction)GetLine("init", "this.patch") != null)
                {
                    ((OpenFunction)GetLine("init", "this.patch")).Arguments[0] = value;
                }
                else
                {
                    NewMethod nm = GetMethod("init");
                    GetOpenFunctionFromMethod(nm, "this.patch").Arguments[0] = value;
                }
            }
        }

        /// <summary>
        /// Gets or sets the method patched.
        /// </summary>
        /// <value>The method patched.</value>
        public string MethodPatched
        {
            get
            {
                if ((OpenFunction)GetLine("init", "this.patch") != null)
                {
                    return ((OpenFunction)GetLine("init", "this.patch")).Arguments[1];
                }
                return null;
            }

            set
            {
                if ((OpenFunction)GetLine("init", "this.patch") != null)
                {
                    ((OpenFunction)GetLine("init", "this.patch")).Arguments[1] = value;
                }
                else
                {
                    NewMethod nm = GetMethod("init");
                    GetOpenFunctionFromMethod(nm, "this.patch").Arguments[1] = value;
                }
            }
        }

        /// <summary>
        /// Gets the methods.
        /// </summary>
        /// <value>The methods.</value>
        public new List<NewMethod> Methods
        {
            get
            {
                return methods;
            }
        }
        #endregion
    }
}
