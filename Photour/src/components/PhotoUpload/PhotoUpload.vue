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
  import {mapState, mapActions} from 'vuex'
  import {Message} from 'element-ui'

  export default {
    name: 'photo-upload',
    components: {
      Message
//      PhotoUploadModal
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      }),
    },
    methods: {
      ...mapActions('photos', [
        'fetchAlbums'
      ]),
      showPhotoUploadModal() {
        if (this.user === null) {
          Message({
            message: '请先登录！',
            type: 'warning'
          });
          this.$modal.show('sign-in');
        } else {
          this.fetchAlbums({
              userId: this.user.id,
              onSuccess: () => {
                this.$modal.show('photo-upload-modal');
              }
            }
          )
        }

      }
    }
  }

</script>

<style scoped src="./PhotoUpload.css"></style>
