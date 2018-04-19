function createCustomArray() {
    var listName = document.getElementById('list_name').value; // retrieves list name from HTML
    // check if list name is not empty
    if (listName == "") {
        alert("Failed list creation.\n\nPlease enter valid list name.");
        return; // cancels out of submission
    }

    var array = new Array();
    var inputElements = document.getElementsByTagName('input'); // grabs the words from the inputs
    for (var i = 1; i < inputElements.length; i++) { // skip first element because input is the title
        if (inputElements[i].value != '') {
            array.push(inputElements[i].value);
        }
    }

    // check if contents are populated
    if (array.length == 0) {
        alert("Failed list creation.\n\nNo list contents entered. Please enter valid contents.");
        return; // cancels out of submission
    }

    //ADD DATE TO ARRAY
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();
    var date_string = (month + "/" + day + "/" + year);

    array.splice(0, 0, date_string);
    console.log(array);

    storeList(array, listName);
}

    /* var wordList = document.getElementById('list_items');
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
    } */

// Alphabet only text input
function alphaOnly(event) {
  var key = event.keyCode;
  // 65 - 90 is alphabet | 8 is backspace | 13 is enter | 46 is delete | 9 is tab
  return ((key >= 65 && key <= 90) || key == 8 || key == 9 || key == 46);
};

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
                location.reload();
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
        location.reload();
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
        opt.className="dropdownContent";
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

function addTable() {
    var table = document.getElementById('availLists')
    table.border = '1'

    var arr = new Array();
    // Fetch the content in the local storage
    for(var i = 0; i < localStorage.length; i++){
        arr.push(localStorage.key(i)); // stores local storage keys in an array
    }
    //new
    var temparr = new Array();
    //end

    for (i = 0; i < arr.length; i++) {
        var tr = document.createElement('TR');
        var listName = tr.insertCell();
        listName.textContent = String(arr[i]);
        tr.appendChild(listName);
        var listWords = tr.insertCell();
        //new - reformat string from local storage to get # of words
        temparr = localStorage.getItem(arr[i]);
        temparr = temparr.replace( /,/g, " " );
        temparr = temparr.replace( /"/g, "" );
        temparr = temparr.slice(1,(temparr.length-1));
        temparr = temparr.split(" ");
        listWords.textContent = String(temparr.length-1);
        //end
        tr.appendChild(listWords);
        var listDate = tr.insertCell();
        //new - pull date
        listDate.textContent = String(temparr[0]);
        //end
        tr.appendChild(listDate);
        table.appendChild(tr);
    }
}