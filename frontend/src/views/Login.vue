<template>
    <div class="page-header header-filter" filter-color="orange">
        <div class="page-header-image"
             style="background-image: url('static/img/login.jpg')">
        </div>
        <div class="content">
            <div class="container">
                <div class="col-md-5 ml-auto mr-auto">
                    <form v-on:submit.prevent="onLogin">

                        <card type="login" plain>

                            <div slot="header" class="logo-container">
                                <img v-lazy="'static/img/o.png'" alt="">
                            </div>

                            <fg-input
                                class="no-border input-lg"
                                addon-left-icon="now-ui-icons users_circle-08"
                                v-model="username"
                                required @change="invalidInput = []"
                                placeholder="Username...">
                            </fg-input>

                            <fg-input
                                class="no-border input-lg"
                                addon-left-icon="now-ui-icons text_caps-small"
                                placeholder="Password..."
                                v-model="password"
                                required @change="invalidInput = []"
                                type="password">
                            </fg-input>
                            <h6>
                                {{ loading }}
                                {{ errorMessage }}
                                {{ message }}
                            </h6>

                            <div class="card-footer text-center">
                                <n-button type="primary" round size="lg" @click.native="onLogin" >Get Started</n-button>
                            </div>

                            <div class="pull-left">
                                <h6>
                                    <a href="/register" class="link footer-link">Create Account</a>
                                </h6>
                            </div>
                            <div class="pull-right">
                                <h6>
                                    <a href="/" class="link footer-link">Need Help?</a>
                                </h6>
                            </div>
                        </card>
                    </form>
                </div>
            </div>
        </div>
        <main-footer></main-footer>
    </div>
</template>
<script>
import { Card, Button, FormGroupInput } from '@/components'
import MainFooter from '@/layout/MainFooter'
import Vue from 'vuex'
import { bus } from '../main.js'
import { API_SERVER } from '../api.js'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  bodyClass: 'login-page',
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data () {
    return {
      username: '',
      password: '',
      invalidInput: [],
      errorMessage: '',
      loginProgress: 0
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    isInvalidExist (fieldName) {
      return this.invalidInput.indexOf(fieldName) !== -1
    },
    checkInvalidInput (fieldNames) {
      var result = false
      fieldNames.forEach((fieldName) => {
        if (this[fieldName] === '') {
          this.invalidInput.push(fieldName)
          result = true
        }
      })
      return result
    },
    onLogin (e) {
      console.log('Login clicked')
      this.invalidInput = []
      if (this.checkInvalidInput(['username', 'password'])) {
        return
      }
      const payload = {
        ref: this,
        user: {
          username: this.username,
          password: this.password
        }
      }
      console.log(this.username + ' ' + this.password)
      var loginProgress = setInterval(() => {
        if (this.loginProgress < 100) {
          this.loginProgress += 15
        } else {
          clearInterval(loginProgress)
          this.login(payload)
        }
      }, 100)
    },
    loginSuccess (message) {
      bus.$emit('showAlert', message)
      this.$router.go(-1)
    },
    loginFail (message) {
      this.loginProgress = 0
      bus.$emit('showAlert', message)
    }
  },
  created () {
    // From main.js auth
    const errorMessage = this.$route.params.errorMessage
    if (errorMessage) {
      this.errorMessage = errorMessage
    }
    window.document.title = 'Login - MCute'
    console.log(this.errorMessage)
  }
}
</script>
<style>
</style>
