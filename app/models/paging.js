'use strict';
class paging{
    constructor(page,pageSize, pageCount,uri,params) {
        this.page=page;
        this.pageSize=pageSize;
        this.pageCount=pageCount;
    }
    start(){
        if(this.page==1){
            return true;
        }else{
            return false;
        }
    }

    ret(){
        // console.log(this.page);
    }
}

var pagingData=function(pageData,pageUri){

    var pageData=new paging(pageData.page,pageData.pageSize,pageData.pageCount,pageUri.uri,pageUri.params);
    return pageData.ret();
}
module.exports = pagingData;

// console.log(
//     paging(
//         {page:pageNum,pageSize:10,pageCount:blogListPageCount},
//         {uri:'/blog/'+ctx.params.class+'/',pageams:'/p'}
//     )
// );
