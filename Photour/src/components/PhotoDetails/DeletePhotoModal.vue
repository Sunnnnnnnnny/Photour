<template>
  <modal
    name="delete-photo-modal"
    :clickToClose="true"
    :height="150">
    <div class="delete-photo-wrapper">
      <p>确认删除照片？</p>
      <div class="button-wrapper">
        <button @click="closeModal">
          取  消
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <button @click="handleDeletePhoto">
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
    name: 'delete-photo-modal',
    components: {
      Message
    },
    data() {
      return {};
    },
    computed: {},
    methods: {
      ...mapActions('photos', [
        'deletePhoto'
      ]),
      closeModal() {
        this.$modal.hide('delete-photo-modal')
      },
      handleDeletePhoto() {
        this.deletePhoto({
          onSuccess: (success) => {
            this.$modal.hide('delete-photo-modal');
            Message({
              message: success,
              type: 'success'
            });
            router.push({name: 'PhotoSquarePage'})
          },
          onError: (error) => {
            Message.error(error)
          }
        })
      }
    }
  }

</script>

<style scoped src="./DeletePhotoModal.css"></style>
