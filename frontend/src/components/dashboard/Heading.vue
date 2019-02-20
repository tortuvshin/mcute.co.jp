<template>
	<div class="heading">
        <h2><slot name="Title"></slot></h2>
        <small><slot name="Description"></slot></small>
    </div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
	.heading{
	    padding-left: 30px;
	    padding-top: 8px;
	    padding-bottom: 15px;
	    border-bottom: 1px solid #eee;
	    margin-bottom: 30px;
	}

	h2{
	    font-size:27px;
	}
</style>