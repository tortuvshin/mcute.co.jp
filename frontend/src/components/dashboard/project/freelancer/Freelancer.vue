<template>
	<div>
		<md-whiteframe md-elevation="1">
		    <md-tabs  md-fixed style="background-color: #fff;">
			  <md-tab id="bidding" md-label="Bidding">
				<bidding-table :bids="bidding.bids" :pageNumber="bidding.pageNumber" :rowNumber="bidding.rowNumber" :totalProjectCount="bidding.totalProjectCount" :loading="bidding.loading" @updateProject="updateProject($event, 'bidding')" @searchProject="searchProject($event, 'bidding')"></bidding-table>
			  </md-tab>

			  <md-tab id="working" md-label="Working">
			    <working-table :projects="working.projects" :pageNumber="working.pageNumber" :rowNumber="working.rowNumber" :totalProjectCount="working.totalProjectCount" :loading="working.loading" @updateProject="updateProject($event, 'working')" @searchProject="searchProject($event, 'working')"></working-table>
			  </md-tab>

			  <md-tab id="past" md-label="Finished">
			    <finished-table :projects="finished.projects" :pageNumber="finished.pageNumber" :rowNumber="finished.rowNumber" :totalProjectCount="finished.totalProjectCount" :loading="finished.loading" @updateProject="updateProject($event, 'finished')" @searchProject="searchProject($event, 'finished')"></finished-table>
			  </md-tab>
			</md-tabs>
		</md-whiteframe>
		<place-bid-modal style="padding-top: 180px;" :project="updateBid.project" :isShow="updateBid.isShow" :isUpdate="true" :bid="updateBid.bid" v-if="updateBid.isShow" @handleClose="updateBid.isShow = false"></place-bid-modal>
	</div>
</template>

<script>
	import { API_SERVER } from '../../../../api.js'
	import { bus } from '../../../../main.js'
	import biddingTable from './BidTable.vue'
	import workingTable from './WorkingTable.vue'
	import finishedTable from './FinishedTable.vue'
	import placeBidModal from '../../../project/PlaceBidModal.vue'

	export default {
		data() {
			return {
				bidding: {
					bids: [],
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
				updateBid: {
					isShow: false,
					project: null,
					bid: null
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
						if (status === 'bidding'){
							this[status].bids = response.body.bids;
						}else {
							this[status].projects = response.body.projects;
						}
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
			var projectStatus = ['bidding', 'working', 'finished'];
			this.fetchData(projectStatus);
			bus.$on('updateProject', ()=>{
				this.fetchData(projectStatus);
			});
			bus.$on('updateProjectLoading', (payload) => {
				this[payload.status].loading = payload.loading;
			});
			bus.$on('updateBid', (payload) => {
				this.updateBid.project = payload.project;
				this.updateBid.bid = payload.bid;
				this.updateBid.isShow = true;
			});
			document.title = "My Jobs - EcJob.com"
		},
		components: {
			biddingTable,
			workingTable,
			finishedTable,
			placeBidModal
		}
	}
</script>

<style scoped>

</style>