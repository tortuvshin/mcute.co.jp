<template>
    <section class="section section-shaped section-lg my-0" id="particles-js">
        <div class="shape shape-style-1 bg-gradient-default">
            
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <section class="section section-lg pt-lg-0">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-12">
                                <div class="row row-grid">
                                    <item-card v-for="project in projects" :project="project" v-if="projects.length > 0"></item-card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>
<script>
import itemCard from './components/ProjectCard.vue'
import { API_SERVER } from '../api.js'
import { bus } from '../main.js'
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
        document.title = 'Freelance Jobs - WorkFlow'
    },
    components: {
        itemCard
    }
}
</script>