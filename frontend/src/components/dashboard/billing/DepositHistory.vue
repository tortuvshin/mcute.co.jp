<template>
	<div>
		<div class="bankdeposit">
	      <md-table-card>
	        <md-toolbar>
	          <h1 class="md-title">Bank Deposit</h1>
	        </md-toolbar>
			<md-table v-once>
			  <md-table-header>
			    <md-table-row>
			      <md-table-head>Deposit Date</md-table-head>
			      <md-table-head>Bank Type</md-table-head>
			      <md-table-head>ID</md-table-head>
			      <md-table-head>Amount</md-table-head>
			      <md-table-head>Status</md-table-head>
			    </md-table-row>
			  </md-table-header>

			  <md-table-body>
			    <md-table-row v-for="bankDeposit in bankDepositss">
			      <md-table-cell class="lato">{{ bankDeposit.depositTime | moment("DD/MM/YYYY hh:mm A")}}</md-table-cell>
			      <md-table-cell class="lato">{{ bankDeposit.bankType }}</md-table-cell>
			      <md-table-cell class="lato">{{ bankDeposit._id }}</md-table-cell>
			      <md-table-cell class="lato">${{ bankDeposit.amount }}</md-table-cell>
			      <md-table-cell class="lato">{{ bankDeposit.status }}</md-table-cell>
			    </md-table-row>
			    <md-table-row v-if="bankDepositss.length <= 0">
			      <md-table-cell colspan="5">No bank deposit history</md-table-cell>
			    </md-table-row>
			  </md-table-body>
			</md-table>
		  </md-table-card>
		</div>

		<div class="paypaldeposit">
	      <md-table-card>
	        <md-toolbar>
	          <h1 class="md-title">Paypal Deposit</h1>
	        </md-toolbar>
			<md-table v-once>
			  <md-table-header>
			    <md-table-row>
			      <md-table-head>Deposit Date</md-table-head>
			      <md-table-head>ID</md-table-head>
			      <md-table-head>Amount</md-table-head>
			      <md-table-head>Status</md-table-head>
			    </md-table-row>
			  </md-table-header>

			  <md-table-body>
			    <md-table-row v-for="paypalDeposit in paypalDepositss">
			      <md-table-cell class="lato">{{ paypalDeposit.orderTime | moment("DD/MM/YYYY hh:mm A")}}</md-table-cell>
			      <md-table-cell class="lato">{{ paypalDeposit._id }}</md-table-cell>
			      <md-table-cell class="lato">${{ paypalDeposit.amount }}</md-table-cell>
			      <md-table-cell>{{ paypalDeposit.status }}</md-table-cell>
			    </md-table-row>
			    <md-table-row v-if="paypalDepositss.length <= 0">
			      <md-table-cell colspan="5">No bank deposit history</md-table-cell>
			    </md-table-row>
			  </md-table-body>
			</md-table>
		  </md-table-card>
		</div>
	
	</div>
</template>

<script>
 	export default {
 		props: ['paypalDeposits', 'bankDeposits'],
 		computed: {
		    paypalDepositss() {
		      // just an example of processing `images` props
		      return this.paypalDeposits.filter((each, index) => index >= 0);
		    },
		    bankDepositss() {
		      // just an example of processing `images` props
		      return this.bankDeposits.filter((each, index) => index >= 0);
		    }
		}
 	}
</script>

<style scoped>
.bankdeposit, .paypaldeposit{
	padding: 10px 20px;
}

.lato {
	font-family: Lato;
}
</style>