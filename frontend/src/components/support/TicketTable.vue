<template>
    <md-table>
      <md-table-header>
        <md-table-row style="background-color: #fff;">
          <md-table-head>Type</md-table-head>
          <md-table-head class="subject">Subject</md-table-head>
          <md-table-head>Status</md-table-head>
          <md-table-head>Last Updated</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
         <md-table-row>
            <td colspan="4" style="height: 4px;">
              <transition leave-active-class="animated fadeOut">
                 <md-progress class="md-accent" md-indeterminate v-show="loadingData"></md-progress>
              </transition>
            </td>
         </md-table-row>
        <md-table-row v-if="projects.length <= 0 && !loadingData">
            <md-table-cell colspan="4" class="text-center">No result found.</md-table-cell>
        </md-table-row>
        <app-ticket-row v-for="ticket in tickets" :ticket="ticket" v-if="tickets.length > 0"></app-ticket-row>
             <tr v-if="tickets.length <= 0"><td colspan="4" class="text-center">No ticket created</td></tr>
      </md-table-body>
    </md-table>
</template>

<script>
	import appTicketRow from './TicketRow.vue'
	export default {
		data(){
			return {
				ticket: null
			}
		},
		props: ['tickets'],
		components: {
			appTicketRow
		}
	}
</script>

<style scoped>
thead > tr{
    text-transform: uppercase;
}

tbody > tr > td {
    background: white;
}

.subject{
  width: 70%;
}

</style>

