<template>
	<div class="container">
      <div class="heading">
        <ol class="breadcrumb">
           <li><router-link to="/">Home</router-link></li>
           <li class="active">Post A Art work</li>
        </ol>
      </div>
      <form class="form-horizontal" @submit.prevent="onSubmit">
        <div class="panel">
          <div class="panel-header">
            <div class="step-no">1</div>
            <div class="step-title">Choose a category <span class="required">*</span></div>
          </div>
          <div class="panel-content">
             <select id="project-category" v-model="project.category" class="form-control input-lg" name="category" required>
                <option value="" disabled>Select your option</option>
                <option value="Abstract Art">Abstract Art</option>
                <option value="Collectible Sculptures">Collectible Sculptures</option>
                <option value="Contemporary">Contemporary</option>
                <option value="Modern">Modern</option>
                <option value="Pop Art">Pop Art</option>
             </select>
          </div>
        </div>
        <div class="panel">
         <!-- Project Title Section-->
          <div class="panel-header">
            <div class="step-no">2</div>
            <div class="step-title">Name your art work posting <span class="required">*</span></div>
          </div>
          <div class="panel-content">
               <input type="text" class="form-control input-lg" v-model="project.title" name="title" placeholder="Enter Job Title" required>
          </div>
        </div>
        <div class="panel">
         <!-- Project Description Section -->
          <div class="panel-header">
            <div class="step-no">3</div>
            <div class="step-title">Describe the work to be done <span class="required">*</span></div>
          </div>
          <div class="panel-content">
             <vue-editor v-model="project.description"></vue-editor>
          </div>
        </div>
         <!-- Project File Upload Section -->
         <div class="panel">
          <div class="panel-header">
            <div class="step-no">4</div>
            <div class="step-title">Attachments</div>
          </div>
          <div class="panel-content">
            	<table v-if="project.files.length > 0">
              		<tr>
              			<td></td>
              			<th>File Name</th>
              			<th>File Size</th>
              			<th>Action</th>
              		</tr>
                  <tr v-for="(file,index) in project.files">
                  	<td><i class="fa fa-file fa-2x" aria-hidden="true"></i></td>
					        	<td>{{file.name}}</td>
					        	<td>{{file.size | bytesToSize}}</td>
					      	    <td><input type='button' class='file-delete-btn btn btn-danger' value='Delete' @click="deleteFile(index)"></td>
				         </tr>
		        	</table>
              <div class="section file-upload">
                <app-file-uploader @handleFileUploaded="handleFileUploaded"></app-file-uploader>
              </div>
          </div>
        </div>
        <div class="panel">
         <!--Skill required-->
          <div class="panel-header">
            <div class="step-no">5</div>
            <div class="step-title">Skills Required</div>
          </div>
          <div class="panel-content">
            <md-chips v-model="project.skills">
              <template scope="chip">{{ chip.value }}</template>
            </md-chips>
          </div>
        </div>

         <!-- End Date Section-->
         <div class="panel">
          <div class="panel-header">
            <div class="step-no">6</div>
            <div class="step-title">Bid end date of the project <span class="required">*</span></div>
          </div>
          <div class="panel-content">
             <input class="form-control input-lg" type="date" v-model="project.endDate" name="endDate" :min="todayDate()" required>
          </div>
        </div>
         <!-- Project Budget  Section -->
        <div class="panel">
          <div class="panel-header">
            <div class="step-no">7</div>
            <div class="step-title">What budget do you have in mind? <span class="required">*</span></div>
          </div>
          <div class="panel-content">
             <div class="budget-type-selector">
                <div>
                  <md-radio v-model="project.budgetType" name="budget-type" md-value="range">Price Range</md-radio>
                  <md-radio v-model="project.budgetType" name="budget-type" md-value="fixed">Fixed Price</md-radio>
                </div>
             </div>
             <div class="budget-type-content">
                <div class="input-group">
                  <span class="input-group-addon">$</span>
                    <input type="number" class="form-control input-lg project-budget" name="budgetMin" v-model="project.budgetMin" placeholder="$0" required>
                </div>
                <template v-if="project.budgetType === 'range'">
               	 <span style="font-size: 1.4em;">-</span>
                 <div class="input-group">
                  <span class="input-group-addon">$</span>
               	     <input type="number" class="form-control input-lg project-budget" name="budgetMax" v-model="project.budgetMax" placeholder="$5000" required>
                 </div>
                </template>
             </div>
          </div>
        </div>
        <div class="text-right">
            <md-button class="md-raised md-primary btn-submit" type="submit">Submit</md-button>
        </div>
      </form>
  </div>
</template>

<script>
import { API_SERVER } from '../../api.js'
import { bus } from '../../main.js'
import { VueEditor } from 'vue2-editor'
import AppFileUploader from '../../components/common/FileUploader'

