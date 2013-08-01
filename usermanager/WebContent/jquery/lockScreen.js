(function() {
   //$.screen('lock','url("css/images/arrow_333.gif")');
   //$.screen('lock','#0f0');
   //$.screen('lock','red');

   var zIndex = 1000,
           opacity = 0.7,
           defaultBg = "#555",
           screenObj = null,
           ie6 = false;

   function lock(background) {
      if (screenObj === null)
         init();

      if (ie6) {
         setSize();
         setPosition();
         $(window).bind('resize', setSize).bind('scroll', setPosition);
      }
      if (typeof background === 'string')
         screenObj.css('background', background);
      else
         screenObj.css('background', defaultBg);

      screenObj.css('display', 'block');
   }

   function unlock() {
      screenObj.css('display', 'none');
      if (ie6)
         $(window).unbind('resize', setSize).unbind('scroll', setPosition);
   }

   function init() {
      screenObj = $('<div></div>')
              .css({
         position: 'fixed',
         top: 0, left: 0,
         display: 'none',
         zIndex: zIndex,
         opacity: opacity,
         width: '100%', height: '100%',
         backgroundRepeat: 'repeat'
      })
              .appendTo($('body'));
      ie6 = (navigator.userAgent === 'Mozilla/4.0 (compatible; MSIE 6.0)');
      if (ie6)
         screenObj.css('position', 'absolute');
   }

   function setSize() {
      __setSize();
      setTimeout(__setSize, 50);
   }
   function __setSize() {
      screenObj.height($(window).height()).width($(window).width());
   }
   function setPosition() {
      screenObj.css({
         top: $(window).scrollTop(),
         left: $(window).scrollLeft()
      });
   }

   var lockDepth = 0;
   $.extend({
      screen: function(action, bg) {
         if (action === 'lock') {
            lock(bg);
            lockDepth = 0xffff;
         } else if (action === 'unlock') {
            unlock();
            lockDepth = 0;
         } else if (action === 'addLock') {
            if (lockDepth === 0)
               lock(bg);
            lockDepth++;
         } else if (action === 'freeLock') {
            if (lockDepth === 1)
               unlock();
            lockDepth--;
         }
      }
   });
})();