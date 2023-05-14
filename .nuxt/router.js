import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ea014eea = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _788f8f6a = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _0731f071 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _391536fd = () => interopDefault(import('../pages/sludinajumi.vue' /* webpackChunkName: "pages/sludinajumi" */))
const _39a22207 = () => interopDefault(import('../pages/sludinajums.vue' /* webpackChunkName: "pages/sludinajums" */))
const _7d509518 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _ea014eea,
    name: "login"
  }, {
    path: "/profile",
    component: _788f8f6a,
    name: "profile"
  }, {
    path: "/register",
    component: _0731f071,
    name: "register"
  }, {
    path: "/sludinajumi",
    component: _391536fd,
    name: "sludinajumi"
  }, {
    path: "/sludinajums",
    component: _39a22207,
    name: "sludinajums"
  }, {
    path: "/",
    component: _7d509518,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
