<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>

            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <li class="nav-item">
                    <a class="nav-link" href="" v-on:click="$router.push('/');" data-toggle="tooltip" title="Star us on Github">

                        <span class="nav-link-inner--text">Home</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="" v-on:click="$router.push('/project/post');" data-toggle="tooltip" title="Star us on Github">

                        <span class="nav-link-inner--text">Space</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="" v-on:click="$router.push('/project/search');" data-toggle="tooltip" title="Star us on Github">

                        <span class="nav-link-inner--text">Artists</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="" v-on:click="$router.push('/project/post');" data-toggle="tooltip" title="Star us on Github">

                        <span class="nav-link-inner--text">Galleries</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="" v-on:click="$router.push('/project/search');" data-toggle="tooltip" title="Star us on Github">

                        <span class="nav-link-inner--text">Art Works</span>
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item" v-if="!currentUser">
                    <a class="nav-link" href="" v-on:click="$router.push('/login');" data-toggle="tooltip" title="Star us on Github">
                        <span class="nav-link-inner--text">Login</span>
                    </a>
                </li>
                <li class="nav-item" v-if="!currentUser">
                    <a class="nav-link" href="" v-on:click="$router.push('/register');" data-toggle="tooltip" title="Star us on Github">

                        <span class="nav-link-inner--text">Register</span>
                    </a>
                </li>
                <li class="nav-item" v-if="currentUser">
                
                    <base-dropdown>
                        <base-button slot="title" type="secondary" class="dropdown-toggle">
                            <!-- <img :src="avatarUrl(currentUser)" />  -->
                            {{ currentUser.firstName }} {{ currentUser.lastName }}
                        </base-button>
                        <a class="dropdown-item" href="#" v-on:click="$router.push('/dashboard');">Profile</a>
                        <a class="dropdown-item" href="#" v-on:click="$router.push('/dashboard');">Type: {{ currentUser.type }}</a>
                        <a class="dropdown-item" href="#" v-on:click="logout">Logout</a>
                    </base-dropdown>
                </li>
            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import { mapActions } from 'vuex'
import { bus } from '../main.js'

export default {

    name: "app-header",
    props: ['show'],
    computed: {
        currentUser(){
            return this.$store.state.user.currentUser;
        }
    },
    methods: {
        ...mapActions([
        'logout'
        ])
    },
    
    components: {
        BaseNav,
        CloseButton,
        BaseDropdown
    }
};

</script>
<style>
</style>
