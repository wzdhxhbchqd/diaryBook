const router = require('koa-router')();
const { findNoteListByType, findNoteDetailById, publishNote } = require('../controllers/index.js');
const jwt = require('../utils/jwt.js');

// 查询笔记列表
router.get(('/findNoteListByType'), jwt.verify(), async (ctx) => {
    //获取前端传递的note_type,去数据中以该note_type字段读取数据，返回给前端
    console.log(ctx.request.query);
    console.log(ctx.userId);
    const { note_type } = ctx.request.query;
    const userId = ctx.userId;
    try {
        const result = await findNoteListByType(note_type, userId)
        // console.log(result);
        if (result.length) {
            ctx.body = {
                code: '8000',
                msg: '查询成功',
                data: result
            }
        } else {
            ctx.body = {
                code: '8000',
                msg: '查询成功，但是数据为空'
            }
        }
    } catch (err) {
        ctx.body = {
            code: '8001',
            msg: '服务器异常',
            data: err
        }
    }
})

router.get(('/findNoteDetailById'), jwt.verify(), async (ctx) => {
    console.log(ctx.request.query);
    const { id } = ctx.request.query;
    const userId = ctx.userId;
    try {
        const result = await findNoteDetailById(id, userId)
        console.log(result);
        ctx.body = {
            code: '8000',
            msg: '日记查询成功',
            data: result
        }
    } catch (err) {
        ctx.body = {
            code: '8001',
            msg: '服务器异常',
            data: err
        }
    }
})

router.post(('/publishNote'), jwt.verify(), async (ctx) => {
    console.log(ctx.request.body);
    try {
        const res = await publishNote(ctx.request.body)
        if (res) {
            ctx.body = {
                code: '8000',
                msg: '日记发布成功',
                date: res
            }
        } else {
            ctx.body = {
                code: '8000',
                msg: '日记发布失败'
            }
        }
    } catch (err) {
        console.log(err);
        ctx.body = {
            code: '8001',
            msg: '服务器异常,日记发布失败',
            data: err
        }
    }
})

module.exports = router;