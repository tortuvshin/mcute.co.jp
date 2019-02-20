<template>
	<div class="container">
    <div class="heading">
      <ol class="breadcrumb">
         <li><router-link to="/">Home</router-link></li>
         <li><router-link to="/support">Support Tickets</router-link></li>
         <li class="active">Report Service Issue</li>
       </ol>
    </div>

    <div class="panel">
        <div class="panel-header" @click="nextStep(1)">
          <div class="step-no" :class="{activePanel: ticket.serviceType}">1</div>
          <div class="step-title">Select Service Type</div>
        </div>
        <div class="panel-content" :class="{hidePanel: panel !== 'step1', showPanel: panel === 'step1'}">
            <div class="row">
                <div class="col-md-6">
                    <div class="box project" @click="setServiceType('project')">
                        <i class="fa fa-folder-o" aria-hidden="true"></i>
                        <h2>Project</h2>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="box billing" @click="setServiceType('billing')">
                        <i class="fa fa-usd" aria-hidden="true"></i>
                        <h2>Billing</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="panel">
        <div class="panel-header" @click="nextStep(2)">
           <div class="step-no" :class="{activePanel: ticket.relatedService !== -1}">2</div>
           <div class="step-title">Select Related Service</div>
        </div>
        <div class="panel-content" :class="{hidePanel: panel !== 'step2', showPanel: panel === 'step2'}">
            <div class="related-service" v-if="!loadingData">
              <select name="relatedservice" id="project" class="form-control input-lg" v-model="ticket.relatedService" v-if="ticket.serviceType === 'project'" @change="panel = 'step3'">
                  <option value="-1" disabled v-if="services.projects.length > 0 && currentUser.type === 'employer'">
                      Select the Project
                  </option>
                  <option v-for="project in services.projects" :value="project._id" v-if="currentUser.type === 'employer'">
                      {{ project.title }} ({{ project.status | capitalizeFirstLetter}})
                  </option>
                  <option value="-1" v-if="services.projects.length <= 0 || currentUser.type !== 'employer'" disabled>
                    None
                  </option>
                  
              </select>
        
              <select class="form-control input-lg" v-if="ticket.serviceType === 'billing'" v-model="ticket.relatedService" @change="panel = 'step3'">
                  <option value="-1" disabled v-if="getLength('bankDeposit') <= 0 && getLength('paypalDeposit') <= 0 && getLength('withdraws') <= 0">
                    None
                  </option>
                  <option value="-1" disabled v-if="getLength('bankDeposit') > 0 || getLength('paypalDeposit') > 0 || getLength('withdraws') > 0">
                    Select the transaction
                  </option>
                  <option disabled v-if="getLength('bankDeposit') > 0 || getLength('paypalDeposit') > 0 || getLength('withdraws') > 0">
                     ──────────────────────────────────────────────────
                  </option>
                  <option value="-2" disabled v-if="getLength('bankDeposit') > 0">
                    Bank Deposit
                  </option>
                  <option v-for="transaction in services.transaction.bankDeposit" :value="transaction._id" :class="[statusColor(transaction.status)]">
                    [{{transaction.depositTime | moment("DD/MM/YY HH:MM")}}] {{ transaction._id }} ({{transaction.status}})
                  </option>
                  <option value="-3" disabled v-if="getLength('paypalDeposit') > 0">
                    PayPal Deposit
                  </option>
                  <option v-for="transaction in services.transaction.paypalDeposit" :value="transaction._id" :class="[statusColor(transaction.status)]">
                    [{{transaction.orderTime | moment("DD/MM/YY HH:MM")}}] {{transaction.id}}  ({{transaction.status}})
                  </option>    
                  <option value="-4" disabled v-if="getLength('withdraws') > 0">
                    Withdraws
                  </option>
                  <option v-for="transaction in services.transaction.withdraws" :value="transaction._id" :class="[statusColor(transaction.status)]">
                    [{{transaction.createTime | moment("DD/MM/YY HH:MM")}}] {{transaction._id}}  ({{transaction.status}})
                  </option>   
              </select>
            </div>
        </div>
    </div>

    <div class="panel">
          <div class="panel-header" @click="nextStep(3)">
            <div class="step-no" :class="{activePanel: ticket.issueType}">3</div>
            <div class="step-title">Issue of the Service</div>
          </div>
          <div class="panel-content" :class="{hidePanel: panel !== 'step3', showPanel: panel === 'step3'}" v-if="ticket.serviceType === 'project'">
              <div class="issue-type">
                 <input type="radio" name="issue" value="Quantity issues" v-model="ticket.issueType"><span>Quantity issues</span>
              </div>
              <div class="issue-type">
                 <input type="radio" name="issue" value="No Delivery before deadline" v-model="ticket.issueType"><span>No Delivery before deadline</span>
              </div>
              <div class="issue-type">
                 <input type="radio" name="issue" value="The submission don't match the requirement" v-model="ticket.issueType"><span>The submission don't match the requirement</span>
              </div>
              <div class="issue-type">
                 <input type="radio" name="issue" value="Other" v-model="ticket.issueType"><span>Other</span>
              </div>
          </div>
          <div class="panel-content" :class="{hidePanel: panel !== 'step3', showPanel: panel === 'step3'}" v-if="ticket.serviceType === 'billing'">
              <div class="issue-type">
                 <input type="radio" name="issue" value="Did not receive money after payment had done" v-model="ticket.issueType"><span>Did not receive money after payment had done</span>
              </div>
              <div class="issue-type">
                 <input type="radio" name="issue" value="Withdraw/Deposit Problem" v-model="ticket.issueType"><span>Withdraw/Deposit Problem</span>
              </div>
              <div class="issue-type">
                 <input type="radio" name="issue" value="Other" v-model="ticket.issueType"><span>Other</span>
              </div>
          </div>
    </div>

    <div class="panel">
        <div class="panel-header" @click="nextStep(4)">
          <div class="step-no" :class="{activePanel: ticket.content}">4</div>
          <div class="step-title">Briefly describe the issue</div>
        </div>
        <div class="panel-content" :class="{hidePanel: panel !== 'step4', showPanel: panel === 'step4'}">
             <textarea class="form-control" rows="8" v-model="ticket.message"></textarea><br>
             <div class="row form-group">
                <div class="col-sm-12">
                    <label for="inputAttachments">Attachments</label>
                </div>
                <div class="col-sm-9">
                    <input type="file" class="form-control" accept=".jpg, .gif, .jpeg, .png, .zip, .pdf, .rar, .txt" v-for="index in fileQuantity" @change="addFile" :index="index">
                </div>
                <div class="col-sm-3">
                    <button type="button" class="btn btn-default btn-block btn-addFile" @click="fileQuantity++">
                        <i class="fa fa-plus"></i> Add More
                    </button>
                </div>
                <div class="col-xs-12 ticket-attachments-message text-muted">
                    Allowed File Extensions: .jpg, .gif, .jpeg, .png, .zip, .pdf, .rar, .txt
                </div>
            </div>
        </div>
    </div>

    <div class="text-right">
        <md-button class="md-raised md-primary btn-submit" type="submit" @click.native="createTicket()" :disabled="!canSubmit">Submit</md-button>
    </div>
  </div>
