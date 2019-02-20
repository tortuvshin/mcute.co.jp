<template>
	<div class="div-border white padding margin-top">
        <div class="bottom-border heading" v-if="showTitle"> 
            {{title}}
        </div>
        <div class="avatar">
            <img :src="avatarUrl(user)" width="110px" height="110px" class='img-circle'></img>
        </div>
        <div class="bottom-border"> 
            <div class="username">
                {{ user.username }}
            </div>
            <div class="memberSince">
                Member Since&nbsp;{{ user.signUpDate | moment("DD-MMMM-YYYY") }}
            </div>
            <ul class="items">
                <li style="margin: 0;">
                    <i class="fa fa-id-card-o fa-fw" aria-hidden="true"></i>
                    <span v-if="user.type==='employer'">Project Posted </span> 
                 	<span v-else>Projects </span> 
                    <span class="item">{{ user.projects.length }}</span>
                </li>
                <li style="margin: 0;">
                 	<i class="fa fa-star fa-fw" aria-hidden="true"></i> 
                 	Rating
                 	<span class="star-bar">
                 		<app-star-bar :rate="user.rating"></app-star-bar>
                 	</span>
                </li>             
                
                <li style="margin: 0;" @click="openQRcode">
                    <md-menu md-size="4" md-direction="top left" ref="menu">
                    <span md-menu-trigger></span>
                      <md-menu-content>
                        <div class="qrcode-card">
                          <img :src="qrcode">
                          <p>Scan on 'EC-Job' Chat App</p>
                        </div>
                      </md-menu-content>
                    </md-menu>  
                    <i md-menu-trigger class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>&nbsp;Contact Me
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

	import appStarBar from '../user/StarBar.vue'
	import { API_SERVER } from '../../api.js'
	export default {
		props: {
            user: {
                type: Object,
                default: {}
            },
            showTitle: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            title() {
                if (this.user.type === 'freelancer'){
                    return "ABOUT FREELANCER";
                }
                return "ABOUT EMPLOYER";
            },
            qrcode() {
                var qrcontent = {
                    _id: this.user._id,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName
                }
                return "http://chart.apis.google.com/chart?cht=qr&chl="+ JSON.stringify(qrcontent) +"&chs=250x250"
            }
        },
        methods: {
            openQRcode(){
                this.$nextTick(()=>{
                    console.log(this.$refs);
                    this.$refs['menu'].open();
                })
            }
        },
		components: {
			appStarBar
		}
	}
</script>

<style scoped>
.qrcode-card{
    text-align: center;
}
.bottom-border{
    border-bottom: 1px solid #eee;
    padding: 0;
}

.heading{
	font-size: 1.3em;
    padding: 12px;
    font-weight: 500;
    color: #696969;
}
.margin-top{
    margin-top: 30px;
}

.star-bar{
	margin-top: 5px;
	float: right;
}

.div-border {
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2)
}

.white{
	background-color: white;
}

.avatar{
    margin: 20px 0px;
    text-align:center;
}

.username, .memberSince{
    text-align: center;
    font-family: Lato;
}

.username{
    font-size: 1.5em;
}

.items > li > i{
    font-size: 1.5em;
    color: #696969;
    margin-right: 20px;
}

.items{
    list-style-type: none;
    padding:0;
    margin: 0;
    margin-top: 20px;
}

.items > li {
    border-top: 1px solid #eee;
    padding: 10px 20px;
    font-size: 16px;
}

.item {
    float:right;
    font-size: 1.2em;
}
</style>