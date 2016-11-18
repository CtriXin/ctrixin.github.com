! function() {
    function a(a, b, c) {
        var d, e, f, g = q,
            h = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
            i = [];
        if (g && (d = g.timing)) {
            d.domContentLoadedEventStart || h.splice(15, 2, "domContentLoaded", "domContentLoaded"), e = d[h[0]];
            for (var j = 1, k = h.length; k > j; j++) f = d[h[j]], f = f ? f - e : 0, f > 0 && i.push(j + "=" + f);
            window.d0 && i.push("30=" + (window.d0 - e));
            var n = m + "?flag1=" + a + "&flag2=" + b + "&flag3=" + c + "&" + i.join("&");
            l(n)
        }
    }

    function b(a, b) {
        if (a && a.stack) {
            var c = a.stack.replace(/(?:http:)[^:]*:(.*)/g, "$1").replace(/[\n\s]/g, "").replace(/@/g, "at").split("at"),
                d = b ? b + 1 : c.length - 1;
            return c.slice(1, d).join(":")
        }
        if (arguments.callee.caller.caller) {
            for (var e, f = arguments.callee.caller.caller, g = []; f;) e = f, g.push(e.toString().replace(/function/g, "Fn").replace(/[\t\n\r]/g, "").substring(0, 30)), f = f.caller;
            return g.join(":")
        }
        return ""
    }

    function c(a, b, c, d, e) {
        setTimeout(function() {
            var f = n + "?&url=" + encodeURIComponent(location.href) + "&script_url=" + b + "&line_num=" + c + "&column_num=" + d + "&error_msg=" + a + "&error_stack=" + e;
            l(f)
        }, 1e3)
    }

    function d() {
        var a = "";
        window.onerror = function(d, e, f, g, h) {
            var i = h ? b(h) : b(),
                j = d.replace(/\n/g, " ") + "|" + encodeURIComponent(e + ":" + i) + "|" + f;
            if (-1 == a.indexOf(j)) {
                a += j + ",";
                var d = encodeURIComponent(d.replace(/\n/g, " ")),
                    e = encodeURIComponent(e),
                    f = encodeURIComponent(f),
                    g = encodeURIComponent(g || 0),
                    i = encodeURIComponent(i);
                c(d, e, f, g, i)
            }
            return !1
        }
    }

    function e(a, b) {
        var a = a || "",
            b = b || "",
            c = f();
        url = o + "?type=1&url=" + encodeURIComponent(location.href) + "&appid=" + a + "&openid=" + b + "&guid=" + c, l(url)
    }

    function f() {
        var a;
        if (r = document.cookie.match(/(^| )guid=([^;]*)(;|$)/)) a = r[2];
        else {
            var b = document.cookie.slice(0, 30);
            if (b.length < 30) {
                var c = 29 - b.length;
                c = Math.pow(10, c).toLocaleString().split(",").join(""), b += c
            }
            b = g(b);
            var d = (new Date).getUTCMilliseconds();
            b += Math.round(2147483647 * Math.abs(Math.random() - 1)) * d % 1e10, a = b, document.cookie = "guid=" + a
        }
        return a
    }

    function g(a) {
        var b = [],
            c = "",
            d = "";
        a = a.split("");
        for (var e = 0, f = a.length; f > e; e++) c = a[e], d = encodeURIComponent(c), d == c && (d = c.charCodeAt().toString(16), d = ("00" + d).slice(-2)), b.push(d);
        return b.join("").replace(/%/g, "").toUpperCase()
    }

    function h(a) {
        k(window, "pagehide", function() {
            i(a)
        })
    }

    function i(a) {
        var b = q ? q.timing.domComplete : t,
            c = (new Date).getTime() - b;
        c = Math.round(c / 1e3);
        var d = o + "?type=2&url=" + encodeURIComponent(location.href) + "&appid=" + a + "&timespan=" + c;
        l(d)
    }

    function j(a) {
        var b = s || "",
            a = a || "",
            c = f(),
            d = o + "?type=3&url=" + encodeURIComponent(location.href) + "&appid=" + b + "&openid=" + a + "&guid=" + c;
        l(d)
    }

    function k(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
    }

    function l(a) {
        u.src = a
    }
    var m = "http://isdspeed.qq.com/cgi-bin/r.cgi",
        n = "http://as.weixin.qq.com/cgi-bin/pge",
        o = "http://as.weixin.qq.com/cgi-bin/pgv",
        p = {
            wx10583a7e974992ec: [7824, 12, 1],
            wx32aa823f78e5f6ad: [7824, 12, 2],
            wxbb0f47ed86a8aa4b: [7824, 12, 3],
            wx1860a110b3f0e559: [7824, 12, 4],
            wx33ef2079cc9c2600: [7824, 12, 5],
            wx86cf74e38aeb2f51: [7824, 12, 6],
            wxb4d32f8e375ee35e: [7824, 12, 7],
            wx398ba401e4baadca: [7824, 12, 8],
            wxcd8cd2447c69be40: [7824, 12, 9],
            wxdeb5dc277a2c46bf: [7824, 12, 10],
            wx8d1da56e113a3ecd: [7824, 12, 11]
        }, q = window.webkitPerformance ? window.webkitPerformance : window.msPerformance;
    q = q ? q : window.performance;
    var s, t = (new Date).getTime(),
        u = new Image,
        v = function(b, f) {
            var b = b || "",
                f = f || "";
            if (s = b, d(b), !q) {
                var g = "not support performance",
                    i = encodeURIComponent(location.href),
                    j = 0,
                    l = 0,
                    m = "not support performance";
                c(g, i, j, l, m)
            }
            var n = p[b],
                o = n[0],
                r = n[1],
                t = n[2];
            k(window, "load", function() {
                a(o, r, t)
            }), setTimeout(function() {
                h(b), e(b, f)
            }, 500)
        };
    window.WXStat = v, window.WXSendClick = j
}();