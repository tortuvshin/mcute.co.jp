<template>
	<div class="main-content">
	    <app-header>
	        <h2 slot="Title">Change Password</h2>
	        <small slot="Description">You can update your password here.</small>
	    </app-header>
	    <form @submit.prevent="changePassword">
		        <!-- First Name -->
	        <div class="form-group has-feedback div-content">
	        	<div class="row">
	        		<div class="col-md-4">
		                <label class="control-label" for="current_password">Current Password:</label>
		                <p>Enter Current Password</p>
		            </div>
		            <div class="col-sm-8">
		                <input type="password" class="form-control input-lg" placeholder="Enter Current Password" v-model="currentPassword" required>
		            </div>
	        	</div>
	        </div>
	        <hr>
	        <!-- Last Name -->
	        <div class="form-group has-feedback div-content">
	        	<div class="row">
	        		<div class="col-md-4">
		                <label class="control-label" for="new_password">New Password:</label>
		                <p>Enter New Password</p>
		            </div>
		            <div class="col-sm-8">
		                <input type="password" class="form-control input-lg" placeholder="Enter New Password" v-model="newPassword" required>
		                <div class='error_message' v-show="!error.isSafe">
		                  <small>The password length must be longer than 8.</small>
		                </div>
		            </div>
	        	</div>
	        </div>
	        <hr>
	        <!-- Country -->
	        <div class="form-group has-feedback div-content">
	        	<div class="row">
	        		<div class="col-md-4">
		                <label class="control-label" for="confirm_password">Confirm New Password:</label>
		                <p>Enter New Password Again</p>
		            </div>
		            <div class="col-sm-8">
		                <input type="password" class="form-control input-lg" name="current_password" id="confirm" placeholder="Enter New Password Again" v-model="repeatPassword" required>
		                <i v-show="!error.isSame" class='fa fa-exclamation-triangle form-control-feedback error-icon'></i>
		                <div class='error_message' v-show="!error.isSame">
		                  <small>The password is not same.</small>
		                </div>
		            </div>
	        	</div>
	        </div>
	        <hr>
	        <div class="form-group has-feedback div-content">
	        	<div class="row">
	        		<div class="col-sm-offset-4 col-sm-8">
		            	<button type="submit" class="btn btn-primary btn-lg btn-change-password">Change Password</button>  
		            </div>
	        	</div>
	        </div>
        </form>
	</div>
</template>

<script>
	import { API_SERVER } from '../../api.js'
	import { bus } from '../../main.js'
	import appHeader from '../../components/dashboard/Heading.vue'
	export default {
		data(){
			return {
				currentPassword: '',
				newPassword: '',
				repeatPassword: '',
				error: {
					isSame: true,
					isSafe: true
				}
				
			}
		},
		watch: {
			newPassword(val){
				this.validatePasswordLength(val);
				this.validatePasswordIsSame(val);
			},
			repeatPassword(val){
				this.validatePasswordIsSame(val);
			}
		},
		methods: {
			onReset(){
				this.currentPassword = '';
				this.newPassword = '';
				this.repeatPassword = '';
			},
			changePassword(){
				if (this.error.isSame && this.error.isSafe){
					this.$http.put(API_SERVER + '/dashboard/security', 
						{
							currentPassword: this.currentPassword, 
							newPassword: this.newPassword, 
							repeatPassword: this.repeatPassword
						}).then(response=> {
							bus.$emit('showAlert', response.body);
							this.onReset();
					}, response=> {
						bus.$emit('showAlert', response.body);
					});
				}
			},
			validatePasswordIsSame(val){
				if (val !== this.repeatPassword || val !== this.newPassword){
					return this.error.isSame = false;
				}
				this.error.isSame = true;
			},
			validatePasswordLength(val){
				if (val.length <= 8){
					return this.error.isSafe = false;
				}
				this.error.isSafe = true	
			}
		},
		components: {
			appHeader
		}
	}
</script>

<style scoped>
.btn-change-password{
	margin-bottom: 15px;
}

.main-content{
    padding: 0;
    padding-bottom: 5px;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}

.div-content {
    padding:0px 25px;
}
</style>