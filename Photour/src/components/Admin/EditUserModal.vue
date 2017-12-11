<template>
  <modal
    name="edit-user-modal"
    :clickToClose="true"
    :height="500">
    <div class="edit-user-wrapper">

      <el-button
        type="primary"
        icon="close"
        @click="closeBox"></el-button>

      <user-info-form :userToEdit="this.userToEdit"></user-info-form>

    </div>

  </modal>

</template>

<script>
  import {Message, Button} from 'element-ui'
  import {mapState, mapActions} from 'vuex'
  import {router} from '../../main'
  import UserInfoForm from './UserInfoForm'

  export default {
    name: 'edit-user-modal',
    components: {
      UserInfoForm,
      Message,
      elButton: Button,
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('admin', {
        userToEdit: state => state.userToEdit
      })
    },
    methods: {
      ...mapActions('admin', [
        'deleteUser'
      ]),
      closeBox() {
        this.$modal.hide('edit-user-modal')
      }
    }
  }

</script>

<style scoped src="./EditUserModal.css"></style>
