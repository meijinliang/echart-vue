//计算服务器消耗时长的中间件
module.exports = async (ctx, next) => {
    //记录开始时间
    const start = Date.now()
    // 记录结束的时间
    await next()
    // 设置响应头X-Response-Time
    const end = Date.now()
    const duration = end - start
    // ctx.set设置响应头
    ctx.set('X-Response-Time', duration + 'ms')
}