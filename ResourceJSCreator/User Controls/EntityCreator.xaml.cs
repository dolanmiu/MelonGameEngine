using System;
using System.Windows;
using System.Windows.Controls;

namespace MelonJSHelper
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
