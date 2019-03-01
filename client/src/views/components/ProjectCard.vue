<template>
    <div class="col-lg-4">
        <card class="border-0" hover shadow body-classes="py-3">
            <background v-for="file in project.files" :employerName="project.employer.username" :file="file" :projectId="project._id"></background>
            <h6 class="text-primary text-uppercase">{{project.title}}</h6>
            <p class="description mt-3">{{ project.description.substring(0,300)}} ...</p>
            <div v-if="project.skills.length > 0">
                <badge type="primary" rounded v-for="skill in project.skills" >{{skill}} </badge>
            </div>
            <base-button tag="a" href="#" type="primary" class="mt-4">
                Learn more
            </base-button>
        </card>
    </div>
</template>

<script>

import { API_SERVER } from '../../api.js'
import background from './Background.vue'
export default {
    props: ['project'],
    computed: {
        projectUrl(){
            return '/project/' + this.project._id;
        },
        projectEndDate(){
            return new Date(this.project.endDate);
        }
    },
    components: {
        background
    }
}
</script>
