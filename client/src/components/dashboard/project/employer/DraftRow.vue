<template>
	<tr>
		<td class="project-main">
            <div class="title">
                <router-link :to="projectUrl">{{project.title}}</router-link>
            </div>
        </td>
        <td class="project-countdown text-center">
            <app-count-down :deadline="project.endDate"></app-count-down>
        </td>
        <td class="text-center">
        	<div class="dropdown">
			  	<md-menu md-align-trigger>
				  <md-button md-menu-trigger md-theme="button" class="md-raised md-primary">Actions</md-button>
				  <md-menu-content>
				    <md-menu-item @click.native="publish">Publish</md-menu-item>
				    <md-menu-item @click.native="edit">Edit</md-menu-item>
				  </md-menu-content>
				</md-menu>
			</div>
        </td> 
	</tr>
</template>

<script>
	import { API_SERVER } from '../../../../api.js'
	import appCountDown from '../../../project/common/Countdown.vue'
	import { bus } from '../../../../main.js'

	export default {
		props: ['project'],
		computed: {
			projectUrl(){
				return '/project/' + this.project._id;
			}
		},
		methods: {
			publish(){
				if (new Date(this.project.endDate) < new Date()){
					return alert("The project bid endDate cannot smaller then today, please edit first.");
				}
				if (confirm('To publish this project, we will debit $' + this.project.budgetMax + ' from your wallet! Are you sure?')) {
					bus.$emit('updateProjectLoading', {status: 'open', loading: true});
					this.$http.put(API_SERVER + '/project/' + this.project._id + '/publish', {publish: true}).then(response=> {
						bus.$emit('showAlert', response.body);
						bus.$emit('updateProject');
						bus.$emit('updateProjectLoading', {status: 'open', loading: false});
						this.$store.commit('setCurrentUser', response.body.updatedUser);
					}, response=>{
						bus.$emit('showAlert', response.body);
					});	
				}	
			},
			edit(){
				this.$router.push({path: '/project/' + this.project._id + '/edit'});
			}
		},
		components: {
			appCountDown
		}
	}
</script>

<style scoped>
tr {
    border-bottom: 1px solid #eee;
}

td {
    vertical-align: middle!important;
    background-color: #fff;
}

.project-main{
    width: 60%;
    padding: 15px 25px !important;
}

.project-main .title{
    margin-top: 5px;
    font-size: 1.2em;
    font-weight: 700;
}

.project-main .title a{
    color: #337ab7;
    transition: 0.3s;
}

.project-main .title a:hover{
    color: #0077ea;
    transition: 0.3s;
}

.project-countdown{
    font-family: Lato;
}

.skills{
    color: #7d7d7d;
}

.skill-tag{
    background-color: #e0e0e0;
    color: black;
    padding: 5px 10px;
    border-radius: 4px;
    margin: 5px;
    font-size: 0.7em;
    font-weight: 500;
    display: inline-block;
}
</style>