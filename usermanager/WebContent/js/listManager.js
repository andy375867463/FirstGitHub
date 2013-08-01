

$(document).ready(function() {
    /* 禁用的链接 */
    $('.a_disable').live("click", function(e) {
        e.preventDefault();
    });    
    /* select 的初值 */
    $('select').each(function() {
        var v = $(this).attr('selected_v');
        if (v == null || v == '')
            return;
        $(this).find('option').each(function() {
            if ($(this).val() == v) {
                $(this).parent().get(0).selectedIndex = $(this).prevAll('*').length;
            }
        });
    });

    $('.edit_prepare').click(function() {
        var currTr = $(this).closest('tr'),
                preTr = currTr.prev('tr');
        currTr.hide();
        preTr.show();
    });
    $('.edit_cancel').click(function() {
        var currTr = $(this).closest('tr'),
                nextTr = currTr.next('tr');
        currTr.hide();
        nextTr.show();
    });
    $('.edit_delete').click(function() {
        var btn = $(this);
        var tr = $(this).closest("tr"),
                id = tr.attr('item_id'),
                name = tr.attr('item_name');
        if (!confirm('你确定delete：' + name + " ?"))
            return;

        if (btn.attr('submiting') != null && btn.attr('submiting') == 'true')
            return;
        else
            btn.attr('submiting', 'true');

        btn.html('Wait....');
        var url=btn.attr('url');
        $.ajax(url, {
            data: "id=" + id + "&t=" + new Date().getTime(),
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    alert('OK！delete！');
                    location.reload();
                }
                else
                    alert(data.info);
                btn.html('delete');
                btn.attr('submiting', 'false');
            },
            error: function() {
                alert('Net error');
                btn.html('delete');
                btn.attr('submiting', 'false');
            }
        });
    });
    
    $('.edit_submit').click(function() {
        var btn = $(this);
        if (btn.attr('submiting') != null && btn.attr('submiting') == 'true')
            return;
        else
            btn.attr('submiting', 'true');
        btn.html('Wait....');

        var theForm = $('#edit_form');
        theForm.find('*').remove();
        $(this).closest('tr').find('select').each(function() {
            $('<input type="hiddern" />').attr('name', $(this).attr('name'))
                    .val($(this).find('option:selected').val())
                    .appendTo(theForm);
        });
        $(this).closest('tr').find('input').clone().appendTo(theForm);
        $.ajax(theForm.attr('action'), {
            data: theForm.serialize() + "&t=" + new Date().getTime(),
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    alert('修改OK！！');
                    location.reload();
                }
                else
                    alert(data.info);
                btn.html('submit');
                btn.attr('submiting', 'false');
            },
            error: function() {
                alert('Net error');
                btn.html('submit');
                btn.attr('submiting', 'false');
            }
        });
    });
});

