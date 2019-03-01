<template>
	<div>
		<span class="rating">{{ fixedRate }}</span>
		<i class="fa fa-star" aria-hidden="true" v-for="index in fillStar"></i><i class="fa fa-star-o" aria-hidden="true" v-for="index in hollowStar"></i>
	</div>
</template>

<script>
	export default {
		props: ['rate'],
		computed: {
			fillStar(){
				return parseInt(this.rate);
			},
			fixedRate(){
				return this.rate.toFixed(2);
			},
			hollowStar() {
				return 5 - parseInt(this.rate);
			}
		}
	}
</script>

<style scoped>
div{
	display: inline-block;
}

.rating{
    background: orange;
    color: white;
    padding: 1px 7px;
    border-radius: 2px;
    margin: 0 5px;
    font-family: Lato;
}
</style>