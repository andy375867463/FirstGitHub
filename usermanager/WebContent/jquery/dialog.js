/*!
 * jQuery UI Dialog 1.8.21
 *
 * 里面的东西大部分已被根据需要而修改
 $("#login_dialog").dialog({
 width:370,
 modal:true,   // 锁住屏幕
 autoOpen:false,
 buttons:{
 "登录":function (){
 submitLogin(this);
 },
 "关闭":function (){
 $('#dialog1').dialog('close');
 }
 }
 });
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function($, undefined) {

   var uiDialogClasses = 'ui-dialog ', /* 多个空格隔开 */
           sizeRelatedOptions = {
      buttons: true,
      height: true,
      maxHeight: true,
      maxWidth: true,
      minHeight: true,
      minWidth: true,
      width: true
   },
   resizableRelatedOptions = {
      maxHeight: true,
      maxWidth: true,
      minHeight: true,
      minWidth: true
   },
   // support for jQuery 1.3.2 - handle common attrFn methods for dialog
   attrFn = $.attrFn || {
   val: true,
           css: true,
           html: true,
           text: true,
           data: true,
           width: true,
           height: true,
           offset: true,
           click: true
   };

   $.widget("ui.dialog", {
      options: {
         autoOpen: true,
         buttons: {},
         closeOnEscape: true,
         closeText: '×',
         dialogClass: '',
         draggable: true,
         hide: null,
         height: 'auto',
         maxHeight: false,
         maxWidth: false,
         minHeight: 10,
         minWidth: 140,
         modal: true,
         buttonClass: '',
         keepPosition: false, /* 是否记录上次关闭时位置 */
         position: {
            my: 'center',
            at: 'center',
            collision: 'fit',
            // ensure that the titlebar is never outside the document
            using: function(pos) {
               var topOffset = $(this).css(pos).offset().top;
               if (topOffset < 0) {
                  $(this).css('top', pos.top - topOffset);
               }
            }
         },
         resizable: false,
         show: null,
         stack: true,
         title: '',
         width: 300,
         zIndex: 1000
      },
      _create: function() {
         this.originalTitle = this.element.attr('title');
         // #5742 - .attr() might return a DOMElement
         if (typeof this.originalTitle !== "string") {
            this.originalTitle = "";
         }

         this.options.title = this.options.title || this.originalTitle;
         var self = this,
                 options = self.options,
                 title = options.title || '&#160;',
                 elementId = self.element.attr("id") == null ? new Date().getTime() : self.element.attr("id"),
                 dialogId = "ui-dialog-" + elementId,
                 titleId = "ui-dialog-title-" + elementId,
                 uiDialog = (self.uiDialog = $('<div></div>'))
                 .appendTo(document.body)
                 .hide()
                 .addClass(uiDialogClasses + options.dialogClass)
                 .attr('id', dialogId)
                 .css({
            zIndex: options.zIndex
         })
                 // setting tabIndex makes the div focusable
                 // setting outline to 0 prevents a border on focus in Mozilla
                 .attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
            if (options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
                    event.keyCode === $.ui.keyCode.ESCAPE) {

               self.close(event);
               event.preventDefault();
            }
         })
                 .attr({
            role: 'dialog',
            'aria-labelledby': titleId
         })
                 .mousedown(function(event) {
            self.moveToTop(false, event);
         }),
                 uiDialogContent = self.element
                 .show()
                 .removeAttr('title')
                 .addClass('ui-dialog-content ')  /* 身子 */
                 .appendTo(uiDialog),
                 uiDialogTitlebar = (self.uiDialogTitlebar = $('<div></div>'))
                 .addClass('ui-dialog-titlebar') /* 头部的div */
                 .prependTo(uiDialog),
                 uiDialogTitlebarClose = $('<a href="#"></a>')
                 .addClass(
                 'ui-dialog-titlebar-close ' /*关闭 */
                 )
                 .click(function(event) {
            self.close(event);
            return false;
         })
                 .html('' + options.closeText)
                 .appendTo(uiDialogTitlebar),
                 uiDialogTitle = $('<span></span>')
                 .addClass('ui-dialog-title')
                 .attr('id', titleId)
                 .html(title)
                 .prependTo(uiDialogTitlebar);

         //handling of deprecated beforeclose (vs beforeClose) option
         //Ticket #4669 http://dev.jqueryui.com/ticket/4669
         //TODO: remove in 1.9pre
         if ($.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose)) {
            options.beforeClose = options.beforeclose;
         }

         uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

         if (options.draggable && $.fn.draggable) {
            self._makeDraggable();
         }
         if (options.resizable && $.fn.resizable) {
            self._makeResizable();
         }

         self._createButtons(options.buttons);
         self._isOpen = false;

         if ($.fn.bgiframe) {
            uiDialog.bgiframe();
         }
      },
      _init: function() {
         if (this.options.autoOpen) {
            this.open();
         }
      },
      destroy: function() {
         var self = this;

         self.uiDialog.hide();
         self.element
                 .unbind('.dialog')
                 .removeData('dialog')
                 .removeClass('ui-dialog-content')
                 .hide().appendTo('body');
         self.uiDialog.remove();

         if (self.originalTitle) {
            self.element.attr('title', self.originalTitle);
         }

         return self;
      },
      widget: function() {
         return this.uiDialog;
      },
      close: function(event) {
         var self = this,
                 maxZ, thisZ;

         if (false === self._trigger('beforeClose', event)) {
            return;
         }

         if (self.overlay) {
            $.screen('freeLock');/* yuan */
         }
         self.uiDialog.unbind('keypress.ui-dialog');

         self._isOpen = false;

         if (self.options.hide) {
            self.uiDialog.hide(self.options.hide, function() {
               self._trigger('close', event);
            });
         } else {
            self.uiDialog.hide();
            self._trigger('close', event);
         }

         // adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
         if (self.options.modal) {
            maxZ = 0;
            $('.ui-dialog').each(function() {
               if (this !== self.uiDialog[0]) {
                  thisZ = $(this).css('z-index');
                  if (!isNaN(thisZ)) {
                     maxZ = Math.max(maxZ, thisZ);
                  }
               }
            });
            $.ui.dialog.maxZ = maxZ;
         }

         return self;
      },
      isOpen: function() {
         return this._isOpen;
      },
      // the force parameter allows us to move modal dialogs to their correct
      // position on open
      moveToTop: function(force, event) {
         var self = this,
                 options = self.options,
                 saveScroll;

         if ((options.modal && !force) ||
                 (!options.stack && !options.modal)) {
            return self._trigger('focus', event);
         }

         if (options.zIndex > $.ui.dialog.maxZ) {
            $.ui.dialog.maxZ = options.zIndex;
         }


         //Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
         //  http://ui.jquery.com/bugs/ticket/3193
         saveScroll = {scrollTop: self.element.scrollTop(), scrollLeft: self.element.scrollLeft()};
         $.ui.dialog.maxZ += 1;
         self.uiDialog.css('z-index', $.ui.dialog.maxZ);
         self.element.attr(saveScroll);
         self._trigger('focus', event);

         return self;
      },
      open: function() {
         if (this._isOpen) {
            return;
         }

         var self = this,
                 options = self.options,
                 uiDialog = self.uiDialog;

         self.overlay = options.modal;

         self._size();
         self._position(options.position);
         uiDialog.show(options.show);
         self.moveToTop(true);

         if (self.overlay) {
            $.screen('addLock');
         }

         // prevent tabbing out of modal dialogs
         if (options.modal) {
            uiDialog.bind("keydown.ui-dialog", function(event) {
               if (event.keyCode !== $.ui.keyCode.TAB) {
                  return;
               }

               var tabbables = $(':tabbable', this),
                       first = tabbables.filter(':first'),
                       last = tabbables.filter(':last');

               if (event.target === last[0] && !event.shiftKey) {
                  first.focus(1);
                  return false;
               } else if (event.target === first[0] && event.shiftKey) {
                  last.focus(1);
                  return false;
               }
            });
         }

         // set focus to the first tabbable element in the content area or the first button
         // if there are no tabbable elements, set focus on the dialog itself
         $(self.element.find(':tabbable').get().concat(
                 uiDialog.find('.ui-dialog-buttonpane :tabbable').get().concat(
                 uiDialog.get()))).eq(0).focus();

         self._isOpen = true;
         self._trigger('open');

         return self;
      },
      _createButtons: function(buttons) {
         var self = this,
                 hasButtons = false,
                 uiDialogButtonPane = $('<div></div>')
                 .addClass(
                 'ui-dialog-buttonpane'  /* 按钮们 */
                 ),
                 uiButtonSet = $("<div></div>")
                 .addClass("ui-dialog-buttonset")
                 .appendTo(uiDialogButtonPane);
         // if we already have a button pane, remove it
         self.uiDialog.find('.ui-dialog-buttonpane').remove();

         if (typeof buttons === 'object' && buttons !== null) {
            $.each(buttons, function() {
               return !(hasButtons = true);
            });
         }

         if (hasButtons) {
            $.each(buttons, function(name, props) {
               props = $.isFunction(props) ?
                       {click: props, text: name} :
                       props;
               var button = $('<button type="button"></button>')
                       .click(function() {
                  props.click.apply(this, arguments); /* this 指向 */
               })
                       .appendTo(uiButtonSet);

               button.addClass('ui-button ' + self.options.buttonClass);  /* 按钮的class */

               // can't use .attr( props, true ) with jQuery 1.3.2.
               $.each(props, function(key, value) {
                  if (key === "click") {
                     return;
                  }
                  if (key in attrFn) {
                     button[ key ](value);
                  } else {
                     button.attr(key, value);
                  }
               });
               if ($.fn.button) {
                  button.button();
               }
            });
            uiDialogButtonPane.appendTo(self.uiDialog);/* 按钮为空时无buttonPane */
         }
      },
      _makeDraggable: function() {
         var self = this,
                 options = self.options,
                 doc = $(document),
                 heightBeforeDrag;

         function filteredUi(ui) {
            return {
               position: ui.position,
               offset: ui.offset
            };
         }

         self.uiDialog.draggable({
            cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
            handle: '.ui-dialog-titlebar', /* 拖动handle */
            containment: 'document',
            start: function(event, ui) {
               heightBeforeDrag = options.height === "auto" ? "auto" : $(this).height();
               $(this).height($(this).height()).addClass("ui-dialog-dragging");
               self._trigger('dragStart', event, filteredUi(ui));
            },
            drag: function(event, ui) {
               self._trigger('drag', event, filteredUi(ui));
            },
            stop: function(event, ui) {
               /* 是否记录拖动到的位置 yuan */
               if (options.keepPosition)
                  options.position = [ui.position.left - doc.scrollLeft(), ui.position.top - doc.scrollTop()];
               $(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
               self._trigger('dragStop', event, filteredUi(ui));

            }
         });
      },
      _makeResizable: function(handles) {
         handles = (handles === undefined ? this.options.resizable : handles);
         var self = this,
                 options = self.options,
                 // .ui-resizable has position: relative defined in the stylesheet
                 // but dialogs have to use absolute or fixed positioning
                 position = self.uiDialog.css('position'),
                 resizeHandles = (typeof handles === 'string' ?
                 handles	:
                 'n,e,s,w,se,sw,ne,nw'
                 );

         function filteredUi(ui) {
            return {
               originalPosition: ui.originalPosition,
               originalSize: ui.originalSize,
               position: ui.position,
               size: ui.size
            };
         }

         self.uiDialog.resizable({
            cancel: '.ui-dialog-content',
            containment: 'document',
            alsoResize: self.element,
            maxWidth: options.maxWidth,
            maxHeight: options.maxHeight,
            minWidth: options.minWidth,
            minHeight: self._minHeight(),
            handles: resizeHandles,
            start: function(event, ui) {
               $(this).addClass("ui-dialog-resizing");
               self._trigger('resizeStart', event, filteredUi(ui));
            },
            resize: function(event, ui) {
               self._trigger('resize', event, filteredUi(ui));
            },
            stop: function(event, ui) {
               $(this).removeClass("ui-dialog-resizing");
               options.height = $(this).height();
               options.width = $(this).width();
               self._trigger('resizeStop', event, filteredUi(ui));
               /* $.ui.dialog.overlay.resize(); */
            }
         })
                 .css('position', position)
                 .find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
      },
      _minHeight: function() {
         var options = this.options;

         if (options.height === 'auto') {
            return options.minHeight;
         } else {
            return Math.min(options.minHeight, options.height);
         }
      },
      _position: function(position) {
         var myAt = [],
                 offset = [0, 0],
                 isVisible;

         if (position) {
            // deep extending converts arrays to objects in jQuery <= 1.3.2 :-(
            //		if (typeof position == 'string' || $.isArray(position)) {
            //			myAt = $.isArray(position) ? position : position.split(' ');

            if (typeof position === 'string' || (typeof position === 'object' && '0' in position)) {
               myAt = position.split ? position.split(' ') : [position[0], position[1]];
               if (myAt.length === 1) {
                  myAt[1] = myAt[0];
               }

               $.each(['left', 'top'], function(i, offsetPosition) {
                  if (+myAt[i] === myAt[i]) {
                     offset[i] = myAt[i];
                     myAt[i] = offsetPosition;
                  }
               });

               position = {
                  my: myAt.join(" "),
                  at: myAt.join(" "),
                  offset: offset.join(" ")
               };
            }

            position = $.extend({}, $.ui.dialog.prototype.options.position, position);
         } else {
            position = $.ui.dialog.prototype.options.position;
         }

         // need to show the dialog to get the actual offset in the position plugin
         isVisible = this.uiDialog.is(':visible');
         if (!isVisible) {
            this.uiDialog.show();
         }
         this.uiDialog
                 // workaround for jQuery bug #5781 http://dev.jquery.com/ticket/5781
                 .css({top: 0, left: 0})
                 .position($.extend({of: window}, position));
         if (!isVisible) {
            this.uiDialog.hide();
         }
      },
      _setOptions: function(options) {
         var self = this,
                 resizableOptions = {},
                 resize = false;

         $.each(options, function(key, value) {
            self._setOption(key, value);

            if (key in sizeRelatedOptions) {
               resize = true;
            }
            if (key in resizableRelatedOptions) {
               resizableOptions[ key ] = value;
            }
         });

         if (resize) {
            this._size();
         }
         if (this.uiDialog.is(":data(resizable)")) {
            this.uiDialog.resizable("option", resizableOptions);
         }
      },
      _setOption: function(key, value) {
         var self = this,
                 uiDialog = self.uiDialog;

         switch (key) {
            //handling of deprecated beforeclose (vs beforeClose) option
            //Ticket #4669 http://dev.jqueryui.com/ticket/4669
            //TODO: remove in 1.9pre
            case "beforeclose":
               key = "beforeClose";
               break;
            case "buttons":
               self._createButtons(value);
               break;
            case "dialogClass":
               uiDialog
                       .removeClass(self.options.dialogClass)
                       .addClass(uiDialogClasses + value);
               break;
            case "disabled":
               if (value) {
                  uiDialog.addClass('ui-dialog-disabled');
               } else {
                  uiDialog.removeClass('ui-dialog-disabled');
               }
               break;
            case "draggable":
               var isDraggable = uiDialog.is(":data(draggable)");
               if (isDraggable && !value) {
                  uiDialog.draggable("destroy");
               }

               if (!isDraggable && value) {
                  self._makeDraggable();
               }
               break;
            case "position":
               self._position(value);
               break;
            case "resizable":
               // currently resizable, becoming non-resizable
               var isResizable = uiDialog.is(":data(resizable)");
               if (isResizable && !value) {
                  uiDialog.resizable('destroy');
               }

               // currently resizable, changing handles
               if (isResizable && typeof value === 'string') {
                  uiDialog.resizable('option', 'handles', value);
               }

               // currently non-resizable, becoming resizable
               if (!isResizable && value !== false) {
                  self._makeResizable(value);
               }
               break;
            case "title":
               // convert whatever was passed in o a string, for html() to not throw up
               $(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || '&#160;'));
               break;
         }

         $.Widget.prototype._setOption.apply(self, arguments);
      },
      _size: function() {
         /* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
          * divs will both have width and height set, so we need to reset them
          */
         var options = this.options,
                 nonContentHeight,
                 minContentHeight,
                 isVisible = this.uiDialog.is(":visible");

         // reset content sizing
         this.element.show().css({
            width: 'auto',
            minHeight: 0,
            height: 0
         });

         if (options.minWidth > options.width) {
            options.width = options.minWidth;
         }

         // reset wrapper sizing
         // determine the height of all the non-content elements
         nonContentHeight = this.uiDialog.css({
            height: 'auto',
            width: options.width
         })
                 .height();
         minContentHeight = Math.max(0, options.minHeight - nonContentHeight);

         if (options.height === "auto") {
            // only needed for IE6 support
            if ($.support.minHeight) {
               this.element.css({
                  minHeight: minContentHeight,
                  height: "auto"
               });
            } else {
               this.uiDialog.show();
               var autoHeight = this.element.css("height", "auto").height();
               if (!isVisible) {
                  this.uiDialog.hide();
               }
               this.element.height(Math.max(autoHeight, minContentHeight));
            }
         } else {
            this.element.height(Math.max(options.height - nonContentHeight, 0));
         }

         if (this.uiDialog.is(':data(resizable)')) {
            this.uiDialog.resizable('option', 'minHeight', this._minHeight());
         }
      }
   });

   $.extend($.ui.dialog, {
      version: "1.8.21",
      uuid: 0,
      maxZ: 0
   });


}(jQuery));
