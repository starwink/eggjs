'use strict';
// const { app, mock, assert } = require('egg-mock/bootstrap');


// var demo={
//     printf(text,...params){
//         console.log(text);
//         console.log(params);
//         return 123;
//     },
//     toString() {
//         return '(123)';
//     }
// }
var moment = require('moment');//时间
const xss = require('xss'); //html处理
class isz_node_common {
    constructor(_this) {
        this._this= _this;
    }
    init(){
        return {
            //生成图片资源链接
            staticsUrl:(url)=>{
                if(!url){ return false;}
                let _this=this._this;
                //this.request.header.host
                if(_this.app.config.env!='prod' && _this.app.config.env!='sim' ){
                    return _this.app.config.statics_params.host+'/'+url+'?v='+ moment().format('YYYYMMDDHHmmss');
                }else{
                    return _this.app.config.statics_params.host+'/'+url+'?v='+_this.app.config.statics_params.num
                }
            },
            iszUrl:(url)=>{
                if(!url){ return false;}
                let _this=this._this;
                if(url!='/'){
                    if(url.indexOf("?")==-1){
                        if(url.charAt(url.length-1)!='/'){
                          url=url+'/';
                        }
                    }else{
                      let urlData=url.split('?');
                      if(urlData[0].charAt(urlData[0].length-1)!='/'){
                        url=urlData[0]+'?'+urlData[1];
                      }
                    }
                }else{
                    url='';
                }
                let host=_this.ctx.request.header.host;
                if(host=='hz.ishangzu.com'){
                    host='www.ishangzu.com'
                }
                if(url.indexOf('.html/')){
                    url=url.replace('.html/','.html');
                }
                let req_ip=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                let tmpIp=host.split(':');
                if(req_ip.test(tmpIp[0])){
                    return 'http://'+host+'/'+url;
                }else{
                    return 'https://'+host+'/'+url;
                }
            },
            //PC异常提示
            abort:(msg,code=404,params)=>{
                return this._this.ctx.render('pc/error/index.html', Object.assign({errCode:code,errMsg:msg},params));
                // return this._this.ctx.render('error.html', Object.assign({code:code,msg:msg},params));
            },
            //PC异常提示
            abortm:(msg,code=404,params)=>{
                return this._this.ctx.render('web/error/index.html', Object.assign({errCode:code,errMsg:msg},params));
                // return this._this.ctx.render('error.html', Object.assign({code:code,msg:msg},params));
            },
            //删除html标签
            notHtml:function(data){
                let options = {
                    stripIgnoreTag:true,
                    whiteList: {}
                }
                var notHtml = xss(data,options);
                return notHtml;
            },
            
            date:(format='YYYY-MM-DD HH:mm:ss',time='',cn=false)=>{
                if(cn==false){
                    moment.locale('zh-cn');
                }
                if(time!=''){
                    let date=moment.unix(time/1000);
                    return date.format(format)
                }else{
                    return moment().format(format)
                }
            },
            outputEmoij:(str)=>{
                let emoij={
                    '爱你':'0','love':'0','奥特曼':'1','Altman':'1','拜拜':'2','bye':'2','悲伤':'3','cry':'3','鄙视':'4','despise':'4','闭嘴':'5','shutup':'5','馋嘴':'6','yum':'6','吃惊':'7','surprised':'7','哈欠':'8','yawn':'8','打脸':'9','pia':'9','顶':'10','overwhelmed':'10','doge':'11','doge':'11','肥皂':'12','soap':'12','感冒':'13','cold':'13','鼓掌':'14','applaud':'14','哈哈':'15','laughing':'15','害羞':'16','shy':'16','汗':'17','sweat':'17','微笑':'18','smile':'18','黑线':'19','speechless':'19','哼':'20','angry':'20','色':'21','heart_eyes':'21','挤眼':'22','wink':'22','可爱':'23','blush':'23','可怜':'24','empathy':'24','酷':'25','sunglasses':'25','困':'26','sleepy':'26','白眼':'27','supercilious':'27','泪':'28','sob':'28','喵喵':'29','meow':'29','男孩儿':'30','boy':'30','怒':'31','rage':'31','怒骂':'32','curse':'32','钱':'34','money':'34','亲亲':'35','kiss':'35','傻眼':'36','astonished':'36','生病':'37','sick':'37','草泥马':'38','llama':'38','失望':'39','disappointed':'39','衰':'40','unfortunate':'40','睡':'41','sleep':'41','思考':'42','pensive':'42','太开心':'43','grinning':'43','偷笑':'44','giggle':'44','吐':'45','vomit':'45','兔子':'46','rabbit':'46','挖鼻':'47','unamused':'47','委屈':'48','apologize':'48','笑cry':'49','joy':'49','熊猫':'50','panda_face':'50','嘻嘻':'51','smiley':'51','嘘':'52','hiss':'52','阴险':'53','insidious':'53','疑问':'54','confused':'54','右哼哼':'55','hum_right':'55','晕':'56','confounded':'56','猪头':'58','pig':'58','最右':'59','right_right':'59','左哼哼':'60','hum_left':'60','给力':'61','geili':'61','互粉':'62','follow':'62','囧':'63','jiong':'63','萌':'64','cute':'64','神马':'65','what?':'65','威武':'66','power':'66','喜':'67','happy':'67','织':'68','weave':'68','NO':'69','NO':'69','good':'71','thumbsup':'71','haha':'72','haha':'72','来':'73','come':'73','ok':'74','ok':'74','拳头':'75','fist':'75','弱':'76','thumbsdown':'76','握手':'77','handshake':'77','耶':'78','v':'78','赞':'79','+1':'79','作揖':'80','bow':'80','伤心':'84','broken_heart':'84','心':'85','heart':'85','蛋糕':'86','cake':'86','飞机':'87','airplane':'87','干杯':'88','beer':'88','话筒':'89','microphone':'89','蜡烛':'90','candle':'90','礼物':'91','gift':'91','绿丝带':'92','ribbon':'92','围脖':'93','weibo':'93','围观':'94','onlookers':'94','音乐':'95','musical_note':'95','照相机':'96','camera':'96','钟':'97','bell':'97','浮云':'98','cloud':'98','沙尘暴':'99','sandstorm':'99','太阳':'100','sunny':'100','微风':'101','leaf':'101','鲜花':'102','sunflower':'102','下雨':'103','rain':'103','月亮':'104','crescent_moon':'104'
                }
                //取出可能的是emoij字符
                var arr=str.match(/\[(.+?)\]/g);
                if(arr && arr.length>0){
                    for(let i of arr){
                        let v=i.replace(/\[|]/g,'');
                        if(emoij[v]){
                            let exq=new RegExp('\\['+v+'\\]','g');
                            let imgUrl="https://file.ishangzu.com/ishangzu/2017/07/14/10/iemoji_"+emoij[v]+'.png';
                            let imgTag='<img src="'+imgUrl+'@!24w_24h_png_m" border="0" style="width: 24px;height: 24px;" />';
                            str=str.replace(exq,imgTag)
                        }
                    }
                }
                
                return str;
            }

        }
    }


}


module.exports =  isz_node_common;
