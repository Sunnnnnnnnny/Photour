<template>

  <div v-if="this.user" class="user-home-wrapper">

    <div class="avatar-wrapper">

      <div class="avatar" @click="goToAccountInfo" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"></div>
      <p>{{this.user.username}}</p>

      <!--到时候用v-if做-->
      <div class="follow-button-wrapper">
        <button>
          <img src="../../assets/img/add.png" width="12"/>
          <span>添加关注</span>
        </button>

        <button>
          <img src="../../assets/img/remove.png" width="12"/>
          <span>取消关注</span>
        </button>
      </div>

      <div class="likes-album">

        <div @click="goToMyEvents">
          <img src="../../assets/img/events.png" width="18">
          <span>动态</span>
        </div>

        <div @click="goToMyAlbum">
          <img src="../../assets/img/album.png" width="18">
          <span>相册</span>
        </div>

        <div @click="goToMyFavourites">
          <img src="../../assets/img/dislike.png" width="14">
          <span>喜欢</span>
        </div>

        <div @click="goToMyFans">
          <img src="../../assets/img/fans.png" width="18">
          <span>粉丝</span>
        </div>

        <div @click="goToMyFollowings">
          <img src="../../assets/img/following.png" width="18">
          <span>关注</span>
        </div>

        <!--<div>-->
        <!--<img src="../../assets/img/upload.png" width="18">-->
        <!--<span>上传照片</span>-->
        <!--</div>-->

      </div>
    </div>

    <div class="content-wrapper">
      <my-events v-if="currentPage === 'MyEvents' && !this.isShowingPhotos" :events="this.events"></my-events>
      <my-favourites :favourites=this.favourites
                     v-if="currentPage === 'MyFavourites' && !this.isShowingPhotos"></my-favourites>
      <my-album :albums=this.albums v-if="currentPage === 'MyAlbum' && !this.isShowingPhotos"></my-album>
      <my-fans v-if="currentPage === 'MyFans' && !this.isShowingPhotos"></my-fans>
      <my-followings v-if="currentPage === 'MyFollowings' && !this.isShowingPhotos"></my-followings>
      <photo-wall v-if="this.isShowingPhotos" :photos="this.photosInAlbums"></photo-wall>
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
  import PhotoWall from '../PhotoWall/PhotoWall'
  import {mapActions, mapState, mapMutations} from 'vuex'

  export default {
    name: 'user-home',
    components: {
      MyEvents,
      MyFavourites,
      MyAlbum,
      MyFans,
      MyFollowings,
      PhotoWall
    },
    data() {
      return {
        userId: this.$route.params.userId,
        avatarUrl: 'https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg',
        currentPage: 'MyEvents'
      }
    },
    computed: {
      ...mapState('auth', {
        user: state => state.currentUser
      }),
      ...mapState('photos', {
        favourites: state => state.favourites
      }),
      ...mapState('albums', {
        albums: state => state.albums,
        photosInAlbums: state => state.photosInAlbums,
        isShowingPhotos: state => state.isShowingPhotos
      }),
      ...mapState('event', {
        events: state => state.events
      })
    },
    created() {
      console.log('created', this.userId)
      this.fetchCurrentUserById(this.userId)
      this.fetchEvents(this.userId)
    },
    methods: {
      ...mapActions('photos', [
        'fetchFavourites'
      ]),
      ...mapActions('albums', [
        'fetchAlbums'
      ]),
      ...mapActions('auth', [
        'fetchCurrentUserById'
      ]),
      ...mapActions('event', [
        'fetchEvents'
      ]),
      ...mapMutations('albums', [
        'showingPhotos'
      ]),
      goToAccountInfo() {
        this.showingPhotos(false)
        router.push({name: 'AccountPage'})
      },
      goToMyEvents() {
        this.showingPhotos(false)
        this.currentPage = 'MyEvents'
      },
      goToMyFavourites() {
//        console.log(this.user)
        this.showingPhotos(false)
        this.fetchFavourites(this.userId)
        this.currentPage = 'MyFavourites'
      },
      goToMyAlbum() {
        this.showingPhotos(false)
        this.fetchAlbums({userId: this.userId})
        this.currentPage = 'MyAlbum';
      },
      goToMyFans() {
        this.showingPhotos(false)
        this.currentPage = 'MyFans';
      },
      goToMyFollowings() {
        this.showingPhotos(false)
        this.currentPage = 'MyFollowings';
      }
    },
  }

</script>

<style scoped src="./UserHome.css"></style>
