// ***********************************************************************
// Assembly         : MelonJSHelper
// Author           : Dolan
// Created          : 08-27-2013
//
// Last Modified By : Dolan
// Last Modified On : 08-29-2013
// ***********************************************************************
// <copyright file="IMelonJSFile.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MelonJSHelper
{
    /// <summary>
    /// Interface IMelonJSFile
    /// </summary>
    public interface IMelonJSFile
    {
        /// <summary>
        /// Reads the file.
        /// </summary>
        /// <param name="directory">The directory.</param>
        void ReadFile(string directory);
    }
}
