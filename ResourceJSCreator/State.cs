using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    public class State
    {

        private string name;

        public State(string name)
        {
            this.name = name;
        }

        public override string ToString()
        {
            string state;
            state = name.ToUpper();
            state = state.Replace(" ", "_");
            string output = "me.state." + state;
            return output;
        }

        private string ToUpperFirstLetter(string source)
        {
            if (string.IsNullOrEmpty(source))
                return string.Empty;
            source = source.ToLower();
            char[] letters = source.ToCharArray();
            letters[0] = char.ToUpper(letters[0]);
            return new string(letters);
        }

        #region Properties
        public string Name
        {
            get
            {
                return ToUpperFirstLetter(name);
            }
        }
        #endregion
    }
}
