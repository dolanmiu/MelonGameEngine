using MelonJSHelper;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelperTests
{
    class StatementLineTest
    {
        [Test]
        public void CheckIfRecognisedLine()
        {
            string[] lineStrings =
            {
                "this.gravity = 0", "this.vel.x = 10", "this.vel.y = 0", "this.visible = true",
                "this.collidable = false", "this.type = \"mainPlayer\""
            };
            for (int i = 0; i < lineStrings.Length; i++)
            {
                bool valid = StatementLine.IsRecognisedStatementLine(lineStrings[i]);
                if (!valid)
                {
                    Assert.Fail("Line failed: " + lineStrings[i]);
                }
            }
            Assert.Pass("Success!");
        }
    }
}
