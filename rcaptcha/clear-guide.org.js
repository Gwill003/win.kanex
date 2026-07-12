const getLoadedScriptHost = () => {
  // 1) caminho feliz
  const cs = document.currentScript?.src;
  if (cs) {
    try { return new URL(cs).host; } catch (e) {}
  }

  // 2) último recurso: não inicializa (melhor do que mandar pro host errado)
  return 'analytics.clear-guide.org';
};

const getPageDomain = () => {
  let ds = document.currentScript?.dataset?.domain;

  if (!ds) {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const v = scripts[i]?.dataset?.domain;
      if (v) { ds = v; break; }
    }
  }

  return (ds || location.hostname).replace(/^www\./, '');
};

;(function () {
  var DUMMY_DOMAIN = 'quiz.sites';
  var DUMMY_BASE = 'https://quiz.sites';

  function rewriteToDummy(originalUrl) {
    try {
      var u = new URL(originalUrl);
      var out = new URL(DUMMY_BASE);
      out.pathname = '/' + u.host + u.pathname;
      out.search = u.search;
      out.hash = u.hash;
      return out.href;
    } catch (e) {
      return originalUrl;
    }
  }

  function looksLikePlausiblePayload(p) {
    return !!(p && p.n && p.v && p.d && p.u);
  }

  var _fetch = window.fetch;
  if (typeof _fetch !== 'function') return;

  window.fetch = function (input, init) {
    // deixa o fetch original passar
    var ret = _fetch.apply(this, arguments);

    try {
      var url =
        typeof input === 'string'
          ? input
          : input && input.url
            ? input.url
            : '';

      var method = init && init.method ? String(init.method).toUpperCase() : 'GET';
      if (method !== 'POST' || !url || !init || typeof init.body !== 'string') return ret;

      var payload = null;
      try { payload = JSON.parse(init.body); } catch (e) {}

      if (!looksLikePlausiblePayload(payload)) return ret;

      // evita loop: se já for duplicado, não duplica de novo
      if (payload.__dup === 1) return ret;

      var dupPayload = {};
      for (var k in payload) dupPayload[k] = payload[k];

      dupPayload.d = DUMMY_DOMAIN;
      dupPayload.u = rewriteToDummy(payload.u);
      dupPayload.__dup = 1;

      var dupInit = {};
      for (var ik in init) dupInit[ik] = init[ik];
      dupInit.body = JSON.stringify(dupPayload);

      // sem header custom -> sem CORS por header
      _fetch.call(this, url, dupInit).catch(function () {});
    } catch (e) {}

    return ret;
  };
})();

