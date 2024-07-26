import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/noteClass'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/noteClass',
      name: 'noteClass',
      component: () => import('@/views/NoteClass.vue'),
      meta: {
        title: '日记分类'
      }
    },
    {
      path: '/noteList',
      name: 'noteList',
      component: () => import('@/views/NoteList.vue'),
      meta: {
        title: '日记列表'
      }
    },
    {
      path: '/noteDetail',
      name: 'noteDetail',
      component: () => import('@/views/NoteDetail.vue'),
      meta: {
        title: '日记详情'
      }
    },
    {
      path: '/notePublish',
      name: 'notePublish',
      component: () => import('@/views/NotePublish.vue'),
      meta: {
        title: '发布日记'
      }
    }
  ]
})


//白名单
const whitePath = ['/login', '/register', '/noteClass']
//全局路由前置守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  //判断是否需要登录
  if (!whitePath.includes(to.path)) {
    //判断本地有无用户登录数据
    if (!localStorage.getItem('userInfo')) {
      //没有用户数据，跳转到登录页面
      router.push('/login')
      return
    }
    //有用户数据，直接跳转
    next()
    return
  }
  next()
})

export default router
