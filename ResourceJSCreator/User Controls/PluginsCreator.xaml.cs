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

namespace MelonJSHelper
{
    /// <summary>
    /// Interaction logic for PluginsCreator.xaml
    /// </summary>
    public partial class PluginsCreator : UserControl
    {
        private string[] versions = new string[] { "0.9.8", "0.9.7", "0.9.5", "0.9.4", "0.9.3", "0.9.2", "0.9.1", "0.9.0" };

        public PluginsCreator()
        {
            InitializeComponent();
        }

        private void SavePluginsButton_Click(object sender, RoutedEventArgs e)
        {
            string[] output = Settings.PluginsFile.CreateJSFile();
            File.WriteAllLines(Settings.ScreenFileDirectory, output);
        }

        private void NewPluginButton_Click(object sender, RoutedEventArgs e)
        {
            Plugin plugin = new Plugin("NewPlugin");
            Settings.Plugins.Add(plugin);
            PluginsListBox.Items.Refresh();
        }

        private void UserControl_Initialized(object sender, EventArgs e)
        {
        }

        private void OnLoad(object sender, RoutedEventArgs e)
        {
            PluginsListBox.ItemsSource = Settings.Plugins;
            VersionComboBox.ItemsSource = versions;
        }

        private void PluginNameTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Plugin p = (Plugin)PluginsListBox.SelectedItem;
            TextBox t = (TextBox)sender;
            if (p == null) return;
            p.Name = t.Text;
        }

        private void ObjectPatchedTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Plugin p = (Plugin)PluginsListBox.SelectedItem;
            TextBox t = (TextBox)sender;
            if (p == null) return;
            p.ObjectPatched = t.Text;
        }

        private void MethodOfObjectTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Plugin p = (Plugin)PluginsListBox.SelectedItem;
            TextBox t = (TextBox)sender;
            if (p == null) return;
            p.MethodPatched = t.Text;
        }

        private void VersionComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (((ComboBox)sender).SelectedItem == null) return;
            string selectedVersion = (string)((ComboBox)sender).SelectedItem;
            Plugin p = (Plugin)PluginsListBox.SelectedItem;
            p.Version = selectedVersion;
        }

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

        public void RefreshControls(Plugin p)
        {
            PluginNameTextBox.Text = p.Name;
            ObjectPatchedTextBox.Text = p.ObjectPatched;
            MethodOfObjectTextBox.Text = p.MethodPatched;
        }
    }
}
