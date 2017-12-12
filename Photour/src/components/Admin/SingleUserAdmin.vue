<template>
  <el-col :xs="24" :sm="24" :md="12" :lg="12">
    <div class="grid-content">
      <div class="icon-wrapper">
        <div class="avatar-wrapper" @click="goToUserHomepage">
          <div class="avatar" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"></div>
          <p>{{this.users.username}}</p>
        </div>

        <div class="info-wrapper">
          <p>邮箱：{{this.users.email}}</p>
          <p>手机：{{this.users.phone}}</p>
          <p>标签：{{this.users.tags}}</p>
        </div>

        <div class="edit-wrapper">
          <el-tooltip content="删除用户" placement="top" effect="light">
            <img src="../../assets/img/delete-pink.png" width="15" @click="handleDeleteUser"/>
          </el-tooltip>
          <el-tooltip content="编辑信息" placement="top" effect="light">
            <img src="../../assets/img/edit.png" width="15" @click="handleEditUser"/>
          </el-tooltip>
          <el-tooltip content="重置密码" placement="top" effect="light">
            <img src="../../assets/img/key.png" width="15" @click="handleEditPw"/>
          </el-tooltip>
        </div>

      </div>
    </div>
  </el-col>
</template>

<script>
  import {Col, Tooltip} from 'element-ui'
  import {router} from '../../main'
  import {mapMutations} from 'vuex'

  export default {
    name: 'single-user-admin',
    components: {
      elCol: Col,
      elTooltip: Tooltip
    },
    props: ['users'],
    data() {
//      console.log(this.users)
      return {
        avatarUrl: 'https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg',
      }
    },
    methods: {
      ...mapMutations('auth', [
        'saveCurrentPage'
      ]),
      ...mapMutations('admin', [
        'saveToDeleteId',
        'saveUserToEdit'
      ]),
      goToUserHomepage() {
        console.log(this.users.id)
        this.saveCurrentPage('MyEvents')
        router.push({name: 'UserHomePage', params: {userId: this.users.id}})
      },
      handleDeleteUser() {
        this.saveToDeleteId(this.users.id)
        this.$modal.show('delete-user-modal')
      },
      handleEditUser() {
        this.saveUserToEdit(this.users)
        this.$modal.show('edit-user-modal')
      },
      handleEditPw() {
        this.saveUserToEdit(this.users)
        this.$modal.show('edit-user-pw-modal')
      }
    }
  }
</script>

<style scoped src="./SingleUserAdmin.css"></style>
