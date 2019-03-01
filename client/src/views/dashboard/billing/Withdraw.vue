<template>
	<div id="withdraw" class="main-content">
		<app-header>
	        <h2 slot="Title">Withdraw</h2>
	        <small slot="Description">You can withdraw the money via bank tranfer & PayPal.</small>
	    </app-header>
		    <form @submit.prevent="onSubmit">
		    <div class="div-content">
			    <div class="row">
			    	<div class="col-xs-4">
		                <label class="control-label">Withdraw Methods</label>
		                <p>Select a withdraw method</p>
		            </div>
		            <div class="col-xs-8">
		               	<div class="row">
	                        <div class="col-sm-4">
	                            <div class="bankImg text-center" :class="{selected: type === 'bochk'}">
	                                <img src="/assets/images/bank_type/bochk.jpg" width="140px" @click="selectWithdrawMethod('bochk')" style="margin-top:5px;">
	                            </div>
	                        </div>
	                        <div class="col-sm-4">
	                            <div class="bankImg text-center" :class="{selected: type === 'hsbc'}">
	                                <img src="/assets/images/bank_type/hsbc.png" width="140px"  @click="selectWithdrawMethod('hsbc')" style="margin-top:15px;">
	                            </div>
	                        </div>
	                        <div class="col-sm-4">
	                            <div class="bankImg text-center" :class="{selected: type === 'paypal'}">
	                                <img src="/assets/images/bank_type/paypal.png" width="140px"  @click="selectWithdrawMethod('paypal')" style="margin-top:5px;">
	                            </div>
	                        </div>
	                    </div>
		   			</div>
			    </div>
		    </div>
	    	<hr>
		    <div class="div-content">
			    <div class="row">
			    	<div class="col-xs-4">
		                <label class="control-label">Withdraw Amount</label>
		                <p>Enter the withdraw amount</p>
		            </div>
		            <div class="col-xs-8">
		            	<div class="input-group">
			            	<span class="input-group-addon">$</span>
		               		<input type="number" class="form-control input-lg" min="1" :placeholder="currentUser.balance" v-model="amount" required>
		               	</div>
		   			</div>
			    </div>
		    </div>
	    	<hr>
		    <div class="div-content">
			    <div class="row">
			    	<div class="col-xs-4">
		                <label class="control-label">Receipt Account</label>
		                <p>Enter the receipt account</p>
		            </div>
		            <div class="col-xs-8">
			            <input type="text" class="form-control input-lg" min="1" placeholder="(Bank) xxx-xxx-xxxxxx / (Paypal) master@ec-job.com" v-model="paymentAccount" required>
		   			</div>
			    </div>
		    </div>
	    	<hr>
	    	<div class="form-group has-feedback div-content">
        		<div class="row">
        			<div class="col-sm-offset-4 col-sm-8">
		              <button class="btn btn-primary btn-lg">Withdraw</button>
		            </div>
	    		</div>
            </div>
         </form>
	</div>
</template>

<script>
	import appHeader from '../../../components/dashboard/Heading.vue'
	import { bus } from '../../../main.js'
	import { API_SERVER } from '../../../api.js'

	export default {
		data(){
			return {
				type: '',
				amount: '',
				paymentAccount: ''
			}
		},
		components: {
			appHeader
		},
		computed: {
			currentUser(){
				return this.$store.state.user.currentUser;
			}
		},
		methods: {
			selectWithdrawMethod(type){
				this.type = type;
			},
			onSubmit(){
				if (this.type === ''){
					return alert("Withdraw method is required to select");
				}
				if (this.amount > this.currentUser.balance){
					return alert('Your request amount is exceed your account balance.')
				}
				this.$http.post(API_SERVER +'/dashboard/billing/withdraw', {type: this.type, amount: this.amount, paymentAccount: this.paymentAccount}).then(response => {
					this.type = '',
					this.amount = '',
					this.paymentAccount = '';
					bus.$emit('showAlert', response.body);
				});
			}
		},
		created(){
			document.title = "Withdraw - Ec-Job.com"
		}
	}
</script>

<style scoped>
.selected {
	border: 3px dashed rgba(44,62,80, 0.5);
}

.bankImg{
	height: 80px;
	width: 170px;
	cursor: pointer;
}

.available-balance table{
	margin: 0px auto;
}

.amount {
	font-family: Lato;
}

.available-balance table td{
	padding: 10px;
	border: 1px solid rgba(0,0,0,0.15);
	font-size: 1.2em;
}
.main-content{
    padding: 0;
    padding-bottom: 5px;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}
.div-content {
    padding:0px 25px;
}
</style>