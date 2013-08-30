using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Xml;
using System.Xml.Linq;

namespace MelonJSHelper
{
    /// <summary>
    /// Interaction logic for Settings.xaml
    /// </summary>
    public partial class Settings : UserControl
    {
        private static string assetDirectory;
        private static string entityFilesDirectory;
        private static string screenFileDirectory;
        private static string homeMadeEntitiesDirectory;
        private static string pluginsFileDirectory;

        private static string resourceJSDirectory;
        private static ScreensFile screensFile;
        private static HomeMadeEntitiesJSFile homeMadeEntitiesFile;
        private static PluginsFile pluginsFile;

        private static List<AssetFile> assetFiles = new List<AssetFile>();
        private static List<EntityJSFile> entityFiles = new List<EntityJSFile>();

        public Settings()
        {
            InitializeComponent();
        }

        public void OnLoad(object sender, RoutedEventArgs e)
        {
        }


        private void UserControl_Initialized(object sender, EventArgs e)
        {
            ReadSettings(resourceJSDirectory, assetDirectory, entityFilesDirectory);
            if (resourceJSDirectory != null)
            {
                ResourceJSTextBox.Text = resourceJSDirectory;
            }

            if (assetDirectory != null)
            {
                AssetFolderTextBox.Text = assetDirectory;
                assetFiles = GetAssets(assetDirectory);
            }

            if (entityFilesDirectory != null)
            {
                EntitiesTextBox.Text = entityFilesDirectory;
                entityFiles = GetEntities(entityFilesDirectory);
            }

            if (screenFileDirectory != null)
            {
                ScreenJSTextBox.Text = screenFileDirectory;
                screensFile = new ScreensFile(screenFileDirectory, screenFileDirectory);
            }

            if (homeMadeEntitiesDirectory != null)
            {
                HomeMadeEntitiesFileTextBox.Text = homeMadeEntitiesDirectory;
                homeMadeEntitiesFile = new HomeMadeEntitiesJSFile(homeMadeEntitiesDirectory);
            }

            if (pluginsFileDirectory != null)
            {
                PluginsTextBox.Text = pluginsFileDirectory;
                pluginsFile = new PluginsFile(pluginsFileDirectory);
            }
        }

        private void AssetFolderTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            //assetFiles.Clear();
            string assets = ShowFolderDialog(sender);
            assetDirectory = assets;
            assetFiles = GetAssets(assets);
        }

