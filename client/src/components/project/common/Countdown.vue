<template>
    <span v-if="days == 0 && hours == 0" class="remind"><p class="date">Today</p><i class="fa fa-clock-o fa-fw" aria-hidden="true"></i>{{ minutes }}m {{ seconds }}s</span>
    <span v-else-if="days == 0"><p class="date">Today</p><i class="fa fa-clock-o fa-fw" aria-hidden="true"></i>{{ hours }}h {{ minutes }}m</span>
    <span v-else><p class="date">{{this.deadline | moment('MMM DD ,YYYY')}}</p><i class="fa fa-clock-o fa-fw" aria-hidden="true"></i>{{ days }} days</span>
 
</template>

<script>
import Vue from 'vue'
Vue.filter('two_digits', function (value) {
    if(value.toString().length <= 1)
    {
        return "0"+value.toString();
    }
    return value.toString();
});
export default {
    props: ['deadline'],
    data() {
        return {
            now: Math.trunc((new Date()).getTime() / 1000),
            date: null
        }
    },
    watch: {
        deadline(val){
            this.date = Math.trunc(Date.parse(this.deadline) / 1000)
        }
    },
    mounted() {
        this.date = Math.trunc(Date.parse(this.deadline) / 1000)
        setInterval(() => {
            this.now = Math.trunc((new Date()).getTime() / 1000)
        }, 1000)
    },
    computed: {
        seconds() {
            return Math.trunc(this.date - this.now) % 60
        },
        minutes() {
            return Math.trunc((this.date - this.now) / 60) % 60
        },
        hours() {
            return Math.trunc((this.date - this.now) / 60 / 60) % 24
        },
        days() {
            return Math.trunc((this.date - this.now) / 60 / 60 / 24)
        }
    }
}
</script>

<style scoped>
i{
    color:#C0C0C0;
}
.date{
    margin:0;
}

.remind {
    color: red;
    font-weight: 600;
}
</style>