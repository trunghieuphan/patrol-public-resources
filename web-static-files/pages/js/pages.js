(function ($) {
	'use strict';

	/**
	* Pages.
	 * @constructor
	 * @property {string}  VERSION      - Build Version.
	 * @property {string}  AUTHOR       - Author.
	 * @property {string}  SUPPORT      - Support Email.
	 * @property {string}  pageScrollElement  - Scroll Element in Page.
	 * @property {object}  $body - Cache Body.
	 */
	var Pages = function () {
		this.VERSION = "4.1.0";
		this.AUTHOR = "Revox";
		this.SUPPORT = "support@revox.io";

		this.pageScrollElement = 'html, body';
		this.$body = $('body');

		this.setUserOS();
		this.setUserAgent();
	}

	/** @function setUserOS
	* @description SET User Operating System eg: mac,windows,etc
	* @returns {string} - Appends OSName to Pages.$body
	*/
	Pages.prototype.setUserOS = function () {
		var OSName = "";
		if (navigator.appVersion.indexOf("Win") != -1) OSName = "windows";
		if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
		if (navigator.appVersion.indexOf("X11") != -1) OSName = "unix";
		if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";

		this.$body.addClass(OSName);
	}

	/** @function setUserAgent
	* @description SET User Device Name to mobile | desktop
	* @returns {string} - Appends Device to Pages.$body
	*/
	Pages.prototype.setUserAgent = function () {
		if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
			this.$body.addClass('mobile');
		} else {
			this.$body.addClass('desktop');
			if (navigator.userAgent.match(/MSIE 9.0/)) {
				this.$body.addClass('ie9');
			}
		}
	}

	/** @function isVisibleXs
	* @description Checks if the screen size is XS - Extra Small i.e below W480px
	* @returns {$Element} - Appends $('#pg-visible-xs') to Body
	*/
	Pages.prototype.isVisibleXs = function () {
		(!$('#pg-visible-xs').length) && this.$body.append('<div id="pg-visible-xs" class="visible-xs" />');
		return $('#pg-visible-xs').is(':visible');
	}

	/** @function isVisibleSm
	* @description Checks if the screen size is SM - Small Screen i.e Above W480px
	* @returns {$Element} - Appends $('#pg-visible-sm') to Body
	*/
	Pages.prototype.isVisibleSm = function () {
		(!$('#pg-visible-sm').length) && this.$body.append('<div id="pg-visible-sm" class="visible-sm" />');
		return $('#pg-visible-sm').is(':visible');
	}

	/** @function isVisibleMd
	* @description Checks if the screen size is MD - Medium Screen i.e Above W1024px
	* @returns {$Element} - Appends $('#pg-visible-md') to Body
	*/
	Pages.prototype.isVisibleMd = function () {
		(!$('#pg-visible-md').length) && this.$body.append('<div id="pg-visible-md" class="visible-md" />');
		return $('#pg-visible-md').is(':visible');
	}

	/** @function isVisibleLg
	* @description Checks if the screen size is LG - Large Screen i.e Above W1200px
	* @returns {$Element} - Appends $('#pg-visible-lg') to Body
	*/
	Pages.prototype.isVisibleLg = function () {
		(!$('#pg-visible-lg').length) && this.$body.append('<div id="pg-visible-lg" class="visible-lg" />');
		return $('#pg-visible-lg').is(':visible');
	}

	/** @function getUserAgent
	* @description Get Current User Agent.
	* @returns {string} - mobile | desktop
	*/
	Pages.prototype.getUserAgent = function () {
		return $('body').hasClass('mobile') ? "mobile" : "desktop";
	}

	/** @function setFullScreen
	* @description Make Browser fullscreen.
	*/
	Pages.prototype.setFullScreen = function (element) {
		// Supports most browsers and their versions.
		var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

		if (requestMethod) { // Native full screen.
			requestMethod.call(element);
		} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
			var wscript = new ActiveXObject("WScript.Shell");
			if (wscript !== null) {
				wscript.SendKeys("{F11}");
			}
		}
	}

	/** @function getColor
	* @description Get Color from CSS
	* @param {string} color - pages color class eg: primary,master,master-light etc.
	* @param {int} opacity
	* @returns {rgba}
	*/
	Pages.prototype.getColor = function (color, opacity) {
		opacity = parseFloat(opacity) || 1;

		var elem = $('.pg-colors').length ? $('.pg-colors') : $('<div class="pg-colors"></div>').appendTo('body');

		var colorElem = elem.find('[data-color="' + color + '"]').length ? elem.find('[data-color="' + color + '"]') : $('<div class="bg-' + color + '" data-color="' + color + '"></div>').appendTo(elem);

		var color = colorElem.css('background-color');

		var rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		var rgba = "rgba(" + rgb[1] + ", " + rgb[2] + ", " + rgb[3] + ', ' + opacity + ')';

		return rgba;
	}

	/** @function initSidebar
	* @description Initialize side bar to open and close
	* @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
	* @requires ui/sidebar.js
	*/
	Pages.prototype.initSidebar = function (context) {
		$('[data-pages="sidebar"]', context).each(function () {
			var $sidebar = $(this)
			$sidebar.sidebar($sidebar.data())
		})
	}

	/** @function initDropDown
	* @description Initialize Boot-Strap dropdown Menue
	* @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
	* @requires bootstrap.js
	*/
	Pages.prototype.initDropDown = function (context) {
		// adjust width of each dropdown to match content width
		$('.dropdown-default', context).each(function () {
			var btn = $(this).find('.dropdown-menu').siblings('.dropdown-toggle');
			var offset = 0;

			var menuWidth = $(this).find('.dropdown-menu').actual('outerWidth');

			if (btn.actual('outerWidth') < menuWidth) {
				btn.width(menuWidth - offset);
				$(this).find('.dropdown-menu').width(btn.actual('outerWidth'));
			} else {
				$(this).find('.dropdown-menu').width(btn.actual('outerWidth'));
			}
		});
	}

	/** @function initFormGroupDefault
	* @description Initialize Pages form group input
	* @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
	*/
	Pages.prototype.initFormGroupDefault = function (context) {
		$('.form-group.form-group-default', context).click(function () {
			$(this).find('input').focus();
		});

		if (!this.initFormGroupDefaultRun) {
			$('body').on('focus', '.form-group.form-group-default :input', function () {
				var type = $(this).attr("type");
				if (type == "checkbox" || type == "radio") {
					return;
				}
				$('.form-group.form-group-default').removeClass('focused');
				$(this).parents('.form-group').addClass('focused');
			});

			$('body').on('blur', '.form-group.form-group-default :input', function () {
				var type = $(this).attr("type");
				if (type == "checkbox" || type == "radio") {
					return;
				}
				$(this).parents('.form-group').removeClass('focused');
				if ($(this).val()) {
					$(this).closest('.form-group').find('label').addClass('fade');
				} else {
					$(this).closest('.form-group').find('label').removeClass('fade');
				}
			});

			// Only run the above code once.
			this.initFormGroupDefaultRun = true;
		}
	}

	/** @function initSlidingTabs
	* @description Initialize Bootstrap Custom Sliding Tabs
	* @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
	* @requires bootstrap.js
	*/
	Pages.prototype.initSlidingTabs = function (context) {
		$('a[data-toggle="tab"]', context).on('show.bs.tab', function (e) {
			e = $(e.target).parent().find('a[data-toggle=tab]');

			var hrefCurrent = e.data('target');
			if (hrefCurrent === undefined) {
				hrefCurrent = e.attr('href');
			}

			if (!$(hrefCurrent).is('.slide-left, .slide-right')) return;
			$(hrefCurrent).addClass('sliding');

			setTimeout(function () {
				$(hrefCurrent).removeClass('sliding');
			}, 100);
		});
	}
	/** @function reponsiveTabs
	* @description Responsive handlers for Bootstrap Tabs
	*/
	Pages.prototype.reponsiveTabs = function () {
		//Dropdown FX
		$('[data-init-reponsive-tabs="dropdownfx"]').each(function () {
			var drop = $(this);
			drop.addClass("d-none d-md-flex d-lg-flex d-xl-flex");
			var content = '<select class="cs-select cs-skin-slide full-width" data-init-plugin="cs-select">'
			for (var i = 1; i <= drop.children("li").length; i++) {
				var li = drop.children("li:nth-child(" + i + ")");
				var selected = "";
				if (li.children('a').hasClass("active")) {
					selected = "selected";
				}
				var tabRef = li.children('a').attr('href');
				if (tabRef == "#" || "") {
					tabRef = li.children('a').attr('data-target')
				}
				content += '<option value="' + tabRef + '" ' + selected + '>';
				content += li.children('a').text();
				content += '</option>';
			}
			content += '</select>'
			drop.after(content);
			var select = drop.next()[0];
			$(select).on('change', function (e) {
				var optionSelected = $("option:selected", this);
				var valueSelected = this.value;
				var tabLink = drop.find('a[data-target="' + valueSelected + '"]');
				if (tabLink.length == 0) {
					tabLink = drop.find('a[data-target="' + valueSelected + '"]')
				}
				tabLink.tab('show')
			})
			$(select).wrap('<div class="nav-tab-dropdown cs-wrapper full-width d-lg-none d-xl-none d-md-none"></div>');
			new SelectFx(select);
		});
	}
	/** @function initNotificationCenter
	* @description Initialize Pages Header Notifcation Dropdown
	*/
	Pages.prototype.initNotificationCenter = function () {
		$('body').on('click', '.notification-list .dropdown-menu', function (event) {
			event.stopPropagation();
		});
		$('body').on('click', '.toggle-more-details', function (event) {
			var p = $(this).closest('.heading');
			p.closest('.heading').children('.more-details').stop().slideToggle('fast', function () {
				p.toggleClass('open');
			});
		});
	}

	/** @function initProgressBars
	* @description Initialize Pages ProgressBars
	*/
	Pages.prototype.initProgressBars = function () {
		$(window).on('load', function () {
			// Hack: FF doesn't play SVG animations set as background-image
			$('.progress-bar-indeterminate, .progress-circle-indeterminate, .mapplic-pin').hide().show(0);
		});
	}

	/** @function initInputFile
	* @description Initialize File Input for Bootstrap Buttons and Input groups
	*/
	Pages.prototype.initInputFile = function () {
		$(document).on('change', '.btn-file :file', function () {
			var input = $(this),
				numFiles = input.get(0).files ? input.get(0).files.length : 1,
				label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
			input.trigger('fileselect', [numFiles, label]);
		});

		$('.btn-file :file').on('fileselect', function (event, numFiles, label) {
			var input = $(this).parents('.input-group').find(':text'),
				log = numFiles > 1 ? numFiles + ' files selected' : label;
			if (input.length) {
				input.val(log);
			} else {
				$(this).parent().html(log);
			}
		});
	}
	/** @function initHorizontalMenu
	* @description Initialize Horizontal Dropdown Menu
	*/
	Pages.prototype.initHorizontalMenu = function () {
		var animationTimer;

		var hMenu = $("[data-pages-init='horizontal-menu']");
		autoHideLi();
		$(document).on('click', '.menu-bar > ul > li', function () {
			if ($(this).children("ul").length == 0) {
				return;
			}
			if ($(window).width() < 992) {
				var menubar = $('.menu-bar');
				var el = $(this);
				var li = menubar.find('li');
				var sub = $(this).children('ul');

				if (el.hasClass("open active")) {
					el.find('.arrow').removeClass("open active");
					sub.slideUp(200, function () {
						el.removeClass("open active");
					});

				} else {
					menubar.find('li.open').find('ul').slideUp(200);
					menubar.find('li.open').find('a').find('.arrow').removeClass('open active');
					menubar.find('li.open').removeClass("open active");
					el.find('.arrow').addClass("open active");
					sub.slideDown(200, function () {
						el.addClass("open active");
					});
				}
			} else {
				if ($(this).hasClass('opening')) {
					_hideMenu($(this));
				}
				else {
					_showMenu($(this));
				}
			}

		});

		var resizeTimer;
		$(window).on('resize', function (e) {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				autoHideLi();
			}, 250);
		});

		$('.content').on('click', function () {
			$('.horizontal-menu .bar-inner > ul > li').removeClass('open');
			$('.menu-bar > ul > li').removeClass('open opening').children("ul").removeAttr("style");
			$("body").find(".ghost-nav-dropdown").remove();
		});

		$('[data-toggle="horizontal-menu"]').on('click touchstart', function (e) {
			e.preventDefault();
			$('body').toggleClass('horizontal-menu-open');
			if (!$('.horizontal-menu-backdrop').length) {
				$('.header').append('<div class="horizontal-menu-backdrop"/>');
				$('.horizontal-menu-backdrop').fadeToggle('fast');
			} else {
				$('.horizontal-menu-backdrop').fadeToggle('fast', function () {
					$(this).remove();
				});
			}

			$('.menu-bar').toggleClass('open');
		});

		function autoHideLi() {
			var hMenu = $("[data-pages-init='horizontal-menu']");
			var extraLiHide = parseInt(hMenu.data("hideExtraLi")) || 0
			if (hMenu.length == 0) {
				return
			}
			var hMenuRect = hMenu[0].getBoundingClientRect();
			var liTotalWidth = 0;
			var liCount = 0;
			hMenu.children('ul').children('li.more').remove();
			hMenu.children('ul').children('li').each(function (index) {
				$(this).removeAttr("style");
				liTotalWidth = liTotalWidth + $(this).outerWidth(true);
				liCount++;
			});

			if ($(window).width() < 992) {
				return;
			}

			var possibleLi = parseInt(hMenuRect.width / (liTotalWidth / liCount)) - 1;
			possibleLi = possibleLi - extraLiHide;

			if (liCount > possibleLi) {
				var wrapper = createWrapperLI(hMenu);
				for (var i = possibleLi; i < liCount; i++) {
					var currentLi = hMenu.children('ul').children('li').eq(i);
					var clone = currentLi.clone();
					clone.children("ul").addClass("sub-menu");
					wrapper.children("ul").append(clone);
					currentLi.hide();
				}
			}

		}

		function createWrapperLI(hMenu) {
			var li = hMenu.children('ul').append("<li class='more'><a href='javascript:;'><span class='title d-flex'><i class='pg-icon'>more_horizontal</i></span></a><ul></ul></li>");
			li = hMenu.children('ul').children('li.more');
			return li;
		}

		function _hideMenu($el) {
			var ul = $($el.children("ul")[0]);
			var ghost = $("<div class='ghost-nav-dropdown'></div>");
			if (ul.length == 0) {
				return;
			}
			var rect = ul[0].getBoundingClientRect();
			ghost.css({
				"width": rect.width + "px",
				"height": rect.height + "px",
				"z-index": "auto"
			})
			$el.append(ghost);
			var timingSpeed = ul.children("li").css('transition-duration');

			timingSpeed = parseInt(parseFloat(timingSpeed) * 1000);
			$el.addClass('closing');
			window.clearTimeout(animationTimer);
			animationTimer = window.setTimeout(function () {
				ghost.height(0);
				$el.removeClass('open opening closing');
			}, timingSpeed - 80);
		}
		function _showMenu($el) {

			var ul = $($el.children("ul")[0]);
			var ghost = $("<div class='ghost-nav-dropdown'></div>");
			$el.children(".ghost-nav-dropdown").remove();
			$el.addClass('open').siblings().removeClass('open opening');
			if (ul.length == 0) {
				return;
			}
			var rect = ul[0].getBoundingClientRect();
			ghost.css({
				"width": rect.width + "px",
				"height": "0px"
			});
			$el.append(ghost);
			ghost.height(rect.height);
			var timingSpeed = ghost.css('transition-duration');

			timingSpeed = parseInt(parseFloat(timingSpeed) * 1000)
			window.clearTimeout(animationTimer);
			animationTimer = window.setTimeout(function () {
				$el.addClass('opening');
				ghost.remove()
			}, timingSpeed);
		}
	}
	/** @function initTooltipPlugin
	* @description Initialize Bootstrap tooltip
	* @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
	* @requires bootstrap.js
	*/
	Pages.prototype.initTooltipPlugin = function (context) {
		$.fn.tooltip && $('[data-toggle="tooltip"]', context).tooltip();
	}
	/** @function initSelect2Plugin
	* @description Initialize select2 dropdown
	* @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
	* @requires select2.js version 4.0.x
	*/
	Pages.prototype.initSelect2Plugin = function (context) {
		$.fn.select2 && $('[data-init-plugin="select2"]', context).each(function () {
			$(this).select2({
				minimumResultsForSearch: ($(this).attr('data-disable-search') == 'true' ? -1 : 1)
			}).on('select2:open', function () {
				$.fn.scrollbar && $('.select2-results__options').scrollbar({
					ignoreMobile: false
				})
			});
		});
	}
	/** @function initScrollBarPlugin
	* @description Initialize Global Scroller
	* @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
	* @requires jquery-scrollbar.js
	*/
	Pages.prototype.initScrollBarPlugin = function (context) {
		$.fn.scrollbar && $('.scrollable', context).scrollbar({
			ignoreOverlay: false
		});
	}
	/** @function initListView
	* @description Initialize iOS like List view plugin
	* @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
	* @example <caption>data-init-list-view="ioslist"</caption>
	* @requires jquery-ioslist.js
	*/
	Pages.prototype.initListView = function (context) {
		$.fn.ioslist && $('[data-init-list-view="ioslist"]', context).ioslist();
		$.fn.scrollbar && $('.list-view-wrapper', context).scrollbar({
			ignoreOverlay: false
		});
	}

	/** @function initSelectFxPlugin
	* @description Initialize iOS like List view plugin
	* @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
	* @example <caption>select[data-init-plugin="cs-select"]</caption>
	*/
	Pages.prototype.initSelectFxPlugin = function (context) {
		window.SelectFx && $('select[data-init-plugin="cs-select"]', context).each(function () {
			var el = $(this).get(0);
			$(el).wrap('<div class="cs-wrapper"></div>');
			new SelectFx(el);
		});
	}
	/** @function initUnveilPlugin
	* @description To load retina images to img tag
	* @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
	*/
	Pages.prototype.initUnveilPlugin = function (context) {
		// lazy load retina images
		$.fn.unveil && $("img", context).unveil();
	}

	/** @function initValidatorPlugin
	* @description Inintialize and Overide exsisting jquery-validate methods.
	* @requires jquery-validate.js
	*/
	Pages.prototype.initValidatorPlugin = function () {
		/**
		 * Open the socket.
		 * @override
		 */
		$.validator && $.validator.setDefaults({
			ignore: "", // validate hidden fields, required for cs-select
			showErrors: function (errorMap, errorList) {
				var $this = this;
				$.each(this.successList, function (index, value) {
					var parent = $(this).closest('.form-group-attached');
					if (parent.length) return $(value).popover("hide");
				});
				return $.each(errorList, function (index, value) {

					var parent = $(value.element).closest('.form-group-attached');
					if (!parent.length) {
						return $this.defaultShowErrors();
					}
					var _popover;
					_popover = $(value.element).popover({
						trigger: "manual",
						placement: "top",
						html: true,
						template: '<div class="popover validation-popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
						container: parent.closest('form'),
						content: value.message
					});
					var parent = $(value.element).closest('.form-group');
					parent.addClass('has-error');
					$(value.element).popover("show");
				});
			},
			onfocusout: function (element) {
				var parent = $(element).closest('.form-group');
				if ($(element).valid()) {
					parent.removeClass('has-error');
					parent.next('.error').remove();
				}
			},
			onkeyup: function (element) {
				var parent = $(element).closest('.form-group');
				if ($(element).valid()) {
					$(element).removeClass('error');
					parent.removeClass('has-error');
					parent.next('label.error').remove();
					parent.find('label.error').remove();
				} else {
					parent.addClass('has-error');
				}
			},
			errorPlacement: function (error, element) {
				var parent = $(element).closest('.form-group');
				if (parent.hasClass('form-group-default')) {
					parent.addClass('has-error');
					error.insertAfter(parent);
				} else if (element.parent().hasClass('checkbox')) {
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				}
			}
		});
	}

	/** @function setBackgroundImage
	* @description load images to div using data API
	*/
	Pages.prototype.setBackgroundImage = function () {
		$('[data-pages-bg-image]').each(function () {
			var _elem = $(this)
			var defaults = {
				pagesBgImage: "",
				lazyLoad: 'true',
				progressType: '',
				progressColor: '',
				bgOverlay: '',
				bgOverlayClass: '',
				overlayOpacity: 0,
			}
			var data = _elem.data();
			$.extend(defaults, data);
			var url = defaults.pagesBgImage;
			var color = defaults.bgOverlay;
			var opacity = defaults.overlayOpacity;

			var overlay = $('<div class="bg-overlay"></div>');
			overlay.addClass(defaults.bgOverlayClass);
			overlay.css({
				'background-color': color,
				'opacity': 1
			});
			_elem.append(overlay);

			var img = new Image();
			img.src = url;
			img.onload = function () {
				_elem.css({
					'background-image': 'url(' + url + ')'
				});
				_elem.children('.bg-overlay').css({ 'opacity': opacity });
			}

		})
	}
	/** @function secondarySidebar
	* @description dropdown Toggle and responive toggle for secondary sidebar
	*/
	Pages.prototype.secondarySidebar = function () {
		$('[data-init="secondary-sidebar"]').each(function () {
			$(this).on('click', '.main-menu li a', function (e) {

				if ($(this).parent().children('.sub-menu') === false) {
					return;
				}
				var el = $(this);
				var parent = $(this).parent().parent();
				var li = $(this).parent();
				var sub = $(this).parent().children('.sub-menu');

				if (li.hasClass("open active")) {
					el.children('.arrow').removeClass("open active");
					sub.slideUp(200, function () {
						li.removeClass("open active");
					});

				} else {
					parent.children('li.open').children('.sub-menu').slideUp(200);
					parent.children('li.open').children('a').children('.arrow').removeClass('open active');
					parent.children('li.open').removeClass("open active");
					el.children('.arrow').addClass("open active");
					sub.slideDown(200, function () {
						li.addClass("open active");

					});
				}
				//e.preventDefault();
			});

		});

		$('[data-init="secondary-sidebar-toggle"]').each(function () {
			$(this).on("click", function (e) {
				var toggleRect = $(this).get(0).getBoundingClientRect();
				var menu = $('[data-init="secondary-sidebar"]');
				if (menu.hasClass("open")) {
					menu.removeClass("open");
					menu.removeAttr("style");
				}
				else {
					menu.addClass("open")
					var menuRect = menu.get(0).getBoundingClientRect();
					menu.css({
						top: toggleRect.bottom,
						'max-height': ($(window).height() - toggleRect.bottom),
						left: $(window).width() / 2 - menuRect.width / 2,
						'visibility': 'visible'
					});

				}
			})

		});

	}
	/** @function init
	* @description Inintialize all core components.
	*/
	Pages.prototype.init = function () {
		// init layout
		this.initSidebar();
		this.setBackgroundImage();
		this.initDropDown();
		this.initFormGroupDefault();
		this.initSlidingTabs();
		this.initNotificationCenter();
		this.initProgressBars();
		this.initHorizontalMenu();
		// init plugins
		this.initTooltipPlugin();
		this.initSelect2Plugin();
		this.initScrollBarPlugin();
		this.initSelectFxPlugin();
		this.initUnveilPlugin();
		this.initValidatorPlugin();
		this.initListView();
		this.initInputFile();
		this.reponsiveTabs();
		this.secondarySidebar();
	}

	$.Pages = new Pages();
	$.Pages.Constructor = Pages;

})(window.jQuery);
