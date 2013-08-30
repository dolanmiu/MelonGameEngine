using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class Plugin : MelonJSObject
    {
        private string version;
        private List<NewMethod> methods = new List<NewMethod>();

        public Plugin(string name) : base(name, "me.plugin.base") 
        {
        }

        public void AddMethodFromString(List<string> methodLines)
        {
            NewMethod method = new NewMethod(methodLines[0]);
            methods.Add(method);

            method.AddCodeBlock(methodLines.GetRange(1, methodLines.Count - 1));
        }

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

        //public void 

        #region Properties
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
