<template>
	<md-card>
	    <md-toolbar md-theme="white" class="md-dense">
	       <h3 class="md-title">Setting</h3>
	    </md-toolbar>
	    <md-table>
		  <md-table-body>
		    <md-table-row>
		      <md-table-cell>
	      		<h4>Change freelancer</h4>
	  			<p>Once the freelancer submitted work, you can't change the freelancer.</p>
		      </md-table-cell>
		      <md-table-cell>
		      	<md-button class="md-raised md-accent" :disabled="project.submissions.length > 0" @click.native="showSelectFreelancerModal">Change</md-button>
		      </md-table-cell>
		    </md-table-row>
		  </md-table-body>
		</md-table>
	</md-card>
</template>

<script>
	import { bus } from '../../../main.js'

	export default {
		props: ['project'],
		methods: {
			showSelectFreelancerModal(){
				console.log("HI", this.project);;
				bus.$emit('showSelectFreelancerModal', this.project);
			}
		},
		created() {
			document.title = 'Setting - EcJob.com'
		}
	}
</script>

<style scoped>
.md-raised {
	width: 100px!important;
}
</style>