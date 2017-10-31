<template>
  <el-col :xs="12" :sm="8" :md="6" :lg="6">
    <div class="grid-content">
      <div class="div-wrapper">

        <div class="album-wrapper">
          <div class="album" :style="{ backgroundImage: 'url(' + photoUrl + ')' }">

          </div>
        </div>

        <div class="info-wrapper">
          <img src="../../assets/img/album.png" width="17"/>
          <span class="author-name">
        我的相册
      </span>
        </div>

      </div>
    </div>
  </el-col>
</template>

<script>

  import {Row, Col} from 'element-ui'
  import {router} from '../../main'

  export default {
    name: 'photo',
    components: {
      elCol: Col,
    },
    data() {
      return {
        photoUrl: 'https://cdn.dribbble.com/users/226242/screenshots/3871814/1976_chevrolet_blazer.png',
      }
    },
//    props: ['currentUrl'],
    methods: {
    }
  }
</script>

<style scoped src="./AlbumWrapper.css"></style>
