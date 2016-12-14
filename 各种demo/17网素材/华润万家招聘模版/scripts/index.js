var TOUCH = "stop",
	TOUCH_X = 0,
	TOUCH_Y = 0,
	OFFSET_X = 0,
	OFFSET_Y = 0,
	console = console || {
		log: function() {}
	};
if ("ontouchstart" in document) var touchstart = "touchstart",
	touchend = "touchend",
	touchmove = "touchmove";
else var touchstart = "mousedown",
	touchend = "mouseup",
	touchmove = "mousemove";
document.body.addEventListener(touchstart, function(e) {
	TOUCH = "start";
	if ("touchstart" == touchstart) {
		var t = e.changedTouches || e.targetTouches,
			n = t[0];
		TOUCH_X = n.pageX, TOUCH_Y = n.pageY
	} else TOUCH_X = e.clientX, TOUCH_Y = e.clientY
}, !1), document.body.addEventListener(touchmove, function(e) {
	if ("start" != TOUCH && "move" != TOUCH) return;
	var t = 0,
		n = 0;
	if ("touchstart" == touchstart) {
		var r = e.changedTouches || e.targetTouches,
			i = r[0];
		t = Math.abs(i.pageX - TOUCH_X), n = Math.abs(i.pageY - TOUCH_Y)
	} else t = Math.abs(e.clientX - TOUCH_X), n = Math.abs(e.clientY - TOUCH_Y);
	if (t > 5 || n > 5) TOUCH = "move";
	OFFSET_X = t, OFFSET_Y = n
}, !1), document.body.addEventListener(touchend, function(e) {
	TOUCH = "stop"
}, !1), document.body.addEventListener("touchcancel", function(e) {
	TOUCH = "stop"
}, !1);
var get_transform_value = function(e, t) {
		t = t.replace(/\-/g, "\\-");
		var n = [0];
		if (arguments.length > 2) for (var r = 2; r < arguments.length; ++r) n[r - 2] = arguments[r];
		if ("none" == e || "" == e) return null;
		var i = new RegExp(t + "\\(([^\\)]+)\\)", "ig"),
			s = e.match(i),
			o = [],
			u = [];
		if (s && s.length > 0) {
			s = s[0], o = s.replace(i, "$1").split(",");
			for (var r = 0; r < n.length; ++r) u.push(o[n[r]])
		}
		return u.length == 1 && (u = u[0]), u
	},
	transform_css = function() {
		var e = document.createElement("div");
		return e.style.cssText = "-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;", e.style.webkitTransition ?
		function(e) {
			return {
				"-webkit-transform": e
			}
		} : e.style.mozTransition ?
		function(e) {
			return {
				"-moz-transform": e
			}
		} : e.style.oTransition ?
		function(e) {
			return {
				"-o-transform": e
			}
		} : e.style.msTransition ?
		function(e) {
			return {
				"-ms-transform": e
			}
		} : function(e) {
			return {
				transform: e
			}
		}
	}(),
	INDEX = function() {
		var e = $(".wrapper"),
			t = 0,
			n = 0,
			r = 0,
			i = document.documentElement.clientHeight,
			s = document.documentElement.clientWidth,
			o = e.children("section").length - 1,
			u = i * o,
			a = 0,
			f = e.children("section");
		e.css({
			height: 10 * i + "px"
		}), f.css({
			height: i + "px"
		}), window.onresize = function() {
			var t = i,
				n = s;
			i = document.documentElement.clientHeight, s = document.documentElement.clientWidth, u = i * o, r = -1 * a * i, c && (i < s ? l.show() : l.hide()), i != t && (e.css({
				height: 10 * i + "px"
			}), f.css({
				height: i + "px"
			})), "stop" == TOUCH && (i != t && e.css(transform_css("translate3d(0," + r + "px,0)")), s != n && m.each(function() {
				var e = parseInt(this.getAttribute("pos")) || 0;
				e && $(this).css(transform_css("translate3d(-" + e * s + "px,0,0)"))
			}))
		};
		var l = function() {
				var e = document.getElementById("lock");
				return {
					show: function() {
						window.scroll(0, 0), e.style.display = "block"
					},
					hide: function() {
						window.scroll(0, 0), e.style.display = "none"
					}
				}
			}(),
			c = !("onorientationchange" in window);
		c || (window.addEventListener("orientationchange", function() {
			window.orientation != 0 ? l.show() : l.hide()
		}, !1), window.orientation != 0 && l.show());
		var h = function() {
				var s = 0;
				e.on(touchstart, function(e) {
					var n = $(this).css("-webkit-transform") || $(this).css("-moz-transform") || $(this).css("-o-transform") || $(this).css("-ms-transform") || $(this).css("transform");
					r = parseInt(get_transform_value(n, "translate3d", 1)) || 0;
					if ("touchstart" == touchstart) {
						var i = e.targetTouches || e.changedTouches;
						if ( !! i) {
							var s = i[0];
							t = s.pageY
						}
					} else t = e.clientY;
					e.preventDefault()
				}).on(touchmove, function(i) {
					if ("start" != TOUCH && "move" != TOUCH) return;
					i.preventDefault();
					if ("touchstart" == touchstart) {
						var s = i.targetTouches || i.changedTouches;
						if ( !! s) {
							var o = s[0];
							n = o.pageY - t, e.css(transform_css("translate3d(0," + (r + n) + "px,0)"))
						}
					} else n = i.clientY - t, e.css(transform_css("translate3d(0," + (r + n) + "px,0)"))
				}).on(touchend, function(t) {
					var n = $(this).css("-webkit-transform") || $(this).css("-moz-transform") || $(this).css("-o-transform") || $(this).css("-ms-transform") || $(this).css("transform"),
						s = parseInt(get_transform_value(n, "translate3d", 1)) || r,
						o = s - r,
						f = a;
					if ("start" == TOUCH && o != 0) return;
					if (Math.abs(o) > 80) {
						o > 0 && r < 0 ? f = a - 1 : o < 0 && Math.abs(r - i) < u && (f = a + 1), p(a, f);
						return
					}
					if (0 == o) return;
					e.addClass("restore").css(transform_css("translate3d(0,-" + a * i + "px,0)")), setTimeout(function() {
						e.removeClass("restore")
					}, 200)
				})
			},
			p = function(t, n, r) {
				var s = r ? "without_keep" : "keep",
					o = r ? 0 : 600;
				e.addClass(s).css(transform_css("translate3d(0,-" + n * i + "px,0)")), setTimeout(function() {
					t != n && (d[n] && typeof d[n].init == "function" && d[n].init(), d[t] && typeof d[t].uninit == "function" && d[t].uninit()), e.removeClass(s)
				}, o), e.attr("pos", n), a = n
			},
			d = [];
		d[0] = function() {
			var t = e.children(".sec1"),
				n = t.find(".petals > .petal"),
				r = t.find('[removeStyle="Y"]');
			r.each(function() {
				this.setAttribute("cssText", this.style.cssText)
			}), n.each(function() {
				this.setAttribute("cssText", this.style.cssText)
			}), h_wrp = t.children(".h_wrp");
			var i = function(e) {
					n.length > e && (n.get(e).style.cssText = "", setTimeout(function() {
						i(++e)
					}, 100))
				},
				s = function() {
					r.each(function() {
						var e = parseInt(this.getAttribute("delay")) || 0,
							t = this;
						e > 0 ? setTimeout(function() {
							t.style.cssText = ""
						}, e) : t.style.cssText = ""
					}), setTimeout(function() {
						i(0)
					}, 500)
				},
				o = function() {
					h_wrp.show(), setTimeout(s, 100)
				},
				u = function() {
					r.each(function() {
						this.style.cssText = this.getAttribute("cssText")
					}), n.each(function() {
						this.style.cssText = this.getAttribute("cssText")
					})
				},
				a = function() {
					h_wrp.hide(), setTimeout(u, 100)
				};
			return {
				init: o,
				uninit: a
			}
		}();
		var v = function(t, n, r) {
				t = t || "1", r = r || "Y";
				var i = n || e.children(".sec" + t),
					s = i.find('[removeStyle="' + r + '"]'),
					o = i.find('[pop="' + r + '"]'),
					u = i.find("[addClass]"),
					a = i.children(".h_wrp"),
					f = i.find('[horizontal="drag"]').get(0);
				s.each(function() {
					this.setAttribute("cssText", this.style.cssText)
				}), o.each(function() {
					this.setAttribute("cssText", this.style.cssText)
				});
				var l = function(e) {
						e = e || 0, o.length > e && (o.get(e).style.cssText = "", setTimeout(function() {
							l(++e)
						}, 100))
					},
					c = function() {
						o.each(function() {
							this.style.cssText = this.getAttribute("cssText")
						})
					},
					h = function() {
						s.each(function() {
							var e = parseInt(this.getAttribute("delay")) || 0,
								t = this;
							e > 0 ? setTimeout(function() {
								t.style.cssText = ""
							}, e) : t.style.cssText = ""
						}), l(), u.each(function() {
							var e = parseInt(this.getAttribute("delay")) || 0,
								t = this;
							e > 0 ? setTimeout(function() {
								$(t).addClass(t.getAttribute("addClass"))
							}, e) : $(t).addClass(t.getAttribute("addClass"))
						})
					},
					p = function() {
						a.show(), f && w(f, 0), setTimeout(h, 100)
					},
					d = function() {
						s.each(function() {
							this.style.cssText = this.getAttribute("cssText")
						}), c(), u.each(function() {
							$(this).removeClass(this.getAttribute("addClass"))
						})
					},
					v = function() {
						a.hide(), setTimeout(d, 100)
					};
				return {
					init: p,
					uninit: v
				}
			};
		//d[1] = v("2"), d[2] = v("3"), d[3] = v("4"), d[4] = v("5"), d[5] = v("6"), d[6] = v("7");
		d[1] = v("_desc"), d[2] = v("2"), d[3] = v("3"), d[4] = v("4"), d[5] = v("5"), d[6] = v("5-app"), d[7] = v("6"), d[8] = v("7"), d[9] = v("8");
		var m = e.find('[horizontal="drag"]'),
			g = [],
			y = e.find("ul.tab");
		m.each(function(e) {
			var t = $(this).find("dd");
			g[e] = g[e] || [];
			for (var n = 0; n <= t.length; ++n) 0 == n && (g[e][0] = d[e + 2]), g[e][n] = v(n - 1, t.eq(n - 1), "N")
		});
		var b = function(e) {
				var t = 0,
					n = 0,
					r = 0,
					i = 0,
					o = 0,
					u = $(e).children("dd").length,
					a = 0;
				$(e).on(touchstart, function(e) {
					var i = $(this).css("-webkit-transform") || $(this).css("-moz-transform") || $(this).css("-o-transform") || $(this).css("-ms-transform") || $(this).css("transform"),
						s = get_transform_value(i, "translate3d", 0);
					t = parseInt(s) || 0, n = 0, r = 0, o = 0, TOUCH = "start"
				}).on(touchmove, function(e) {
					if ("stop" == TOUCH) return;
					if (o == -1) return;
					if ("touchstart" == touchstart) {
						var i = e.changedTouches || e.targetTouches,
							s = i[0];
						n = s.pageX - TOUCH_X, r = s.pageY - TOUCH_Y
					} else n = e.clientX - TOUCH_X, r = e.clientY - TOUCH_Y;
					if (1 != o && Math.abs(n) < Math.abs(r)) {
						o = -1;
						return
					}
					o = 1, e.stopPropagation(), $(this).css(transform_css("translate3d(" + (t + n) + "px,0,0)")), TOUCH = "move"
				}).on(touchend, function(e) {
					var r = this;
					i = Math.abs(t / s), Math.abs(n) >= 60 ? n > 0 ? i > 0 && --i : n < 0 && i < u && ++i : n == 0 && (i = -1), w(this, i);
					var o = (new Date).getTime();
					"start" == TOUCH && (a ? o - a <= 300 ? (a = 0, $(this).next().toggle()) : a = o : a = o), TOUCH = "stop"
				})
			},
			w = function(t, n) {
				n = Math.round(n);
				if (-1 == n) return;
				var r = parseInt(t.getAttribute("pos")) || 0,
					i = parseInt(e.attr("pos")) || 0;
				t.setAttribute("pos", n), $(t).addClass("h_keep");
				if (n >= 0) {
					$(t).css(transform_css("translate3d(-" + n * s + "px,0,0)"));
					var o = y.eq(i - 3).children("li").removeClass("focus").eq(n - 1);
					n > 0 && o.addClass("focus")
				}
				setTimeout(function() {
					$(t).removeClass("h_keep")
				}, 200);
				if (n == r) return;
				i -= 2, i >= 0 && g[i] && setTimeout(function() {
					g[i][n].init(), g[i][r].uninit()
				}, 200)
			};
		m.each(function() {
			b(this)
		}), e.find(".sec2 ul > li").on(touchend, function(e) {
			if ("start" != TOUCH) return;
			if (e.target.tagName == "LI") return;
			var index = $(this).index();
			var t = index + 3;
			if(index == 3)
				t = index + 4;

			//var t = index != 2 ? (index + 3) : (index + 4),
			var	n = t - 1 > 1 ? !0 : !1;
			p(1, t, n)
		}), e.find("section .moz > .tab").each(function() {
			var e = $(this).parent().prev().get(0);
			$(this).find("li").each(function(t) {
				$(this).on(touchend, function(n) {
					if ("start" != TOUCH) return;
					w(e, t + 1)
				})
			})
		}), $("#home").on(touchend, function(e) {
			if ("start" != TOUCH) return;
			p(6, 0, "no_transition")
		}), $("#start").on(touchend, function(e) {
			if ("start" != TOUCH) return;
			p(0, 1)
		});
		try {
			var E = new Parallax(e.find(".sec1").get(0))
		} catch (S) {}
		var x = $("#loading"),
			T = $("#loading_text"),
			N = function() {
				var e = ["images/logo.png", "images/bg.jpg", "images/sawtooth.png", "images/desc.png", "images/petals.png", "images/paipop.png", "images/manager.png", "images/feeling.png", "images/girl.png", "images/tech.png", "images/ronlin.png", "images/iphone.png"],
					t = e.length,
					n = 0,
					r = function(e) {
						var r = new Image;
						r.onload = function() {
							++n, T.text(parseInt(n / t * 100) + "%")
						}, r.src = e
					};
				for (var i = 0; i < t; ++i) r(e[i]);
				var s = 60,
					o = function() {
						0 >= s ? n / t > .5 ? u() : alert("����ͼƬʧ�ܣ��뷵��ˢ�³���!") : (s -= .5, n == t ? u() : setTimeout(o, 500))
					},
					u = function() {};
				return function(e) {
					typeof e == "function" && (u = e), o()
				}
			}();
		N(function() {
			x.hide(), e.show().find(".sec0 > .logo").addClass("breathe"), setTimeout(function() {
				e.find(".sec0").css({
					opacity: "0"
				})
			}, 800), setTimeout(function() {
				e.find(".sec0").css({
					display: "none"
				})
			}, 2e3), setTimeout(function() {
				d[0].init(), h()
			}, 2500)
		})
	}();
(function() {
	function i() {
		WeixinJSBridge.on("menu:share:appmessage", s), WeixinJSBridge.on("menu:share:timeline", o)
	}
	function s() {
		WeixinJSBridge.invoke("sendAppMessage", {
			img_url: t,
			img_width: "150",
			img_height: "150",
			link: e,
			desc: n,
			title: r
		}, function(e) {})
	}
	function o() {
		WeixinJSBridge.invoke("shareTimeline", {
			img_url: t,
			img_width: "150",
			img_height: "150",
			link: e,
			desc: n,
			title: n
		}, function(e) {})
	}
	var e = "http://wx.ilwei.com/hd/bainaozp/",
		t = "http://wx.ilwei.com/hd/bainaozp/images/123.png",
		n = "������ҵ�����Ƹ��I want you����������˲���Ƹ��ʼ�ˣ��쵽��������",
		r = "������ҵ����Ŷ���Ƹ";
	typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function" ? i() : document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", i, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", i), document.attachEvent("onWeixinJSBridgeReady", i))
})()