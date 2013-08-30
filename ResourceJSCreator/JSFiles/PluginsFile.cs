using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ResourceJSCreator
{
    public class PluginsFile : MelonJSFile
    {

        private List<Plugin> plugins = new List<Plugin>();

        public PluginsFile(string rootDirectory)
            : base(rootDirectory, rootDirectory)
        {
            ReadFile(rootDirectory);
        }

        private new void ReadFile(string directory)
        {
            string[] strlines = System.IO.File.ReadAllLines(directory);
            List<string> lines = new List<string>(strlines);
            for (int i = 0; i < lines.Count; i++)
            {
                GroupCollection matched = MatchesMelonMethodSignature(lines[i]);
                if (matched[0].Value != "")
                {
                    Plugin plugin = new Plugin(matched[1].Value);
                    plugins.Add(plugin);
                    string version = CheckForVersion(lines[i]);
                    if (version != "") plugin.Version = version;

                    int[] lineNumbers = FetchMethodRange(lines, "init");
                    plugin.AddMethodFromString(lines.GetRange(lineNumbers[0], lineNumbers[1]));
                }
            }
        }

        private new GroupCollection MatchesMelonMethodSignature(string line)
        {
            Match match = Regex.Match(line, @"var\s+([A-Za-z0-9\-_]+) = me\.plugin\.base\.extend\({");
            return match.Groups;
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

        private new string CheckForVersion(string line)
        {
            string matchStr = "version:\\s*\"([0-9.]+)\"";
            Match match = Regex.Match(line, @matchStr);
            if (match.Success)
            {
                return match.Groups[0].Value;
            }
            else
            {
                return "";
            }
        }

        #region Properties
        public List<Plugin> Plugins
        {
            get
            {
                return plugins;
            }
        }
        #endregion
    }
}
