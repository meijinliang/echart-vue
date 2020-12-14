//服务器的入口文件

//1.创建koa对象
const Koa = require('koa')
const app = new Koa()
// 2.编写响应函数（中间件）
// ctx:上下问,web容器，ctx.request,ctx.respones
// next:下一个中间件，下一层中间件是否能够得到执行，取决于next这个函数有没有被调用
// 第一层中间件
const resDurationMiddleware = require('./middleware/koa_response_duration')
app.use(resDurationMiddleware)

//第二层中间件 设置头
const resHeaderMiddleware = require('./middleware/koa_response_header')
app.use(resHeaderMiddleware)
// 第三层中间件 处理业务逻辑
const resDataMiddleware = require('./middleware/koa_response_data')
app.use(resDataMiddleware)
// 3.绑定端口号3000
app.listen(8888)