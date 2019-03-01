<template>
	<table class="table table-hover" id="active-project-table">
        <thead>
            <tr>
                <th class="table-heading">Project Name</th>
                <th class="table-heading center" v-if="currentUser.type === 'employer'">Freelancer</th>
                <th class="table-heading center" v-else>Employer</th>
                <th class="table-heading center">Win Bid</th>
                <th class="table-heading center">Time</th>
                <th class="table-heading center">Actions</th>
            </tr>
        </thead>
        <tbody>
            <past-row v-for="pastWork in pastWorks" :pastWork="pastWork" :currentUserType="currentUser.type"></past-row>
    
            <tr v-if="pastWorks.length === 0">
                <td colspan="5" style="text-align:center;padding:8;"><i class="fa fa-frown-o" aria-hidden="true"></i> Not past project found.</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
	import pastRow from './PastRow.vue'
	export default {
		props: ['pastWorks'],
        computed: {
            currentUser(){
                return this.$store.state.user.currentUser;
            }
        },
		components: {
			pastRow
		}
	}
</script>

<style scoped>
td {
    vertical-align: middle!important;
    background-color: #fff;
}
thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
}
thead > tr {
    background: #4D525B;
    border-color: #4D525B;
    border-radius: none;
    font-size: 12px;
    font-size: .75rem;
    line-height: 1.33;
    text-transform: uppercase;
    text-align: left;
    color: #F7F7F7;
}

thead > tr > th {
    padding: 18px 20px;
}

table {
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    width: 100%;
}
</style>