var de = window.de || {};

(function ($) {
    de.objectHelper = Object.extend({

        addObject: function (gameName, object) {
            //me.entityPool.add(gameName, object);
        },
    })
})(window);

(function ($) {
    de.platformObjectHelper = de.objectHelper.extend({
        
        addPlatformPlayer: function () {
            this.addObject("mainPlayer", game.PlayerEntity);
        },

        addCoins: function() {
            this.addObject("CoinEntity", game.CoinEntity);
        },

    })
})(window);

(function ($) {
    de.assetHandler = Object.extend({

        readFiles: function () {
            this.getFilesAndFolders();
        },

        synch: function () {
            var done = false;
            var returnVal = undefined;

            // asynch takes a callback method
            // that is called when done
            var picturesLibrary = Windows.Storage.StorageFolder.getFolderFromPathAsync("/").done(function (data) {
                returnVal = data;
                done = true;
            });

            while (done == false) { };
            return picturesLibrary;
        },

        getFilesAndFolders: function () {
            this.clearOutput();
            var picturesLibrary = this.synch();
            picturesLibrary.getItemsAsync().done(function (items) {
                // Output all contents under the library group
                this.outputItems(group, items);
            });
            // Create a group for the Pictures library
            //var group = this.outputResultGroup(picturesLibrary.name);
            picturesLibrary.getItemsAsync().done(function (items) {
                // Output all contents under the library group
                this.outputItems(group, items);
            });
        },

        outputResultGroup: function (groupname) {
            var outputElement = document.getElementById("itemsList");
            var outputGroup = document.createElement("div");

            // Create the header for the group
            var headerElement = document.createElement("h2");
            headerElement.setAttribute("class", "outputHeader");
            headerElement.textContent = groupname;

            // Setup a list of elements to appear under this group
            var listElement = document.createElement("ul");
            listElement.setAttribute("class", "outputList");

            // Append to the DOM and return group to be populated
            outputGroup.appendChild(headerElement);
            outputGroup.appendChild(listElement);
            outputElement.appendChild(outputGroup);
            return { header: headerElement, list: listElement };
        },

        outputItems: function (group, items) {
            // Update the group header with the number of items in the group
            group.header.textContent += " (" + items.size + ")";
            // Add each item as an element in the group's list
            items.forEach(function (item) {
                var listItemElement = document.createElement("li");
                if (item.isOfType(Windows.Storage.StorageItemTypes.folder)) {
                    listItemElement.textContent = item.name + "\\";
                } else {
                    listItemElement.textContent = item.name;
                }
                group.list.appendChild(listItemElement);
            });
        },

        clearOutput: function () {
            //document.getElementById("itemsList").innerHTML = "";
        }
    })

})(window);