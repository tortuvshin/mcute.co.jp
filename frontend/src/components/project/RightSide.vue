<template>
	<div class="col-lg-4 col-md-12">
		<div class="row">
			<div class="col-xs-12">
				<app-status :currentUser="currentUser" :project="project" :bid="bid"></app-status>
			</div>
			<div class="col-xs-12">
				<app-budget :budgetType="project.budgetType" :budgetMax="project.budgetMax" :budgetMin="project.budgetMin"></app-budget>
			</div>
			<div class="col-xs-12">
				<app-employer :user="project.employer"></app-employer>
			</div>
		</div>
	</div>
</template>

<script>
import appStatus from './rightSide/Status'
import appBudget from './rightSide/Budget'
import appEmployer from '../common/ProfileCard'

export default {
  props: ['currentUser', 'project', 'bid'],
  components: {
    appStatus,
    appBudget,
    appEmployer
  }
}
</script>
