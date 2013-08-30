using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class CodeBlock : Code
    {
        ILine line;
        List<CodeBlock> codeBlocks = new List<CodeBlock>();
        public CodeBlock(ILine line)
        {
            this.line = line;
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

                match = Regex.Match(lines[i], @"([A-Za-z0-9\-_.]+)\(([A-Za-z0-9\-_.]*)\)");
                if (match.Groups[0].Value != "")
                {
                    cb = new CodeBlock(new MethodLine(match.Groups[1].Value, Regex.Split(match.Groups[2].Value, "\\s*;\\s*")));
                }

                match = Regex.Match(lines[i], @"([A-Za-z0-9\-_.]+)\(([^;{]+)\s*{");
                if (match.Groups[0].Value != "")
                {
                    cb = new CodeBlock(new MethodLine(match.Groups[1].Value, Regex.Split(match.Groups[2].Value, "\\s*,\\s*")));
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
            output += line.ToString();
            if (codeBlocks.Count > 0)
            {
                output += " {";
            }
            foreach (CodeBlock cb in codeBlocks)
            {
                output += "\n\t\t\t\t" + cb.ToString() + ";";
            }
            if (codeBlocks.Count > 0)
            {
                output += "\n\t\t\t});";
            }
            return output;
        }

        #region Properties
        public ILine Line
        {
            get
            {
                return line;
            }
        }

        public List<CodeBlock> CodeBlocks
        {
            get
            {
                return codeBlocks;
            }
        }
        #endregion
    }
}
