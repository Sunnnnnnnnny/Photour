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
        <button @click="forward">
          转  发
        </button>
      </div>

    </div>

  </modal>

</template>

<script>
  import DivHeader from '../Util/DivHeader'
  import {Input, Message} from 'element-ui'
  import {mapState} from 'vuex'
  import {router} from '../../main'

  export default {
    name: 'forward-modal',
    components: {
      DivHeader,
      elInput: Input
    },
    data() {
      return {
        textarea: ''
      }
    },
    computed: {
      ...mapState({
        photoUrl: state => state.photoDetails.photoUrl
      })
    },
    methods: {
      forward() {
        Message({
          message: '转发成功！',
          type: 'success'
        });
        router.push({name: 'UserHomePage'});
      }
    }
  }

</script>

<style scoped src="./ForwardModal.css"></style>
