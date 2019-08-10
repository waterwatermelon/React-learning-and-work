const Service = require('egg').Service;

class UserService extends Service{
    async register(){
        const {ctx,app} =  this;
        const user = ctx.request.body; 
        const result = app.mysql.insert('user',user); 
        if(1){
            return true;
        }else{
            return false;
        }
    }
    async login(user){
        const {app,ctx} = this;  
        console.log('user=',user);
        const result = await app.mysql.select('user',{
            where:{account:user.account}
        });
        const {password }= result[0]
        if(user.password === password){
            // ?重启服务器，session依然保持数据
            ctx.session.user = user;
            return true;
        }else{
            return false;
        }
    }
    async logout(){
        const {ctx} = this;
        try{
            delete ctx.session.user;
        }catch(e){
            console.log('注销失败')
            return false;
        }
        console.log('注销成功')
        return true;
    }
}
module.exports = UserService;