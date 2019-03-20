fbq.disableConfigLoading = true; fbq.version = 'stable'; (function (a, b, c, d) { var e = { exports: {} }; var f = e.exports; (function () { var g = a.fbq; g.execStart = a.performance && a.performance.now && a.performance.now(); if (!(function () { var fb = a.postMessage || function () {}; if (!g) { fb({ action: 'FB_LOG', logType: 'Facebook Pixel Error', logMessage: 'Pixel code is not installed correctly on this page' }, '*'); if ('error' in console)console.error('Facebook Pixel Error: Pixel code is not installed correctly on this page'); return false } return true }())) return; 'use strict'; var h = typeof Symbol === 'function' && typeof (typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') === 'symbol' ? function (fb) { return typeof fb } : function (fb) { return fb && typeof Symbol === 'function' && fb.constructor === Symbol && fb !== (typeof Symbol === 'function' ? Symbol.prototype : '@@prototype') ? 'symbol' : typeof fb }; if (!g.__fbeventsModules) { g.__fbeventsModules = {}; g.__fbeventsResolvedModules = {}; g.getFbeventsModules = function (fb) { if (!g.__fbeventsResolvedModules[fb])g.__fbeventsResolvedModules[fb] = g.__fbeventsModules[fb](); return g.__fbeventsResolvedModules[fb] }; g.fbIsModuleLoaded = function (fb) { return !!g.__fbeventsModules[fb] }; g.ensureModuleRegistered = function (fb, gb) { if (!g.fbIsModuleLoaded(fb))g.__fbeventsModules[fb] = gb } }g.ensureModuleRegistered('SignalsParamList', function () { return (function (fb, gb, hb, ib) { var jb = { exports: {} }; var kb = jb.exports; (function () { 'use strict'; var lb = 'deep'; var mb = 'shallow'; function nb (qb) { if (typeof JSON === 'undefined' || JSON === null || !JSON.stringify) { return Object.prototype.toString.call(qb) } else return JSON.stringify(qb) } function ob (qb) { if (qb === null || qb === undefined) return true; var rb = typeof qb === 'undefined' ? 'undefined' : h(qb); return rb === 'number' || rb === 'boolean' || rb === 'string' } function pb (qb) { this._params = []; this._piiTranslator = qb }pb.ERROR_PII_WITH_NO_TRANSLATOR = 'Provide a PII Translation function in order to append PII data to the ' + 'ParamList.'; pb.prototype.addRange = function (qb) { var rb = this; qb.each(function (sb, tb) { return rb.append(sb, tb) }) }; pb.prototype.containsKey = function (qb) { for (var rb = 0; rb < this._params.length; rb++) if (this._params[rb].name === qb) return true; return false }; pb.prototype.get = function (qb) { var rb = qb; for (var sb = 0; sb < this._params.length; sb++) if (this._params[sb].name === rb) return this._params[sb].value; return null }; pb.prototype.append = function (qb, rb, sb) { this._append(encodeURIComponent(qb), rb, lb, sb); return this }; pb.prototype.appendHash = function (qb, rb) { for (var sb in qb) if (Object.prototype.hasOwnProperty.call(qb, sb)) this._append(sb, qb[sb], lb, rb); return this }; pb.fromHash = function (qb, rb) { return new pb(rb).appendHash(qb) }; pb.prototype._append = function (qb, rb, sb, tb) { if (ob(rb)) { this._appendPrimitive(qb, rb, tb) } else if (sb === lb) { this._appendObject(qb, rb, tb) } else this._appendPrimitive(qb, nb(rb), tb) }; pb.prototype._translateValue = function (qb, rb, sb) { if (typeof rb === 'boolean') return rb ? 'true' : 'false'; if (!sb) return '' + rb; if (!this._piiTranslator) throw new Error(pb.ERROR_PII_WITH_NO_TRANSLATOR); return this._piiTranslator(qb, '' + rb) }; pb.prototype._appendPrimitive = function (qb, rb, sb) { if (rb != null) { var tb = this._translateValue(qb, rb, sb); if (tb != null) this._params.push({ name: qb, value: tb }) } }; pb.prototype._appendObject = function (qb, rb, sb) { for (var tb in rb) if (Object.prototype.hasOwnProperty.call(rb, tb)) { var ub = qb + '[' + encodeURIComponent(tb) + ']'; this._append(ub, rb[tb], mb, sb) } }; pb.prototype.each = function (qb) { for (var rb = 0; rb < this._params.length; rb++) { var sb = this._params[rb]; var tb = sb.name; var ub = sb.value; qb(tb, ub) } }; pb.prototype.toQueryString = function () { var qb = []; this.each(function (rb, sb) { qb.push(rb + '=' + encodeURIComponent(sb)) }); return qb.join('&') }; jb.exports = pb })(); return jb.exports }(a, b, c, d)) }); g.ensureModuleRegistered('SignalsFBEventsUtils', function () { return (function (fb, gb, hb, ib) { var jb = { exports: {} }; var kb = jb.exports; (function () { 'use strict'; var lb = 'console'; var mb = 'error'; var nb = 'Facebook Pixel Error'; var ob = 'Facebook Pixel Warning'; var pb = 'warn'; var qb = Object.prototype.toString; var rb = !('addEventListener' in gb); var sb = function jc () {}; var tb = fb[lb] || {}; var ub = fb.postMessage || sb; function vb (jc) { return Array.isArray ? Array.isArray(jc) : qb.call(jc) === '[object Array]' } function wb (jc) { return typeof jc === 'number' || typeof jc === 'string' && /^\d+$/.test(jc) } function xb (jc) { ub({ action: 'FB_LOG', logType: nb, logMessage: jc }, '*'); if (mb in tb)tb[mb](nb + ': ' + jc) } function yb (jc, kc) { for (var lc = arguments.length, mc = Array(lc > 2 ? lc - 2 : 0), nc = 2; nc < lc; nc++)mc[nc - 2] = arguments[nc]; if (!jc)(function () { var oc = 0; throw new Error(kc.replace(/%s/g, function (pc) { return mc[oc++] })) })() } function zb (jc) { ub({ action: 'FB_LOG', logType: ob, logMessage: jc }, '*'); if (pb in tb)tb[pb](ob + ': ' + jc) } function ac (jc, kc, lc) { kc = rb ? 'on' + kc : kc; var mc = rb ? jc.attachEvent : jc.addEventListener; var nc = rb ? jc.detachEvent : jc.removeEventListener; var oc = function pc () { if (nc)nc.call(jc, kc, pc, false); lc() }; if (mc)mc.call(jc, kc, oc, false) } function bc (jc, kc, lc) { var mc = jc[kc]; jc[kc] = function () { var nc = mc.apply(this, arguments); lc.apply(this, arguments); return nc } } var cc = Object.prototype.hasOwnProperty; var dc = !{ toString: null }.propertyIsEnumerable('toString'); var ec = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor']; var fc = ec.length; function gc (jc) { if (Object.keys) return Object.keys(jc); if ((typeof jc === 'undefined' ? 'undefined' : h(jc)) !== 'object' && (typeof jc !== 'function' || jc === null)) throw new TypeError('Object.keys called on non-object'); var kc = []; for (var lc in jc) if (cc.call(jc, lc))kc.push(lc); if (dc) for (var mc = 0; mc < fc; mc++) if (cc.call(jc, ec[mc]))kc.push(ec[mc]); return kc } function hc (jc, kc) { if (Array.prototype.map) return Array.prototype.map.call(jc, kc); var lc = void 0; var mc = void 0; if (jc == null) throw new TypeError(' array is null or not defined'); var nc = Object(jc); var oc = nc.length >>> 0; if (typeof kc !== 'function') throw new TypeError(kc + ' is not a function'); lc = new Array(oc); mc = 0; while (mc < oc) { var pc, qc; if (mc in nc) { pc = nc[mc]; qc = kc.call(null, pc, mc, nc); lc[mc] = qc }mc++ } return lc } function ic (jc) { if (this == null) throw new TypeError('Array.prototype.some called on null or undefined'); if (typeof jc !== 'function') throw new TypeError(); var kc = Object(this); var lc = kc.length >>> 0; var mc = arguments.length >= 2 ? arguments[1] : void 0; for (var nc = 0; nc < lc; nc++) if (nc in kc && jc.call(mc, kc[nc], nc, kc)) return true; return false }jb.exports = { injectMethod: bc, isArray: vb, isNumber: wb, keys: gc, invariant: yb, listenOnce: ac, logError: xb, logWarning: zb, map: hc, each: function jc () { hc.apply(this, arguments) }, some: function jc (kc, lc) { return ic.call(kc, lc) } } })(); return jb.exports }(a, b, c, d)) }); g.ensureModuleRegistered('SignalsEvents', function () { return (function (fb, gb, hb, ib) { var jb = { exports: {} }; var kb = jb.exports; (function () { 'use strict'; var lb = g.getFbeventsModules('SignalsFBEventsUtils'); var mb = lb.keys; var nb = 0; function ob () { this._listeners = {} }ob.prototype.on = function (tb, ub) { var vb = nb++; if (!this._listeners[tb]) this._listeners[tb] = {}; this._listeners[tb][vb.toString()] = ub; return this._unsubscribe.bind(this, tb, vb.toString()) }; ob.prototype.trigger = function (tb) { var ub = this; for (var vb = arguments.length, wb = Array(vb > 1 ? vb - 1 : 0), xb = 1; xb < vb; xb++)wb[xb - 1] = arguments[xb]; if (!this._listeners[tb]) return []; return mb(this._listeners[tb]).map(function (yb) { return ub._listeners[tb][yb].apply(null, wb) }) }; ob.prototype._unsubscribe = function (tb, ub) { var vb = this._listeners[tb]; if (vb && vb[ub]) { delete vb[ub]; if (mb(vb).length === 0) delete this._listeners[tb] } }; function pb () { return new ob() } var qb = new ob(); var rb = qb.on.bind(qb); var sb = qb.trigger.bind(qb); jb.exports = { on: rb, trigger: sb, instance: qb, spawn: pb } })(); return jb.exports }(a, b, c, d)) }); g.ensureModuleRegistered('SignalsPixelEndpoint', function () { return (function (fb, gb, hb, ib) { var jb = { exports: {} }; var kb = jb.exports; (function () { 'use strict'; var lb = g.getFbeventsModules('SignalsParamList'); var mb = g.getFbeventsModules('SignalsFBEventsUtils'); var nb = g.getFbeventsModules('SignalsEvents'); var ob = nb.trigger; var pb = 'https://www.facebook.com/tr/'; var qb = hb.href; var rb = fb.top !== fb; var sb = gb.referrer; function tb (yb, zb, ac, bc) { yb.append('id', zb); yb.append('ev', ac); yb.append('dl', qb); yb.append('rl', sb); yb.append('if', rb); yb.append('ts', new Date().valueOf()); yb.append('cd', bc); return yb } function ub (yb, zb, ac, bc, cc) { var dc = new lb(cc); tb(dc, yb, zb, ac); if (bc)dc.addRange(bc); var ec = 'GET'; if (!wb(dc, cc)) { ec = 'POST'; xb(dc, cc) }ob('fired', ec, dc) } function vb (yb, zb, ac, bc, cc) { if (fb.navigator.sendBeacon) { var dc = new lb(cc); tb(dc, yb, zb, ac); if (bc)dc.addRange(bc); var ec = dc.toQueryString(); fb.navigator.sendBeacon(pb, ec); ob('fired', 'BEACON', dc) } } function wb (yb) { var zb = yb.toQueryString(); var ac = pb + '?' + zb; if (ac.length < 2048) { var bc = new Image(); bc.src = ac; return true } return false } function xb (yb) { var zb = 'fb' + Math.random().toString().replace('.', ''); var ac = gb.createElement('form'); ac.method = 'post'; ac.action = pb; ac.target = zb; ac.acceptCharset = 'utf-8'; ac.style.display = 'none'; var bc = !!(fb.attachEvent && !fb.addEventListener); var cc = bc ? '<iframe name="' + zb + '">' : 'iframe'; var dc = gb.createElement(cc); dc.src = 'javascript:false'; dc.id = zb; dc.name = zb; ac.appendChild(dc); mb.listenOnce(dc, 'load', function () { yb.each(function (ec, fc) { var gc = gb.createElement('input'); gc.name = ec; gc.value = fc; ac.appendChild(gc) }); mb.listenOnce(dc, 'load', function () { if (ac.parentNode)ac.parentNode.removeChild(ac) }); ac.submit() }); gb.body.appendChild(ac) }jb.exports = { sendEvent: ub, sendBeacon: vb } })(); return jb.exports }(a, b, c, d)) }); g.ensureModuleRegistered('SignalsEventValidation', function () { return (function (fb, gb, hb, ib) { var jb = { exports: {} }; var kb = jb.exports; (function () { 'use strict'; var lb = /^[+-]?\d+(\.\d+)?$/; var mb = 'number'; var nb = 'currency_code'; var ob = { AED: 1, ARS: 1, AUD: 1, BOB: 1, BRL: 1, CAD: 1, CHF: 1, CLP: 1, CNY: 1, COP: 1, CRC: 1, CZK: 1, DKK: 1, EUR: 1, GBP: 1, GTQ: 1, HKD: 1, HNL: 1, HUF: 1, IDR: 1, ILS: 1, INR: 1, ISK: 1, JPY: 1, KRW: 1, MOP: 1, MXN: 1, MYR: 1, NIO: 1, NOK: 1, NZD: 1, PEN: 1, PHP: 1, PLN: 1, PYG: 1, QAR: 1, RON: 1, RUB: 1, SAR: 1, SEK: 1, SGD: 1, THB: 1, TRY: 1, TWD: 1, USD: 1, UYU: 1, VEF: 1, VND: 1, ZAR: 1 }; var pb = { value: { type: mb, isRequired: true }, currency: { type: nb, isRequired: true } }; var qb = { PageView: {}, ViewContent: {}, Search: {}, AddToCart: {}, AddToWishlist: {}, InitiateCheckout: {}, AddPaymentInfo: {}, Purchase: { validationSchema: pb }, Lead: {}, CompleteRegistration: {}, CustomEvent: { validationSchema: { event: { isRequired: true } } } }; var rb = { agent: true }; var sb = Object.prototype.hasOwnProperty; function tb (wb, xb, yb) { this.error = null; this.warnings = []; this.eventName = wb; this.params = xb || {}; this.metadata = yb }tb.prototype.validateMetadata = function () { if (this.metadata) { var wb = this.metadata.toLowerCase(); var xb = rb[wb]; if (!xb) return this._error('Unsupported metadata argument: ' + wb) } return this }; tb.prototype.validateEvent = function () { var wb = this.eventName; if (!wb) return this; var xb = qb[wb]; if (!xb) { this.warnings.push('You are sending a non-standard event \'' + wb + '\'. The ' + 'preferred way to send events is using trackCustom. See ' + 'https://www.facebookmarketingdevelopers.com/pixels/up#sec-custom ' + 'for more information'); return this } var yb = xb.validationSchema; for (var zb in yb) if (sb.call(yb, zb)) { var ac = yb[zb]; if (ac) { if (ac.isRequired && !sb.call(this.params, zb)) return this._error('Required parameter "' + zb + '" is missing for event "' + wb + '"'); if (ac.type && typeof ac.type === 'string') if (!this._validateParam(zb, ac.type)) return this._error('Parameter "' + zb + '" is invalid for event "' + wb + '"') } } return this }; tb.prototype._validateParam = function (wb, xb) { var yb = this.params[wb]; switch (xb) { case mb:var zb = (typeof yb === 'string' || typeof yb === 'number') && lb.test('' + yb); if (zb && Number(yb) < 0) this.warnings.push('Parameter "' + wb + '" is negative for event "' + (this.eventName ? this.eventName : 'null') + '"'); return zb; case nb:return typeof yb === 'string' && !!ob[yb.toUpperCase()] } return true }; tb.prototype._error = function (wb) { this.error = wb; return this }; function ub (wb) { return new tb(null, null, wb).validateMetadata() } function vb (wb, xb) { return new tb(wb, xb).validateEvent() }jb.exports = { validateMetadata: ub, validateEvent: vb, Validator: tb } })(); return jb.exports }(a, b, c, d)) }); g.ensureModuleRegistered('SignalsFBEventsOptIn', function () { return (function (fb, gb, hb, ib) { var jb = { exports: {} }; var kb = jb.exports; (function () { 'use strict'; var lb = g.getFbeventsModules('SignalsFBEventsUtils'); var mb = lb.keys; function nb () { this._optIns = {} }nb.prototype.optIn = function (ob, pb) { if (!this._optIns[pb]) this._optIns[pb] = {}; this._optIns[pb][ob] = true; return this }; nb.prototype.isOptedIn = function (ob, pb) { return this._optIns[pb] && this._optIns[pb][ob] }; nb.prototype.listPixelIds = function (ob) { return this._optIns[ob] ? mb(this._optIns[ob]) : [] }; jb.exports = nb })(); return jb.exports }(a, b, c, d)) }); g.ensureModuleRegistered('SignalsFBEventsPluginPath', function () { return (function (fb, gb, hb, ib) { var jb = { exports: {} }; var kb = jb.exports; (function () { 'use strict'; var lb = /([/]en_US)?[/](fbevents|signals)([.]js|[/])/; function mb () { var pb = null; var qb = null; var rb = gb.getElementsByTagName('script'); for (var sb = 0; sb < rb.length && !pb; sb++) { var tb = rb[sb].src.split(lb); if (tb.length > 1) { pb = tb[0]; qb = rb[sb] } } return { baseURL: pb, scriptElement: qb } } var nb = null; function ob () { if (!nb)nb = mb(); return nb }jb.exports = { get: ob } })(); return jb.exports }(a, b, c, d)) }); g.ensureModuleRegistered('SignalsFBEventsFBQ', function () { return (function (fb, gb, hb, ib) { var jb = { exports: {} }; var kb = jb.exports; (function () { 'use strict'; var lb = g.getFbeventsModules('SignalsFBEventsOptIn'); var mb = g.getFbeventsModules('SignalsParamList'); var nb = g.getFbeventsModules('SignalsPixelEndpoint'); var ob = g.getFbeventsModules('SignalsFBEventsUtils'); var pb = g.getFbeventsModules('SignalsEventValidation'); var qb = g.getFbeventsModules('SignalsFBEventsPluginPath'); var rb = ob.each; var sb = ob.invariant; var tb = ob.keys; var ub = ob.logError; var vb = ob.map; var wb = ob.some; var xb = { Dwell: true, InferredEvents: true, Microdata: true }; var yb = { VALID_FEATURES: xb, optIn: function ac (bc, cc) { this.ensurePixel(bc); typeof cc === 'string' && xb[cc] || sb(0); if (cc === 'Dwell') { this.fbq.loadPlugin('dwell'); this.optIns.optIn(bc, cc) } else if (cc === 'InferredEvents') { this.fbq.loadPlugin('inferredevents'); this.optIns.optIn(bc, cc) } else if (cc === 'Microdata') { this.fbq.loadPlugin('microdata'); this.optIns.optIn(bc, cc) } return this }, trackSingleCustom: function ac (bc, cc, dc) { var ec = typeof bc === 'string' ? bc : bc.id; var fc = this.getDefaultSendData(ec, cc); fc.customData = dc; this.fire(fc, false); return this }, enqueue: function ac () { for (var bc = arguments.length, cc = Array(bc), dc = 0; dc < bc; dc++)cc[dc] = arguments[dc]; this.queue.append(cc); return this }, _validateSend: function ac (bc, cc) { bc.eventName && bc.eventName.length || sb(0); bc.pixelId && bc.pixelId.length || sb(0); if (bc.set)rb(vb(tb(bc.set), function (ec) { return pb.validateMetadata(ec) }), function (ec) { if (ec.error) throw new Error(ec.error); if (ec.warnings.length)rb(ec.warnings, ob.logWarning) }); if (cc) { var dc = pb.validateEvent(bc.eventName, bc.customData || {}); if (dc.error) throw new Error(dc.error); if (dc.warnings && dc.warnings.length)rb(dc.warnings, ob.logWarning) } return this }, fire: function ac (bc) { var cc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false; this._validateSend(bc, cc); if (bc.userData && tb(bc.userData).length > 0 && !this.fbq.loadPlugin('identity')) { this.enqueue('fire', bc); return this } var dc = new mb(this.fbq.piiTranslator); dc.append('ud', bc.userData, true); dc.append('v', this.fbq.version); bc.set && bc.set.agent && dc.append('a', bc.set.agent); var ec = this.fbq.trigger('getCustomParameters', { id: bc.pixelId }); rb(ec, function (fc) { return rb(tb(fc), function (gc) { if (dc.containsKey(gc)) { ub('Custom parameter ' + gc + ' has already been specified.') } else dc.append(gc, fc[gc]) }) }); nb.sendEvent(bc.pixelId, bc.eventName, bc.customData, dc); return this }, callMethod: function ac (bc) { var cc = bc[0]; var dc = Array.prototype.slice.call(bc, 1); if (typeof this[cc] === 'function') { try { this[cc].apply(this, dc) } catch (ec) { ub(ec.message) } } else ub('Invalid FBQ method ' + cc) }, getDefaultSendData: function ac (bc, cc) { var dc = this.getPixel(bc); var ec = { pixelId: bc, eventName: cc }; if (dc) { if (dc.userData)ec.userData = dc.userData; if (dc.agent) { ec.set = { agent: dc.agent } } else if (this.fbq.agent)ec.set = { agent: this.fbq.agent } } return ec }, getOptedInPixels: function ac (bc) { var cc = this; return this.optIns.listPixelIds(bc).map(function (dc) { return cc.pixelsByID[dc] }) }, ensurePixel: function ac (bc) { Object.prototype.hasOwnProperty.call(this.pixelsByID, bc) || sb(0) }, getPixel: function ac (bc) { this.ensurePixel(bc); return this.pixelsByID[bc] }, isWaitingOnAnyConfig: function ac () { var bc = this; return wb(tb(this.configsLoaded), function (cc) { return bc.configsLoaded[cc] === false }) }, loadConfig: function ac (bc) { if (this.fbq.disableConfigLoading || Object.prototype.hasOwnProperty.call(this.configsLoaded, bc)) return; this.configsLoaded[bc] = false; var cc = qb.get(); cc.baseURL && cc.scriptElement || sb(0); var dc = cc.baseURL + '/signals/config/' + bc + '?v=' + this.VERSION; var ec = gb.createElement('script'); ec.src = dc; ec.async = true; if (cc.scriptElement && cc.scriptElement.parentNode)cc.scriptElement.parentNode.insertBefore(ec, cc.scriptElement) }, configLoaded: function ac (bc) { this.configsLoaded[bc] = true; this.fbq.trigger('configLoaded', bc) } }; function zb (ac, bc) { this.VERSION = ac.version; this.pixelsByID = bc; this.fbq = ac; this.optIns = new lb(); this.configsLoaded = {} }zb.prototype = yb; jb.exports = zb })(); return jb.exports }(a, b, c, d)) }); g.ensureModuleRegistered('undefined', function () { return undefined }); 'use strict'; var g = a.fbq; var i = g.getFbeventsModules('SignalsParamList'); var j = g.getFbeventsModules('SignalsPixelEndpoint'); var k = g.getFbeventsModules('SignalsEvents'); var l = g.getFbeventsModules('SignalsFBEventsUtils'); var m = g.getFbeventsModules('SignalsEventValidation'); var n = g.getFbeventsModules('SignalsFBEventsFBQ'); var o = g.getFbeventsModules('SignalsFBEventsPluginPath'); var p = k.on; var q = k.trigger; var r = l.isArray; var s = l.isNumber; var t = l.logError; var u = l.keys; var v = l.each; function w (fb) { return g.getFbeventsModules(fb) } function x (fb) { return g.fbIsModuleLoaded(fb) } var y = '2.7.1'; var z = {}; var aa = []; var ba = { allowDuplicatePageViews: false }; var ca = 'NOT_INITIALIZED_YET'; var da = Array.prototype.slice; var ea = Object.prototype.hasOwnProperty; var fa = c.href; var ga = false; var ha = false; var ia = []; var ja = {}; var ka = b.referrer; var la = {}; var ma = new n(g, ja); function na (fb) { for (var gb in fb) if (ea.call(fb, gb)) this[gb] = fb[gb]; return this } function oa (fb) { if (aa.length || ma.isWaitingOnAnyConfig()) { g.queue.push(arguments); return } var gb = da.call(arguments); var hb = gb.length === 1 && r(gb[0]); if (hb)gb = gb[0]; if (fb.slice(0, 6) === 'report') { var ib = fb.slice(6); if (ib === 'CustomEvent') { ib = (gb[1] || {}).event || ib; gb = ['trackCustom', ib].concat(gb.slice(1)) } else gb = ['track', ib].concat(gb.slice(1)) } if (typeof gb[0] !== 'string')t('The first argument to fbq must be a method name'); fb = gb.shift(); switch (fb) { case 'addPixelId':ga = true; pa.apply(this, gb); break; case 'init':ha = true; pa.apply(this, gb); break; case 'set':ra.apply(this, gb); break; case 'track':if (s(gb[0])) { ua.apply(this, gb); break } if (hb) { ta.apply(this, gb); break }sa.apply(this, gb); break; case 'trackCustom':ta.apply(this, gb); break; case 'send':va.apply(this, gb); break; case 'on':p.apply(null, gb); break; case 'loadPlugin':ab(gb[0]); break; default:ma.callMethod(arguments); break } }g._initHandlers = []; g._initsDone = {}; function pa (fb, gb, hb) { ca = Date.now(); if (ea.call(ja, fb)) { l.logError('Duplicate Pixel ID: ' + fb); return } var ib = { agent: hb ? hb.agent : null, id: fb, userData: gb || {}, eventCount: 0 }; ia.push(ib); ja[fb] = ib; if (gb != null)ab('identity'); qa(); ma.loadConfig(fb) } function qa () { g._initHandlers.forEach(function (fb, gb) { if (!g._initsDone[gb])g._initsDone[gb] = {}; ia.forEach(function (hb) { if (!g._initsDone[gb][hb.id]) { g._initsDone[gb][hb.id] = true; fb(hb) } }) }) } function ra (fb, gb, hb) { var ib = m.validateMetadata(fb); if (ib.error)l.logError(ib.error); if (ib.warnings) for (var jb = 0; jb < ib.warnings.length; jb++)l.logWarning(ib.warnings[jb]); if (ea.call(ja, hb)) { for (var kb = 0, lb = ia.length; kb < lb; kb++) if (ia[kb].id === hb) { ia[kb][fb] = gb; break } } else l.logWarning('Trying to set argument ' + gb + (' for uninitialized pixel ID ' + hb)) } function sa (fb, gb) { gb = gb || {}; var hb = m.validateEvent(fb, gb); if (hb.error)l.logError(hb.error); if (hb.warnings) for (var ib = 0; ib < hb.warnings.length; ib++)l.logWarning(hb.warnings[ib]); if (fb === 'CustomEvent' && typeof gb.event === 'string')fb = gb.event; ta.call(this, fb, gb) } function ta (fb, gb) { var hb = this instanceof na ? this : ba; var ib = fb === 'PageView'; for (var jb = 0, kb = ia.length; jb < kb; jb++) { var lb = ia[jb]; if (ib && hb.allowDuplicatePageViews === false && la[lb.id] === true) continue; xa(lb, fb, gb); if (ib)la[lb.id] = true } } function ua (fb, gb) { xa(null, fb, gb) } function va (fb, gb) { for (var hb = 0, ib = ia.length; hb < ib; hb++)xa(ia[hb], fb, gb) } function wa (fb) { var gb = new i(g.piiTranslator); gb.append('ud', fb && fb.userData || {}, true); gb.append('v', y || g.version); gb.append('a', fb && fb.agent ? fb.agent : g.agent); if (fb) { gb.append('ec', fb.eventCount); fb.eventCount++ } var hb = q('getCustomParameters', fb); v(hb, function (ib) { return v(u(ib), function (jb) { if (gb.containsKey(jb)) { t('Custom parameter ' + jb + ' has already been specified.') } else gb.append(jb, ib[jb]) }) }); return gb } function xa (fb, gb, hb) { j.sendEvent(fb ? fb.id : null, gb, hb, wa(fb)) } function ya () { while (g.queue.length && !aa.length && !ma.isWaitingOnAnyConfig()) { var fb = g.queue.shift(); oa.apply(g, fb) } } function za (fb) { return 'fbevents.plugins.' + fb } function ab (fb) { var gb = za(fb); if (z[gb]) return true; if (x(gb)) { bb(gb, w(gb)); return true } var hb = o.get(); if (hb.baseURL && hb.scriptElement) { var ib = hb.baseURL + '/signals/plugins/' + fb + '.js?v=' + g.version; if (!z[gb]) { aa.push(gb); var jb = b.createElement('script'); jb.src = ib; jb.async = true; if (hb.scriptElement && hb.scriptElement.parentNode)hb.scriptElement.parentNode.insertBefore(jb, hb.scriptElement) } } return false } function bb (fb, gb) { if (ea.call(gb, '__fbEventsPlugin') && gb.__fbEventsPlugin === 1) { z[fb] = gb; z[fb].plugin(g, ma); q('pluginLoaded', fb) } var hb = aa.indexOf(fb); if (hb > -1)aa.splice(hb, 1); if (!aa.length) { q('pluginsLoaded'); ya() } } if (g.pixelId) { ga = true; pa(g.pixelId) } if (ga && ha || a.fbq !== a._fbq)l.logWarning('Multiple pixels with conflicting versions were detected on this page'); if (ia.length > 1)l.logWarning('Multiple different pixels were detected on this page'); (function fb () { if (g.disablePushState === true) return; if (!d.pushState || !d.replaceState) return; var gb = function hb () { ka = fa; fa = c.href; if (fa === ka) return; var ib = new na({ allowDuplicatePageViews: true }); oa.call(ib, 'trackCustom', 'PageView') }; l.injectMethod(d, 'pushState', gb); l.injectMethod(d, 'replaceState', gb); a.addEventListener('popstate', gb, false) })(); function cb (fb) { g._initHandlers.push(fb); qa() } function db () { return { pixelInstantiationIdentifier: ca, pixels: ia } } function eb (fb) { ma = new n(fb, ja); fb.callMethod = oa; fb.loadPlugin = ab; fb.registerPlugin = bb; fb._initHandlers = []; fb._initsDone = {}; fb.on = p; fb.send = va; fb.trigger = q; fb.getEventCustomParameters = wa; fb.addInitHandler = cb; fb.getState = db }eb(a.fbq); p('configLoaded', function () { if (!ma.isWaitingOnAnyConfig())ya() }); ya(); e.exports = { addInitHandler: function fb (gb) { g._initHandlers.push(gb); qa() }, doExport: eb, getState: db, getEventCustomParameters: wa, sendEvent: xa, loadPlugin: ab }; q('execEnd'); q('initialized', g); if (g.registerPlugin)g.registerPlugin('fbevents', e.exports); g.ensureModuleRegistered('fbevents', function () { return e.exports }) })(); return e.exports })(window, document, location, history)
