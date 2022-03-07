import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import store from "@/store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "jualanku-active-class",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 140 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }

        return false;
      }
    }
  },
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      props: true
    },

    {
      path: "/product/:id",
      name: "ProductDetail",
      props: true,
      component: () =>
        import(/* webpackChunkName: "ProductDetail"*/ "./views/ProductDetail")
      // meta: { requiresAuth: true }
    },
    {
      path: "/products",
      name: "products",
      alias: "/",
      component: () =>
        import(/* webpackChunkName: "Products" */ "./views/Products.vue")
      // meta: { requiresAuth: true }
    },
    {
      path: "/404",
      alias: "*",
      name: "notFound",
      component: () =>
        import(
          /* webpackChunkName: "NotFound" */
          "./views/NotFound"
        )
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user.username) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
