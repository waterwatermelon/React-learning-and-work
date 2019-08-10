// app/controller/news.js 
const Controller = require('egg').Controller;
let resData = {
  success: false,
  msg: '',
  data: {},
}
class MovieController extends Controller {
  async index() {
    await this.ctx.render('movies.html');
  }
  async insertMovie() {
    const { ctx } = this;
    let movie = ctx.request.body;
    const result = await ctx.service.movie.insertMovie(movie);
    if (result) {
      resData.success = true;
      resData.msg = '插入成功';
    } else {
      resData.success = true;
      resData.msg = '插入失败';
    }
    ctx.body = resData;
  }
  async deleteMovie(){
    const {ctx} = this;
    const id = ctx.request.body.id;
    const result = await ctx.service.movie.deleteMovie(id);
    if(result){
      resData.success = true;
      resData.msg = '删除成功';
    }else{
      resData.success = true;
      resData.msg = '删除失败';
    }
    ctx.body = resData;

  }
  async getAllMovie() {
    const { ctx } = this;
    let result;
    try {
      result = await ctx.service.movie.getAllMovie();
    } catch (e) {
      resData.success = false;
      resData.msg = '查询失败';
    }
    resData.success = true;
    resData.msg = '查询成功';
    resData.data = result;
    ctx.body = resData;
  }
  async searchMovie(){
    const { ctx } = this;
    let keyWord,page,size;
    keyWord = ctx.request.body.keyWord;
    page = ctx.request.body.page;
    size = ctx.request.body.size;
    console.log(ctx.request.body);
    let result;
    try {
      result = await ctx.service.movie.searchMovie(keyWord,page,size);
    } catch (e) {
      resData.success = false;
      resData.msg = '查询失败';
    }
    resData.success = true;
    resData.msg = '查询成功';
    resData.data = result;
    ctx.body = resData;
  }
  async getMovieById(){
    const {ctx} = this;
    const movieId = ctx.request.body.movieId;
    let result;
    try{
      result = await ctx.service.movie.getMovieById(movieId);
    }catch(e){
      resData.success = false;
      resData.msg = '查找失败';
    }
    resData.success = true;
    resData.msg = '查找成功';
    resData.data = result;
    ctx.body = resData;
  }
  async updateMovie(){
    const {ctx} = this,req = ctx.request.body;
    let movie = req;
    console.log('movie=',movie)
    const result = await ctx.service.movie.updateMovie(movie);
    if(result){
      resData.success = true;
      resData.msg = '更新成功';
    }else{
      resData.success = false;
      resData.msg = '更新失败';
    }
    ctx.body = resData;
  }
}

module.exports = MovieController;