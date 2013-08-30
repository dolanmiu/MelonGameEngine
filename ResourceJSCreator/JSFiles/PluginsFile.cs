// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="PluginsFile.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    /// <summary>
    /// Class PluginsFile
    /// </summary>
    public class PluginsFile : MelonJSFile
    {

        /// <summary>
        /// The plugins
        /// </summary>
        private List<Plugin> plugins = new List<Plugin>();

        /// <summary>
        /// Initializes a new instance of the <see cref="PluginsFile"/> class.
        /// </summary>
        /// <param name="rootDirectory">The root directory.</param>
        public PluginsFile(string rootDirectory)
            : base(rootDirectory, rootDirectory)
        {
            ReadFile(rootDirectory);
        }

        /// <summary>
        /// Reads the file and creates plugin objects for the plugin object list.
        /// </summary>
        /// <param name="directory">The directory.</param>
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

        /// <summary>
        /// Matcheses the melon method signature.
        /// </summary>
        /// <param name="line">The line.</param>
        /// <returns>GroupCollection.</returns>
        private new GroupCollection MatchesMelonMethodSignature(string line)
        {
            Match match = Regex.Match(line, @"var\s+([A-Za-z0-9\-_]+) = me\.plugin\.base\.extend\({");
            return match.Groups;
        }

        /// <summary>
        /// Checks for version of plugin and returns it.
        /// </summary>
        /// <param name="line">The line of the plugin.</param>
        /// <returns>System.String.</returns>
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

        /// <summary>
        /// Creates the PLugin JS file.
        /// </summary>
        /// <returns>System.String[][].</returns>
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
        /// <summary>
        /// Gets the plugins.
        /// </summary>
        /// <value>The plugins.</value>
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
