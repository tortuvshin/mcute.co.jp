import Vue from "vue";
import App from "./App";
import router from "./router";
//plugins
import MCute from './plugins/mcute';

Vue.config.productionTip = false;
Vue.use(MCute);


new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
