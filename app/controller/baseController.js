'use strict';

const Controller = require('egg').Controller;
const uuid = require('uuid/v4');

class BaseController extends Controller {
   

    getCity(){
        const ctx = this.ctx;
        let host=ctx.request.header.host;
        let urlData=ctx.request.url.split('?');
        let configCityData=ctx.app.config.city;

        let hostData=host.split('.');
        let cityKey='hz';
        if(ctx.isMobile){
            let urlPath=urlData[0];
            let urlPathData=urlPath.split('/');
            if(urlPathData[1] in configCityData){
                cityKey=urlPathData[1];
            }else{
                cityKey='hz';
            }
        }else{
            if(hostData[0] in configCityData){
                cityKey=hostData[0];
            }else{
                cityKey='hz';
            }
        }
        // for(let a in configCityData ){
        //     // console.log(a)
        // }
        // console.log(configCityData)

        
        
        this.ctx.app.locals={cityList:configCityData,city:configCityData[cityKey],thisNav:''};
        return configCityData[cityKey];
    }
    init_city_cookie(){
        let cityData=this.getCity();
        //会公用的cookie
        let cooikesCity=this.getCookie('isz_city');
        if(cooikesCity!=cityData.spell ){
            if(cooikesCity=='www' && cityData.spell=='hz'){

            }else{
                if(cityData.spell=='hz'){
                    this.setCookie('isz_city','www');
                }else{
                    this.setCookie('isz_city',cityData.spell);
                }
            }
        }
    }
    init_uuid_cookie(){
        let isz_uid=this.getCookie('isz_uid');
        if(!isz_uid){
            isz_uid=uuid();
            this.setCookie('isz_uid',isz_uid);
        }
        this.isz_uid=isz_uid;
        this.ctx.app.locals={isz_uid:this.isz_uid};
    }
    qiyu_config(){
        let cityData=this.getCity();
        let iszTmp=this.isz_uid.split('-');
        let qiyu_realname="PC游客-"+iszTmp[iszTmp.length-1];
        let qiyuconfig={
            uid:this.isz_uid,
            realname:qiyu_realname,
            citycode:cityData.code,
            cityname:cityData.name+'市',
        }
        this.ctx.app.locals={qiyu:qiyuconfig};
    }

    getCookie(name){
        return this.ctx.cookies.get(name,{
            signed:false
        });
    }
    setCookie(name,val=null,stime=3600000){
        return this.ctx.cookies.set(name,val,{
            maxAge:stime, //毫秒数
            httpOnly: false, //是否被js访问
            signed: false, //不加密
            path:'/',
            domain:'.ishangzu.com'
        })
    }
    removeCookie(name){
        return this.ctx.cookies.set(name,null,{
            maxAge:-1,
            path:'/',
            domain:'.ishangzu.com'
        })
    
    }
    getSafeCookie(name){
        return this.ctx.cookies.get(name,{signed:true,encrypt:true});
    }
    setSafeCookie(name,value,exp){
        return this.ctx.cookies.set(name, value,{exp,httpOnly:true,encrypt:true});
    }
}

module.exports = BaseController;

function contextFormatter(meta){
    return meta.date + ' * ' + meta.level + ' * ' + meta.pid + ' ' + meta.paddingMessage + ' ' + meta.message;
}

// default format
function  defaultFormatter(meta){
    return meta.date + ' ^ ' + meta.level + ' ^ ' + meta.pid + ' ' + meta.message;
}

  // output to Terminal format
function   consoleFormatter(meta){
    let msg = meta.date + ' ^ ' + meta.level + ' ^ ' + meta.pid + ' ' + meta.message;
    if (!chalk.supportsColor) {
      return msg;
    }

    if (meta.level === 'ERROR') {
      return chalk.red(msg);
    } else if (meta.level === 'WARN') {
      return chalk.yellow(msg);
    }

    msg = msg.replace(duartionRegexp, chalk.green('$1'));
    msg = msg.replace(categoryRegexp, chalk.blue('$1'));
    msg = msg.replace(httpMethodRegexp, chalk.cyan('$1 '));
    return msg;
}
