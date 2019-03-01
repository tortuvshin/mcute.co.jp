<template>
	<div>
		<div class="withdraw">
	      <md-table-card>
	        <md-toolbar>
	          <h1 class="md-title">Withdraw</h1>
	        </md-toolbar>
			<md-table v-once>
			  <md-table-header>
			    <md-table-row>
			      <md-table-head>Withdraw Date</md-table-head>
			      <md-table-head>ID</md-table-head>
			      <md-table-head>Method</md-table-head>
			      <md-table-head>Amount</md-table-head>
			      <md-table-head>Status</md-table-head>
			    </md-table-row>
			  </md-table-header>

			  <md-table-body>
			    <md-table-row v-for="withdraw in withdraws">
			      <md-table-cell class="lato">{{ withdraw.createTime | moment("DD/MM/YYYY hh:mm A")}}</md-table-cell>
			      <md-table-cell class="lato">{{ withdraw._id }} <br> To: {{withdraw.paymentAccount}}</md-table-cell>
			       <md-table-cell class="lato">{{withdraw.type}}</md-table-cell>
			      <md-table-cell class="lato">${{ withdraw.amount }}</md-table-cell>
			      <md-table-cell>{{ withdraw.status }}</md-table-cell>
			    </md-table-row>
			    <md-table-row v-if="withdrawss.length <= 0">
			      <md-table-cell colspan="5">No withdraw history</md-table-cell>
			    </md-table-row>
			  </md-table-body>
			</md-table>
		  </md-table-card>
		</div>
	
	</div>
</template>

<script>
 	export default {
 		props: ['withdraws'],
 		computed: {
		    withdrawss() {
		      // just an example of processing `images` props
		      return this.withdraws.filter((each, index) => index >= 0);
		    }
		}
 	}
</script>

<style scoped>
.withdraw{
	padding: 10px 20px;
}

.lato {
	font-family: Lato;
}
</style>