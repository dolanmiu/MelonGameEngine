// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="Settings.xaml.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Xml.Linq;

namespace MelonJSHelper
{
    /// <summary>
    /// Interaction logic for Settings.xaml
    /// </summary>
    public partial class Settings : UserControl
    {
        /// <summary>
        /// The asset directory
        /// </summary>
        private static string assetDirectory;
        /// <summary>
        /// The entity files directory
        /// </summary>
        private static string entityFilesDirectory;
        /// <summary>
        /// The screen file directory
        /// </summary>
        private static string screenFileDirectory;
        /// <summary>
        /// The home made entities directory
        /// </summary>
        private static string homeMadeEntitiesDirectory;
        /// <summary>
        /// The plugins file directory
        /// </summary>
        private static string pluginsFileDirectory;

        /// <summary>
        /// The resource JS directory
        /// </summary>
        private static string resourceJSDirectory;
        /// <summary>
        /// The screens file
        /// </summary>
        private static ScreensFile screensFile;
        /// <summary>
        /// The home made entities file
        /// </summary>
        private static HomeMadeEntitiesJSFile homeMadeEntitiesFile;
        /// <summary>
        /// The plugins file
        /// </summary>
        private static PluginsFile pluginsFile;

        /// <summary>
        /// The asset files
        /// </summary>
        private static List<AssetFile> assetFiles = new List<AssetFile>();
        /// <summary>
        /// The entity files
        /// </summary>
        private static List<EntityJSFile> entityFiles = new List<EntityJSFile>();

        /// <summary>
        /// Initializes a new instance of the <see cref="Settings"/> class.
        /// </summary>
        public Settings()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Called when [load].
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        public void OnLoad(object sender, RoutedEventArgs e)
        {
        }


        /// <summary>
        /// Handles the Initialized event of the UserControl control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="EventArgs"/> instance containing the event data.</param>
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

        /// <summary>
        /// Handles the PreviewMouseUp event of the AssetFolderTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="MouseButtonEventArgs"/> instance containing the event data.</param>
        private void AssetFolderTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            //assetFiles.Clear();
            string assets = ShowFolderDialog(sender);
            assetDirectory = assets;
            assetFiles = GetAssets(assets);
        }

