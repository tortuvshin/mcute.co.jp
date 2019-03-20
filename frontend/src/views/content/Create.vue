<template>
    <div class="wrapper">
       
        <div class="main">
            <div class="section">
                <div class="container">
                    <nav aria-label="breadcrumb" role="navigation">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Create Content</li>
                    </ol>
                    </nav>
                    <h2 class="section-title">Create Content</h2>
                    <div class="row">
                        <div class="col-12">
                            <el-select class="select-default"
                                        placeholder="Category Select"
                                        v-model="selects.simple">
                                <el-option v-for="option in selects.categories"
                                        class="select-default"
                                        :value="option.value"
                                        :label="option.label"
                                        :key="option.label">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="col-12">
                            <fg-input
                                        placeholder="Content name">
                            </fg-input>

                            <vue-editor v-model="project.description"></vue-editor>
                            
                            <el-table :data="project.files">
                            <el-table-column min-width="220">
                                <div slot-scope="{row}" class="img-container"><img :src="row.path" alt="Agenda"></div>
                            </el-table-column>
                            <el-table-column min-width="50" type="index"></el-table-column>
                            <el-table-column min-width="150" prop="name" label="File Name"></el-table-column>
                            <el-table-column min-width="200" prop="size" label="Size"></el-table-column>
                            <el-table-column min-width="150" header-align="right" label="Actions">
                                <div slot-scope="{row}" class="text-right table-actions">
                                <el-tooltip content="Delete" :open-delay="300" placement="top">
                                    <n-button type="danger" size="sm" icon @click.native="deleteFile(index)">
                                    <i class="intelligo-icons ui-1_simple-remove"></i>
                                    </n-button>
                                </el-tooltip>
                                </div>
                            </el-table-column>
                            </el-table>
                            <div class="section file-upload">
                                <app-file-uploader @handleFileUploaded="handleFileUploaded"></app-file-uploader>
                            </div>

                            <el-tag
                                :key="tag"
                                v-for="tag in project.skills"
                                size="small"
                                type="danger"
                                :closable="true"
                                :close-transition="false"
                                @close="handleClose(tag)">
                            {{tag}}
                            </el-tag>
                            <input type="text" placeholder="New Tag"
                               class="form-control input-new-tag"
                               v-model="inputValue"
                               ref="saveTagInput"
                               size="mini"
                               @keyup.enter="handleInputConfirm"
                               @blur="handleInputConfirm"/>
                               <input class="form-control input-lg" type="date" v-model="project.endDate" name="endDate" :min="todayDate()" required>
         
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { API_SERVER } from '../../api.js'
import { bus } from '../../main.js'
import { Card, Button, InfoSection, FormGroupInput, Checkbox, Slider } from '@/components'
import { Select, Option, Tooltip, Table, TableColumn, Tag } from 'element-ui'
import { VueEditor } from 'vue2-editor'
import AppFileUploader from '../../components/common/FileUploader'

export default {
  name: 'content-create',
  bodyClass: 'content-create',
  components: {
    AppFileUploader,
    VueEditor,
    Card,
    InfoSection,
    Slider,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [FormGroupInput.name]: FormGroupInput,
    [Tooltip.name]: Tooltip,
    [Tag.name]: Tag,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
    },
    data() {
       
        return {
            project: {
	        	description: null,
	        	budgetMin: null,
	        	budgetMax: null,
	        	budgetType: 'range',
	        	endDate: null,
	        	skills: [],
	        	title: null,
	        	category: '',
	        	files: []
	        },
            selects: {
                simple: '',
                categories: [{value: 'Abstract Art', label: 'Abstract Art'},
                    {value: 'Collectible Sculptures', label: 'Collectible Sculptures'},
                    {value: 'Contemporary', label: 'Contemporary'},
                    {value: 'Modern', label: 'Modern'},
                    {value: 'Pop Art', label: 'Pop Art'}]
            },
            inputVisible: false,
            inputValue: '',
            
            filters: {
                bytesToSize (bytes) {
                    if (bytes >= 1000000000) { bytes = (bytes / 1000000000).toFixed(2) + ' GB' } else if (bytes >= 1000000) { bytes = (bytes / 1000000).toFixed(2) + ' MB' } else if (bytes >= 1000) { bytes = (bytes / 1000).toFixed(2) + ' KB' } else if (bytes > 1) { bytes = bytes + ' bytes' } else if (bytes == 1) { bytes = bytes + ' byte' } else { bytes = '0 byte' }
                    return bytes
                }
            }
        }
    },
    methods: {
        handleClose(tag) {
            this.project.skills.splice(this.project.skills.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.project.skills.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
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
                    bus.$emit('showAlert', response.body)
                    this.$store.commit('setCurrentUser', response.body.updatedUser)
                    this.$router.push('/project/' + response.body.projectId)
      			}, response => {
      				bus.$emit('showAlert', response.body)
      			})
	      }
	    },
	    created () {
	    	document.title = 'Post a Project - WorkFlow'
        }
        
}
</script>