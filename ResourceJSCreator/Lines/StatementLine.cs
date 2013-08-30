using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class StatementLine : ILine
    {

        private static List<StatementLine> statements = new List<StatementLine>();
        private string variable;
        private string value;

        public StatementLine(string variable, string value)
        {
            this.variable = variable;
            this.value = value;
        }

        static StatementLine()
        {
            statements.Add(new StatementLine("this.gravity", "0"));
            statements.Add(new StatementLine("this.vel.x", "0"));
            statements.Add(new StatementLine("this.vel.y", "0"));
            statements.Add(new StatementLine("this.visible", "true"));
            statements.Add(new StatementLine("this.collidable", "true"));
            statements.Add(new StatementLine("this.type", "true"));
            //statements.Add(new StatementLine("this.visible", "true"));
            //statements.Add(new StatementLine("this.visible", "true"));

        }

        public static bool IsRecognisedStatementLine(string line) {
            string[] parts = line.Split('=');
            for (int i = 0; i < statements.Count; i++)
            {
                if (statements[i].Variable == parts[0].Trim())
                {
                    return true;
                }
            }
            return false;
        }

        public override string ToString()
        {
            string output = variable + " = " + value;
            return output;
        }

        #region Properties
        public string Body
        {
            get
            {
                return variable;
            }
        }
        public string Variable
        {
            get
            {
                return variable;
            }
        }

        public string Value
        {
            get
            {
                return value;
            }

            set
            {
                this.value = value;
            }
        }
        #endregion
    }
}
