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
    /// Interaction logic for StateManager.xaml
    /// </summary>
    public partial class ScreenManager : UserControl
    {
        private State[] states = new State[] { new State("Credits"), new State("Game End"), new State("Gameover"), new State("Loading"), new State("Menu"), new State("Play"), new State("Ready"), new State("Score"), new State("Settings"), new State("User") };
        //private string[] states = new string[] { "Credits", "Game End", "Gameover", "Loading", "Menu", "Play", "Ready", "Score", "Settings", "User" };

        public ScreenManager()
        {
            InitializeComponent();
        }

        public void OnLoad(object sender, RoutedEventArgs e)
        {
            ScreenListBox.ItemsSource = Settings.Screens;
            ScreenStateComboBox.ItemsSource = states;
        }

        private void UserControl_Initialized(object sender, EventArgs e)
        {

        }

        private void ScreenStateComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (((ComboBox)sender).SelectedItem == null) return;
            State selectedState = (State)((ComboBox)sender).SelectedItem;
            Screen s = (Screen)ScreenListBox.SelectedItem;
            s.State = selectedState;
        }

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

        private void RefreshControls()
        {
            ScreenStateComboBox.Items.Refresh();
        }

        private void RefreshLevelTextBox(Screen s) 
        {
            LevelTextBox.Text = s.Level;
            LevelTextBox.IsEnabled = !s.VariableLevel;
        }

        private void RefreshVariableLevelCheckBox(Screen s)
        {
            VariableLevelCheckBox.IsChecked = s.VariableLevel;
        }

        private void RefreshScreenNameTextBox(Screen s)
        {
            ScreenNameTextBox.Text = s.Name;
        }

        private void LevelTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Screen s = (Screen)ScreenListBox.SelectedItem;
            TextBox t = (TextBox)sender;
            if (s == null) return;
            s.Level = t.Text;
        }

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

        private void SaveLevelButton_Click(object sender, RoutedEventArgs e)
        {
            string[] output = Settings.ScreensFile.CreateJSFile();
            File.WriteAllLines(Settings.ScreenFileDirectory, output);
        }

        private void NewLevelButton_Click(object sender, RoutedEventArgs e)
        {
            Screen s = new Screen("NewScreen", "ScreenObject");
            Settings.Screens.Add(s);
            ScreenListBox.Items.Refresh();
        }

        private void ScreenNameTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Screen s = (Screen)ScreenListBox.SelectedItem;
            if (s == null) return;
            s.Name = ((TextBox)sender).Text;
            ScreenListBox.Items.Refresh();
        }
    }
}
