using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MelonJSHelper
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
                    for (int j = 0; j < lines.Count; j++)
                    {
                        string version = CheckForVersion(lines[j]);
                        if (version != "") plugin.Version = version;
                    }

                    int[] lineNumbers = FetchClassMethodRange(lines, "init");
                    plugin.AddMethodFromString(lines.GetRange(lineNumbers[0], lineNumbers[1]));
                }
            }
        }

        private new GroupCollection MatchesMelonMethodSignature(string line)
        {
            Match match = Regex.Match(line, @"var\s+([A-Za-z0-9\-_]+) = me\.plugin\.base\.extend\({");
            return match.Groups;
        }

        private string CheckForVersion(string line)
        {
            Match match = Regex.Match(line, @"version:\s*" + "\"" + "([0-9.]+)" + "\"");
            if (match.Success)
            {
                return match.Groups[1].Value;
            }
            else
            {
                return "";
            }
        }

        public string[] CreateJSFile()
        {
            List<string> output = new List<string>();
            output.Add("(function () {");
            foreach (Plugin plugin in plugins)
            {
                output.Add(plugin.ToString());
            }

            foreach (Plugin plugin in plugins)
            {
                output.Add("\n\tme.plugin.register(" + plugin.Name + ", \"" + plugin.Name + "\");");
            }
            output.Add("})();");
            return output.ToArray();
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
