using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class Screen : MelonJSObject
    {
        private State state;

        public Screen(string name, string baseClass) : base(name, baseClass)
        {

        }

        public string GetSetStateString()
        {
            if (state == null) return "";
            string output = "me.state.set(" + state.ToString() + ", " + "new game." + name + "());";
            return output;
        }

        public override string ToString()
        {
            string output = "game." + Name + " = me.ScreenObject.extend({";
            foreach (Method method in methods)
            {
                output += method.ToString();
            }
            output += "});\n";
            return output;
        }

        #region Properties
        public State State
        {
            get
            {
                return state;
            }

            set
            {
                state = value;
            }
        }

        public string Level
        {
            get
            {
                if (GetMethodLineArguments("me.levelDirector.loadLevel") == null) return null;
                string output = GetMethodLineArguments("me.levelDirector.loadLevel")[0];
                return output;
            }

            set
            {
                SetMethodLineArgument("me.levelDirector.loadLevel", "onResetEvent", value);
            }
        }

        public bool VariableLevel
        {
            get
            {
                if (GetMethodLineArguments("me.levelDirector.loadLevel") == null) return false;
                string level = GetMethodLineArguments("me.levelDirector.loadLevel")[0];
                if (level == "this.level")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

            set
            {
                if (value == true)
                {
                    SetMethodLineArgument("me.levelDirector.loadLevel", "onResetEvent", "this.level");
                    Method method = GetMethod("onResetEvent");
                    method.Arguments[0] = "level";
                }
                else
                {
                    SetMethodLineArgument("me.levelDirector.loadLevel", "onResetEvent", "");
                    Method method = GetMethod("onResetEvent");
                    method.Arguments[0] = "";
                }
            }
        }
        #endregion
    }
}
