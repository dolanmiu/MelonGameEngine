using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class Method
    {
        private string name;
        private string[] arguments;
        private List<ILine> lines = new List<ILine>();

        public Method(string methodSignature)
        {
            string methodBody = methodSignature.Split(':')[0];
            methodBody = methodBody.Trim();

            string argumentsRaw = Regex.Match(methodSignature, @"\(([^)]*)\)").Groups[1].Value;
            string[] methodArgs = argumentsRaw.Split(',');

            for (int j = 0; j < methodArgs.Length; j++)
            {
                methodArgs[j].Trim();
            }

            name = methodBody;
            arguments = methodArgs;
        }

        public void AddLine(ILine line)
        {
            lines.Add(line);
        }

        public string ArgumentToString()
        {
            string argumentString = "";
            for (int i = 0; i < arguments.Length - 1; i++)
            {
                argumentString += arguments[i] + ", ";
            }
            argumentString += arguments[arguments.Length - 1];
            return argumentString;
        }

        public override string ToString()
        {
            string output = "\n\t" + name + ": function (" + ArgumentToString() + ") {";
            foreach (ILine line in lines)
            {
                output += "\n\t\t\t" + line.ToString();
            }
            output += "\n\t},\n";
            return output;
        }

        #region Properties
        public string Name
        {
            get
            {
                return name;
            }
        }

        public string[] Arguments
        {
            get
            {
                return arguments;
            }
        }

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
        public List<ILine> Lines
        {
            get
            {
                return lines;
            }
        }
        #endregion
    }
}