        private void ResourceJSTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            string dir = OpenJSFileDialog();
            if (dir != null)
            {
                ResourceJSTextBox.Text = dir;
                resourceJSDirectory = dir;
            }
        }

        private void EntitiesTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            //entityFiles.Clear();
            string entityFilesD = ShowFolderDialog(sender);
            entityFilesDirectory = entityFilesD;
            entityFiles = GetEntities(entityFilesD);
        }

        private void LevelJSTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            string dir = OpenJSFileDialog();
            if (dir != null)
            {
                ScreenJSTextBox.Text = dir;
                screensFile = new ScreensFile(dir, dir);
                screenFileDirectory = dir;
            }
        }

        private void HomeMadeEntitiesFileTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            string dir = OpenJSFileDialog();
            if (dir != null)
            {
                HomeMadeEntitiesFileTextBox.Text = dir;
                homeMadeEntitiesFile = new HomeMadeEntitiesJSFile(dir);
                homeMadeEntitiesDirectory = dir;
            }
        }

        private void PluginsTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            string dir = OpenJSFileDialog();
            if (dir != null)
            {
                PluginsTextBox.Text = dir;
                pluginsFile = new PluginsFile(dir);
                pluginsFileDirectory = dir;
            }
        }

        /*private List<BaseFile> GetFilesFromDir(string dir)
        {
            string[] files = Directory.GetFiles(dir, "*.*", SearchOption.AllDirectories);
            List<BaseFile> list = new List<BaseFile>();
            for (int i = 0; i < files.Length; i++)
            {
                BaseFile file = new BaseFile(dir, files[i]);
                list.Add(file);
            }
            return list;
        }*/

        private List<AssetFile> GetAssets(string assetDirectory)
        {
            string[] files = Directory.GetFiles(assetDirectory, "*.*", SearchOption.AllDirectories);
            List<AssetFile> assetsTemp = new List<AssetFile>();
            for (int i = 0; i < files.Length; i++)
            {
                AssetFile file = new AssetFile(assetDirectory, files[i]);
                assetsTemp.Add(file);
            }
            return assetsTemp;
        }

        private List<EntityJSFile> GetEntities(string entityFilesDirectory)
        {
            string[] files = Directory.GetFiles(entityFilesDirectory, "*.*", SearchOption.AllDirectories);
            List<EntityJSFile> entitiesTemp = new List<EntityJSFile>();
            for (int i = 0; i < files.Length; i++)
            {
                EntityJSFile file = new EntityJSFile(entityFilesDirectory, files[i]);
                entitiesTemp.Add(file);
                //entityNames.AddRange(file.GameObjects);
            }
            return entitiesTemp;
        }

        private string OpenJSFileDialog()
        {
            OpenFileDialog dialog = new OpenFileDialog();
            //var dialog = new System.Windows.Forms.OpenFileDialog();
            dialog.InitialDirectory = Directory.GetCurrentDirectory();
            dialog.Filter = "JavaScript|*.js|All Files|*.*";
            dialog.FilterIndex = 1;
            bool? userClickedOK = dialog.ShowDialog();

            // Process input if the user clicked OK.
            if (userClickedOK == true)
            {
                return dialog.FileName;
            }
            else
            {
                return null;
            }
        }

        private static List<string> GetEntityNames(List<EntityJSFile> files)
        {
            List<string> fileNames = new List<string>();
            for (int i = 0; i < files.Count; i++)
            {
                fileNames.AddRange(files[i].GameObjects);
            }
            return fileNames;
        }

        private void GetResourceJS()
        {

        }

        private string ShowFolderDialog(object sender)
        {
            var dialog = new System.Windows.Forms.FolderBrowserDialog();
            dialog.SelectedPath = Directory.GetCurrentDirectory();
            System.Windows.Forms.DialogResult result = dialog.ShowDialog();
            TextBox tb = (TextBox)sender;
            tb.Text = dialog.SelectedPath;
            return dialog.SelectedPath;
        }

        private void SaveSettingsButton_Click(object sender, RoutedEventArgs e)
        {
            SaveSettings(resourceJSDirectory, assetDirectory, entityFilesDirectory, screenFileDirectory, homeMadeEntitiesDirectory, pluginsFileDirectory);
        }

        private XDocument SaveSettings(string resource, string assets, string entities, string screens, string homeEntities, string plugins)
        {
            XDocument doc = new XDocument(
                new XDeclaration("1.0", "utf-8", "yes"),
                new XElement("Settings",
                    new XElement("ResourceJSDirectory", resource),
                    new XElement("AssetDirectory", assets),
                    new XElement("EntitiesDirectory", entities),
                    new XElement("ScreensDirectory", screens),
                    new XElement("HomeMadeEntitiesDirectory", homeEntities),
                    new XElement("PluginsDirectory", plugins)));

            string dir = Directory.GetCurrentDirectory();
            doc.Save("settings.xml");
            return doc;
        }

        private void ReadSettings(string resource, string assets, string entities)
        {
            XDocument xDoc = new XDocument();
            try
            {
                xDoc = XDocument.Load("settings.xml");
            } catch(Exception) {
                return;
            }
            IEnumerable<XElement> settings = from row in xDoc.Descendants("Settings") select row;

            foreach (XElement setting in settings)
            {
                IEnumerable<XElement> resourceJSDirectoryList = from att in setting.Descendants("ResourceJSDirectory") select att;
                foreach (XElement resourceJS in resourceJSDirectoryList)
                {
                    resourceJSDirectory = resourceJS.Value;
                }

                IEnumerable<XElement> assetDirectoryList = from att in setting.Descendants("AssetDirectory") select att;
                foreach (XElement asset in assetDirectoryList)
                {
                    assetDirectory = asset.Value;
                }

                IEnumerable<XElement> entitiesDirectoryList = from att in setting.Descendants("EntitiesDirectory") select att;
                foreach (XElement entitiesD in entitiesDirectoryList)
                {
                    entityFilesDirectory = entitiesD.Value;
                }

                IEnumerable<XElement> screenDirectoryList = from att in setting.Descendants("ScreensDirectory") select att;
                foreach (XElement screenD in screenDirectoryList)
                {
                    screenFileDirectory = screenD.Value;
                }

                IEnumerable<XElement> homeMadeDirectoryList = from att in setting.Descendants("HomeMadeEntitiesDirectory") select att;
                foreach (XElement entitiesD in homeMadeDirectoryList)
                {
                    homeMadeEntitiesDirectory = entitiesD.Value;
                }

                IEnumerable<XElement> pluginsDirectoryList = from att in setting.Descendants("PluginsDirectory") select att;
                foreach (XElement pluginsD in pluginsDirectoryList)
                {
                    pluginsFileDirectory = pluginsD.Value;
                }
            }
        }

        #region Properties
        public static List<AssetFile> AssetFiles 
        {
            get
            {
                return assetFiles;
            }
        }

        public static List<EntityJSFile> EntityFiles
        {
            get
            {
                return entityFiles;
            }
        }

        public static List<string> EntityNames
        {
            get
            {
                return GetEntityNames(entityFiles);
            }
        }

        public static string ResourceJSDirectory
        {
            get
            {
                return resourceJSDirectory;
            }
        }

        public static string ScreenFileDirectory
        {
            get
            {
                return screenFileDirectory;
            }
        }

        public static List<Screen> Screens
        {
            get
            {
                if (screensFile != null)
                {
                    return screensFile.Screens;
                }
                else
                {
                    return null;
                }
            }
        }

        public static ScreensFile ScreensFile
        {
            get
            {
                return screensFile;
            }
        }

        public static HomeMadeEntitiesJSFile HomeMadeEntitiesFile
        {
            get
            {
                return homeMadeEntitiesFile;
            }
        }

        public static List<Entity> HomeMadeEntities
        {
            get
            {
                if (homeMadeEntitiesFile == null) return null;
                return homeMadeEntitiesFile.Entities;
            }
        }

        public static PluginsFile PluginsFile
        {
            get
            {
                return pluginsFile;
            }
        }

        public static List<Plugin> Plugins
        {
            get
            {
                if (pluginsFile == null) return null;
                return pluginsFile.Plugins;
            }
        }
        #endregion
    }
}
