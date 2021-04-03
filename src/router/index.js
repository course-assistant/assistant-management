import Vue from 'vue'
import VueRouter from 'vue-router'


// 引入组件
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import HomePage from '@/components/home.vue';
import TeacherList from '@/components/teacher-list.vue';
import StudnetList from '@/components/student-list.vue';
import Other from '@/components/other.vue';


Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      // 默认-教师列表
      {
        name: 'home',
        path: '',
        component: TeacherList,
        meta: {
          title: '管理员页面'
        }
      },
      // 教师列表
      {
        name: 'teacher-list',
        path: 'teacher-list',
        component: TeacherList,
        meta: {
          title: '教师管理 - 教师列表'
        }
      },
      // 学生列表
      {
        name: 'student-list',
        path: 'student-list',
        component: StudnetList,
        meta: {
          title: '学生管理 - 学生列表'
        }

      },
      // 其他
      {
        name: 'other',
        path: 'other',
        component: Other,
        meta: {
          title: '其他管理'
        }
      }
    ],
  },
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router