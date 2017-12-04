<template>

  <div class="photo-details-wrapper">

    <div class="operation-wrapper">

      <div class="left-wrapper" @click="goToUserHomePage">
        <img src="../../assets/img/user.png" width="25"/>
        <span>{{this.currentPhoto.author[0].username}}</span>
      </div>

      <div class="right-wrapper">

        <div class="button-wrapper" @click="handleLike">
          <button>
            <img v-if="this.liked" src="../../assets/img/like.png" width="16"/>
            <img v-else="!this.liked" src="../../assets/img/dislike.png" width="16"/>
            <span>{{this.likes}}</span>
          </button>
        </div>

        <div class="button-wrapper">
          <button @click="handleForward">
            <img src="../../assets/img/share.png" width="16"/>
            <span>分享</span>
          </button>
        </div>

        <div class="button-wrapper">
          <button class="download-button">
            <img src="../../assets/img/download.png" width="16"/>
            <a :href=photoUrl download>下载</a>
          </button>
        </div>

        <div v-if="this.user.id === this.photoAuthorId" class="button-wrapper">
          <button class="delete-button" @click="handleDelete">
            <img src="../../assets/img/delete.png" width="16"/>
            <span>删除</span>
          </button>
        </div>

      </div>
    </div>

    <div class="photo-wrapper">
      <!--:style="{ backgroundImage: 'url(' + temp + ')' }"-->
      <img :src=photoUrl @click="enlargePhoto" :class="{ large: isEnlarged }"/>
    </div>

    <div class="tags-wrapper">
      <div-header header="图片标签"></div-header>
      <photo-tags :canBeEdited="false" :dynamicTags="tags.length>0?tags.split(' '):['暂无标签']"></photo-tags>
    </div>

    <div class="comments-wrapper">
      <div-header header="图片评论"></div-header>
      <div class="input-wrapper">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="说点什么吧！"
          v-model="textarea">
        </el-input>

        <div class="button-wrapper">
          <button @click="handleComment">
            评  论
          </button>
        </div>
      </div>
      <single-comment v-for="item in 5"></single-comment>
    </div>
  </div>

</template>

<script>
  import PhotoTags from '../Util/MyTags.vue'
  import SingleComment from '../PhotoComment/SingleComment'
  import DivHeader from '../../components/Util/DivHeader'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {store, router} from '../../main'
  import {Input, Message} from 'element-ui'

  export default {
    name: 'photo-details',
    components: {
      PhotoTags,
      DivHeader,
      SingleComment,
      Message,
      elInput: Input
    },
    data() {
      let photoName = this.$route.params.photoId
      return {
        photoAuthorId: parseInt(this.currentPhoto.author_id),
        liked: this.currentPhoto.liked,
        likes: this.currentPhoto.likes,
        isEnlarged: false,
        textarea: '',
        photoUrl: require('/Users/st/code/Photour/Photour-Server/storage/app/uploads/photos/' + photoName),
        tags: this.currentPhoto.tags
      }
    },
    created() {
      if (this.currentPhoto === null) {
        router.push({name: 'PhotoSquarePage'});
      }
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      })
    },
    props: ['currentPhoto'],
    methods: {
      ...mapMutations('auth', [
        'saveCurrentUser'
      ]),
      ...mapActions('photos', [
        'likePhotos'
      ]),
      ...mapMutations('albums', [
        'showingPhotos'
      ]),
      enlargePhoto() {
        this.isEnlarged ? this.isEnlarged = false : this.isEnlarged = true;
      },
      handleForward() {
        this.$modal.show('forward-modal');
      },
      handleDelete() {
        this.$modal.show('delete-photo-modal');
      },
      handleComment() {

      },
      goToUserHomePage() {
        this.showingPhotos(false)
        router.push({name: 'UserHomePage', params: {userId: this.currentPhoto.author_id}})
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
          this.likePhotos({
            likeInfo: {
              userId: this.user.id,
              photoId: this.currentPhoto.id
            }
          })
        }
      }
    },
  }
</script>

<style scoped src="./PhotoDetails.css"></style>

