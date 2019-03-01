<template>
    <md-table-row>
      <td class="md-table-cell">
        <div class="md-table-cell-container" style="display: block;">
             <div class="md-title">
                <router-link :to="projectUrl">{{bid.bidProject.title}}</router-link>
            </div>
            <div class="budget">
                <small v-if="bid.bidProject.budgetType === 'fixed'">
                    Fixed-Price - Est. Budget ${{bid.bidProject.budgetMin}}
                </small>
                <small v-else-if="bid.bidProject.budgetType === 'range'">
                    Range - Est. Budget ${{bid.bidProject.budgetMin}} - ${{bid.bidProject.budgetMax}}
                </small>
            </div>
            <div class="description">
                <p>{{ bid.bidProject.description.substring(0,300)}} ...</p>
            </div>
            <div v-if="bid.bidProject.skills.length > 0">
                <md-chip md-static v-for="skill in bid.bidProject.skills" class="skill-tag">
                  {{skill}} 
                </md-chip>
            </div>
        </div>
      </td>
      <md-table-cell class="project-category text-center">{{bid.bidProject.category}}</md-table-cell>
      <md-table-cell class="project-bids text-center">{{bid.bidProject.bids.length}}</md-table-cell>
      <md-table-cell class="project-mybid text-center">${{bid.bidPrice}}</md-table-cell>
      <td class="md-table-cell project-countdown text-center md-has-action">
            <app-count-down :deadline="bid.bidProject.endDate"></app-count-down>
      </td>
      <md-table-cell>
        <md-button class="md-raised md-accent btn-update" @click.native="updateBid">Update Bid</md-button>
      </md-table-cell>
    </md-table-row>
</template>

<script>
    import placeBidModal from '../../../project/PlaceBidModal.vue'
    import appCountDown from '../../../project/common/Countdown.vue'
    import { API_SERVER } from '../../../../api.js'
    import { bus } from '../../../../main.js'

    export default {
        props: ['bid'],
        computed: {
            projectUrl(){
                return '/project/' + this.bid.bidProject._id;
            },
            projectEndDate(){
                return new Date(this.bid.bidProject.endDate);
            }
        },
        methods: {
            updateBid(){
                bus.$emit('updateBid', {project: this.bid.bidProject, bid: this.bid});
            }
        },
        components: {
            appCountDown,
            placeBidModal
        }
    }
</script>

<style scoped>
.btn-update{
    width: 120px!important;
}
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

.project-countdown, .project-mybid{
    font-family: Lato;
}

.project-category, .project-countdown{
    font-size: 1.1em;
}

.project-bids, .project-mybid {
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