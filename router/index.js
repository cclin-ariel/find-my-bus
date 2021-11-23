// import { createRouter, createWebHashHistory } from "vue-router";
import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/components/Index.vue";
import SearchResult from "@/components/SearchResult.vue";
import BusDetail from "@/components/BusDetail.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    props: true,
  },
  {
    path: "/search/:routeName",
    name: "SearchResult",
    component: SearchResult,
    props: true,
  },
  {
    path: "/:routeName/busStop/:busStop/:direction=0",
    name: "BusDetail",
    component: BusDetail,
    props: true,
  },
];

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
// 5. 创建并挂载根实例
const app = Vue.createApp({});
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router);

app.mount("#app");

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });
// export default router;
