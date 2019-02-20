<template>
    <md-table-row>
      <td class="md-table-cell">
        <div class="md-table-cell-container" style="display: block;">
             <div class="md-title">
                <router-link :to="projectUrl">{{project.title}}</router-link>
            </div>
            <div class="budget">
                <small v-if="project.budgetType === 'fixed'">
                    Fixed-Price - Est. Budget ${{project.budgetMin}}
                </small>
                <small v-else-if="project.budgetType === 'range'">
                    Range - Est. Budget ${{project.budgetMin}} - ${{project.budgetMax}}
                </small>
            </div>
            <div class="description">
                <p>{{ project.description.substring(0,300)}} ...</p>
            </div>
            <div v-if="project.skills.length > 0">
                <md-chip md-static v-for="skill in project.skills" class="skill-tag">
                  {{skill}} 
                </md-chip>
            </div>
        </div>
      </td>
      <md-table-cell class="project-category text-center">{{project.category}}</md-table-cell>
      <md-table-cell class="project-bids text-center">{{project.bids.length}}</md-table-cell>
      <td class="md-table-cell project-countdown text-center md-has-action">
            <app-count-down :deadline="project.endDate"></app-count-down>
      </td>
      <md-table-cell>
        <div class="dropdown">
            <md-menu md-align-trigger>
              <md-button md-menu-trigger md-theme="button" class="md-raised md-primary" style="width:100px;">Actions</md-button>
              <md-menu-content>
                <md-menu-item @click.native="unPublish">Unpublish</md-menu-item>
                <md-menu-item @click.native="edit">Edit</md-menu-item>
                <md-menu-item @click.native="selectFreelancer">Select Freelancer</md-menu-item>
              </md-menu-content>
            </md-menu>
        </div>
      </md-table-cell>
    </md-table-row>
</template>

<script>
    import appCountDown from '../../../project/common/Countdown.vue'
    import { API_SERVER } from '../../../../api.js'
    import { bus } from '../../../../main.js'

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
        methods: {
            unPublish(){
                bus.$emit('updateProjectLoading', {status: 'open', loading: true});
                if (confirm('To unpublish this project, we will return $' + this.project.budgetMax + ' to your wallet! Are you sure?')) {
                    this.$http.put(API_SERVER + '/project/' + this.project._id + '/publish', {publish: false}).then(response=> {
                        bus.$emit('showAlert', response.body);
                        bus.$emit('updateProject');
                        bus.$emit('updateProjectLoading', {status: 'open', loading: false});
                        this.$store.commit('setCurrentUser', response.body.updatedUser);
                    }, response=>{
                        bus.$emit('showAlert', response.body);
                    }); 
                }   
            },
            edit(){
                this.$router.push({path: '/project/' + this.project._id + '/edit'});
            },
            selectFreelancer(){
                bus.$emit('showSelectFreelancerModal', this.project);
            }
        },
        components: {
            appCountDown
        }
    }
</script>

<style scoped>

td {
    vertical-align: middle!important;
    background-color: #fff;
    padding: 10px;
}

small{
    font-size: 1.1em;
}

.project-main{
  width: 50%;
}

.title{
    margin-top: 5px;
    font-size: 1.3em;
}

.title a{
    color: #337ab7;
    transition: 0.3s;
}

.title a:hover{
    color: #0077ea;
    transition: 0.3s;
}

.budget{
    margin-top: 5px;
    margin-bottom: 10px;
    color: #7d7d7d;
    font-family: Lato;
}

.description{
    color: #494949;
    line-height: 1.42857;
}

.project-countdown{
    font-family: Lato;
}

.project-category, .project-countdown{
    font-size: 1.1em;
}

.project-bids {
    font-size: 1.3em;
}

.project-category{
    font-weight: 500;
}

.remind{
    color: red;
    font-weight: bold;
}

.skills{
    color: #7d7d7d;
}

.skill-tag{
    margin-right: 8px;
    margin-bottom: 8px;
}
</style>