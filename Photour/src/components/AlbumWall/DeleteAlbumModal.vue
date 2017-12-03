<template>
  <modal
    name="delete-album-modal"
    :clickToClose="true"
    :height="150">
    <div class="delete-album-wrapper">
      <p>相册中的照片也会被删除，确认删除？</p>
      <div class="button-wrapper">
        <button @click="closeModal">
          取  消
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <button @click="handleDeleteAlbum">
          确  定
        </button>
      </div>
    </div>

  </modal>

</template>

<script>
  import {Message} from 'element-ui'
  import {mapState, mapActions} from 'vuex'
  import {router} from '../../main'

  export default {
    name: 'delete-album-modal',
    components: {
      Message
    },
    data() {
      return {};
    },
    computed: {},
    methods: {
      ...mapActions('albums', [
        'createAlbum',
        'deleteAlbum'
      ]),
      closeModal() {
        this.$modal.hide('delete-album-modal')
      },
      handleDeleteAlbum() {
        this.deleteAlbum({
          onSuccess: (success) => {
            this.$modal.hide('delete-album-modal');
            Message({
              message: success,
              type: 'success'
            });
          },
          onError: (error) => {
            Message.error(error)
          }
        })
      }
    }
  }

</script>

<style scoped src="./DeleteAlbumModal.css"></style>
