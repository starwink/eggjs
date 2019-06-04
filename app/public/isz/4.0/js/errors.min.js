/**
 * global window object isz
 */

$(function () {
    var clickOrTouch = '';

    var hasTouch = function () {
        var touchObj = {};
        touchObj.isSupportTouch = "ontouchend" in document ? true : false;
        touchObj.isEvent = touchObj.isSupportTouch ? 'touchend' : 'click';
        clickOrTouch = touchObj.isEvent;
    }
    hasTouch();

    $('#restat').on(clickOrTouch, function () {
        location.reload();
    })
});