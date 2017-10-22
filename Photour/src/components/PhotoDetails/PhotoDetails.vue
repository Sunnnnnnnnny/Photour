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
            <img src="../../assets/img/unlike.png" width="16"/>
            <span>1,230</span>
          </button>
        </div>

        <div class="button-wrapper">
          <button>
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
      <img :src=photoUrl @dblclick="enlargePhoto" :class="{ large: isEnlarged }"/>
    </div>

    <photo-tags></photo-tags>
  </div>

</template>

<script>
  import PhotoTags from './PhotoTags.vue'
  import {mapState} from 'vuex'
  import {store} from '../../main'

  export default {
    name: 'photo-details',
    components: {
      PhotoTags,
    },
    data() {
      return {
        isEnlarged: false
      }
    },
//    props: ['photoUrl'],
    computed: {
      ...mapState({
        photoUrl: state => state.photoDetails.photoUrl
      })
    },
    methods: {
      enlargePhoto() {
        this.isEnlarged ? this.isEnlarged = false : this.isEnlarged = true;
      }
    },
  }
</script>

<style scoped src="./PhotoDetails.css"></style>

