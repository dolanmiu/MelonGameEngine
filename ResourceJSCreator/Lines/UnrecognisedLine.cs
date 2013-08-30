using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceJSCreator
{
    class UnrecognisedLine : ILine
    {
        private string line;

        public UnrecognisedLine(string line)
        {
            this.line = line;
        }

        public override string ToString()
        {
            return line;
        }

        public string Body
        {
            get
            {
                return line;
            }
        }
    }
}
