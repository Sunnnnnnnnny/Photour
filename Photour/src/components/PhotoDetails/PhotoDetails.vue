<template>

  <div class="photo-details-wrapper">

    <div class="operation-wrapper">

      <div class="left-wrapper">
        <img src="../../assets/img/user.png" width="25"/>
        <span>tiann</span>
      </div>

      <div class="right-wrapper">

        <div class="button-wrapper">
          <button>
            <img src="../../assets/img/dislike.png" width="16"/>
            <span>1,230</span>
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
      </div>
    </div>

    <div class="photo-wrapper">
      <!--:style="{ backgroundImage: 'url(' + temp + ')' }"-->
      <img :src=photoUrl @click="enlargePhoto" :class="{ large: isEnlarged }"/>
    </div>

    <div class="tags-wrapper">
      <div-header header="图片标签"></div-header>
      <photo-tags :canBeEdited="false"></photo-tags>
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
  import {mapState} from 'vuex'
  import {store} from '../../main'
  import {Input} from 'element-ui'

  export default {
    name: 'photo-details',
    components: {
      PhotoTags,
      DivHeader,
      SingleComment,
      elInput: Input
    },
    data() {
      let photoName = this.$route.params.photoId
      return {
        isEnlarged: false,
        textarea: '',
        photoUrl: require('/Users/st/code/Photour/Photour-Server/storage/app/uploads/photos/' + photoName)
      }
    },
//    props: ['photoUrl'],
    computed: {
//      ...mapState('photoDetails', {
//        photoName: state => state.photoUrl
//      }),
    },
    methods: {
      enlargePhoto() {
        this.isEnlarged ? this.isEnlarged = false : this.isEnlarged = true;
      },
      handleForward() {
        this.$modal.show('forward-modal');
      },
      handleComment() {

      }
    },
  }
</script>

<style scoped src="./PhotoDetails.css"></style>

