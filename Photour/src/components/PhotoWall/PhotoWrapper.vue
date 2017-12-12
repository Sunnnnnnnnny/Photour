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
          <!--<img src="../../assets/img/user.png" width="17"/>-->
          <div class="avatar" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"></div>
          <span class="author-name">
        {{currentPhoto.author[0].username}}
      </span>

          <div class="right-wrapper">
            <img src="../../assets/img/comment.png" width="14"/>
            <span>{{currentPhoto.comments.length}}</span>
            <div class="like-section" @click="handleLike">
              <img v-if="this.liked" src="../../assets/img/like.png" width="14"/>
              <img v-else="!this.liked" src="../../assets/img/dislike.png" width="14"/>
              <span>{{this.likes}}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </el-col>
</template>

<script>

  import {Row, Col, Message} from 'element-ui'
  import {router} from '../../main'
  import {mapState, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'photo',
    components: {
      elCol: Col,
    },
    data() {
      let name = this.currentPhoto.url.split('/')[this.currentPhoto.url.split('/').length - 1];
//      let name = this.currentPhoto.url
//      console.log('name', name)
//      console.log('photo', this.currentPhoto)
      return {
        avatarUrl: "https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg",
        liked: this.currentPhoto.liked,
        likes: this.currentPhoto.likes,
        photoUrl: require('/Users/st/code/Photour/Photour-Server/storage/app/uploads/photos/' + name),
      }
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      }),
    },
    props: ['currentPhoto'],
    methods: {
      ...mapActions('photos', [
        'likePhotos'
      ]),
      ...mapMutations('photos', [
        'saveCurrentPhoto'
      ]),
      goToPhotoDetails() {
        this.saveCurrentPhoto(this.currentPhoto)
        router.push({name: 'PhotoDetailsPage', params: {photoId: this.currentPhoto.url}});
        window.scrollTo(0, 0);
      },
      handleLike() {
        if (!this.user) {
          Message({
            message: '请先登录！',
            type: 'warning'
          })
        } else {
          if (this.liked) {
            this.likes--;
          } else {
            this.likes++;
          }
          this.liked = this.liked !== true;
          console.log('like', this.currentPhoto.id)
          this.likePhotos({
            likeInfo: {
              userId: this.user.id,
              photoId: this.currentPhoto.id
            }
          })
        }

      }
    }
  }
</script>

<style scoped src="./PhotoWrapper.css"></style>
