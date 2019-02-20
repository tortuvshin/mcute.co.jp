<template>
  <div class="container">
      <md-card class="register-wrapper">
      <md-progress class="md-warn" :md-progress="registerProgress" v-show="registerProgress !== 0"></md-progress>
        <md-card-header>
          <div class="md-title">Sign Up</div>
        </md-card-header>
        <form @submit.stop.prevent="onRegister">
        <md-card-content>
          <div class="md-error" style="color:#f44336;font-size: 12px;" v-if="isInvalidExist('type')">You must select the user type</div>
          <div>
            <md-radio v-model="user.type" name="my-test-group1" md-value="freelancer"  @change="removeInvalidInput('type')">Freelancer</md-radio>
            <md-radio v-model="user.type" name="my-test-group1" md-value="employer" @change="removeInvalidInput('type')">Employer</md-radio>
          </div>
          <md-input-container :class="{'md-input-invalid': isInvalidExist('firstName')}">
            <label>Enter First Name</label>
            <md-input v-model="user.firstName" @change="removeInvalidInput('firstName')" required></md-input>
          </md-input-container>
          <md-input-container :class="{'md-input-invalid': isInvalidExist('lastName')}">
            <label>Enter Last Name</label>
            <md-input v-model="user.lastName" @change="removeInvalidInput('lastName')" required></md-input>
          </md-input-container>
          <md-input-container :class="{'md-input-invalid': isInvalidExist('country')}">
            <country-picker v-model="user.country" @change="removeInvalidInput('country')"></country-picker>
          </md-input-container>
          <md-input-container :class="{'md-input-invalid': isInvalidExist('email')}">
            <label>Enter Email</label>
            <md-input type="email" v-model="user.email" @change="removeInvalidInput('email')" required></md-input>
          </md-input-container>
          <md-input-container :class="{'md-input-invalid': isInvalidExist('username')}">
            <label>Enter Username</label>
            <md-input v-model="user.username" @change="removeInvalidInput('username')" required></md-input>
          </md-input-container>
          <md-input-container :class="{'md-input-invalid': isInvalidExist('password')　||　!passwordStrength}" md-has-password>
            <label>Enter Password</label>
            <md-input type="password" v-model="user.password" @change="removeInvalidInput('password')" required></md-input>
            <span class="md-error" v-if="!passwordStrength">Passwords must be at least 8 characters in length.</span>
          </md-input-container>
          <md-input-container :class="{'md-input-invalid': isInvalidExist('confirmPassword') || !passwordIsSame}" md-has-password>
            <label>Retype Password:</label>
            <md-input type="password" v-model="user.confirmPassword" @change="removeInvalidInput('confirmPassword')" required></md-input>
            <span class="md-error" v-if="!passwordIsSame">Password don't match.</span>
          </md-input-container>
          <router-link to="/login" exact>Already Have an Account?</router-link>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit">Sign Up</md-button>
        </md-card-actions>
        </form>
      </md-card>
    
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import countryPicker from '../components/common/CountryPicker.vue'
  import { API_SERVER } from '../api.js'
  import { bus } from '../main.js'

	export default {
    name: 'Register',
		data() {
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
				},
				invalidInput: [],
        registerProgress: 0,
        passwordIsSame: true,
        passwordStrength: true
			}
		},
    watch: {
      'user.password'(val){
        val.length < 8 ? this.passwordStrength = false : this.passwordStrength = true;
        val === this.user.confirmPassword ? this.passwordIsSame = true : this.passwordIsSame = false;
      },
      'user.confirmPassword'(val){
        val === this.user.password ? this.passwordIsSame = true : this.passwordIsSame = false;
      }
    },
    components: {
      countryPicker,
    },
		methods: {
      ...mapActions([
        'register'
      ]),
      isInvalidExist(fieldName){
        return this.invalidInput.indexOf(fieldName) !== -1;
      },
      checkInvalidInput(){
        Object.keys(this.user).forEach((fieldName) => {
          if (this.user[fieldName] === ''){
            this.invalidInput.push(fieldName);
          }
        });
      },
      removeInvalidInput(key){
        var index = this.invalidInput.indexOf(key);
        if (index > -1){
            this.invalidInput.splice(index, 1);
        }
      },
			onRegister(){
        this.checkInvalidInput();
        if (this.invalidInput.length === 0 && this.passwordIsSame && this.passwordStrength){
          var registerProgress = setInterval(()=> {
            if (this.registerProgress < 100){
              this.registerProgress += 15;
            }else {
              clearInterval(registerProgress);
              var payload = {
                ref: this,
                user: this.user
              }
              this.register(payload);
            }
          }, 100);
        }  
			},
      registerSuccess(message){
        bus.$emit('showAlert', message);
        this.$router.go(-1);
      }
		},
		created(){
			window.document.title = "Register - EcJob.com";
		}
	}
</script>

<style scoped>
  .register-wrapper{
    top: 8%;
    margin: 0 auto;
    max-width: 550px;
  }
  label{
    font-weight: 500!important;
  }
  .container{
    width: 100%;
    height: 100%;
  }
</style>