using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ResourceJSCreator
{
    public class IfStatement : ILine
    {

        private string condition;
        private List<ILine> lines = new List<ILine>();
        private static List<IfStatement> validIfStatements = new List<IfStatement>();

        public IfStatement(string condition)
        {
            this.condition = condition;
        }

        static IfStatement()
        {
            validIfStatements.Add(new IfStatement("res"));
        }

        public static bool IsRecognisedIfStatement(string line)
        {
            line.Trim();
            if (line.StartsWith("if"))
            {
                string cond = Regex.Match(line, @"\(([^)]*)\)").Groups[1].Value;
                foreach (IfStatement ifStatement in validIfStatements)
                {
                    if (ifStatement.Condition == cond)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        public void AddLine(ILine line)
        {
            lines.Add(line);
        }

        public override string ToString()
        {
            string output = "\t\tif (" + condition + ") {";
            foreach (ILine line in lines)
            {
                output += "\n\t\t\t" + line.ToString();
            }
            output += "\t\t}";
            return output;
        }

        #region Properties
        public string Body
        {
            get
            {
                return condition;
            }
        }

        public string Condition
        {
            get
            {
                return condition;
            }
        }
        #endregion
    }
}
