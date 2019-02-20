<template>
	<div class="row comment">
        <div class="col-xs-2 comment-img-col">
            <img :src="avatarUrl(comment.sender)" class='img-circle comment-img'></img>
        </div>
        <div class="col-xs-10">
            <div class="sender-details">
                <span :class="{'sender-name': !isProjectOwner, 'sender-name-employer': isProjectOwner }">
                	{{comment.sender.firstName}}  {{comment.sender.lastName}} -  
                	<span v-if="!isProjectOwner">{{ comment.sender.type | capitalizeFirstLetter }}</span>
                	<span v-else>Project Owner</span>
                </span>
                <span class="send-time">
                	{{comment.submitDate | moment("DD-MMMM-YYYY, h:mm:a")}} 
                </span>  
            </div>
            <div class="comment-content">
                {{ comment.content }}
            </div>
            <div class="reply-a" v-if="!isReply">
                <a href="#" @click.prevent="isReply = true">Reply</a>
            </div>
            <div class="reply-textarea" v-if="isReply">
            	<textarea class="form-control" rows="1" @keydown="inputHandler" @blur="isReply = false" v-model="replyMessage" v-focus :disabled="isProcessing"></textarea>
            </div>
            <hr v-if="comment.replies.length > 0">
            <ul class="reply-content">
                <li class="comment-reply" v-for="reply in comment.replies">
                	<app-reply :reply="reply" :employer="employer"></app-reply>
                </li>
            </ul>
            
        </div>
    </div>
</template>

<script>
	import { API_SERVER } from '../../api.js'
	import { bus } from '../../main.js'
	import appReply from './Reply.vue'

	export default {
		props: ['comment', 'employer'],
		data(){
			return {
				isReply: false,
				replyMessage: '',
				isProcessing: false
			}
		},
		computed: {
			isProjectOwner(){
				console.log("GU" ,this.comment.sender._id === this.employer._id);
				return this.comment.sender._id === this.employer._id;
			}
		},
		methods:{
			inputHandler(e) {
				if (e.keyCode === 13 && e.shiftKey) {
			        ++e.target.rows;
			    }else if (e.keyCode === 8 && e.shiftKey && e.target.rows > 1){
			    	--e.target.rows;
			    }else if (e.keyCode === 13){
			    	e.preventDefault();
			    	this.replyComment();
			    }
			},
			replyComment(){
				this.isProcessing = true;
				this.$http.post(API_SERVER + '/project/' + this.comment._id + '/comment/reply', {content: this.replyMessage}).then(response => {
					bus.$emit('updateProjectData');
					bus.$emit('setAlert', response.body);
					this.isProcessing = false;
					this.isReply = false;
					this.replyMessage = '';
				});	
			}
		},
		components: {
			appReply
		}
	}
</script>

<style scoped>
hr{
	color: #e1e2e3;
	margin: 10px;
}
.reply-textarea{
	margin-top: 5px;
}
.reply-a{
	margin-top: 5px;
	font-size: 13px;
	font-weight: 500;
}

.comment{
	background-color: #f6f7f9;
	padding: 10px 0;
	box-shadow: 1px 2px 10px rgba(119,136,153,0.2);
	display: flex;
}

.comment > div[class*='col-'] {  
  display: flex;
  flex-direction: column;
}

.sender-name{
	font-weight: 700;
    color: #365899;
    font-size: 15px;
}

.sender-name-employer{
	font-weight: 700;
    color: #993658;
    font-size: 15px;
}

.send-time{
	font-family: Lato;
	float: right;
	font-size: 13px;
}

.comment-user{
    display: inline-block;
}

.comment-img-col{
    min-width: 70px;
    max-width: 70px;
    width: 15%;
    text-align: center;
}

.comment-content{
	font-size: 0.9em;
	font-family: Lato;
	padding: 8px 0;
}

.comment-img{
	width: 100%;
}

.comment-main{
    margin-left: 10px;
    width: 90%;
}

.reply-content{
	list-style-type: none;
	padding:  0;
}
</style>