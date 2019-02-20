<template>
	<div class="container">
		<div class="loader" v-if="loadingData">
  		 	<scale-loader :loading="loadingData" color="#77c0cf" height="30px"></scale-loader>
  		</div>
  		<div class="row" v-else>
			<div class="col-md-12">
			<h2>Rating for this project</h2>
				<div class="project-row">
					<table>
						<thead>
							<tr>
								<th>Project</th>
								<th class="text-center">Last Submission Date</th>
							</tr>
						</thead>
						<tbody>	
							<tr>
								<td class="title"><router-link :to="projectUrl">{{project.title}}</router-link></td>
								<td class="submission-date text-center">{{project.submissions[project.submissions.length - 1].submitDate | moment("YYYY-MM-DD")}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="col-md-12">
				<div class="row">
					<div class="col-md-4">
						<profile-card :user="rateTarget" style="margin-top:0;"></profile-card>
					</div>
					<div class="col-md-8" v-if="!isRate">
						<div class="form-group">
							
						</div>
						<div class="form-group text-right">
							<button class="btn btn-primary" @click="rate">Rate</button>
						</div>
					</div>
					<div class="col-md-8" v-else>
						<div class="rate-wrapper text-center">
							<p class="rated-message">Thank You for your rating, you can't rate again!</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import StarRating from 'vue-star-rating'
	import { API_SERVER } from '../../../api.js'
	import { bus } from '../../../main.js'
	import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
	import profileCard from '../../../components/common/ProfileCard.vue'
	
	export default {
		data() {
			return {
				project: null,
				loadingData: true,
				rateContent: '',
				rateStar: 0,
				rates: ['freelancerRate', 'employerRate']
			}
		},
		computed: {
			currentUser(){
				return this.$store.state.user.currentUser;
			},
			projectUrl(){
				return '/project/' + this.project._id;
			},
			rateTarget() {
				if (this.currentUser._id === this.project.employer._id){
					return this.project.winBid.bidder;
				}
				return this.project.employer;
			},
			isRate(){
				if (this.currentUser.type === 'freelancer'){
					console.log("hi");
					if (this.project.freelancerRate){
						return true;
					}
				}else if (this.currentUser.type === 'employer'){
					if (this.project.employerRate){
						return true;
					}
				}
				return false;
			}
		},
		methods: {
			rate() {
				this.$http.post(API_SERVER + '/project/' + this.project._id + '/rating', {rateStar: this.rateStar, rateContent: this.rateContent}).then(response=>{
					bus.$emit('setAlert', response.body);
					this.$router.replace('/dashboard/project/' + this.project._id + '/details#projectRating');
				});
			},
			fetchData() {
				this.$http.get(API_SERVER + '/project/' + this.$route.params.id).then(response=> {
					this.project = response.body.project;
					this.loadingData = false;
				});
			}
		},
		components: {
			profileCard,
			StarRating,
			ScaleLoader
		},
		created() {
			this.fetchData();
			document.title = "Rating - EcJob.com"
		}	
	}
</script>

<style scoped>
.container {
	margin-top: 100px;
}
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.rated-message{
	font-size: 1.2em;
	margin-top: 160px;
}

.starbar {
	margin-bottom: 30px;
}

.main-content {
	background-color: white; 
	box-shadow: 0 0 5px rgba(0,0,0,0.25);
}

.rate-wrapper .header{
	font-size: 1.2em;
}

.rate-wrapper {
	box-shadow: 0 0 5px rgba(0,0,0,0.2); 
	background-color: white;
	padding: 20px;
	height: 415px;
}

td {
	vertical-align: middle!important;
	background-color: #fff;
}
thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
}
thead > tr {
    background: #4D525B;
    border-color: #4D525B;
    border-radius: none;
    font-size: 12px;
    font-size: .75rem;
    line-height: 1.33;
    text-transform: uppercase;
    text-align: left;
    color: #F7F7F7;
}

thead > tr > th {
    padding: 18px 20px;
}

table {
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    width: 100%;
    margin-top: 30px;
    margin-bottom: 50px;
}

tr {
    border-bottom: 1px solid #eee;
}

td {
    vertical-align: middle!important;
    background-color: #fff;
}

.title{
    padding: 15px 25px !important;
    margin-top: 5px;
    font-size: 1.2em;
    font-weight: 700;
}

.title a{
    color: #337ab7;
    transition: 0.3s;
}

.title a:hover{
    color: #0077ea;
    transition: 0.3s;
}

.submission-date{
    font-family: Lato;
}
</style>