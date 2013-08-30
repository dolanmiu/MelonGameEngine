using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class Entity : MelonJSObject
    {
        private string[] followAxis = new string[] {"me.game.viewport.AXIS.HORIZONTAL", "me.game.viewport.AXIS.VERTICAL", "me.game.viewport.AXIS.BOTH"};

        public Entity(string name, string baseClass) : base(name, baseClass)
        {
        }

        private void _GetStatementValue(string variable)
        {
            //string val = GetStatementValue(variable);
            //if (val == null) return false;
            //return bool.Parse(val);
        }

        private void SetStatement(string variable, string value, Method method)
        {
            StatementLine sl = (StatementLine)GetLine(variable);
            if (sl == null)
            {
                StatementLine newSl = new StatementLine(variable, value);
            }
            else
            {
                sl.Value = value;
            }
            method.AddLine(sl);
        }

        #region Properties
        public bool Visible
        {
            get
            {
                string val = GetStatementValue("this.visible");
                if (val == null) return true;
                return bool.Parse(val);
            }

            set
            {
                SetStatement("this.visible", value.ToString(), GetMethod("init"));
            }
        }
        public bool AlwaysUpdate
        {
            get
            {
                string val = GetStatementValue("this.alwaysUpdate");
                if (val == null) return false;
                return bool.Parse(val);
            }

            set
            {
                SetStatement("this.alwaysUpdate", value.ToString(), GetMethod("init"));
            }
        }
        public float Gravity
        {
            get
            {
                string val = GetStatementValue("this.gravity");
                if (val == null) return 0.98f;
                return float.Parse(val);
            }

            set
            {
                SetStatement("this.gravity", value.ToString(), GetMethod("init"));
            }
        }

        public string FollowDirection
        {
            get
            {
                string[] args = GetMethodLineArguments("me.game.viewport.follow");
                if (args == null) return null;
                string direction = args[1];
                foreach (string axis in followAxis)
                {
                    if (direction == axis)
                    {
                        return axis;
                    }
                }
                return "";
            }
        }
        #endregion
    }
}
