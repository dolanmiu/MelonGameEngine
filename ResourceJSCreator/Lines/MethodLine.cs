using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceJSCreator
{
    public class MethodLine : ILine
    {
        private string body;
        private string[] arguments;

        private static List<MethodLine> validMethodLines = new List<MethodLine>();

        static MethodLine()
        {
            validMethodLines.Add(new MethodLine("me.levelDirector.loadLevel", "levelName"));
            validMethodLines.Add(new MethodLine("me.game.disableHUD"));
            validMethodLines.Add(new MethodLine("me.state.set", "stateName", "levelObject"));

            validMethodLines.Add(new MethodLine("this.parent", "arg1"));

            validMethodLines.Add(new MethodLine("this.updateColRect"));
            validMethodLines.Add(new MethodLine("this.anchorPoint.set"));
            validMethodLines.Add(new MethodLine("this.bindKey"));
            validMethodLines.Add(new MethodLine("me.game.viewport.follow"));
            validMethodLines.Add(new MethodLine("this.setVelocity"));
            validMethodLines.Add(new MethodLine("this.bindKey"));
            validMethodLines.Add(new MethodLine("this.bindKey"));

        }

        public MethodLine(string body, params string[] arguments)
        {
            this.body = body;
            this.arguments = arguments;
        }

        public MethodLine(string body, int numberOfArgs)
        {
            this.body = body;
            this.arguments = new string[numberOfArgs];
        }

        public override string ToString() {
            string methodName = body + "(";
            for (int i = 0; i < arguments.Length - 1; i++)
            {
                methodName += arguments[i] + ", ";
            }
            methodName += arguments[arguments.Length - 1] + ");";
            return methodName;
        }

        public static bool IsRecognisedMethodLine(string method)
        {
            string methodBody = method.Split('(')[0];
            for (int i = 0; i < validMethodLines.Count; i++)
            {
                if (validMethodLines[i].Body == methodBody)
                {
                    return true;
                }
            }
            return false;
        }

        #region Properties
        public string Body
        {
            get
            {
                return body;
            }
        }

        public string[] Arguments
        {
            get
            {
                return arguments;
            }

            set
            {
                arguments = value;
            }
        }
        #endregion
    }
}
