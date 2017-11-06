<template>

  <div class="single-event-wrapper">
    <div class="top-wrapper">

      <div class="user">
        <img src="../../assets/img/user.png" width="20"/>
        <span>tiann</span>
      </div>

      <div class="time">
        <span>2017-11-06 21:33:20</span>
      </div>

    </div>

    <div class="photo-wrapper" @click="goToPhotoDetails">
      <div class="photo" :style="{ backgroundImage: 'url(' + photoUrl + ')' }">
      </div>
    </div>

    <div class="content-wrapper">
      <div class="content-head">
        <span>tiann </span>
        发布了一张照片
      </div>

      <div class="content-body">
        这张照片我真的非常喜欢！！ ：）
        这张照片我真的非常喜欢！！ ：）
        这张照片我真的非常喜欢！！ ：）
        这张照片我真的非常喜欢！！ ：）
      </div>

    </div>
  </div>


</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {store, router} from '../../main'

  export default {
    name: 'single-event',
    components: {},
    data() {
      return {
        photoUrl: 'https://images.unsplash.com/photo-1498248193836-88f8c8d70a3f?w=2091'
      }
    },
    computed: {
//      ...mapState({
//        favourites: state => state.photos.favourites
//      })
    },
    methods: {
      goToPhotoDetails() {
        router.push({name: 'PhotoDetailsPage', params: {photoId: this.photoUrl}});
        window.scrollTo(0, 0);
      }
    },
  }

</script>

<style scoped src="./SingleEvent.css"></style>
