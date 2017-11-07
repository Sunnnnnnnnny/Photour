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

        <div @click="goToMyEvents">
          <img src="../../assets/img/events.png" width="18">
          <span>动态： 27</span>
        </div>

        <div @click="goToMyAlbum">
          <img src="../../assets/img/album.png" width="18">
          <span>相册： 3</span>
        </div>

        <div @click="goToMyFavourites">
          <img src="../../assets/img/dislike.png" width="14">
          <span>喜欢： 239</span>
        </div>

        <div @click="goToMyFans">
          <img src="../../assets/img/fans.png" width="18">
          <span>粉丝： 10</span>
        </div>

        <div @click="goToMyFollowings">
          <img src="../../assets/img/following.png" width="18">
          <span>关注： 29</span>
        </div>

        <!--<div>-->
        <!--<img src="../../assets/img/upload.png" width="18">-->
        <!--<span>上传照片</span>-->
        <!--</div>-->

      </div>
    </div>

    <div class="content-wrapper">
      <my-events v-if="currentPage === 'MyEvents'"></my-events>
      <my-favourites v-if="currentPage === 'MyFavourites'"></my-favourites>
      <my-album v-if="currentPage === 'MyAlbum'"></my-album>
      <my-fans v-if="currentPage === 'MyFans'"></my-fans>
      <my-followings v-if="currentPage === 'MyFollowings'"></my-followings>
    </div>


  </div>
</template>

<script>
  import {router} from '../../main'
  import MyEvents from './MyEvents'
  import MyFavourites from './MyFavourites'
  import MyAlbum from './MyAlbum'
  import MyFans from './MyFans'
  import MyFollowings from './MyFollowings'

  export default {
    name: 'user-home',
    components: {
      MyEvents,
      MyFavourites,
      MyAlbum,
      MyFans,
      MyFollowings
    },
    data() {
      return {
        avatarUrl: 'https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg',
        currentPage: 'MyEvents'
      }
    },
    methods: {
      goToAccountInfo() {
        router.push({name: 'AccountPage'})
      },
      goToMyEvents() {
        this.currentPage = 'MyEvents'
      },
      goToMyFavourites() {
        this.currentPage = 'MyFavourites'
      },
      goToMyAlbum() {
        this.currentPage = 'MyAlbum';
      },
      goToMyFans() {
        this.currentPage = 'MyFans';
      },
      goToMyFollowings() {
        this.currentPage = 'MyFollowings';
      }
    }
  }

</script>

<style scoped src="./UserHome.css"></style>
