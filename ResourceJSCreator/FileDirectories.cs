using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class FileDirectories
    {
        public string ResourceJSDirectory { get; set; }
        public string AssetDirectory { get; set; }
        public string EntityFilesDirectory { get; set; }
        public string ScreenFileDirectory { get; set; }
        public string HomeMadeEntitiesDirectory { get; set; }
        public string PluginsFileDirectory { get; set; }

        public override bool Equals(object other)
        {
            if (other.GetType() != this.GetType()) return false;
            FileDirectories otherFileDirectories = other as FileDirectories;

            return (
                this.ResourceJSDirectory == otherFileDirectories.ResourceJSDirectory &&
                this.AssetDirectory == otherFileDirectories.AssetDirectory &&
                this.EntityFilesDirectory == otherFileDirectories.EntityFilesDirectory &&
                this.ScreenFileDirectory == otherFileDirectories.ScreenFileDirectory &&
                this.HomeMadeEntitiesDirectory == otherFileDirectories.HomeMadeEntitiesDirectory &&
                this.PluginsFileDirectory == otherFileDirectories.PluginsFileDirectory
                );
        }

    }

   

}
