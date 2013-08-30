using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceJSCreator
{
    public class AssetFile : BaseFile
    {
        private string fileType;

        public AssetFile(string rootDirectory, string absDirectory) : base(rootDirectory, absDirectory)
        {
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
                    return "Type Not Found";
            }
        }

        public string FileType
        {
            get
            {
                return fileType;
            }
        }
    }
}
