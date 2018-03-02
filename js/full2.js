(function(b) {
    b.fn.jqm = function(a) {
        var k = {
            overlay: 50,
            overlayClass: "jqmOverlay",
            closeClass: "jqmClose",
            trigger: ".jqModal",
            ajax: d,
            ajaxText: "",
            target: d,
            modal: d,
            toTop: d,
            onShow: d,
            onHide: d,
            onLoad: d
        };
        return this.each(function() {
            if (this._jqm) return i[this._jqm].c = b.extend({}, i[this._jqm].c, a);
            g++;
            this._jqm = g;
            i[g] = {
                c: b.extend(k, b.jqm.params, a),
                a: d,
                w: b(this).addClass("jqmID" + g),
                s: g
            };
            k.trigger && b(this).jqmAddTrigger(k.trigger)
        })
    };
    b.fn.jqmAddClose = function(a) {
        return n(this, a, "jqmHide")
    };
    b.fn.jqmAddTrigger = function(a) {
        return n(this,
            a, "jqmShow")
    };
    b.fn.jqmShow = function(a) {
        return this.each(function() {
            a = a || window.event;
            b.jqm.open(this._jqm, a)
        })
    };
    b.fn.jqmHide = function(a) {
        return this.each(function() {
            a = a || window.event;
            b.jqm.close(this._jqm, a)
        })
    };
    b.jqm = {
        hash: {},
        open: function(a, k) {
            var c = i[a],
                e = c.c,
                l = "." + e.closeClass,
                h = parseInt(c.w.css("z-index")),
                h = 0 < h ? h : 3E3,
                f = b("<div></div>").css({
                    height: "100%",
                    width: "100%",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    "z-index": h - 1,
                    opacity: e.overlay / 100
                });
            if (c.a) return d;
            c.t = k;
            c.a = !0;
            c.w.css("z-index", h);
            e.modal ?
                (j[0] || o("bind"), j.push(a)) : 0 < e.overlay ? c.w.jqmAddClose(f) : f = d;
            c.o = f ? f.addClass(e.overlayClass).prependTo("body") : d;
            if (p && (b("html,body").css({
                    height: "100%",
                    width: "100%"
                }), f)) {
                var f = f.css({
                        position: "absolute"
                    })[0],
                    g;
                for (g in {
                        Top: 1,
                        Left: 1
                    }) f.style.setExpression(g.toLowerCase(), "(_=(document.documentElement.scroll" + g + " || document.body.scroll" + g + "))+'px'")
            }
            e.ajax ? (h = e.target || c.w, f = e.ajax, h = "string" == typeof h ? b(h, c.w) : b(h), f = "@" == f.substr(0, 1) ? b(k).attr(f.substring(1)) : f, h.html(e.ajaxText).load(f, function() {
                e.onLoad &&
                    e.onLoad.call(this, c);
                l && c.w.jqmAddClose(b(l, c.w));
                q(c)
            })) : l && c.w.jqmAddClose(b(l, c.w));
            e.toTop && c.o && c.w.before('<span id="jqmP' + c.w[0]._jqm + '"></span>').insertAfter(c.o);
            e.onShow ? e.onShow(c) : c.w.show();
            q(c);
            return d
        },
        close: function(a) {
            a = i[a];
            if (!a.a) return d;
            a.a = d;
            j[0] && (j.pop(), j[0] || o("unbind"));
            a.c.toTop && a.o && b("#jqmP" + a.w[0]._jqm).after(a.w).remove();
            if (a.c.onHide) a.c.onHide(a);
            else a.w.hide(), a.o && a.o.remove();
            return d
        },
        params: {}
    };
    var g = 0,
        i = b.jqm.hash,
        j = [],
        p = !1,
        d = !1,
        r = b('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({
            opacity: 0
        }),
        q = function(a) {
            p && (a.o ? a.o.html('<p style="width:100%;height:100%"/>').prepend(r) : b("iframe.jqm", a.w)[0] || a.w.prepend(r));
            s(a)
        },
        s = function(a) {
            try {
                b(":input:visible", a.w)[0].focus()
            } catch (d) {}
        },
        o = function(a) {
            b()[a]("keypress", m)[a]("keydown", m)[a]("mousedown", m)
        },
        m = function(a) {
            var d = i[j[j.length - 1]];
            (a = !b(a.target).parents(".jqmID" + d.s)[0]) && s(d);
            return !a
        },
        n = function(a, g, c) {
            return a.each(function() {
                var a = this._jqm;
                b(g).each(function() {
                    this[c] || (this[c] = [], b(this).click(function() {
                        for (var a in {
                                jqmShow: 1,
                                jqmHide: 1
                            })
                            for (var b in this[a])
                                if (i[this[a][b]]) i[this[a][b]].w[a](this);
                        return d
                    }));
                    this[c].push(a)
                })
            })
        }
})(jQuery);
dD = document;
ajax = "Microsoft Internet Explorer" == navigator.appName ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest;

