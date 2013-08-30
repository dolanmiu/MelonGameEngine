using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class NewMethod : Code
    {
        private string name;
        private string[] arguments;
        private List<CodeBlock> codeBlocks = new List<CodeBlock>();

        public NewMethod(string methodSignature)
        {
            Match match = Regex.Match(methodSignature, @"([A-Za-z0-9\-_]+)\s*:\s*function\s*\(([^)]*)\)\s*{?");
            string methodBody = match.Groups[1].Value;

            string argumentsRaw = match.Groups[2].Value;
            string[] methodArgs = argumentsRaw.Split(',');

            for (int j = 0; j < methodArgs.Length; j++)
            {
                methodArgs[j].Trim();
            }

            name = methodBody;
            arguments = methodArgs;
        }

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

                match = Regex.Match(lines[i], @"([A-Za-z0-9\-_.]+)\(([A-Za-z0-9\-_.]+)\)");
                if (match.Groups[0].Value != "")
                {
                    cb = new CodeBlock(new MethodLine(match.Groups[1].Value, Regex.Split(match.Groups[2].Value, "\\s*;\\s*")));
                }

                match = Regex.Match(lines[i], @"([A-Za-z0-9\-_.]+)\(([^;{]+)\s*{");
                if (match.Groups[0].Value != "")
                {
                    cb = new CodeBlock(new OpenFunction(match.Groups[1].Value, Regex.Split(match.Groups[2].Value, "\\s*,\\s*")));
                    int[] range = FetchMethodRange(lines, match.Groups[1].Value);
                    cb.AddCodeBlock(lines.GetRange(range[0] + 1, range[1] - 1));
                    i = range[0] + range[1];
                }
                codeBlocks.Add(cb);
            }
        }

        public override string ToString()
        {
            string output = "";
            output += "\n\t\t" + name + ": function (";
            for (int i = 0; i < arguments.Length - 1; i++)
            {
                output += arguments[i] + ", ";
            }
            output += arguments[arguments.Length - 1] + ") {";

            foreach (CodeBlock cb in codeBlocks)
            {
                output += "\n\t\t\t" + cb.ToString();
            }
            output += "\n\t\t}";
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

        public List<CodeBlock> CodeBlocks
        {
            get
            {
                return codeBlocks;
            }

            set
            {
                codeBlocks = value;
            }
        }
        #endregion
    }
}
