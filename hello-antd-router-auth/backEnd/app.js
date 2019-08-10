class AppBootHook{
    constructor(app){
        this.app = app;
    }
    // 应用已启动，服务未开放
    async didReady(){
        console.log('------------------------------------');
        console.log('当前运行环境：',this.app.config.env);
        console.log('------------------------------------');

        const ctx = await this.app.createAnonymousContext();
        await ctx.service.myInit.init();
        // 获取自定义日志
        // const myLogger =  this.app.getLogger('myLogger');

    }
}
module.exports = AppBootHook;