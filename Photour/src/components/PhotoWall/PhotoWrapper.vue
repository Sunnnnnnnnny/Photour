<template>
  <el-col  :xs="12" :sm="8" :md="6" :lg="6"><div class="grid-content">
  <div class="div-wrapper">

    <div class="photo-wrapper">
      <div class="photo" :style="{ backgroundImage: 'url(' + currentUrl + ')' }">

      </div>
    </div>

    <div class="info-wrapper">
      <img src="../../assets/img/user.png" width="17"/>
      <span class="author-name">
        tiann97
      </span>

      <div class="right-wrapper">
        <img src="../../assets/img/comment.png" width="14"/>
        <span>12</span>
        &nbsp;
        <div class="like-section">
          <img src="../../assets/img/like.png" width="14"/>
          <span>249</span>
        </div>
      </div>
    </div>

  </div>
  </div></el-col>
</template>

<script>

  import {Row, Col} from 'element-ui'

  export default {
    name: 'photo',
    components: {
      elCol: Col,
    },
    data() {
      return {
//        photoUrl: 'https://cdn.dribbble.com/users/226242/screenshots/3871814/1976_chevrolet_blazer.png',
        photoUrl: [require('../../assets/img/photo.png')]
      }
    },
    props: ['currentUrl'],
    methods: {}
  }
</script>

<style scoped src="./PhotoWrapper.css"></style>
