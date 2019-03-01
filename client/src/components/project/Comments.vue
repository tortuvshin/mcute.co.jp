<template>
		 <div class="comment white padding">
		     <ul class="comment-content-section" v-if="project.comments.length > 0">
	            <li class="comment-content" v-for="comment in project.comments">
	                <app-comment :comment="comment" :employer="project.employer"></app-comment>
	            </li>
		     </ul>
		     <div class="add-comment">
		     	<textarea class="form-control" placeholder="Have questions? Ask here" @keydown.enter.prevent.stop="addComment" v-model="comment" :disabled="isProcessing || currentUser._id === project.employer._id"></textarea>
		     </div>
		 </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { API_SERVER } from '../../api.js'
	import { bus } from '../../main.js'
	import appComment from './Comment.vue'

	export default {
		props: ['project'],
		data(){
			return {
				comment: '',
				isProcessing: false
			}
		},
		components: {
			appComment
		},
		computed: {
			currentUser(){
				return this.$store.state.user.currentUser;
			}
		},
		methods: {
			addComment(){
				this.isProcessing = true;
				this.$http.post(API_SERVER + '/project/' + this.project._id + '/comment', { content: this.comment}).then(response=> {
					this.isProcessing = false;
					bus.$emit('updateProjectData');
					bus.$emit('setAlert', response.body);
					this.comment = '';
				});
			}
		}
	}
</script>

<style scoped>
	.add-comment{
		background-color: rgba(40,44,42,0.05);
   	    border: 15px solid transparent;
	}

	li{
		padding: 5px 30px;
	}

	.comment-content-section{
		background-color: rgba(40,44,42,0.05);
	}

	textarea{
		width: 100%;
	}
	ul{
		list-style-type: none;
		padding: 15px 0;
		margin: 0;
	}
</style>