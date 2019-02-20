<template>
	<div class="container" :class="{'fullHeight': loadingData}">
        <div class="spinner" v-if="loadingData">
		  <spinner></spinner>
        </div>
        <div class="row" v-if="!loadingData">
             <div class="col-lg-8 col-md-12">
                <ol class="breadcrumb">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">{{ project.category }}</a></li>
                  <li class="active">{{ project.title | substring(100) }}</li>
                </ol>
                <div class="div-border white padding margin-bottom">
                    <div class="project-title">
                        <h3>{{ project.title }}</h3>
                    </div>

	                <div class="description">
	                    <h4 class="description-title" style="display: inline-block;">Description</h4>
	                    <div class="description-content" v-html="project.description"></div>
                        <div class="attachments" v-if="project.files.length > 0">
                             <h4>Attachments</h4>
                             <ul class="fa-ul">
                                 <app-attachment v-for="file in project.files" :employerName="project.employer.username" :file="file" :projectId="project._id"></app-attachment>
                             </ul>
                        </div>
	                    <div class="skills" v-if="project.skills.length > 0">
	                        <h4>Other Skills </h4>
	                        <span class="skill-tag" v-for="skill in project.skills">{{ skill }}</span>
	                    </div>
	                </div>
	                <app-info :project="project"></app-info>
	            </div>    
                <app-tab :project="project"></app-tab>  
	         </div>
	         <app-right-side :currentUser="currentUser" :project="project" :bid="bid"></app-right-side>
    	</div>  
        <md-speed-dial md-mode="scale" class="md-fab-bottom-right">
          <md-button class="md-fab" md-fab-trigger>
            <md-icon md-icon-morph>close</md-icon>
            <md-icon>share</md-icon>
          </md-button>

          <md-button class="md-fab md-mini md-clean" style="background-color: #3b5998; color: #fff;" @click.native="share('facebook')">
            <i class="fa fa-facebook" aria-hidden="true"></i>
            <md-tooltip md-direction="left">Share on Facebook</md-tooltip>
          </md-button>

          <md-button class="md-fab md-mini md-clean" style="background-color: #1da1f2; color: #fff;" @click.native="share('twitter')">
            <i class="fa fa-twitter" aria-hidden="true"></i>
            <md-tooltip md-direction="left">Share on Twitter</md-tooltip>
          </md-button>
        </md-speed-dial>
 	</div>
</template>

