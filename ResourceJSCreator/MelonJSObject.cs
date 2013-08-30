using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class MelonJSObject
    {
        protected string name;
        protected string baseClass;
        protected List<Method> methods = new List<Method>();

        public MelonJSObject(string name, string baseClass)
        {
            this.name = name;
            this.baseClass = baseClass;
        }

        public void AddMethodFromString(string methodSignature, List<string> methodLines)
        {
            Method method = new Method(methodSignature);
            for (int i = 0; i < methodLines.Count; i++)
            {
                i = AddLineToMethodFromString(method, methodLines[i], i);
            }
            methods.Add(method);
        }

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

        protected MethodLine GetMethodLisne(string methodBody)
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

        protected string GetStatementValue(string statementVar)
        {
            StatementLine sl = (StatementLine)GetLine(statementVar);
            if (sl == null) return null;
            return sl.Value;
        }

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

        public string BaseClass
        {
            get
            {
                return baseClass;
            }
        }

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
