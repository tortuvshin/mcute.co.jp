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
                        <div class="col-md-3">
                            <img v-lazy="'https://cache1.artprintimages.com/images/featuredCollections/sub/mid-century-modern-opt.jpg'" alt="header1">
                        </div>
                        <div class="col-md-3">
                            <img v-lazy="'https://cache1.artprintimages.com/images/featuredCollections/sub/mid-century-modern-opt.jpg'" alt="header2">
                        </div>
                        <div class="col-md-3">
                            <img v-lazy="'https://cache1.artprintimages.com/images/featuredCollections/sub/mid-century-modern-opt.jpg'" alt="header3">
                        </div>
                        <div class="col-md-3">
                            <img v-lazy="'https://cache1.artprintimages.com/images/featuredCollections/sub/mid-century-modern-opt.jpg'" alt="header4">
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
      form: {
        firstName: '',
        email: '',
        notRobot: false
      },
      center: {
        lat: 40.748817,
        lng: -73.985428
      },
      options: {
        styles: [{
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#e9e9e9'
          }, {
            'lightness': 17
          }]
        }, {
          'featureType': 'landscape',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#f5f5f5'
          }, {
            'lightness': 20
          }]
        }, {
          'featureType': 'road.highway',
          'elementType': 'geometry.fill',
          'stylers': [{
            'color': '#ffffff'
          }, {
            'lightness': 17
          }]
        }, {
          'featureType': 'road.highway',
          'elementType': 'geometry.stroke',
          'stylers': [{
            'color': '#ffffff'
          }, {
            'lightness': 29
          }, {
            'weight': 0.2
          }]
        }, {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#ffffff'
          }, {
            'lightness': 18
          }]
        }, {
          'featureType': 'road.local',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#ffffff'
          }, {
            'lightness': 16
          }]
        }, {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#f5f5f5'
          }, {
            'lightness': 21
          }]
        }, {
          'featureType': 'poi.park',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#dedede'
          }, {
            'lightness': 21
          }]
        }, {
          'elementType': 'labels.text.stroke',
          'stylers': [{
            'visibility': 'on'
          }, {
            'color': '#ffffff'
          }, {
            'lightness': 16
          }]
        }, {
          'elementType': 'labels.text.fill',
          'stylers': [{
            'saturation': 36
          }, {
            'color': '#333333'
          }, {
            'lightness': 40
          }]
        }, {
          'elementType': 'labels.icon',
          'stylers': [{
            'visibility': 'off'
          }]
        }, {
          'featureType': 'transit',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#f2f2f2'
          }, {
            'lightness': 19
          }]
        }, {
          'featureType': 'administrative',
          'elementType': 'geometry.fill',
          'stylers': [{
            'color': '#fefefe'
          }, {
            'lightness': 20
          }]
        }, {
          'featureType': 'administrative',
          'elementType': 'geometry.stroke',
          'stylers': [{
            'color': '#fefefe'
          }, {
            'lightness': 17
          }, {
            'weight': 1.2
          }]
        }]

      }
    }
  }
}
</script>
<style>
</style>
