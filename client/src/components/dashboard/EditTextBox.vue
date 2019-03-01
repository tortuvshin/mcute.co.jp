<template>
	<div class="form-group has-feedback div-content">
		<div class="row">
			<div class="col-xs-4">
	            <slot></slot>
	            <slot name="description"></slot>
	        </div>
	        <div class="col-xs-8">
	            <input type="text" class="form-control input-lg" :value="currentUser[target]" v-if="isEdit && target!='country'" @blur="onUpdated" @keyup.enter.prevent="onUpdated" v-focus>
	            <app-country-picker v-else-if="isEdit && target=='country'" :value="currentUser.country" @input="onUpdated"></app-country-picker>
	            <label class="field-label" v-else>{{currentUser[target]}}</label>
	            <i class="fa fa-pencil btn-edit" aria-hidden="true" @click="isEdit=true" v-if="!isEdit"></i>
	        </div>
		</div>
    </div>
</template>

<script>
	import appCountryPicker from '../common/CountryPicker.vue'
	import { API_SERVER } from '../../api.js'
	import { bus } from '../../main.js'

	export default {
		data(){
			return {
				isEdit: false
			}
		},
		props: ['target'],
		computed: {
			currentUser(){
				return Object.assign({}, this.$store.state.user.currentUser);
			}
		},
		components: {
			appCountryPicker
		},
		methods: {
			onUpdated(e){
				var value = '';
				if (this.target === 'country'){
					value = e;
				} else {
					value = e.target.value;
				}
				this.isEdit = false;
				
				if (value === this.currentUser[this.target]){
					return;
				}

				var POST_DATA = {
					[this.target]: value
				};
				Vue.http.put(API_SERVER + '/dashboard/profile', POST_DATA).then(response => {
					 bus.$emit('showAlert', response.body);
					 this.$store.commit('setCurrentUser', response.body.updatedUser);
				});
			}
		}
	}
</script>

<style scoped>
input{
	margin-top: 8px;
}

.field-label{
	padding-top: 17px;
	font-weight: 400;
	font-size: 1.2em;
	font-family: Lato;
}

.control-label{
	font-weight: 600;
	font-size: 1.1em;
}

.btn-edit{
	padding-top: 20px;
	float: right;
	cursor: pointer;
}
</style>