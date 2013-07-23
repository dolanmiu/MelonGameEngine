using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceJSCreator
{
    class AssetFile
    {
        private string relativeDirectory;
        private string fileName;
        private string extention;
        private string fileType;

        public AssetFile(string rootFolder, string absDirectory)
        {
            this.relativeDirectory = MakeRelativePath(rootFolder, absDirectory);
            this.fileName = Path.GetFileNameWithoutExtension(absDirectory);
            this.extention = Path.GetExtension(absDirectory);
            this.fileType = GetType(Path.GetExtension(absDirectory));
        }

        private string GetType(string extension)
        {
            switch (extension)
            {
                case ".mp3":
                case ".ogg":
                    return "audio";
                case ".png":
                case ".jpg":
                case ".bmp":
                    return "image";
                case ".tmx":
                    return "tmx";
                case ".json":
                    return "Type Not Found";
                default:
                    break;
            }
            return "Type Not Found";
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

        #region Properties
        public string RelativeDirectory
        {
            get
            {
                return relativeDirectory;
            }
        }

        public string FileName
        {
            get
            {
                return fileName;
            }
        }

        public string FileType
        {
            get
            {
                return fileType;
            }
        }

        public string FileFullPath
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
