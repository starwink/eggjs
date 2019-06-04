//http://eggjs.org/zh-cn/core/cookie-and-session.html
const Controller = require('egg').Controller;

class DbController extends Controller {
    async select() {
        const ctx = this.ctx;
        const app =ctx.app;

        const otherDb =await app.mysql.get('other').select('isz_baidu_xiongzhang_tmp',{
            limit:10
        });

        // const otherDb = await this.app.mysql.get('isz_baidu_xiongzhang_tmp', { id: 11 });

        console.log(otherDb)
        ctx.body = otherDb;
    }

    async insert() {
        const ctx = this.ctx;
        const app =ctx.app;
        let date=new Date();

        let time=parseInt(date.getTime()/1000);

        const otherDb =await app.mysql.get('other').insert('isz_baidu_xiongzhang_tmp',[{
            cid:'BA1',
            type:'house',
            city:330100,
            create_time:app.mysql.get('other').literals.now
        },{
            cid:'BA2',
            type:'house',
            city:330100,
            create_time:time
        }]);

        console.log(otherDb)
        ctx.body = otherDb;
    }

    async update() {
        const ctx = this.ctx;
        const app =ctx.app;
        let date=new Date();

        let time=parseInt(date.getTime()/1000);

        const otherDb =await app.mysql.get('other').update(
            'isz_baidu_xiongzhang_tmp',
            {
                cid:'BA21',
                type:'house',
                city:330100,
                create_time:time
            },
            {
                where:{
                    id:11
                }
            }
        );
       // const updateSuccess = result.affectedRows === 1;
        console.log(otherDb)
        ctx.body = otherDb;
    }

    async delete() {
        const ctx = this.ctx;
        const app =ctx.app;
        let date=new Date();

        let time=parseInt(date.getTime()/1000);

        // const otherDb = await app.mysql.get('other').delete(
        //     'isz_baidu_xiongzhang_tmp',{
        //         "exist":'NULL'
        //     }
        // );

        const otherDb = await app.mysql.get('other').query("DELETE FROM `isz_baidu_xiongzhang_tmp` WHERE `exist` is NULL")     


        console.log(otherDb)
        ctx.body = otherDb;
    }

    async query(){
        let sql="CREATE TEMPORARY TABLE `isz_baidu_xiongzhang_tmp` ( `id` mediumint(8) NOT NULL AUTO_INCREMENT,`cid` varchar(35) DEFAULT NULL COMMENT '内容唯一id',`type` varchar(10) DEFAULT NULL COMMENT '类型: house / blog',`city` varchar(10) DEFAULT NULL COMMENT '城市',`exist` int(2) DEFAULT NULL COMMENT '是否已存在',`order` mediumint(8) DEFAULT NULL,`create_time` varchar(25) DEFAULT NULL,PRIMARY KEY (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=2016464 DEFAULT CHARSET=utf8mb4";
        await this.app.mysql.get('other').query(sql)
        
    }