</template>

<script>
  import { accordion, panel }  from 'vue-strap'
	import { API_SERVER } from '../../api.js'
	import { mapGetters } from 'vuex'
	import { bus } from '../../main.js'
	import { VueEditor } from 'vue2-editor'

	export default {
		data(){
			return {
				ticket: {
					message: '',
					relatedService: -1,
					attachments: [],
          issueType: '',
          serviceType: ''
				},
				services: {
					projects: [],
					transaction: []
				},
				loadingData: true,
				fileQuantity: 1,
        panel: 'step1'
			}
		},
    watch: {
      'ticket.issueType'(val){
        this.panel = 'step4';
      }
    },
		computed: {
      canSubmit(){
        if (this.ticket.message === '' || this.ticket.relatedService === -1 || this.ticket.issueType === '' || this.ticket.serviceType === ''){
          return false;
        }
        return true;
      },
			currentUser(){
        return this.$store.state.user.currentUser;
      },
			fullName(){
				return this.currentUser.firstName + ' ' + this.currentUser.lastName;
			}
		},
		methods: {
      nextStep(stepNo){
        switch(stepNo) {
          case 1: 
            this.panel = "step" + stepNo;
            break;
          case 2:
            if (!this.ticket.serviceType) {
              return;
            }
            this.panel = "step" + stepNo;
            break;
          case 3: 
            if (this.ticket.relatedService === -1) {
              return;
            }
            this.panel = "step" + stepNo;
            break;
          case 4:
            if (!this.ticket.issueType) {
              return;
            }
            this.panel = "step" + stepNo;
            break;
        }
      },
      setServiceType(type){
        this.ticket.serviceType = type;
        this.ticket.relatedService = -1;
        this.ticket.issueType = '';
        this.nextStep(2);
      },
			getLength(serviceType){
				return this.services.transaction[serviceType].length;
			},
			addFile(e){ 
				this.ticket.attachments[e.target.attributes.index.value] = null;
				this.ticket.attachments[e.target.attributes.index.value] = e.target.files[0];
			},
      statusColor(status){
        if (status === 'Waiting for approval' || status === 'Waiting for paid'){
          return 'status-pending';
        } else if (status === 'Approved' || status === 'Success') {
          return 'status-success';
        } else if (status === 'Canceled'){
          return 'status-failed';
        }
      },
			createTicket(){
				var formData = new FormData();
    			formData.append('ticket', JSON.stringify(this.ticket));

    			this.ticket.attachments.forEach((attachments, index)=> {
    				formData.append('attachments' + index, attachments);
    			});
          
				this.$http.post(API_SERVER + '/support/create', formData).then(response=> {
					bus.$emit('showAlert', response.body);
					this.$router.replace({ name: 'ViewTicket', params: { id: response.body.ticketId }});
				});
			},
			relatedServiceChanged(e) {
				this.ticket.relatedService = e.target.value;
			}
		},
		components: {
			VueEditor,
      accordion,
      panel 
		},
		created(){
      document.title = 'Create a ticket - EcJob.com';
      bus.$emit('updateToolbar', 'Report Service Issue');
			this.$http.get(API_SERVER + '/support/create').then(response=>{
				this.services.projects = response.body.projects;
				this.services.transaction = response.body.transaction;
				this.loadingData = false;
			});
		}
	}
