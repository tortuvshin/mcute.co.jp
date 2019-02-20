<template>
  <div class="container">
	<md-card class="login-wrapper">
	<md-progress class="md-warn" :md-progress="loginProgress" v-show="loginProgress !== 0"></md-progress>
	  <md-card-header>
	    <div class="md-title">Login</div>
	  </md-card-header>
	  <md-card-content>
	    <form class="form-horizontal" v-on:submit.prevent="onLogin">
	       	<transition name="fade">
		       	<div class="alert alert-danger" role="alert" v-if="errorMessage">
				  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				  <span class="sr-only">Error:</span>
				  {{errorMessage}}
				</div>
			</transition>
          <!-- Username -->
	          <md-input-container :class="{'md-input-invalid': isInvalidExist('username')}">
			    <label>Enter Username</label>
			    <md-input placeholder="Enter Username" v-model="username" required @change="invalidInput = []"></md-input>
			    <span class="md-error" v-if="isInvalidExist('username')">Invalid Username</span>
			  </md-input-container>
	          <!-- Password -->
	          <md-input-container md-has-password :class="{'md-input-invalid': isInvalidExist('password')}">
			    <label>Enter Password</label>
			    <md-input type="password" placeholder="Enter Password" v-model="password" required @change="invalidInput = []"></md-input>
			    <span class="md-error" v-if="isInvalidExist('password')">Invalid Password</span>
			  </md-input-container>
			  <router-link to="/register" exact>Don't Have an Account?</router-link>
       </form>
	  </md-card-content>
	  <md-card-actions>
	    <md-button @click.native="onLogin">Sign In</md-button>
	  </md-card-actions>
	</md-card>
  </div>
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
			window.document.title = "Login - EcJob.com";
			console.log(this.errorMessage);
		}
	}
</script>

<style scoped>
	.container{
	    width: 100%;
	    height: 100%;
	 }
	.login-wrapper{
		max-width: 400px;
		top: 50%;
    	left: 50%;
   		transform: translateX(-50%) translateY(-50%);
	}	
	label{
	    font-weight: 400!important;
	  }
</style>