// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-25-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="MelonJSObject.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Collections.Generic;

namespace MelonJSHelper
{
    /// <summary>
    /// Class MelonJSObject
    /// </summary>
    public class MelonJSObject
    {
        /// <summary>
        /// The name
        /// </summary>
        protected string name;
        /// <summary>
        /// The base class
        /// </summary>
        protected string baseClass;
        /// <summary>
        /// The methods
        /// </summary>
        protected List<Method> methods = new List<Method>();

        /// <summary>
        /// Initializes a new instance of the <see cref="MelonJSObject"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="baseClass">The base class.</param>
        public MelonJSObject(string name, string baseClass)
        {
            this.name = name;
            this.baseClass = baseClass;
        }

        /// <summary>
        /// Adds the method from string.
        /// </summary>
        /// <param name="methodSignature">The method signature.</param>
        /// <param name="methodLines">The method lines.</param>
        public void AddMethodFromString(string methodSignature, List<string> methodLines)
        {
            Method method = new Method(methodSignature);
            for (int i = 0; i < methodLines.Count; i++)
            {
                i = AddLineToMethodFromString(method, methodLines[i], i);
            }
            methods.Add(method);
        }

        /// <summary>
        /// Adds the line to method from string.
        /// </summary>
        /// <param name="method">The method.</param>
        /// <param name="lineString">The line string.</param>
        /// <param name="i">The line number.</param>
        /// <returns>System.Int32.</returns>
        private int AddLineToMethodFromString(Method method, string lineString, int i) 
        {
            if (MethodLine.IsRecognisedMethodLine(lineString))
            {
                string methodBody = lineString.Split('(')[0];
                string[] methodArgs = lineString.Split('(')[1].Split(',');
                MethodLine methodLine = new MethodLine(methodBody, methodArgs.Length);

                for (int j = 0; j < methodArgs.Length; j++)
                {
                    methodArgs[j] = methodArgs[j].Replace(")", string.Empty);
                    methodArgs[j] = methodArgs[j].Replace(";", string.Empty);
                    methodArgs[j].Trim();

                    methodLine.Arguments[j] = methodArgs[j];
                }
                method.AddLine(methodLine);
            }
            else if (StatementLine.IsRecognisedStatementLine(lineString))
            {
                string[] parts = lineString.Split('=');
                string variable = parts[0].Trim();
                string value = parts[1].Trim();
                StatementLine line = new StatementLine(variable, value);
                method.AddLine(line);
            }
            else if (IfStatement.IsRecognisedIfStatement(lineString))
            {
                /*IfStatement ifState = new IfStatement(Regex.Match(lineString, @"\(([^)]*)\)").Groups[1].Value);

                int bracketCounter = 0;
                bool started = false;
                bool scanClass = true;

                ifState.AddLine();
                while (scanClass)
                {
                    if (lineString.Contains("{"))
                    {
                        bracketCounter++;
                        started = true;
                    }

                    if (lineString.Contains("}"))
                    {
                        bracketCounter--;
                    }
                    if (bracketCounter == 0 && started == true)
                    {
                        scanClass = false;
                    }
                    i++;
                }*/
            }
            else
            {
                UnrecognisedLine line = new UnrecognisedLine(lineString);
                method.AddLine(line);
            }
            return i;
        }

        /// <summary>
        /// Gets the method.
        /// </summary>
        /// <param name="methodName">Name of the method.</param>
        /// <returns>Method.</returns>
        protected Method GetMethod(string methodName)
        {
            foreach (Method method in methods)
            {
                if (method.Name == methodName)
                {
                    return method;
                }
            }
            return null;
        }

        /// <summary>
        /// Sets the method line argument.
        /// </summary>
        /// <param name="methodLineName">Name of the method line.</param>
        /// <param name="methodName">Name of the method.</param>
        /// <param name="value">The value.</param>
        protected void SetMethodLineArgument(string methodLineName, string methodName, string value)
        {
            MethodLine methodLine = (MethodLine)GetLine(methodLineName);
            if (methodLine == null)
            {
                Method resetMethod = new Method(methodName);
                MethodLine ml = new MethodLine(methodLineName, value);
                resetMethod.AddLine(ml);
                methods.Add(resetMethod);
            }
            else
            {
                methodLine.Arguments[0] = value;
            }
        }

        /// <summary>
        /// Gets the method line.
        /// </summary>
        /// <param name="methodBody">The method body.</param>
        /// <returns>MethodLine.</returns>
        protected MethodLine GetMethodLine(string methodBody)
        {
            foreach (Method method in methods)
            {
                foreach (MethodLine methodLine in method.Lines)
                {
                    if (methodLine.Body == methodBody)
                    {
                        return methodLine;
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// Gets the line.
        /// </summary>
        /// <param name="methodBody">The method body.</param>
        /// <returns>ILine.</returns>
        protected ILine GetLine(string methodBody)
        {
            foreach (Method method in methods)
            {
                foreach (ILine methodLine in method.Lines)
                {
                    if (methodLine.Body == methodBody)
                    {
                        return methodLine;
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// Gets the statements line.
        /// </summary>
        /// <param name="variable">The variable.</param>
        /// <returns>StatementLine.</returns>
        protected StatementLine GetStatementsLine(string variable)
        {
            foreach (Method method in methods)
            {
                foreach (StatementLine statementLine in method.Lines)
                {
                    if (statementLine.Variable == variable)
                    {
                        return statementLine;
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// Gets the statement value.
        /// </summary>
        /// <param name="statementVar">The statement var.</param>
        /// <returns>System.String.</returns>
        protected string GetStatementValue(string statementVar)
        {
            StatementLine sl = (StatementLine)GetLine(statementVar);
            if (sl == null) return null;
            return sl.Value;
        }

        /// <summary>
        /// Gets the method line arguments.
        /// </summary>
        /// <param name="methodName">Name of the method.</param>
        /// <returns>System.String[][].</returns>
        protected string[] GetMethodLineArguments(string methodName)
        {
            MethodLine methodLine = (MethodLine)GetLine(methodName);
            if (methodLine == null) return null;
            string[] output = new string[methodLine.Arguments.Length];
            for (int i = 0; i < methodLine.Arguments.Length; i++)
            {
                output[i] = methodLine.Arguments[i].Replace("\"", "");
            }
            return output;
        }



        #region Properties
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        public string Name
        {
            get
            {
                return name;
            }

            set
            {
                name = value;
            }
        }

        /// <summary>
        /// Gets the base class.
        /// </summary>
        /// <value>The base class.</value>
        public string BaseClass
        {
            get
            {
                return baseClass;
            }
        }

        /// <summary>
        /// Gets the methods.
        /// </summary>
        /// <value>The methods.</value>
        public List<Method> Methods
        {
            get
            {
                return methods;
            }
        }
        #endregion
    }
}
