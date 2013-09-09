using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MelonJSHelper;
using NUnit.Framework;

namespace MelonJSHelperTests
{
    public class NewMethodTest
    {

        [Test]
        public void CheckInvalidSyntaxReturnsNull()
        {
            NewMethod method = new NewMethod("init: function () {");

            List<string> lines = new List<string>
            {
                "this.patchme.DefaultLoadingScreen, \"onResetEvent\", function () ",
                ""
            };

            method.AddCodeBlock(lines);

            var output = method.CodeBlocks;

            foreach (var current in output)
            {
                Assert.Null(current);
            }
        }

        [Test]
        public void CheckMethodGeneration()
        {
            Method m = new Method("testFunction: function(blah1, blah2, blah3)");
            string name = m.Name;
            string[] arguments = m.Arguments;

            if (name == "testFunction" && arguments[0] == "blah1" && arguments[1] == "blah2" && arguments[2] == "blah3")
            {
                Assert.Pass("Works!");
            }
            else
            {
                Assert.Fail("Failed.");
            }
        }
    }
}
