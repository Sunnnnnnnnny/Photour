<template>
  <el-col :xs="12" :sm="8" :md="4" :lg="4">
    <div class="grid-content">
      <div class="icon-wrapper">
        <div class="avatar" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"></div>
        <p>Tiann</p>

      </div>
    </div>
  </el-col>
</template>

<script>
  import {Col} from 'element-ui'

  export default {
    name: 'user-icon',
    components: {
      elCol: Col
    },
    data() {
      return {
        avatarUrl: 'https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg',
      }
    },
    methods: {}
  }
</script>

<style scoped src="./UserIcon.css"></style>
