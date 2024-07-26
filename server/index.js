const koa = require('koa')
const userRouter = require('./router/user.js')
const noteRouter = require('./router/note.js')
const cors = require('@koa/cors')
const app = new koa()
const { bodyParser } = require('@koa/bodyparser')

app.use(cors())//告诉浏览器不要拦截响应
app.use(bodyParser())//辅助koa解析post传递的参数

app.use(userRouter.routes(), userRouter.allowedMethods())//让路由可以有ctx，并且允许所有方法
app.use(noteRouter.routes(), noteRouter.allowedMethods())

app.listen(3000, () => {
    console.log('项目已启动')
})
