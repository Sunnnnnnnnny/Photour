<template>
  <modal
    name="forward-modal"
    :clickToClose="true"
    :height="600">
    <div class="forward-modal-wrapper">
      <!--<h3>转发到好友圈</h3>-->
      <div-header header="转发到好友圈"></div-header>
      <div class="photo-wrapper">
        <img :src=photoUrl />
      </div>
      <div class="input-wrapper">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="说点什么吧！"
          v-model="textarea">
        </el-input>
      </div>

      <div class="button-wrapper">
        <button @click="handleForward">
          转  发
        </button>
      </div>

    </div>

  </modal>

</template>

<script>
  import DivHeader from '../Util/DivHeader'
  import {Input, Message} from 'element-ui'
  import {mapState, mapActions} from 'vuex'
  import {router} from '../../main'

  export default {
    name: 'forward-modal',
    components: {
      DivHeader,
      elInput: Input
    },
    data() {
      let name = this.currentPhoto.url.split('/')[this.currentPhoto.url.split('/').length - 1];
      return {
        photoUrl: require('/Users/st/code/Photour/Photour-Server/storage/app/uploads/photos/' + name),
        textarea: ''
      }
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      })
    },
    props: ['currentPhoto'],
    methods: {
      ...mapActions('event', [
        'createEvent'
      ]),
      handleForward() {
        this.createEvent({
          eventInfo: {
            eventContent: this.textarea,
            type: 'forward',
            photoId: this.currentPhoto.id,
          },
          onSuccess: () => {
            this.$modal.hide('forward-modal');
            router.push({name: 'UserHomePage', params: {userId: this.user.id}})
            Message({
              message: '转发成功！',
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

<style scoped src="./ForwardModal.css"></style>
