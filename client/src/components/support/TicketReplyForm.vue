<template>
	<div class="panel-body panel-body-collapsed">
        <form @submit.prevent="replyTicket">
            <div class="row">
                <div class="form-group col-sm-12">
                    <label for="inputMessage">Message</label>
                    <small v-show="errors.has('message')" class="errorMessage">
                        <i class='fa fa-exclamation-triangle error-icon'></i>
                        {{ errors.first('message') }}
                    </small>
                    <textarea class="form-control" rows="10" name="message" v-model="ticket.message" v-validate:message.initial="'required'" ></textarea>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-sm-12">
                    <label for="inputAttachments">Attachments</label>
                </div>
                <div class="col-sm-9">
                    <input type="file" class="form-control" accept=".jpg, .gif, .jpeg, .png, .zip, .pdf, .rar, .txt" v-for="index in fileQuantity" @change="addFile" :index="index">
                </div>
                <div class="col-sm-3">
                    <button type="button" class="btn btn-default btn-block btn-addFile" @click="fileQuantity++">
                        <i class="fa fa-plus"></i> Add More
                    </button>
                </div>
                <div class="col-xs-12 ticket-attachments-message text-muted">
                    Allowed File Extensions: .jpg, .gif, .jpeg, .png, .zip, .pdf, .rar, .txt
                </div>
            </div>

            <div class="form-group text-center">
                <input class="btn btn-primary" type="submit" name="save" value="Submit">
                <input class="btn btn-default" type="reset" value="Cancel">
            </div>
        </form>
    </div>
</template>

<script>
    import { bus } from '../../main.js'
    import { API_SERVER } from '../../api.js'

	export default {
        props: ['ticketId'],
		data(){
			return {
				ticket: {
					message: '',
					attachments: []
				},
				fileQuantity: 1
			}
		},
		computed: {
			currentUser(){
                return this.$store.state.user.currentUser;
            },
			fullName(){
				return this.currentUser.firstName + ' ' + this.currentUser.lastName;
			}
		},
		methods: {
			addFile(e){ 
				this.ticket.attachments[e.target.attributes.index.value] = null;
				this.ticket.attachments[e.target.attributes.index.value] = e.target.files[0];
			},
            replyTicket () {
                this.$validator.validateAll().then(() => {
                    var formData = new FormData();
                    formData.append('message', this.ticket.message);
                    this.ticket.attachments.forEach((attachments, index)=> {
                        formData.append('attachments' + index, attachments);
                    });

                    this.$http.post( API_SERVER + "/support/" + this.ticketId + "/reply", formData).then(response => {
                        this.$emit('handleTicketUpdated');
                        bus.$emit('showAlert', response.body);
                    });
                }).catch(() => {
                
                });
            }
		}
	}
</script>

<style scoped>
.errorMessage{
    color: #e18972;
    float: right;
}
.main-content {
    padding: 0;
    padding-bottom: 30px;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    padding: 20px;
}

.no-padding{
    padding: 0;
}

.btn-addFile{
    height: 39px;
}

input[type='file'].form-control {
    height: inherit;
    margin-bottom: 5px;
}
</style>