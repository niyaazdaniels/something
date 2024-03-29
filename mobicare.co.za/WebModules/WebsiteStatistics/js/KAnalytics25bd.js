(function () {
    ! function (e, t) {
        return "undefined" != typeof module && module.exports ? module.exports = t() : "function" == typeof define && define.amd ? void define([], function () {
            return e.TimeMe = t()
        }) : e.TimeMe = t()
    }(this, function () {
        var e = {
            startStopTimes: {},
            idleTimeoutMs: 3e4,
            currentIdleTimeMs: 0,
            checkStateRateMs: 250,
            active: !1,
            idle: !1,
            currentPageName: "default-page-name",
            timeElapsedCallbacks: [],
            userLeftCallbacks: [],
            userReturnCallbacks: [],
            trackTimeOnElement: function (t) {
                var n = document.getElementById(t);
                n && (n.addEventListener("mouseover", function () {
                    e.startTimer(t)
                }), n.addEventListener("mousemove", function () {
                    e.startTimer(t)
                }), n.addEventListener("mouseleave", function () {
                    e.stopTimer(t)
                }), n.addEventListener("keypress", function () {
                    e.startTimer(t)
                }), n.addEventListener("focus", function () {
                    e.startTimer(t)
                }))
            },
            getTimeOnElementInSeconds: function (t) {
                var n = e.getTimeOnPageInSeconds(t);
                return n ? n : 0
            },
            startTimer: function (t) {
                if (t || (t = e.currentPageName), void 0 === e.startStopTimes[t]) e.startStopTimes[t] = [];
                else {
                    var n = e.startStopTimes[t],
                        i = n[n.length - 1];
                    if (void 0 !== i && void 0 === i.stopTime) return
                }
                e.startStopTimes[t].push({
                    startTime: new Date,
                    stopTime: void 0
                }), e.active = !0
            },
            stopAllTimers: function () {
                for (var t = Object.keys(e.startStopTimes), n = 0; n < t.length; n++) e.stopTimer(t[n])
            },
            stopTimer: function (t) {
                t || (t = e.currentPageName);
                var n = e.startStopTimes[t];
                void 0 !== n && 0 !== n.length && (void 0 === n[n.length - 1].stopTime && (n[n.length - 1].stopTime = new Date), e.active = !1)
            },
            getTimeOnCurrentPageInSeconds: function () {
                return e.getTimeOnPageInSeconds(e.currentPageName)
            },
            getTimeOnPageInSeconds: function (t) {
                var n = e.getTimeOnPageInMilliseconds(t);
                return void 0 === n ? void 0 : e.getTimeOnPageInMilliseconds(t) / 1e3
            },
            getTimeOnCurrentPageInMilliseconds: function () {
                return e.getTimeOnPageInMilliseconds(e.currentPageName)
            },
            getTimeOnPageInMilliseconds: function (t) {
                var n = 0,
                    i = e.startStopTimes[t];
                if (void 0 !== i) {
                    for (var s = 0, o = 0; o < i.length; o++) {
                        var r = i[o].startTime,
                            a = i[o].stopTime;
                        void 0 === a && (a = new Date);
                        var d = a - r;
                        s += d
                    }
                    return n = Number(s)
                }
            },
            getTimeOnAllPagesInSeconds: function () {
                for (var t = [], n = Object.keys(e.startStopTimes), i = 0; i < n.length; i++) {
                    var s = n[i],
                        o = e.getTimeOnPageInSeconds(s);
                    t.push({
                        pageName: s,
                        timeOnPage: o
                    })
                }
                return t
            },
            setIdleDurationInSeconds: function (t) {
                var n = parseFloat(t);
                if (isNaN(n) !== !1) throw {
                    name: "InvalidDurationException",
                    message: "An invalid duration time (" + t + ") was provided."
                };
                return e.idleTimeoutMs = 1e3 * t, this
            },
            setCurrentPageName: function (t) {
                return e.currentPageName = t, this
            },
            resetRecordedPageTime: function (t) {
                delete e.startStopTimes[t]
            },
            resetAllRecordedPageTimes: function () {
                for (var t = Object.keys(e.startStopTimes), n = 0; n < t.length; n++) e.resetRecordedPageTime(t[n])
            },
            resetIdleCountdown: function () {
                e.idle && e.triggerUserHasReturned(), e.idle = !1, e.currentIdleTimeMs = 0
            },
            callWhenUserLeaves: function (e, t) {
                this.userLeftCallbacks.push({
                    callback: e,
                    numberOfTimesToInvoke: t
                })
            },
            callWhenUserReturns: function (e, t) {
                this.userReturnCallbacks.push({
                    callback: e,
                    numberOfTimesToInvoke: t
                })
            },
            triggerUserHasReturned: function () {
                if (!e.active)
                    for (var t = 0; t < this.userReturnCallbacks.length; t++) {
                        var n = this.userReturnCallbacks[t],
                            i = n.numberOfTimesToInvoke;
                        (isNaN(i) || void 0 === i || i > 0) && (n.numberOfTimesToInvoke -= 1, n.callback())
                    }
                e.startTimer()
            },
            triggerUserHasLeftPage: function () {
                if (e.active)
                    for (var t = 0; t < this.userLeftCallbacks.length; t++) {
                        var n = this.userLeftCallbacks[t],
                            i = n.numberOfTimesToInvoke;
                        (isNaN(i) || void 0 === i || i > 0) && (n.numberOfTimesToInvoke -= 1, n.callback())
                    }
                e.stopAllTimers()
            },
            callAfterTimeElapsedInSeconds: function (t, n) {
                e.timeElapsedCallbacks.push({
                    timeInSeconds: t,
                    callback: n,
                    pending: !0
                })
            },
            checkState: function () {
                for (var t = 0; t < e.timeElapsedCallbacks.length; t++) e.timeElapsedCallbacks[t].pending && e.getTimeOnCurrentPageInSeconds() > e.timeElapsedCallbacks[t].timeInSeconds && (e.timeElapsedCallbacks[t].callback(), e.timeElapsedCallbacks[t].pending = !1);
                e.idle === !1 && e.currentIdleTimeMs > e.idleTimeoutMs ? (e.idle = !0, e.triggerUserHasLeftPage()) : e.currentIdleTimeMs += e.checkStateRateMs
            },
            visibilityChangeEventName: void 0,
            hiddenPropName: void 0,
            listenForVisibilityEvents: function () {
                "undefined" != typeof document.hidden ? (e.hiddenPropName = "hidden", e.visibilityChangeEventName = "visibilitychange") : "undefined" != typeof doc.mozHidden ? (e.hiddenPropName = "mozHidden", e.visibilityChangeEventName = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (e.hiddenPropName = "msHidden", e.visibilityChangeEventName = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hiddenPropName = "webkitHidden", e.visibilityChangeEventName = "webkitvisibilitychange"), document.addEventListener(e.visibilityChangeEventName, function () {
                    document[e.hiddenPropName] ? e.triggerUserHasLeftPage() : e.triggerUserHasReturned()
                }, !1), window.addEventListener("blur", function () {
                    e.triggerUserHasLeftPage()
                }), window.addEventListener("focus", function () {
                    e.triggerUserHasReturned()
                }), document.addEventListener("mousemove", function () {
                    e.resetIdleCountdown()
                }), document.addEventListener("keyup", function () {
                    e.resetIdleCountdown()
                }), document.addEventListener("touchstart", function () {
                    e.resetIdleCountdown()
                }), window.addEventListener("scroll", function () {
                    e.resetIdleCountdown()
                }), setInterval(function () {
                    e.checkState()
                }, e.checkStateRateMs)
            },
            websocket: void 0,
            websocketHost: void 0,
            setUpWebsocket: function (t) {
                if (window.WebSocket && t) {
                    var n = t.websocketHost;
                    try {
                        e.websocket = new WebSocket(n), window.onbeforeunload = function (n) {
                            e.sendCurrentTime(t.appId)
                        }, e.websocket.onopen = function () {
                            e.sendInitWsRequest(t.appId)
                        }, e.websocket.onerror = function (e) {
                            console && console.log("Error occurred in websocket connection: " + e)
                        }, e.websocket.onmessage = function (e) {
                            console && console.log(e.data)
                        }
                    } catch (i) {
                        console && console.error("Failed to connect to websocket host.  Error:" + i)
                    }
                }
                return this
            },
            websocketSend: function (t) {
                e.websocket.send(JSON.stringify(t))
            },
            sendCurrentTime: function (t) {
                var n = e.getTimeOnCurrentPageInMilliseconds(),
                    i = {
                        type: "INSERT_TIME",
                        appId: t,
                        timeOnPageMs: n,
                        pageName: e.currentPageName
                    };
                e.websocketSend(i)
            },
            sendInitWsRequest: function (t) {
                var n = {
                    type: "INIT",
                    appId: t
                };
                e.websocketSend(n)
            },
            initialize: function (t) {
                var n = e.idleTimeoutMs || 30,
                    i = e.currentPageName || "default-page-name",
                    s = void 0;
                t && (n = t.idleTimeoutInSeconds || n, i = t.currentPageName || i, s = t.websocketOptions), e.setIdleDurationInSeconds(n).setCurrentPageName(i).setUpWebsocket(s).listenForVisibilityEvents(), e.startTimer()
            }
        };
        return e
    })
}).call(this);
(function () {
    "use strict";

    function e(e) {
        return e = String(e), e.charAt(0).toUpperCase() + e.slice(1)
    }

    function t(e, t, i) {
        var r = {
            "10.0": "10",
            6.4: "10 Technical Preview",
            6.3: "8.1",
            6.2: "8",
            6.1: "Server 2008 R2 / 7",
            "6.0": "Server 2008 / Vista",
            5.2: "Server 2003 / XP 64-bit",
            5.1: "XP",
            5.01: "2000 SP1",
            "5.0": "2000",
            "4.0": "NT",
            "4.90": "ME"
        };
        return t && i && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (r = r[/[\d.]+$/.exec(e)]) && (e = "Windows " + r), e = String(e), t && i && (e = e.replace(RegExp(t, "i"), i)), e = n(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
    }

    function i(e, t) {
        var i = -1,
            n = e ? e.length : 0;
        if ("number" == typeof n && n > -1 && h >= n)
            for (; ++i < n;) t(e[i], i, e);
        else r(e, t)
    }

    function n(t) {
        return t = b(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : e(t)
    }

    function r(e, t) {
        for (var i in e) O.call(e, i) && t(e[i], i, e)
    }

    function o(t) {
        return null == t ? e(t) : M.call(t).slice(8, -1)
    }

    function a(e, t) {
        var i = null != e ? typeof e[t] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(i) && ("object" == i ? !!e[t] : !0)
    }

    function l(e) {
        return String(e).replace(/([ -])(?!$)/g, "$1?")
    }

    function s(e, t) {
        var n = null;
        return i(e, function (i, r) {
            n = t(n, i, r, e)
        }), n
    }

    function b(e) {
        return String(e).replace(/^ +| +$/g, "")
    }

    function c(e) {
        function i(t) {
            return s(t, function (t, i) {
                return t || RegExp("\\b" + (i.pattern || l(i)) + "\\b", "i").exec(e) && (i.label || i)
            })
        }

        function p(t) {
            return s(t, function (t, i, n) {
                return t || (i[q] || i[/^[a-z]+(?: +[a-z]+\b)*/i.exec(q)] || RegExp("\\b" + l(n) + "(?:\\b|\\w*\\d)", "i").exec(e)) && n
            })
        }

        function f(t) {
            return s(t, function (t, i) {
                return t || RegExp("\\b" + (i.pattern || l(i)) + "\\b", "i").exec(e) && (i.label || i)
            })
        }

        function S(i) {
            return s(i, function (i, n) {
                var r = n.pattern || l(n);
                return !i && (i = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (i = t(i, r, n.label || n)), i
            })
        }

        function x(t) {
            return s(t, function (t, i) {
                var r = i.pattern || l(i);
                return !t && (t = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + r + " *\\w+-[\\w]*", "i").exec(e) || RegExp("\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((t = String(i.label && !RegExp(r, "i").test(i.label) ? i.label : t).split("/"))[1] && !/[\d.]+/.test(t[0]) && (t[0] += " " + t[1]), i = i.label || i, t = n(t[0].replace(RegExp(r, "i"), i).replace(RegExp("; *(?:" + i + "[_-])?", "i"), " ").replace(RegExp("(" + i + ")[-_.]?(\\w)", "i"), "$1 $2"))), t
            })
        }

        function h(t) {
            return s(t, function (t, i) {
                return t || (RegExp(i + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null
            })
        }

        function y() {
            return this.description || ""
        }
        var O = u,
            v = e && "object" == typeof e && "String" != o(e);
        v && (O = e, e = null);
        var w = O.navigator || {},
            P = w.userAgent || "";
        e || (e = P);
        var E, k, C = v || g == d,
            W = v ? !!w.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(M.toString()),
            B = "Object",
            I = v ? B : "ScriptBridgingProxyObject",
            A = v ? B : "Environment",
            R = v && O.java ? "JavaPackage" : o(O.java),
            T = v ? B : "RuntimeObject",
            F = /\bJava/.test(R) && O.java,
            G = F && o(O.environment) == A,
            $ = F ? "a" : "α",
            X = F ? "b" : "β",
            j = O.document || {},
            N = O.operamini || O.opera,
            K = m.test(K = v && N ? N["[[Class]]"] : o(N)) ? K : N = null,
            V = e,
            z = [],
            L = null,
            _ = e == P,
            H = _ && N && "function" == typeof N.version && N.version(),
            D = i([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            U = f(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                label: "Microsoft Edge",
                pattern: "Edge"
            }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                label: "Samsung Internet",
                pattern: "SamsungBrowser"
            }, "SeaMonkey", {
                label: "Silk",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Sleipnir", "SlimBrowser", {
                label: "SRWare Iron",
                pattern: "Iron"
            }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                label: "Opera Mini",
                pattern: "OPiOS"
            }, "Opera", {
                label: "Opera",
                pattern: "OPR"
            }, "Chrome", {
                label: "Chrome Mobile",
                pattern: "(?:CriOS|CrMo)"
            }, {
                label: "Firefox",
                pattern: "(?:Firefox|Minefield)"
            }, {
                label: "Firefox for iOS",
                pattern: "FxiOS"
            }, {
                label: "IE",
                pattern: "IEMobile"
            }, {
                label: "IE",
                pattern: "MSIE"
            }, "Safari"]),
            q = x([{
                label: "BlackBerry",
                pattern: "BB10"
            }, "BlackBerry", {
                label: "Galaxy S",
                pattern: "GT-I9000"
            }, {
                label: "Galaxy S2",
                pattern: "GT-I9100"
            }, {
                label: "Galaxy S3",
                pattern: "GT-I9300"
            }, {
                label: "Galaxy S4",
                pattern: "GT-I9500"
            }, {
                label: "Galaxy S5",
                pattern: "SM-G900"
            }, {
                label: "Galaxy S6",
                pattern: "SM-G920"
            }, {
                label: "Galaxy S6 Edge",
                pattern: "SM-G925"
            }, {
                label: "Galaxy S7",
                pattern: "SM-G930"
            }, {
                label: "Galaxy S7 Edge",
                pattern: "SM-G935"
            }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                label: "Kindle Fire",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                label: "Wii U",
                pattern: "WiiU"
            }, "Wii", "Xbox One", {
                label: "Xbox 360",
                pattern: "Xbox"
            }, "Xoom"]),
            J = p({
                Apple: {
                    iPad: 1,
                    iPhone: 1,
                    iPod: 1
                },
                Archos: {},
                Amazon: {
                    Kindle: 1,
                    "Kindle Fire": 1
                },
                Asus: {
                    Transformer: 1
                },
                "Barnes & Noble": {
                    Nook: 1
                },
                BlackBerry: {
                    PlayBook: 1
                },
                Google: {
                    "Google TV": 1,
                    Nexus: 1
                },
                HP: {
                    TouchPad: 1
                },
                HTC: {},
                LG: {},
                Microsoft: {
                    Xbox: 1,
                    "Xbox One": 1
                },
                Motorola: {
                    Xoom: 1
                },
                Nintendo: {
                    "Wii U": 1,
                    Wii: 1
                },
                Nokia: {
                    Lumia: 1
                },
                Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1
                },
                Sony: {
                    PlayStation: 1,
                    "PlayStation Vita": 1
                }
            }),
            Z = S(["Windows Phone", "Android", "CentOS", {
                label: "Chrome OS",
                pattern: "CrOS"
            }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        if (D && (D = [D]), J && !q && (q = x([J])), (E = /\bGoogle TV\b/.exec(q)) && (q = E[0]), /\bSimulator\b/i.test(e) && (q = (q ? q + " " : "") + "Simulator"), "Opera Mini" == U && /\bOPiOS\b/.test(e) && z.push("running in Turbo/Uncompressed mode"), "IE" == U && /\blike iPhone OS\b/.test(e) ? (E = c(e.replace(/like iPhone OS/, "")), J = E.manufacturer, q = E.product) : /^iP/.test(q) ? (U || (U = "Safari"), Z = "iOS" + ((E = / OS ([\d_]+)/i.exec(e)) ? " " + E[1].replace(/_/g, ".") : "")) : "Konqueror" != U || /buntu/i.test(Z) ? J && "Google" != J && (/Chrome/.test(U) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(q)) || /\bAndroid\b/.test(Z) && /^Chrome/.test(U) && /\bVersion\//i.test(e) ? (U = "Android Browser", Z = /\bAndroid\b/.test(Z) ? Z : "Android") : "Silk" == U ? (/\bMobi/i.test(e) || (Z = "Android", z.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && z.unshift("accelerated")) : "PaleMoon" == U && (E = /\bFirefox\/([\d.]+)\b/.exec(e)) ? z.push("identifying as Firefox " + E[1]) : "Firefox" == U && (E = /\b(Mobile|Tablet|TV)\b/i.exec(e)) ? (Z || (Z = "Firefox OS"), q || (q = E[1])) : !U || (E = !/\bMinefield\b/i.test(e) && /\b(?:Firefox|Safari)\b/.exec(U)) ? (U && !q && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(E + "/") + 8)) && (U = null), (E = q || J || Z) && (q || J || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(Z)) && (U = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(Z) ? Z : E) + " Browser")) : "Electron" == U && (E = (/\bChrome\/([\d.]+)\b/.exec(e) || 0)[1]) && z.push("Chromium " + E) : Z = "Kubuntu", H || (H = h(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", l(U), "(?:Firefox|Minefield|NetFront)"])), (E = "iCab" == D && parseFloat(H) > 3 && "WebKit" || /\bOpera\b/.test(U) && (/\bOPR\b/.test(e) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(e) && !/^(?:Trident|EdgeHTML)$/.test(D) && "WebKit" || !D && /\bMSIE\b/i.test(e) && ("Mac OS" == Z ? "Tasman" : "Trident") || "WebKit" == D && /\bPlayStation\b(?! Vita\b)/i.test(U) && "NetFront") && (D = [E]), "IE" == U && (E = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? (U += " Mobile", Z = "Windows Phone " + (/\+$/.test(E) ? E : E + ".x"), z.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? (U = "IE Mobile", Z = "Windows Phone 8.x", z.unshift("desktop mode"), H || (H = (/\brv:([\d.]+)/.exec(e) || 0)[1])) : "IE" != U && "Trident" == D && (E = /\brv:([\d.]+)/.exec(e)) && (U && z.push("identifying as " + U + (H ? " " + H : "")), U = "IE", H = E[1]), _) {
            if (a(O, "global"))
                if (F && (E = F.lang.System, V = E.getProperty("os.arch"), Z = Z || E.getProperty("os.name") + " " + E.getProperty("os.version")), C && a(O, "system") && (E = [O.system])[0]) {
                    Z || (Z = E[0].os || null);
                    try {
                        E[1] = O.require("ringo/engine").version, H = E[1].join("."), U = "RingoJS"
                    } catch (Q) {
                        E[0].global.system == O.system && (U = "Narwhal")
                    }
                } else "object" == typeof O.process && !O.process.browser && (E = O.process) ? ("object" == typeof E.versions && ("string" == typeof E.versions.electron ? (z.push("Node " + E.versions.node), U = "Electron", H = E.versions.electron) : "string" == typeof E.versions.nw && (z.push("Chromium " + H, "Node " + E.versions.node), U = "NW.js", H = E.versions.nw)), U || (U = "Node.js", V = E.arch, Z = E.platform, H = /[\d.]+/.exec(E.version), H = H ? H[0] : "unknown")) : G && (U = "Rhino");
            else o(E = O.runtime) == I ? (U = "Adobe AIR", Z = E.flash.system.Capabilities.os) : o(E = O.phantom) == T ? (U = "PhantomJS", H = (E = E.version || null) && E.major + "." + E.minor + "." + E.patch) : "number" == typeof j.documentMode && (E = /\bTrident\/(\d+)/i.exec(e)) ? (H = [H, j.documentMode], (E = +E[1] + 4) != H[1] && (z.push("IE " + H[1] + " mode"), D && (D[1] = ""), H[1] = E), H = "IE" == U ? String(H[1].toFixed(1)) : H[0]) : "number" == typeof j.documentMode && /^(?:Chrome|Firefox)\b/.test(U) && (z.push("masking as " + U + " " + H), U = "IE", H = "11.0", D = ["Trident"], Z = "Windows");
            Z = Z && n(Z)
        }
        if (H && (E = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(H) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + (_ && w.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (L = /b/i.test(E) ? "beta" : "alpha", H = H.replace(RegExp(E + "\\+?$"), "") + ("beta" == L ? X : $) + (/\d+\+?/.exec(E) || "")), "Fennec" == U || "Firefox" == U && /\b(?:Android|Firefox OS)\b/.test(Z)) U = "Firefox Mobile";
        else if ("Maxthon" == U && H) H = H.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(q)) "Xbox 360" == q && (Z = null), "Xbox 360" == q && /\bIEMobile\b/.test(e) && z.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(U) && (!U || q || /Browser|Mobi/.test(U)) || "Windows CE" != Z && !/Mobi/i.test(e))
            if ("IE" == U && _) try {
                null === O.external && z.unshift("platform preview")
            } catch (Q) {
                z.unshift("embedded")
            } else (/\bBlackBerry\b/.test(q) || /\bBB10\b/.test(e)) && (E = (RegExp(q.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || H) ? (E = [E, /BB10/.test(e)], Z = (E[1] ? (q = null, J = "BlackBerry") : "Device Software") + " " + E[0], H = null) : this != r && "Wii" != q && (_ && N || /Opera/.test(U) && /\b(?:MSIE|Firefox)\b/i.test(e) || "Firefox" == U && /\bOS X (?:\d+\.){2,}/.test(Z) || "IE" == U && (Z && !/^Win/.test(Z) && H > 5.5 || /\bWindows XP\b/.test(Z) && H > 8 || 8 == H && !/\bTrident\b/.test(e))) && !m.test(E = c.call(r, e.replace(m, "") + ";")) && E.name && (E = "ing as " + E.name + ((E = E.version) ? " " + E : ""), m.test(U) ? (/\bIE\b/.test(E) && "Mac OS" == Z && (Z = null), E = "identify" + E) : (E = "mask" + E, U = K ? n(K.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(E) && (Z = null), _ || (H = null)), D = ["Presto"], z.push(E));
        else U += " Mobile";
        (E = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (E = [parseFloat(E.replace(/\.(\d)$/, ".0$1")), E], "Safari" == U && "+" == E[1].slice(-1) ? (U = "WebKit Nightly", L = "alpha", H = E[1].slice(0, -1)) : (H == E[1] || H == (E[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1])) && (H = null), E[1] = (/\bChrome\/([\d.]+)/i.exec(e) || 0)[1], 537.36 == E[0] && 537.36 == E[2] && parseFloat(E[1]) >= 28 && "WebKit" == D && (D = ["Blink"]), _ && (W || E[1]) ? (D && (D[1] = "like Chrome"), E = E[1] || (E = E[0], 530 > E ? 1 : 532 > E ? 2 : 532.05 > E ? 3 : 533 > E ? 4 : 534.03 > E ? 5 : 534.07 > E ? 6 : 534.1 > E ? 7 : 534.13 > E ? 8 : 534.16 > E ? 9 : 534.24 > E ? 10 : 534.3 > E ? 11 : 535.01 > E ? 12 : 535.02 > E ? "13+" : 535.07 > E ? 15 : 535.11 > E ? 16 : 535.19 > E ? 17 : 536.05 > E ? 18 : 536.1 > E ? 19 : 537.01 > E ? 20 : 537.11 > E ? "21+" : 537.13 > E ? 23 : 537.18 > E ? 24 : 537.24 > E ? 25 : 537.36 > E ? 26 : "Blink" != D ? "27" : "28")) : (D && (D[1] = "like Safari"), E = E[0], E = 400 > E ? 1 : 500 > E ? 2 : 526 > E ? 3 : 533 > E ? 4 : 534 > E ? "4+" : 535 > E ? 5 : 537 > E ? 6 : 538 > E ? 7 : 601 > E ? 8 : "8"), D && (D[1] += " " + (E += "number" == typeof E ? ".x" : /[.+]/.test(E) ? "" : "+")), "Safari" == U && (!H || parseInt(H) > 45) && (H = E)), "Opera" == U && (E = /\bzbov|zvav$/.exec(Z)) ? (U += " ", z.unshift("desktop mode"), "zvav" == E ? (U += "Mini", H = null) : U += "Mobile", Z = Z.replace(RegExp(" *" + E + "$"), "")) : "Safari" == U && /\bChrome\b/.exec(D && D[1]) && (z.unshift("desktop mode"), U = "Chrome Mobile", H = null, /\bOS X\b/.test(Z) ? (J = "Apple", Z = "iOS 4.3+") : Z = null), H && 0 == H.indexOf(E = /[\d.]+$/.exec(Z)) && e.indexOf("/" + E + "-") > -1 && (Z = b(Z.replace(E, ""))), D && !/\b(?:Avant|Nook)\b/.test(U) && (/Browser|Lunascape|Maxthon/.test(U) || "Safari" != U && /^iOS/.test(Z) && /\bSafari\b/.test(D[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(U) && D[1]) && (E = D[D.length - 1]) && z.push(E), z.length && (z = ["(" + z.join("; ") + ")"]), J && q && q.indexOf(J) < 0 && z.push("on " + J), q && z.push((/^on /.test(z[z.length - 1]) ? "" : "on ") + q), Z && (E = / ([\d.+]+)$/.exec(Z), k = E && "/" == Z.charAt(Z.length - E[0].length - 1), Z = {
            architecture: 32,
            family: E && !k ? Z.replace(E[0], "") : Z,
            version: E ? E[1] : null,
            toString: function () {
                var e = this.version;
                return this.family + (e && !k ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
            }
        }), (E = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(V)) && !/\bi686\b/i.test(V) ? (Z && (Z.architecture = 64, Z.family = Z.family.replace(RegExp(" *" + E), "")), U && (/\bWOW64\b/i.test(e) || _ && /\w(?:86|32)$/.test(w.cpuClass || w.platform) && !/\bWin64; x64\b/i.test(e)) && z.unshift("32-bit")) : Z && /^OS X/.test(Z.family) && "Chrome" == U && parseFloat(H) >= 39 && (Z.architecture = 64), e || (e = null);
        var Y = {};
        return Y.description = e, Y.layout = D && D[0], Y.manufacturer = J, Y.name = U, Y.prerelease = L, Y.product = q, Y.ua = e, Y.version = U && H, Y.os = Z || {
            architecture: null,
            family: null,
            version: null,
            toString: function () {
                return "null"
            }
        }, Y.parse = c, Y.toString = y, Y.version && z.unshift(H), Y.name && z.unshift(U), Z && U && (Z != String(Z).split(" ")[0] || Z != U.split(" ")[0] && !q) && z.push(q ? "(" + Z + ")" : "on " + Z), z.length && (Y.description = z.join(" ")), Y
    }
    var p = {
        "function": !0,
        object: !0
    },
        u = p[typeof window] && window || this,
        d = u,
        f = p[typeof exports] && exports,
        S = p[typeof module] && module && !module.nodeType && module,
        x = f && S && "object" == typeof global && global;
    !x || x.global !== x && x.window !== x && x.self !== x || (u = x);
    var h = Math.pow(2, 53) - 1,
        m = /\bOpera/,
        g = this,
        y = Object.prototype,
        O = y.hasOwnProperty,
        M = y.toString,
        v = c();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (u.platform = v, define(function () {
        return v
    })) : f && S ? r(v, function (e, t) {
        f[t] = e
    }) : u.platform = v
}).call(this);
TimeMe.initialize({
    currentPageName: document.title,
    idleTimeoutInSeconds: 15
});
var KAstartTime = new Date();  
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

var _SAnali="";
function kakA(kal, kalt, event) {
    if (event != undefined) {
        if (!performance.navigation.type && (event.type == "load" || event.type == "unload" || event.type == "beforeunload") && event.target.domain == document.domain && !window.frameElement) {
            backend = ($("#KAnalytics").data("c") != undefined)?1:0;
			var endTime = new Date();
			var katimeSite=(endTime - KAstartTime);
            
			poststring = "b=" + backend + "&to=" + $("#KAnalytics").data("b") + "&d=" + $("#KAnalytics").data("a") + "&ss=" + window.screen.availWidth + "x" + window.screen.availHeight + "&os=" + platform.os.toString().replace(/ /g, "+") + "&bl=" + navigator.language + "&lt=" + (kalt / 1000) + "&tt=" + (katimeSite / 1000) + "&l=" + kal + "&pt=" + ((document.title.replace(/ /g, "+") == "") ? "Not Set" : document.title.replace(/ /g, "+")) + "&rf=" + document.referrer + ((kal) ? "" : "&ta=" + (TimeMe.getTimeOnCurrentPageInSeconds()));
            if(localStorage.KAPostData)
            if(localStorage.KAPostData != ""){
                $.ajax({
                    type: "POST",
                    url: "/webmodules/websitestatistics/handlers/KAnalytics.asp",
                    data: localStorage.KAPostData,
                    success: function (data) {
                        if (data != "" && data.indexOf("401 - Unauthorized") == -1){
                            JSOND = JSON.parse(data);
                            if (JSOND.isEU)showCookies();
                            localStorage.setItem("KAPostData", "");
                        };
                    },
                    dataType: "application/x-www-form-urlencoded",
                    async: true
                });     
            }           
            if (typeof(Storage) !== "undefined" && (event.type == "unload" || event.type == "beforeunload")) {
                localStorage.setItem("KAPostData", poststring);
            }

            if (event.type == "load")
                $.ajax({
                    type: "POST",
                    url: "/webmodules/websitestatistics/handlers/KAnalytics.asp",
                    data: poststring,
                    success: function (data) {
                        if (data != "" && data.indexOf("401 - Unauthorized") == -1){
                            JSOND = JSON.parse(data);
                            if (JSOND.isEU)showCookies();
                        };
                    },
                    dataType: "application/x-www-form-urlencoded",
                    async: false
                });
        };
    };
}

function KaTf(W,Ec,Et,En,T){
	//W = WebmoduleID
	//Ec = EventCategory
	//Et = EventType
	//En = EventName
	//P = PageTitle
	//T = WebmoduleRefID
	$.ajax({
		type: "POST",
		url: "/webmodules/websitestatistics/handlers/Trigger-KTAnalytics.asp",
		data: {T:T,W:W,Et:Et,Ec:Ec,E:En,P:((document.title.replace(/ /g, "+") == "") ? "Not Set" : document.title.replace(/ /g, "+"))},
		dataType: "application/x-www-form-urlencoded",
		async: false
	});
}

$(window).on((isChrome)?"unload":"beforeunload", function (ev) {
    kakA(false, 0, ev);
});

$(window).on("load", function (ev) {
    kakA(true, performance.getEntries()[0].domComplete - performance.getEntries()[0].fetchStart, ev);
});