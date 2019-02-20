<template>
    <modal v-model="isShowModal" effect="zoom" width="400" @closed="handleClose">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title" v-if="isUpdate">Update Bid</h4>
        <h4 class="modal-title" v-else>Place Bid</h4>
      </div>
      <div slot="modal-body" class="modal-body">
        <div class="alert alert-danger messageBox" v-if="isError">
            {{errorMsg}}
        </div>
            <form @submit.prevent>
                <app-budget :budgetType="project.budgetType" :budgetMin="project.budgetMin" :budgetMax="project.budgetMax"></app-budget>
                <div class="form-group form-inline form-center place-bid-form">
                    <div class="row">
                        <div class="col-md-4">
                            <label class="control-label" for="title">Amount:</label>
                            <p>Enter Bid Amount</p>
                        </div>
                        <div class="col-md-8">
                            <div class="input-group">
                              <span class="input-group-addon">$</span>
                              <input class="form-control amount" type="number" v-if="project.budgetType === 'fixed'" v-model="amount" disabled>
                              <input class="form-control amount" type="number" v-model="amount" step="50" v-else>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button @click="onSubmit" class="btn btn-danger btn-submit" v-if="isUpdate">Update bid</button>
        <button @click="onSubmit" class="btn btn-primary btn-submit" v-else>Place a bid</button>
      </div>
    </modal>
</template>

<script>
	import modal from 'vue-strap/src/Modal.vue'
	import appBudget from './rightSide/Budget.vue'

	import { API_SERVER } from '../../api.js'
	import { bus } from '../../main.js'

	export default {
		data(){
			return {
				amount: '',
				isShowModal: this.isShow,
				isError: false,
                errorMsg: ''
			}
		},
		props: ['project', 'isShow', 'isUpdate', 'bid'],
		watch:{
			isShow(val){
				this.isShowModal = val;
			},
            amount(val){
                if (val < this.project.budgetMin){
                    this.isError = true;
                    this.errorMsg = 'The bid amount can\'t lower than the minimum'
                }else if (val > this.project.budgetMax){
                    this.isError = true;
                    this.errorMsg = 'The bid amount can\'t higher than the minimum'
                }else {
                    this.isError = false
                }
            }
		},	
		methods: {
			onSubmit(e) {
                if (!this.isError){
                    e.target.disabled = true;
                    var method = 'post';
                    var data = {
                        amount: this.amount,
                    }
                    if (this.isUpdate){
                        method = 'put';
                        data.bidId = this.bid._id;
                    }
                    this.$http[method](API_SERVER + '/project/'+ this.project._id +'/bid/', data).then(response => {
                        e.target.disabled = false;
                        if (this.isUpdate){
                            bus.$emit('updateProject');
                        }
                        bus.$emit('showAlert', response.body);
                        bus.$emit('updateProjectData');
                        this.handleClose();
                    });
                }
			},
            handleClose(){
                this.$emit("handleClose");
            }
		},
		created(){
			if (this.project.budgetType === 'fixed'){
				this.amount = this.project.budgetMin; 
			}
		},
		components:{
			appBudget,
			modal
		}
	}
</script>

<style scoped>
.currentBid{
    font-family: Lato;
}
.vertical-alignment-helper {
    display:table;
    height: 100%;
    width: 100%;
}
.vertical-align-center {
    /* To center vertically */
    display: table-cell;
    vertical-align: middle;
}
.modal-content {
    /* Bootstrap sets the size of the modal in the modal-dialog class, we need to inherit it */
    width:inherit;
    height:inherit;
    /* To center horizontally */
    margin: 0 auto;
}

.place-bid-form{
	margin-top: 50px;
}

.details-text-fixed{
    font-size: 0.4em;
}

.margin-bottom{
    margin-bottom: 30px;
}

.modal-footer{
    padding: 0;
}

.amount{
    height: 50px;
    font-size: 25px;
    margin: 0;
}

.btn-submit{
	width:100%;
    height: 100%;
    border-radius: 0px 0px 4px 4px;
    height: 50px;
}
</style>