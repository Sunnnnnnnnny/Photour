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
                    :on-icon-click="handleSearch">
          </el-input>
        </div>

        <div class="button-wrapper">
          <el-button type="text" @click="goToSquare">广场</el-button>
          <el-button v-if="!user" type="text" @click="signUp">注册</el-button>
          <el-button v-if="!user" type="text" @click="signIn">登录</el-button>
          <el-dropdown v-else menu-align="start" @command="handleCommand">
            <span class="el-dropdown-link">
              {{user.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="UserHomePage">个人主页</el-dropdown-item>
              <el-dropdown-item command="AccountPage">修改资料</el-dropdown-item>
              <el-dropdown-item command="signOut">退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <slot></slot>
    </div>

    <sign-in></sign-in>
    <photo-upload-modal v-if="user" :user="user"></photo-upload-modal>
    <forward-modal v-if="this.currentPhoto" :currentPhoto="this.currentPhoto"></forward-modal>
    <create-album-modal></create-album-modal>
    <delete-album-modal></delete-album-modal>
    <delete-photo-modal></delete-photo-modal>
    <delete-user-modal></delete-user-modal>
    <edit-user-modal></edit-user-modal>
    <edit-user-pw-modal></edit-user-pw-modal>
  </div>
</template>


<script>
  import Vue from 'vue'
  import {Input, Button, Dropdown, DropdownMenu, DropdownItem, Message} from 'element-ui'
  import AuthModal from '../AuthModal/AuthModal'
  import PhotoUploadModal from '../PhotoUpload/PhotoUploadModal'
  import ForwardModal from '../ForwardModal/ForwardModal'
  import CreateAlbumModal from '../AlbumWall/CreateAlbumModal'
  import DeleteAlbumModal from '../AlbumWall/DeleteAlbumModal'
  import DeletePhotoModal from '../PhotoDetails/DeletePhotoModal'
  import DeleteUserModal from '../Admin/DeleteUserModal'
  import EditUserModal from '../Admin/EditUserModal'
  import EditUserPwModal from '../Admin/EditUserPwModal'
  import {router} from '../../main'
  import {mapMutations, mapState, mapActions} from 'vuex'

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
      CreateAlbumModal,
      DeleteAlbumModal,
      DeletePhotoModal,
      DeleteUserModal,
      EditUserModal,
      EditUserPwModal
    },
    data() {
      return {
        input2: ''
      }
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      }),
      ...mapState('photos', {
        currentPhoto: state => state.currentPhoto
      }),
      ...mapState('admin', {
        userToEdit: state => state.userToEdit
      })
    },
    methods: {
      ...mapMutations('auth', [
        'goSignIn',
        'goSignUp',
        'saveCurrentUser'
      ]),
      ...mapActions('auth', [
        'signOut'
      ]),
      ...mapActions('search', [
        'search'
      ]),
      ...mapMutations('albums', [
        'showingPhotos'
      ]),
      ...mapMutations('search', [
        'saveSearchInput'
      ]),
      handleSearch() {
        this.saveSearchInput(this.input2)
        this.search({
          input: {
            input: this.input2
          }
        })
        router.push({name: 'SearchResultPage'})
      },
      signIn() {
        this.$modal.show('sign-in');
        this.goSignIn();
      },
      signUp() {
        this.$modal.show('sign-in');
        this.goSignUp()
      },
      goToSquare() {
        router.push({name: 'PhotoSquarePage'})
      },
      handleCommand(command) {
        if (command !== 'signOut') {
          if (command === 'UserHomePage') {
            this.showingPhotos(false)
            this.saveCurrentUser(this.user.id)
            router.push({name: 'UserHomePage', params: {userId: this.user.id}})
          } else {
            router.push({name: command})
          }
        } else {
          this.signOut({
            onSuccess: (username) => {
              Message({
                message: 'Goodbye, ' + username + '!',
                type: 'success'
              });
            }
          });
        }
      },
    }
  }
</script>

<style scoped src="./Navigator.css"></style>
