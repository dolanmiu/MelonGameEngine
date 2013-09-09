// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="PluginsCreator.xaml.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.IO;
using System.Windows;
using System.Windows.Controls;

namespace MelonJSHelper
{
    /// <summary>
    /// Interaction logic for PluginsCreator.xaml
    /// </summary>
    public partial class PluginsCreator : UserControl
    {
        /// <summary>
        /// The versions of MelonJS which the plugin can be for
        /// </summary>
        private string[] versions = new string[] { "0.9.8", "0.9.7", "0.9.5", "0.9.4", "0.9.3", "0.9.2", "0.9.1", "0.9.0" };

        /// <summary>
        /// Initializes a new instance of the <see cref="PluginsCreator"/> class.
        /// </summary>
        public PluginsCreator()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Handles the Click event of the SavePluginsButton control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        private void SavePluginsButton_Click(object sender, RoutedEventArgs e)
        {
            string[] output = Settings.PluginsFile.CreateJSFile();
            File.WriteAllLines(Settings.ScreenFileDirectory, output);
        }

        /// <summary>
        /// Handles the Click event of the NewPluginButton control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        private void NewPluginButton_Click(object sender, RoutedEventArgs e)
        {
            Plugin plugin = new Plugin("NewPlugin");
            Settings.Plugins.Add(plugin);
            PluginsListBox.Items.Refresh();
        }

        /// <summary>
        /// Handles the Initialized event of the UserControl control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="EventArgs"/> instance containing the event data.</param>
        private void UserControl_Initialized(object sender, EventArgs e)
        {
        }

        /// <summary>
        /// Called when [load].
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        private void OnLoad(object sender, RoutedEventArgs e)
        {
            PluginsListBox.ItemsSource = Settings.Plugins;
            VersionComboBox.ItemsSource = versions;
        }

        /// <summary>
        /// Handles the TextChanged event of the PluginNameTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="TextChangedEventArgs"/> instance containing the event data.</param>
        private void PluginNameTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Plugin p = (Plugin)PluginsListBox.SelectedItem;
            TextBox t = (TextBox)sender;
            if (p == null) return;
            p.Name = t.Text;
        }

        /// <summary>
        /// Handles the TextChanged event of the ObjectPatchedTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="TextChangedEventArgs"/> instance containing the event data.</param>
        private void ObjectPatchedTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Plugin p = (Plugin)PluginsListBox.SelectedItem;
            TextBox t = (TextBox)sender;
            if (p == null) return;
            p.ObjectPatched = t.Text;
        }

        /// <summary>
        /// Handles the TextChanged event of the MethodOfObjectTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="TextChangedEventArgs"/> instance containing the event data.</param>
        private void MethodOfObjectTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Plugin p = (Plugin)PluginsListBox.SelectedItem;
            TextBox t = (TextBox)sender;
            if (p == null) return;
            p.MethodPatched = t.Text;
        }

        /// <summary>
        /// Handles the SelectionChanged event of the VersionComboBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="SelectionChangedEventArgs"/> instance containing the event data.</param>
        private void VersionComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (((ComboBox)sender).SelectedItem == null) return;
            string selectedVersion = (string)((ComboBox)sender).SelectedItem;
            Plugin p = (Plugin)PluginsListBox.SelectedItem;
            if (p == null) return;
            p.Version = selectedVersion;
        }

        /// <summary>
        /// Handles the SelectionChanged event of the PluginsListBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="SelectionChangedEventArgs"/> instance containing the event data.</param>
        private void PluginsListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            Plugin p = (Plugin)PluginsListBox.SelectedItem;
            int i;
            for (i = 0; i < versions.Length; i++)
            {
                if (p.Version != "")
                {
                    if (versions[i] == p.Version)
                    {
                        break;
                    }
                }
            }

            if (p.Version == "")
            {
                VersionComboBox.SelectedItem = null;
            }
            else
            {
                VersionComboBox.SelectedIndex = i;
            }

            RefreshControls(p);
        }

        /// <summary>
        /// Refreshes the controls.
        /// </summary>
        /// <param name="p">The p.</param>
        public void RefreshControls(Plugin p)
        {
            PluginNameTextBox.Text = p.Name;
            ObjectPatchedTextBox.Text = p.ObjectPatched;
            MethodOfObjectTextBox.Text = p.MethodPatched;
        }
    }
}
