<template>

  <div v-if="this.currentUser && this.user" class="user-home-wrapper">

    <div class="avatar-wrapper">

      <div class="avatar" @click="goToAccountInfo" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"></div>
      <p>{{this.currentUser.username}}</p>

      <!--到时候用v-if做-->
      <div v-if="parseInt(this.user.id) !== this.userId" class="follow-button-wrapper">
        <button v-if="this.followings !== null && !this.followingsId.includes(this.userId)"
                @click="addFollow">
          <img src="../../assets/img/add.png" width="12"/>
          <span>添加关注</span>
        </button>

        <button v-if="this.followings !== null && this.followingsId.includes(this.userId)"
                @click="removeFollow">
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
      <my-fans v-if="currentPage === 'MyFans' && !this.isShowingPhotos" :fans="this.fans"></my-fans>
      <my-followings v-if="currentPage === 'MyFollowings' && !this.isShowingPhotos"
                     :followings="this.followings"></my-followings>
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
  import {Message} from 'element-ui'
  import {mapActions, mapState, mapMutations} from 'vuex'

  export default {
    name: 'user-home',
    components: {
      MyEvents,
      MyFavourites,
      MyAlbum,
      MyFans,
      MyFollowings,
      PhotoWall,
      Message
    },
    data() {
      return {
        userId: parseInt(this.$route.params.userId),
        avatarUrl: 'https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg',
        currentPage: 'MyEvents',
        isFollowing: false
      }
    },
    computed: {
      ...mapState('auth', {
        currentUser: state => state.currentUser,
//        user: state => state.user
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
      }),
      ...mapState('follows', {
        fans: state => state.fans,
        followings: state => state.followings,
        fansId: state => state.fansId,
        followingsId: state => state.followingsId
      })
    },
    created() {
      this.fetchFollows(this.user.id)
      this.fetchCurrentUserById(this.userId)
      this.fetchEvents(this.userId)
    },
    props: ['user'],
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
      ...mapActions('follows', [
        'fetchFollows',
        'editFollows'
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
      },
      addFollow() {
        this.editFollows({
          info: {
            userId: this.user.id,
            followId: this.userId,
            isFollowing: true
          },
          onSuccess: () => {
            this.isFollowing = true;
            Message({
              type: 'success',
              message: '关注成功！'
            });
          },
          onError: (error) => {
            Message.error(error)
          }
        })
      },
      removeFollow() {
        this.editFollows({
          info: {
            userId: this.user.id,
            followId: this.userId,
            isFollowing: false
          },
          onSuccess: () => {
            this.isFollowing = false;
            Message({
              type: 'success',
              message: '取消关注成功！'
            });
          },
          onError: (error) => {
            Message.error(error)
          }
        })
      }
    },
  }

</script>

<style scoped src="./UserHome.css"></style>
