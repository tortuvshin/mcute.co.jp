<template>
	<div class="container-fluid">
		<div class="cover-img"></div>
		<div class="profile-info-card">
			<router-view :username="currentUser.username"></router-view>
		</div>
		<reviews :username="currentUser.username" v-if="$route.name === 'MyProfile'"></reviews>
	</div>
</template>

<script>
	import reviews from '../../components/dashboard/common/Reviews.vue'

	export default {
		computed: {
			currentUser(){
				return this.$store.state.user.currentUser;
			}
		},
		components: {
			reviews
		}
	}
</script>

<style scoped>
	.cover-img{
		background: url("/assets/images/profile/default_cover_img.jpg");
        height: 400px;
        position: absolute;
		z-index: -1;
		width: 100%;
	}

	.profile-info-card{
	    position: relative;
	    width: 80%;
	    min-width: 1050px;
	    margin: 0 auto;
	    margin-top: 120px;
	    margin-bottom: 30px;
	    background: #fff;
	    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
	    z-index: 0;
	}

	.container-fluid {
		padding: 0;
		width: 100%;
	}
	.fadeOut {
	  -webkit-animation: fadeOut 0.2s; /* Safari 4+ */
	  -moz-animation:    fadeOut 0.2s; /* Fx 5+ */
	  -o-animation:      fadeOut 0.2s; /* Opera 12+ */
	  animation:         fadeOut 0.2s; /* IE 10+, Fx 29+ */
	}

	.fadeInDown{
	  -webkit-animation: fadeInDown 0.5s; /* Safari 4+ */
	  -moz-animation:    fadeInDown 0.5s; /* Fx 5+ */
	  -o-animation:      fadeInDown 0.5s; /* Opera 12+ */
	  animation:         fadeInDown 0.5s; /* IE 10+, Fx 29+ */
	}
</style>