<script>
	import appAttachment from '../../components/project/Attachment.vue'
	import appInfo from '../../components/project/Info.vue'
	import appRightSide from '../../components/project/RightSide.vue'
    import appTab from '../../components/project/Tab.vue'
    import appPlaceBidModal from '../../components/project/PlaceBidModal.vue'
    import appBidTable from '../../components/project/BidTable.vue'
    
    import { modal } from 'vue-strap'
	import { API_SERVER } from '../../api.js'
	import { mapGetters } from 'vuex'
    import { bus } from '../../main.js'

	export default {
		data() {
			return {
				project: {},
                bid: {},
				loadingData: true,
				size: '30px'
			};
		},
		computed: {
			currentUser(){
                return this.$store.state.user.currentUser;
            }
		},
        methods:{
            fetchData(){
                this.$http.get(API_SERVER + '/project/' + this.$route.params.id).then(response => {
                    this.loadingData = false;
                    this.project = response.body.project;
                    this.bid = response.body.bid;
                    document.title = this.project.title + " - EcJob.com";
                });
            },
            share(platform){
                switch (platform){
                    case 'facebook':
                        var url = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href;
                        window.open(url, 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
                        break;
                    case 'twitter':
                        var url ="https://twitter.com/share?url=" + window.location.href;
                        window.open(url, 'twitterShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
                        break;
                }
            }
        },
		created(){
            document.title = "Loading Project... - EcJob.com";
			this.fetchData();
            bus.$emit('updateToolbar', 'View Project');
            bus.$on('updateProjectData', () => {
                this.fetchData();
            });
        },
		components: {
			appAttachment,
			appInfo,
			appRightSide,
            appPlaceBidModal,
            appTab,
            modal
		}
	}
</script>

<style scoped>
.spinner{
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 100%;
}

.container {
    padding: 30px 70px;
    width: 100%;
}

.fullHeight {
    height: 100%;
}

.div-border {
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2)
}

.attachments{
    margin: 50px 0px;
}

.top-border{
    border-top: 1px solid #eee;
}

.bottom-border{
    border-bottom: 1px solid #eee;
    padding: 0;
}

h2{
    margin-top: 15px;
    margin-bottom: 15px;
}

h3{
    margin:0;
}

.project-title{
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    letter-spacing: 1px;
    
}

.project-title > h3 {
    font-size: 1.5em;
}

.comment-img-col{
    min-width: 70px;
    max-width: 70px;
    width: 15%;
    text-align: center;
}

.comment-reply-img-col{
    min-width: 50px;
    max-width: 50px;
    width: 15%;
    text-align: center;
}

.description{
    padding: 40px;
    border-bottom: 1px solid #eee;
}

.comment-img{
    min-width: 40px; 
    max-width: 40%;
}

.comment-reply-img{
    min-width: 25px; 
    max-width: 25%;
}

.description-title{
    margin-bottom: 25px;
}

.description-content{
    font-size: 15px;
}

.comment-content-section{
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.comment-content{
    padding: 30px 0;
    border-top: 1px solid #eee;
}

.comment-heading{
    margin-left: 15px;
}

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

.project-status-open{
    background-color: rgb(0, 179, 89);
}

.btn-bid:hover{
    background-color: #ff748c;
    transition: 1s;
}

.confirm-freelancer-message{
    font-size: 1.6em;
    text-align: center;
    line-height: 4em;
}

.confirm-freelancer-message > span {
    font-size: 1.8em;
    font-weight: bold;
}

.center {
    margin: 0 auto;
    width: 80%;
}

#comment-row{
    margin: 20px 0px;
}

.question-user{
    display: inline-block;
}

.question-title{
    display: inline-block;
    font-weight: bold;
    margin-bottom: 5px;
}

.question-main{
    margin-left: 10px;
    width: 90%;
}

.reply{
    margin-left: 18px;
}

.btn-askQuest{
    float: right;
    margin-right: 30px;
    margin-top: 20px;
    background-color: #4D525B;
    border-color: #454951;
    color: white;
}

.btn-askQuest:hover{
    background-color: #5e636b;
    border-color: #454951;
    color: white;
}

.btn-default.focus, .btn-default:focus,.btn-default.active.focus, .btn-default.active:focus, .btn-default.active:hover, .btn-default:active.focus, .btn-default:active:focus, .btn-default:active:hover, .open>.dropdown-toggle.btn-default.focus, .open>.dropdown-toggle.btn-default:focus, .open>.dropdown-toggle.btn-default:hover{
    background-color: #70747b;
    border-color: #454951;
    color: white;
}

.white{
    background-color: white;
}

.budget-type{
    font-size:1.3em;
    padding: 12px;
    font-weight: 500;
    color: #696969;
}

.budget-price{
    text-align: center;
    padding: 25px 0px;
    font-size: 2em;
    font-family: Lato;
}

.margin-top{
    margin-top: 30px;
}

.sender-details{
    font-size: 10px;
}

.provider-avatar{
    margin: 20px 0px;
    text-align:center;
}

.comment-reply{
    margin: 20px 0px;
    list-style-type: none;
}

.comment-reply-content{
    display: block;
}

.comment-reply-sender{
    font-size: 10px;
    width: 100%;
}

.btn-reply{
    height:50px;
}

.list-of-provider{
    list-style-type: none;
    padding:0;
    margin: 0;
    margin-top: 20px;
}

.list-of-provider > li {
    border-top: 1px solid #eee;
    padding: 10px 40px;
    font-size: 16px;
}

.username, .memberSince{
    text-align: center;
    font-family: Lato;
}

.username{
    font-size: 1.5em;
    font-weight: bold;
}

.list-of-provider > li > i{
    font-size: 1.5em;
    color: #696969;
    margin-right: 20px;
}

.reply-content{
    padding: 0;
}

.provider-details{
    float:right;
    font-size: 1.3em;
}

.fade-scale {
  transform: scale(0);
  opacity: 0;
  -webkit-transition: all .25s linear;
  -o-transition: all .25s linear;
  transition: all .25s linear;
}

.fade-scale.in {
  opacity: 1;
  transform: scale(1);
}

.vertical-alignment-helper {
    display:table;
    height: 100%;
    width: 100%;
}
.vertical-align-center {
    /* To center vertically */
    display: table-cell;
    vertical-align: middle;
}
.modal-content {
    /* Bootstrap sets the size of the modal in the modal-dialog class, we need to inherit it */
    width:inherit;
    height:inherit;
    /* To center horizontally */
    margin: 0 auto;
}

.margin-bottom{
    margin-bottom: 30px;
}

#place-bid-model .modal-footer, #add-comment .modal-footer, #select-freelancer .modal-footer{
    padding: 0;
}

#amount{
    height: 50px;
    font-size: 25px;
}

.add-reply-form{
    margin-top: 15px;
}

#btn-place-bid, #btn-submit-comment, #btn-submit-freelancer{
    width:100%;
    height: 100%;
    border-radius: 0px 0px 4px 4px;
    height: 50px;
}

.messageBox{
    display: none;
}

textarea { 
    resize:vertical; 
}

thead > tr{
    background: #4D525B;
    border-color: #4D525B;
    border-radius: none;
    font-size: 12px;
    font-size: .75rem;
    line-height: 1.33;
    text-transform: uppercase;
    text-align: left;
    color: #F7F7F7;
}

.table>thead>tr>th{
    padding: 10px 20px;
}

.table>tbody>tr>td{
    background: white;
    padding: 10px 20px;
}

.table>thead>tr>th:nth-child(3),.table>thead>tr>th:nth-child(4),.table>tbody>tr>td:nth-child(3), .table>tbody>tr>td:nth-child(4){
    text-align: center;
}

.table{
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    width: 100%;
}

.comment-heading{
    cursor: pointer;
}

#bid-record-table{
    margin-top: 50px;
}

#bid-record-table > thead > tr > th{
    vertical-align: middle;
}

#bid-record-table > tbody > tr{
    font-family: Lato;
    cursor: pointer;
}

.bidder-username{
    font-size: 1.1em;
    color: #8a2be2;
}

.bidder-img{
    display: inline-block;
    margin-right: 20px;
}

.bidder-top{
    display: inline-block;
    vertical-align:top;
}

.bidder-rating, .provider-rating{
    background: orange;
    color: white;
    padding: 0 7px;
    border-radius: 2px;
    margin: 0 5px;
}

.rating{
    float: right;
}

.bidder-conutry{
    margin: 0 5px;
}

.skills{
    margin-top: 30px;
}

.skill-tag{
    background-color: #ededed;
    color: #5d5d5d;
    padding: 5px 10px;
    border-radius: 4px;
    margin: 5px;
    font-size: 0.7em;
    font-weight: 500;
    display: inline-block;
}
</style>