    //获取城市所有链接
    async getHouse(){
        const ctx = this.ctx;
        const app =ctx.app;

        await app.mysql.get('other').delete(
            'isz_baidu_xiongzhang_tmp'
        );
        //重雷自增为1
        let sql='truncate table isz_baidu_xiongzhang_tmp';
        await this.app.mysql.get('other').query(sql)

        let cityData=ctx.app.config.city;
        console.log(cityData);
        console.log(typeof(cityData))
        let cityParams={count:{
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
            
            let houseCount=await ctx.service.isz.solrListAllService.count(cityParams.city[cityShell].house.params);
            let blogCount=await ctx.service.app.blogListService.count(cityParams.city[cityShell].blog.params);
            cityParams.city[cityShell].house.count= houseCount;
            cityParams.city[cityShell].blog.count= blogCount;
           
            cityParams.count.house=cityParams.count.house+houseCount;
            cityParams.count.blog= cityParams.count.blog+blogCount;
            
            //console.log(cityParams);
            //只运行一个城市1
        }

        for(let cityShell in cityParams.city){
            let sqlData=[];
            //获取房源数据
            for(let i=0;i<parseInt(cityParams.city[cityShell].house.count/getDataNum+1);i++){
                
                cityParams.city[cityShell].house.params.page=i;
                cityParams.city[cityShell].house.params.pageSize=getDataNum;
                // console.log(cityParams.city[cityShell].house.params);
                const houseList = await ctx.service.isz.solrListAllService.get(cityParams.city[cityShell].house.params);

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

                const blogList = await ctx.service.app.blogListService.get(cityParams.city[cityShell].blog.params);
                
                for(let data in blogList){
                    sqlData.push({
                        cid:blogList[data].id,
                        type:'blog',
                        city:cityShell,
                        create_time:app.mysql.get('other').literals.now
                    });
                }
            }
            const otherDb =await app.mysql.get('other').insert('isz_baidu_xiongzhang_tmp',sqlData);
        }


        // var a = [1,2,3,4]  
        // var b = [3,4,5,6]  
        // let intersection = a.filter(v => b.includes(v)) 
        // console.log(intersection)
       

        

        //console.log(houseList);
       // ctx.body=houseList;
       ctx.body=JSON.stringify({code:200,msg:'success'})
    }

    async updateData(){
        const ctx = this.ctx;
        const app =ctx.app;
        // const otherDb=await app.mysql.get('other').select('isz_baidu_xiongzhang_tmp',{
        //     where :{cid:['ttt0t','8A2152436003263C016033B32DDD1648']},
        //     no:['cid']
        // });

        const otherDb=await app.mysql.get('other').query('select * from `isz_baidu_xiongzhang_tmp` where  not `cid` IN ( select `cid` from `isz_baidu_xiongzhang_info` )');
        let sqlData=[];
        for(let v of otherDb){
            sqlData.push({
                only_id:v.only_id,
                cid:v.cid,
                type:v.type,
                city:v.city,
                create_time:app.mysql.get('other').literals.now
            });
        }
        console.log(sqlData.length);
        // const otherDb =await app.mysql.get('other').insert('isz_baidu_xiongzhang_tmp',sqlData);
        app.mysql.get('other').insert('isz_baidu_xiongzhang_info',sqlData);
        ctx.body = otherDb;
    }

    async push(){
        const ctx = this.ctx;
        const app =ctx.app;
        let pushUrl='http://data.zz.baidu.com/urls?appid=1576309428498147&token=bpkHiTJVyNvmtBLF&type=realtime';
        let sql="select * from `isz_baidu_xiongzhang_info`  where `exist` is null order by `order` desc limit 10"
        const otherDb =await app.mysql.get('other').query(sql);

        let pushStr='';
        let pushTag='\n';
        let updateSql=[];//推送成功保存
        let updateSqlAll=[];//推送成功保存
        


        for(let v of otherDb){
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
            updateSql.push(v.id);
            updateSqlAll.push(v.id);
        }

        if(updateSql.length>0){
            app.mysql.get('other').update(
                'isz_baidu_xiongzhang_info',
                {
                    exist:1,
                },
                {
                    where:{
                        id:updateSql
                    }
                }
            );
        }
        console.log(pushStr);
       

        if(pushStr.length>0){
            const result = await ctx.curl(pushUrl, {
                // 必须指定 method
                method: 'POST',
                contentType:'text/plain',
                // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                contentType: 'json',
                data: pushStr,
                // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
                dataType: 'json',
            });
            pushStr='';
            updateSql=[];
            if(result){
                if(result.data.remain_realtime>0){
                    let pushNum=result.data.remain_realtime;
                    let sql="select * from `isz_baidu_xiongzhang_info`  where `exist` is null order by `order` desc limit ?"
                    const otherDb =await app.mysql.get('other').query(sql,[pushNum]);
                    
                    for(let v of otherDb){
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
                        updateSql.push(v.id);
                        updateSqlAll.push(v.id);
                    }
                }
                if(pushStr.length>0){
                    const result = await ctx.curl(pushUrl, {
                        // 必须指定 method
                        method: 'POST',
                        contentType:'text/plain',
                        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                        contentType: 'json',
                        data: pushStr,
                        // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
                        dataType: 'json',
                    });
                }
                if(updateSql.length>0){
                    app.mysql.get('other').update(
                        'isz_baidu_xiongzhang_info',
                        {
                            exist:1,
                        },
                        {
                            where:{
                                id:updateSql
                            }
                        }
                    );
                }
            }
        }
        
       
        
        
        ctx.body = {code:200,obj:updateSql};
        // ctx.body = {
        //     status: result.status,
        //     headers: result.headers,
        //     package: result.data,
        // }
        
    }

    async pushAll(){
        const ctx = this.ctx;
        const app =ctx.app;
        let pushUrl='http://data.zz.baidu.com/urls?appid=1576309428498147&token=bpkHiTJVyNvmtBLF&type=batch';
        let sql="select * from `isz_baidu_xiongzhang_info`  where `exist` is null order by `order` desc limit 10"
        const otherDb =await app.mysql.get('other').query(sql);

        let pushStr='';
        let pushTag='\n';
        let updateSql=[];//推送成功保存
        


        for(let v of otherDb){
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
            updateSql.push(v.id);
        }
        
        if(updateSql.length>0){
            app.mysql.get('other').update(
                'isz_baidu_xiongzhang_info',
                {
                    exist:1,
                },
                {
                    where:{
                        id:updateSql
                    }
                }
            );
        }
       

        if(pushStr.length>0){
            const result = await ctx.curl(pushUrl, {
                // 必须指定 method
                method: 'POST',
                contentType:'text/plain',
                // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                contentType: 'json',
                data: pushStr,
                // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
                dataType: 'json',
            });
            pushStr='';
            updateSql=[];
            console.log(result);
            if(result){
                if(result.data.remain_batch>0){
                    let pushNum=result.data.remain_batch;
                    if(pushNum>2000){
                        pushNum=2000;
                    }
                    let sql="select * from `isz_baidu_xiongzhang_info`  where `exist` is null order by `order` desc limit ?"
                    const otherDb =await app.mysql.get('other').query(sql,[pushNum]);
                    
                    for(let v of otherDb){
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
                        updateSql.push(v.id);
                    }
                }
                if(pushStr.length>0){
                    const result = await ctx.curl(pushUrl, {
                        // 必须指定 method
                        method: 'POST',
                        contentType:'text/plain',
                        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                        contentType: 'json',
                        data: pushStr,
                        // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
                        dataType: 'json',
                    });
                    console.log(result);
                }
                if(updateSql.length>0){
                    app.mysql.get('other').update(
                        'isz_baidu_xiongzhang_info',
                        {
                            exist:1,
                        },
                        {
                            where:{
                                id:updateSql
                            }
                        }
                    );
                }
            }
        }
        
        
        ctx.body = pushStr;
        
    }
    


    
}
  
module.exports = DbController;