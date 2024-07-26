import axios from 'axios'
import { showToast } from 'vant';
import router from '@/router'

axios.defaults.baseURL = 'http://120.55.240.215:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'


//拦截请求操作
axios.interceptors.request.use(req => {
    let jwtToken = window.localStorage.getItem('token')
    if (jwtToken) {
        req.headers.Authorization = jwtToken
    }
    return req
}
)

//拦截响应操作
axios.interceptors.response.use(res => {
    if (res.status !== 200) {//程序错误
        showToast('服务器异常，请稍后再试！');
        return Promise.reject(res)
    } else {
        if (res.data.status === 401) {//登录失效
            showToast(res.data.msg);
            router.push('/login')
            return Promise.reject(res)
        }
        if (res.data.code !== '8000') {//逻辑错误
            showToast(res.data.msg);
            return Promise.reject(res)
        }
        return res.data
    }
})

export default axios
