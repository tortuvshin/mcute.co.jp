<template>	
	<div>
		<div class="container">
			<component :is="currentUser.type"></component>
			<md-speed-dial md-mode="scale" class="md-fab-bottom-right">
			  <md-button class="md-fab" md-fab-trigger @click.native="reloadData()" :disabled="loadingData">
			  <!-- :disabled="loadingData" -->
			    <md-icon>refresh</md-icon>
			  </md-button>
			</md-speed-dial>
		</div>
	</div>
</template>

<script>
	import freelancer from '../../components/dashboard/project/freelancer/Freelancer.vue'
	import employer from '../../components/dashboard/project/employer/Employer.vue'
	import { bus } from '../../main.js'

	export default {
		data(){
			return {
				loadingData: false
			}
		},
		computed: {
			currentUser(){
				return this.$store.state.user.currentUser;
			}
		},
		methods: {
			reloadData(){
				bus.$emit('updateProject');
			}
		},
		created(){
			bus.$on('setRefreshButtonStatus', (status) => {
				this.loadingData = status;
			});
		},
		components: {
			freelancer,
			employer
		}
	}
</script>

<style scoped>
.container {
	padding: 30px 50px;
	width: 100%;
	height: 100%;
}
</style>