<template>
	<div class="container">
         <div class="spinner" v-if="loadingData">
           <spinner></spinner>
         </div>
         <div class="row" v-if="!loadingData">
             <div class="col-md-12">
                <ol class="breadcrumb">
                  <li><a href="/">Home</a></li>
                  <li><a @click="$router.go(-1)">Support Tickets</a></li>
                  <li class="active">View Ticket</li>
                </ol>
             </div>
             <div class="col-md-12">
                 <div class="ticket-status">
                     <table>
                        <tr>
                            <th colspan="5">
                                <h3 class="panel-title"><i class="fa fa-ticket fa-fw"></i> Ticket Information</h3>
                            </th>
                        </tr>
                        <tr>
                             <td colspan="5">
                           	  	<strong>Issue Type: </strong>{{ ticket.issueType }}
                             </td>
                        </tr>
                        <tr>
                            <td><p class="heading">Service Type</p>{{ ticket.serviceType | capitalizeFirstLetter }}</td>
                            <td>
                            	<p class="heading">Submitted</p>{{ticket.messages[0].sendDate | moment('MM/DD/YYYY hh:mm')}}
                            </td>
                            <td>
                            	<p class="heading">Last Updated</p>
                            	{{ ticket.lastUpdate | moment('MM/DD/YYYY hh:mm') }}
                            </td>
                            <td>
                            	<p class="heading">Status</p>
                            	<span class="status" :class="[statusClass]">
                            	{{ ticket.status | capitalizeFirstLetter }}
                            	</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5">
                                  <strong>Related Service: </strong>
                                  <span v-if="ticket.related.kind === 'Project'">
                                	  {{ ticket.related.item.title }}
                                  </span>
                                  <span v-else-if="ticket.related.kind === 'BankDeposit'">
                              	    BankDeposit ({{ ticket.related.item._id }})
                                  </span>
                    							<span v-else-if="ticket.related.kind === 'PaypalDeposit'">
                    								PaypalDeposit ({{ ticket.related.item._id }})
                            			</span>
                            </td>
                        </tr>
                     </table>
                 </div>
             </div>
             <div class="col-md-12 reply-section" v-if="canReply">
                <accordion type="info">
                    <panel :is-open="isReply" @toggle="isReply = $event">
                        <h3 class="panel-title" slot="header">
                            <i class="fa fa-pencil fa-fw"></i> Reply
                        </h3>
                        <app-ticket-reply-form  :ticketId="ticket._id" @handleTicketUpdated="handleTicketUpdated"></app-ticket-reply-form>
                    </panel>
                </accordion>
             </div>
             
             <div class="col-md-12">
                <app-ticket-reply v-for="message in ticket.messages" :message="message" :ticketId="ticket._id"  :ticketSender="ticket.sender.username"></app-ticket-reply>
             </div>

         </div>
     </div>
</template>

<script>
    import appTicketReply from '../../components/support/TicketReply.vue'
    import appTicketReplyForm from '../../components/support/TicketReplyForm.vue'
    import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
    import panel from 'vue-strap/src/Panel.vue'
    import accordion from 'vue-strap/src/Accordion.vue'
	  import { API_SERVER } from '../../api.js'

  	export default {
  		data() {
  			return {
  				ticket: null,
          loadingData: true,
          isReply: false
  			}
  		},
      computed: {
          currentUser(){
            return this.$store.state.user.currentUser;
          },
          statusClass(){
              if (this.ticket.status === 'under for review'){
                return 'ufr';
              }else if (this.ticket.status === 'Request Freelancer Reply'){
                return 'rfr'
              }else if (this.ticket.status === 'Request Employer Reply'){
                return 'rer'
              }else if (this.ticket.status === 'Request Reply'){
                return 'rr'
              }else if (this.ticket.status === 'Freelancer Replied'){
                return 'fr'
              }else if (this.ticket.status === 'Employer Replied'){
                return 'er'
              }else if (this.ticket.status === 'Replied'){
                return 'r'
              }else if (this.ticket.status === 'Solved'){
                return 'solved'
              }
          },
          canReply(){
            if(this.ticket.serviceType === 'project') {
              if ((this.currentUser._id === this.ticket.sender._id && this.ticket.status === 'Request Employer Reply') || (this.currentUser._id === this.ticket.freelancer && this.ticket.status === 'Request Freelancer Reply')){
                return true;
              }
            } else if (this.ticket.serviceType === 'billing') {
              if (this.ticket.status === 'Request Reply'){
                return true;
              }
            }
            return false;
          }
      },
  		methods: {
  			fetchData() {
  				this.$http.get(API_SERVER + "/support/" + this.$route.params.id).then(response => {
              this.loadingData = false;
    					this.ticket = response.body.ticket;
    					this.ticket.messages.reverse();
           
              document.title = this.ticket.issueType + ' - EcJob.com';
  				}, response => {
              this.$router.replace({name: 'error', params: {message: response.body.message}});
          });
  			},
        handleTicketUpdated(){
          this.fetchData();
          this.isReply = false;
        }
  		},
      components: {
          ScaleLoader,
          appTicketReplyForm,
          panel,
          accordion,
          appTicketReply
      },
  		created() {
  			this.fetchData();
        this.updateToolbar('View Ticket');
        document.title = 'Loading Ticket... - EcJob.com';
  		}
  	}
</script>

<style scoped>
.container {
  padding: 20px 55px;
  width: 100%;
  height: 100%;
}

.ticket-status{
  margin-bottom: 30px;
}
.spinner{
  width: 100%;
  height: 100%;
  position: relative;
}

td{
  font-size: 16px;
  background-color: #fff;
}

li a {
  cursor: pointer;
}

input[type='file'].form-control {
    height: inherit;
    margin-bottom: 5px;
}

.reply-section{
    margin-top: 30px;
}

.panel-collapsable > .panel-heading {
    cursor: pointer;
}

table tr:nth-child(2) td{
    border: 1px solid #ddd;
    padding: 10px 15px;
}

table tr:nth-child(3) td{
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px 15px;
}

table tr:nth-child(3) td:last-child{
    border-right: 1px solid #ddd;
}

table tr:nth-child(4) td{
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px 15px;
}

table th{
    border: 1px solid #ddd;
    padding: 10px;
    background-color: #4D525B;
    color: #fff;
}

table{
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-family: Lato;
     box-shadow: 0px 0px 5px rgba(0,0,0,0.2)
}


.heading{
    font-weight: bold;
}

.main-heading{
    margin-bottom: 20px;
}

.fr, .er, .r{
    background-color: #4B0082;
}

.rfr, .rer, .rr {
    background-color: #ec971f;
}

.solved{
    background-color: #db5f47;
}

.ufr{
    background-color: rgb(0, 179, 89);
}

.status{
    padding: 5px 8px;
    color: #fff;
    border-radius: 4px;
}

.panel-body.panel-body-collapsed{
    overflow:hidden;
    position: relative;
}
</style>