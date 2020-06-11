import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      isLogin: true
    },
    component: () => import( /* webpackChunkName: "about" */ '../views/login/Login.vue')
  },
  {
    path: '/DASH_BTC',
    name: 'DASH_BTC',
    redirect: '/DASH_BTC/jy',
    component: () => import( /* webpackChunkName: "DASH_BTC" */ '../views/menu/DASH_BTC.vue'),
    children: [{
        path: 'jy',
        component: () => import( /* webpackChunkName: "DASH_BTC" */ '../views/datasExpress/JY.vue')
      },
      {
        path: 'kx',
        component: () => import( /* webpackChunkName: "DASH_BTC" */ '../views/datasExpress/KX.vue')
      },
      {
        path: 'jj',
        component: () => import( /* webpackChunkName: "DASH_BTC" */ '../views/datasExpress/JJ.vue')
      },
      {
        path: 'cj',
        component: () => import( /* webpackChunkName: "DASH_BTC" */ '../views/datasExpress/CJ.vue')
      },
    ]
  },
  {
    path: '/message',
    name: 'Message',
    meta: {
      requireAuth: true
    },
    component: () => import( /* webpackChunkName: "message" */ '../views/menu/Message.vue')
  },
  {
    path: '/setLang',
    name: 'SetLang',
    component: () => import( /* webpackChunkName: "setLang" */ '../views/menu/SetLang.vue')
  },
  {
    path: '/wallet',
    name: 'Wallet',
    meta: {
      requireAuth: true
    },
    component: () => import( /* webpackChunkName: "wallet" */ '../views/menu/Wallet.vue')
  },
  {
    path: '/wallet/deposit',
    name: 'Deposit',
    component: () => import( /* webpackChunkName: "deposit" */ '../views/wallet/Deposit.vue'),
  },
  {
    path: '/wallet/withdrawal',
    name: 'Withdrawal',
    component: () => import( /* webpackChunkName: "withdrawal" */ '../views/wallet/Withdrawal.vue'),
  },
  {
    path: '/wallet/record',
    name: 'Record',
    component: () => import( /* webpackChunkName: "Deposit_record" */ '../views/wallet/Deposit_record.vue'),
  },
  {
    path: '/wallet/address',
    name: 'Address',
    component: () => import( /* webpackChunkName: "Address" */ '../views/wallet/Address.vue'),
  },
  {
    path: '/signUp',
    name: 'SignUp',
    meta: {
      isLogin: true
    },
    component: () => import( /* webpackChunkName: "signUp" */ '../views/login/SignUp.vue')
  },
  {
    path: '/resetPass',
    name: 'ResetPass',
    component: () => import( /* webpackChunkName: "signUp" */ '../views/login/ResetPass.vue')
  },
  {
    path: '/cms',
    name: 'Cms',
    redirect: 'cms/agreement',
    component: () => import( /* webpackChunkName: "Agreement" */ '../views/Instructions/Agreement.vue')
  },
  {
    path: '/cms/agreement',
    component: () => import( /* webpackChunkName: "Agreement" */ '../views/Instructions/Agreement.vue')
  },
  {
    path: '/cms/declaration',
    component: () => import( /* webpackChunkName: "Declaration" */ '../views/Instructions/Declaration.vue')
  },
  {
    path: '/cms/privacy',
    component: () => import( /* webpackChunkName: "Privacy" */ '../views/Instructions/Privacy.vue')
  },
  {
    path: '/cms/aboutus',
    component: () => import( /* webpackChunkName: "Aboutus" */ '../views/Instructions/Aboutus.vue')
  },
  {
    path: '/new',
    meta: {
      requireAuth: true
    },
    component: () => import( /* webpackChunkName: "Aboutus" */ '../views/menu/New.vue')
  },
  {
    path: '/apply',
    component: () => import( /* webpackChunkName: "Apply" */ '../views/menu/Apply.vue')
  },
  {
    path: '/user',
    meta: {
      requireAuth: true
    },
    component: () => import( /* webpackChunkName: "user" */ '../views/user/index.vue')
  },
  {
    path: '/article',
    component: () => import( /* webpackChunkName: "article" */ '../views/article/Index.vue')
  }
]

// 防止点击相同的路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!localStorage.getItem("token")) {
      let info = ''
      let type = sessionStorage.getItem('locale')
      switch (type) {
        case 'zh':
          info = '请先登录!';
          break;
        case 'en':
          info = 'Please log in first!';
          break;
      }
      Vue.prototype.$notify({
        message: info,
        duration: 800
      })
      return next('/login')
    } else {
      next()
    }
  }
  next()
})
export default router