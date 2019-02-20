<template>
	<div class="container-fluid">
        <div class="search">
              <md-table-card>
                <md-toolbar v-show="!isSearch">
                  <h1 class="md-title">Browse</h1>
                  <md-button class="md-icon-button">
                    <md-icon>filter_list</md-icon>
                  </md-button>

                  <md-button class="md-icon-button" @click.native="isSearch = true">
                    <md-icon>search</md-icon>
                  </md-button>
                </md-toolbar>

                <md-toolbar v-show="isSearch">
                  <md-icon class="search-icon">search</md-icon>
                  <form flex="" class="flex" @submit.prevent="fetchData()">
                    <input type="text" ng-model="query.filter" ng-model-options="filter.options" placeholder="Search" aria-invalid="false" v-model="search.keyword">
                  </form>
                  <md-button class="md-icon-button" @click.native="isSearch = false">
                    <md-icon>close</md-icon>
                  </md-button>
                  <div class="md-ripple-container"></div></button>
                </md-toolbar>

                <md-table>
                  <md-table-header>
                    <md-table-row>
                      <md-table-head style="width:60%;">Project</md-table-head>
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
                            Time Remaining
                          </div> 
                        </div>
                      </th>
                    </md-table-row>
                  </md-table-header>
                  <md-table-body>
                     <td colspan="4" style="height: 4px;">
                      <transition leave-active-class="animated fadeOut">
                         <md-progress class="md-accent" md-indeterminate v-show="loadProgress"></md-progress>
                      </transition>
                    </td>
                    <md-table-row v-if="projects.length <= 0 && !loadProgress">
                        <md-table-cell colspan="4" class="text-center no-result-text">No result found.</md-table-cell>
                    </md-table-row>
                    <app-project-row v-for="project in projects" :project="project" v-if="projects.length > 0"></app-project-row>
                  </md-table-body>
                </md-table>

            <page-pagination
                  :md-size="rowNumber"
                  :md-total="totalProjectCount"
                  :md-page="pageNumber"
                  md-label="Rows"
                  md-separator="of"
                  :md-page-options="[5, 10, 25, 50]"
                  @pagination="onPagination" style="font-family:Lato;"></page-pagination>
              </md-table-card>
        </div>
     </div>
</template>

<script>
    import svgBackground from '../../components/common/svgBackground.vue'
    import appProjectRow from '../../components/project/search/ProjectRow.vue'
  	import { API_SERVER } from '../../api.js'
    import { bus } from '../../main.js'
    import pagePagination from 'vue-material/src/components/mdTable/mdTablePagination.vue'
  	export default {
  		data() {
  			return {
          pageNumber: 1,
          rowNumber: 5,
          totalProjectCount: 0,
  				projects: [],
  				loadProgress: false,
  				search: {
  					keyword: '',
  					category: ''
  				},
          isSearch: false
  			}
  		},
  		methods: {
  			fetchData() {
          this.loadProgress = true;
  				this.$http.get(API_SERVER + '/project/search', {params: { keyword: this.search.keyword, category: this.search.category, pageNumber: this.pageNumber, rowNumber: this.rowNumber}}).then(response => {
            this.loadProgress = false;
  					this.projects = response.body.projects;
            this.totalProjectCount = response.body.totalProjectCount;
  				});
  			},
        onPagination(event){
          bus.$emit('scolltoTop');
          this.rowNumber = event.size;
          this.pageNumber = event.page;
          this.fetchData();
        }
  		},
  		created(){
       		this.fetchData();
          document.title = 'Freelance Jobs - EcJob.com'
  		},
  		components: {
          appProjectRow,
          svgBackground,
          pagePagination
  		}
  	}
</script>

<style scoped>
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

.container-fluid {
    margin: 30px 40px;
}

thead > tr{
    text-transform: uppercase;
}

tbody > tr > td {
    background: white;
}

td, th {
    vertical-align: middle;
}
</style>