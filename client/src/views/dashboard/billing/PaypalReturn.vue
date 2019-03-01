<template>
	<div class="wrapper">
		<div class="m-container">
		<md-progress class="md-accent" md-indeterminate></md-progress>
			<md-whiteframe md-elevation="4" class="white-frame">

				<md-spinner :md-size="150" :md-stroke="2" md-indeterminate class="md-warn"></md-spinner>
				<div>Verifying the payment <br>Please wait ...</div>
			</md-whiteframe>
		</div>
		
		
	</div>
</template>

<script>
	import { API_SERVER } from '../../../api.js'
	export default {
		created() {
			this.$socket.emit('paymentVerification', {status: 'Verifying the payemnt'});
			var token = this.$route.query.token;
			var PayerID = this.$route.query.PayerID;

			this.$http.get(API_SERVER + '/dashboard/billing/return', {params: { token: token, PayerID: PayerID}}).then(response => {
				window.close();
			});
		}
	}
</script>

<style scoped>
	.wrapper {
		text-align: center;
		background-color: rgba(0,0,0,0.1);
		font-size: 1.7em;
		width: 100%;
		height: 100%;
		line-height: 2em;
	}

	.white-frame{
		padding:40px 14px;
		background-color: #fff;
	}

	.m-container {
		margin: 0 auto;
	    position: relative;
	    top: 25%;
	    max-width: 350px;
	}
</style>