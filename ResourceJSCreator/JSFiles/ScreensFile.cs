using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace ResourceJSCreator
{
    public class ScreensFile : MelonJSFile
    {
        private List<Screen> screens = new List<Screen>();

        public ScreensFile(string rootDirectory, string absDirectory) : base(rootDirectory, absDirectory)
        {
            ReadFile(absDirectory);
        }

        public new void ReadFile(string directory)
        {
            string[] lines = System.IO.File.ReadAllLines(directory);
            for (int i = 0; i < lines.Length; i++)
            {
                int bracketCounter = 0;
                bool started = false;
                bool scanClass = true;

                bool matched = MatchesMelonMethodSignature(lines[i]);
                if (matched)
                {
                    string gameObject = lines[i].Split('=')[0].Trim();
                    string gameObjectName = gameObject.Split('.')[1].Trim();
                    string[] baseClass = lines[i].Split('=')[1].Trim().Split('.');

                    Screen screen = new Screen(gameObjectName, baseClass[0] + "." + baseClass[2]);
                    screens.Add(screen);
                    while (scanClass)
                    {
                        i = CheckForMethods(screen, lines, i);

                        bracketCounter += CheckBracketInString(lines[i]);

                        if (bracketCounter == 0 && started == true)
                        {
                            scanClass = false;
                        }
                        started = true;
                        i++;
                    }
                }

                Match match = Regex.Match(lines[i], @"game\.loadStates\s*=\s*function\s*\(\s*\)\s*{");
                if (match.Success)
                {
                    while (scanClass)
                    {
                        bracketCounter += CheckBracketInString(lines[i]);

                        if (lines[i].Contains("me.state.set(")) 
                        {
                            string stateArgsFull = lines[i].Replace("me.state.set(", "").Replace(");", "");
                            stateArgsFull = stateArgsFull.Replace("(", "");
                            stateArgsFull = stateArgsFull.Replace(")", "");
                            stateArgsFull = stateArgsFull.Replace(" ", "");
                            stateArgsFull = stateArgsFull.Replace("new", "");
                            string[] stateArgs = stateArgsFull.Split(',');
                            string name = stateArgs[1].Split('.')[1];

                            for (int j = 0; j < screens.Count; j++)
                            {
                                if (screens[j].Name == name)
                                {
                                    screens[j].State = new State(stateArgs[0].Split('.')[2]);
                                }
                            }
                        }
                        if (bracketCounter == 0 && started == true)
                        {
                            scanClass = false;
                        }
                        started = true;
                        i++;
                    }
                }
            }
        }

        private int CheckForMethods(MelonJSObject screen, string[] lines, int i)
        {
            /*Tuple<int, string, List<string>> initMethod = ParseMethod(lines, i, "init");
            i = initMethod.Item1;
            if (initMethod.Item2 != null)
            {
                screen.AddMethodFromString(initMethod.Item2, initMethod.Item3);
            }
            
            Tuple<int, string, List<string>> onResetEventMethod = ParseMethod(lines, i, "onResetEvent");
            i = onResetEventMethod.Item1;
            if (onResetEventMethod.Item2 != null)
            {
                screen.AddMethodFromString(onResetEventMethod.Item2, onResetEventMethod.Item3);
            }*/
            i = CheckAndAddMethod(screen, lines, i, "init");
            i = CheckAndAddMethod(screen, lines, i, "onResetEvent");

            return i;
        }

        public string[] CreateScreensJSFile()
        {
            List<string> fileStrings = new List<string>();
            foreach (Screen screen in screens)
            {
                fileStrings.Add(screen.ToString());
            }

            fileStrings.Add("game.loadStates = function () {");
            for (int i = 0; i < Settings.Screens.Count; i++)
            {
                if (Settings.Screens[i].State != null)
                {
                    fileStrings.Add("\t" + Settings.Screens[i].GetSetStateString() + "\n");
                }
            }
            fileStrings.Add("}");
            return fileStrings.ToArray();
        }

        #region Properties
        public List<Screen> Screens
        {
            get
            {
                return screens;
            }
        }
        #endregion
    }
}
