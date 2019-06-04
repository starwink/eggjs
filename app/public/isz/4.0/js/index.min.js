/**
 * 通用外部库
 */
window.$ = require("jquery");
window.weui = require('weui.js')
window.base_alert = window.alert
window.alert = weui.alert
