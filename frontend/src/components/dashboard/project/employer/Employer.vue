<template>
	<div>
		<draft-table :projects="drafted.projects" :pageNumber="drafted.pageNumber" :rowNumber="drafted.rowNumber" :totalProjectCount="drafted.totalProjectCount" :loading="drafted.loading" @updateProject="updateProject($event, 'drafted')"></draft-table>
		<br>
		<md-whiteframe md-elevation="1">
		    <md-tabs  md-fixed style="background-color: #fff;">
			  <md-tab id="open" md-label="Open">
				<open-table :projects="open.projects" :pageNumber="open.pageNumber" :rowNumber="open.rowNumber" :totalProjectCount="open.totalProjectCount" :loading="open.loading" @updateProject="updateProject($event, 'open')" @searchProject="searchProject($event, 'open')"></open-table>
			  </md-tab>

			  <md-tab id="pending" md-label="Pending">
			    <pending-table :projects="pending.projects" :pageNumber="pending.pageNumber" :rowNumber="pending.rowNumber" :totalProjectCount="pending.totalProjectCount" :loading="pending.loading" @updateProject="updateProject($event, 'pending')" @searchProject="searchProject($event, 'pending')"></pending-table>
			  </md-tab>

			 <md-tab id="working" md-label="Working">
			    <working-table :projects="working.projects" :pageNumber="working.pageNumber" :rowNumber="working.rowNumber" :totalProjectCount="working.totalProjectCount" :loading="working.loading" @updateProject="updateProject($event, 'working')" @searchProject="searchProject($event, 'working')"></working-table>
			  </md-tab>

			  <md-tab id="past" md-label="Finished">
			    <finished-table :projects="finished.projects" :pageNumber="finished.pageNumber" :rowNumber="finished.rowNumber" :totalProjectCount="finished.totalProjectCount" :loading="finished.loading" @updateProject="updateProject($event, 'finished')" @searchProject="searchProject($event, 'finished')"></finished-table>
			  </md-tab>
			</md-tabs>
		</md-whiteframe>
		<select-freelancer-modal :isUpdate="false"></select-freelancer-modal>
	</div>
</template>

<script>
	import { API_SERVER } from '../../../../api.js'
	import { bus } from '../../../../main.js'
	import draftTable from './DraftTable.vue'
	import openTable from './OpenTable.vue'
	import workingTable from './WorkingTable.vue'
	import finishedTable from './FinishedTable.vue'
	import pendingTable from './PendingTable.vue'
	import selectFreelancerModal from './SelectFreelancerModal.vue'

	export default {
		data() {
			return {
				open: {
					projects: [],
					pageNumber: 1,
			        rowNumber: 3,
			        totalProjectCount: 0,
					loading: false,
					keyword: ''
				},
				pending: {
					projects: [],
					pageNumber: 1,
			        rowNumber: 3,
			        totalProjectCount: 0,
					loading: false,
					keyword: ''
				},
				working: {
					projects: [],
					pageNumber: 1,
			        rowNumber: 3,
			        totalProjectCount: 0,
					loading: false,
					keyword: ''
				},
				finished: {
					projects: [],
					pageNumber: 1,
			        rowNumber: 3,
			        totalProjectCount: 0,
					loading: false,
					keyword: ''
				},
				drafted: {
					projects: [],
					pageNumber: 1,
			        rowNumber: 3,
			        totalProjectCount: 0,
					loading: false,
					keyword: ''
				}
			}
		},
		methods: {
			fetchData(projectStatus){
				projectStatus.forEach((status)=>{
					bus.$emit('setRefreshButtonStatus', true);
					this[status].loading = true;
					this.$http.get(API_SERVER + '/dashboard/project', 
									{params: { 
										status: status, 
										pageNumber: this[status].pageNumber,
										rowNumber: this[status].rowNumber,
										keyword: this[status].keyword
									}})
					.then(response=> {
						bus.$emit('setRefreshButtonStatus', false);
						this[status].loading = false;
						this[status].projects = response.body.projects;
						this[status].totalProjectCount = response.body.totalProjectCount;
					
					});
				})
			},
			updateProject(data, status){
				this[status].pageNumber = data.pageNumber;
				this[status].rowNumber = data.rowNumber;
				this.fetchData([status]);
			},
			searchProject(keyword, status){
				this[status].keyword = keyword;
				this.fetchData([status]);
			}
		},
		created(){
			var projectStatus = ['open', 'pending', 'working', 'finished', 'drafted'];
			this.fetchData(projectStatus);
			bus.$on('updateProject', ()=>{
				this.fetchData(projectStatus);
			});
			bus.$on('updateProjectLoading', (payload) => {
				this[payload.status].loading = payload.loading;
			});
			document.title = "My Jobs - EcJob.com"
		},
		components: {
			openTable,
			workingTable,
			finishedTable,
			draftTable,
			pendingTable,
			selectFreelancerModal
		}
	}
</script>

<style scoped>

</style>