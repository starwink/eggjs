'use strict';
class paging{
    constructor(pageData,pageUri) {
        if(pageData.page<1){
            pageData.page=1;
        }
        if(pageData.pageSize<1){
            pageData.pageSize=1;
        }
        this.page=pageData.page; //当前页码
        this.pageSize=pageData.pageSize; //页页条数
        this.pageCount=pageData.pageCount; //数据总数
        //总页数
        if(parseInt(this.pageCount/this.pageSize)==this.pageCount/this.pageSize){
            this.pageNum= parseInt(this.pageCount/this.pageSize)
        }else{
            this.pageNum= parseInt(this.pageCount/this.pageSize)+1
        }
        if(this.page>this.pageNum){
            this.page=this.pageNum;
        }

        // console.log(this.page,this.pageSize,this.pageCount,this.pageNum);
        this.uri=pageUri.uri; //前缀路径
        this.uri_params=pageUri.params; //分页参数
        this.listNum=7; //显示个数
    }
    prev(){
        if(this.page==1 || this.pageCount==0){
            return false;
        }else{
            let page=this.page-1;
            return {page:page,uri:this.getUri(page)};
        }
    }
    getUri(page){
        if(page==1){
            return this.uri;
        }else{
            return this.uri+this.uri_params+page+'/';
        }
        
    }
    list(){
        let listData=[];
        let tail = this.pageNum-this.page;
        let pref = this.page-1;
        let inum=parseInt(this.listNum/2);
        let tail_fix=tail-inum;
        let pref_fix=pref-inum;
        let isOn=false,isIgnore=false;//是否选择 是否省略
        for(let i=1;i<=this.pageNum;i++){
            if(i==this.page){
                isOn=true;
            }else{
                isOn=false;
            }
            if(i>2 && i<pref_fix){ //右边
                
                if(this.page-inum-1>this.pageNum-this.listNum){
                    if(this.pageNum-this.listNum>i){
                        i=this.pageNum-this.listNum;
                        isIgnore=true;
                    }else{
                        isIgnore=false;
                    }
                    
                }else{
                    i=this.page-inum-1;
                    isIgnore=true;
                }
                
                
            }else if(i>this.page+inum && i<this.pageNum-2){ //在边
                if(this.page<this.listNum && i<this.listNum){

                }else{
                    isIgnore=true;
                    i=this.pageNum-2
                }
                
            }else{
                isIgnore=false;
            }

            listData[listData.length]={
                page:i,
                uri:this.getUri(i),
                isOn:isOn,
                isIgnore:isIgnore
            }
        }
        
        return listData;
    }
    next(){
        if(this.page>=this.pageNum || this.pageCount==0){
            return false;
        }else{
            let page=this.page+1;
            return {page:page,uri:this.getUri(page)};
        }
    }

    ret(){
    }
}

// let p=new paging(
//     {page:pageNum,pageSize:10,pageCount:blogListPageCount},
//     {uri:'/blog/'+ctx.params.class+'/',pageams:'/p'}
// );
module.exports = paging;