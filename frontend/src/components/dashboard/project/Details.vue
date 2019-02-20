<template>
	<div>
		<div class="box-group">
			<md-card>
			    <md-toolbar md-theme="white" class="md-dense">
			       <h3 class="md-title">Job Infomation</h3>
			    </md-toolbar>
				<md-table v-once>
				  <md-table-body>
				    <md-table-row>
				      <md-table-cell class="tdClass">
				      	<span class="sub-title">Job Title</span> 
				      </md-table-cell>
				      <md-table-cell class="tdClass" colspan="2">
				      	{{project.title}}
				      </md-table-cell>
				    </md-table-row>
				    <md-table-row>
				      <md-table-cell v-if="currentUser.type === 'employer'" class="tdClass">
				      	<span class="sub-title">Freelancer</span> 
				      </md-table-cell>
				      <md-table-cell v-if="currentUser.type === 'employer'" class="tdClass">
				      	<a :href="profileUrl" target="_blank">{{fullName}} ({{project.winBid.bidder.username}})</a>
				      </md-table-cell>
			  		  <md-table-cell class="tdClass" v-if="currentUser.type === 'freelancer'">
			  		  	<span class="sub-title">Employer</span> 
			  		  </md-table-cell>
			  		  <md-table-cell class="tdClass" v-if="currentUser.type === 'freelancer'">
			  		  	{{fullNameOfEmployer}} #{{project.employer.username}}
			  		  </md-table-cell>
				    </md-table-row>
				    <md-table-row>
				      <md-table-cell class="tdClass">
			  		  	<span class="sub-title">Award Bid</span> 
			  		  </md-table-cell>
			  		  <md-table-cell class="tdClass">
			  			  <span class="bid-price">${{project.winBid.bidPrice}}</span>
			  		  </md-table-cell>
				    </md-table-row>
				    <md-table-row>
				    	<md-table-cell class="tdClass">
				    		<span class="sub-title">DeadLine</span> 
				    	</md-table-cell>
				    	<md-table-cell class="tdClass">
				    		<span class="deadline">{{project.chosenDate |  moment("DD/MM/YYYY hh:mm A") }}</span>
				    	</md-table-cell>
				    </md-table-row>
				    <md-table-row>
				    	<md-table-cell class="tdClass">
				    		<span class="sub-title">Status</span> 
				    	</md-table-cell>
				    	<md-table-cell class="tdClass">
				    		{{projectInternalState}}
				    	</md-table-cell>
				    </md-table-row>
				  </md-table-body>
				</md-table>
			</md-card>
	  	</div>
	  	<md-card>
		    <md-toolbar md-theme="white" class="md-dense">
		       <h3 class="md-title">Submissions</h3>
		    </md-toolbar>
			<md-table v-once>
			  <md-table-header>
			  	<md-table-row>
		  			<md-table-head>Submissions</md-table-head>
		  			<md-table-head>Status</md-table-head>
		  			<md-table-head v-if="currentUser._id === project.employer._id">Actions</md-table-head>		
			  	</md-table-row>
			  </md-table-header>
			  <md-table-body>
			    <md-table-row v-for="submission in project.submissions">
		  			<md-table-cell>
		  				<a :href="submissionFileUrl(submission._id,submission.file.filename)">{{submission.file.originalname}}</a>
		  			</md-table-cell>
		  			<md-table-cell>
		  				<span :class="[statusClass(submission.status)]" style="font-size: 1.1em;">
		  					<strong>{{submission.status | capitalizeFirstLetter}}</strong>
		  				</span>
		  			</md-table-cell>
		  			<md-table-cell v-if="currentUser._id === project.employer._id && project.internalStatus==3 && submission.status === 'waiting for approval'">
		  				<md-button class="md-raised md-primary" @click.native="setSubmission('approved', submission._id)" style="width: 50%;">Approve</md-button>
		  				<md-button class="md-raised md-accent" style="width: 50%;" @click.native="setSubmission('denied', submission._id)">Deny</md-button>
		  			</md-table-cell>
		  			<md-table-cell v-if="currentUser._id === project.employer._id && submission.status !== 'waiting for approval'">
		  			</md-table-cell>
			  	</md-table-row>
		  		<md-table-row v-if="project.submissions.length <= 0">
		  			<md-table-cell colspan="3" class="text-center no-result">No submission</md-table-cell>
			    </md-table-row>
			    <md-table-row  v-if="currentUser._id === project.winBid.bidder._id && project.internalStatus === 2">
				    <md-table-cell colspan="3" class="text-center">
				   		<div style="padding:10px;">
						  	<file-uploader @handleFileUploaded="submitWork($event)"></file-uploader>
						</div>
				    </md-table-cell>
			    	
			    </md-table-row>
			  </md-table-body>
			</md-table>
		</md-card>
  </div>
