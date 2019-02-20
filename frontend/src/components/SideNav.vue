<template>
   <div tabindex="0" class="md-sidenav md-left main-sidebar md-theme-default">
    <transition leave-active-class="animated slideOutLeft" enter-active-class="animated slideInLeft"> 
     <div class="md-sidenav-content" v-if="show">
          <div class="md-toolbar vue-material-logo md-theme-white">
            <router-link to="/"><span class="logo"><i class="fa fa-gg fa-fw" aria-hidden="true"></i><span class="title"> ECJOB</span></span></router-link>
          </div>

          <div class="main-sidebar-links">
            <md-list style="padding-top: 0">
              <li class="md-list-item" style="margin-top: 20px;">
                <router-link to="/project/search" class="md-list-item-container md-button">Browse Job</router-link>
              </li>
              <li class="md-list-item">
                <router-link to="/project/post" class="md-list-item-container md-button">Post Job</router-link>
              </li>
              <hr width="300">
              <li class="md-list-item">
                <router-link to="/dashboard/project" class="md-list-item-container md-button">My Job</router-link>
              </li>
              <li class="md-list-item">
                <router-link to="/support" class="md-list-item-container md-button">Support Center</router-link>
              </li>
            </md-list>
          </div>

          <li class="md-list-item currentUser-listItem">
                <md-layout md-gutter v-if="currentUser" style="background-color: #fff; padding:8px;">
                  <md-layout md-flex="20" md-flex-offset="5" @click.native="$router.push('/dashboard');">
                    <md-avatar>
                        <img :src="avatarUrl(currentUser)" alt="Avatar">
                    </md-avatar>
                  </md-layout>

                  <md-layout md-flex="65"  @click.native="$router.push('/dashboard');">
                    <div class="currentUser">
                     <span class="fullName">{{ currentUser.firstName }} {{ currentUser.lastName }}</span><br>
                     {{currentUser.type}}
                    </div>
                  </md-layout>

                   <md-layout md-flex="10">
                    <div class="logout">
                      <a href="#" @click.prevent="logout" style="color:#000;"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
                    </div>
                  </md-layout>
                </md-layout>

                <md-layout md-gutter v-if="!currentUser">
                  <md-layout md-flex="50">
                      <router-link to="/login" tag="button" class="md-button md-raised md-primary btn-login md-theme-default">Login</router-link>
                  </md-layout>
                  <md-layout md-flex="50">
                       <router-link to="/register" tag="button" class="md-button md-raised btn-register md-theme-default">Sign Up</router-link>
                  </md-layout>
                </md-layout>
          </li>
      </div>
      </transition>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { bus } from '../main.js'

  export default {
    props: ['show'],
    computed: {
      currentUser(){
        return this.$store.state.user.currentUser;
      }
    },
    methods: {
      ...mapActions([
        'logout'
      ])
    },
    created(){
      bus.$on('toggleSidebar', () => {
        this.toggleSidebar();
      });
    }
  }
</script>

<style>
.md-button{
  font-weight: 500!important;
  font-family: Lato;
}
.md-sidenav-content{
  transition: width 500ms!important;
}

.main-sidebar.md-sidenav .md-sidenav-content {
    top: 0;
    pointer-events: auto;
    transform: translateZ(0);
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
}

.main-sidebar.md-sidenav .md-backdrop {
    opacity: 0;
    pointer-events: none;
}

.main-sidebar.md-sidenav .main-sidebar-links {
    overflow: auto;
    -ms-flex: 1;
    flex: 1;
}

.md-toolbar.vue-material-logo.md-theme-white{
    border-bottom: 1px solid rgba(0,0,0,.12);
}

.md-toolbar.vue-material-logo.md-theme-white a{
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: column;
    flex-flow: column;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    color: inherit;
    text-decoration: none;
}

.logo {
    font-size: 2.3em;
    letter-spacing: 5px;
    color: #4c4c4c;
    padding: 20px;
}

.logo > i {
   background: #614385; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #614385, #516395); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #614385, #516395); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  
}


.currentUser  > .fullName{
    font-size: 1.2em;
}

.md-list-item.currentUser-listItem{
    list-style-type: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(0,0,0,.12);
    cursor: pointer;
}

.logout{
  margin-top:15px;
  font-size: 1.4em;
}

.currentUser{
    margin-top: 7px;
}
.main-sidebar.md-sidenav .md-sidenav-content{
    flex-flow: column;
    overflow: hidden;
}
</style>

<style scoped>
.md-button, .md-button:hover, .md-button:active, .md-button:visited, .md-button:focus{
  text-decoration:none;
}

hr {
  border-top: 1px solid rgba(0,0,0,.12)!important;
}
</style>