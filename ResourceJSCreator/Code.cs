using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public abstract class Code
    {
        protected int[] FetchClassMethodRange(List<string> lines, string methodName)
        {
            int bracketCounter = 0;
            bool started = false;
            bool scanClass = true;
            int lineNo = 0;
            int methodStartNo = 0;
            for (lineNo = 0; lineNo < lines.Count; lineNo++)
            {
                Match match = Regex.Match(lines[lineNo], methodName + @"\s*:\s*function\s*\(([A-Za-z0-9\-_, ]*)\)\s*({*)");
                if (match.Success)
                {
                    methodStartNo = lineNo;
                    while (scanClass)
                    {
                        if (lines[lineNo].Contains("{"))
                        {
                            bracketCounter++;
                            started = true;
                        }

                        if (lines[lineNo].Contains("}"))
                        {
                            bracketCounter--;
                        }

                        if (bracketCounter == 0 && started == true && lineNo > 1)
                        {
                            return new int[] { methodStartNo, lineNo - methodStartNo };
                        }
                        lineNo++;
                    }
                }
            }
            return null;
        }

        protected int[] FetchMethodRange(List<string> lines, string methodName)
        {
            int bracketCounter = 0;
            bool started = false;
            bool scanClass = true;
            int lineNo = 0;
            int methodStartNo = 0;
            for (lineNo = 0; lineNo < lines.Count; lineNo++)
            {
                Match match = Regex.Match(lines[lineNo], methodName + @"\(([^;{]+)\s*{");
                if (match.Success)
                {
                    methodStartNo = lineNo;
                    while (scanClass)
                    {
                        if (lines[lineNo].Contains("{"))
                        {
                            bracketCounter++;
                            started = true;
                        }

                        if (lines[lineNo].Contains("}"))
                        {
                            bracketCounter--;
                        }

                        if (bracketCounter == 0 && started == true && lineNo > 1)
                        {
                            return new int[] { methodStartNo, lineNo - methodStartNo };
                        }
                        lineNo++;
                    }
                }
            }
            return null;
        }
    }
}
