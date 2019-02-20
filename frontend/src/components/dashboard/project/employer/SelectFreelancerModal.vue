<template>
	<md-dialog ref="selectFreelancerDialog" @open="reset()">
	  <md-dialog-title v-if="step === 1">Select Freelancer</md-dialog-title>
	  <md-dialog-title v-if="step === 2">Choose Deadline</md-dialog-title>
	  <md-dialog-title v-if="step === 3">Confimation</md-dialog-title>

	  <md-dialog-content v-if="project">
	  	<div class="alert alert-danger" v-if="error.isError">
		  <strong><i class="fa fa-exclamation-circle fa-fw" aria-hidden="true"></i></strong> {{error.message}}
		</div>
		<span v-if="project.bids.length <= 0">No freelancer can be selected.</span>
  		<div v-for="(bid,index) in project.bids" v-if="step === 1 && project.bids.length > 0">
			 <bid-row :bid="bid" :project="project" :selectedBid="selectedBid" :selectMode="true">
			 	<td slot="selectRadio">
		            <md-radio v-model="selectedBid" id="bid" name="bid" :md-value="index"></md-radio>
		        </td>
			 </bid-row>
			 <hr>
	  	</div>
	  	<div v-if="step === 2">
	  		<label for="deadline">Submission Deadline</label>
	  		<input type="datetime-local" name="deadline" class="form-control input-lg" v-model="deadline" :min="todayDateTime()">
	  	</div>
	  	<div v-if="step === 3">
			 <p class="message">
			 	Are you sure select <strong>{{project.bids[selectedBid].bidder.firstName + " " + project.bids[selectedBid].bidder.lastName}} </strong>as the project freelancer and set deadline on <strong>{{ deadline | moment("DD/MM/YYYY hh:mm A")}}</strong>? 

			 	<br><br><strong>If yes</strong>, please press 'Confirm' button, the system will then return <strong>${{project.budgetMax - project.bids[selectedBid].bidPrice}}</strong> to your wallet instantly.
			 	<br><br><strong>If no</strong>, please press 'Back' button to re-select or leave.
			 </p>
	  	</div>
	  </md-dialog-content>

	  <md-dialog-actions v-if="project">
	    <md-button class="md-primary" @click.native="closeDialog()" v-if="step === 1">Cancel</md-button>
	    <md-button class="md-primary" @click.native="goStep(2)" v-if="step === 1 && project.bids.length > 0">Next</md-button>

	    <md-button class="md-primary" @click.native="goStep(1)" v-if="step === 2">Back</md-button>
	    <md-button class="md-primary" @click.native="goStep(3)" v-if="step === 2">Next</md-button>

	    <md-button class="md-primary" @click.native="goStep(2)" v-if="step === 3">Back</md-button>
	    <md-button class="md-primary" @click.native="confirm($event)" v-if="step === 3">Confirm</md-button>
	  </md-dialog-actions>
	</md-dialog>
</template>

<script>
	import bidRow from '../../../project/BidRow.vue'
	import { bus } from '../../.../../../../main'
	import { API_SERVER } from '../../.../../../../api'

	export default {
		props: ['isUpdate'],
		data(){
			return {
				project: null,
				selectedBid: '',
				deadline: '',
				step: 1,
				error: {
					isError: false,
					message: ''
				}
			}
		},
		computed: {
			httpMethod(){
				if (this.isUpdate === true){
					return 'put';
				}else {
					return 'post'
				}
			},
		},
		methods: {
			openDialog() {
				this.$nextTick(() => {
					this.$refs["selectFreelancerDialog"].open();
				});
		    },
			closeDialog(){
                this.$nextTick(() => {
					this.$refs["selectFreelancerDialog"].close();
				});
            },
            resetError(){
            	this.error.isError = false;
            	this.error.message = '';
            },
            goStep(stepNo){
            	if (stepNo === 3){
            		if (!this.deadline){
	        			this.error.isError = true;
	            		this.error.message = "Deadline is required to choose"
	            	} else if(new Date(this.deadline) <= new Date(this.todayDateTime())) {
	            		this.error.isError = true;
	            		this.error.message = "Deadline can't lower than current datetime";
	            	} else {
	            		this.resetError();
	            		this.step = 3;
	            	}
            	}
         		if (stepNo === 2){
	            	if (this.selectedBid === ''){
	            		this.error.isError = true;
	            		this.error.message = "Freelancer is required to select"
	            	} else {
	            		this.resetError();
	            		this.step = 2;
	            	}
           		} 
           		if (stepNo === 1){
           			this.step = 1;
           		}
            },
            reset(){
		 		this.deadline = '';
		 		this.selectedBid = '';
		 		this.step = 1;
		 		this.resetError();
            },
            confirm(e){
        		this.resetError();
        		e.target.disabled = true;
        		var updateFreelancer = new Promise((resolve, reject)=> {
        			this.$http[this.httpMethod](API_SERVER + '/project/' + this.project._id + '/freelancer', {bidId: this.project.bids[this.selectedBid]._id}).then(response=> {
	            		resolve({message: response.body.message, updatedUser: response.body.updatedUser});
	            	});
        		});
            	
        		var updateDeadline = new Promise((resolve, reject)=> {
        			this.$http.put(API_SERVER + '/project/' + this.project._id + '/deadline', {deadline: this.deadline}).then(response=> {
	            		resolve(response.body.message);
	            	});
        		});

        		Promise.all([updateFreelancer, updateDeadline]).then(values => { 
			 		this.$store.commit('setCurrentUser', values[0].updatedUser);
			 		this.closeDialog();
            		bus.$emit('showAlert', {message: values[0].message + "<br />" + values[1]});
            		bus.$emit('updateProject');
				});
            }
		},
		created(){
			console.log("isUpdate", this.isUpdate);
			bus.$on("showSelectFreelancerModal", (project) => {
				this.openDialog();
				this.project = project;
			});
		},
		components: {
			bidRow
		}
	}
</script>

<style scoped>
.selectRow{
	cursor: pointer;
}

.btn-confirm{
	width: 100%;
	border-radius: 0 0 4px 4px;
	padding: 12px;
}
.modal-footer{
	padding: 0;
}

.message{
	font-family: Lato;
	font-size: 1.1em;
}
</style>