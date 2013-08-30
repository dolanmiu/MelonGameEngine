using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class EntityJSFile : BaseFile
    {
        private List<string> gameObjects = new List<string>();
        private List<string> gameObjectNames = new List<string>();

        public EntityJSFile(string rootDirectory, string absDirectory) : base(rootDirectory, absDirectory)
        {
            ReadFile(absDirectory);
        }

        private new void ReadFile(string directory) 
        {
            string[] lines = System.IO.File.ReadAllLines(directory);
            
            foreach (string line in lines) 
            {
                Match match = Regex.Match(line, @"game\.([A-Za-z0-9\-_]+) = ([A-Za-z0-9\-_]+)\.([A-Za-z0-9\-_]+)\.extend\({");
                if (match.Success)
                {
                    string gameObject = line.Split('=')[0].Trim();
                    string gameObjectName = gameObject.Split('.')[1].Trim();
                    gameObjects.Add(gameObject);
                    gameObjectNames.Add(gameObjectName);
                }
            }
        }

        public List<string> GameObjects
        {
            get
            {
                return gameObjects;
            }
        }

        public List<string> GameObjectNames
        {
            get
            {
                return gameObjectNames;
            }
        }
    }
}
