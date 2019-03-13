<template>
    <div class="page-header signup-page section-image">
        
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 ml-auto mr-auto">
                        <div class="info info-horizontal">
                            <div class="icon icon-primary">
                                <i class="intelligo-icons media-2_sound-wave"></i>
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
                                <i class="intelligo-icons media-1_button-pause"></i>
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
                                <i class="intelligo-icons users_single-02"></i>
                            </div>
                            <div class="description">
                                <h5 class="info-title">Matching System</h5>
                                <p class="description">
                                    There is also a Fully Customizable System Admin Dashboard for this product.
                                </p>
                            </div>
                        </div>
                    </div>
                          
                    <div class="col-md-6 mr-auto">
                        <div class="card card-signup">
                            <div class="card-body">
                                <h4 class="card-title text-center">Register</h4>
                                <div class="row">
                                    <div class="col-12">
                                        <el-select class="select-default"
                                                    placeholder="User type"
                                                    v-model="user.country">
                                            <el-option v-for="country in Object.keys(countries)"
                                                    class="select-default"
                                                    :value="countries[country]"
                                                    :label="countries[country]"
                                                    :key="countries[country]">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <fg-input addon-left-icon="intelligo-icons users_circle-08"
                                                v-model="user.firstName"
                                                placeholder="Enter First Name...">
                                        </fg-input>
                                    </div>
                                    <div class="col-md-6">
                                        <fg-input addon-left-icon="intelligo-icons text_caps-small"
                                                v-model="user.lastName"
                                                placeholder="Enter Last Name...">
                                        </fg-input>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                    <fg-input addon-left-icon="intelligo-icons ui-1_email-85"
                                            v-model="user.email"
                                            placeholder="Enter Email...">
                                    </fg-input>
                                    </div>
                                    <div class="col-md-12">

                                    <fg-input addon-left-icon="intelligo-icons ui-1_email-85"
                                            v-model="user.username"
                                            placeholder="Enter username...">
                                    </fg-input>
                                    </div>
                                    <div class="col-12">
                                        <el-select class="select-default"
                                                    placeholder="Country Select"
                                                    v-model="user.country">
                                            <el-option v-for="country in Object.keys(countries)"
                                                    class="select-default"
                                                    :value="countries[country]"
                                                    :label="countries[country]"
                                                    :key="countries[country]">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="row">
                                    
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                    <fg-input addon-left-icon="intelligo-icons ui-1_email-85"
                                        type="password"
                                        v-model="user.password"
                                        placeholder="Enter password...">
                                    </fg-input>
                                    </div>
                                    <div class="col-md-6">

                                    <fg-input addon-left-icon="intelligo-icons ui-1_email-85"
                                        type="password"
                                        v-model="user.confirmPassword"
                                        placeholder="Retype password...">
                                    </fg-input>
                                    </div>
                                </div>
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
import { Radio, Card, Button, FormGroupInput, Checkbox } from '@/components'
import MainFooter from '@/layout/MainFooter'
import { mapActions } from 'vuex'
import countries from '../assets/json/countries.json'
import { Select, Option } from 'element-ui'
import { bus } from '../main.js'

export default {
  name: 'Register',
  bodyClass: 'signup-page',
  components: {
    Card,
    MainFooter,
    [Radio.name]: Radio,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Checkbox.name]: Checkbox,
    [FormGroupInput.name]: FormGroupInput
  },
  data () {
    return {
      countries: countries,
      user: {
        type: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        country: this.value,
        email: '',
        agree: false
      },
      invalidInputs: [],
      registerProcess: 0,
      passwordIsSame: true,
      passwordStrength: true
    }
  },
    props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    'user.password' (val) {
      val.length < 8 ? this.passwordStrength = false : this.passwordStrength = true
      val === this.user.confirmPassword ? this.passwordIsSame = true : this.passwordIsSame = false
    },
    'user.confirmPassword' (val) {
      val === this.user.password ? this.passwordIsSame = true : this.passwordIsSame = false
    }
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    isInvalidExist (fieldName) {
      return this.invalidInput.indexOf(fieldName) !== -1
    },
    checkInvalidInput () {
      Object.keys(this.user).forEach((fieldName) => {
        if (this.user[fieldName] === '') {
          this.invalidInput.push(fieldName)
        }
      })
    },
    removeInvalidInput (key) {
      var index = this.invalidInput.indexOf(key)
      if (index > -1) {
        this.invalidInput.splice(index, 1)
      }
    },
    onRegister () {
      this.checkInvalidInput()
      if (this.invalidInput.length === 0 && this.passwordIsSame && this.passwordStrength) {
        var registerProgress = setInterval(() => {
          if (this.registerProgress < 100) {
            this.registerProgress += 15
          } else {
            clearInterval(registerProgress)
            var payload = {
              ref: this,
              user: this.user
            }
            this.register(payload)
          }
        }, 100)
      }
    },
    registerSuccess (message) {
      bus.$emit('showAlert', message)
      this.$router.go(-1)
    }
  }
}
</script>
<style>
</style>