// Comment box that we have now removed, unnecessary
function submitComment(a) {
    c = dD.getElementById("cmBox").value;
    checkComment() ? alert("Cannot submit comment until the problems are corrected") : (c = c.replace(/\n{3,}/g, "\n\n"), ajax.open("GET", "/api/comment/?puzzleid=" + a + "&comment=" + c, !1), ajax.send(null), ajax.responseText ? alert(ajax.responseText) : dD.getElementById("cmInput").innerHTML = "<b>Thank you, your comment was received</b><p>" + c.replace(/\n/g, "<br />") + "</p>")
}

// Comment box that we have now removed, unnecessary
function checkComment() {
    c = dD.getElementById("cmBox").value;
    e = dD.getElementById("cmErr");
    if (c.match(/(<([^>]+)>)/ig)) return e.innerHTML = "Sorry, comments in plain text only", 1;
    if (profanityCheck(c)) return e.innerHTML = "Clean language only in comments please", 1;
    e.innerHTML = "";
    return 0
}

// Comment box that we have now removed, unnecessary
function mustLogin() {
    dD.getElementById("cmErr").innerHTML = "Please login below first before writing your comment"
}
var profaneWords;

// Looks like it should be called by maker.html
function profanityCheck(a) {
//    console.log("PROFANITYCHECK");
    profaneWords || (profaneWords = "r,e,k,n,a,w,|,t,u,l,s,|,k,c,i,r,p,|,r,e,g,g,i,n,|,e,l,o,h,e,s,r,a,|,e,l,o,h,s,s,a,|,k,c,i,d,|,k,c,o,c,|,y,s,s,u,p,|,s,t,i,t,|,t,1,h,s,|,t,n,u,c,|,k,c,u,f,|,t,i,h,s".split(",").reverse().join(""));
    return RegExp(profaneWords, "i").test(a) ? 1 : 0
}
loginpop = function(a) {
    "fb" == a ? popOpen("fbLogin", "/user/facebook_login/", 600, 400, !0) : "tw" == a && popOpen("twLogin", "/user/twitter_login/", 700, 655, !0)
};

// Unnecessary, we do not need fb/twitter logins
function popOpen(a, b, f, d, g, i) {
    if (a && b) {
        f || (f = 500);
        d || (d = 400);
        var f = "location=0,status=0,width=" + f + ",height=" + d + ",scrollbars=0,top=" + (screen.height / 2 - d / 2) + ",left=" + (screen.width / 2 - f / 2),
            i = i || function() {
                g && window.location.reload()
            },
            h = this;
        h._oauthWin = window.open(b, a, f);
        h._oauthInterval = window.setInterval(function() {
            h._oauthWin.closed && (window.clearInterval(h._oauthInterval), i())
        }, 1E3)
    }
}
var s_id, s_pImg, s_title, s_eTitle, s_url;
addShares = function(a) {
    if (!a) {
        var b = $(".shareBtns").attr("data-url");
        b || (b = document.URL);
        $(".shareBtns").attr("data-id");
        var f = $(".shareBtns").attr("data-img"),
            d = $(".shareBtns").attr("data-title"),
            g = "Word Search Puzzle - " + d
    }
    a = !1;
    "Play Hangman" == d && (a = !0);
    d = "" + ('<li class="shFb" title="Facebook" onclick="shareWin(\'//www.facebook.com/sharer.php?u=' + b + "', 566, 378)\"></li>");
    d = (a ? d + ('<li class="shTw" title="Twitter" onclick="shareWin(\'//twitter.com/intent/tweet?text=Play Hangman Online, ' + b + "&hashtags=hangman,wordgame,puzzle,game', 750, 540)\"></li>") :
        d + ('<li class="shTw" title="Twitter" onclick="shareWin(\'//twitter.com/intent/tweet?text=Play an online word search puzzle, ' + b + "&hashtags=word,search,wordsearch,puzzle,game', 750, 540)\"></li>")) + ('<li class="shGp" title="Google+" onclick="shareWin(\'//plus.google.com/share?url=' + b + "', 500, 600)\"></li>");
    f && (g = "<b><big><big>" + g + '</big></big><br><br>Play word search puzzles online @ <br><big><a href="https://thewordsearch.com">thewordsearch.com</a></b></big>', d += '<li class="shTum" title="Tumblr" onclick="shareWin(\'//www.tumblr.com/share/photo?source=' +
        encodeURIComponent(f) + "&click_thru=" + encodeURIComponent(b) + "&caption=" + encodeURIComponent(g) + "', 500, 520)\"></li>", d += '<li class="shPin" title="Pinterest" onclick="shareWin(\'//www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(b) + "&media=" + encodeURIComponent(f) + "&description=" + encodeURIComponent("Play word search puzzles on-line, including this one.\n\nMore at...\nhttps://thewordsearch.com") + "', 784, 382)\"></li>");
    $(".shareBtns").html("<ul>" + d + "</ul>")
};

