<template>
	<div class="review-wrapper">
		<div class="row">
			<div class="col-xs-6" v-for="review in reviews">
		    	<md-card>
				  <md-card-header>
				    <div class="md-title"><router-link class="md-title" :to="projectUrl(review.relatedProject._id)">{{ review.relatedProject.title }}</router-link></div>
				    <div class="md-subhead">{{ review.rater.firstName + " " + review.rater.lastName}} - {{ review.rater.type }}
				    <app-star-bar :rate="review.rateStar" style="display: inline-block;"></app-star-bar>
				    </div>
				  </md-card-header>

				  <md-card-content>
				    {{ review.rateContent}}
				  </md-card-content>
				</md-card>
			</div>
		</div>
	</div>
</template>

<script>
	import appStarBar from '../../../components/user/StarBar.vue'
	import { API_SERVER } from '../../../api.js'
	export default {
		props: ['username'],
		data(){
			return {
				reviews: []
			}
		},
		methods: {
			projectUrl(id) {
				return '/project/' + id;
			}
		},
		created(){
			this.$http.get(API_SERVER + '/profile/review', {params: { username: this.username }}).then(response => {
				this.reviews = response.body.reviews;
			});
		},
		components: {
			appStarBar
		}
	}
</script>

<style scoped>
.review-wrapper{
	min-width: 1050px;
	width: 80%;
	margin: 0 auto;
}

</style>