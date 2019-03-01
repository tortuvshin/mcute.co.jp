<template>
	<div class="File-input">
        <div class="File-input__input-wrapper">
            Browse...
            <input @change="onChoose" class="File-input__input upload-btn" name="thumbnail" type="file">
        </div>
    </div>
</template>

<script>
    import { bus } from '../../main.js'
	export default {
	    methods: {
	        onChoose(event) {
	            var file = event.target.files[0];
                var size = file.size/1000000;
                if (size > 25){
                    bus.$emit('showAlert', {result: 'danger', message: 'The file size of ' + file.name + ' is exceed the limitation', title: 'Upload Error!'});
                }else{
                    document.querySelector(".upload-btn").value = "";
                    this.$emit('handleFileUploaded', file);
                }
	        }
	    }
	}
</script>

<style scoped>

.upload-description {
    display: inline-block;
    margin-left: 15px;
}
.File-input {
    display: inline-flex;
    width: 200px;
    height: 50px;
    background: transparent;
    border: 3px solid #2c3e50;
    font-size: 20px;
}

.File-input__input-wrapper {
    overflow: hidden;
    position: relative;
    border-radius: 1px;
    float: left;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0,0,0,8);
    transition: 0.4s background;
}

.File-input__input-wrapper:hover {
    background: #e0e0e0;
}


.File-input__input {
    cursor: inherit;
    display: block;
    font-size: 999px;
    min-height: 100%;
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
    cursor: pointer;
}
</style>