</template>

<script>
	import { API_SERVER } from '../../../api.js'
	import { bus } from '../../../main.js'
	import fileUploader from '../../common/FileUploader.vue'

	export default {
		props: ['project'],
		computed: {
			projectInternalState(){
				var InternalState = {
					1: "Waiting for select freelancer / deadline",
					2: "Waiting for submission",
					3: "Submitted",
					4: "Rating",
					5: "Finished"
				}
				return InternalState[this.project.internalStatus];
			},
			fullName(){
				if (!this.project.winBid){
					return "---";
				}
				return this.project.winBid.bidder.firstName + ' ' + this.project.winBid.bidder.lastName;
			},
			fullNameOfEmployer(){
				return this.project.employer.firstName + ' ' + this.project.employer.lastName;
			},
			currentUser(){
				return this.$store.state.user.currentUser;
			},
			profileUrl(){
				return "/profile/" + this.project.winBid.bidder.username;
			}
		},
		methods: {
			handleClose(){
                this.$emit("handleClose");
            },
            submitWork(event){
            	var formData = new FormData();
            	formData.append('file', event);
            	this.$http.post(API_SERVER + '/project/' + this.project._id + '/submission', formData).then(response=>{
            		bus.$emit('updateProjectDetail');
            		bus.$emit('showAlert', response.body);
            	});
            },
            submissionFileUrl(id,filename){
            	return API_SERVER + '/uploads/'+ this.project.employer.username +'/project/' + this.project._id + '/submissions/' + id + '/' + filename;
            },
            setSubmission(result, submissionId){
            	this.$http.put(API_SERVER + '/project/' + this.project._id + '/submission/' + submissionId, {result: result}).then(response=> {
            		bus.$emit('updateProjectDetail');
            		bus.$emit('showAlert', response.body);
            	});
            },
            statusClass(status){
				var statusClass = {
					'approved': 'status-approved',
					'pending': 'status-pending',
					'denied': 'status-denied'
				}
				return statusClass[status];
			}
		},
		created(){
			this.submissions = this.project.submissions;
			document.title = "Job Infomation - EcJob.com";
		},
		components: {
			fileUploader
		}
	}
</script>

<style scoped>
.tdClass{
	font-size: 15px;
	font-family: none;
}
.box-group{
	margin-bottom: 30px;
}

.bid-price, .deadline{
	font-family: Lato;
}

.no-result{
	font-size: 1.1em;
	font-weight: 400;
}

.table-heading{
	border-bottom: 1px #e1e4e8 solid;
	display: flex;
    padding-bottom: 8px;
    margin-bottom: 16px;
}

.table-title {
	font-size: 24px;
	margin: 0;
}

.status-approved{
	color: green;
}

.status-pending {
	color: #A9A9A9;
}

.status-denied {
	color: #a94442;
}


.sub-title {
	color: #586069;
	font-weight: 600;
}

.submissions-table > tbody td {
	vertical-align: middle!important;
	background-color: #fff;
	padding: 12px;
}

.submissions-table thead > tr, .project-details-table thead > tr {
    background-color: #f6f8fa;
    font-size: 14px;
    color: #000;
}

.submissions-table thead > tr > th, .project-details-table thead > tr > th {
    padding: 9px 12px 10px;
    line-height: 20px;
    font-weight: 600;
}	

.submission-wrapper{
	border: 1px dashed #000;
	padding: 15px;
}
</style>