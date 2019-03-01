<template>
    <section class="section section-shaped section-lg my-0" id="particles-js">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral">
                                    <img slot="icon" src="../assets/images/icons/common/github.svg">
                                    Github
                                </base-button>

                                <base-button type="neutral">
                                    <img slot="icon" src="../assets/images/icons/common/google.svg">
                                    Google
                                </base-button>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Or sign in with credentials</small>
                            </div>
                            <form role="form" v-on:submit.prevent="onLogin">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Username"
                                            v-model="username"
                                            required @change="invalidInput = []"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model="password"
                                            required @change="invalidInput = []"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-checkbox>
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" v-on:click="onLogin">Sign In</base-button>
                                </div>
                                {{ loading }}
                                {{errorMessage}}
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>Forgot password?</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="/register" class="text-light">
                                <small>Create new account</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Vue from 'vuex'
	import { bus } from '../main.js'
	import { API_SERVER } from '../api.js'
	import { mapActions } from 'vuex'

	export default {
		name: 'Login',
		data() {
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
			isInvalidExist(fieldName){
				return this.invalidInput.indexOf(fieldName) !== -1;
			},
			checkInvalidInput(fieldNames){
				var result = false;
				fieldNames.forEach((fieldName) => {
					if (this[fieldName] === ''){
						this.invalidInput.push(fieldName);
						result = true;
					}
				});
				return result;
			},
			onLogin(e){
				this.invalidInput = [];
				if (this.checkInvalidInput(['username', 'password'])){
					return;
				}
				const payload = {
					ref: this,
					user: {
						username: this.username, 
						password: this.password
					}
				}
				var loginProgress = setInterval(()=> {
					if (this.loginProgress < 100){
						this.loginProgress += 15;
					}else {
						clearInterval(loginProgress);
						this.login(payload);
					}
				}, 100);
			},
			loginSuccess(message){
					bus.$emit('showAlert', message);
					this.$router.go(-1);
			},
			loginFail(message){
					this.loginProgress = 0;
					bus.$emit('showAlert', message);
			}
		},
		created(){
			// From main.js auth
			const errorMessage = this.$route.params.errorMessage;
			if (errorMessage){
				this.errorMessage = errorMessage;
			}
			window.document.title = "Login - WorkFlow";
			console.log(this.errorMessage);
		}
	}
</script>
<style>
</style>
