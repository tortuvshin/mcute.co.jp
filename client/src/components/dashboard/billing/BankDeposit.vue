<template>
	<div id="backtransfer">
        <form @submit.prevent="onSubmit">
            <!-- Bank Type -->
            <div class="form-group has-feedback div-content">
                <div class="row">
                    <div class="col-md-4">
                        <label class="control-label" for="first_name">Bank Type:</label>
                        <p>Select Bank Type</p>
                        <span class="errorMessage" v-if="error.bankType === true"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Bank Type is required</span>
                    </div>
                    <div class="col-sm-8">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="bankImg" :class="{'bank-active': deposit.bankType == 'bochk'}">
                                    <img src="/assets/images/bank_type/bochk.jpg" width="140px" @click="deposit.bankType = 'bochk'" style="margin-top:5px;">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="bankImg" :class="{'bank-active': deposit.bankType == 'hsbc'}">
                                    <img src="/assets/images/bank_type/hsbc.png" width="140px"  @click="deposit.bankType = 'hsbc'" style="margin-top:15px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <!-- Deposit Date -->
            <div class="form-group has-feedback div-content">
                <div class="row">
                    <div class="col-md-4">
                        <label class="control-label" for="date">Deposit Date:</label>
                        <p>Enter Deposit Date</p>
                    </div>
                    <div class="col-sm-8">
                        <input type="date" class="form-control input-lg" v-model="deposit.date" placeholder="Enter Deposit Date" :max="todayDate()" required>
                    </div>
                </div>
            </div>
            <hr>
            <!-- Deposit Time -->
            <div class="form-group has-feedback div-content">
                <div class="row">
                    <div class="col-md-4">
                        <label class="control-label" for="time">Deposit Time:</label>
                        <p>Enter Deposit Time</p>
                    </div>
                    <div class="col-sm-8">
                        <input type="time" class="form-control input-lg" v-model="deposit.time" placeholder="Enter Deposit Time" required>
                    </div>
                </div>    
            </div>
            <hr>
            <!-- Deposit Amount -->
            <div class="form-group has-feedback div-content">
                <div class="row">
                    <div class="col-md-4">
                        <label class="control-label" for="time">Deposit Amount:</label>
                        <p>Enter Deposit Amount</p>
                    </div>
                    <div class="col-sm-8">
                        <div class="input-group">
                            <span class="input-group-addon">$</span>
                            <input type="Number" class="form-control input-lg" v-model="deposit.amount" placeholder="Enter Deposit Amount" min="1" required>
                        </div>
                    </div>
                </div>           
            </div>
            <hr>
            <!-- Email -->
            <div class="form-group has-feedback div-content">
                <div class="row">
                    <div class="col-md-4">
                        <label class="control-label" for="receipt">Upload Receipt:</label>
                        <p>Upload Receipt</p>
                    </div>
                    <div class="col-sm-8">
                         <app-image-uploader image-src="" @imageUploaded="deposit.receipt = $event"></app-image-uploader>
                    </div>
                </div>
            </div>
            <hr>
            <input type="hidden" name="method" value="bank">
            <div class="form-group has-feedback div-content">
                <div class="row">
                    <div class="col-sm-offset-4 col-sm-8">
                         <button type="submit" class="btn btn-primary btn-lg">Deposit</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
	import { API_SERVER } from '../../../api.js'
    import { bus } from '../../../main.js'

	import appImageUploader from '../../common/ImageUploader.vue'

	export default { 
		data() {
			return {
				deposit:{
					bankType: '',
					date: '',
					time: '',
					amount: '',
					receipt: ''
				},
                error: {
                    bankType: false
                }
			}
		},
        watch:{
            'deposit.bankType'(val){
                this.error.bankType = false; 
            }
        },
		methods: {
			onSubmit(){
                if (this.deposit.bankType === ''){
                    return this.error.bankType = true;
                }
				var formData = new FormData();
				formData.append('bankType', this.deposit.bankType);
				formData.append('date', this.deposit.date);
				formData.append('time', this.deposit.time);
				formData.append('amount', this.deposit.amount);
				formData.append('receipt', this.deposit.receipt);
				formData.append('method', 'bank');

				this.$http.post(API_SERVER + '/dashboard/billing/deposit', formData).then(response => {
					bus.$emit('showAlert', response.body);
                    this.onReset();
				});
			},
            onReset() {
                this.deposit.bankType = '';
                this.deposit.date = '';
                this.deposit.time = '';
                this.deposit.amount = '';
                this.deposit.receipt = '';
            }
		},
		components: {
			appImageUploader
		}
	}
</script>

<style>
.bankImg{
    text-align: center;
    width: 200px;
    height: 70px;
    cursor: pointer;
}
.bank-active{
    border: 3px dashed rgba(44,62,80, 0.5);
}
.div-content {
    padding:0px 25px;
}

.control-label{
    font-weight: 600;
    font-size: 1.1em;
}

.errorMessage{
    color: red;
    font-weight: 500;
}
</style>