<template>
	<div class="wrapper">
		<div class="spinner" v-if="loadingData">
		 	<spinner></spinner>
		</div>
		<div v-if="!loadingData">
			<div class="project-title-wrapper">
				<h3>{{project.title}}</h3>
			</div>
			<div class="container">
			  	<div class="row">
			  		<div class="col-md-3">
			  			<md-whiteframe md-elevation="2">
				  			<div class="project-details-menu">
						   	<md-list>
							    <md-list-item href="#" @click.native="component = 'detail'":class="{active1: component === 'detail'}">
							      <md-icon>info</md-icon> <span>Project Infomation</span>
							    </md-list-item>

							    <md-list-item href="#" @click.native="component = 'rating'" :class="{active1: component === 'rating'}" v-if="project.internalStatus === 4">
							      <md-icon>rate_review</md-icon> <span>Rating</span>
							    </md-list-item>

							    <md-list-item href="#" @click.native="component = 'setting'"  v-if="project.employer._id === currentUser._id" :class="{active1: component === 'setting'}">
							      <md-icon>settings</md-icon> <span>Settings</span>
							    </md-list-item>
							 </md-list>
						 </div>
					 </md-whiteframe>
			  		</div>	
			  		<div class="col-md-9">
			  		 	<detail :project="project" v-if="component === 'detail'"></detail>
			  		 	<setting :project="project" v-if="component === 'setting'"></setting>
			  		 	<rating :project="project" v-if="component === 'rating'"></rating>
			  		</div>
		  		</div>
			</div> 
		</div>
		<select-freelancer-modal :isUpdate="true"></select-freelancer-modal>
		<md-speed-dial md-mode="scale" class="md-fab-bottom-right">
		  <md-button class="md-fab" @click.native="fetchData">
		    <md-icon>refresh</md-icon>
		  </md-button>
		</md-speed-dial>
	</div>
	
</template>

<script>
	import { API_SERVER } from '../../../api.js'
	import { bus } from '../../../main.js'
	import detail from '../../../components/dashboard/project/Details.vue'
	import setting from '../../../components/dashboard/project/Setting.vue'
	import rating from '../../../components/dashboard/project/Rating.vue'
	import selectFreelancerModal from '../../../components/dashboard/project/employer/SelectFreelancerModal.vue'

	export default {
		data(){
			return {
				project: null,
				loadingData: false,
				component: 'detail'
			}
		},
		computed: {
			currentUser() {
				return this.$store.state.user.currentUser;
			}
		},
		methods: {
			fetchData(){
				this.loadingData = true;
				this.$http.get(API_SERVER + '/project/' + this.$route.params.id).then(response=> {
					this.project = response.body.project;
					this.loadingData = false;
				});
			}
		},
		created(){
			this.loadingData = true;
			this.fetchData();
			bus.$on('updateProjectDetail', ()=> {
				this.fetchData();
			});
			if (location.hash){
				this.component = location.hash.substring(1);
			}
		},
		components: {
			detail,
			setting,
			rating,
			selectFreelancerModal
		}
	}
</script>

<style scoped>
.spinner{
	position: relative;
    margin: 0 auto;
    width: 100%;
    height: 100%;
}

.wrapper{
    width: 100%;
    height: 100%;
}

.container {
	padding: 40px 0px;
}

.project-title-wrapper {
	padding-left: 45px;
	padding-top: 10px;
	height: 80px;
	color: rgba(255,255,255,0.95);
	background: #2b5876; /* fallback for old browsers */
	background: -webkit-linear-gradient(to left, #2b5876 , #4e4376); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to left, #2b5876 , #4e4376); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	border-bottom: 1px solid #e1e4e8;
}

.menu {
	border: 1px solid #eee;
}

a {
	color: #0366d6;
	font-weight: 500;
}

h3 {
	font-size: 1.6em;
}

.list-group-item {
	padding: 12px 10px;
}

.active1 {
	border-left: 5px solid #e91e63;
}
</style>

<style>
.project-details-menu > ul > li > a, .project-details-menu > ul > li > a:hover, .project-details-menu > ul > li > a:active, .project-details-menu > ul > li > a:visited, .project-details-menu > ul > li > a:focus {
    text-decoration:none;
}
</style>