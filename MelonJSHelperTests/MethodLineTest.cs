using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MelonJSHelper;
using NUnit.Framework;

namespace MelonJSHelperTests
{
    class MethodLineTest
    {
        [Test]
        public void CHeckIsRecognisedLine()
        {
            //MethodLine ml = new MethodLine("doStuff", "thing1", "thing2");
            string[] methodStrings =
            {
                "me.levelDirector.loadLevel()", "me.game.disableHUD()", "me.state.set()", "this.parent()",
                "this.updateColRect()", "this.anchorPoint.set()", "this.bindKey()"
            };

            for (int i = 0; i < methodStrings.Length; i++)
            {
                bool valid = MethodLine.IsRecognisedMethodLine(methodStrings[i]);
                if (!valid)
                {
                    Assert.Fail("This method does not work: " + methodStrings[i]);
                }
            }
            Assert.Pass("Success! All methods work.");
        }
    }
}
