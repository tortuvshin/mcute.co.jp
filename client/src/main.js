import Vue from 'vue'
import App from './App'

import VueResouce from 'vue-resource'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import VueSocketio from 'vue-socket.io'
import VueMoment from 'vue-moment'
import VueTimeago from 'vue-timeago'
import VueHtml5Editor from 'vue-html5-editor'
import Bootstrap from 'bootstrap'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import MainContent from './components/MainContent.vue'
import SvgBackground from './components/common/svgBackground.vue'
import Spinner from './components/common/Spinner.vue'

import { API_SERVER } from './api.js'

import { store } from './store/index'
import router from './router/routes'

// New template
import BootstrapVue from 'bootstrap-vue'
import Badge from "./components/Badge";
import BaseAlert from "./components/BaseAlert";
import BaseButton from "./components/BaseButton";
import BaseCheckbox from "./components/BaseCheckbox";
import BaseInput from "./components/BaseInput";
import BasePagination from "./components/BasePagination";
import BaseProgress from "./components/BaseProgress";
import BaseRadio from "./components/BaseRadio";
import BaseSlider from "./components/BaseSlider";
import BaseSwitch from "./components/BaseSwitch";
import Card from "./components/Card";
import Icon from "./components/Icon";
import clickOutside from "./directives/click-ouside.js";
import VueLazyload from "vue-lazyload";

export const bus = new Vue();

Vue.use(VueRouter);
Vue.use(VueResouce);
Vue.use(VeeValidate);
Vue.use(VueMoment);
Vue.use(VueMaterial);


// New Components
Vue.component(Badge.name, Badge);
Vue.component(BaseAlert.name, BaseAlert);
Vue.component(BaseButton.name, BaseButton);
Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseCheckbox.name, BaseCheckbox);
Vue.component(BasePagination.name, BasePagination);
Vue.component(BaseProgress.name, BaseProgress);
Vue.component(BaseRadio.name, BaseRadio);
Vue.component(BaseSlider.name, BaseSlider);
Vue.component(BaseSwitch.name, BaseSwitch);
Vue.component(Card.name, Card);
Vue.component(Icon.name, Icon);
Vue.directive("click-outside", clickOutside);

Vue.mixin({
  methods: {
    avatarUrl(user){
      if (typeof user.avatar === undefined){
        return API_SERVER + '/uploads/' + user.username + '/avatar/' + user.avatar.filename;
      }
      return '/src/assets/images/profile/default_avatar.jpg';
    },
    updateToolbar(title){
      bus.$emit('updateToolbar', title)
    },
    todayDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
         if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            }

        today = yyyy+'-'+mm+'-'+dd;
        return today;
    },
    todayDateTime(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var m = today.getMinutes();
        var ss = today.getSeconds();

        if(dd<10){
          dd='0'+dd
        } 
        if(mm<10){
          mm='0'+mm
        } 
        if (hh<10){
          hh='0'+hh
        }
        if(m<10){
          m='0'+m
        }
        if(ss<10){
          ss='0'+ss
        }

        today = yyyy+'-'+mm+'-'+dd+'T'+hh+':'+m+':'+ss;
        console.log(today);
        return today;
    }
  }
});



Vue.filter('substring', (value, number) => {
  return value.substring(0, number) + '...';
});

Vue.filter('capitalizeFirstLetter', (string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
});

Vue.http.interceptors.push((request, next) => {
  // Send all the request with the token by Authorization header
  request.headers.set('Authorization', store.state.user.token);
  request.headers.set('Accept', 'application/json');
  next((response) => {
    // Access Token Expried
    if (response.status === 401) {
      alert("Access Token Expried. Please login again");
      store.dispatch('logout');
      router.push({name: 'Login'});
    }
  })
})

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

// Check auth before access to the destination
router.beforeEach((to, from, next) => {
 
    if (to.meta.auth && store.state.user.token == null) {
        next({ name: 'Login', params: { errorMessage: 'Please login first' }, replace: false});
    } else if ((to.name === "Login" && store.state.user.token) || (to.name === "Register" && store.state.user.token)) {
        next({path: from.path, replace: true});
    } else {
        bus.$emit('updateToolbar', to.meta.title);
        next();
    }
});

new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
