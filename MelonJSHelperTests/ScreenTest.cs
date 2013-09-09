using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MelonJSHelper;
using NUnit.Framework;

namespace MelonJSHelperTests
{
    class ScreenTest
    {
        [Test]
        public void CheckGetSetStateString()
        {
            Screen s = new Screen("game.Bobby", "me.ScreenObject");
            s.State = new State("GAMEOVER");
            string stateString = s.GetSetStateString();
            Assert.AreEqual("me.state.set(me.state.GAMEOVER, new game.game.Bobby());", stateString);
        }
    }
}
