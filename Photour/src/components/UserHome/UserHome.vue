<template>

  <div class="user-home-wrapper">

    <div class="avatar-wrapper">

      <div class="avatar" @click="goToAccountInfo" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"></div>
      <p>Tiann</p>

      <div class="likes-album">
        <div>
          <img src="../../assets/img/like.png" width="14">
          <span>我喜欢的： 239</span>
        </div>

        <div>
          <img src="../../assets/img/album.png" width="18">
          <span>我的相册： 3</span>
        </div>

        <div>
          <img src="../../assets/img/fans.png" width="18">
          <span>我的粉丝： 0</span>
        </div>

        <div>
          <img src="../../assets/img/following.png" width="18">
          <span>我的关注： 29</span>
        </div>

        <div>
          <img src="../../assets/img/upload.png" width="18">
          <span>上传照片</span>
        </div>

      </div>
    </div>

    <div class="content-wrapper">
      <my-favourites v-if="currentPage === 'MyFavourites'"></my-favourites>
    </div>


  </div>
</template>

<script>
  import {router} from '../../main'
  import MyFavourites from './MyFavourites'

  export default {
    name: 'user-home',
    components: {
      MyFavourites
    },
    data() {
      return {
        avatarUrl: 'https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg',
        currentPage: 'MyFavourites'
      }
    },
    methods: {
      goToAccountInfo() {
        router.push({name: 'AccountPage'})
      }
    }
  }

</script>

<style scoped src="./UserHome.css"></style>
