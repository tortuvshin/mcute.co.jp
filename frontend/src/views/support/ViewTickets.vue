<template>
	<div class="container">
       <ol class="breadcrumb">
            <li><a href="/">Home</a></li>
            <li class="active">Support Tickets</li>
       </ol>
      <md-table-card>
       <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head>Type</md-table-head>
            <md-table-head>Subject</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Last Updated</md-table-head>
          </md-table-row>
        </md-table-header>
        <md-table-body>

          <td colspan="5" style="height: 4px;">
            <transition leave-active-class="animated fadeOut">
               <md-progress class="md-accent" md-indeterminate v-show="loadingData"></md-progress>
            </transition>
          </td>
     
          <md-table-row v-if="tickets.length <= 0 && !loadingData">
              <md-table-cell colspan="4" class="text-center no-result-text">No issue found.</md-table-cell>
          </md-table-row>
          <ticket-row v-for="ticket in tickets" :ticket="ticket" v-if="tickets.length > 0"></ticket-row>
        </md-table-body>
      </md-table>
      </md-table-card>

      <md-speed-dial class="md-fab-bottom-right">
          <md-button class="md-fab" @click.native="$router.push('/support/create')">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="left">Report an Issue</md-tooltip>
          </md-button>
      </md-speed-dial>
  </div>
</template>

<script>
  import TicketRow from '../../components/support/TicketRow.vue'
	import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
	import { API_SERVER } from '../../api.js'
	export default {
		data() {
			return {
				tickets: [],
				loadingData: true
			}
		},
		components: {
			TicketRow,
			ScaleLoader
		},
		created() {
			this.fetchData();
            document.title = 'Support Center - EcJob.com'
		},
		methods: {
			fetchData(){
				this.$http.get(API_SERVER + '/support').then(response=> {
					this.tickets = response.body.tickets;
					this.loadingData = false;
				});
			}
		}
	}
</script>

<style scoped>
.no-result-text{
  font-size: 1.1em;
  font-weight: 400;
}

.container{
  width: 100%!important;
  padding: 15px 55px;
}

.btn-open{
    float: right;
    color: #fff!important;
}

.status.answered
{
    background-color: #4B0082;
}

.status.customer-reply {
    background-color: #ec971f;
}

.status.closed{
    background-color: #db5f47;
}

.status.open{
    background-color: rgb(0, 179, 89);
}

.status{
    padding: 3px 8px;
    color: #fff;
    border-radius: 4px;
    font-size: 0.9em;
}

thead > tr{
    text-transform: uppercase;
}

tbody > tr > td {
    background: white;
}

td, th {
    vertical-align: middle;
}
</style>