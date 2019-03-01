<template>
	<div class="container-fluid">
		<div class="cover-img"></div>
		<div class="profile-info-card">
			<app-profile :username="username"></app-profile>
		</div>
		<reviews :username="username"></reviews>
	</div>
</template>

<script>
	import appProfile from '../../components/profile/Profile.vue'
	import reviews from '../../components/dashboard/common/Reviews.vue'
	export default {
		props: ['username'],
		components: {
			appProfile,
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
	}
</style>