<template>
    <md-table-row>
      <td class="md-table-cell md-has-action project-main">
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
      <md-table-cell class="project-bids text-center">{{project.bids}}</md-table-cell>
      <td class="md-table-cell project-countdown text-center md-has-action">

            <app-count-down :deadline="project.endDate"></app-count-down>

      </td>
    </md-table-row>
</template>

<script>
	import appCountDown from '../common/Countdown.vue'
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
    width: 60%;
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