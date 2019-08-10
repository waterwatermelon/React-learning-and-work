// 配置安全秘钥
exports.keys = '123';
// 配置view
exports.view = {
    // defaultViewEngine: 'ejs',
    mapping: {
        '.html': 'ejs',
    },
}
// 配置数据源
exports.mysql = {
    // 单数据库配置信息
    // 客户端
    client:{
        host:'127.0.0.1',
        port:'3307',
        user:'root',
        password:'123456',
        database:'douban'
    },
    // 是否加载到app上，默认开启
    app:true,
    // 是否加载到agent上，默认关闭    
    agent:false
}
// exports.middleware = ['validateLogin','writeLog'];
exports.validateLogin = {
    ignore:(ctx)=>{
        return ctx.path == '/'; 
    }
}
exports.security = {
    csrf:{
        enable:false
    }
} 
exports.cors = {
    origin:'*',
    allowMethods:'GET,POST,HEAD,OPTIONS,DELETE'
}
exports.logger = {
    // 设置同时输出json格式文件
     outputJSON:true,
}
exports.customLogger = {
    myLogger:{
        file:'/home/sue/NodeProject/EggDemo/demo/'+'logs/my.log'
    }
}
// config文件的两种写法
// 1.返回一个object
// module.exports = {
//     loggers:{
//         dir:'/home/sue/NodeProject/demo'
//     }
// }
// 2.exports.key = value
// exports.loggers = {
//     dir:'/home/sue/NodeProject/demo'
// }
// 配置文件也可以返回一个function，接受appInfo参数
// module.exports = (appInfo)=>{
//     console.log('-----------------------')
//     console.log('load config.js')
//     console.log('appInfo = ',appInfo);
//     return {
        
//     }
// }