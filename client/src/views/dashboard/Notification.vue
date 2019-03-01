<template>
	<div id="my-info" class="main-content">
	    <app-header>
	        <h2 slot="Title">Notification Setting</h2>
	        <small slot="Description">You can update the notification setting here.</small>
	    </app-header>
	  
	   		<div class="form-group has-feedback div-content">
	   			<div class="row">
		            <div class="col-xs-4">
		                <label class="control-label" for="first_name">Enable Notification:</label>
		                <p>Toggle the notification</p>
		            </div>
		            <div class="col-xs-8">
		                <label class="switch">
        						  <input type="checkbox">
        						  <div class="slider round"></div>
        						</label>
		            </div>
	            </div>
	        </div>
	   	
	</div>
</template>

<script>
	import appHeader from '../../components/dashboard/Heading.vue'
	export default {
		components: {
			appHeader
		}
	}
</script>
<style scoped>
.main-content{
    padding: 0;
    padding-bottom: 5px;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}

.div-content {
    padding:0px 25px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>