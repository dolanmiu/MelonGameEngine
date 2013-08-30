using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ResourceJSCreator
{
    public abstract class BaseFile : Code
    {
        //protected string absDirectory;
        protected string relativeDirectory;
        protected string fileName;
        protected string extention;

        protected BaseFile(string rootFolder, string absDirectory)
        {
            //this.absDirectory = absDirectory;
            this.relativeDirectory = MakeRelativePath(rootFolder, absDirectory);
            this.fileName = Path.GetFileNameWithoutExtension(absDirectory);
            this.extention = Path.GetExtension(absDirectory);
        }

        private string MakeRelativePath(string fromPath, string toPath)
        {
            if (String.IsNullOrEmpty(fromPath)) throw new ArgumentNullException("fromPath");
            if (String.IsNullOrEmpty(toPath)) throw new ArgumentNullException("toPath");

            Uri fromUri = new Uri(fromPath);
            Uri toUri = new Uri(toPath);

            Uri relativeUri = fromUri.MakeRelativeUri(toUri);
            String relativePath = Uri.UnescapeDataString(relativeUri.ToString());

            return relativePath.Replace('/', Path.DirectorySeparatorChar);
        }

        protected Tuple<List<string>, List<string>> ReadFile(string directory)
        {
            List<string> gameObjects = new List<string>();
            List<string> gameObjectNames = new List<string>();
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
            return new Tuple<List<string>, List<string>>(gameObjects, gameObjectNames);
        }

        #region Properties
        public string FolderRelativePath
        {
            get
            {
                string dir = Path.GetDirectoryName(relativeDirectory) + "/";
                dir = dir.Replace(@"\", "/");
                return dir;
            }
        }

        public string FileName
        {
            get
            {
                return fileName;
            }
        }

        public string FileRelativePath
        {
            get
            {
                string dir = relativeDirectory;
                dir = dir.Replace(@"\", "/");
                return dir;
            }
        }
        #endregion
    }
}
