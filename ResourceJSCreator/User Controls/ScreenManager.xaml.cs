// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="ScreenManager.xaml.cs" company="">
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
    /// Interaction logic for StateManager.xaml
    /// </summary>
    public partial class ScreenManager : UserControl
    {
        /// <summary>
        /// The states possible for a screen.
        /// </summary>
        private State[] states = new State[] { new State("Credits"), new State("Game End"), new State("Gameover"), new State("Loading"), new State("Menu"), new State("Play"), new State("Ready"), new State("Score"), new State("Settings"), new State("User") };
        //private string[] states = new string[] { "Credits", "Game End", "Gameover", "Loading", "Menu", "Play", "Ready", "Score", "Settings", "User" };

        /// <summary>
        /// Initializes a new instance of the <see cref="ScreenManager"/> class.
        /// </summary>
        public ScreenManager()
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
            ScreenListBox.ItemsSource = Settings.Screens;
            ScreenStateComboBox.ItemsSource = states;
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
        /// Handles the SelectionChanged event of the ScreenStateComboBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="SelectionChangedEventArgs"/> instance containing the event data.</param>
        private void ScreenStateComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (((ComboBox)sender).SelectedItem == null) return;
            State selectedState = (State)((ComboBox)sender).SelectedItem;
            Screen s = (Screen)ScreenListBox.SelectedItem;
            s.State = selectedState;
        }

        /// <summary>
        /// Handles the SelectionChanged event of the ScreenListBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="SelectionChangedEventArgs"/> instance containing the event data.</param>
        private void ScreenListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            Screen s = (Screen)ScreenListBox.SelectedItem;
            int i;
            for (i = 0; i < states.Length; i++)
            {
                if (s.State != null)
                {
                    if (states[i].Name == s.State.Name)
                    {
                        break;
                    }
                }
            }
            if (s.State == null)
            {
                ScreenStateComboBox.SelectedItem = null;
            }
            else
            {
                ScreenStateComboBox.SelectedIndex = i;
            }

            RefreshLevelTextBox(s);
            RefreshVariableLevelCheckBox(s);
            RefreshScreenNameTextBox(s);
        }

        /// <summary>
        /// Refreshes the controls.
        /// </summary>
        private void RefreshControls()
        {
            ScreenStateComboBox.Items.Refresh();
        }

        /// <summary>
        /// Refreshes the level text box.
        /// </summary>
        /// <param name="s">The s.</param>
        private void RefreshLevelTextBox(Screen s) 
        {
            LevelTextBox.Text = s.Level;
            LevelTextBox.IsEnabled = !s.VariableLevel;
        }

        /// <summary>
        /// Refreshes the variable level check box.
        /// </summary>
        /// <param name="s">The s.</param>
        private void RefreshVariableLevelCheckBox(Screen s)
        {
            VariableLevelCheckBox.IsChecked = s.VariableLevel;
        }

        /// <summary>
        /// Refreshes the screen name text box.
        /// </summary>
        /// <param name="s">The s.</param>
        private void RefreshScreenNameTextBox(Screen s)
        {
            ScreenNameTextBox.Text = s.Name;
        }

        /// <summary>
        /// Handles the TextChanged event of the LevelTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="TextChangedEventArgs"/> instance containing the event data.</param>
        private void LevelTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Screen s = (Screen)ScreenListBox.SelectedItem;
            TextBox t = (TextBox)sender;
            if (s == null) return;
            s.Level = t.Text;
        }

        /// <summary>
        /// Handles the Changed event of the VariableLevelCheckBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        private void VariableLevelCheckBox_Changed(object sender, RoutedEventArgs e)
        {
            Screen s = (Screen)ScreenListBox.SelectedItem;
            CheckBox cb = (CheckBox)sender;
            bool varLevel = (cb.IsChecked.HasValue) ? cb.IsChecked.Value : false;
            s.VariableLevel = varLevel;
            //s.SetVariableLevel(varLevel, s.Level);
            RefreshLevelTextBox(s);
            RefreshVariableLevelCheckBox(s);
        }

        /// <summary>
        /// Handles the Click event of the SaveLevelButton control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        private void SaveLevelButton_Click(object sender, RoutedEventArgs e)
        {
            string[] output = Settings.ScreensFile.CreateJSFile();
            File.WriteAllLines(Settings.ScreenFileDirectory, output);
        }

        /// <summary>
        /// Handles the Click event of the NewLevelButton control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="RoutedEventArgs"/> instance containing the event data.</param>
        private void NewLevelButton_Click(object sender, RoutedEventArgs e)
        {
            Screen s = new Screen("NewScreen", "ScreenObject");
            Settings.Screens.Add(s);
            ScreenListBox.Items.Refresh();
        }

        /// <summary>
        /// Handles the TextChanged event of the ScreenNameTextBox control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="TextChangedEventArgs"/> instance containing the event data.</param>
        private void ScreenNameTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Screen s = (Screen)ScreenListBox.SelectedItem;
            if (s == null) return;
            s.Name = ((TextBox)sender).Text;
            ScreenListBox.Items.Refresh();
        }
    }
}
