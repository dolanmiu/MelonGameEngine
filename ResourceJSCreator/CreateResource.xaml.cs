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

namespace ResourceJSCreator
{
    /// <summary>
    /// Interaction logic for CreateResource.xaml
    /// </summary>
    public partial class CreateResource : UserControl
    {
        private string assetDirectory;
        private string resourceJSDirectory;
        private List<AssetFile> assetfiles = new List<AssetFile>();
        public CreateResource()
        {
            InitializeComponent();
        }

        private void OnLoad(object sender, RoutedEventArgs e)
        {
            AssetFileListBox.ItemsSource = assetfiles;
        }

        private void AssetFolderTextBox_PreviewMouseUp(object sender, MouseButtonEventArgs e)
        {
            var dialog = new System.Windows.Forms.FolderBrowserDialog();
            dialog.SelectedPath = Directory.GetCurrentDirectory();
            System.Windows.Forms.DialogResult result = dialog.ShowDialog();
            AssetFolderTextBox.Text = dialog.SelectedPath;
            assetDirectory = dialog.SelectedPath;
            string[] files = Directory.GetFiles(assetDirectory, "*.*", SearchOption.AllDirectories);

            for (int i = 0; i < files.Length; i++) 
            {
                AssetFile file = new AssetFile(assetDirectory, files[i]);
                assetfiles.Add(file);
            }
            AssetFileListBox.Items.Refresh();
            NumberOfFilesTextBlock.Text = assetfiles.Count + " Asset Files";
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

        private void CreateResourceButton_Click(object sender, RoutedEventArgs e)
        {
            if (assetDirectory == null || resourceJSDirectory == null)
            {
                MessageBoxResult result = MessageBox.Show("Both Asset Folder and resource.js must be selected!", "Sorry");
                return;
            }
            CreateResourceFile();
        }

        private void CreateResourceFile()
        {
            List<String> resourceStringsList = new List<String>();
            List<String> resourceScannedList = new List<String>();

            resourceStringsList.Add("game.resources = [");
            foreach (AssetFile file in assetfiles)
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
                    line = "\t{ name: \"" + file.FileName + duplicateCountText + "\", type: \"" + file.FileType + "\", src: \"" + file.FileFullPath + "\", channel: 1" + " },";
                }
                else
                {
                    line = "\t{ name: \"" + file.FileName + duplicateCountText + "\", type: \"" + file.FileType + "\", src: \"" + file.FileFullPath + "\" },";
                }
                resourceStringsList.Add(line);
                resourceScannedList.Add(file.FileName);
            }
            resourceStringsList.Add("];");
            string[] resourceStrings = resourceStringsList.ToArray();
            File.WriteAllLines(resourceJSDirectory, resourceStrings);
        }
    }
}
