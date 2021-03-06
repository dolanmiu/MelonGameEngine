﻿// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="CreateResource.xaml.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;

namespace MelonJSHelper
{
    /// <summary>
    /// Interaction logic for CreateResource.xaml
    /// </summary>
    public partial class CreateResource : UserControl
    {
        /*private string assetDirectory;
        private string resourceJSDirectory;
        private string entityFilesDirectory;
        private List<AssetFile> assetFiles = new List<AssetFile>();
        private List<EntityJSFile> entityFiles = new List<EntityJSFile>();
        private List<string> entityNames = new List<string>();*/

        /// <summary>
        /// Initializes a new instance of the <see cref="CreateResource"/> class.
        /// </summary>
        public CreateResource()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Called when [load].
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        private void OnLoad(object sender, RoutedEventArgs e)
        {
            AssetFileListBox.ItemsSource = Settings.AssetFiles;
            EntityFileListBox.ItemsSource = Settings.EntityNames;
        }

        /// <summary>
        /// Handles the GotFocus event of the UserControl control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        private void UserControl_GotFocus(object sender, RoutedEventArgs e)
        {
            AssetFileListBox.ItemsSource = Settings.AssetFiles;
            EntityFileListBox.ItemsSource = Settings.EntityNames;
        }

        /*private void RefreshBoxes()
        {
            AssetFileListBox.Items.Refresh();
            NumberOfFilesTextBlock.Text = assetFiles.Count + " Asset Files";
            EntityFileListBox.Items.Refresh();
        }

        private void AssetFolderTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            assetFiles.Clear();
            assetDirectory = ShowFolderDialog(sender);
            string[] files = Directory.GetFiles(assetDirectory, "*.*", SearchOption.AllDirectories);
            for (int i = 0; i < files.Length; i++) 
            {
                AssetFile file = new AssetFile(assetDirectory, files[i]);
                assetFiles.Add(file);
            }
            AssetFileListBox.Items.Refresh();
            NumberOfFilesTextBlock.Text = assetFiles.Count + " Asset Files";
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

        private void ResourceJSTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
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
                ResourceJSTextBox.Text = dialog.FileName;
                resourceJSDirectory = dialog.FileName;
            }
        }

        private void EntitiesTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            entityFiles.Clear();
            entityNames.Clear();
            entityFilesDirectory = ShowFolderDialog(sender);
            string[] files = Directory.GetFiles(entityFilesDirectory, "*.*", SearchOption.AllDirectories);
            for (int i = 0; i < files.Length; i++)
            {
                EntityJSFile file = new EntityJSFile(entityFilesDirectory, files[i]);
                entityFiles.Add(file);
                entityNames.AddRange(file.GameObjects);
            }
            EntityFileListBox.Items.Refresh();
        }*/

        /// <summary>
        /// Handles the Click event of the CreateResourceButton control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        private void CreateResourceButton_Click(object sender, RoutedEventArgs e)
        {
            if (Settings.AssetFiles == null || Settings.ResourceJSDirectory == null)
            {
                MessageBoxResult result = MessageBox.Show("Both Asset Folder and resource.js must be selected in the Settings screen!", "Sorry");
                return;
            }
            CreateResourceFile();
        }

        /// <summary>
        /// Creates the resource file.
        /// </summary>
        private void CreateResourceFile()
        {
            List<string> stringsList = new List<string>();
            List<string> resourceStringsList = CreateResourceScript();
            List<string> entityLines = CreateAssetsScript();

            stringsList.AddRange(resourceStringsList);
            stringsList.Add("");
            stringsList.AddRange(entityLines);

            string[] fileStrings = stringsList.ToArray();
            File.WriteAllLines(Settings.ResourceJSDirectory, fileStrings);
        }

        /// <summary>
        /// Creates the resource script.
        /// </summary>
        /// <returns>List{System.String}.</returns>
        private List<string> CreateResourceScript()
        {
            List<String> resourceStringsList = new List<String>();
            List<String> resourceScannedList = new List<String>();

            resourceStringsList.Add("game.resources = [");
            foreach (AssetFile file in Settings.AssetFiles)
            {
                if (file.FileType == "Type Not Found")
                {
                    continue;
                }
                string line;
                int duplicateCount = 0;
                string duplicateCountText;
                for (int i = 0; i < resourceScannedList.Count; i++)
                {
                    if (resourceScannedList[i] == file.FileName)
                    {
                        duplicateCount++;
                    }
                }
                if (duplicateCount == 0)
                {
                    duplicateCountText = "";
                }
                else
                {
                    duplicateCountText = duplicateCount.ToString();
                }
                if (file.FileType == "audio")
                {
                    line = "\t{ name: \"" + file.FileName + duplicateCountText + "\", type: \"" + file.FileType + "\", src: \"" + file.FolderRelativePath + "\", channel: 1" + " },";
                }
                else
                {
                    line = "\t{ name: \"" + file.FileName + duplicateCountText + "\", type: \"" + file.FileType + "\", src: \"" + file.FileRelativePath + "\" },";
                }
                resourceStringsList.Add(line);
                resourceScannedList.Add(file.FileName);
            }
            resourceStringsList.Add("];");
            return resourceStringsList;
        }

        /// <summary>
        /// Creates the assets script JS file.
        /// </summary>
        /// <returns>List{System.String}.</returns>
        private List<string> CreateAssetsScript()
        {
            List<string> entityStringsList = new List<string>();

            entityStringsList.Add("game.loadEntities = function () {");
            foreach (EntityJSFile entity in Settings.EntityFiles)
            {
                for (int i = 0; i < entity.GameObjects.Count; i++)
                {
                    string line = "\tme.entityPool.add(\"" + entity.GameObjectNames[i] + "\", " + entity.GameObjects[i] + ");";
                    entityStringsList.Add(line);
                }
            }
            entityStringsList.Add("}");
            return entityStringsList;
        }
    }
}
