<template>
	<div id="paypal">
        <form @submit.prevent="onSubmit">
            <div class="form-group has-feedback div-content">
                <div class="row">
                    <div class="col-md-4">
                        <label class="control-label" for="date">Deposit Amount:</label>
                        <p>Enter Deposit Amount</p>
                    </div>
                    <div class="col-md-8">
                        <div class="input-group">
                          <span class="input-group-addon">$</span>
                          <input type="text" class="form-control input-lg input-block" style="width:100%;" v-model="payment.amount" placeholder="$1000" required>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group has-feedback div-content">
                <div class="row">
                    <div class="col-sm-4">
                        <img src="/assets/images/bank_type/paypal.png" width="150">
                    </div>
                    <div class="col-sm-8">
                        <button type="submit" class="btn btn-primary btn-lg btn-submit">Deposit</button>
                    </div>
                </div>
            </div>
        </form>

        <modal :value="isShow" effect="fade" :backdrop='backdrop' width="400" style="padding-top: 200px; padding-left: 304px;">
          <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">
              <h4 class="modal-title" id="myModalLabel">Payment Processing </h4><small>Please don't close the window.</small>
            </h4>
          </div>
          <div slot="modal-body" class="modal-body">
            <p class="invoiceNo">
                <strong>Transaction ID: </strong> 
                {{ payment.invoiceNo }}
            </p>
            <transition enter-active-class="animated tada"  mode="out-in">
                <md-spinner :md-size="160" :md-stroke="2" v-if="!payment.isPaid" class="md-accent" md-indeterminate></md-spinner>
                <i class="fa fa-check" v-else key="paid"></i>
            </transition>
            <span class="sr-only">Loading...</span>
            <p class="loader-text" :class="{'success': payment.isPaid, 'process': !payment.isPaid}">{{ payment.status }}</p>
          </div>
          <div slot="modal-footer" class="modal-footer">
            <p>If your brower hasn't redirected to paypal, <a :href="payment.url" id="paymentUrl" target="_blank">Click here.</a> </p>
          </div>
        </modal>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
	import { API_SERVER } from '../../../api.js'
    import { modal } from 'vue-strap'

	export default {
		data() {
			return {
                payment: {
                    amount: null,
                    status: "Generating Payment URL",
                    url: null,
                    invoiceNo: 'Generating',
                    isPaid: false
                },
                isShow: false,
                backdrop: false
			}
		},
        computed: {
            socketID(){
                return this.$store.state.socketID;
            }
        },
        methods: {
            onSubmit(){
                this.isShow = true;
                var POST_DATA = {
                    method: 'paypal',
                    socketID: this.socketID,
                    amount: this.payment.amount
                };  
                this.$http.post(API_SERVER + "/dashboard/billing/deposit", POST_DATA).then(response => {
                    this.payment.status = response.body.status;
                    this.payment.url = response.body.data.paymentUrl;
                    this.payment.invoiceNo = response.body.data.invoiceNo;
                }).then(()=>{
                    window.open(this.payment.url);
                });
                
            },
            onReset(){
                this.payment.amount = null;
                this.payment.status = "Generating Payment URL";
                this.payment.url = null;
                this.payment.invoiceNo = 'Generating';
                this.payment.isPaid = false;
            }
        },
        components: {
            modal
        },
        sockets: {
            paymentRecieved(data){
                this.payment.status = data.status;
                this.payment.isPaid = true;
                this.$store.commit('setCurrentUser', data.updatedUser);
                setTimeout(()=>{ this.isShow = false; this.onReset(); }, 6000);
            },
            paymentVerification(data){
                this.payment.status = data.status;
            }
        }
	}
</script>

<style scoped>
.loader {
    text-align: center;
    margin: 0px auto;
    border: 13px solid #f3f3f3; /* Light grey */
    border-top: 13px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 160px;
    height: 160px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.btn-submit {
    margin-top:10px;
}

.div-content {
    padding:0px 25px;
}

.modal-title{
    display: inline;
    font-size: 20px;
}

.modal-body{
    text-align: center;
    padding: 0;
}

.loading{
    font-size: 13em;
    color: #4d4d4d;
}

.success{
    color: #3c763d;
}

.process{
    font-weight: 500;
}

.loader-text {
    text-align: center;
    font-size: 2em;
    margin-top: 40px;
    margin-bottom: 50px;
}

.invoiceNo {
    font-family: Lato;
    text-align: center;
    font-size: 1.3em;
    background: #d9edf7;
    margin-bottom: 50px;
    padding: 20px 10px;
    color: #31708f;
}

.fa-check{
    color: #58aa5a;
    font-size: 13em;
}

</style>