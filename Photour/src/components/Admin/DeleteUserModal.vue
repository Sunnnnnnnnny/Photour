<template>
  <modal
    name="delete-user-modal"
    :clickToClose="true"
    :height="150">
    <div class="delete-user-wrapper">
      <p>操作不可撤销，确认删除用户？</p>
      <div class="button-wrapper">
        <button @click="closeModal">
          取  消
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <button @click="handleDeleteUser">
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
    name: 'delete-user-modal',
    components: {
      Message
    },
    data() {
      return {};
    },
    computed: {
      ...mapState('admin', {
        toDeleteId: state => state.toDeleteId
      })
    },
    methods: {
      ...mapActions('admin', [
        'deleteUser'
      ]),
      closeModal() {
        this.$modal.hide('delete-user-modal')
      },
      handleDeleteUser() {
        this.deleteUser({
          userId: this.toDeleteId,
          onSuccess: (success) => {
            this.$modal.hide('delete-user-modal');
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

<style scoped src="./DeleteUserModal.css"></style>
