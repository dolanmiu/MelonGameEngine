using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    class CollisionEvents : ILine
    {
        private List<CollisionEvent> collisionEvents = new List<CollisionEvent>();

        public CollisionEvents()
        {

        }

        public void AddCollisionEvent(CollisionEvent ce) 
        {
            collisionEvents.Add(ce);
        }

        public string Body
        {
            get
            {
                return "";
            }
        }

    }
}
