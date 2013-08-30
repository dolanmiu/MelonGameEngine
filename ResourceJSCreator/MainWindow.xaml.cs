// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 07-12-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="MainWindow.xaml.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Windows;

namespace MelonJSHelper
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Elysium.Controls.Window
    {
        /// <summary>
        /// The create JS
        /// </summary>
        CreateResource createJS = new CreateResource();
        /// <summary>
        /// The state manager
        /// </summary>
        ScreenManager stateManager = new ScreenManager();
        /// <summary>
        /// The entity creator
        /// </summary>
        EntityCreator entityCreator = new EntityCreator();
        /// <summary>
        /// The plugins creator
        /// </summary>
        PluginsCreator pluginsCreator = new PluginsCreator();
        /// <summary>
        /// The settings
        /// </summary>
        Settings settings = new Settings();

        /// <summary>
        /// Initializes a new instance of the <see cref="MainWindow"/> class.
        /// </summary>
        public MainWindow()
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
            //this.Content = createJS;
            resourcePage.Content = createJS;
            stateManagerPage.Content = stateManager;
            settingsPage.Content = settings;
            entityCreatorPage.Content = entityCreator;
            pluginManagerPage.Content = pluginsCreator;
        }
    }
}
