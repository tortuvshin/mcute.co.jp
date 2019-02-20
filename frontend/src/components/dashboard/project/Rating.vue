<template>
	<div>
		<div class="box-group">
			<md-card>
			    <md-toolbar md-theme="white" class="md-dense">
			       <h3 class="md-title">Rating from Employer </h3>
			    </md-toolbar>
				<md-table v-once>
				  <md-table-body>
				    <tr v-if="project.employerRate" style="border-top: 1px solid #eee;">
				      <td style="width: 35%; border-right: 1px solid #ddd;">
				      	<profile-card :user="project.employerRate.rater" :showTitle="showTitle" style="box-shadow: 0 0 0; margin-top:0;"></profile-card> 
				      </td>
				      <td valign="top" style="padding: 15px;">
			      		<p class="rate-content">{{ project.employerRate.rateContent }}</p>
			  	   		<div class="star-bar-wrapper">
			  	   			<span>{{project.employerRate.rateStar}}</span>
		  	   	   			<star-rating :rating="project.employerRate.rateStar" :star-size="20" :read-only="true" :show-rating="false" class="star-bar"></star-rating>
			  	   		</div>
				      </td>
				    </tr>
				    <md-table-row v-else>
				      <md-table-cell v-if="currentUser._id === project.employer._id"> 
				      	<div class="rate-wrapper">
							<div class="starbar">
								<label class="header">Rating Star: </label>
								<div class="quality-starbar">
									<star-rating :increment="0.5"  
									             :star-size="30"
									             :show-rating="false"
									             @rating-selected="rateStar = $event">
									</star-rating>
								</div>
							</div>
							
							<div class="comment">
								<label class="header">Comment:</label>
								<textarea v-model="rateContent" class="form-control" rows="10"></textarea>
							</div>

							<div style="text-align: right;">
								<md-button class="md-raised md-primary btn-submit" @click.native="rate">Submit</md-button>
							</div>
						</div>
					   </md-table-cell>
					   <md-table-cell v-else>
				  			The employer hasn't rate yet.
				  	   </md-table-cell>
				  	</md-table-row>
				  </md-table-body>
				</md-table>
			</md-card>
	  	</div>

	  	<md-card>
		    <md-toolbar md-theme="white" class="md-dense">
		       <h3 class="md-title">Rating from Freelancer</h3>
		    </md-toolbar>
			<md-table v-once>
			  <md-table-body>
			    <md-table-row v-if="project.freelancerRate" style="border-top: 1px solid #eee;">
		  			<td style="width: 35%; border-right: 1px solid #ddd;">
		  				<profile-card :user="project.freelancerRate.rater" :showTitle="showTitle" style="box-shadow: 0 0 0; margin-top:0;"></profile-card>
		  			</td>
		  			<td valign="top" style="padding: 15px;">
			  	   		<p class="rate-content">{{ project.freelancerRate.rateContent }}</p>
			  	   		<div class="star-bar-wrapper">
			  	   			<span>{{project.freelancerRate.rateStar}}</span>
		  	   	   			<star-rating :rating="project.freelancerRate.rateStar" :star-size="20" :read-only="true" :show-rating="false" class="star-bar"></star-rating>
			  	   		</div>
		  			</td>
			  	</md-table-row>
			  	<md-table-row v-else>
				      <md-table-cell v-if="currentUser._id === project.winBid.bidder._id"> 
				      	<div class="rate-wrapper">
							<div class="starbar">
								<label class="header">Rating Star: </label>
								<div class="quality-starbar">
									<star-rating :increment="0.5"  
									             :star-size="30"
									             :show-rating="false"
									             @rating-selected="rateStar = $event">
									</star-rating>
								</div>
							</div>
							
							<div class="comment">
								<label class="header">Comment:</label>
								<textarea v-model="rateContent" class="form-control" rows="10"></textarea>
							</div>

							<div style="text-align: right;">
								<md-button class="md-raised md-primary btn-submit" @click.native="rate">Submit</md-button>
							</div>
						</div>
					   </md-table-cell>
					   <md-table-cell v-else>
				  			The freelancer hasn't rate yet.
				  	   </md-table-cell>
				  	</md-table-row>
			  </md-table-body>
			</md-table>
		</md-card>
	</div>
</template>

<script>
	import StarRating from 'vue-star-rating'
	import profileCard from '../../common/ProfileCard.vue'
	import { bus } from '../../../main.js'
	import { API_SERVER } from '../../../api.js'

	export default {
		props: ['project'],
		data() {
			return {
				showTitle: false,
				rateStar: 0,
				rateContent: ''
			}
		},
		computed: {
			currentUser(){
				return this.$store.state.user.currentUser;
			}
		},
		methods: {
			rate() {
				this.$http.post(API_SERVER + '/project/' + this.project._id + '/rating', {rateStar: this.rateStar, rateContent: this.rateContent}).then(response=>{
					bus.$emit('showAlert', response.body);
					bus.$emit('updateProjectDetail');
				});
			}
		},
		created(){
			document.title = "Rating - EcJob.com"
		},
		components: {
			profileCard,
			StarRating
		}
	}
</script>

<style scoped>
h4 {
	padding-left: 15px;
}

.btn-submit{
	width: 90px !important;
	margin-right: 5px!important;
}

.comment{
	margin-top: 30px;
	margin-bottom: 10px;
}

.rate-wrapper{
	width: 100%;
	padding: 15px 5px;
}

.header{
	font-size: 1.3em;
}

.star-bar-wrapper span{
	border: 1px solid #eee;
	border-radius: 3px;
	padding: 3px 5px;
}

.star-bar-wrapper{
	margin-top: 105px;
	float: right;
	font-family: Lato;
}

.star-bar {
	display: inline-block!important;
}

.rate-content{
	padding: 20px 15px;
}

.rater-wrapper{
	width: 350px;
	padding: 0!important;
}

.box-group{
	margin-bottom: 30px;
}
</style>