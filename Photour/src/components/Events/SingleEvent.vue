<template>

  <div class="single-event-wrapper">
    <div class="top-wrapper">

      <div class="user">
        <img src="../../assets/img/user.png" width="20"/>
        <span>{{this.currentEvent.author_name}}</span>
      </div>

      <div class="time">
        <span>{{this.currentEvent.create_at}}</span>
      </div>

    </div>

    <div class="photo-wrapper" @click="goToPhotoDetails">
      <div class="photo" :style="{ backgroundImage: 'url(' + photoUrl + ')' }">
      </div>
    </div>

    <div class="content-wrapper">
      <div class="content-head">
        <span>{{this.currentEvent.author_name}} </span>
        {{this.currentEvent.type === 'forward' ? '转发了一张照片' : '发布了一张照片'}}
      </div>

      <div class="content-body">
        {{this.currentEvent.content}}
      </div>

    </div>
  </div>


</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {store, router} from '../../main'

  export default {
    name: 'single-event',
    components: {},
    data() {
      let name = this.currentEvent.photo.url.split('/')[this.currentEvent.photo.url.split('/').length - 1];
      return {
        photoUrl: require('/Users/st/code/Photour/Photour-Server/storage/app/uploads/photos/' + name),
      }
    },
    computed: {
//      ...mapState({
//        favourites: state => state.photos.favourites
//      })
    },
    props: ['currentEvent'],
    methods: {
      ...mapMutations('photos', [
        'saveCurrentPhoto'
      ]),
      goToPhotoDetails() {
        this.saveCurrentPhoto(this.currentEvent.photo)
        router.push({name: 'PhotoDetailsPage', params: {photoId: this.currentEvent.photo.url}});
        window.scrollTo(0, 0);
      }
    },
  }

</script>

<style scoped src="./SingleEvent.css"></style>
