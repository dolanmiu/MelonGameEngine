﻿using System;
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

namespace MelonJSHelper
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Elysium.Controls.Window
    {
        CreateResource createJS = new CreateResource();
        ScreenManager stateManager = new ScreenManager();
        EntityCreator entityCreator = new EntityCreator();
        PluginsCreator pluginsCreator = new PluginsCreator();
        Settings settings = new Settings();

        public MainWindow()
        {
            InitializeComponent();
        }

        private void OnLoad(object sender, RoutedEventArgs e)
        {
            //this.Content = createJS;
            resourcePage.Content = createJS;
            stateManagerPage.Content = stateManager;
            settingsPage.Content = settings;
            entityCreatorPage.Content = entityCreator;
            pluginManagerPage.Content = pluginsCreator;
        }
    }
}