export default {
  name: 'PostProject',
  data () {
	      return {
	        project: {
	        	description: null,
	        	budgetMin: 0,
	        	budgetMax: 0,
	        	budgetType: 'range',
	        	endDate: null,
	        	skills: [],
	        	title: null,
	        	category: '',
	        	files: []
	        }
	      }
	    },
	    filters: {
	    	bytesToSize (bytes) {
	    		if (bytes >= 1000000000) { bytes = (bytes / 1000000000).toFixed(2) + ' GB' } else if (bytes >= 1000000) { bytes = (bytes / 1000000).toFixed(2) + ' MB' } else if (bytes >= 1000) { bytes = (bytes / 1000).toFixed(2) + ' KB' } else if (bytes > 1) { bytes = bytes + ' bytes' } else if (bytes == 1) { bytes = bytes + ' byte' } else { bytes = '0 byte' }
		        return bytes
	    	}
	    },
  components: {
    VueEditor,
    AppFileUploader
  },
  methods: {
	      handleUpdatedContent: function (value) {
	        this.project.description = value
	      },
	      handleFileUploaded (file) {
	      	this.project.files.push(file)
	      },
	      deleteFile (index) {
	      	this.project.files.splice(index, 1)
	      },
	      onSubmit () {
  	      	var formData = new FormData()
      			formData.append('description', this.project.description)
      			formData.append('skills', JSON.stringify(this.project.skills))
      			formData.append('category', this.project.category)
      			formData.append('budgetType', this.project.budgetType)
      			formData.append('budgetMax', this.project.budgetMax)
      			formData.append('budgetMin', this.project.budgetMin)
      			formData.append('endDate', this.project.endDate)
      			formData.append('title', this.project.title)

      			this.project.files.forEach((file, index) => {
      				formData.append('file' + index, file)
      			})

      			this.$http.post(API_SERVER + '/project/', formData).then(response => {
      				console.log(response.body)
              this.$store.commit('setCurrentUser', response.body.updatedUser)
              this.$router.push('/project/' + response.body.projectId)
      			}, response => {
      				console.log(response.body)
      			})
	      }
	    },
	    created () {
	    	document.title = 'Post a Project - WorkFlow'
	    }
}
</script>

<style scoped>
.container {
  padding: 20px 55px;
  width: 100%;
}

.required{
  color: #d9534f;
  font-size: 1.5em;
}

.project-currency{
	width: 130px;
	display:inline-block;
}

.input-group {
    display: inline-table;
    vertical-align: middle;

}

.input-group-addon,
.input-group-btn,
.input-group .form-control {
    width: auto !important;
}

.budget-type-selector{
  margin-bottom: 0!important;
}

.heading h2 {
  display: inline-block;
  vertical-align: middle;
  color: #000;
}

.main-content{
	background-color: white;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	padding: 0;
}

.file-upload {
    border: 1px dashed #BEC0C2;
    padding: 20px;
    margin-top: 10px;
}

.file-upload-error{
    font-family: Lato;
    text-align: center;
    font-size: 30px;
    color: white;
    display: none;
    z-index:1;
    position: absolute;
    padding-top: 23px;
    background: rgba(217, 83, 79, 0.9);
    width: 730px;
    height: 93px;
}

.budget-type-selector{
    margin-bottom: 30px;
}

.vertical-center {
  min-height: 6vh; /* These two lines are counted as one :-)       */
  display: flex;
  align-items: center;
}

.error_message{
  padding-right: 50px;
}

.panel{
  border: 1px solid rgba(0,0,0,0.15);
}

.panel-header {
  border-bottom: 1px solid rgba(0,0,0,0.15);
  font-size: 1.2em;
  font-weight: 600;
}

.panel-content {
  padding: 20px;
  height: 100%;
}

.step-no{
  padding: 13px;
  text-align: center;
  display: inline-block;
  border-right: 1px solid rgba(0,0,0,0.15);
  width: 50px;
  height: 50px;
  background-color: rgba(44, 62, 80,0.7);
  color: #fff;
}

.step-title{
  display: inline-block;
  margin-left: 10px;
}

.radio-inline{
  cursor: default;
}

#budget{
    display: inline-block;
}

.btn-submit{
  padding:5px 20px;
  font-size: 1.2em;
  letter-spacing: 2px;
}

table{
    min-width: 100%;
}
tr {
    border: 1px solid #DEDEDE;
    padding-left: 20px;
}

td {
    padding: 20px;
    font-family: Lato;
    font-size: 1.1em
}

th	{
	padding: 10px 10px 10px 20px;
}

strong{
    font-size: 2em;
}

input[type=radio]:checked ~ .check {
  border: 5px solid #0DFF92;
}

input[type=radio]:checked ~ .check::before{
  background: #0DFF92;
}

input[type=radio]:checked ~ label{
  color: #0DFF92;
}
</style>
