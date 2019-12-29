const { Subscription } = require('egg');
class UpdateCache extends Subscription{
    // 定时任务的配置
    static get  schedule(){
        return {
            interval:'1m',  //间隔一分钟
            type:'all'      //所有worker都要执行
        }
    }
    // 定时任务逻辑
    async subscribe(){
        const date = new Date();
        console.log('---------------------------------');
        console.log('执行定时任务.当前时间：',date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
    }
}
module.exports = UpdateCache;
// 写法2 
// module.exports = {
//  schedule:{
        // /**
        //  * ###　定时方式
        //  * interval 配置方式
        //  * - 数字，表示毫秒数
        //  * - 字符类型，如 '1s'。最终也会转换成毫秒
        //  * cron　定时任务按照corn表达式定时执行
        //  * 
        //  * /
        // eg cron:'0 0 */3 * * *' // 每3个小时执行一次
        // interval:'1m'
        // type:'all'
//      }
//  async task(ctx){
    /*  
     * 定时任务的逻辑
     * 可通过入参 ctx 调用 service
    */
// }
// }