// app/middleware/robot.js
// options === app.config.city
module.exports = (options, app) => {
    return async function pc2mMiddleware(ctx, next) {
        let urlData=ctx.request.url.split('?');
        let host=ctx.request.header.host;
        let urlPath,urlParams,urlPathData,gotoUrl='';
        let configCityData=ctx.app.config.city;
        let agree='http://';
        if(typeof(urlData[0])!="undefined"){
            urlPath=urlData[0];
        }else{
            urlPath='';
        }

        let fengefu='/';
        if(urlData[0].substr(0,1)=='/'){
            fengefu='';
        }

        if(typeof(urlData[1])!="undefined"){
            urlParams=urlData[1];
        }else{
            urlParams='';
        }
        urlPathData=urlPath.split('/');

        if(ctx.isMobile){
            if(host!='m.ishangzu.com'){
                let hostData=host.split('.');
                if( hostData[0] in configCityData){
                    
                    if(urlParams==''){
                      gotoUrl=agree+'m.ishangzu.com/'+hostData[0]+urlData[0];
                    }else{
                      gotoUrl=agree+'m.ishangzu.com/'+hostData[0]+urlData[0]+'?'+urlData[1];
                    }
                // }else if(hostData[0]=='' || hostData[0]=='www'){
                }else if(host.indexOf('ishangzu.com')>0 || host=='ishangzu.com'){
                    if( hostData[0] in configCityData){
                        if(urlParams==''){
                            gotoUrl=agree+'m.ishangzu.com/'+hostData[0]+urlData[0];
                        }else{
                            gotoUrl=agree+'m.ishangzu.com/'+hostData[0]+urlData[0]+'?'+urlData[1];
                        }
                    }else{
                        let a=urlData[0].split('/');
                        if(a[1] in configCityData){
                            if(urlParams==''){
                                gotoUrl=agree+'m.ishangzu.com'+urlData[0];
                            }else{
                                gotoUrl=agree+'m.ishangzu.com'+urlData[0]+'?'+urlData[1];
                            }
                        }else{
                            if(urlParams==''){
                              gotoUrl=agree+'m.ishangzu.com/hz'+urlData[0];
                            }else{
                              gotoUrl=agree+'m.ishangzu.com/hz'+urlData[0]+'?'+urlData[1];
                            }
                        }
                    }
                }
            }else{
                if(urlPathData[1] in configCityData){
                    
                }else{
                  if(urlParams==''){
                      gotoUrl=agree+'m.ishangzu.com/hz'+fengefu+urlData[0];
                  }else{
                      gotoUrl=agree+'m.ishangzu.com/hz'+fengefu+urlData[0]+'?'+urlData[1];
                  }
                }
            }
        }else if(host.indexOf('ishangzu.com')>0 || host=='ishangzu.com'){
            if(host=='m.ishangzu.com'){
                if(urlPathData[1] in configCityData){
                    if(urlPathData[1]=='hz'){
                        if(urlParams==''){
                            gotoUrl=agree+'www.ishangzu.com'+fengefu+urlData[0];
                        }else{
                            gotoUrl=agree+'www.ishangzu.com'+fengefu+urlData[0]+'?'+urlData[1];
                        }
                    }else{
                        if(urlParams==''){
                            gotoUrl=agree+urlPathData[1]+'.ishangzu.com'+fengefu+urlData[0];
                        }else{
                            gotoUrl=agree+urlPathData[1]+'.ishangzu.com'+fengefu+urlData[0]+'?'+urlData[1];
                        }
                    }
                }else{
                    //加hz cookie
                    if(urlParams==''){
                        gotoUrl=agree+'www.ishangzu.com'+fengefu+urlData[0];
                    }else{
                        gotoUrl=agree+'www.ishangzu.com'+fengefu+urlData[0]+'?'+urlData[1];
                    }
                }
                gotoUrl=gotoUrl.replace('/'+urlPathData[1]+'/', "/")
            }else{
                let hostData=host.split('.');

                if( hostData[0] in configCityData){
                    if(hostData[0]=='hz'){
                        if(urlParams==''){
                          gotoUrl=agree+'www.ishangzu.com'+fengefu+urlData[0];
                        }else{
                          gotoUrl=agree+'www.ishangzu.com'+fengefu+urlData[0]+'?'+urlData[1];
                        }
                    }
                }else if(hostData[0]!='www' && hostData[0]!='egg'){
                    if(urlParams==''){
                        gotoUrl=agree+'www.ishangzu.com'+fengefu+urlData[0];
                    }else{
                        gotoUrl=agree+'www.ishangzu.com'+fengefu+urlData[0]+'?'+urlData[1];
                    }
                }
            }
        }
        if(gotoUrl){
          ctx.status=301;
          ctx.set('Location', gotoUrl);
        }

      await next()
    }
  };
  
