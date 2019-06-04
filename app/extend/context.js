//const ctx = this.ctx;
//ctx.body=ctx.isWechat;
module.exports = {
    get isIOS() {
      const Reg = /iPhone|iPad|iPod|iOS/i;
      return Reg.test(this.get('user-agent'));
    },
    get isMobile(){
      const Reg = /iPhone|iPad|iPod|iOS|Android|UC|Kindle|WindowsCE|Mobile|MicroMessenger/i;
      return Reg.test(this.get('user-agent'));
    },
    get isWechat(){
      const Reg = /MicroMessenger/i;
      return Reg.test(this.get('user-agent'));
    },
    
    // get staticVersion() {
    //
    //     return 'dev'
    // }
};