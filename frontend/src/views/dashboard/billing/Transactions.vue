<template>
	<div id="transations" class="main-content">
		<app-header>
	        <h2 slot="Title">Transaction History</h2>
	        <small slot="Description">View your transaction history.</small>
	    </app-header>
	    <ul class="nav nav-tabs nav-justified">
	        <li class="gateway" :class="{active: type === 'deposit'}"><a href="#" @click="type='deposit'">Deposit</a></li>
	        <li class="gateway" :class="{active: type === 'withdraw'}"><a href="#" @click="type='withdraw'">Withdraw</a></li>
	    </ul>
	    <div class="tab-content" v-if="!loadingData">
		    <keep-alive>
		        <deposit-history v-if="type === 'deposit'" :paypalDeposits="paypalDeposits" :bankDeposits="bankDeposits"></deposit-history>
		        <withdraw-history v-if="type === 'withdraw'" :withdraws="withdraws"></withdraw-history>
		    </keep-alive>
	    </div>
	</div>
</template>

<script>
	import depositHistory from '../../../components/dashboard/billing/DepositHistory.vue'
	import withdrawHistory from '../../../components/dashboard/billing/WithdrawHistory.vue'
	import appHeader from '../../../components/dashboard/Heading.vue'
	import { API_SERVER } from '../../../api.js'

	export default {
		data(){
			return {
				type: 'deposit',
				loadingData: false,
				paypalDeposits: [],
				bankDeposits: [],
				withdraws: []
			}
		},
		components: {
			appHeader,
			depositHistory,
			withdrawHistory
		},
		created(){
			this.loadingData = true;
			this.$http.get(API_SERVER + '/dashboard/billing/transaction').then(response => {
				this.loadingData = false;
				this.paypalDeposits = response.body.paypalDeposits;
				this.bankDeposits = response.body.bankDeposits;
				this.withdraws = response.body.withdraws;
			});
		}
	}
</script>

<style scoped>
.main-content{
    padding: 0;
    padding-bottom: 5px;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}
.div-content {
    padding:0px 25px;
}

.nav{
	margin: 30px 0px;
}

/* Default mode */
.nav-tabs { border-bottom: 2px solid #DDD; }
    .nav-tabs > li.active > a, .nav-tabs > li.active > a:focus, .nav-tabs > li.active > a:hover { border-width: 0; }
    .nav-tabs > li > a { border: none; color: #666; }
        .nav-tabs > li.active > a, .nav-tabs > li > a:hover { border: none; color: #688aac !important; background: transparent; }
        .nav-tabs > li > a::after { content: ""; background: #688aac; height: 2px; position: absolute; width: 100%; left: 0px; bottom: -1px; transition: all 250ms ease 0s; transform: scale(0); }
    .nav-tabs > li.active > a::after, .nav-tabs > li:hover > a::after { transform: scale(1); }
.tab-nav > li > a::after { background: #21527d none repeat scroll 0% 0%; color: #fff; }
.card1 {background: #FFF none repeat scroll 0% 0%; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3); margin-bottom: 30px; }

.nav-tabs.nav-justified>.active>a, .nav-tabs.nav-justified>.active>a:focus, .nav-tabs.nav-justified>.active>a:hover{
    border: 0;
}
</style>