

function validate(theForm) {
    var age = theForm.find('select[name=age] option:selected'),
            sex = theForm.find('select[name=sex] option:selected'),
            addr = theForm.find('input[name=addr]'),
            name = theForm.find('input[name=name]');
    if (name.val() == '') {
        return "Please input username！";
    }
    if (!metadata.name.test(name.val())) {
        return "username format error！";
    }
    if (sex.val() == null || !metadata.number.test(sex.val())) {
        return "please select name！";
    }
    
    if (sex.val() == null || !metadata.number.test(age.val())) {
        return "please select gender！";
    }

    if (addr.val() == '') {
        return "please input address!";
    }
    if (!metadata.addr.test(addr.val())) {
        return "Address format error！";
    }
    return null;
}


/* 提交表单 */
$(document).ready(function() {
    var theForm = $('#the_form');
    window.addSubmit = function() {
        var validateResult = validate(theForm);
        if (validateResult != null) {
            hint(validateResult);
            return;
        }

        if (theForm.attr('submiting') != null
                && theForm.attr('submiting') == 'true')
            return;
        else
            theForm.attr('submiting', 'true');
        hint('submiting..');
        $.ajax(theForm.attr('action'), {
            data: theForm.serialize() + "&t=" + new Date().getTime(),
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    hint('Add OK！');
                    addReset();
                    setTimeout(function() {
                        $('body').trigger('addSuccess');
                        theForm.attr('submiting', 'false');
                    }, 1000);
                } else {
                    hint(data.info);
                    theForm.attr('submiting', 'false');
                }
            },
            error: function() {
                hint('Net error!');
                theForm.attr('submiting', 'false');
            }
        });
    };
    window.addReset = function() {
        theForm.get(0).reset();       
    };
});

/* 添加框 */
$(document).ready(function() {
    var addDialog = $("#add_dialog");
    window.callAddDialog = function() {
        hint();
        addDialog.dialog('open');
    };
    window.closeAddDialog = function() {
        addDialog.dialog('close');
    };
    addDialog.dialog({
        width: 380,
        modal: true, // 锁住屏幕
        buttonClass: 'ui-button-broad',
        autoOpen: false
    });

    $('body').bind('addSuccess', function() {
        closeAddDialog();
    });
    $("#add_submit_btn").click(function() {
        addSubmit();
    });
    $("#dialog_close_btn").click(function() {
        closeAddDialog();
    });
});