// Unnecessary
function shareWin(a, b, f) {
    window.open(a, "shareWin", "height=" + f + ",width=" + b + ",resizable=no,scrollbars=no,toolbar=no,status=no", !0)
}



// Called when game is finished; is the little green box
function addFollows() {
//    console.log("ADDFOLLOWS");
    if (!(0 >= $(".followBtns").length)) {
        $(".followBtns").html('<p style="font-size:1.2em;font-weight:bold;line-height:1.6em;margin:0;">We post new puzzles daily</p><p style="font-size:.8em;line-height:1.2em;margin:0;">Follow us and keep updated</p><div style="margin:6px"><div class="g-follow" data-annotation="bubble" data-height="24" data-href="//plus.google.com/110201874159160040936" data-rel="publisher"></div></div>').show();
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.async = !0;
        a.src = "https://apis.google.com/js/platform.js";
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b)
    }
}(function() {
    if (-1 < navigator.userAgent.toLowerCase().indexOf("android")) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.async = !0;
        a.src = "/js/mobile-app-notify.m.js";
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b)
    }
})();

var i = !0,
    k = null,
    l = !1;
window.loadGameDataWeb = aa;
window.init = m;
window.unHighlightCells = ba;
window.loadSettings = ca;
var n = k,
    o = k,
    p = k,
    q = k,
    da, r, s = k,
    u = k,
    v = 0.1,
    ea = k,
    w = [],
    y = k,
    z = 44,
    A = 0,
    C = 4,
    fa = "bold 16pt Calibri, Trebuchet MS, Arial",
    ga = "bold 12pt  Arial, Calibri, Trebuchet MS",
    D = "#ad00cc,#006633,#CC3300,#1c3fd3,#1dcb16,#9B4E00,#336666,#337c0c,#3c0879,#97001E".split(","),
    F = 14,
    G = 14,
    J = 176,
    K = 0,
    ha = F * G,
    L = [],
    M = [],
    ia = l,
    N = k,
    O = k,
    P = k,
    Q = 0,
    ja, ka, la, ma, na, R = ca();
    orig = [];              // added by me to fix word bank bug
    origFlag = false;
    //audioButton = document.getElementById("audioGraphic")

// Called in beginning; seems to contain the list of words, and gets passed into loadGameDataWeb
function aa(a) {
    //console.log("aaaaaaa");
    v = 0;
    u = {
        c: []
    };
    u.c[0] = {};
    u.c[0].e = [];
    a = JSON.parse(a);
    u.c[0].e[0] = {};
    u.c[0].e[0].id = a.id;
    u.c[0].e[0].title = a.title;
    u.c[0].e[0].j = a.words
}

