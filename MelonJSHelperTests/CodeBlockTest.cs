using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MelonJSHelper;
using NUnit.Framework;

namespace MelonJSHelperTests
{
    class CodeBlockTest
    {
        [Test]
        public void CodeBlockTestIfAddsCodeBlock()
        {
            StatementLine il = new StatementLine("test", "123");
            CodeBlock cb = new CodeBlock(il);
            //CodeBlock cb2 = new CodeBlock(new StatementLine("newStatement", "123"));
            List<string> lines = new List<string>();
            string lineToTest = "hello()";
            lines.Add(lineToTest);
            cb.AddCodeBlock(lines);
            //string line = "{" + lineToTest + ";}";
            string lineOut = cb.CodeBlocks[0].ToString();
            Assert.AreEqual(lineToTest + ";", lineOut);
        }
    }
}
