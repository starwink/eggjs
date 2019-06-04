/*
 * 租金确认
 */
import {toast,hideToast} from "./../base.js";

$(function(){
    var submit_type=1;
    var retFalse=function(){
      return false
    }
    var clickOrTouch='';
    
    var hasTouch=function(){
        var touchObj={};
        touchObj.isSupportTouch = "ontouchend" in document ? true : false;
        touchObj.isEvent=touchObj.isSupportTouch?'touchend':'click';
        clickOrTouch=touchObj.isEvent;
    }
    hasTouch();

    $('.result .button').on(clickOrTouch,function(){
        $('.tool').show();
        $('.result').hide();
    })

    $('.tool .button').on(clickOrTouch,function(){
        var zx=$('#zx').val();
        var wt=$('#wt').val();
        var cf=$('#cf').val();
        if(zx.length==0){
            alert('请输入装修费用');
            return false;
        }
        if(wt.length==0){
            alert('请输入委托价格');
            return false;
        }
        if(cf.length==0){
            alert('请输入出房价');
            return false;
        }

        $('.ans').html('');
        var getdata={zx:zx,wt:wt,cf:cf};
        $.ajax({
            url: '/tool/api/result?zx=30000&cf=6000&wt=4000',
            datatype: "json",
            type: 'GET', //GET POST 
            data: getdata,
            timeout: 5000,
            beforeSend:function(){
              toast('正在测算')
            },
            success: function (ret) { //成功后回调
                hideToast();
                if(ret.code==200){
                    $.each(ret.items, function (i, val) {
                        var arr = Object.keys(val[0]);
                        for(var h=1;h<=arr.length;h++){
                            
                            if($('#h'+h+'h'+i)){
                                $('#h'+h+'h'+i).html(val[0][h])
                            }

                        }
                    })
                    $('.result').show();
                    $('.tool').hide();
                }else{
                    alert('服务器异常');
                }
            },
            error: function (XMLHttpRequest, status) {
              if (status = 'timeout') {
                alert('请求超时,请稍后再试');
              }
            }
        })

    })
});