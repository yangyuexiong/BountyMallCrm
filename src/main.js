import { createApp } from "vue";
import TDesign from "tdesign-vue-next";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";
import "@style/global.scss";
import "@style/t-design.less";
// 引入组件库全局样式资源
import "tdesign-vue-next/es/style/index.css";
import Page from "@comp/Page.vue";
import CommonForm from "@comp/CommonForm/index.vue";
import Pagination from "@comp/Pagination.vue";

createApp(App)
  .use(store)
  .use(router)
  .use(TDesign)
  .component("Page", Page)
  .component("CommonForm", CommonForm)
  .component("Pagination", Pagination)
  .mount("#app");
