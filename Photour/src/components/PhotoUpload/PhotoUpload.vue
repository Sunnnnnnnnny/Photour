<template>

  <div class="upload-photo-button-wrapper">
    <button @click="showPhotoUploadModal">
      <img src="../../assets/img/add.png" width="15"/>
      <span>上传照片</span>
    </button>
  </div>

</template>

<script>
  import PhotoUploadModal from './PhotoUploadModal'

  export default {
    name: 'photo-upload',
    components: {
//      PhotoUploadModal
    },
    data() {
      return {}
    },
    methods: {
      showPhotoUploadModal() {
        this.$modal.show('photo-upload-modal');
      }
    }
  }

</script>

<style scoped src="./PhotoUpload.css"></style>
