var maxWordLength = 16,
    numWords = 30,
    submitting = !1,
    admin = 0,
    editData = null,
    categoriesData = null,
    ajaxuri = "/api/pri/testapikey/",
    sURL, sImg, sDesc, wsImg;

function wsMakeInit() {
    var a;
    if (a = JSON.parse(_GET("id"))) {
        if ("number" === typeof a) {
            var c = a;
            a = [];
            a[0] = c
        }
        for (c = 0; c < a.length; c++) {
            wsMakeGetCategories();
            wsMakeGetPuzzle(a[c], function(a) {
                editData = a;
                a.isAdmin && (admin = 1)
            });
            var b = wsMakeForm();
            wsMakeFillForm(b, editData);
            wsMakeAdminMergePuzzles(b)
        }
    } else wsMakeForm()
}

function wsMakeForm() {
    var a = [],
        c = (Math.random() + 1).toString(36).substr(2, 5);
    if (admin) var a = a + "<style>.inlBtn{cursor:pointer;background:#FE5858;border:1px solid #333;padding:2px;font-size:9px;margin-left:20px;vertical-align:middle;}</style>",
        b = "A7D4E2,A7E2C8,E2E2A7,E3D1EC,ECDBD1,ECC7C4".split(","),
        b = b[Math.floor(Math.random() * b.length)],
        a = a + ('<form id="wsMakeForm_' + c + '" style="border:2px solid #ccc; margin:20px 0; padding:20px; background:#' + b + '">') + '<label for="category">Category</label><select name="category"><option value="1">Uncategorised</option></select><label style="margin-bottom:6px">Status</label><input type="radio" id="st1" name="status" value="public"><label for="st1">Public</label> <input type="radio" id="st2" name="status" value="private"><label for="st2">Private</label> <input type="radio" id="st3" name="status" value="review"><label for="st3">Review</label> <input type="radio" id="st4" name="status" value="delete"><label for="st4">Delete</label>';
    else a += '<form id="wsMakeForm_' + c + '">';
    a += '<input type="hidden" name="id" value="-1" /><label for="title">Word Search Title';
    admin && (a += ' <span class="inlBtn" onclick="wsCapTitle(\'' + c + '\')">Capitalize</span> <span class="inlBtn" onclick="wsLowercaseTitle(\'' + c + "')\">Lowercase</span>");
    a = a + ('</label><input type="text" name="title" onBlur="wsMakeIsValidTitle(\'' + c + '\')" value="" spellcheck=true /><div class="inlErr fLeftMar"></div>') + '<label for="desc">Description';
    admin && (a += ' <span class="inlBtn" onclick="genAutoDescription(\'' +
        c + "')\">Auto Description</span>");
    a = a + ('</label><textarea name="desc" style="height:120px;" onBlur="wsMakeIsValidDesc(\'' + c + '\')"></textarea><div id="errWsDesc" class="inlErr fLeftMar"></div>') + '<label for="wordlist[]">Word List';
    admin && (a += ' <span class="inlBtn" onclick="wsCapWords(\'' + c + '\')">Capitalize Words</span> <span class="inlBtn" onclick="wsLowercaseWords(\'' + c + "')\">Lowercase Words</span></label>");
    for (b = 0; b < numWords; b++) a += '<div style="display:inline-block;width:200px;margin:4px 0 4px 10px;height:34px;"><input type="text" class="wsw' +
        b + '" name="wordlist" onBlur="wsMakeIsValidWord(\'' + c + "', " + b + ')" style="width:180px;margin:0" spellcheck=true /> <div class="inlErr"></div></div>';
    $("#make-word-search").append(a + '<div style="clear:both"></div>' + ('<br><br><a class="fBtn" style="margin-left:10px;display:block;width:240px" id="subBtn" onclick="wsMakeSubmit(\'' + c + "')\">Save Puzzle</a>") + '<p style="margin-left:10px;font-size:11px">Note: Changes cannot be made once you save, so please make sure your puzzle is finished and correct before pressing "Save"</p></form>');
    return c
}

