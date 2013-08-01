
$('input').live('focus', function() {
    $(this).addClass('ui-input-focus');
}).live('blur', function() {
    $(this).removeClass('ui-input-focus');
});


$('.ui-select').live('focus', function() {
    $(this).addClass('ui-select-focus');
}).live('blur', function() {
    $(this).removeClass('ui-select-focus');
});


$(document).ready(function() {
    var s = $('select[name=age]');
    for (var i = 1; i < 120; i++) {
        $('<option></option>').val(i + '').html(i + '').appendTo(s);
    }
});

/* hint提示管理 */
$(document).ready(function() {
    var lastModified = -1,
            defaultObj = $('#hint');

    window.hint = function(msg, autoHide, id) {
        var t = new Date().getTime(),
                obj;
        if (typeof id == 'string') {
            obj = $('#' + id);
        } else
            obj = defaultObj;

        lastModified = t;
        if (typeof msg != 'string' || /^\s*$/.test(msg)) {
            obj.text(' ');
            obj.hide();
            return;
        }
        obj.html(msg);
        obj.show(100);
        if (typeof autoHide == 'undefined' || autoHide) {
            setTimeout(function() {
                if (t == lastModified)
                    obj.hide(100);
            }, 5000);
        }
    };
    hint();
});

/* 自适应高度 ,注意不可跨域 */
(function() {
    function setFrameHeight() {

        this.each(function() {

            var obj = $(this),
                    id = obj.attr('id');

            var currHeight = -1;
            obj.bind("heightChange", function(e, h) {
                obj.height(h);
                currHeight = h;
            });

            setInterval(function() {
                if (typeof window.frames[id].document === 'undefined')
                    return;//可能还在加载中
                var b = $('body', window.frames[id].document);
                if (b.length < 1)
                    return;
                var h = b.outerHeight(true);

                if (h !== currHeight)
                    obj.trigger('heightChange', [h]);
            }, 20);
        });
        return this;
    }

    function setFrameBlockWidth(minWidth) {
        this.each(function() {
            var obj = $(this);
            var currWidth = -1;
            obj.bind("widthChange", function(e, w) {
                obj.width(w);
                currWidth = w;
            });
            setInterval(function() {
                var w = obj.parent().width();
                if (w != currWidth)
                    if (w > minWidth) {
                        obj.trigger('widthChange', [w]);
                    } else if (currWidth != minWidth) {
                        obj.trigger('widthChange', [minWidth]);
                    }
            }, 21);
        });
        return this;
    }
    $.fn.extend({
        frameHeight: setFrameHeight,
        frameBlockWidth: setFrameBlockWidth
    });
})();