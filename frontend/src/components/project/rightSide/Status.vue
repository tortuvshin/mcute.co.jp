<template>
    <div>
        <app-place-bid-modal style="padding-top: 180px;" :project="project" :isShow="showBidModal" :isUpdate="isUpdate" @handleClose="showBidModal = false" :bid="bid"></app-place-bid-modal> 
        <button class="btn-updateBid" v-if="currentUser && currentUser.type === 'freelancer' && project.status === 'open' && bid" @click="handleUpdateClick">Update bid</button>
    	<button class="btn-bid" v-else-if="currentUser && currentUser.type === 'freelancer' && project.status === 'open'" @click="showBidModal = true">Place a bid</button>
        
    	<div class="project-status" :class="[statusClass]" v-else>{{ project.status | capitalizeFirstLetter }}</div>
    </div>
</template>

<script>
    import { bus } from '../../../main.js'
    import appPlaceBidModal from '../PlaceBidModal.vue'
	export default {
        data(){
            return {
                showBidModal: false,
                isUpdate: false
            }
        },
		props: ['currentUser', 'project', 'bid'],
		computed: {
			statusClass(){
				var status = this.project.status;
				if (status == "finished"){
                 	return "project-status-finish";
	            }else if (status == "working"){
	                return "project-status-progress";
	            }else if (status == "deleted"){
	                return "project-status-deleted";
	            }else if (status == "open"){
	                return "project-status-open";
	            }else if (status == "drafted"){
                    return "project-status-unpublish";
                }
			}
		},
        methods:{
            handleUpdateClick(){
                this.showBidModal = true;
                this.isUpdate = true;
            }
        },
        components: {
            appPlaceBidModal
        }
	}
</script>

<style scoped>
.btn-bid{
    width: 100%;
    height: 60px;
    background-color: #e74c3c;
    border: 1px solid #ff5c77;
    color: white;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    transition: 1s;
    margin-bottom: 30px;
    border-radius: 4px;
}

.btn-updateBid{
    width: 100%;
    height: 60px;
    background-color: #2196F3;
    border: 1px solid #90CAF9;
    color: white;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    transition: 1s;
    margin-bottom: 30px;
    border-radius: 4px;
}

.project-status{
    text-align: center;
    padding-top: 15px;
    width: 100%;
    height: 60px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    transition: 1s;
    margin-bottom: 30px;
    border-radius: 4px;
    
}

.project-status-finish{
    background-color: #4B0082;
}

.project-status-progress {
    background-color: #ec971f;
}

.project-status-deleted{
    background-color: #db5f47;
}

.project-status-unpublish{
    background-color: #989898;
}

.project-status-open{
    background-color: rgb(0, 179, 89);
}

.btn-bid:hover{
    background-color: #ff748c;
    transition: 1s;
}

.btn-updateBid:hover{
    background-color: #64B5F6;
    transition: 1s;
}
</style>