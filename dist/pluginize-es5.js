var pluginizeWrapper = function(n) {
        "use strict";
        var t = function(n, t) {
            (null == t || t > n.length) && (t = n.length);
            for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
            return r
        };
        var e = function(n) { if (Array.isArray(n)) return t(n) };
        var r = function(n) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(n)) return Array.from(n) };
        var o = function(n, e) { if (n) { if ("string" == typeof n) return t(n, e); var r = Object.prototype.toString.call(n).slice(8, -1); return "Object" === r && n.constructor && (r = n.constructor.name), "Map" === r || "Set" === r ? Array.from(n) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? t(n, e) : void 0 } };
        var i = function() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") };
        var a = function(n) { return e(n) || r(n) || o(n) || i() };

        function u(n, t, e) { return n(e = { path: t, exports: {}, require: function(n, t) { return function() { throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs") }(null == t && e.path) } }, e.exports), e.exports }
        var c = u((function(n) {
                function t(e) { return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? n.exports = t = function(n) { return typeof n } : n.exports = t = function(n) { return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n }, t(e) }
                n.exports = t
            })),
            l = u((function(n) {
                var t = function(n) {
                    var t, e = Object.prototype,
                        r = e.hasOwnProperty,
                        o = "function" == typeof Symbol ? Symbol : {},
                        i = o.iterator || "@@iterator",
                        a = o.asyncIterator || "@@asyncIterator",
                        u = o.toStringTag || "@@toStringTag";

                    function l(n, t, e) { return Object.defineProperty(n, t, { value: e, enumerable: !0, configurable: !0, writable: !0 }), n[t] }
                    try { l({}, "") } catch (n) { l = function(n, t, e) { return n[t] = e } }

                    function f(n, t, e, r) {
                        var o = t && t.prototype instanceof v ? t : v,
                            i = Object.create(o.prototype),
                            a = new E(r || []);
                        return i._invoke = function(n, t, e) {
                            var r = g;
                            return function(o, i) {
                                if (r === y) throw new Error("Generator is already running");
                                if (r === h) { if ("throw" === o) throw i; return z() }
                                for (e.method = o, e.arg = i;;) {
                                    var a = e.delegate;
                                    if (a) { var u = C(a, e); if (u) { if (u === d) continue; return u } }
                                    if ("next" === e.method) e.sent = e._sent = e.arg;
                                    else if ("throw" === e.method) {
                                        if (r === g) throw r = h, e.arg;
                                        e.dispatchException(e.arg)
                                    } else "return" === e.method && e.abrupt("return", e.arg);
                                    r = y;
                                    var c = s(n, t, e);
                                    if ("normal" === c.type) { if (r = e.done ? h : p, c.arg === d) continue; return { value: c.arg, done: e.done } }
                                    "throw" === c.type && (r = h, e.method = "throw", e.arg = c.arg)
                                }
                            }
                        }(n, e, a), i
                    }

                    function s(n, t, e) { try { return { type: "normal", arg: n.call(t, e) } } catch (n) { return { type: "throw", arg: n } } }
                    n.wrap = f;
                    var g = "suspendedStart",
                        p = "suspendedYield",
                        y = "executing",
                        h = "completed",
                        d = {};

                    function v() {}

                    function b() {}

                    function m() {}
                    var w = {};
                    w[i] = function() { return this };
                    var k = Object.getPrototypeOf,
                        x = k && k(k(I([])));
                    x && x !== e && r.call(x, i) && (w = x);
                    var A = m.prototype = v.prototype = Object.create(w);

                    function j(n) {
                        ["next", "throw", "return"].forEach((function(t) { l(n, t, (function(n) { return this._invoke(t, n) })) }))
                    }

                    function P(n, t) {
                        function e(o, i, a, u) {
                            var l = s(n[o], n, i);
                            if ("throw" !== l.type) {
                                var f = l.arg,
                                    g = f.value;
                                return g && "object" === c(g) && r.call(g, "__await") ? t.resolve(g.__await).then((function(n) { e("next", n, a, u) }), (function(n) { e("throw", n, a, u) })) : t.resolve(g).then((function(n) { f.value = n, a(f) }), (function(n) { return e("throw", n, a, u) }))
                            }
                            u(l.arg)
                        }
                        var o;
                        this._invoke = function(n, r) {
                            function i() { return new t((function(t, o) { e(n, r, t, o) })) }
                            return o = o ? o.then(i, i) : i()
                        }
                    }

                    function C(n, e) {
                        var r = n.iterator[e.method];
                        if (r === t) {
                            if (e.delegate = null, "throw" === e.method) {
                                if (n.iterator.return && (e.method = "return", e.arg = t, C(n, e), "throw" === e.method)) return d;
                                e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                            }
                            return d
                        }
                        var o = s(r, n.iterator, e.arg);
                        if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, d;
                        var i = o.arg;
                        return i ? i.done ? (e[n.resultName] = i.value, e.next = n.nextLoc, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, d) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, d)
                    }

                    function S(n) {
                        var t = { tryLoc: n[0] };
                        1 in n && (t.catchLoc = n[1]), 2 in n && (t.finallyLoc = n[2], t.afterLoc = n[3]), this.tryEntries.push(t)
                    }

                    function O(n) {
                        var t = n.completion || {};
                        t.type = "normal", delete t.arg, n.completion = t
                    }

                    function E(n) { this.tryEntries = [{ tryLoc: "root" }], n.forEach(S, this), this.reset(!0) }

                    function I(n) {
                        if (n) {
                            var e = n[i];
                            if (e) return e.call(n);
                            if ("function" == typeof n.next) return n;
                            if (!isNaN(n.length)) {
                                var o = -1,
                                    a = function e() {
                                        for (; ++o < n.length;)
                                            if (r.call(n, o)) return e.value = n[o], e.done = !1, e;
                                        return e.value = t, e.done = !0, e
                                    };
                                return a.next = a
                            }
                        }
                        return { next: z }
                    }

                    function z() { return { value: t, done: !0 } }
                    return b.prototype = A.constructor = m, m.constructor = b, b.displayName = l(m, u, "GeneratorFunction"), n.isGeneratorFunction = function(n) { var t = "function" == typeof n && n.constructor; return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name)) }, n.mark = function(n) { return Object.setPrototypeOf ? Object.setPrototypeOf(n, m) : (n.__proto__ = m, l(n, u, "GeneratorFunction")), n.prototype = Object.create(A), n }, n.awrap = function(n) { return { __await: n } }, j(P.prototype), P.prototype[a] = function() { return this }, n.AsyncIterator = P, n.async = function(t, e, r, o, i) { void 0 === i && (i = Promise); var a = new P(f(t, e, r, o), i); return n.isGeneratorFunction(e) ? a : a.next().then((function(n) { return n.done ? n.value : a.next() })) }, j(A), l(A, u, "Generator"), A[i] = function() { return this }, A.toString = function() { return "[object Generator]" }, n.keys = function(n) {
                        var t = [];
                        for (var e in n) t.push(e);
                        return t.reverse(),
                            function e() { for (; t.length;) { var r = t.pop(); if (r in n) return e.value = r, e.done = !1, e } return e.done = !0, e }
                    }, n.values = I, E.prototype = {
                        constructor: E,
                        reset: function(n) {
                            if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(O), !n)
                                for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t)
                        },
                        stop: function() { this.done = !0; var n = this.tryEntries[0].completion; if ("throw" === n.type) throw n.arg; return this.rval },
                        dispatchException: function(n) {
                            if (this.done) throw n;
                            var e = this;

                            function o(r, o) { return u.type = "throw", u.arg = n, e.next = r, o && (e.method = "next", e.arg = t), !!o }
                            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                var a = this.tryEntries[i],
                                    u = a.completion;
                                if ("root" === a.tryLoc) return o("end");
                                if (a.tryLoc <= this.prev) {
                                    var c = r.call(a, "catchLoc"),
                                        l = r.call(a, "finallyLoc");
                                    if (c && l) { if (this.prev < a.catchLoc) return o(a.catchLoc, !0); if (this.prev < a.finallyLoc) return o(a.finallyLoc) } else if (c) { if (this.prev < a.catchLoc) return o(a.catchLoc, !0) } else { if (!l) throw new Error("try statement without catch or finally"); if (this.prev < a.finallyLoc) return o(a.finallyLoc) }
                                }
                            }
                        },
                        abrupt: function(n, t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) { var o = this.tryEntries[e]; if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break } }
                            i && ("break" === n || "continue" === n) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                            var a = i ? i.completion : {};
                            return a.type = n, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, d) : this.complete(a)
                        },
                        complete: function(n, t) { if ("throw" === n.type) throw n.arg; return "break" === n.type || "continue" === n.type ? this.next = n.arg : "return" === n.type ? (this.rval = this.arg = n.arg, this.method = "return", this.next = "end") : "normal" === n.type && t && (this.next = t), d },
                        finish: function(n) { for (var t = this.tryEntries.length - 1; t >= 0; --t) { var e = this.tryEntries[t]; if (e.finallyLoc === n) return this.complete(e.completion, e.afterLoc), O(e), d } },
                        catch: function(n) {
                            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                var e = this.tryEntries[t];
                                if (e.tryLoc === n) {
                                    var r = e.completion;
                                    if ("throw" === r.type) {
                                        var o = r.arg;
                                        O(e)
                                    }
                                    return o
                                }
                            }
                            throw new Error("illegal catch attempt")
                        },
                        delegateYield: function(n, e, r) { return this.delegate = { iterator: I(n), resultName: e, nextLoc: r }, "next" === this.method && (this.arg = t), d }
                    }, n
                }(n.exports);
                try { regeneratorRuntime = t } catch (n) { Function("r", "regeneratorRuntime = r")(t) }
            }));

        function f(n, t, e, r, o, i, a) {
            try {
                var u = n[i](a),
                    c = u.value
            } catch (n) { return void e(n) }
            u.done ? t(c) : Promise.resolve(c).then(r, o)
        }
        var s = function(n) {
                return function() {
                    var t = this,
                        e = arguments;
                    return new Promise((function(r, o) {
                        var i = n.runPromise(t, e);

                        function a(n) { f(i, r, o, a, u, "next", n) }

                        function u(n) { f(i, r, o, a, u, "throw", n) }
                        a(void 0)
                    }))
                }
            },
            g = "production";

        function p(n, t) { if ("development" == g) throw t; throw new Error(n) }

        function y(n, t, e) { n && p(t, e) }

        function h(n) { g = n }

        function d(n, t) {
            var e;
            if ("undefined" == typeof Symbol || null == n[Symbol.iterator]) {
                if (Array.isArray(n) || (e = function(n, t) { if (!n) return; if ("string" == typeof n) return v(n, t); var e = Object.prototype.toString.call(n).slice(8, -1); "Object" === e && n.constructor && (e = n.constructor.name); if ("Map" === e || "Set" === e) return Array.from(n); if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return v(n, t) }(n)) || t && n && "number" == typeof n.length) {
                    e && (n = e);
                    var r = 0,
                        o = function() {};
                    return { s: o, n: function() { return r >= n.length ? { done: !0 } : { done: !1, value: n[r++] } }, e: function(n) { throw n }, f: o }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, a = !0,
                u = !1;
            return { s: function() { e = n[Symbol.iterator]() }, n: function() { var n = e.next(); return a = n.done, n }, e: function(n) { u = !0, i = n }, f: function() { try { a || null == e.return || e.return() } finally { if (u) throw i } } }
        }

        function v(n, t) {
            (null == t || t > n.length) && (t = n.length);
            for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
            return r
        }

        function b(n, t) {
            var e;
            if ("undefined" == typeof Symbol || null == n[Symbol.iterator]) {
                if (Array.isArray(n) || (e = function(n, t) { if (!n) return; if ("string" == typeof n) return m(n, t); var e = Object.prototype.toString.call(n).slice(8, -1); "Object" === e && n.constructor && (e = n.constructor.name); if ("Map" === e || "Set" === e) return Array.from(n); if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return m(n, t) }(n)) || t && n && "number" == typeof n.length) {
                    e && (n = e);
                    var r = 0,
                        o = function() {};
                    return { s: o, n: function() { return r >= n.length ? { done: !0 } : { done: !1, value: n[r++] } }, e: function(n) { throw n }, f: o }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, a = !0,
                u = !1;
            return { s: function() { e = n[Symbol.iterator]() }, n: function() { var n = e.next(); return a = n.done, n }, e: function(n) { u = !0, i = n }, f: function() { try { a || null == e.return || e.return() } finally { if (u) throw i } } }
        }

        function m(n, t) {
            (null == t || t > n.length) && (t = n.length);
            for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
            return r
        }
        var w = {
                name: "DefaultPlugins",
                plugins: [new function() {
                    var n = ["name", "hooks", "init", "allowKeys", "desactivateKeyCheck", "plugins", "debug", "changeConfig"],
                        t = !1;
                    return {
                        name: "ValidateConfigPlugin",
                        hooks: {
                            initPlugin: function(e, r) { e.allowKeys && n.push.runPromise(n, a(e.allowKeys)), e.desactivateKeyCheck && (t = e.desactivateKeyCheck) },
                            pluginsInitialized: function(e) {
                                if (!t) {
                                    var r, o = d(e.plugins);
                                    try {
                                        for (o.s(); !(r = o.n()).done;)
                                            for (var i = r.value, a = 0, u = Object.keys(i); a < u.length; a++) {
                                                var c = u[a];
                                                n.includes(c) || p('Config attribute "'.concat(c, '" is used but not allowed. Allowed are ').concat(n.join(", "), ". \n                            You want to disable this proove? set desactivateKeyCheck:true.\n                            You want to allow another config attributes? Add allowKeys:['yourkeyname']."), "config.invalidKey")
                                            }
                                    } catch (n) { o.e(n) } finally { o.f() }
                                }
                            }
                        },
                        init: function() { return { desactivateKeyCheck: function() { t = !0 } } }
                    }
                }, new function(n) {
                    return {
                        name: "InitHooksPlugin",
                        allowKeys: ["addHooks", "hooks"],
                        hooks: {
                            initPlugin: function(n, t) {
                                if (n.addHooks) {
                                    y(Array.isArray(n.addHooks) || "object" != c(n.addHooks), 'Error in plugin "'.concat(n.name, '": config.addHooks must be an object but is a ').concat(c(n.addHooks)), "config.addHooks.wrongtype");
                                    for (var e = 0, r = Object.keys(n.addHooks); e < r.length; e++) {
                                        var o = r[e];
                                        t.hooks[o] = n.addHooks[o]
                                    }
                                }
                                if (n.hooks) {
                                    y(Array.isArray(n.hooks) || "object" != c(n.hooks), 'Error in plugin "'.concat(n.name, '": config.hooks must be an object but is a ').concat(c(n.hooks)), "config.hooks.wrongtype");
                                    for (var i = 0, a = Object.keys(n.hooks); i < a.length; i++) {
                                        var u = a[i];
                                        y(!t.hooks[u], 'There is no Hook named "' + u + '", declared in plugin ' + n.name + ' . Is it correctly written? If yes, initialize it first with config attribute "addHooks"', "config.hooks.notDefined"), t.hooks[u].tap(n.name, n.hooks[u])
                                    }
                                }
                            }
                        },
                        init: function(n, t) {
                            return t.config.hooks && t.config.hooks.preInitPlugin && t.hooks.preInitPlugin.tap("preInitPlugin", t.config.hooks.preInitPlugin), {
                                addHooks: function(n) {
                                    for (var e = 0, r = Object.keys(n); e < r.length; e++) {
                                        var o = r[e];
                                        t.hooks[o] = n[o]
                                    }
                                },
                                on: function(n, e, r) { if (!t.hooks[n]) throw new Error('Hook with name "' + n + '" does not exist. context.on(name, pluginname, fn) failed'); return t.hooks[n].tap(e, r) }
                            }
                        }
                    }
                }, new function() { return { allowKeys: ["return"], name: "ReturnPlugin", hooks: { initPlugin: function(n, t) { n.return && (t.return = n.return) } } } }, new function() {
                    var n = {};
                    return {
                        allowKeys: ["rename"],
                        name: "RenamePlugin",
                        hooks: {
                            initPlugin: function(t, e) {
                                if (t.rename)
                                    for (var r, o, i = 0, a = Object.keys(t.rename); i < a.length; i++) o = a[i], r = t.rename[o], n[o] = r
                            },
                            return: function(t) { for (var e, r = 0, o = Object.keys(n); r < o.length; r++) e = o[r], t[n[e]] = t[e], delete t[e] }
                        }
                    }
                }, new function() { var n = []; return { allowKeys: ["delete"], name: "DeletePlugin", hooks: { initPlugin: function(t, e) { t.delete && n.push.runPromise(n, a(t.delete)) }, return: function(t) { var e, r = b(n); try { for (r.s(); !(e = r.n()).done;) { delete t[e.value] } } catch (n) { r.e(n) } finally { r.f() } } } } }]
            },
            k = u((function(n) {
                function t(e, r) { return n.exports = t = Object.setPrototypeOf || function(n, t) { return n.__proto__ = t, n }, t(e, r) }
                n.exports = t
            }));
        var x = function(n, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(t && t.prototype, { constructor: { value: n, writable: !0, configurable: !0 } }), t && k(n, t)
        };
        var A = function(n) { if (void 0 === n) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return n };
        var j = function(n, t) { return !t || "object" !== c(t) && "function" != typeof t ? A(n) : t },
            P = u((function(n) {
                function t(e) { return n.exports = t = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) { return n.__proto__ || Object.getPrototypeOf(n) }, t(e) }
                n.exports = t
            }));
        var C = function(n, t) { if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function") };

        function S(n, t) {
            for (var e = 0; e < t.length; e++) {
                var r = t[e];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r)
            }
        }
        var O = function(n, t, e) { return t && S(n.prototype, t), e && S(n, e), n };

        function E(n, t) {
            var e;
            if ("undefined" == typeof Symbol || null == n[Symbol.iterator]) {
                if (Array.isArray(n) || (e = function(n, t) { if (!n) return; if ("string" == typeof n) return I(n, t); var e = Object.prototype.toString.call(n).slice(8, -1); "Object" === e && n.constructor && (e = n.constructor.name); if ("Map" === e || "Set" === e) return Array.from(n); if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return I(n, t) }(n)) || t && n && "number" == typeof n.length) {
                    e && (n = e);
                    var r = 0,
                        o = function() {};
                    return { s: o, n: function() { return r >= n.length ? { done: !0 } : { done: !1, value: n[r++] } }, e: function(n) { throw n }, f: o }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, a = !0,
                u = !1;
            return { s: function() { e = n[Symbol.iterator]() }, n: function() { var n = e.next(); return a = n.done, n }, e: function(n) { u = !0, i = n }, f: function() { try { a || null == e.return || e.return() } finally { if (u) throw i } } }
        }

        function I(n, t) {
            (null == t || t > n.length) && (t = n.length);
            for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
            return r
        }

        function z(n) {
            var t = function() { if ("undefined" == typeof Reflect || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0; try { return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0 } catch (n) { return !1 } }();
            return function() {
                var e, r = P(n);
                if (t) {
                    var o = P(this).constructor;
                    e = Reflect.construct(r, arguments, o)
                } else e = r.runPromise(this, arguments);
                return j(this, e)
            }
        }
        var _ = function() {
                function n() { C(this, n), this._listeners = {} }
                return O(n, [{
                    key: "tap",
                    value: function(n, t) {
                        if (null == n) throw new Error("Hook.on(): should be on(name:string, listener:function) but name is undefined");
                        if (null == t) throw new Error("Hook.on(): should be on(name:string, listener:function) but listener is undefined");
                        this._listeners[n] = t
                    }
                }, {
                    key: "off",
                    value: function(n) {
                        if (null == n) throw new Error("Hook.off(): should be on(name:string, listener:function) but name is undefined");
                        delete this._listeners[n]
                    }
                }, { key: "listeners", value: function(n) { return n ? this._listeners[n] : Object.values(this._listeners) } }]), n
            }(),
            L = function(n) {
                x(e, n);
                var t = z(e);

                function e() { return C(this, e), t.runPromise(this, arguments) }
                return O(e, [{
                    key: "call",
                    value: function(n) {
                        var t, e = this.listeners(),
                            r = E(e);
                        try {
                            for (r.s(); !(t = r.n()).done;) {
                                var o = t.value;
                                o.runPromise(void 0, arguments)
                            }
                        } catch (n) { r.e(n) } finally { r.f() }
                    }
                }]), e
            }(_),
            T = function(n) {
                x(r, n);
                var t, e = z(r);

                function r() { return C(this, r), e.runPromise(this, arguments) }
                return O(r, [{
                    key: "promise",
                    value: (t = s(l.mark((function n(t) {
                        var e, r, o, i, a = arguments;
                        return l.wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                                case 0:
                                    e = this.listeners(), r = E(e), n.prev = 2, r.s();
                                case 4:
                                    if ((o = r.n()).done) { n.next = 10; break }
                                    return i = o.value, n.next = 8, i.runPromise(void 0, a);
                                case 8:
                                    n.next = 4;
                                    break;
                                case 10:
                                    n.next = 15;
                                    break;
                                case 12:
                                    n.prev = 12, n.t0 = n.catch(2), r.e(n.t0);
                                case 15:
                                    return n.prev = 15, r.f(), n.finish(15);
                                case 18:
                                case "end":
                                    return n.stop()
                            }
                        }), n, this, [
                            [2, 12, 15, 18]
                        ])
                    }))), function(n) { return t.runPromise(this, arguments) })
                }]), r
            }(_),
            H = function(n) {
                x(e, n);
                var t = z(e);

                function e() { return C(this, e), t.runPromise(this, arguments) }
                return O(e, [{
                    key: "call",
                    value: function(n) {
                        var t, e = n,
                            r = this.listeners(),
                            o = E(r);
                        try {
                            for (o.s(); !(t = o.n()).done;) {
                                var i = t.value;
                                if (null == e) throw new Error("A listener in SyncWaterfallHook.trigger(context) returns null. This is not allowed. Did you forget returning sth in a listener?");
                                e = i.runPromise(void 0, [e].concat(Array.prototype.slice.call(arguments)))
                            }
                        } catch (n) { o.e(n) } finally { o.f() }
                        return e
                    }
                }]), e
            }(_),
            N = function(n) {
                x(r, n);
                var t, e = z(r);

                function r() { return C(this, r), e.runPromise(this, arguments) }
                return O(r, [{
                    key: "promise",
                    value: (t = s(l.mark((function n(t) {
                        var e, r, o, i, a, u = arguments;
                        return l.wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                                case 0:
                                    e = t, r = this.listeners(), o = E(r), n.prev = 3, o.s();
                                case 5:
                                    if ((i = o.n()).done) { n.next = 12; break }
                                    return a = i.value, n.next = 9, a.runPromise(void 0, [e].concat(Array.prototype.slice.call(u)));
                                case 9:
                                    e = n.sent;
                                case 10:
                                    n.next = 5;
                                    break;
                                case 12:
                                    n.next = 17;
                                    break;
                                case 14:
                                    n.prev = 14, n.t0 = n.catch(3), o.e(n.t0);
                                case 17:
                                    return n.prev = 17, o.f(), n.finish(17);
                                case 20:
                                    return n.abrupt("return", e);
                                case 21:
                                case "end":
                                    return n.stop()
                            }
                        }), n, this, [
                            [3, 14, 17, 20]
                        ])
                    }))), function(n) { return t.runPromise(this, arguments) })
                }]), r
            }(_),
            K = function(n) {
                x(e, n);
                var t = z(e);

                function e() { return C(this, e), t.runPromise(this, arguments) }
                return O(e, [{
                    key: "call",
                    value: function(n) {
                        var t, e = this.listeners(),
                            r = E(e);
                        try {
                            for (r.s(); !(t = r.n()).done;) {
                                var o = t.value,
                                    i = o.runPromise(void 0, arguments);
                                if (!i) return
                            }
                        } catch (n) { r.e(n) } finally { r.f() }
                    }
                }]), e
            }(_),
            R = function(n) {
                x(r, n);
                var t, e = z(r);

                function r() { return C(this, r), e.runPromise(this, arguments) }
                return O(r, [{
                    key: "call",
                    value: (t = s(l.mark((function n(t) {
                        var e, r, o, i, a = arguments;
                        return l.wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                                case 0:
                                    e = this.listeners(), r = E(e), n.prev = 2, r.s();
                                case 4:
                                    if ((o = r.n()).done) { n.next = 13; break }
                                    return i = o.value, n.next = 8, i.runPromise(void 0, a);
                                case 8:
                                    if (n.sent) { n.next = 11; break }
                                    return n.abrupt("return");
                                case 11:
                                    n.next = 4;
                                    break;
                                case 13:
                                    n.next = 18;
                                    break;
                                case 15:
                                    n.prev = 15, n.t0 = n.catch(2), r.e(n.t0);
                                case 18:
                                    return n.prev = 18, r.f(), n.finish(18);
                                case 21:
                                case "end":
                                    return n.stop()
                            }
                        }), n, this, [
                            [2, 15, 18, 21]
                        ])
                    }))), function(n) { return t.runPromise(this, arguments) })
                }]), r
            }(_);

        function D(n, t) {
            var e;
            if ("undefined" == typeof Symbol || null == n[Symbol.iterator]) {
                if (Array.isArray(n) || (e = function(n, t) { if (!n) return; if ("string" == typeof n) return F(n, t); var e = Object.prototype.toString.call(n).slice(8, -1); "Object" === e && n.constructor && (e = n.constructor.name); if ("Map" === e || "Set" === e) return Array.from(n); if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return F(n, t) }(n)) || t && n && "number" == typeof n.length) {
                    e && (n = e);
                    var r = 0,
                        o = function() {};
                    return { s: o, n: function() { return r >= n.length ? { done: !0 } : { done: !1, value: n[r++] } }, e: function(n) { throw n }, f: o }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, a = !0,
                u = !1;
            return { s: function() { e = n[Symbol.iterator]() }, n: function() { var n = e.next(); return a = n.done, n }, e: function(n) { u = !0, i = n }, f: function() { try { a || null == e.return || e.return() } finally { if (u) throw i } } }
        }

        function F(n, t) {
            (null == t || t > n.length) && (t = n.length);
            for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
            return r
        }

        function G(n) {
            function t(n, t) { return e.runPromise(this, arguments) }

            function e() {
                return (e = s(l.mark((function n(e, r) {
                    var o, i, a, u, f, s, g;
                    return l.wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                            case 0:
                                return r.log('- Add plugin "' + e.name + '"'), n.next = 3, r.hooks.preInitPlugin.promise(e, r);
                            case 3:
                                if (n.t0 = n.sent, n.t0) { n.next = 6; break }
                                n.t0 = e;
                            case 6:
                                if (y(!(e = n.t0).name, "Plugin ".concat(JSON.stringify(e), ' has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.'), "plugin.noName"), y("function" == typeof e, "Plugin ".concat(e.name, " is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())"), "plugin.isFunction"), y("object" !== c(e) || Array.isArray(e), "Plugin ".concat(e.name, " should be a configuration of type object, but is typeof ").concat(c(e), "."), "plugin.wrongType"), r.plugins.push(e), !e.init) { n.next = 18; break }
                                return y("function" != typeof e.init, 'Error in plugin "'.concat(e.name, '": config.init must be a function but is a ').concat(c(e.init)), "config.init.wrongtype"), r.log("- Execute init() function of plugin ".concat(e.name)), n.next = 16, e.init(e, r);
                            case 16:
                                if ((o = n.sent) && !o._context && "object" == c(o) && !Array.isArray(o)) { i = D(Object.keys(o) || {}); try { for (i.s(); !(a = i.n()).done;) u = a.value, r.log("- add " + u + " to global context."), r[u] = o[u] } catch (n) { i.e(n) } finally { i.f() } }
                            case 18:
                                if (!e.hooks || !e.hooks.initPlugin) { n.next = 21; break }
                                return n.next = 21, r.hooks.initPlugin.tap(e.name, e.hooks.initPlugin);
                            case 21:
                                y(e.plugins && !Array.isArray(e.plugins), 'Error in plugin "'.concat(e.name, '": config.plugin must be an array but is an ').concat(c(e.plugins)), "config.plugin.wrongtype"), f = D(e.plugins || []), n.prev = 23, f.s();
                            case 25:
                                if ((s = f.n()).done) { n.next = 31; break }
                                return g = s.value, n.next = 29, t(g, r);
                            case 29:
                                n.next = 25;
                                break;
                            case 31:
                                n.next = 36;
                                break;
                            case 33:
                                n.prev = 33, n.t1 = n.catch(23), f.e(n.t1);
                            case 36:
                                return n.prev = 36, f.f(), n.finish(36);
                            case 39:
                                return n.abrupt("return", r);
                            case 40:
                            case "end":
                                return n.stop()
                        }
                    }), n, null, [
                        [23, 33, 36, 39]
                    ])
                })))).runPromise(this, arguments)
            }
            return function() {
                var e = s(l.mark((function e() {
                    var r, o, i, a, u, f, s, g, p = arguments;
                    return l.wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (r = p.length > 0 && void 0 !== p[0] ? p[0] : {}, o = {
                                        plugins: [],
                                        config: r,
                                        _context: !0,
                                        addPlugin: t,
                                        hooks: { return: new T(["context"]), preInitPlugin: new N(["config", "context"]), pluginsInitialized: new T(["context"]), initPlugin: new T(["plugin", "context"]) },
                                        log: function() {
                                            var n;
                                            r.debug && (n = console).log.runPromise(n, arguments)
                                        }
                                    }, !n.changeConfig) { e.next = 6; break }
                                return e.next = 5, n.changeConfig(r, o);
                            case 5:
                                r = e.sent;
                            case 6:
                                return y(null == r, "pluginize(config,factoryConfig): factoryConfig.changeConfig returns null but should return the modified config.", "factoryConfig.changeConfig.isNull"), y("object" !== c(r), "pluginize(config,factoryConfig): factoryConfig.changeConfig returns a " + ("undefined" == typeof entry ? "undefined" : c(entry)) + "but should return an object.", "factoryConfig.changeConfig.wrongType"), y(Array.isArray(r), "pluginize(config,factoryConfig): factoryConfig.changeConfig returns an Array but should return an object.", "factoryConfig.changeConfig.wrongTypeArray"), r.debug && h("development"), r.name || (r.name = "PluginizeAsync"), o.log("Starting Pluginize."), e.next = 14, t(w, o);
                            case 14:
                                i = D(n.configs), e.prev = 15, i.s();
                            case 17:
                                if ((a = i.n()).done) { e.next = 23; break }
                                return u = a.value, e.next = 21, t(u, o);
                            case 21:
                                e.next = 17;
                                break;
                            case 23:
                                e.next = 28;
                                break;
                            case 25:
                                e.prev = 25, e.t0 = e.catch(15), i.e(e.t0);
                            case 28:
                                return e.prev = 28, i.f(), e.finish(28);
                            case 31:
                                return e.next = 33, t(r, o);
                            case 33:
                                f = D(o.plugins), e.prev = 34, f.s();
                            case 36:
                                if ((s = f.n()).done) { e.next = 45; break }
                                return y(null == (g = s.value), "error in Pluginize(config): hook preInitPlugin - a listener returns null but should  return an object (the modified config)", "config.changeConfig.returnNull"), y(Array.isArray(g) || "object" !== c(g), "error in Pluginize(config): hook preInitPlugin - a listener should return an object (the modified config) but returns a " + c(g), "config.changeConfig.wrongType"), o.log('- call hook "initPlugin" of plugin ' + g.name), e.next = 43, o.hooks.initPlugin.promise(g, o);
                            case 43:
                                e.next = 36;
                                break;
                            case 45:
                                e.next = 50;
                                break;
                            case 47:
                                e.prev = 47, e.t1 = e.catch(34), f.e(e.t1);
                            case 50:
                                return e.prev = 50, f.f(), e.finish(50);
                            case 53:
                                return o.log('- call hook "pluginsInitialized"'), e.next = 56, o.hooks.pluginsInitialized.promise(o);
                            case 56:
                                return e.next = 58, o.hooks.return.promise(o);
                            case 58:
                                if (!o.return) { e.next = 62; break }
                                return e.abrupt("return", o[o.return]);
                            case 62:
                                return e.abrupt("return", o);
                            case 63:
                            case "end":
                                return e.stop()
                        }
                    }), e, null, [
                        [15, 25, 28, 31],
                        [34, 47, 50, 53]
                    ])
                })));
                return function() { return e.runPromise(this, arguments) }
            }()
        }

        function M(n, t) {
            var e;
            if ("undefined" == typeof Symbol || null == n[Symbol.iterator]) {
                if (Array.isArray(n) || (e = function(n, t) { if (!n) return; if ("string" == typeof n) return U(n, t); var e = Object.prototype.toString.call(n).slice(8, -1); "Object" === e && n.constructor && (e = n.constructor.name); if ("Map" === e || "Set" === e) return Array.from(n); if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return U(n, t) }(n)) || t && n && "number" == typeof n.length) {
                    e && (n = e);
                    var r = 0,
                        o = function() {};
                    return { s: o, n: function() { return r >= n.length ? { done: !0 } : { done: !1, value: n[r++] } }, e: function(n) { throw n }, f: o }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, a = !0,
                u = !1;
            return { s: function() { e = n[Symbol.iterator]() }, n: function() { var n = e.next(); return a = n.done, n }, e: function(n) { u = !0, i = n }, f: function() { try { a || null == e.return || e.return() } finally { if (u) throw i } } }
        }

        function U(n, t) {
            (null == t || t > n.length) && (t = n.length);
            for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
            return r
        }

        function $(n) {
            function t(n, e) {
                if (e.log('- Add plugin "' + n.name + '"'), y(null == (n = e.hooks.preInitPlugin.call(n, e) || n), "Error: Plugin is null", "conf.isNull"), y(!n.name, "Plugin ".concat(JSON.stringify(n), ' has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.'), "plugin.noName"), y("function" == typeof n, "Plugin ".concat(n.name, " is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())"), "plugin.isFunction"), y("object" !== c(n) || Array.isArray(n), "Plugin ".concat(n.name, " should be a configuration of type object, but is typeof ").concat(c(n), "."), "plugin.wrongType"), e.plugins.push(n), n.init) {
                    y("function" != typeof n.init, 'Error in plugin "'.concat(n.name, '": config.init must be a function but is a ').concat(c(n.init)), "config.init.wrongtype"), e.log("- Execute init() function of plugin ".concat(n.name));
                    var r = n.init(n, e);
                    if (r && !r._context && "object" == c(r) && !Array.isArray(r)) {
                        var o, i = M(Object.keys(r) || {});
                        try {
                            for (i.s(); !(o = i.n()).done;) {
                                var a = o.value;
                                e.log("- add " + a + " to global context."), e[a] = r[a]
                            }
                        } catch (n) { i.e(n) } finally { i.f() }
                    }
                }
                n.hooks && n.hooks.initPlugin && e.hooks.initPlugin.tap(n.name, n.hooks.initPlugin), y(n.plugins && !Array.isArray(n.plugins), 'Error in plugin "'.concat(n.name, '": config.plugin must be an array but is an ').concat(c(n.plugins)), "config.plugin.wrongtype");
                var u, l = M(n.plugins || []);
                try { for (l.s(); !(u = l.n()).done;) { t(u.value, e) } } catch (n) { l.e(n) } finally { l.f() }
                return e
            }
            return function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    r = {
                        plugins: [],
                        config: e,
                        _context: !0,
                        addPlugin: t,
                        hooks: { return: new L(["context"]), preInitPlugin: new H(["config", "context"]), pluginsInitialized: new L(["context"]), initPlugin: new L(["plugin", "context"]) },
                        log: function() {
                            var n;
                            e.debug && (n = console).log.runPromise(n, arguments)
                        }
                    };
                n.changeConfig && (e = n.changeConfig(e, r)), y(null == e, "pluginize(config,factoryConfig): factoryConfig.changeConfig returns null but should return the modified config.", "factoryConfig.changeConfig.isNull"), y("object" !== c(e), "pluginize(config,factoryConfig): factoryConfig.changeConfig returns a " + ("undefined" == typeof entry ? "undefined" : c(entry)) + "but should return an object.", "factoryConfig.changeConfig.wrongType"), y(Array.isArray(e), "pluginize(config,factoryConfig): factoryConfig.changeConfig returns an Array but should return an object.", "factoryConfig.changeConfig.wrongTypeArray"), e.debug && h("development"), e.name || (e.name = "Pluginize"), r.log("Starting Pluginize."), t(w, r);
                var o, i = M(n.configs);
                try {
                    for (i.s(); !(o = i.n()).done;) {
                        var a = o.value;
                        t(a, r)
                    }
                } catch (n) { i.e(n) } finally { i.f() }
                t(e, r);
                var u, l = M(r.plugins);
                try {
                    for (l.s(); !(u = l.n()).done;) {
                        var f = u.value;
                        y(null == f, "error in Pluginize(config): hook preInitPlugin - a listener returns null but should  return an object (the modified config)", "config.changeConfig.returnNull"), y(Array.isArray(f) || "object" !== c(f), "error in Pluginize(config): hook preInitPlugin - a listener should return an object (the modified config) but returns a " + c(f), "config.changeConfig.wrongType"), r.log('- call hook "initPlugin" of plugin ' + f.name), r.hooks.initPlugin.call(f, r)
                    }
                } catch (n) { l.e(n) } finally { l.f() }
                return r.log('- call hook "pluginsInitialized"'), r.hooks.pluginsInitialized.call(r), r.hooks.return.call(r), r.return ? r[r.return] : r
            }
        }

        function W(n, t) {
            var e;
            if ("undefined" == typeof Symbol || null == n[Symbol.iterator]) {
                if (Array.isArray(n) || (e = function(n, t) { if (!n) return; if ("string" == typeof n) return Y(n, t); var e = Object.prototype.toString.call(n).slice(8, -1); "Object" === e && n.constructor && (e = n.constructor.name); if ("Map" === e || "Set" === e) return Array.from(n); if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return Y(n, t) }(n)) || t && n && "number" == typeof n.length) {
                    e && (n = e);
                    var r = 0,
                        o = function() {};
                    return { s: o, n: function() { return r >= n.length ? { done: !0 } : { done: !1, value: n[r++] } }, e: function(n) { throw n }, f: o }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, a = !0,
                u = !1;
            return { s: function() { e = n[Symbol.iterator]() }, n: function() { var n = e.next(); return a = n.done, n }, e: function(n) { u = !0, i = n }, f: function() { try { a || null == e.return || e.return() } finally { if (u) throw i } } }
        }

        function Y(n, t) {
            (null == t || t > n.length) && (t = n.length);
            for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
            return r
        }
        var q = ["resolve", "init"];
        return n.AsyncBreakableHook = R, n.AsyncHook = T, n.AsyncWaterfallHook = N, n.SyncBreakableHook = K, n.SyncHook = L, n.SyncWaterfallHook = H, n.pluginize = function() {
            var n, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                r = Object.assign({ configs: [], plugins: [] }, e);
            y(!Array.isArray(r.plugins), "pluginize(config,factoryConfig): factoryConfig.plugins should be null or an Array but is typeof " + c(r.plugins), "factoryConfig.plugins.wrongType");
            var o = Array.isArray(t) ? t : [t];
            o = o.map((function(n) { return n.name = n.name || "pluginize(config)", n })), (n = r.configs).push.runPromise(n, a(o));
            var i, u = W(r.plugins);
            try {
                var l = function() {
                    var n = i.value;
                    y("object" != c(n) || Array.isArray(n), "pluginize(config,factoryConfig): A plugin in factoryConfig.plugins is typeof " + c(n) + " but should be an object", "factoryConfig.plugins.plugin.wrongType"), y(Object.keys(n).some((function(n) { return !q.includes(n) })), "pluginize(config,factoryConfig): A plugin in factoryConfig.plugins has an invalid key. only ".concat(q.join(","), " is allowed."), "factoryConfig.plugins.plugin.wrongkey"), y(Object.keys(n).some((function(t) { return "function" != typeof n[t] })), "pluginize(config,factoryConfig): A plugin in factoryConfig.plugins has an invalid type. It must be typeof function.", "factoryConfig.plugins.plugin.wrongkeytype"), n.init && n.init(r)
                };
                for (u.s(); !(i = u.n()).done;) l()
            } catch (n) { u.e(n) } finally { u.f() }
            var f, s = G(r),
                g = $(r),
                p = { runPromise: s, run: g },
                h = W(r.plugins);
            try {
                for (h.s(); !(f = h.n()).done;) {
                    var d = f.value;
                    d.resolve && (p = d.resolve(p) || p)
                }
            } catch (n) { h.e(n) } finally { h.f() }
            return p
        }, n
    }({}),
    pluginize = pluginizeWrapper.pluginize;
//# sourceMappingURL=pluginize-es5.js.map