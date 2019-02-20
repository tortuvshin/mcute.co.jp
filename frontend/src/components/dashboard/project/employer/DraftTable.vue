<template>
	<md-table-card>
		<md-table>
	        <md-table-header>
	          <md-table-row>
	            <th class="md-table-head md-sorted">
	              <div class="md-table-head-container">
	                <div class="md-table-head-text md-test">
	                  Drafted Job
	                </div> 
	              </div>
	            </th>
	            <th class="md-table-head md-sorted">
	              <div class="md-table-head-container text-center">
	                <div class="md-table-head-text md-test">
	                  BID END DATE
	                </div> 
	              </div>
	            </th>
	            <th class="md-table-head md-sorted">
	              <div class="md-table-head-container text-center">
	                <div class="md-table-head-text md-test">
	                  ACTION
	                </div> 
	              </div>
	            </th>
	          </md-table-row>
	        </md-table-header>
	        <md-table-body>
	        	<td colspan="5" style="height: 4px;">
	            <transition leave-active-class="animated fadeOut">
	               <md-progress class="md-accent" md-indeterminate v-show="loading"></md-progress>
	            </transition>
	          </td>
	          <md-table-row v-if="projects.length <= 0">
	              <md-table-cell colspan="5" class="text-center no-result-text">No Drafted Job</md-table-cell>
	          </md-table-row>
	          <draft-row v-for="project in projects" :project="project"></draft-row>
	        </md-table-body>
	      </md-table>
		  <page-pagination
	        :md-size="rowNumber"
	        :md-total="totalProjectCount"
	        :md-page="pageNumber"
	        md-label="Rows"
	        md-separator="of"
	        :md-page-options="[3, 6, 9, 12]"
	        @pagination="onPagination" style="font-family:none;"></page-pagination>
	</md-table-card>
</template>

<script>
	import draftRow from './DraftRow.vue'
	import pagePagination from 'vue-material/src/components/mdTable/mdTablePagination.vue'

	export default {
		props: ['projects', 'pageNumber', 'rowNumber', 'totalProjectCount', 'loading'],
		methods: {
			onPagination(event){
	          this.rowNumber = event.size;
	          this.pageNumber = event.page;
	          this.$emit('updateProject', {rowNumber: this.rowNumber, pageNumber: this.pageNumber});
	        }
		},
		components: {
			draftRow,
			pagePagination
		}
	}
</script>

<style scoped>
.no-result-text{
  font-size: 1.1em;
  font-weight: 400;
}
</style>