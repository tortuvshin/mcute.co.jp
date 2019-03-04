<template>
    <img :src="fileUrl" class="img-fluid floating">
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
