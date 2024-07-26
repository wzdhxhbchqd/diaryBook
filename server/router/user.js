const router = require('koa-router')();//是函数体，要调用
const { userLogin, userFind, userRegister } = require('../controllers/index.js');
const { sign, verify } = require('../utils/jwt.js');

router.prefix('/user')//添加路由前缀
//登录
router.post('/login', async (ctx) => {//相当于http://localhost:3001/user/login
    //获取到前端传递的账号密码，去数据库中检验
    const { username, password } = ctx.request.body
    try {
        const result = await userLogin(username, password)
        console.log(result);
        if (result.length) {
            let data = {
                id: result[0].id,
                nickname: result[0].nickname,
                username: result[0].username,
            }

            //生成token
            let token = sign({
                id: result[0].id,
                username: result[0].username,
                admin: true
            })
            console.log(token);

            ctx.body = {
                code: '8000',
                msg: '登录成功',
                data: data,
                token: token
            }
        } else {
            ctx.body = {
                code: '8004',
                msg: '账号或密码错误',
                data: 'error'
            }
        }
    } catch (error) {
        ctx.body = {
            code: '8005',
            msg: '服务器异常',
            data: error
        }
    }
})
//注册
router.post('/register', async (ctx) => {
    //获取到前端传递的账号密码，去数据库中检验
    const { username, password, nickname } = ctx.request.body

    let msg = ''
    if (!username) {
        msg = '账号不能为空'
        ctx.body = {
            code: '8001',
            msg: msg,
        }
        return
    } else if (!password) {
        msg = '密码不能为空'
        ctx.body = {
            code: '8001',
            msg: msg,
        }
        return
    } else if (!nickname) {
        msg = '昵称不能为空'
        ctx.body = {
            code: '8001',
            msg: msg,
        }
        return
    }

    //校验账号是否存在
    const findRes = await userFind(username)
    console.log(findRes);
    if (findRes.length) {
        ctx.body = {
            code: '8002',
            msg: '账号已存在',
            data: 'error'
        }
        return
    }
    try {
        //账号不存在，可以注册
        const register = await userRegister(username, password, nickname)
        console.log(register);
        if (register.affectedRows) {
            ctx.body = {
                code: '8000',
                msg: '注册成功',
                data: 'success'
            }
        } else {
            ctx.body = {
                code: '8003',
                msg: '注册失败',
                data: 'error'
            }
        }
    } catch (error) {
        ctx.body = {
            code: '8005',
            msg: '服务器异常',
            data: error
        }
    }
})

//测试token
router.post('/home', verify(), (ctx) => {
    ctx.body = {
        code: '8000',
        data: '首页数据'
    }
})


module.exports = router;