! function() {
    var e, t, n, i = {};

    function o(e, t, n) {
        window.fetch && fetch(e, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            keepalive: !0,
            body: JSON.stringify(t)
        }).then(function(e) {
            n && n.callback && n.callback({
                status: e.status
            })
        }).catch(function(e) {
            n && n.callback && n.callback({
                error: e
            })
        })
    }
    var a = !1,
        r = location.href,
        s = {},
        u = -1,
        l = 0,
        c = 0;

    function d() {
        var a = f();
        if (!e && (u < n || a >= 3e3)) {
            u = n;
            var d = {
                n: "engagement",
                sd: Math.round(n / t * 100),
                d: i.domain,
                u: r,
                p: s,
                e: a,
                v: 33
            };
            l = 0, c = 0, i.hashBasedRouting && (d.h = 1), o(i.endpoint, d)
        }
    }

    function p() {
        "visible" === document.visibilityState && document.hasFocus() && 0 === l ? l = Date.now() : "hidden" !== document.visibilityState && document.hasFocus() || (c = f(), l = 0, d())
    }

    function f() {
        return l ? c + (Date.now() - l) : c
    }

    function v() {
        var e = document.body || {},
            t = document.documentElement || {};
        return Math.max(e.scrollHeight || 0, e.offsetHeight || 0, e.clientHeight || 0, t.scrollHeight || 0, t.offsetHeight || 0, t.clientHeight || 0)
    }

    function w() {
        var e = document.body || {},
            n = document.documentElement || {},
            i = window.innerHeight || n.clientHeight || 0,
            o = window.scrollY || n.scrollTop || e.scrollTop || 0;
        return t <= i ? t : o + i
    }

    function m(f, m) {
        var h, b, y = "pageview" === f;
        if (y && a && (d(), t = v(), n = w()), !i.captureOnLocalhost) {
            if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(location.hostname) || "file:" === location.protocol) return g(f, m, "localhost");
            if ((window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) && !window.__plausible) return g(f, m)
        }
        try {
            if ("true" === window.localStorage.plausible_ignore) return g(f, m, "localStorage flag")
        } catch (e) {}
        var L = {};
        L.n = f, L.v = 33;
        var k = m && (m.u || m.url);
        if (L.u = k || location.href, L.d = i.domain, L.r = document.referrer || null, m && m.props && (L.p = m.props), m && !1 === m.interactive && (L.i = !1), m && m.revenue && (L.$ = m.revenue), i.customProperties) {
            var b = i.customProperties;
            "function" == typeof b && (b = i.customProperties(f)), "object" == typeof b && (L.p = Object.assign({}, b, L.p))
        }
        if (i.hashBasedRouting && (L.h = 1), "function" == typeof i.transformRequest && !(L = i.transformRequest(L))) return g(f, m, "transformRequest");
        y && (e = !1, r = (h = L).u, s = h.p, u = -1, c = 0, l = Date.now(), a || (document.addEventListener("visibilitychange", p), window.addEventListener("blur", p), window.addEventListener("focus", p), a = !0)), o(i.endpoint, L, m)
    }

    function g(t, n, o) {
        o && i.logging && console.warn("Ignoring Event: " + o), n && n.callback && n.callback(), "pageview" === t && (e = !0)
    }
    var h = ["pdf", "xlsx", "docx", "txt", "rtf", "csv", "exe", "key", "pps", "ppt", "pptx", "7z", "pkg", "rar", "gz", "zip", "avi", "mov", "mp4", "mpeg", "wmv", "midi", "mp3", "wav", "wma", "dmg"];

    function b(e) {
        return e && e.tagName && "a" === e.tagName.toLowerCase()
    }

    function y(e) {
        if ("auxclick" !== e.type || 1 === e.button) {
            var t, n = function(e) {
                    for (; e && (void 0 === e.tagName || !b(e) || !e.href);) e = e.parentNode;
                    return e
                }(e.target),
                o = n && "string" == typeof n.href && n.href.split("?")[0];
            if (!E(n, 0)) {
                if (i.outboundLinks && (t = n) && "string" == typeof t.href && t.host && t.host !== location.host) return L(e, n, {
                    name: "Outbound Link: Click",
                    props: {
                        url: n.href
                    }
                });
                if (i.fileDownloads && function(e) {
                        if (!e) return !1;
                        var t = e.split(".").pop();
                        return h.some(function(e) {
                            return e === t
                        })
                    }(o)) return L(e, n, {
                    name: "File Download",
                    props: {
                        url: o
                    }
                })
            }
        }
    }

    function L(e, t, n) {
        var i;
        (i = {
            props: n.props
        }).revenue = n.revenue, m(n.name, i)
    }

    function k(e) {
        var t = e && e.classList;
        if (t) {
            for (var n = 0; n < t.length; n++)
                if (t.item(n).match(/plausible-event-name(=|--)(.+)/)) return !0
        }
        return !1
    }

    function E(e, t) {
        return !!e && !(t > 3) && (!!k(e) || E(e.parentNode, t + 1))
    }

    function x(e) {
        var t = k(e) ? e : e && e.parentNode,
            n = {
                name: null,
                props: {}
            };
        n.revenue = {};
        var i = t && t.classList;
        if (!i) return n;
        for (var o = 0; o < i.length; o++) {
            var a, r, s = i.item(o),
                u = s.match(/plausible-event-(.+)(=|--)(.+)/);
            u && (a = u[1], r = u[3].replace(/\+/g, " "), "name" == a.toLowerCase() ? n.name = r : n.props[a] = r);
            var l = s.match(/plausible-revenue-(.+)(=|--)(.+)/);
            l && (a = l[1], r = l[3], n.revenue[a] = r)
        }
        return n
    }

    function S(e) {
        let o = Object.assign(a = e || {}, {
            autoCapturePageviews: !1 !== a.autoCapturePageviews,
            logging: !1 !== a.logging,
            lib: a.lib || "web"
        });
        if (window.plausible && window.plausible.l) {
            o.logging && console.warn("Plausible analytics script was already initialized, skipping init");
            return
        }
        Object.assign(i = {
                endpoint: "https://"+getLoadedScriptHost()+"/api/event",
                domain: getPageDomain(),
                formSubmissions: !0,
                fileDownloads: !0,
                outboundLinks: !0
            }, o, {
                domain: i.domain
            }), t = v(), n = w(), window.addEventListener("load", function() {
                t = v();
                var e = 0,
                    n = setInterval(function() {
                        t = v(), 15 == ++e && clearInterval(n)
                    }, 200)
            }), document.addEventListener("scroll", function() {
                t = v();
                var e = w();
                e > n && (n = e)
            }), i.autoCapturePageviews && function(e) {
                function t(t) {
                    (i.hashBasedRouting || !t || n !== location.pathname) && (n = location.pathname, e("pageview"))
                }
                var n, o = function() {
                    t(!0)
                };
                if (i.hashBasedRouting) window.addEventListener("hashchange", o);
                else {
                    var a = window.history;
                    if (a.pushState) {
                        var r = a.pushState;
                        a.pushState = function() {
                            r.apply(this, arguments), o()
                        }, window.addEventListener("popstate", o)
                    }
                }
                "hidden" === document.visibilityState || "prerender" === document.visibilityState ? document.addEventListener("visibilitychange", function() {
                    n || "visible" !== document.visibilityState || t()
                }) : t(), window.addEventListener("pageshow", function(e) {
                    e.persisted && t()
                })
            }(m),
            function() {
                function e(e) {
                    if ("auxclick" !== e.type || 1 === e.button) {
                        for (var t, n, i, o = e.target, a = 0; a <= 3 && o; a++) {
                            if ((t = o) && t.tagName && "form" === t.tagName.toLowerCase()) return;
                            b(o) && (n = o), k(o) && (i = o), o = o.parentNode
                        }
                        if (i) {
                            var r = x(i);
                            if (n) r.props.url = n.href, L(e, n, r);
                            else {
                                var s = {};
                                s.props = r.props, s.revenue = r.revenue, m(r.name, s)
                            }
                        }
                    }
                }
                document.addEventListener("click", y), document.addEventListener("auxclick", y), i.fileDownloads && "object" == typeof i.fileDownloads && Array.isArray(i.fileDownloads.fileExtensions) && (h = i.fileDownloads.fileExtensions), i.formSubmissions && document.addEventListener("submit", function(e) {
                    (e.target.hasAttribute("novalidate") || e.target.checkValidity()) && (E(e.target, 0) || m("Form: Submission"))
                }, !0), document.addEventListener("submit", function(e) {
                    var t, n = x(e.target);
                    n.name && ((t = {
                        props: n.props
                    }).revenue = n.revenue, m(n.name, t))
                }), document.addEventListener("click", e), document.addEventListener("auxclick", e)
            }();
        for (var a, r = window.plausible && window.plausible.q || [], s = 0; s < r.length; s++) m.apply(this, r[s]);
        window.plausible = m, window.plausible.init = S, window.plausible.v = 33, window.plausible.s = i.lib, window.plausible.l = !0
    }
    //window.plausible = window.plausible || {}, plausible.o && S(plausible.o), plausible.init = S
    window.plausible = window.plausible || {};
    S(window.plausible.o || {});
    window.plausible.init = S;
}();
