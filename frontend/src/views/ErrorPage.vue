<template>
	<div class="container">
		<h1>404</h1>
		<h3>{{$route.params.message}}</h3>
		<h4>The page you requested cannot be found.</h4>
		<a href="#" @click="$router.go(-2)">Return to the Pervious Page</a>
	</div>
</template>

<script>
	export default {
		created(){
			document.title = "404 NOT FOUND - EcJob.com";
		}
	}
</script>

<style scoped>
h1 {
	font-size: 10em;
	font-family: none;
}

h3 {
	font-size: 2em;
	margin: 40px 0;
}

h4 {
	margin: 50px 0;
}

.container{
	text-align: center;
	width: 100%;
	margin-top: 120px;
}
</style>