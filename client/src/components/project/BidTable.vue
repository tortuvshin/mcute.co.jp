<template>
	<div class="row">
         <div class="col-xs-12">
             <div class="bid-record">
                <table class="table table-hover" id="bid-record-table">
                    <thead>
                        <tr>
                            <th class="table-heading">FREELANCERS BIDDING ({{ project.bids.length }}) </th>
                            <th class="table-heading">Reputation</th>
                            <th class="table-heading nopadding">Bid (HKD)</th>
                            <th class="table-heading" v-if="project.status === 'In progress' && currentUser.username === project.employer.username">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="cursor: auto;" v-if="project.bids.length <= 0">
                            <td colspan="3" style="text-align: center;">No bids record</td>
                        </tr>
                       	<app-bid-row v-if="project.bids.length > 0" v-for="bid in project.bids" :bid="bid" :project="project"></app-bid-row>
                    </tbody>
                </table>
            </div>
         </div>
     </div>
</template>

<script>
	import appBidRow from './BidRow.vue'
	import { mapGetters } from 'vuex'

	export default {
		props: ['project'],
		computed: {
			...mapGetters([
				'currentUser'
			])
		},
		components: {
			appBidRow
		}
	}
</script>

<style scoped>
.bid-record{
    background-color: rgba(40,44,42,0.05);
    border: 15px solid transparent;
}

table{
    margin-bottom: 0;
}

thead > tr{
    background: #4D525B;
    border-color: #4D525B;
    border-radius: none;
    font-size: 12px;
    line-height: 1.33;
    text-transform: uppercase;
    text-align: left;
    color: #F7F7F7;
}

.nopadding{
    padding: 15px 5px !important;
}

th{
    padding: 15px 20px !important;
    vertical-align: middle;
    border: none;
}

td{
    background: white;
    padding: 10px 20px;
}

tr {
    font-family: Lato;
    outline: rgba(40,44,42,0.1) thin solid;
}
</style>