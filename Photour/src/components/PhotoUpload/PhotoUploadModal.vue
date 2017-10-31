<template>
  <modal
    name="photo-upload-modal"
    :height="400"
    :clickToClose="false"
    :adaptive="true"
  >
    <div class="photo-upload-modal-wrapper">
      <el-button
        class="close-button"
        type="primary"
        icon="close"
        @click="closeBox"></el-button>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture"
        :auto-upload="false"
        :before-upload="beforeUpload"
        :on-success="handleSuccess">
        <button class="select-button" slot="trigger" size="small" type="primary">选取照片</button>
        <el-dropdown @command="submitUpload">
          <span class="el-dropdown-link">
            上传<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">相册一</el-dropdown-item>
            <el-dropdown-item command="2">相册二</el-dropdown-item>
            <el-dropdown-item command="3">相册三</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>


      </el-upload>
    </div>
  </modal>
</template>

<script>
  import {Upload, Button, Dropdown, DropdownMenu, DropdownItem, Message} from 'element-ui'
  import {router} from '../../main'

  export default {
    name: 'photo-upload-modal',
    components: {
      elUpload: Upload,
      elButton: Button,
      elDropdown: Dropdown,
      elDropdownMenu: DropdownMenu,
      elDropdownItem: DropdownItem,
      elMessage: Message,
    },
    data() {
      return {
        fileList: [],
        toUpload: [],
      }
    },
    methods: {
      closeBox() {
        this.$modal.hide('photo-upload-modal');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        alert('!!!!!!!!')
      },
      handleSuccess() {
        Message({
          message: '上传成功！',
          type: 'success'
        });
        router.push({name: 'UserHomePage'})
      },
      beforeUpload(file) {
        console.log(this)
        this.toUpload.push(file.name)
//        console.log(file)
      },
      submitUpload(command) {
//        if (this.fileList.length === 0) {
//          alert('!!!!');
//        } else {
        console.log(this.toUpload.length);
        console.log(command);
        if (this.toUpload.length > 1) {
          alert("!!!!!!")
        }
        this.$refs.upload.submit();
//        }

      },
    }
  }

</script>

<style scoped src="./PhotoUploadModal.css"></style>
