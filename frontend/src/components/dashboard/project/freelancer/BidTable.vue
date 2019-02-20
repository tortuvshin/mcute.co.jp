<template>
	<div class="openTable">
		<md-table-card>
      <md-toolbar v-show="!isSearch">
        <h1 class="md-title">Bidding Jobs</h1>

        <md-button class="md-icon-button" @click.native="isSearch = true">
          <md-icon>search</md-icon>
        </md-button>
      </md-toolbar>

      <md-toolbar v-show="isSearch">
        <md-icon class="search-icon">search</md-icon>
        <form flex="" class="flex" @submit.prevent="searchProject">
          <input type="text" ng-model="query.filter" ng-model-options="filter.options" placeholder="Search" class="ng-pristine ng-untouched ng-valid" aria-invalid="false" v-model="search.keyword">
        </form>
        <md-button class="md-icon-button" @click.native="isSearch = false">
          <md-icon>close</md-icon>
        </md-button>
        <div class="md-ripple-container"></div></button>
      </md-toolbar>

      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head>Project</md-table-head>
            <th class="md-table-head md-sorted">
              <div class="md-table-head-container text-center">
                <div class="md-table-head-text md-test">
                  Project Type
                </div> 
              </div>
            </th>
            <th class="md-table-head md-sorted">
              <div class="md-table-head-container text-center">
                <div class="md-table-head-text md-test">
                  Totel Bids
                </div> 
              </div>
            </th>
            <th class="md-table-head md-sorted">
              <div class="md-table-head-container text-center">
                <div class="md-table-head-text md-test">
                  My Bid
                </div> 
              </div>
            </th>
            <th class="md-table-head md-sorted">
              <div class="md-table-head-container text-center">
                <div class="md-table-head-text md-test">
                  Time Remaining
                </div> 
              </div>
            </th>
            <th class="md-table-head md-sorted">
              <div class="md-table-head-container text-center">
                <div class="md-table-head-text md-test">
                  Action
                </div> 
              </div>
            </th>
          </md-table-row>
        </md-table-header>
        <md-table-body>
        	<td colspan="6" style="height: 4px;">
            <transition leave-active-class="animated fadeOut">
               <md-progress class="md-accent" md-indeterminate v-show="loading"></md-progress>
            </transition>
          </td>
          <md-table-row v-if="bids.length <= 0">
              <md-table-cell colspan="6" class="text-center no-result-text">No Bidding Job</md-table-cell>
          </md-table-row>
          <bid-row v-for="bid in bids" :bid="bid"></bid-row>
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
  </div>
</template>

<script>
	import bidRow from "./BidRow.vue"
	import pagePagination from 'vue-material/src/components/mdTable/mdTablePagination.vue'

	export default {
		props: ['bids', 'pageNumber', 'rowNumber', 'totalProjectCount', 'loading'],
		data() {
  			return {
  			  search: {
				keyword: '',
				category: ''
  			  },
  	     	  isSearch: false,
  			}
  		},
  		methods: {
  			onPagination(event){
	       		var rowNumber = event.size;
          		var pageNumber = event.page;
          		this.$emit('updateProject', {rowNumber: rowNumber, pageNumber: pageNumber});
	        },
       		searchProject(){
          		var keyword = this.search.keyword;
          		this.$emit('searchProject', keyword);
       		}
  		},
		components: {
			bidRow,
			pagePagination
		}
	}
</script>

<style scoped>
.no-result-text{
  font-size: 1.1em;
  font-weight: 400;
}

form > input {
    width: 100%;
    margin: 0;
    border: none;
    color: rgba(0, 0, 0, 0.87);
    font-family: Roboto,"Helvetica Neue",sans-serif;
    font-size: 22px;
    outline: none;
}

form{
  margin-left: 16px;
}

.search {
  min-width: 930px;
}

.search-icon {
  color: rgba(0,0,0,.54);
}

.no-result-text{
  font-size: 1.1em;
  font-weight: 400;
}

.flex {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    box-sizing: border-box;
}
</style>