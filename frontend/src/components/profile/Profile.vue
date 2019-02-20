<template>
	<div>
		<div class="row">
			<div class="col-xs-12" style="height: 200px" v-if="loadingData">
				<spinner></spinner>
			</div>
			
			<div v-if="!loadingData">
				<div class="col-xs-3 test">
					<div class="profile-pic-wrapper thumbnail">
						<img width="230px" :src="avatarUrl(user)">
				        <div class="caption">
				          <h3>{{ fullName }}</h3>
				          <div style="margin: 10px 0;">
				          	<i class="flag-icon" :class="[flagIcon]"></i>
				          </div>
				          <div style="margin: 10px 0;">
						  	<span style="font-family: none;"> Member Since&nbsp;{{ user.signUpDate | moment("DD-MMMM-YYYY") }}</span>
						  </div>
						  <app-star-bar :rate="user.rating" style="display: block;"></app-star-bar>
						  <div class="qrcode-wrapper" v-if="currentUser._id !== user._id">
							  <md-menu md-size="4" md-direction="top right" ref="menu" md-offset-x="80">
			                    <md-button class="md-raised md-primary" md-menu-trigger>Contact Me</md-button>
			                      <md-menu-content>
			                        <div class="qrcode-card">
			                          <img :src="qrcode">
			                          <p>Scan on 'EC-Job' Chat App</p>
			                        </div>
			                      </md-menu-content>
			                    </md-menu>  
		                    </div>
				        </div>
					</div>
				</div>
				<div class="col-xs-9 about-description">
					<div class="row" style="width: 100%;">
						<div class="col-xs-10">
							<vue-editor v-model="user.profile" v-if="editProfile" ></vue-editor>
							<p v-if="!editProfile" v-html="user.profile"></p>
						</div>
						<div class="col-xs-2">
							<md-button class="md-raised md-primary" @click.native="editProfile = true" v-if="isProfileOwner && !editProfile">Edit Profile</md-button>
							<md-button class="md-raised md-accent" @click.native="updateProfile" v-if="isProfileOwner && editProfile">Confirm</md-button>
						</div>
					</div>		
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
	import appStarBar from '../../components/user/StarBar.vue'
	import { bus } from '../../main.js'
	import { API_SERVER } from '../../api.js'
	import { VueEditor } from 'vue2-editor'
	
	export default {
		props: ['username'],
		data(){
			return {
				user: null,
				loadingData: true,
				editProfile: false
			}
		},
		computed: {
			currentUser(){
				return this.$store.state.user.currentUser;
			},
			isProfileOwner(){
				if (!this.currentUser){
					return null;
				}
				return this.currentUser.username === this.username; 				
			},
			fullName(){
				return this.user.firstName + ' ' + this.user.lastName;
			},
			flagIcon(){
				return 'flag-icon-' + this.user.country.toLowerCase();
			},
			qrcode() {
                var qrcontent = {
                    _id: this.user._id,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName
                }
                return "http://chart.apis.google.com/chart?cht=qr&chl="+ JSON.stringify(qrcontent) +"&chs=250x250"
            }
		},
		created(){
			document.title = "My Profile - EcJob.com"
			this.$http.get(API_SERVER + '/profile/' + this.username).then(response=> {
				this.loadingData = false;
				this.user = response.body.user;
				if (!this.user.profile){
					this.user.profile = "The user hasn't write anything about him/her.";
				}
			});
		},
		methods: {
			handleUpdatedContent($event){
				this.updatedProfile = $event;
			},
			updateProfile($event){
				$event.target.disabled = true;
				this.$http.put(API_SERVER + '/profile/' + this.username, {updatedProfile: this.user.profile}).then(response => {
					this.editProfile = false;
					this.$store.commit("setCurrentUser", response.body.updatedUser);
					this.user = response.body.updatedUser;
					$event.target.disabled = false;
					bus.$emit("showAlert", response.body);
				});
			}
		},
		components: {
			ScaleLoader,
			appStarBar,
			VueEditor
		}
	}
</script>

<style scoped>
	.test{
		position: relative;
		top: -20px;
	    left: 20px;
	    display: inline-block;
	}

	.profile-pic-wrapper {
		position: relative;
		width: 100%;
	    z-index: 1;
	    display: inline-block;
	}

	.about-description{
		padding: 50px;
	}

	.btn-edit{
		width: 100%;
	}

	.caption{
		text-align: center;
	}

	.verification {
		font-size: 1.5em;
		margin: 20px 0;
		color: #75787d;
	}
	.qrcode-wrapper{
		margin-top: 15px;
	}
	.qrcode-card{
		text-align: center;
	}
</style>