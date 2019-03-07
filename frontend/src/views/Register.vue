<template>
    <div class="page-header signup-page section-image">
        <div class="page-header-image"
             style="background-image: url('img/bg18.jpg')">
        </div>
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 ml-auto mr-auto">
                        <div class="info info-horizontal">
                            <div class="icon icon-primary">
                                <i class="now-ui-icons media-2_sound-wave"></i>
                            </div>
                            <div class="description">
                                <h5 class="info-title">Artist</h5>
                                <p class="description">
                                    We've created the marketing campaign of the website. It was a very interesting
                                    collaboration.
                                </p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon icon-primary">
                                <i class="now-ui-icons media-1_button-pause"></i>
                            </div>
                            <div class="description">
                                <h5 class="info-title">Space</h5>
                                <p class="description">
                                    Galleries, Museum, Studios
                                </p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon icon-info">
                                <i class="now-ui-icons users_single-02"></i>
                            </div>
                            <div class="description">
                                <h5 class="info-title">Matching System</h5>
                                <p class="description">
                                    There is also a Fully Customizable System Admin Dashboard for this product.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mr-auto">
                        <div class="card card-signup">
                            <div class="card-body">
                                <h4 class="card-title text-center">Register</h4>

                                <fg-input addon-left-icon="now-ui-icons users_circle-08"
                                          v-model="user.firstName"
                                          placeholder="Enter First Name...">
                                </fg-input>

                                <fg-input addon-left-icon="now-ui-icons text_caps-small"
                                          v-model="user.lastName"
                                          placeholder="Enter Last Name...">
                                </fg-input>

                                <fg-input addon-left-icon="now-ui-icons ui-1_email-85"
                                          v-model="user.email"
                                          placeholder="Enter Email...">
                                </fg-input>

                                <fg-input addon-left-icon="now-ui-icons ui-1_email-85"
                                          v-model="user.username"
                                          placeholder="Enter username...">
                                </fg-input>

                                <fg-input addon-left-icon="now-ui-icons ui-1_email-85"
                                    type="password"
                                    v-model="user.password"
                                    placeholder="Enter password...">
                                </fg-input>

                                <fg-input addon-left-icon="now-ui-icons ui-1_email-85"
                                    type="password"
                                    v-model="user.confirmPassword"
                                    placeholder="Retype password...">
                                </fg-input>

                                <n-checkbox v-model="user.agree">
                                    I agree to the terms and
                                    <a href="#something">conditions</a>.
                                </n-checkbox>

                                <div class="card-footer text-center">
                                    <n-button type="primary" round size="lg">Sign Up</n-button>
                                </div>
                                <div class="social text-center">

                                    <h5 class="card-description"> or be classical </h5>
                                    <n-button round icon class="btn-twitter">
                                        <i class="fab fa-twitter"></i>
                                    </n-button>
                                    <n-button round icon class="btn-google">
                                        <i class="fab fa-google"></i>
                                    </n-button>
                                    <n-button round icon class="btn-facebook">
                                        <i class="fab fa-facebook"> </i>
                                    </n-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <main-footer></main-footer>
    </div>
</template>
<script>
import { Card, Button, FormGroupInput, Checkbox } from '@/components'
import MainFooter from '@/layout/MainFooter'
import { mapActions } from 'vuex'
import countryPicker from '../components/common/CountryPicker'
import { bus } from '../main.js'

export default {
  name: 'Register',
  bodyClass: 'signup-page',
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [FormGroupInput.name]: FormGroupInput
  },
  data () {
    return {
      user: {
        type: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        country: '',
        email: '',
        agree: false
      },
      invalidInputs: [],
      registerProcess: 0,
      passwordIsSame: true,
      passwordStrength: true
    }
  }
}
</script>
<style>
</style>
