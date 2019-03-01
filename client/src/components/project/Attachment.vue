<template>
	<li><i class="fa fa-paperclip fa-fw" aria-hidden="true"></i>  <a :href="fileUrl">{{ file.originalname }}</a></li>
</template>

<script>
	import { API_SERVER } from '../../api.js'
	export default {
		props: ['file', 'employerName', 'projectId'],
		computed: {
			fileUrl(file){
				return API_SERVER + "/uploads/" + this.employerName + "/project/" + this.projectId + '/' + this.file.filename;
			}
		}
	}
</script>

<style>
.fa-ul{
	margin-left: 7px;
}
</style>