<template>
	<div id="my-info" class="main-content">
	    <app-header>
	        <h2 slot="Title">Personal Infomation</h2>
	        <small slot="Description">You can update the personl information here.</small>
	    </app-header>

        <div class="form-group has-feedback div-content">
        	<div class="row">
        		<div class="col-xs-4">
	                <label class="control-label" for="first_name">Avatar (optional):</label>
	                <p>Upload Avatar</p>
	            </div>
	            <div class="col-xs-8" style="width:0">
	                <div class="kv-avatar center-block" style="width:200px">
	                    <input id="avatar-1" name="avatar-1" type="file" class="file-loading">
	                </div>
	            </div>
        	</div>
        </div>
        <hr>
        <div class="form-group has-feedback div-content">
        	<div class="row">
        		<div class="col-xs-4">
	                <label class="control-label" for="first_name">User Type:</label>
	                <p>Your User Type</p>
	            </div>
	            <div class="col-xs-8">
	                <label class="field-label">{{ currentUser.type }}</label>
	            </div>
        	</div>
        </div>
        <hr>
        <!-- Username -->
        <div class="form-group has-feedback div-content">
        	<div class="row">
        		<div class="col-xs-4">
	                <label class="control-label" for="username">Username:</label>
	                <p>Your Username</p>
	            </div>
	            <div class="col-xs-8">
	                <label class="field-label">{{ currentUser.username }}</label>
	            </div>
        	</div>
        </div>
        <hr>
        <!-- First Name -->
        <app-edit-text-box target="firstName">
            <label class="control-label">First Name:</label>
            <p slot="description">Enter First Name</p>
        </app-edit-text-box>
        <hr>
        <!-- Last Name -->
        <app-edit-text-box target="lastName">
            <label class="control-label">Last Name:</label>
            <p slot="description">Enter Last Name</p>
        </app-edit-text-box>
        <hr>
        <!-- Country -->
        <app-edit-text-box target="country">
            <label class="control-label">Country:</label>
            <p slot="description">Select Country</p>
        </app-edit-text-box>
        <hr>
        <!-- Email -->
        <app-edit-text-box target="email">
            <label class="control-label">Email:</label>
            <p slot="description">Enter Email</p>
        </app-edit-text-box>
	</div>
</template>

<script>
	import appCountryPicker from '../../components/common/CountryPicker.vue'
	import appHeader from '../../components/dashboard/Heading.vue'
	import appEditTextBox from '../../components/dashboard/EditTextBox.vue'
	import { bus } from '../../main.js'

	import { API_SERVER } from '../../api.js'

	export default {
		computed: {
			currentUser(){
				return this.$store.state.user.currentUser;
			}
		},
		components: {
			appCountryPicker,
			appHeader,
			appEditTextBox,
			alert
		},
		created(){
			document.title = "Account - EcJob.com";
		}
	}
</script>

<style scoped>
.main-content{
    padding: 0;
    padding-bottom: 5px;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}

.div-content {
    padding:0px 25px;
}

.field-label{
	padding-top: 17px;
	font-weight: 500;
	font-size: 1.2em;
	font-family: Lato;
}

select{
	margin-top: 8px;
}

hr{
    width: 100%;
}

.control-label{
	font-weight: 600;
	font-size: 1.1em;
}

.kv-avatar .file-preview-frame,.kv-avatar .file-preview-frame:hover {
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    text-align: center;
    float: left;
}
.kv-avatar .file-input {
    display: table-cell;
    max-width: 220px;
}
</style>