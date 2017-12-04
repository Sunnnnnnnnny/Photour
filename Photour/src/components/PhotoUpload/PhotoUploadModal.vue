<template>
  <modal
    name="photo-upload-modal"
    :height="650"
    :clickToClose="false"
    :adaptive="true"
  >
    <div class="photo-upload-modal-wrapper">
      <el-button
        class="close-button"
        type="primary"
        icon="close"
        @click="closeBox"></el-button>
      <!--<input type="file" :disabled=isUploading @change="updatePhoto($event.target.files)" accept="image/*"/>-->
      <!--<my-tags :canBeEdited=true :dynamicTags="[]"></my-tags>-->
      <!--<el-button @click="uploadPhoto()">确认上传</el-button>-->

      <div class="upload-wrapper">
        <el-upload
          ref="upload"
          :action="uploadAction"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="handleBefore"
          :file-list="files"
          :auto-upload="false"
          accept="image/*"
          :data="uploadData"
          :mutiple="false"
          limit=1>
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>（每次限定上传一张）</p>
      </div>

      <div class="albums-wrapper">
        <p>选择上传相册</p>
        <el-radio-group v-model="uploadData.album">
          <el-radio
            v-for="item in albums"
            :label="item.name"
          >
            {{item.name}}
          </el-radio>
        </el-radio-group>
      </div>

      <div class="tags-wrapper">
        <p>
          图片标签（使用空格隔开）
        </p>
        <el-input v-model="uploadData.tags"></el-input>
      </div>

      <div class="tags-wrapper">
        <p>
          图片描述
        </p>
        <el-input type="textarea" :rows="2" v-model="uploadData.description"></el-input>
      </div>

      <div class="upload-button">
        <el-button @click="submitUpload">确认上传</el-button>
      </div>


    </div>
  </modal>
</template>

<script>
  import {Input, Upload, Button, RadioGroup, Radio, Message, Dialog} from 'element-ui'
  import MyTags from '../Util/MyTags'
  import {router} from '../../main'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'photo-upload-modal',
    components: {
      MyTags,
      elInput: Input,
      elUpload: Upload,
      elButton: Button,
      elRadio: Radio,
      elRadioGroup: RadioGroup,
      elMessage: Message,
      elDialog: Dialog
    },
    computed: {
      ...mapState('albums', {
        albums: state => state.albums
      })
    },
    props: ['user'],
    data() {
//      console.error("data", this, this.user)
      return {
        uploadData: {
          album: '默认相册',
          tags: '',
          description: '我上传了一张照片，快来看看吧！',
          userId: this.user.id
        },
        files: [],
        uploadAction: '/api/photos/upload'
      }
    },
    methods: {
      closeBox() {
        this.$modal.hide('photo-upload-modal');
        this.files = []
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleSuccess(response) {
        console.log(response)
//        let photo = response.photo
        this.files = [{
          name: response.name,
          url: response.photo,
        }]

        if (response.message === 'success') {
          Message({
            message: '上传成功!',
            type: 'success'
          });
          this.$modal.hide('photo-upload-modal');
          this.files = []
        }
      },
      handleBefore() {
        return this.files.length !== 1 // 只让它上传一张
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      }

    },
  }


</script>

<style scoped src="./PhotoUploadModal.css"></style>
