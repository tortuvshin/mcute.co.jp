<template>
     <md-table-row @click.native="viewTicket" class="ticket-row">
      <md-table-cell class="ticket-type">
       {{ticket.serviceType | capitalizeFirstLetter}}
      </md-table-cell>
      <md-table-cell class="ticket-title">{{ticket.issueType}}</md-table-cell>
      <md-table-cell><span class="status" :class="[statusClass]">{{ticket.status | capitalizeFirstLetter }}</span></md-table-cell>
      <md-table-cell class="ticket-lastupdate"><timeago :since="ticket.messages[ticket.messages.length - 1].sendDate" :auto-update="1" locale="zh-HK"></timeago></md-table-cell>
    </md-table-row>
</template>

<script>
	export default {
		props: ['ticket'],
        computed: {
            statusClass(){
              if (this.ticket.status === 'under for review'){
                return 'ufr';
              }else if (this.ticket.status === 'Request Freelancer Reply'){
                return 'rfr'
              }else if (this.ticket.status === 'Request Employer Reply'){
                return 'rer'
              }else if (this.ticket.status === 'Request Reply'){
                return 'rr'
              }else if (this.ticket.status === 'Replied'){
                return 'r'
              }else if (this.ticket.status === 'Freelancer Replied'){
                return 'fr'
              }else if (this.ticket.status === 'Employer Replied'){
                return 'er'
              }else if (this.ticket.status === 'Solved'){
                return 'solved'
              }
            }
        },
        methods: {
            viewTicket() {
                this.$router.push({ name: 'ViewTicket', params: { id: this.ticket._id }});
            }
        }
	}
</script>

<style scoped>
.ticket-type, .ticket-title{
  font-size: 1.2em;
}

.ticket-lastupdate{
  font-size: 1.1em;
}

.ticket-type {
  font-weight: 600;
}

.ticket-title{
  width: 50%;
}

.ticket-lastupdate{
  font-family: Lato;
}

.ticket-row{
  cursor: pointer;
}

.status{
    padding: 5px 8px;
    color: #fff;
    border-radius: 4px;
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
</style>