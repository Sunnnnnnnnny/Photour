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

      </div>
    </div>
  </el-col>
</template>

<script>
  import {Col} from 'element-ui'
  import {router} from '../../main'
  import {mapMutations} from 'vuex'

  export default {
    name: 'user-icon',
    components: {
      elCol: Col
    },
    props: ['users'],
    data() {
      console.log(this.users)
      return {
        avatarUrl: 'https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg',
      }
    },
    methods: {
      ...mapMutations('auth', [
        'saveCurrentPage'
      ]),
      goToUserHomepage() {
        console.log(this.users.id)
        this.saveCurrentPage('MyEvents')
        router.push({name: 'UserHomePage', params: {userId: this.users.id}})
      }
    }
  }
</script>

<style scoped src="./UserIcon.css"></style>
