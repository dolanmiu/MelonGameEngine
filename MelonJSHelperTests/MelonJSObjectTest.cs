using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MelonJSHelper;
using NUnit.Framework;

namespace MelonJSHelperTests
{
    class MelonJSObjectTest
    {
        [Test]
        public void CheckIfAddMethodFromStringWorks()
        {
            MelonJSObject mjsh = new MelonJSObject("game.CoolItem", "me.ObjectEntity");
            string signature = "init: function() {";
            List<string> methodLines = new List<string>();
            methodLines.Add("this.parent()");
            methodLines.Add("},");
            mjsh.AddMethodFromString(signature, methodLines);
            Method m = mjsh.Methods[0];
            if (m.Name == "init" && m.Lines[0].ToString().Equals("this.parent();"))
            {
                Assert.Pass("Works!");
            }
            else
            {
                Assert.Fail("Doesn't work");   
            }
        }
    }
}
