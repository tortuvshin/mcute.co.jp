<template>
  <div class="m-containter" :class="{fullWidth: !showSidebar}">
    <!-- <app-navbar :isHomePage="isHomePage"></app-navbar> -->
    <audio src="/assets/sounds/notification.mp3" preload="auto" ref="notification_sound"></audio>      
    <slide-nav :show="showSidebar"></slide-nav>
    <div class="page-content">
       <md-toolbar class="md-whiteframe main-header md-whiteframe-1dp" v-if="!checkNoToolBarPage" style="padding:0;">
          <md-button class="md-icon-button btn-menu" @click.native="showSidebar = !showSidebar" v-if="!($route.path).includes('/dashboard')">
            <md-icon>menu</md-icon>
          </md-button>
          <h2 class="md-title" style="flex: 1">
            {{toolbarTitle}}
          </h2>
          <dashboard-menu v-if="checkDashboardPage" @toogleSidebar="showSidebar = !showSidebar"></dashboard-menu>
       </md-toolbar>

      <div :class="{'main-content-notoolbar': checkNoToolBarPage, 'main-content': !checkNoToolBarPage}">
         <svg-background></svg-background>
          <transition name="fade1" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>

      <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="4000">
        <span v-html="message"></span>
        <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()"><md-icon>close</md-icon></md-button>
      </md-snackbar>
  </div>
</template>

<script>
  import dashboardMenu from './components/dashboard/Menu.vue'
  import svgBackground from './components/common/svgBackground.vue'
  import slideNav from './components/SideNav.vue'
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
  import alert from 'vue-strap/src/Alert.vue'

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
       appNavbar: Navbar,
       appFooter: Footer,
       alert,
       svgBackground,
       slideNav,
       dashboardMenu
    }
  }
</script>

<style src="bootstrap/dist/css/bootstrap.min.css"></style>
<style src="font-awesome/css/font-awesome.min.css"></style>
<style src="animate.css/animate.min.css"></style>
<style>
  .progressData-bar{
    min-height: 4px;
  }
  .fullWidth{
    padding-left: 0!important;
  }

  .btn-menu{
    margin-left: 20px!important;
  }
  .home{
    overflow: hidden!important;
  }
  .fade1-enter-active, .fade1-leave-active {
    transition: opacity 0.2s;
  }

  .fade1-enter, .fade1-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }

  .m-containter{
    padding-left: 305px;
    height: 100%;
    transition: padding 1000ms;
  }

  .page-content {
    height: 100%;
  }

  .main-content {
    overflow: auto;
    z-index: -2;
    height: 92%;
    width: 100%;
  }

  .main-content-notoolbar{
    overflow: auto;
    z-index: -2;
    height: 100%;
    width: 100%;
  }

  .main-header {
    z-index: 2;
    color: #fff!important;
    position: relative;
    width: 100%;
    height: 8%;
  }

  html, body {
    overflow: hidden;
     margin:0;
     padding:0;
     height:100%;
  }

  body {
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    color: rgba(0,0,0,.87);
    font-family: Raleway;
  }

  input, select{
    font-family: Lato;
  }

  .btn-login, .btn-register {
    width: 100%;
  }

  /*From validation*/
  .error-icon{
    color: #e18972;
  }

  .error_message{
    color: #e18972;
    float: right;
  }

  .message{
    margin: 0;
  }

  .col-xs-10{
    padding-left: 0;
  }

  .alert-icon-float-center{
    font-size: 40px;
    text-align: center;
    width:100%;
  }

  .md-radio-label{
    font-weight: 500!important;
  }
</style>
