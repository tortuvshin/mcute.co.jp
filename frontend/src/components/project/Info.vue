<template>
	<div class="row">
		<div class="col-xs-12">
	         <div class="details top-border">
	             <div class="col-lg-3 col-md-6 col-xs-12 details">
	                 <div class="details-content">
	                     {{ project.comments.length }} <span class="details-text-fixed">Comments</span>
	                 </div>
	             </div>
	             <div class="col-lg-3 col-md-6 col-xs-12 details"> 
	                 <div class="details-content">
	                     {{ project.bids.length }} <span class="details-text-fixed">Bids</span>
	                 </div>
	             </div>
	             <div class="col-lg-3 col-md-6 col-xs-12 details"> 
	                 <div class="details-content">
	                     <span class="details-currency">$</span>{{ averageBid }} <span class="details-text-fixed">Average bid</span>
	                 </div>
	             </div>
	             <div class="col-lg-3 col-md-6 col-xs-12 details" style="border-right:0;"> 
	                 <div class="details-content">
	                     {{ bidTimeLeft.result }} 
	                     <span class="details-text-fixed">
	                     {{ bidTimeLeft.resultText}}
	                     </span>
	                 </div>
	             </div>
	         </div>
         </div>
    </div>

</template>

<script>

	export default {
		props: ['project'],
		computed: {
			averageBid(){
				var sum = 0;
				if (this.project.bids.length <= 0){
                	return sum;
                }
                this.project.bids.forEach(function(bid){
                     sum += bid.bidPrice;
                }); 
                return sum / this.project.bids.length;       
			},
			bidTimeLeft(){
				var result = '';
				var resultText = '';
				var diffMs   =  new Date(this.project.endDate) - new Date(); 
                       // calculate (and subtract) whole days
                var diffDays = Math.floor(diffMs / 86400000); // days
                var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                var diffSecs = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000 );
                 
                if (diffDays > 0 ){ 
                    result = diffDays;
                    resultText = 'days left';
                }else if (diffHrs > 0){
                    result = diffHrs;
                    resultText = 'hours left';
                }else if (diffMins > 0){
                   	result = diffMins;
                   	resultText = 'minutes left';
                }else if (diffSecs >0){
                    result = diffSecs;
                    resultText = 'seconds left';
                } 

                return {result, resultText};
			}
		}
	}
</script>

<style scoped>
.details{
    text-align: center;
    border-right: 1px solid #eee;
    height: 50px;
    font-size: 1.4em;
    font-family: Lato;
}

.details-content{
    padding-top: 5px;
}

.details-currency{
    font-size: 0.8em;
}

.details-text-fixed{
    font-size: 0.4em;
}

.details-noborder{
    text-align: center;
    height: 50px;
    font-size: 1.5em;
}
</style>