// Called at beginning, seems to be the main function creating the game
function m(a, c) {
    //a = gameGrid
    s = a;
    try {
        var b = new Audio("");
        b.canPlayType && ("no" != b.canPlayType("audio/mpeg") && "" != b.canPlayType("audio/mpeg") ? (ja = new Audio("/sounds/success.mp3"), ka = new Audio("/sounds/fail.mp3"), la = new Audio("/sounds/finished.mp3")) : "no" != b.canPlayType("audio/ogg") && "" != b.canPlayType("audio/ogg") && (ja = new Audio("/sounds/success.ogg"), ka = new Audio("/sounds/fail.ogg"), la = new Audio("/sounds/finished.ogg")))
    } catch (j) {
        R.audio = l
    }
    N = (z + A) * F + C + C;
    O = (z + A) * G + C + C;
    da = N + J;
    r = O + K;
    document.getElementById(a).setAttribute("style",
        "position:relative;height:" + r + "px");
    n = oa("wsGrid", da, r, a);
    n.setAttribute("style", "position:absolute;top:0px;left:0px;");
    o = n.getContext("2d");
    p = oa("wsGridOverlay", N, O, a);
    p.setAttribute("style", "position:absolute;top:0px;left:0px;");
    q = p.getContext("2d");
    //console.log("mehh" + c);
    if (c) {
        //console.log("c;" + c);
        for (var d = 0; d < w.length; d++) w[d].d = l;
        $("#wsGridOverlay").bind("mousedown", pa);
        R.dragSelect && $("#wsGridOverlay").bind("mouseup", qa);
        $("#wsGrid").bind("mousedown", ra);     // RA CALLED HERE ------------------------------------------------------

        P = S()
    } else if (M = [], w = [], L = [], $("#wsGridOverlay").bind("mousedown", pa), R.dragSelect &&
        $("#wsGridOverlay").bind("mouseup", qa), $("#wsGrid").bind("mousedown", ra), ia) {      // RA CALLED HERE ------
        //console.log("elseif");
        if (d = localStorage.getItem("savedState"), d !== k) {
            d = JSON.parse(d);
            M = d.n;
            w = d.r;
            v = d.p;
            Q = d.q;
            P = S() - Q;
            //console.log("d: " + d);  // did not show up, will test more later
            for (d = 0; d < w.length; d++)
                if (w[d].d == i) {
                    sa(d, w[d].f, w[d].h);
                    var e = d,
                        b = w[d].f,
                        h = w[d].h;
                    w[e].d = i;
                    w[e].f = b;
                    w[e].h = h;
                    ta()
                }
        }
    } else {
        //console.log("else");
        -1 == v ? (b = [], b[0] = Math.floor(Math.random() * u.c.length), b[1] = Math.floor(Math.random() * u.c[b[0]].e.length)) : (b = v.toString().split("."), b[1] || (b[1] = 0));
        ea = u.c[b[0]].e[b[1]].id;
        //console.log(u.c[b[0]].e[b[1]]);   // includes id, title, and list of words
        for (h = 0; h < u.c[b[0]].e[b[1]].j.length; h++) {
            var f = {};
            f.i = u.c[b[0]].e[b[1]].j[h].toUpperCase();
            f.g = f.i.replace(/[ '-.]/gi, "");  //getting rid of space or hyphen
            //console.log(f.g);
            f.d = l;
            f.f = k;
            f.h = k;
            w[h] = f;
            //console.log(w[h].i);
            //console.log(f.i); //prints out word
        }
        for (b = 0; b < w.length; b++) {
            var B, h = w[b].g.length,
                f = "tb,tb,tb,lr,lr,lr".split(",");
            R.allowReverseWords = false;    //added by me
            //R.allowReverseWords == i && (f = f.concat(["rl", "rl", "bt", "bt"]));
            h <= Math.min(F, G) && (R.allowDiagonalWords == i && (f = f.concat(["tlbr", "tlbr", "bltr"])), R.allowReverseWords == false && R.allowDiagonalWords == i /*&& (f = f.concat(["trbl", "brtl"]))*/); // comment out to prevent reverse words?
            h > F && (T(f, "lr"), T(f, "rl"));
            h > G && (T(f, "tb"), T(f, "bt"));
            B = f[Math.floor(Math.random() * f.length)];
            //console.log(R.allowReverseWords);
            var h = w[b].g,
                f = B,
                x = [],
                t = 0;
            //console.log(G); // some number
            //console.log(h); // prints out individual word
            //console.log(f); // prints out tlbr stuff, which essentially tells you which direction the word goes in
                            // bt, rl, brtl, trbl are bad
            if ("lr" == f || "rl" == f) {
                for (var g = 0; g < h.length; g++) x[g] = h[g];
                "rl" == f && x.reverse()
                //console.log("1: " + x); // deals with horizontal
            } else if ("tb" == f || "bt" == f) {
                for (g = 0; g < h.length; g++) t = 0 == g ? 0 : g * F, x[t] = h[g];
                "bt" == f && x.reverse()
                //console.log("2: " + x); // deals with vertical
            } else if ("tlbr" == f || "brtl" == f) {
                "brtl" == f && (h = h.reverse());
                for (g = 0; g < h.length; g++) t = 0 == g ? 0 : g * F + g, x[t] = h[g]; // this line is needed to create the word in the word bank
                //console.log(x); // x sets the word in the board
                //console.log("3: " + h);
            } else if ("trbl" == f || "bltr" == f) {
                "bltr" == f && (h = h.reverse());
                for (g = 0; g < h.length; g++) t = 0 == g ? h.length - 1 : g * F - g + (h.length - 1), x[t] = h[g];
                for (g = 1; g < h.length; g++) x[t + g] = k
            }
            h = x;
            f = l;
            if (20 > b) {
                var f = h,
                    h = w[b].g,
                    x = b,
                    E = Math.ceil(f.length /
                        F),
                    H = f.length + F - E * F;
                if (E * H < h.length) f = l;
                else {
                    t = [];
                    for (g = 0; g < ha; g++) {
                        var I = F * (G - 1) + (g - Math.floor(g / F) * F);
                        g + H <= F * Math.ceil((g + 1) / F) && g + E * F <= I && M[g] == k && t.push(g)
                    }
                    E = l;
                    b: for (; 0 < t.length;) {
                        d = M.slice();
                        H = Math.floor(Math.random() * (t.length - 1));
                        e = t[H];
                        for (g = 0; g < f.length; g++)
                            if (I = e + g, f[g] != k)
                                if (d[I] == k || d[I] == f[g]) d[I] = f[g];
                                else {
                                    t.splice(H, 1);
                                    continue b
                                }
                        E = i;
                        break
                    }
                    E == i ? (f = e + 1, "rl" == B || "trbl" == B ? f = e + h.length : "bt" == B || "bltr" == B ? f = e + (h.length - 1) * F + 1 : "brtl" == B && (f = e + (h.length - 1) * F + h.length), w[x].f = f, M = d.slice(),
                        f = i) : f = l
                }
            }
            f || (w.splice(b, 1), b--)
        }
        d = "";
        for (e = 0; e < w.length; e++) d += w[e].g; // d is all of the words in one long string
        for (e = 0; e < ha; e++) R.kidMode && M[e] == k ? M[e] = " " : M[e] == k && (M[e] = d.charAt(Math.floor(Math.random() * d.length)));
        //console.log(M); // M is the entire board as an array of strings, left to right, top to bottom
        P = S();
        //console.log(P); // P is some random number hmm; but S() doesn't seem too important anyhow
    }
    for (d = 0; d < ha; d++) U(d, o);
    //console.log(o); // o is CanvasRenderingContext2D
    ta();
}

function S() {
    return (new Date).getTime() / 1E3
}

// Creating the actual game grid?
function oa(a, c, b, j) {
    var d = document.createElement("canvas");
    d.setAttribute("width", c);
    d.setAttribute("height", b);
    d.setAttribute("id", a);
    document.getElementById(j).appendChild(d);
    return d
}

// Called by function m() at the end
function ta() {
    // J, K, random numbers
    // l = boolean
    if (!(1 > J && 1 > K)) {
        var a = l;
        0 < K && (a = i);
        if (a) {
            var c = 8,
                b = O + 12;
            o.clearRect(c - 8, b - 12, N, K);
            var j = 8
        } else c = N + 10, b = 0, o.clearRect(c, b, J, O);
        o.globalAlpha = 1;
        o.font = ga;
        L = [];
        c += 20;    // Add 20 to c in order to move text to the right
        for (var d = 0; d < w.length; d++) {
            var e = o.measureText(w[d].i).width;
            a ? (j + e + 10 > N ? (c = 8, b += 30, j = 8) : c = j, j = j + e + 10) : b += 30;
            o.textBaseline = "middle";
            o.fillStyle = w[d].d ? "#777" : "#000";
            // HERE IS WHERE YOU WRITE THE WORD IN THE WORD BANK -------------------------------------------------------
            o.fillText(w[d].i, c, b);
            //console.log(c, b);    // c and b are the coordinates to write the text at
            audioButton = document.getElementById("audioGraphic")
            o.drawImage(audioButton, 630, b-10, 20, 20);    // PROBLEM: YOU NEED TO EXTEND THE AREA WHERE THE AUDIO IS TRIGGERED TO INCLUDE AUDIO BUTTON
            w[d].d && (o.globalAlpha = 0.8, o.strokeStyle = ua(d), o.beginPath(), o.lineWidth = 2, o.lineCap = "round", o.moveTo(c, b), o.lineTo(c + e, b), o.stroke(), o.globalAlpha =
                1);
            //console.log(e);
            if (w[d].d == l) {
                var h = {};
                h.x = c;
                h.y = b - 15;
                h.l = h.x + e;
                h.m = h.y + 30;
                h.k = d;
                L[L.length] = h
                //console.log(h.k);
                //console.log(L);
            }
        }
        if (!origFlag) {
            orig = L;
            origFlag = true;
        }
        //console.log("orig");
        //console.log(orig);
    }
}

function T(a, c) {
    //console.log("T");
    //console.log("a: " + a);
    for (var b = 0; b < a.length; b++) a[b] == c && (a.splice(b, 1), b--)
}
String.prototype.reverse = function() {
    return this.split("").reverse().join("")
};

// Called in ra(), but also by something else a lot it seems
function U(a, c, b) {
    var j = Math.floor(a / F + 1) * (z + A) - (z + A) + C,
        d = Math.floor(a % F + 1) * (z + A) - (z + A) + C;

    c.globalAlpha = 1;
    b ? (c.strokeStyle = "#FF9933", c.fillStyle = "#FFCD9B", c.lineWidth = 3, c.fillRect(d, j, z, z), c.strokeRect(d - 1, j - 1, z + 2, z + 2)) : (c.fillStyle = "#FFF", c.fillRect(d, j, z, z), R.showGrid && (c.strokeStyle = "#CCC", c.lineWidth = 1, c.strokeRect(d, j, z, z)));
    c.font = fa;
    c.textBaseline = "middle";
    c.fillStyle = "#000";
    b = c.measureText(M[a]).width;
    //console.log("U");
    //console.log(M[a]);    // prints out every letter in the board
    c.fillText(M[a], d + Math.floor((z - b) / 2), j + z / 2 + 1)
}

// Called when gamegrid is clicked
function pa(a) {
    //console.log("pa");
    a = V(a);
    if (!(a.x <= C || a.y <= C) && !(a.x >= N - C || a.y >= O - C)) R.dragSelect ? (y = W(a.x, a.y), $("#wsGridOverlay").bind("mousemove", va)) : y ? (a = W(a.x, a.y), U(a - 1, q, i), wa(a), setTimeout("unHighlightCells()", 300), y = k) : (y = W(a.x, a.y), U(y - 1, q, i))
}

// Called by m(a, c), when word is found
function qa(a) {
//    console.log("QA");
    a = V(a);
    a = W(a.x, a.y);
    //console.log(a);
    R.dragSelect && $("#wsGridOverlay").unbind("mousemove");
    X();
    wa(a)
}

// CALLED WHEN WORD IN WORD BANK IS CLICKED
// called from m(), when binding wsGrid
function ra(a) {
    //console.log("RA");
    //console.log(a);
    if (R.allowHints)
        //console.log(L);
        //console.log(orig);
        //console.log(y);     // this is the position of the hint in the gamegrid
        for (var a = V(a), c = 0; c < orig.length; c++) {
            a.x >= orig[c].x-25 && a.x <= orig[c].l && a.y >= orig[c].y && a.y <= orig[c].m && (X(), (y = w[orig[c].k].d ? -1 : w[orig[c].k].f), U(y - 1, q, i), wrd = w[orig[c].k], tts(wrd.i));
            // SUBTRACT 25 FROM ORIG[C].X ABOVE IN ORDER TO EXTEND HIT BOX IN INCLUDE AUDIO BUTTON
            // (y = w[orig[c].k].d ? -1 : w[orig[c].k].f)  // my fix
            // y = w[L[c].k].f    // original code
        }
        // wrd.d tells you whether a word has been found yet
        //tts(wrd.i); // THIS CAUSES WORD TO BE SPOKEN WHEN CLICKED ON IN THE WORD BANK ----------------------------------
                    // PROBLEM: STOPS WORKING WHEN CROSSED OUT; WILL SIMPLY REPEAT THE LAST WORD CLICKED
                    // OKAY, FIXED BY MAKING A COPY OF L NAMED ORIG AND USING THAT INSTEAD
                    // NEW MINOR PROBLEM: HINT STILL APPEARS FOR ALREADY FOUND WORDS
                    // SOLVED BY SETTING Y = -1 IF WORD HAS ALREADY BEEN FOUND
                    // UPDATE: MOVED TTS TO INSIDE LOOP UP THERE SO THAT WORD IS NOT SPOKEN WHEN CANVAS, BUT NOT WORD IS CLICKED
}

function ba() {
    X()
}

// Called when mouse released on gamegrid after trying to highlight word
function xa(a) {
//    console.log("xa");
    for (var c = 0; c < w.length; c++)
        if (a == w[c].g) return w[c].d ? -1 : c;
    a = a.reverse();
    for (c = 0; c < w.length; c++)
        if (a == w[c].g)
            if (w[c].d) break;
            else return c;
    return -1
}

// Called by qa(); seems to be called when word is found
function wa(a) {
    //console.log("wa");
    var c = y,
        b;
    a: if (c == a) b = "";
        else {
            b = "";
            var j = ya(c),
                d = ya(a);
            if (j.b == d.b)
                if (j.a < d.a)
                    for (var e = j.a; e < d.a + 1; e++) b += M[Y(j.b, e) - 1];
                else
                    for (e = j.a; e >= d.a; e--) b += M[Y(j.b, e) - 1];
            else if (j.a == d.a)
                if (j.b < d.b)
                    for (e = j.b; e < d.b + 1; e++) b += M[Y(e, j.a) - 1];
                else
                    for (e = j.b; e >= d.b; e--) b += M[Y(e, j.a) - 1];
            else {
                if (Math.abs(j.b - d.b) != Math.abs(j.a - d.a)) {
                    b = "";
                    break a
                }
                if (a > c)
                    if (d.a > j.a)
                        for (e = c; e <= a; e = e + F + 1) b += M[e - 1];
                    else
                        for (e = c; e <= a; e = e + F - 1) b += M[e - 1];
                else if (j.a > d.a)
                    for (e = c; e >= a; e = e - F - 1) b += M[e - 1];
                else
                    for (e = c; e >= a; e = e -
                        F + 1) b += M[e - 1]
            }
        }
    if (b)
        // when word from wordbank is successfully found
        if (b = xa(b), -1 < b) {
            za("success");
            tts(w[b].g);
            //console.log(w[b]);
            sa(b, c, a);
            w[b].d = i;
            // f = starting index of the word
            w[b].f = c;

            // h = ending index of the word
            w[b].h = a;
            //console.log(w[b]);
            ta();
            a: {
                for (a = 0; a < w.length; a++)
                    if (w[a].d == l) {
                        a = l;
                        break a
                    }
                a = i
            }
            a && Aa()

        } else za("fail")
}
var count = 0
function tts(wordFound){
    //Set up Google TTS
    var msg = new SpeechSynthesisUtterance(wordFound);

    // Get list of voices to get female voice
    var voices = window.speechSynthesis.getVoices();



    // if voices is loaded
    if (voices.length > 0) {
        msg.voice = voices[3];

        msg.lang = 'en-US';
        window.speechSynthesis.speak(msg);
    } else {

        // wait on voices to be loaded before fetching list

        window.speechSynthesis.onvoiceschanged = function() {
         if(count == 0){

                count = count + 1;

            msg.voice = window.speechSynthesis.getVoices()[3];
            msg.lang = 'en-US';
            //console.log("hess")
            window.speechSynthesis.speak(msg);
             }
        };


    }
}

// Called when word is found
function sa(a, c, b) {
//    console.log("sa");
    c = Ba(c);
    c.x = c.x - z / 2 + C;
    c.y = c.y - z / 2 + C;
    b = Ba(b);
    b.x = b.x - z / 2 + C;
    b.y = b.y - z / 2 + C;
    Ca(o, ua(a), c, b)
}

// Called when word is found?
function ua(a) {
//    console.log("ua");
    for (; a >= D.length;) a -= D.length;
    return D[a]
}

// Called while highlighting a word, but not yet released
function va(a) {
//    console.log("va");
    var a = V(a),
        c = Ba(y);
    c.x = c.x - z / 2 + C;
    c.y = c.y - z / 2 + C;
    X();
    Ca(q, "#3399FF", c, a)
}

// Clear board
function X() {
    q.clearRect(0, 0, q.canvas.width, q.canvas.height)
}

// Called while highlighting word, but not yet released
function Ca(a, c, b, j) {
    a.globalAlpha = 0.3;
    a.beginPath();
    a.strokeStyle = c;
    a.lineWidth = 70 * (z / 100);
    a.lineCap = "round";
    a.moveTo(b.x, b.y);
    a.lineTo(j.x, j.y);
    a.stroke()
}

// Called when word in word bank is clicked, but also when it is clicked on in gamegrid
// Called by va(), ra(), ...???
function V(a) {
    //console.log("VA");
    for (var c = n, b = 0, j = 0; c && "BODY" != c.tagName;) b += c.offsetTop, j += c.offsetLeft, c = c.offsetParent;
    ma = b;
    na = j;
//    console.log(ma, na, c);
    c = {};     // Basically, c is just the coordinates of the word in the word bank
    c.x = a.clientX - na + window.pageXOffset;
    c.y = a.clientY - ma + window.pageYOffset;
//    console.log(a.clientX);
    return c
}

// Called when mousedown AND mouseup on the gamegrid
function W(a, c) {
//    console.log("WWWW");
    var b = z + A;
    return Y(Math.ceil((c - A / 2 - C) / b), Math.ceil((a - A / 2 - C) / b))
}

// Called when mousedown AND mouseup on the gamegrid
function Y(a, c) {
//    console.log("YYY");
    var b = 0;
    0 < c && 0 < a && (b = a * F + c - F);
    return b
}

// Called while highlighting word, but not yet released
function ya(a) {
//    console.log("ya");
    var c = {};
    c.b = Math.ceil(a / F);
    c.a = a - (c.b - 1) * F;
    return c
}

// Called while highlighting word, but not yet released
function Ba(a) {
//    console.log("Ba");
    var a = ya(a),
        c = z + A,
        b = {};
    b.x = a.a * c;
    b.y = a.b * c;
    return b
}

// Called when game is finished, called by wa()
function Aa() {
    Q = S() - P;
    localStorage.removeItem("savedState");
    $("#wsGridOverlay").unbind();
    $("#wsGrid").unbind();
    setTimeout(function() {
        za("finished");
        var a = $("#gameGrid").offset(),
            c = '<p style="font-size:28px;font-weight:bold">Game finished in <br>' + parseInt(Q, 10) + " Seconds</p>",
            c = '<div style="width:400px;height:480px;background:#DDDBD5;padding:16px;margin:60px 80px 60px auto;text-align:center;border-radius:10px;">' + (c + '<a href="/" class="resultBtn yellow" style="">Find Another Puzzle</a><a href="." class="resultBtn">Play Again</a><a href="#" onclick="$(\'html, body\').animate({scrollTop:$(\'#cmts\').position().top}, \'slow\');" class="resultBtn grey">Comment on this puzzle</a><br><div class="shareBtns wBorder"></div><div class="followBtns" style="padding:2px 20px;-moz-border-radius:10px;-webkit-border-radius:10px;border-radius:10px;text-align:center;background:#7EC546;width:280px;margin:10px auto;"></div>') +
            "</div>";
        $("body").append('<div id="wsGridResult" style="width:840px;height:' + r + "px;left:" + a.left + "px;top:" + a.top + 'px;position:absolute;z-index:99;background:#ccc; background: rgba(0, 0, 0, .6);">' + c + "</div>");
        addShares();
        addFollows();
        Da();
        a = document.createElement("script");
        a.type = "text/javascript";
        a.src = "/js/chromeapp-notify.m.js";
        document.body.appendChild(a)
    }, 700)
}

function za(a) {
    //R.audio && ("success" == a && ja.play(), "fail" == a && ka.play(), "finished" == a && la.play())
}

// Play again
function Da() {
    $.get("/api/logplayed/?id=" + ea, function() {})
}
btnPlayAgain = function() {
    $("#" + s).empty();
    $("#wsGridResult").remove();
    m(s, i)
};
btnRescramble = function() {
    $("#" + s).empty();
    $("#wsGridResult").remove();
    m(s)
};

// Settings
function ca() {
    var a = localStorage.getItem("settings");
    return a === k ? (a = {
        audio: i,
        showGrid: i,
        dragSelect: i,
        kidMode: l,
        allowHints: i,
        allowReverseWords: i,
        allowDiagonalWords: i
    }, localStorage.setItem("settings", JSON.stringify(a)), a) : JSON.parse(a)
}
changeSetting = function(a, c) {
    var b;
    a: switch (c.toLowerCase()) {
        case "true":
        case "1":
            b = i;
            break a;
        case "false":
        case "0":
        case k:
            b = l;
            break a;
        default:
            b = c
    }
    R[a] = b;
    localStorage.setItem("settings", JSON.stringify(R))
};
$().ready(function() {
    var a;
    a = '<span class="jqmClose closeIco">Close</span><h1>Settings</h1><div style="padding:14px 24px"><div style="float:left;width:50%">' + Z("audio", "Sounds", "Off", "On");
    a += Z("showGrid", "Display Grid Lines", "Off", "On");
    a += Z("dragSelect", "Word Selection Method", "Tap", "Drag");
    a = a + '<p class="tt">Drag : Selects words in grid by dragging across the hidden word<br />Tap : Selects words by taping the first and last letters in the grid</p>' + Z("kidMode", "Kids Mode", "Off", "On");
    a = a + '<p class="tt">Extra letters will no be added to the game grid making it easier to find the words</p></div><div style="float:left;width:50%">' +
        Z("allowHints", "Allow Hints", "Off", "On");
    a = a + '<p class="tt">When ON, taping on a word will highlight it\'s first letter in the grid</p>' /*+ Z("allowReverseWords", "Allow Reverse Words", "Off", "On");*/
    a = a /*+ '<p class="tt">When ON, words can appear in grid in reverse, either Right->Left  or Bottom->Top</p>'*/ + Z("allowDiagonalWords", "Allow Diagonal Words", "Off", "On");
    $("#settings").html(a + '<p class="tt">When ON, words can appear diagonally in the grid. If reverse setting above is also on, then words may appear diagonally reversed</p></div></div><div style="clear:both">');
    $("#audioFlip").val(R.audio.toString());
    $("#showGridFlip").val(R.showGrid.toString());
    $("#dragSelectFlip").val(R.dragSelect.toString());
    $("#kidModeFlip").val(R.kidMode.toString());
    $("#allowHintsFlip").val(R.allowHints.toString());
    /*$("#allowReverseWordsFlip").val(R.allowReverseWords.toString());*/
    $("#allowDiagonalWordsFlip").val(R.allowDiagonalWords.toString());
    $("#settings").jqm({
        o: i,
        trigger: "a.showSettings"
    })
});

function Z(a, c, b, j) {
    return '<label for="' + a + 'Flip" style="font-weight:bold">' + c + '</label><select name="' + a + '" id="' + a + 'Flip" onchange="changeSetting(\'' + a + '\', $(this).val())"><option value="false">' + b + '</option><option value="true">' + j + "</option></select>"
};