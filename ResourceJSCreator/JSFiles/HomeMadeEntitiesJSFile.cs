using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceJSCreator
{
    public class HomeMadeEntitiesJSFile : MelonJSFile
    {
        private List<Entity> entities = new List<Entity>();

        public HomeMadeEntitiesJSFile(string rootDirectory) : base(rootDirectory, rootDirectory)
        {
            ReadFile(rootDirectory);
        }

        private new void ReadFile(string directory)
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

                    Entity entity = new Entity(gameObjectName, baseClass[0] + "." + baseClass[2]);
                    entities.Add(entity);
                    while (scanClass)
                    {
                        i = CheckForMethods(entity, lines, i);

                        bracketCounter += CheckBracketInString(lines[i]);

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

        private int CheckForMethods(MelonJSObject entity, string[] lines, int i)
        {
            i = CheckAndAddMethod(entity, lines, i, "init");
            i = CheckAndAddMethod(entity, lines, i, "update");
            i = CheckAndAddMethod(entity, lines, i, "onCollision");
            i = CheckAndAddMethod(entity, lines, i, "draw");
            return i;
        }

        #region Properties
        public List<Entity> Entities
        {
            get
            {
                return entities;
            }
        }
        #endregion
    }
}
