<template>

  <div class="user-home-wrapper">

    <div class="avatar-wrapper">

      <div class="avatar" @click="goToAccountInfo" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"></div>
      <p>Tiann</p>

      <!--到时候用v-if做-->
      <!--<div class="follow-button-wrapper">-->
        <!--<button>-->
          <!--<img src="../../assets/img/add.png" width="12"/>-->
          <!--<span>添加关注</span>-->
        <!--</button>-->

        <!--<button>-->
          <!--<img src="../../assets/img/remove.png" width="12"/>-->
          <!--<span>取消关注</span>-->
        <!--</button>-->
      <!--</div>-->

      <div class="likes-album">

        <div>
          <img src="../../assets/img/events.png" width="18">
          <span>我的动态： 27</span>
        </div>

        <div @click="goToMyAlbum">
          <img src="../../assets/img/album.png" width="18">
          <span>我的相册： 3</span>
        </div>

        <div @click="goToMyFavourites">
          <img src="../../assets/img/dislike.png" width="14">
          <span>我喜欢的： 239</span>
        </div>

        <div>
          <img src="../../assets/img/fans.png" width="18">
          <span>我的粉丝： 0</span>
        </div>

        <div>
          <img src="../../assets/img/following.png" width="18">
          <span>我的关注： 29</span>
        </div>

        <!--<div>-->
        <!--<img src="../../assets/img/upload.png" width="18">-->
        <!--<span>上传照片</span>-->
        <!--</div>-->

      </div>
    </div>

    <div class="content-wrapper">
      <my-favourites v-if="currentPage === 'MyFavourites'"></my-favourites>
      <my-album v-if="currentPage === 'MyAlbum'"></my-album>
    </div>


  </div>
</template>

<script>
  import {router} from '../../main'
  import MyFavourites from './MyFavourites'
  import MyAlbum from './MyAlbum'

  export default {
    name: 'user-home',
    components: {
      MyFavourites,
      MyAlbum,
    },
    data() {
      return {
        avatarUrl: 'https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg',
        currentPage: 'MyAlbum'
      }
    },
    methods: {
      goToAccountInfo() {
        router.push({name: 'AccountPage'})
      },
      goToMyFavourites() {
        this.currentPage = 'MyFavourites'
      },
      goToMyAlbum() {
        this.currentPage = 'MyAlbum';
        console.log(this.currentPage)
      }
    }
  }

</script>

<style scoped src="./UserHome.css"></style>
