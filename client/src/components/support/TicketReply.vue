<template>
    <md-whiteframe md-elevation="1">
	<div class="ticket-reply" :class="{staff: isStaff}">
        <div class="date">
           {{ message.sendDate | moment('MM/DD/YYYY hh:mm') }}
        </div>
        <div class="user">
            <i class="fa fa-user"></i>
            <span class="name">{{ displayName }}</span>
            <span class="type">{{ userType }}</span>
        </div>
        <div class="message" v-html="message.message"></div>
        <div class="attachment" v-if="message.attachments.length > 0">
            <strong>Attachments</strong>
            <ul>
                <li v-for="attachment in message.attachments"><i class="fa fa-paperclip fa-fw" aria-hidden="true"></i>  <a :href="generateAttachmentUrl(attachment.filename)" target="_blank">{{ attachment.originalname }}</a></li>
            </ul>
        </div>
    </div>
    </md-whiteframe>
</template>

<script>
    import { API_SERVER } from '../../api.js'
	export default {
		props: ['message', 'ticketId', 'ticketSender'],
		computed: {
			isStaff() {
				if (this.message.sender.isAdmin){
					return true;
				}
				return false;
			},
            displayName(){
                if (this.message.sender.isAdmin){
                    return 'Administrator';
                }
                return this.message.sender.firstName + ' ' + this.message.sender.lastName;
            },
            userType(){
                if (this.message.sender.isAdmin){
                    return 'administrator';
                }
                return this.message.sender.type;
            }
		},
        methods: {
            generateAttachmentUrl(filename){
                return API_SERVER + '/uploads/' + this.ticketSender + '/tickets/' + this.ticketId + '/' + this.message._id+ '/' + filename; 
            }
        }
	}
</script>

<style scoped>
ul{
    list-style-type: none;
    padding: 0;
}
.ticket-reply {
    margin: 10px 0;
    padding: 0;
    border: 1px solid #efefef;
    background-color: #fff; 
}

.ticket-reply .date {
    float: right;
    padding: 8px 10px;
    font-size: 0.9em;
    font-family: Lato;
}

.ticket-reply .user {
    padding: 5px 0;
    background-color: #f8f8f8;
    font-size: 1.2em;
}

.ticket-reply .user .type {
    display: block;
    font-weight: bold;
    font-size: 0.8em;
    
}

.ticket-reply .user i {
    float: left;
    font-size: 2.2em;
    padding: 2px 15px;
}

.ticket-reply .user .name {
    display: block;
    font-size: 0.9em;
}

.ticket-reply .message, .ticket-reply .attachment {
    padding: 12px 15px;
}

.ticket-reply .message{
    font-size: 1.2em;
}

.ticket-reply.staff {
    border: 1px solid #CCE4FC;
}

.ticket-reply.staff .user {
    background-color: #F2F9FF;
}
</style>