<template>
    <div class="page-header header-filter" filter-color="orange">
        
        <div class="content register-content">
            <div class="container">
                <div class="row">
                    
                    <div class="col-md-8 ml-auto mr-auto">
                        <form v-on:submit.prevent="onRegister">

                            <card type="auth" plain>
                            
                                <h4 class="card-title text-center">Register</h4>
                                    <el-select class="select-default"
                                                placeholder="User type"
                                                v-model="user.type">
                                        <el-option v-for="type in userType"
                                                class="select-default"
                                                :value="type.value"
                                                :label="type.label"
                                                :key="type.label">
                                        </el-option>
                                    </el-select>
                                    <fg-input addon-left-icon="intelligo-icons users_circle-08"
                                            v-model="user.firstName"
                                            placeholder="Enter First Name...">
                                    </fg-input>
                                    <fg-input addon-left-icon="intelligo-icons text_caps-small"
                                            v-model="user.lastName"
                                            placeholder="Enter Last Name...">
                                    </fg-input>
                                    <fg-input addon-left-icon="intelligo-icons ui-1_email-85"
                                            v-model="user.email"
                                            placeholder="Enter Email...">
                                    </fg-input>
                                    
                                    <fg-input addon-left-icon="intelligo-icons ui-1_email-85"
                                            v-model="user.username"
                                            placeholder="Enter username...">
                                    </fg-input>
                                
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
                                    
                                    <fg-input addon-left-icon="intelligo-icons ui-1_email-85"
                                        type="password"
                                        v-model="user.password"
                                        placeholder="Enter password...">
                                    </fg-input>

                                    <fg-input addon-left-icon="intelligo-icons ui-1_email-85"
                                        type="password"
                                        v-model="user.confirmPassword"
                                        placeholder="Retype password...">
                                    </fg-input>
                                    <n-checkbox v-model="user.agree">
                                        I agree to the terms and
                                        <a href="#something">conditions</a>.
                                    </n-checkbox>

                                    <div class="card-footer text-center">
                                        <n-button type="primary" round size="lg" @click.native="onRegister">Sign Up</n-button>
                                    </div>
                                    <div class="social text-center">

                                    <h5 class="card-description"> or be classical </h5>
                                    
                                    <n-button round size="lg" class="btn-facebook">
                                        <i class="fab fa-facebook"></i> Facebook
                                    </n-button>
                                </div>
                            </card>
                        </form>
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
  bodyClass: 'auth-page',
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
      userType: [{value: 'user', label: 'Artist'},
                    {value: 'organization', label: 'Gallery'}],
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
      invalidInput: [],
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