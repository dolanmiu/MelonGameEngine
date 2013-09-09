using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MelonJSHelper
{
    public class XMLReaderWriter
    {

        /// <summary>
        /// Saves the settings.
        /// </summary>
        /// <param name="resource">The resource.</param>
        /// <param name="assets">The assets.</param>
        /// <param name="entities">The entities.</param>
        /// <param name="screens">The screens.</param>
        /// <param name="homeEntities">The home entities.</param>
        /// <param name="plugins">The plugins.</param>
        /// <returns>XDocument.</returns>
        public static XDocument SaveSettings(FileDirectories fd)
        {
            XDocument doc = new XDocument(
                new XDeclaration("1.0", "utf-8", "yes"),
                new XElement("Settings",
                    new XElement("ResourceJSDirectory", fd.ResourceJSDirectory),
                    new XElement("AssetDirectory", fd.AssetDirectory),
                    new XElement("EntitiesDirectory", fd.EntityFilesDirectory),
                    new XElement("ScreensDirectory", fd.ScreenFileDirectory),
                    new XElement("HomeMadeEntitiesDirectory", fd.HomeMadeEntitiesDirectory),
                    new XElement("PluginsDirectory", fd.PluginsFileDirectory)));

            string dir = Directory.GetCurrentDirectory();
            doc.Save("settings.xml");
            return doc;
        }

        /// <summary>
        /// Reads the settings.
        /// </summary>
        /// <param name="resource">The resource.</param>
        /// <param name="assets">The assets.</param>
        /// <param name="entities">The entities.</param>
        public static FileDirectories ReadSettings()
        {
            FileDirectories fd = new FileDirectories();
            XDocument xDoc = new XDocument();
            try
            {
                xDoc = XDocument.Load("settings.xml");
            }
            catch (Exception)
            {
                File.Create("settings.xml");
            }
            IEnumerable<XElement> settings = from row in xDoc.Descendants("Settings") select row;

            foreach (XElement setting in settings)
            {
                IEnumerable<XElement> resourceJSDirectoryList = from att in setting.Descendants("ResourceJSDirectory") select att;
                foreach (XElement resourceJS in resourceJSDirectoryList)
                {
                    fd.ResourceJSDirectory = resourceJS.Value;
                }

                IEnumerable<XElement> assetDirectoryList = from att in setting.Descendants("AssetDirectory") select att;
                foreach (XElement asset in assetDirectoryList)
                {
                    fd.AssetDirectory = asset.Value;
                }

                IEnumerable<XElement> entitiesDirectoryList = from att in setting.Descendants("EntitiesDirectory") select att;
                foreach (XElement entitiesD in entitiesDirectoryList)
                {
                    fd.EntityFilesDirectory = entitiesD.Value;
                }

                IEnumerable<XElement> screenDirectoryList = from att in setting.Descendants("ScreensDirectory") select att;
                foreach (XElement screenD in screenDirectoryList)
                {
                    fd.ScreenFileDirectory = screenD.Value;
                }

                IEnumerable<XElement> homeMadeDirectoryList = from att in setting.Descendants("HomeMadeEntitiesDirectory") select att;
                foreach (XElement entitiesD in homeMadeDirectoryList)
                {
                    fd.HomeMadeEntitiesDirectory = entitiesD.Value;
                }

                IEnumerable<XElement> pluginsDirectoryList = from att in setting.Descendants("PluginsDirectory") select att;
                foreach (XElement pluginsD in pluginsDirectoryList)
                {
                    fd.PluginsFileDirectory = pluginsD.Value;
                }
            }
            return fd;
        }
    }
}
