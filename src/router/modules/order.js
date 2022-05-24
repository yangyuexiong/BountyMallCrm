const router = [
  {
    path: "/order",
    redirect: "/order/list",
    meta: {
      sort: 0,
      icon: "root-list",
      title: "订单管理"
    },
    component: () => import("@/layout/BlankLayout.vue"),
    children: [
      {
        path: "list",
        name: "OrderList",
        meta: {
          sort: 0,
          title: "订单列表"
        },
        component: () => import("@view/order/index.vue")
      },
      {
        path: "refund-list",
        name: "RefundList",
        meta: {
          sort: 0,
          title: "售后订单"
        },
        component: () => import("@view/order/refund-list.vue")
      }
    ]
  }
];

export default router;
