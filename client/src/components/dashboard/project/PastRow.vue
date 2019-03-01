<template>
	<tr>
		<td class="project-main">
            <div class="title">
                <router-link :to="projectUrl">{{pastWork.title}}</router-link>
            </div>
        </td>
        <td class="project-bids text-center">{{fullName}} 
        	<p class="employer-username">#{{username}}</p>
        </td>
        <td class="project-winBid text-center">${{ pastWork.winBid.bidPrice }}</td>
        <td class="project-diffDays text-center">
           	{{ finishDays }} Days
        </td>
        <td><router-link :to="viewDetailsUrl">View Details</router-link></td>
	</tr>
</template>

<script> 
	export default {
		props: ['pastWork','currentUserType'],
		computed: {
			fullName() {
				if (this.currentUserType === 'freelancer'){
					return this.pastWork.employer.firstName + ' ' + this.pastWork.employer.lastName;
				}
				return this.pastWork.winBid.bidder.firstName + ' ' + this.pastWork.winBid.bidder.lastName;
			},
			username(){
				if (this.currentUserType === 'freelancer'){
					return this.pastWork.employer.username;
				}
				return this.pastWork.winBid.bidder.username;
			},
			viewDetailsUrl() {
				return '/dashboard/project/' + this.pastWork._id + '/details'
			},
			projectUrl(){
				return '/project/' + this.pastWork._id;
			},
			finishDays(){
				var timeDiff = Math.abs(new Date(this.pastWork.finishDate).getTime() - new Date(this.pastWork.endDate).getTime());
				return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			}
		}
	}
</script>

<style scoped>
tr {
    border-bottom: 1px solid #eee;
}

td {
    vertical-align: middle!important;
    background-color: #fff;
}

.title {
	font-size: 1.2em;
	font-weight: 600;
}

.project-main{
	padding: 15px 25px !important;
}

.project-main .title a{
    color: #337ab7;
    transition: 0.3s;
}

.project-main .title a:hover{
    color: #0077ea;
    transition: 0.3s;
}

.project-winBid{
	font-family: Lato;
	font-size: 1.2em;
}

.project-diffDays{
	font-family: Lato;
	font-size: 1.1em;
}

.employer-username{
	margin: 0;
}
</style>