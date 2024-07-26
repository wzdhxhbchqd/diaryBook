const jwt = require('jsonwebtoken')


//默认HASH256加密方式
function sign(option) {
    //option是用户信息，secret是签名，expiresIn是过期时间
    return jwt.sign(option, 'fate', { expiresIn: 86400 })//86400秒=1天，默认单位是秒，过期时间是一天
}

//检验token
function verify() {
    return async (ctx, next) => {
        let jwtToken = ctx.req.headers.authorization
        if (jwtToken) {
            // 判断 token 是否合法
            try {
                const decoded = jwt.verify(jwtToken, 'fate')
                if (decoded.id) { // 合法
                    ctx.userId = decoded.id
                    await next()
                }
            } catch (e) {
                ctx.body = {
                    status: 401,
                    msg: 'token失效'
                }
            }
        } else {
            ctx.body = {
                status: 401,
                msg: '请提供token'
            }
        }
    }
}


module.exports = {
    sign,
    verify
}