function wsMakeIsValidWord(a, c) {
    var b = $.trim($("#wsMakeForm_" + a + " .wsw" + c).val());
    if (1 > b.length) return 2;
    var d = "",
        e = b.split(" ").length - 1,
        f = /^[A-Za-z '-.]*$/;
    if (0 < b.length)
        if (2 < e) d = "Too many words, max is three";
        else if (f.test(b))
        if (e = b.replace(/ /g, "").length, 0 < e && 3 > e) d = "Word is too short";
        else if (e > maxWordLength) d = "Word is too long";
    else
        for (e = 0; e < numWords && e != c; e++) {
            f = $.trim($("#wsMakeForm_" + a + " .wsw" + e).val());
            if (0 === f.length) break;
            if (-1 < f.search(RegExp(b, "i"))) {
                d = "Is contained in the word, " + f;
                break
            } else if (-1 < b.search(RegExp(f, "i"))) {
                d = "Contains all of the word, " + f;
                break
            }
        } else d = "Only letters a-z plus '-, are allowed";
    $("#wsMakeForm_" + a + " .wsw" + c + " + .inlErr").html(d);
    return 0 < d.length ? 0 : 1
}

function wsMakeIsValidTitle(a) {
    var c = $.trim($("#wsMakeForm_" + a + ' input[name="title"]').val()),
        b = "";
    4 > c.length ? b = "Title is too short" : 40 < c.length && (b = "Title is too long");
    $("#wsMakeForm_" + a + ' input[name$="title"] + .inlErr').html(b);
    if (0 < b.length) return !1;
    doesTitleExist(a, c);
    return !0
}

function doesTitleExist(a, c) {
    var b = window.allPuzzlesCache;
    for (i in window.allPuzzlesCache)
        if (c.toLowerCase() == b[i].title.toLowerCase()) {
            b = '<span style="color:#15B71E">Just to let you know a puzzle already exists with this title, <a href="/puzzle/' + b[i].id + '/" target="_blank">check it out here</a><br>You may still continue creating another one if you like</span>';
            $("#wsMakeForm_" + a + ' input[name$="title"] + .inlErr').html(b);
            break
        }
}

function wsMakeIsValidDesc(a) {
    var c = $.trim($("#wsMakeForm_" + a + ' textarea[name="desc"]').val()),
        b = "";
    6 > c.length ? b = "Description is too short" : 255 < c.length && (b = "Description is too long");
    $("#wsMakeForm_" + a + ' textarea[name$="desc"] + .inlErr').html(b);
    return 0 < b.length ? !1 : !0
}

function wsMakeSubmit(a) {
    if (submitting) alert("Form is currently being submitted");
    else {
        var c = !0;
        wsMakeIsValidTitle(a) || (c = !1);
        wsMakeIsValidDesc(a) || (c = !1);
        for (var b = 0, d = 0; d < numWords; d++)(wordStatus = wsMakeIsValidWord(a, d)) ? 1 === wordStatus && b++ : c = !1;
        !1 === c ? alert("Errors have been found, please review your submission") : 10 > b ? alert("Not enough words provided. Minimum is 10.") : (c = JSON.stringify($("#wsMakeForm_" + a).serializeObject()), wsSubmitBegun(), $.ajax({
            url: ajaxuri + "savewordsearch/",
            dataType: "json",
            type: "POST",
            data: "json=" + c,
            success: function(b) {
                wsSubmitEnded();
                b.id && $("#wsMakeForm_" + a + ' input[name="id"]').val(b.id);
                wsHandleReturnedError(b) || (admin ? ($("#wsMakeForm_" + a).prepend('<div style="background:#F13232;color:#fff;padding:12px;font-weight:bold;">Puzzle was saved</div>'), window.scrollTo(0, 0)) : (b.hash && storeLocalPuzzle(b.id, b.hash), $("#howto").hide(), $("#notes").hide(), $("#make-word-search").html('<div class="msg">' + b.message + '<p><a class="mdBtn" href="/maker/">Make another</a> <a class="mdBtn" style="cursor:pointer" onclick="userEditPuzzle(' +
                    b.id + ", '" + b.hash + "')\">Edit This Puzzle</a></p></div>"), addShares()))
            },
            error: wsHandleAjaxFail
        }))
    }
}

function wsCapWords(a) {
    for (var c = 0; c < numWords; c++) {
        var b = toTitleCase($.trim($("#wsMakeForm_" + a + " .wsw" + c).val()));
        $("#wsMakeForm_" + a + " .wsw" + c).val(b)
    }
}

function wsLowercaseWords(a) {
    for (var c = 0; c < numWords; c++) {
        var b = $.trim($("#wsMakeForm_" + a + " .wsw" + c).val().toLowerCase());
        $("#wsMakeForm_" + a + " .wsw" + c).val(b)
    }
}

function wsCapTitle(a) {
    a = $("#wsMakeForm_" + a + ' input[name="title"]');
    a.val(toTitleCase($.trim(a.val())))
}

function wsLowercaseTitle(a) {
    a = $("#wsMakeForm_" + a + ' input[name="title"]');
    a.val($.trim(a.val().toLowerCase()))
}

function toTitleCase(a) {
    return a.replace(/\w\S*/g, function(a) {
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
    })
}

function genAutoDescription(a) {
    var c = $("#wsMakeForm_" + a + ' select[name="category"]').val(),
        b = $("#wsMakeForm_" + a + ' input[name="title"]').val(),
        d = [];
    switch (c) {
        case "3":
        case "9":
            d = ["A word search puzzle on the television show, " + b, "Play a word search on the tv show, " + b, "Word search puzzle covering the cast, characters and plots of the popular television show, " + b, 'Fans of the tv show "' + b + '" will love this word search game which covers characters and plot points form the series.', "Find the hidden words related to the hit television show, " +
                b, "Solve the word search game by finding all of the cast names, characters and plots which relate to the television series, " + b, "To solve the game find all of the words which relate to the television show, " + b, 'Hidden in the letter grid are words connected with the television show "' + b + '". Cast, characters and plot points are all included. Try to find them all as fast as you can.', 'Cast, characters and themes from the series "' + b + '" are hidden in this word search puzzle. Try to find them all as fast as you can.'
            ];
            break;
        case "10":
            d = ["A word search puzzle on the movie, " + b, "Play this word search game covering themes and characters from the movie, " + b, "This word search covers the characters and plots of the movie, " + b, "Find the hidden words associated with the movie, " + b, "Try to find all of the hidden words related to the movie, " + b, 'Hidden in the grid of letters are words connected with the movie "' + b + '", try and find them all as quickly as possible.', "Can you complete this Word search game by finding every word which is connected with the movie, " +
                b
            ];
            break;
        default:
            d = ["A word search puzzle all about " + b, "Find all of the words hidden in the letter grid which relate to " + b, "Try and find all of the words in the game which are connected with " + b, "A word search game covering the topic of " + b, "A collection of words which relate to " + b + " are hidden in this puzzle. Try to find as many as you can.", "Hidden in the puzzle grid are words which relate to " + b + ", try and find as many as you can as fast as you can.", "A word search puzzle based on words associated with " +
                b, "Solve the game by finding all of the words which relate to " + b, "To solve the word search puzzle you must find all of the words which relate to " + b, "Play this word search game based around the topic of " + b
            ]
    }
    1 < d.length && (c = d[Math.floor(Math.random() * d.length)], $("#wsMakeForm_" + a + ' textarea[name="desc"]').val(c))
}
$.fn.serializeObject = function() {
    var a = {},
        c = this.serializeArray();
    $.each(c, function() {
        void 0 !== a[this.name] ? (a[this.name].push || (a[this.name] = [a[this.name]]), a[this.name].push(this.value || "")) : a[this.name] = this.value.replace(/&/g, "%26") || ""
    });
    return a
};

function wsSubmitBegun() {
    submitting = !0;
    $("#wsMakeForm #subBtn").text("Saving...")
}

function wsSubmitEnded() {
    submitting = !1;
    $("#wsMakeForm #subBtn").text("Submit")
}

function wsHandleAjaxFail() {
    wsSubmitEnded();
    alert("Communication with the server has failed")
}

function wsHandleReturnedError(a) {
    return a.error ? (alert("Error : " + a.message), !0) : !1
}

function getLocalPuzzleById(a) {
    if (_isLocalStore()) {
        if (localStorage.puzzles) {
            puzzles = JSON.parse(localStorage.puzzles);
            for (var c = 0; c < puzzles.length; c++)
                if (puzzles[c].id == a) return !0
        }
        return !1
    }
}

function storeLocalPuzzle(a, c) {
    if (_isLocalStore()) {
        var b = [];
        localStorage.puzzles && (b = JSON.parse(localStorage.puzzles));
        getLocalPuzzleById(a) || b.push({
            id: a,
            hash: c
        });
        localStorage.puzzles = JSON.stringify(b)
    }
}

function removeLocalPuzzle(a) {
    if (_isLocalStore()) {
        puzzles = JSON.parse(localStorage.puzzles);
        for (var c = 0; c < puzzles.length; c++)
            if (puzzles[c].id == a) {
                puzzles.splice(c, 1);
                localStorage.puzzles = JSON.stringify(puzzles);
                break
            }
    }
}

function loadLocalPuzzles(a) {
    if (_isLocalStore() && localStorage.puzzles) {
        var a = document.getElementById(a),
            c = document.getElementById("howto");
        puzzles = JSON.parse(localStorage.puzzles);
        if (!(1 > puzzles.length)) {
            var b;
            b = '<h2>Puzzles you created</h2><br/><div class="imagelist">';
            for (var d = 0; d < puzzles.length; d++) {
                var e = "/static/puzzle/word-search-" + puzzles[d].id + ".png";
                b += '<div class="row" data-id="' + puzzles[d].id + '"><a href="/puzzle/' + puzzles[d].id + '/" target="_blank"><img style="width:220px" src="' + e + '"></a>';
                b += '<div style="display:inline-block;vertical-align:top;margin:40px"><div class="shareBtns" data-id="' + puzzles[d].id + '" data-url="http://thewordsearch.com/puzzle/' + puzzles[d].id + '/" data-title="Word Search Puzzle"></div>';
                b += '<div><br/><a class="smBtn" href="/puzzle/' + puzzles[d].id + '/" target="_blank">Play This Puzzle</a> <a class="smBtn" href="/puzzle/' + puzzles[d].id + '/-/downloadable/" target="_blank">Print This Puzzle</a><br/><a class="smBtn" style="cursor:pointer" onclick="userEditPuzzle(' + puzzles[d].id +
                    ", '" + puzzles[d].hash + '\')">Edit This Puzzle</a> <a class="smBtn" style="cursor:pointer" onclick="userDeletePuzzle(' + puzzles[d].id + ", '" + puzzles[d].hash + "')\">Delete This Puzzle</a></div>";
                b += "</div><br/><br/><hr/><br/><br/></div>";
                removeDeletedPuz(e, puzzles[d].id)
            }
            a.innerHTML = b + "</div><p>Puzzles you create can only be edited on the same machine and browser which was used to create them. Puzzles on topics which would interest a wide audience may be kept on the site forever. Personal puzzles may be automatically removed after 60 days.</p>";
            c.innerHTML = "Please scroll down to manage your existing puzzles";
            addShares()
        }
    }
}

function _isLocalStore() {
    try {
        var a = "localStorage" in window && null !== window.localStorage
    } catch (c) {
        a = !1
    }
    return a
}

function removeDeletedPuz(a, c) {
    var b = new Image;
    b.onerror = function() {
        $("div").find("[data-id='" + c + "']").remove();
        removeLocalPuzzle(c)
    };
    b.src = a
}

function userDeletePuzzle(a, c, b) {
    b ? ($.get("/api/delete/?id=" + a + "&hash=" + c, function() {}), removeLocalPuzzle(a), $("div").find("[data-id='" + a + "']").remove()) : !0 == confirm("Are you sure you want to delete this puzzle ?") && userDeletePuzzle(a, c, !0)
}

function userEditPuzzle(a, c) {
    $("body").append('<form action="/maker/edit/" method="POST" id="editform"><input type="hidden" name="id" value="' + a + '" /><input type="hidden" name="hash" value="' + c + '" /><input type="submit" value="Submit" style="visibility:hidden"></form>');
    $("#editform").submit()
}

function _GET(a) {
    for (var c = window.location.search.substring(1).split("&"), b = 0; b < c.length; b++) {
        var d = c[b].split("=");
        if (d[0] == a) return unescape(d[1])
    }
    return !1
}

function wsMakeGetPuzzle(a, c) {
    $.ajax({
        url: ajaxuri + "getwordsearch/",
        dataType: "json",
        async: !1,
        type: "GET",
        data: "id=" + a,
        success: c,
        error: wsHandleAjaxFail
    })
}

function wsMakeGetCategories() {
    $.ajax({
        url: ajaxuri + "getCategories/",
        dataType: "json",
        async: !1,
        success: function(a) {
            categoriesData = a
        },
        error: wsHandleAjaxFail
    })
}

function wsMakeFillForm(a, c) {
    $("#wsMakeForm_" + a + ' input[name="title"]').val(c.title);
    $("#wsMakeForm_" + a + ' textarea[name="desc"]').val(c.description);
    $("#wsMakeForm_" + a + ' input[name="id"]').val(c.id);
    admin && ($("#wsMakeForm_" + a).prepend('<b style="color:red">Played ' + editData.played + " times</b>"), $("#wsMakeForm_" + a + " input[name=status][value=" + c.status + "]").prop("checked", !0));
    for (var b = $("#wsMakeForm_" + a + ' select[name="category"]').empty(), d = 0; d < categoriesData.length; d++) sel = editData.category_id ==
        categoriesData[d].id ? "selected" : "", b.append("<option value=" + categoriesData[d].id + " " + sel + ">" + categoriesData[d].title + "</option>");
    for (d = 0; d < c.wordlist.length; d++) $("#wsMakeForm_" + a + " .wsw" + d).val(c.wordlist[d])
};