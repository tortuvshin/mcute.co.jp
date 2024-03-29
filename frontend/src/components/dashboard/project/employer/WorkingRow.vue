<template>
    <md-table-row>
      <td class="md-table-cell" :style="{'background-color': internalStatus.color}">
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
      <md-table-cell class="project-category text-center" :style="{'background-color': internalStatus.color}">{{project.category}}</md-table-cell>
      <md-table-cell class="project-winbid-bidder text-center" :style="{'background-color': internalStatus.color}">{{project.winBid.bidder.firstName + " " +  project.winBid.bidder.lastName}}</md-table-cell>
      <md-table-cell class="project-winbid-price text-center" :style="{'background-color': internalStatus.color}">${{project.winBid.bidPrice}}</md-table-cell>
      <td class="md-table-cell project-countdown text-center md-has-action" :style="{'background-color': internalStatus.color}">
            <app-count-down :deadline="project.chosenDate"></app-count-down>
      </td>
      <td class="md-table-cell text-center md-has-action" :style="{'background-color': internalStatus.color}">
        <div class="md-table-cell-container">
            <span class="internalStatus" :style="{color: internalStatus.color}">{{internalStatus.status}}</span>

            <md-button class="md-raised" @click.native="moveToDetailsPage">View Details</md-button>
        </div>
      </td>
    </md-table-row>
</template>

<script>
import appCountDown from '../../../project/common/Countdown'
import { API_SERVER } from '../../../../api.js'
import { bus } from '../../../../main.js'

export default {
  props: ['project'],
  computed: {
    projectUrl () {
      return '/project/' + this.project._id
    },
    winBidPrice () {
      if (this.project.winBid === undefined) {
        return '---'
      }
      return '$' + this.project.winBid.bidPrice
    },
    internalStatus () {
      switch (this.project.internalStatus) {
        case 2:
          return { color: '#d9edf7', status: 'Working' }
          break
        case 3:
          return { color: '#fcf8e3', status: 'Submitted' }
          break
      }
    }
  },
  methods: {
    selectFreelancerAndDeadline () {
      bus.$emit('showSelectFreelancerModal', this.project)
    },
    moveToDetailsPage () {
      this.$router.push('/dashboard/project/' + this.project._id + '/details')
    }
  },
  components: {
    appCountDown
  }
}
</script>

<style scoped>
.md-table-cell-container{
    display: block!important;
}
td {
    vertical-align: middle!important;
    background-color: #fff;
    padding: 10px;
}

small{
    font-size: 1.1em;
}

.md-raised{
    width: 125px!important;
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

.project-countdown, .project-winbid-price{
    font-family: Lato;
}

.project-category, .project-countdown, .project-winbid-bidder{
    font-size: 1.1em;
}

.project-winbid-price {
    font-size: 1.2em;
}

.project-category, .project-winbid-bidder{
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

.internalStatus{
    font-weight: 500;
    font-size: 1.3em;
    padding-bottom: 10px;
}
</style>
