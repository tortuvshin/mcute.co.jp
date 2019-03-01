<template>
	<div class="row comment-reply">
        <div class="col-xs-1 comment-reply-img-col">
    		<img :src="avatarUrl(reply.sender)" class='img-circle comment-reply-img'></img>
        </div>
        <div class="col-xs-11">
            <div class="comment-reply-sender">
                <em>
                	<span :class="{'comment-reply-sender-name': !isProjectOwner, 'comment-reply-sender-name-employer': isProjectOwner }">
	                	<strong>
	                		{{reply.sender.firstName}}  {{reply.sender.lastName}} -  
	                		<span v-if="!isProjectOwner">{{ reply.sender.type | capitalizeFirstLetter }}</span>
	                		<span v-else>Project Owner</span>
	                	</strong>
                	</span>
	                <span class="comment-reply-time">
	                	{{reply.submitDate| moment("DD-MMMM-YYYY, h:mm:a")}}
	                </span>
                </em>
            </div>
            
            <p class="comment-reply-content">
            	{{reply.content}}
            </p>
        </div>
    </div>
</template>

<script>
	import { API_SERVER } from '../../api.js'
	export default {
		props: ['reply', 'employer'],
		computed: {
			replierAvatar() {
				if (this.reply.sender.avatar !== undefined){
					return API_SERVER + "/uploads/" + this.reply.sender.username + "/avatar/" + this.reply.sender.avatar.filename;
				}
				return API_SERVER + '/uploads/default_avatar_male.jpg';
			},
			isProjectOwner(){
				return this.reply.sender._id === this.employer._id;
			}
		}
	}
</script>

<style scoped>
.comment-reply{
	display: flex;
}

.comment-reply > div[class*='col-'] {  
  display: flex;
  flex-direction: column;
}

.comment-reply-img-col{
    text-align: center;
    min-width: 60px;
    max-width: 60px;
    width: 15%;
}

.comment-reply-img{
	width: 100%;
}

.comment-reply-sender-name{
	font-weight: 600;
    color: #365899;
    font-size: 15px;
}

.comment-reply-sender-name-employer{
	font-weight: 600;
    color: #993658;
    font-size: 15px;
}

.comment-reply-time{
	font-family: Lato;
	float: right;
	font-size: 13px;
}

.comment-reply-content{
	font-size: 0.9em;
	font-family: Lato;
}
</style>