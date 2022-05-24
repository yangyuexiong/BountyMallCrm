const router = [
  {
    path: "/goods",
    redirect: "/goods/list",
    meta: {
      sort: 1,
      icon: "gift",
      title: "商品管理"
    },
    component: () => import("@/layout/BlankLayout.vue"),
    children: [
      {
        path: "list",
        name: "GoodsList",
        meta: {
          sort: 0,
          title: "商品列表"
        },
        component: () => import("@view/goods/index.vue")
      }
    ]
  }
];

export default router;
