'use strict';
const Controller = require('../baseController');
const uuid = require('uuid/v4');
const fs = require('fs');
const QRCode = require('qrcode');
// const Buffer = require('buffer/').Buffer;
// const base64 = require('base64-min');
// const { createCanvas, loadImage ,Image} = require('canvas');
//ajax接口
class imgController extends Controller {
    //列表
    async invite() {
        // const { ctx, app } = this;
        // let uid=ctx.params.uid;
        // let qrcode= await QRCode.toDataURL(uid).then((url)=>{
        //     return url;
        // })

        // const canvas = createCanvas(200, 200)
        // const ctd = canvas.getContext('2d')
        
        // // Write "Awesome!"
        // ctd.font = '30px Impact'
        // ctd.fillText('Awesome!', 1360, 2020)
        
        // let img = new Image();
        // img.src=qrcode;
        // ctd.drawImage(img, 50, 0, 70, 70)

        // ctx.set('Content-Type','image/jpg');

        // let expires = new Date();
        // expires.setTime(expires.getTime() + 3600*24*30* 1000);
        // ctx.set("Expires", expires.toUTCString());
        // ctx.set("Cache-Control", "max-age=" + 3600*24*30);
    
        // ctx.body=canvas.createJPEGStream({quality: 0.75, progressive: false, chromaSubsampling: true})
        // return  ;

        ctx.body='';
        // ctx.body=dataBuffer.toString();;
        // ctx.body=base64.decode(dataBuffer.toString());
        
    }
    
}

module.exports = imgController;




