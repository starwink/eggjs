//http://eggjs.org/zh-cn/core/cookie-and-session.html
const Controller = require('egg').Controller;

class TestController extends Controller {
    async index() {
      const ctx = this.ctx;
      //ctx.body=ctx.staticVersion+ctx.itest('123');
    //    ctx.body=process.env.PORT;
       ctx.body='process.env.PORT';
    }

    async scheduleBaidu(){
        const ctx = this.ctx;
        await ctx.app.runSchedule('baiDuXiongZhangSchedule');
        ctx.body={code:200};
    }

    async baidu(){
        const ctx = this.ctx;

        const app=ctx.app;
        let sql,cityData,cityParams;
        let houseCount,blogCount;
        let sqlData,houseList,blogList;
        let otherDb,pushUrl,pushNum,getDataNum;

        pushUrl='http://data.zz.baidu.com/urls?appid=1576309428498147&token=bpkHiTJVyNvmtBLF&type=realtime';
        // pushUrl='http://sign.ishangzu.com/contract/demo';

        let pushMaxNum=200;
        let pushStr='';
        let pushTag='\n';
        let updateId='';//推送成功保存
        let pushStatus=1;

        console.log(app.env)
        
        app.config.httpclient.request.timeout=60000;//设置为60秒

        // console.log(app.httpclient);
        if(app.env!='prod'){
            ctx.logger.info('not prod');
            ctx.body={code:400,msg:'not prod'};
            return false;
        }
        ctx.logger.info('baidu-start');
        
        let step={getNewList:false,updateData:false,push:false};
        step={getNewList:true,updateData:true,push:true};

        if(step.getNewList){
            //获取当天最新房源数据
            await app.mysql.get('other').delete(
                'isz_baidu_xiongzhang_tmp'
            );
            //重雷自增为1
            sql='truncate table isz_baidu_xiongzhang_tmp';
            await app.mysql.get('other').query(sql)
    
            cityData=ctx.app.config.city;
            cityParams={count:{
                house:0,
                blog:0,
                
            },city:{}},getDataNum=5;
            //遍历各城市数据参数
            for(let cityShell in cityData){
                cityParams.city[cityShell]={
                    house:{
                        count:null,
                        params:{
                            cityCode:cityData[cityShell].tel_code,
                            page:1,
                            pageSize:1
                        }
                    },
                    blog:{
                        count:null,
                        params:{
                            areaCode:cityData[cityShell].code,
                            page:1,
                            perPage:1
                        }
                    },
    
                }
                
                houseCount=await ctx.service.isz.solrListAllService.count(cityParams.city[cityShell].house.params);
                blogCount=await ctx.service.app.blogListService.count(cityParams.city[cityShell].blog.params);
                cityParams.city[cityShell].house.count= houseCount;
                cityParams.city[cityShell].blog.count= blogCount;
                
                cityParams.count.house=cityParams.count.house+houseCount;
                cityParams.count.blog= cityParams.count.blog+blogCount;
                
                //console.log(cityParams);
                //只运行一个城市1
            }
    
            for(let cityShell in cityParams.city){
                sqlData=[];
                //获取房源数据
                for(let i=0;i<parseInt(cityParams.city[cityShell].house.count/getDataNum+1);i++){
                    
                    cityParams.city[cityShell].house.params.page=i;
                    cityParams.city[cityShell].house.params.pageSize=getDataNum;
                    // console.log(cityParams.city[cityShell].house.params);
                    houseList = await ctx.service.isz.solrListAllService.get(cityParams.city[cityShell].house.params);
    
                    for(let data in houseList){
                        sqlData.push({
                            cid:houseList[data].id,
                            type:'house',
                            city:cityShell,
                            only_id:houseList[data].id+'house'+cityShell,
                            create_time:app.mysql.get('other').literals.now
                        });
                    }
                }
    
                
                //获取社区数据
                for(let i=0;i<parseInt(cityParams.city[cityShell].blog.count/getDataNum+1);i++){
                    
                    cityParams.city[cityShell].blog.params.page=i;
                    cityParams.city[cityShell].blog.params.perPage=getDataNum;
    
                    blogList = await ctx.service.app.blogListService.get(cityParams.city[cityShell].blog.params);
                    
                    for(let data in blogList){
                        sqlData.push({
                            cid:blogList[data].id,
                            type:'blog',
                            city:cityShell,
                            only_id:blogList[data].id+'house'+cityShell,
                            create_time:app.mysql.get('other').literals.now
                        });
                    }
                }
                otherDb =await app.mysql.get('other').insert('isz_baidu_xiongzhang_tmp',sqlData);
            }
        }
        

        if(step.updateData){
            //对比数据
            //清空未推送数据
            await app.mysql.get('other').query("DELETE FROM `isz_baidu_xiongzhang_info` WHERE `exist` is NULL") ;
            //清空重复数据 
            await app.mysql.get('other').query("DELETE FROM `isz_baidu_xiongzhang_tmp` WHERE `id` IN (( SELECT * FROM ( SELECT DISTINCT Max(`id`) FROM `isz_baidu_xiongzhang_tmp` GROUP BY `cid`, `city` HAVING COUNT(1) > 1 ) AS t ))") ; 

            otherDb=await app.mysql.get('other').query('select * from `isz_baidu_xiongzhang_tmp` where  not `cid` IN ( select `cid` from `isz_baidu_xiongzhang_info` )');
            sqlData=[];
            for(let v of otherDb){
                sqlData.push({
                    only_id:v.only_id,
                    cid:v.cid,
                    type:v.type,
                    city:v.city,
                    create_time:app.mysql.get('other').literals.now
                });
            }
            
            otherDb =await app.mysql.get('other').insert('isz_baidu_xiongzhang_info',sqlData);

        }
        
        let max_num='';
        if(step.push){
            //推送数据
            
            sql="select * from `isz_baidu_xiongzhang_info`  where `exist` is null order by `order` desc limit 1"
            otherDb =await app.mysql.get('other').query(sql);

            pushStr=='';
            let v=otherDb[0];

            for(v of otherDb){
                if(v.type=='house'){
                    if(pushStr==''){
                        pushStr='https://m.ishangzu.com/'+v.city+'/'+v.cid+'.html';
                    }else{
                        pushStr=pushStr+pushTag+'https://m.ishangzu.com/'+v.city+'/'+v.cid+'.html';
                    }
                }else if(v.type=='blog'){
                    if(pushStr==''){
                        pushStr='https://m.ishangzu.com/'+v.city+'/blog/'+v.cid+'.html';
                    }else{
                        pushStr=pushStr+pushTag+'https://m.ishangzu.com/'+v.city+'/blog/'+v.cid+'.html';
                    }
                }
                updateId=v.id;
            }
            //第一次百度推送,用来获取当天推送量
            let result;
            if(pushStr.length>0){
                result = await ctx.curl(pushUrl, {
                    // 必须指定 method
                    method: 'POST',
                    contentType:'text/plain',
                    // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                    contentType: 'json',
                    data: pushStr,
                    // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
                    dataType: 'json',
                });
                console.log('updateId:'+updateId);
                console.log('push:'+pushStr);
                console.log('---');
                console.log(result);
                ctx.logger.info('baidu-one: %j', result);
                ctx.logger.info('baidu-one-push: %j', pushStr);
                // result={data:{remain_realtime:2}};
                let while_i=0;
                if(result){
                    if(result.data.success_realtime>0){
                        pushStatus=1
                    }else{
                        pushStatus=2
                    }

                    if(updateId.toString().length>0){
                        await app.mysql.get('other').update(
                            'isz_baidu_xiongzhang_info',
                            {
                                exist:pushStatus,
                                push_time:app.mysql.get('other').literals.now
                            },
                            {
                                where:{
                                    id:updateId
                                }
                            }
                        );
                    }

                    if(result.data.remain_realtime>0){
                        while(result.data.remain_realtime>0){
                            while_i++;
                            if(while_i>pushMaxNum){ break;}
                            pushStr='';
                            updateId='';
                            sql="select * from `isz_baidu_xiongzhang_info`  where `exist` is null order by `order` desc limit 1"
                            otherDb =await app.mysql.get('other').query(sql);
            
                            
                            let v=otherDb[0];
            
                            for(v of otherDb){
                                if(v.type=='house'){
                                    if(pushStr==''){
                                        pushStr='https://m.ishangzu.com/'+v.city+'/'+v.cid+'.html';
                                    }else{
                                        pushStr=pushStr+pushTag+'https://m.ishangzu.com/'+v.city+'/'+v.cid+'.html';
                                    }
                                }else if(v.type=='blog'){
                                    if(pushStr==''){
                                        pushStr='https://m.ishangzu.com/'+v.city+'/blog/'+v.cid+'.html';
                                    }else{
                                        pushStr=pushStr+pushTag+'https://m.ishangzu.com/'+v.city+'/blog/'+v.cid+'.html';
                                    }
                                }
                                updateId=v.id;
                            }
                            result = await ctx.curl(pushUrl, {
                                // 必须指定 method
                                method: 'POST',
                                contentType:'text/plain',
                                // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                                contentType: 'json',
                                data: pushStr,
                                // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
                                dataType: 'json',
                            });
                            console.log('updateId:'+updateId);
                            console.log('push:'+pushStr);
                            console.log('---');
                            console.log(result);
                            ctx.logger.info('baidu-while: %j', result);
                            ctx.logger.info('baidu-while-push: %j', pushStr);
                            if(result.data.success_realtime==1){
                                pushStatus=1
                            }else{
                                pushStatus=2
                            }

                            if(updateId.toString().length>0){
                                await app.mysql.get('other').update(
                                    'isz_baidu_xiongzhang_info',
                                    {
                                        exist:pushStatus,
                                        push_time:app.mysql.get('other').literals.now
                                    },
                                    {
                                        where:{
                                            id:updateId
                                        }
                                    }
                                );
                            }

                        }
                    }
                }
                
            }

            
        }

        // await ctx.app.runSchedule('baiDuXiongZhangSchedule');
        ctx.body={code:200};
    }
   
}
  
module.exports = TestController;