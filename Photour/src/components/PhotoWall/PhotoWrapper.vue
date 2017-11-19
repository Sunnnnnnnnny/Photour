<template>
  <el-col :xs="12" :sm="8" :md="6" :lg="6">
    <div class="grid-content">
      <div class="div-wrapper">

        <div class="photo-wrapper" @click="goToPhotoDetails">
          <div class="photo" :style="{ backgroundImage: 'url(' + photoUrl + ')' }">
            <!--<img :src="currentUrl" />-->
          </div>
        </div>

        <div class="info-wrapper">
          <img src="../../assets/img/user.png" width="17"/>
          <span class="author-name">
        {{currentPhoto.author[0].username}}
      </span>

          <div class="right-wrapper">
            <img src="../../assets/img/comment.png" width="14"/>
            <span>12</span>
            &nbsp;
            <div class="like-section">
              <img src="../../assets/img/like.png" width="14"/>
              <span>{{currentPhoto.likes}}</span>
            </div>
          </div>
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
      let name = this.currentPhoto.url.split('/')[this.currentPhoto.url.split('/').length - 1];
      return {
        photoUrl: require('/Users/st/Pictures/Photour/' + name),
      }
    },
    created() {
      console.log(this.currentPhoto);
    },
    props: ['currentPhoto'],
    methods: {
      goToPhotoDetails() {
        router.push({name: 'PhotoDetailsPage', params: {photoId: this.currentPhoto.url}});
        window.scrollTo(0, 0);
      }
    }
  }
</script>

<style scoped src="./PhotoWrapper.css"></style>
