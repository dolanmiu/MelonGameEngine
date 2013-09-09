using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using System.Xml;
using System.Xml.Linq;
using MelonJSHelper;
using System.IO;

namespace MelonJSHelperTests
{
    public class XMLParserTest
    {
        private FileDirectories fd;
        private XDocument doc;

        [SetUp]
        public void SetUp()
        {
            fd = new FileDirectories
            {
                ResourceJSDirectory = @"c:\TestJSDirectory",
                AssetDirectory = @"c:\TestAssetDirectory",
                EntityFilesDirectory = @"c:\TestEntityFilesDirectory",
                ScreenFileDirectory = @"c:\TestScreenFileDirectory",
                HomeMadeEntitiesDirectory = @"c:\TestHomeMadeEntitiesDirectory",
                PluginsFileDirectory = @"c:\TestPluginsFileDirectory"

            };

            doc = new XDocument(
                new XDeclaration("1.0", "utf-8", "yes"),
                new XElement("Settings",
                    new XElement("ResourceJSDirectory", fd.ResourceJSDirectory),
                    new XElement("AssetDirectory", fd.AssetDirectory),
                    new XElement("EntitiesDirectory", fd.EntityFilesDirectory),
                    new XElement("ScreensDirectory", fd.ScreenFileDirectory),
                    new XElement("HomeMadeEntitiesDirectory", fd.HomeMadeEntitiesDirectory),
                    new XElement("PluginsDirectory", fd.PluginsFileDirectory)));

        }

        [Test]
        public void Test_Saving_Settings()
        {
            XMLReaderWriter.SaveSettings(fd);
            XDocument readDoc = XDocument.Load("settings.xml");

            IEnumerable<XElement> settings = from row in readDoc.Descendants("Settings") select row;

            FileDirectories outputFileDirectories = new FileDirectories();
            outputFileDirectories.ResourceJSDirectory = GetNodeValue(settings, "ResourceJSDirectory");
            outputFileDirectories.AssetDirectory = GetNodeValue(settings, "AssetDirectory");
            outputFileDirectories.EntityFilesDirectory = GetNodeValue(settings, "EntitiesDirectory");
            outputFileDirectories.ScreenFileDirectory = GetNodeValue(settings, "ScreensDirectory");
            outputFileDirectories.HomeMadeEntitiesDirectory = GetNodeValue(settings, "HomeMadeEntitiesDirectory");
            outputFileDirectories.PluginsFileDirectory = GetNodeValue(settings,"PluginsDirectory");

            Assert.AreEqual(fd, outputFileDirectories);
        }

        [Test]
        public void Test_Loading_Settings()
        {
            doc.Save("setings.xml");
            var readFile = XMLReaderWriter.ReadSettings();
            Assert.AreEqual(fd, readFile);
        }

        public string GetNodeValue(IEnumerable<XElement> element, string nodeName)
        {
            return element.Elements().First(x => x.Name.LocalName == nodeName).Value;
        }

    }
}
