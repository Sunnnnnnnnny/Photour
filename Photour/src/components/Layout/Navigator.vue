<template>
  <div class="nav-wrapper">
    <div class="container">
      <div class="left-wrapper">
        <img src="../../assets/img/logo.png" width="30">
      </div>

      <div class="right-wrapper">
        <div class="input-wrapper">
          <el-input class="search-input"
                    placeholder="搜索图片、作者"
                    icon="search"
                    v-model="input2"
                    :on-icon-click="handleIconClick">
          </el-input>
        </div>

        <div class="button-wrapper">
          <el-button type="text" @click="goToSquare">广场</el-button>
          <el-button type="text" @click="signUp">注册</el-button>
          <el-button type="text" @click="signIn">登录</el-button>
          <el-dropdown menu-align="start" @command="handleCommand">
            <span class="el-dropdown-link">
              我的<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="UserHomePage">个人主页</el-dropdown-item>
              <el-dropdown-item command="AccountPage">修改资料</el-dropdown-item>
              <el-dropdown-item>退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <slot></slot>
    </div>

    <sign-in></sign-in>
    <photo-upload-modal></photo-upload-modal>
    <forward-modal></forward-modal>
    <create-album-modal></create-album-modal>

  </div>
</template>


<script>
  import Vue from 'vue'
  import {Input, Button, Dropdown, DropdownMenu, DropdownItem} from 'element-ui'
  import AuthModal from '../AuthModal/AuthModal'
  import PhotoUploadModal from '../PhotoUpload/PhotoUploadModal'
  import ForwardModal from '../ForwardModal/ForwardModal'
  import CreateAlbumModal from '../AlbumWall/CreateAlbumModal'
  import {router} from '../../main'

  import {mapMutations} from 'vuex'
  import {store} from '../../main'

  //  Vue.use(Input)

  export default {
    name: 'navigator',
    components: {
      elInput: Input,
      elButton: Button,
      elDropdown: Dropdown,
      elDropdownMenu: DropdownMenu,
      elDropdownItem: DropdownItem,
      SignIn: AuthModal,
      PhotoUploadModal,
      ForwardModal,
      CreateAlbumModal
    },
    data() {
      return {
        input2: ''
      }
    },
    methods: {
      ...mapMutations([
        'goSignIn',
        'goSignUp',
      ]),
      handleIconClick(ev) {
        console.log(ev);
      },
      signIn() {
        this.$modal.show('sign-in');
        store.commit('goSignIn');
      },
      signUp() {
        this.$modal.show('sign-in');
        store.commit('goSignUp');
      },
      goToSquare() {
        router.push({name: 'PhotoSquarePage'})
      },
      handleCommand(command) {
        router.push({name: command})
      },
    }
  }
</script>

<style scoped src="./Navigator.css"></style>
