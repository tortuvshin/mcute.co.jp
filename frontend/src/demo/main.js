import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
//plugins
import NowUIKit from './plugins/core';

Vue.config.productionTip = false;
Vue.use(NowUIKit);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