        /// <summary>
        /// Handles the PreviewMouseUp event of the ResourceJSTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="MouseButtonEventArgs"/> instance containing the event data.</param>
        private void ResourceJSTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            string dir = OpenJSFileDialog();
            if (dir != null)
            {
                ResourceJSTextBox.Text = dir;
                resourceJSDirectory = dir;
            }
        }

        /// <summary>
        /// Handles the PreviewMouseUp event of the EntitiesTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="MouseButtonEventArgs"/> instance containing the event data.</param>
        private void EntitiesTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            //entityFiles.Clear();
            string entityFilesD = ShowFolderDialog(sender);
            entityFilesDirectory = entityFilesD;
            entityFiles = GetEntities(entityFilesD);
        }

        /// <summary>
        /// Handles the PreviewMouseUp event of the LevelJSTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="MouseButtonEventArgs"/> instance containing the event data.</param>
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

        /// <summary>
        /// Handles the PreviewMouseUp event of the HomeMadeEntitiesFileTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="MouseButtonEventArgs"/> instance containing the event data.</param>
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

        /// <summary>
        /// Handles the PreviewMouseUp event of the PluginsTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="MouseButtonEventArgs"/> instance containing the event data.</param>
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

        /// <summary>
        /// Gets the assets.
        /// </summary>
        /// <param name="assetDirectory">The asset directory.</param>
        /// <returns>List{AssetFile}.</returns>
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

        /// <summary>
        /// Gets the entities.
        /// </summary>
        /// <param name="entityFilesDirectory">The entity files directory.</param>
        /// <returns>List{EntityJSFile}.</returns>
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

        /// <summary>
        /// Opens the JS file dialog.
        /// </summary>
        /// <returns>System.String.</returns>
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

        /// <summary>
        /// Gets the entity names.
        /// </summary>
        /// <param name="files">The files.</param>
        /// <returns>List{System.String}.</returns>
        private static List<string> GetEntityNames(List<EntityJSFile> files)
        {
            List<string> fileNames = new List<string>();
            for (int i = 0; i < files.Count; i++)
            {
                fileNames.AddRange(files[i].GameObjects);
            }
            return fileNames;
        }

        /// <summary>
        /// Gets the resource JS.
        /// </summary>
        private void GetResourceJS()
        {

        }

        /// <summary>
        /// Shows the folder dialog.
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <returns>System.String.</returns>
        private string ShowFolderDialog(object sender)
        {
            var dialog = new System.Windows.Forms.FolderBrowserDialog();
            dialog.SelectedPath = Directory.GetCurrentDirectory();
            System.Windows.Forms.DialogResult result = dialog.ShowDialog();
            TextBox tb = (TextBox)sender;
            tb.Text = dialog.SelectedPath;
            return dialog.SelectedPath;
        }

        /// <summary>
        /// Handles the Click event of the SaveSettingsButton control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        private void SaveSettingsButton_Click(object sender, RoutedEventArgs e)
        {
            SaveSettings(resourceJSDirectory, assetDirectory, entityFilesDirectory, screenFileDirectory, homeMadeEntitiesDirectory, pluginsFileDirectory);
        }

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

        /// <summary>
        /// Reads the settings.
        /// </summary>
        /// <param name="resource">The resource.</param>
        /// <param name="assets">The assets.</param>
        /// <param name="entities">The entities.</param>
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
        /// <summary>
        /// Gets the asset files.
        /// </summary>
        /// <value>The asset files.</value>
        public static List<AssetFile> AssetFiles 
        {
            get
            {
                return assetFiles;
            }
        }

        /// <summary>
        /// Gets the entity files.
        /// </summary>
        /// <value>The entity files.</value>
        public static List<EntityJSFile> EntityFiles
        {
            get
            {
                return entityFiles;
            }
        }

        /// <summary>
        /// Gets the entity names.
        /// </summary>
        /// <value>The entity names.</value>
        public static List<string> EntityNames
        {
            get
            {
                return GetEntityNames(entityFiles);
            }
        }

        /// <summary>
        /// Gets the resource JS directory.
        /// </summary>
        /// <value>The resource JS directory.</value>
        public static string ResourceJSDirectory
        {
            get
            {
                return resourceJSDirectory;
            }
        }

        /// <summary>
        /// Gets the screen file directory.
        /// </summary>
        /// <value>The screen file directory.</value>
        public static string ScreenFileDirectory
        {
            get
            {
                return screenFileDirectory;
            }
        }

        /// <summary>
        /// Gets the screens.
        /// </summary>
        /// <value>The screens.</value>
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

        /// <summary>
        /// Gets the screens file.
        /// </summary>
        /// <value>The screens file.</value>
        public static ScreensFile ScreensFile
        {
            get
            {
                return screensFile;
            }
        }

        /// <summary>
        /// Gets the home made entities file.
        /// </summary>
        /// <value>The home made entities file.</value>
        public static HomeMadeEntitiesJSFile HomeMadeEntitiesFile
        {
            get
            {
                return homeMadeEntitiesFile;
            }
        }

        /// <summary>
        /// Gets the home made entities.
        /// </summary>
        /// <value>The home made entities.</value>
        public static List<Entity> HomeMadeEntities
        {
            get
            {
                if (homeMadeEntitiesFile == null) return null;
                return homeMadeEntitiesFile.Entities;
            }
        }

        /// <summary>
        /// Gets the plugins file.
        /// </summary>
        /// <value>The plugins file.</value>
        public static PluginsFile PluginsFile
        {
            get
            {
                return pluginsFile;
            }
        }

        /// <summary>
        /// Gets the plugins.
        /// </summary>
        /// <value>The plugins.</value>
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
