//封装一个函数用于连接数据库

const mysql = require('mysql2/promise');
const config = require('../config/index.js');

//线程池
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    port: config.database.PORT,
    database: config.database.DATABASE,
})

const allServices = {
    async query(sql, values) {
        try {
            //通过线程池连接mysql
            const conn = await pool.getConnection();
            //对连接执行某些操作
            const [rows, fields] = await conn.query(sql, values);
            //释放连接
            pool.releaseConnection(conn);
            return Promise.resolve(rows);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}


//登录接口函数
const userLogin = (username, password) => {
    let _sql = `select * from users where username="${username}" and password="${password}";`
    return allServices.query(_sql);
}

//查找账号
const userFind = (username) => {
    let _sql = `select * from users where username="${username}";`
    return allServices.query(_sql);
}

//注册接口函数
const userRegister = (username, password, nickname) => {
    let _sql = `insert into users(username, password, nickname) values("${username}", "${password}", "${nickname}");`
    return allServices.query(_sql);
}

//根据类型查找笔记
const findNoteListByType = (type, id) => {
    let _sql = `select * from note where note_type="${type}" and userId="${id}";`
    return allServices.query(_sql);
}

const findNoteDetailById = (id, userId) => {
    let _sql = `select * from note where id="${id}" and userId="${userId}";`
    return allServices.query(_sql);
}

const publishNote = (obj) => {
    const date = new Date()
    const m_time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    let _sql = `insert into note (userid,title,note_type,note_content,c_time,m_time,head_img,nickname) values ("${obj.user_id}","${obj.title}","${obj.note_type}","${obj.note_content}","${obj.c_time}","${obj.m_time}","${obj.head_img}","${obj.nickname}");`
    return allServices.query(_sql);
}

module.exports = {
    userLogin,
    userFind,
    userRegister,
    findNoteListByType,
    findNoteDetailById,
    publishNote
}