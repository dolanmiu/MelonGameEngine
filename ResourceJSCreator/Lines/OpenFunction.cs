
namespace MelonJSHelper
{
    class OpenFunction : ILine
    {
        private string body;
        private string[] arguments;

        public OpenFunction(string body, params string[] arguments)
        {
            this.body = body;
            this.arguments = arguments;
        }

        public override string ToString()
        {
            string methodName = body + "(";
            for (int i = 0; i < arguments.Length - 1; i++)
            {
                methodName += arguments[i] + ", ";
            }
            methodName += arguments[arguments.Length - 1];
            return methodName;
        }

        #region Properties
        public string Body
        {
            get
            {
                return body;
            }
        }

        public string[] Arguments
        {
            get
            {
                return arguments;
            }
        }
        #endregion
    }
}
