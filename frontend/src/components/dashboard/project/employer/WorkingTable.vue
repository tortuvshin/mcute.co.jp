<template>
	<div class="workingTable">
		<md-table-card>
      <md-toolbar v-show="!isSearch">
        <h1 class="md-title">
        	<span class="title">Working Jobs </span>
        	<div class="working"></div> 
        	<span class="status-text">Working</span>
        	<div class="submitted"></div> 
        	<span class="status-text">Submitted</span>
        </h1>

        <md-button class="md-icon-button" @click.native="isSearch = true">
          <md-icon>search</md-icon>
        </md-button>
      </md-toolbar>

      <md-toolbar v-show="isSearch">
        <md-icon class="search-icon">search</md-icon>
        <form flex="" class="flex" @submit.prevent="searchProject">
          <input type="text" placeholder="Search" aria-invalid="false" v-model="search.keyword">
        </form>
        <md-button class="md-icon-button" @click.native="isSearch = false">
          <md-icon>close</md-icon>
        </md-button>
        <div class="md-ripple-container"></div></button>
      </md-toolbar>

      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head style="width: 50%;">Project</md-table-head>
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
                  Selected Freelancer
                </div> 
              </div>
            </th>
            <th class="md-table-head md-sorted">
              <div class="md-table-head-container text-center">
                <div class="md-table-head-text md-test">
                  Win Bid
                </div> 
              </div>
            </th>
             <th class="md-table-head md-sorted" style="width: 13%;">
              <div class="md-table-head-container text-center">
                <div class="md-table-head-text md-test">
                  Deadline
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
          <md-table-row v-if="projects.length <= 0">
              <md-table-cell colspan="5" class="text-center no-result-text">No Working Job</md-table-cell>
          </md-table-row>
          <working-row v-for="project in projects" :project="project"></working-row>
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
	import workingRow from "./WorkingRow.vue"
	import pagePagination from 'vue-material/src/components/mdTable/mdTablePagination.vue'

	export default {
		props: ['projects', 'pageNumber', 'rowNumber', 'totalProjectCount', 'loading'],
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
  		created(){

  		},
		components: {
			workingRow,
			pagePagination
		}
	}
</script>

<style scoped>
.title{
	margin-right: 40px;
}
.working {
	display: inline-block;
	width: 10px;
	height: 10px;
	background-color: #d9edf7;
	border: 2px solid #bce8f1;
}
.submitted{
	display: inline-block;
	background-color: #fcf8e3;
	border: 2px solid #faebcc;
	width: 10px;
	height: 10px;
}

.status-text{
	font-size: 0.7em;
}

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
  font-size: 1.2em;
  font-weight: 400;
}

.flex {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    box-sizing: border-box;
}
</style>