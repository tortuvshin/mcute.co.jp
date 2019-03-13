<template>
    <div class="wrapper">
        <div class="page-header page-header-small header-filter" filter-color="orange">
            <!-- <parallax class="page-header-image"
                 style="background-image: url('img/bg5.jpg')">
            </parallax> -->
            
            <div class="container">
              <parallax>
                <div class="photo-container">
                    <img v-lazy="'img/ryan.jpg'" alt="">
                </div>
                <h3 class="title">{{ currentUser.firstName }} {{ currentUser.lastName }}</h3>
                <p class="category">{{ currentUser.type }} Member Since&nbsp;{{ currentUser.signUpDate | moment("DD-MMMM-YYYY") }}</p>
                <div class="content">
                    <div class="social-description">
                        <h2>26</h2>
                        <p>Art works</p>
                    </div>
                    <div class="social-description">
                        <h2>26</h2>
                        <p>Sale</p>
                    </div>
                    <div class="social-description">
                        <h2>48</h2>
                        <p>Favorite</p>
                    </div>
                </div>
              </parallax>
            </div>
        </div>

        <div class="container">
            
            <tabs type="primary"
                  centered
                  tabContentClasses="tab-subcategories">

                <tab-pane>
                    <span slot="label">
                      <i class="intelligo-icons objects_umbrella-13"></i><a>Portfolio</a>
                    </span>
                    <div class="container">
                        <div class="col-md-8 ml-auto mr-auto">
                            <div class="section-description text-center">
                                <h2 class="title">My Portfolio</h2>
                                <h5 class="description"> Build pages in no time using pre-made sections!</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        
                        <div class="col-md-4" v-for="project in open.projects">
                            <card type="blog">
                                <img slot="image" v-for="file in project.files" class="img rounded" v-bind:src="api + '/temp/' + file.filename">
    
                                <h6 class="category text-warning">
                                  <i class="intelligo-icons business_bulb-63"></i> Focus
                                </h6>
                                <h5 class="card-title">
                                  <router-link :to="/project/ + project._id" :tag=a>{{project.title}}</router-link>
                                </h5>
                                <p class="card-description">
                                  {{ project.description.substring(0,300)}}
                                </p>
                            </card>
                        </div>
                    </div>
                </tab-pane>

                <tab-pane>
                  <span slot="label">
                    <i class="intelligo-icons objects_umbrella-13"></i><a>About</a>
                  </span>
                  <div class="container">
                      <div class="col-md-8 ml-auto mr-auto">
                          <div class="section-description text-center">
                              <h3 class="title">About me</h3>
                              <h5 class="description text-center" v-html="currentUser.profile"></h5>
                          </div>
                      </div>
                  </div>
                </tab-pane>

                <tab-pane>
                    <span slot="label">
                      <i class="intelligo-icons objects_umbrella-13"></i><a>Settings</a>
                    </span>
                    <div class="row">
                        
                    </div>
                </tab-pane>
            </tabs>
            
        </div>
    
    </div>
</template>
<script>

import { Badge, Button, InfoSection, FormGroupInput, Card, Tabs, TabPane, Checkbox } from '@/components'
import { API_KEY } from '@/constants'
import { API_SERVER } from '../api.js'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: API_KEY
  }
})
export default {
  name: 'Profile',
  bodyClass: 'profile-page',
  computed: {
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  components: {
    InfoSection,
    Card,
    Tabs,
    TabPane,
    Badge,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [FormGroupInput.name]: FormGroupInput
  },
  data () {
    return {
      api: '',
      open: {
        projects: [],
        pageNumber: 1,
        rowNumber: 3,
        totalProjectCount: 0,
        loading: false,
        keyword: ''
      },
    }
  },
  methods: {
    
    fetchData (status) {
        this[status].loading = true
        this.$http.get(API_SERVER + '/dashboard/project',
          { params: {
            status: status,
            keyword: this[status].keyword
          } })
          .then(response => {
            this[status].loading = false
            this[status].projects = response.body.projects
            this[status].totalProjectCount = response.body.totalProjectCount
          })
      
    },
    updateProject (data, status) {
      this[status].pageNumber = data.pageNumber
      this[status].rowNumber = data.rowNumber
      this.fetchData([status])
    },
    searchProject (keyword, status) {
      this[status].keyword = keyword
      this.fetchData([status])
    }
  },
  created () {
    this.api = API_SERVER
    this.fetchData('open')
  },
}
</script>
<style>
</style>
