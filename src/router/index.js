import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/components/Index.vue";
import SearchResult from "@/components/SearchResult.vue";
import BusDetail from "@/components/BusDetail.vue";
import Direction0 from "@/components/Direction0.vue";
import Direction1 from "@/components/Direction1.vue";

const routes = [
  {
    path: "/find-my-bus",
    name: "Index",
    component: Index,
    props: true,
  },
  {
    path: "/find-my-bus/searchResult/:routeName",
    name: "SearchResult",
    component: SearchResult,
    props: true,
  },
  {
    path: "/find-my-bus/BusDetail/:routeID/",
    // /:direction
    name: "BusDetail",
    component: BusDetail,
    props: true,
    redirect: { name: 'Direction0' },
    
    children: [
      {
        path: "0",
        name: "Direction0",
        component: Direction0,
        props: true,
      },
      {
        path: "1",
        name: "Direction1",
        component: Direction1,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
