<template>
	<tr>
        <slot name="selectRadio"></slot>
        <td >
            <div class="bidder-img">
                <img :src="avatarUrl(bid.bidder)" width="50px" height="50px" class='img-circle'></img>
            </div>
            <div class='bidder-top'>
                <a :href="profileUrl" class="bidder-username" target="_blank">{{ bid.bidder.firstName }} {{ bid.bidder.lastName }}</a>
                <div class="bidder-conutry flag-icon" :class="bidderCountryIcon"></div> - 
                <span class="bid-time">
                  <timeago :since="bid.bidDate" :auto-update="1" locale="zh-HK"></timeago>
                </span>               
            </div>
        </td>
        <td>
            <app-star-bar :rate="bid.bidder.rating"></app-star-bar>
        </td>
        <td class="price">
            ${{ bid.bidPrice }}
        </td>
    </tr>
</template>

<script>
	import appStarBar from '../user/StarBar.vue'
    import { API_SERVER } from '../../api.js'

	export default {
		props: ['bid', 'project', 'active'],
        data(){
            return {
                radio: ''
            }
        },
		computed: {
			bidderCountryIcon(){
				return 'flag-icon-' +  this.bid.bidder.country.toLowerCase();
			},
            profileUrl() {
                return '/profile/' + this.bid.bidder.username;
            }
		},
		components: {
			appStarBar
		}
	}
</script>

<style src="flag-icon-css/css/flag-icon.css"></style>
<style scoped>
tr{
    font-family: Lato;
}

td{
    background: white;
    padding: 10px 20px;
    vertical-align:middle !important;
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
}

.bidder-conutry{
    margin: 0 5px;
}

.bid-time{
    font-size: 0.9em;
}

.price{
    font-size: 1.3em;
}
</style>