<template>
	<div id="deposit" class="main-content">
		<app-header>
	        <h2 slot="Title">Deposit</h2>
	        <small slot="Description">You can deposit the money via bank tranfer & PayPal.</small>
	    </app-header>
	    <ul class="nav nav-tabs nav-justified">
	        <li class="gateway" :class="{active: isBank}"><a href="#" @click="isBank=true">Bank Transfer</a></li>
	        <li class="gateway" :class="{active: !isBank}"><a href="#" @click="isBank=false">PayPal</a></li>
	    </ul>
	    <div class="tab-content">
		    <keep-alive>
		        <app-bank-deposit v-if="isBank"></app-bank-deposit>
		        <app-paypal-deposit v-else></app-paypal-deposit>
		    </keep-alive>
	    </div>
	</div>
</template>

<script>
	import appHeader from '../../../components/dashboard/Heading.vue'
	import appBankDeposit from '../../../components/dashboard/billing/BankDeposit.vue'
	import appPaypalDeposit from '../../../components/dashboard/billing/PaypalDeposit.vue'

	export default {
		data(){
			return {
				isBank: true
			}
		},
		components: {
			appHeader,
			appBankDeposit,
			appPaypalDeposit
		},
		created() {
			document.title = "Deposit - Ec-Job.com";
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