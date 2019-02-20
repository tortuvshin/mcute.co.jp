<template>
  <div>
  	<div id="particles-js"></div>
	<div class="row">
      	<div class="col-md-6 color-left">
	       	<p>The best way to</p>
	       	<p>find a professional</p>
	        <div class="btn-wrapper">
	          <router-link to="/project/post" class="btn-left">Post a Job</router-link>
	   		</div>
	    </div>

	 <!--    <div class="col-md-2 handshake-wapper">
	       <i class="fa fa-handshake-o handshake" aria-hidden="true"></i>
	    </div> -->
	    <div class="col-md-6 color-right">
	       <p>Need a job?</p>
	       <p>Tell us your story</p>
	     	<div class="btn-wrapper">
	          <router-link to="/project/search" class="btn-right">Apply a Job</router-link>
	  		</div>
	    </div>
    </div>
   </div>
</template>

<script>
	import { API_SERVER } from '../api.js'

	export default {
		created(){
			document.title = "Home - EcJob.com";
			 particlesJS.load('particles-js', '/assets/js/particles.json');
		}
	}
</script>

<style scoped>
	h2 {
		border-bottom: 1px solid #e1e4e8;
	}
	/*prevent the y-scroll*/
	.row{
		margin: 0;
	}

	.how-it-works-wrapper{
		position: relative;
		z-index: 1;
	}

	.how-it-works-wrapper .row{
		text-align: center;
	}

	.how-it-works-wrapper .fa-icon{
		font-size: 7em;
		margin: 30px 0px;
		color: #696969;
	}

	.how-it-works-wrapper .fa-arrow-right{
		padding-top: 90px;
		font-size: 2em;
	}

	.how-it-works-wrapper .title{
		font-size: 1.5em;
		text-align: center;
		font-weight: 500;
	}

	.how-it-works-wrapper h2{
		font-size: 1.6em;
		text-align: center;
		font-family: Lato;
		background-color: #F0F0F0;
		padding: 15px 10px;
		margin: 0;
	}

	/*Jumbotron*/
	canvas {
	 	display: block;
	}

	#particles-js {
	  	position: absolute;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,0.34);
	}

	.color-left, .color-right{ 
		height: 100%;
		text-align: center;
		font-size: 50px;
		color: white;
		padding-top: 31vh;
		font-weight: 100;
		pointer-events: none;
		-webkit-touch-callout: none; /* iOS Safari */
   		-webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
  
	}

	.handshake-wapper{
		text-align: center;
		-webkit-animation: jump 1.5s ease 0s infinite normal ;
 		animation: jump 1.5s ease 0s infinite normal ;
 		pointer-events: none;
	}

	.handshake{
		height: 100vh;
		text-align: center;
		padding-top: 50vh;
		color: white;
		font-size: 5em;
	}

	
	/* Left and Right Areas End */

	.btn-left, .btn-right{
		background: transparent;
		border: 3px solid #fff;
		height: 20px;
		font-weight: 500;
		width: 167px;
		color: white!important;
		padding: 20px 30px;
		font-size: 0.35em;
		letter-spacing: 1.2px;
		transition: 0.7s;
		pointer-events: auto;
	}

	.btn-left:hover, .btn-right:hover{
		color: white;
		text-decoration: none!important;
		background: rgba(255, 255, 255, 0.2);
		transition: 0.7s;
	}

	.btn-wrapper{
		margin-top: 1em;
	}

	/* Email input area Start*/
	.input-nomargin{
		margin: 0;
	}

	.register-wrapper{
		position: relative;
		background: #fff;
		padding: 20px 100px;
		text-align: center;
		box-shadow: 2px 2px 7px #ccc;;
		z-index: 2;
	}

	.register-wrapper .register-slogan {
		font-size: 18px;
		margin:0;
	}

	/* Email input area End*/


	/*handshake-icon animation*/
	@-webkit-keyframes jump {
	  0%{
		-webkit-transform: translateY(0);
		transform: translateY(0);
	  }
	  20%{
		-webkit-transform: translateY(0);
		transform: translateY(0);
	  }
	  40%{
		-webkit-transform: translateY(-30px);
		transform: translateY(-30px);
	  }
	  50%{
		-webkit-transform: translateY(0);
		transform: translateY(0);
	  }
	  60%{
		-webkit-transform: translateY(-15px);
		transform: translateY(-15px);
	  }
	  80%{
		-webkit-transform: translateY(0);
		transform: translateY(0);
	  }
	  100%{
		-webkit-transform: translateY(0);
		transform: translateY(0);
	  }
	}

	@keyframes jump {
	  0%{
		transform: translateY(0);
	  }
	  20%{
		transform: translateY(0);
	  }
	  40%{
		transform: translateY(-30px);
	  }
	  50%{
		transform: translateY(0);
	  }
	  60%{
		transform: translateY(-15px);
	  }
	  80%{
		transform: translateY(0);
	  }
	  100%{
		transform: translateY(0);
	  }
	}
</style>