const Service = require('egg').Service;
const path = require('path');
class InitService extends Service{
    async init(){
        const {app} = this;
        const result = await this.app.mysql.select('movie');
        let hasData = false;
        hasData = (result.length ? true : false);
        console.log('has data in database ? ',hasData);

        if(!hasData){
        // const p = app.loader.loadFile(path.join(app.config.baseDir,'app/data/spider.js'));
        // 如果该文件export一个函数，则会立即被调用，并将app作为参数；否则直接使用这个值
            const p = await app.loader.loadFile(path.join(app.config.baseDir,'app/data/spider.js'));
            
        }
    } 
}
module.exports = InitService; 