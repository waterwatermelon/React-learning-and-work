module.exports = ()=>{ 
    console.log('loadding middleware writeLOG');
    return async function(ctx,next){
        //根据路由，做分支选择

        const body = ctx.request.body;
        console.log('middleware ctx =',ctx);
        console.log('middleware ctx.body =',ctx.body);
        console.log('middleware ctx.originalUrl = ',ctx.originalUrl);
        await next();
    }
} 