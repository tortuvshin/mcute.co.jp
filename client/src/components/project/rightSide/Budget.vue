<template>
	<div class="div-border white padding">
         <div class="bottom-border budget-type"> 
			<span v-if="budgetType == 'fixed'"><i class="fa fa-gg" aria-hidden="true"></i> Fixed Price</span>
			<span v-else><i class="fa fa-gg" aria-hidden="true"></i> Price Range</span>
         </div>
         <div class="budget-price"> 
            <span v-if="budgetType == 'fixed'">${{ budgetMin }} </span>
			<span v-else>${{ budgetMin }} - ${{ budgetMax }} </span>
            <span class="details-text-fixed">Budget</span>
         </div>
    </div>
</template>

<script>
	export default{
		props: ['budgetType', 'budgetMin', 'budgetMax']
	}
</script>

<style scoped>
.div-border {
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2)
}

.bottom-border{
    border-bottom: 1px solid #eee;
}

.budget-type{
    font-size:1.3em;
    padding: 12px;
    font-weight: 500;
    color: #696969;
}

.budget-price{
    text-align: center;
    padding: 25px 0px;
    font-size: 2em;
    font-family: Lato;
}

.details-text-fixed{
    font-size: 0.4em;
}

.white{
    background-color: white;
}
</style>