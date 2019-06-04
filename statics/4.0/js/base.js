export var toast=function(msg){
    if(!msg){
        msg='数据加载中...';
    }
    $('#loading_msg').html(msg);
    $('#loadingToast').show();
}

export var hideToast=function(){
    $('#loadingToast').hide();
}