</script>

<style scoped>
.btn-submit{
  padding:5px 15px;
  font-size: 1.1em;
  letter-spacing: 2px;
}
.status-pending, .status-success, .status-failed {
  font-weight: 500;
}

.status-pending {
  color: #f0ad4e;
}

.status-success {
  color: #5cb85c;
}

.status-failed {
  color: #d9534f;
}

.container {
  width: 100%!important;
  padding: 20px 55px;
}

.main-content {
    padding: 0;
    padding-bottom: 30px;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    padding: 20px;
}

.no-padding{
    padding: 0;
}

input[type='file'].form-control {
    height: inherit;
    margin-bottom: 5px;
}
.btn-addFile{
    height: 39px;
}

.project {
    color: dimgray;
     background-color: #e5e5e5; /* fallback for old browsers */
}

.billing {
    color: #fff;
    background-color: gray;  /* fallback for old browsers */
}

.box {
  cursor: pointer;
  text-align: center;
  padding-top: 120px;
  position: relative;
  display: inline-block;
  width: 100%;
  height: 400px;
  background-repeat: no-repeat;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.box > h2 {
    font-size: 37px;
    /*text-shadow: 0 2px 3px rgba(0,0,0,5);*/
}

.box::after {
  content: "";
  border-radius: 5px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.box:hover {
  -webkit-transform: scale(1.05, 1.05);
  transform: scale(1.05, 1.05);
}

.box:hover::after {
    opacity: 1;
}

.box i {
  font-size: 8em;
}

.heading h2 {
  display: inline-block;
  vertical-align: middle;
  color: #000;
}

.panel{
  border: 1px solid rgba(0,0,0,0.15);
}

.panel-header {
  border-bottom: 1px solid rgba(0,0,0,0.15);
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
}

.panel-content {
  padding: 20px;
  height: 100%;
}

.hidePanel {
    overflow: hidden;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
    transition-duration: 0.2s;
}

.showPanel {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
    max-height: 1000px;
    overflow: hidden;
}

.issue-type{
  padding: 8px 0;
}

.issue-type span{
  margin-left: 15px;
  font-size: 1.4em;
}

.step-no{
  padding: 13px;
  text-align: center;
  display: inline-block;
  border-right: 1px solid rgba(0,0,0,0.15);
  width: 50px;
  height: 50px;
}

.step-title{
  display: inline-block;
  margin-left: 10px;
}

.activePanel {
  border-left: 5px solid #5cb85c;
}


.btn-submit:hover{
  background-color: #4b8fc9;
  transition: 0.5s;

}
</style>