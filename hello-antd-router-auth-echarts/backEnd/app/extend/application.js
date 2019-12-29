// 属性Symbol 
const BAR = Symbol('Application#bar');
module.exports = {
    // getter方法
    get bar(){
    // 缓存一些变量
        if(!this[BAR]){
            this[BAR] = 2;
        }
        return this[BAR];
    },
// 编写自定义扩展函数
    foo(param){
//  this就是app对象
    }
}
// 使用方法：在可调用app的地方，app.bar 通过属性访问。