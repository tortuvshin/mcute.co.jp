<template>
	<div class="Image-input">
        <div class="Image-input__image-wrapper"s>
            <i v-show="!imageSrc1" class="icon fa fa-picture-o"></i>
            <img v-show="imageSrc1" class="Image-input__image" :src="imageSrc1">
        </div>

        <div class="Image-input__input-wrapper">
            Choose
            <input @change="previewThumbnail" class="Image-input__input" name="thumbnail" type="file">
        </div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				imageSrc1: this.imageSrc
			}
		},
		props: [ 'imageSrc' ],
	    methods: {
	        previewThumbnail(event) {
                console.log(event);
	            var input = event.target;
	            var fileName = input.files[0].name.toLowerCase();
	            var extension = fileName.substr(fileName.indexOf('.'));

	            var acceptedExtension = ['.jpg', '.png', '.gif', '.bmp'];

	            if (acceptedExtension.indexOf(extension) === -1){	
	            	alert('Please upload a valid image file!');
	            }else {
	            	var reader = new FileReader();

	                reader.onload = e => {
	                    this.imageSrc1 = e.target.result;
	                }

	                reader.readAsDataURL(input.files[0]);
	               
	                this.$emit('imageUploaded', input.files[0]);
	            }
	        }
	    }
	}
</script>

<style scoped>
.Image-input {
    display: flex;
}

.Image-input__image-wrapper {
    flex-basis: 80%;
    height: auto;
    min-height: 230px;
    flex: 2.5;
    border-radius: 1px;
    margin-right: 10px;
    overflow-y: hidden;
    border-radius: 1px;
    background: #eee;
    justify-content: center;
    align-items: center;
    display: flex;
}

.Image-input__image-wrapper > .icon {
    color: #ccc;
    font-size: 50px;
    cursor: default;
}

.Image-input__image {
    max-width: 100%;
    border-radius: 1px;
}

.Image-input__input-wrapper {
    overflow: hidden;
    position: relative;
    background: #eee;
    border-radius: 1px;
    float: left;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0,0,0,8);
    transition: 0.4s background;
}

.Image-input__input-wrapper:hover {
    background: #e0e0e0;
}


.Image-input__input {
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