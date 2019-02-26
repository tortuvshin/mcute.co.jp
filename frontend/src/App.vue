
<template>
    <div id="app">
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

import { bus } from './main.js'
import { mapMutations } from 'vuex'
import { API_SERVER } from './api.js'

export default {
  data(){
    return {
      title: '',
      resultType: '',
      message : '',
      toolbarTitle: '',
      showSidebar: true
    };
  },
  computed: {
    checkDashboardPage(){
        if (this.$route.path.includes('/dashboard')){
          return true;
        }
    },
    checkNoToolBarPage(){
      this.toolbarTitle = this.$route.meta.title;
      var noToolbarPage = ['/', '/login', '/register'];
      if (noToolbarPage.indexOf(this.$route.path) >  -1){
        return true;
      }
      return false;
    }
  },
  created(){
    bus.$on('showAlert', $event => {
      this.message = $event.message;
      this.$refs.notification_sound.play();
      this.$refs.snackbar.open();
    });

    bus.$on('updateToolbar', (title)=>{
      this.toolbarTitle = title;
    });

    bus.$on('scolltoTop', ()=> {
      var myDiv = document.querySelector('.main-content');
      function scrollTo(element, to, duration) {
          if (duration <= 0) return;
          var difference = to - element.scrollTop;
          var perTick = difference / duration * 10;

          setTimeout(function() {
              element.scrollTop = element.scrollTop + perTick;
              if (element.scrollTop === to) return;
              scrollTo(element, to, duration - 10);
          }, 10);
      }
      scrollTo(myDiv, 0, 300);
    });
  },
  methods: {
    ...mapMutations([
      'updateCurrentUser',
      'updateToken'
    ]),
    backToPervious(){
      this.$router.go(-1);
    },
    changeSideBarWidth(){
      if (this.sidebarWidth === 0){
        this.sidebarWidth = 304;
      } else {
        this.sidebarWidth = 0;
      }
    }  
  },
  filters: {
    capitallizeFirstLetter(val){
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  },
  components: {
    FadeTransition
  }
};
</script>

<style>
  @import "../node_modules/font-awesome/css/font-awesome.min.css";
  @import "./assets/vendor/nucleo/css/nucleo.css";
</style>

<style lang="scss">
@import "./assets/scss/argon";
</style>
