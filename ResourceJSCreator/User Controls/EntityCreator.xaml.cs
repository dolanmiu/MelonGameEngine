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
    /// Interaction logic for ObjectCreator.xaml
    /// </summary>
    public partial class EntityCreator : UserControl
    {
        public EntityCreator()
        {
            InitializeComponent();
        }

        private void EntityCreatorUserControl_Initialized(object sender, EventArgs e)
        {

        }

        private void OnLoad(object sender, RoutedEventArgs e)
        {
            EntitiesListBox.ItemsSource = Settings.HomeMadeEntities;
        }

        private void EntitiesListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ListBox lb = (ListBox)sender;
            EventsListBox.ItemsSource = ((Entity)lb.SelectedItem).Methods;
        }
    }
}
