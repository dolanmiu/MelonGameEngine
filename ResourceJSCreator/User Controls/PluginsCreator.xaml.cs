using System;
using System.Collections.Generic;
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
    /// Interaction logic for PluginsCreator.xaml
    /// </summary>
    public partial class PluginsCreator : UserControl
    {
        public PluginsCreator()
        {
            InitializeComponent();
        }

        private void SavePluginsButton_Click(object sender, RoutedEventArgs e)
        {

        }

        private void NewPluginButton_Click(object sender, RoutedEventArgs e)
        {

        }

        private void UserControl_Initialized(object sender, EventArgs e)
        {
        }

        private void OnLoad(object sender, RoutedEventArgs e)
        {
            PluginsListBox.ItemsSource = Settings.Plugins;
        }
    }
}
