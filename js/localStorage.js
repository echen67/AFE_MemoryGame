function createCustomArray() {
    var listName = document.getElementById('list_name').value; // retrieves list name from HTML
    // check if list name is not empty
    if (listName == "") {
        alert("Failed list creation.\n\nPlease enter valid list name.");
        return; // cancels out of submission
    }

    var wordList = document.getElementById('list_items');
    var listElements = wordList.getElementsByTagName('li'); // grabs the words from the list
    var array = new Array();
    if (listElements.length == 0) {
        // deleted format for the HTML list (<li> is not null)
        alert("Failed list creation.\n\nNo list found. Please refresh page to return to proper list format.");
        return;
    }
    for (var i = 0; i < listElements.length; i++) {
        var word = listElements[i].innerText;
        if (word != "" && word != "\n") { // checks so no empty lines are stored
            array.push(listElements[i].innerText) // stores words as an array
        }
    }

    // check if contents are populated
    if (array.length == 0) {
        alert("Failed list creation.\n\nNo list contents entered. Please enter valid contents.");
        return; // cancels out of submission
    }

    storeList(array, listName);
}

// JQuery for no-number text input - TODO

// Check for profanity - TODO

function storeList(array, listName) {
    // localStorage.clear(); // DEBUG


    var myJSON = JSON.stringify(array); // transform into JSON object for local storage

    // check to see if overriding file
    var override = false;
    for(var i = 0; i < localStorage.length; i++){
        if (listName == localStorage.key(i)) {
            override = true;
            // compares key with list name
            if (confirm("Failed list creation.\n\nList already exists. Would you like to override with new contents?")) {
                // OK Confirmation
                localStorage[listName] = myJSON;
                alert("List successfully saved!");
            } else {
                // Cancel Confirmation
                alert("List not stored.");
                // Does not store in local storage
            }
        }
    }
    // if not overriding a file
    if (!override) {
        localStorage[listName] = myJSON;
        alert("List successfully saved!");
    }
}

function fetchLists() {
    var arr = new Array();
    // Fetch the content in the local storage
    for(var i = 0; i < localStorage.length; i++){
        arr.push(localStorage.key(i)); // stores local storage keys in an array
    }

    var sel = document.getElementById('dropdownList');
    var length = sel.options.length;
    for (i = 0; i < length; i++) {
        sel.options[i] = null; // clear drop down list first
    }

    // if local storage is empty
    if (arr.length == 0) {
        var opt = document.createElement('option');
        opt.innerHTML = "No available lists.";
        opt.value = null;
        sel.appendChild(opt);
        return; // breaks out of fetch lists
    }

    for(var i = 0; i < arr.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = arr[i];
        opt.value = arr[i];
        sel.appendChild(opt); // populate drop down element with array elements
    }
}

function clearLists() {
    localStorage.clear();
}

function readSingleFile(evt) {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        //Retrieve the first (and only!) File from the FileList object
        var fileUploaded = evt.target.files[0]; // retrieve file
        if (fileUploaded) { // if file not null
            var reader = new FileReader(); // create file reader
            reader.onload = function(e) {
                var contents = e.target.result;
                alert( "Got the file.n"
                      +"Name: " + fileUploaded.name + "n"
                      +"Type: " + fileUploaded.type + "n"
                      +"Size: " + fileUploaded.size + " bytesn"
                      + "Starts with: " + contents.substr(1, contents.indexOf("n"))
                );
            }
            reader.readAsText(fileUploaded);
        } else {
            alert("Failed to load file.");
        }
        // adds listener to see if change made to the element "list" when uploading a file to call readSingleFile
        document.getElementById('list').addEventListener('change', readSingleFile, false);
    } else {
        alert('The File APIs are not fully supported by your browser.');
    }
}