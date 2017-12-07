<template>

  <div class="album-photos-wrapper">

    <button class="back-button" @click="goBackToAlbums"><< 返回</button>
    <div-header :header="this.currentAlbum.name"></div-header>
    <p>
      {{this.currentAlbum.description}}
    </p>

    <photo-wall :photos="this.photos"></photo-wall>
  </div>

</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {store} from '../../main'
  import PhotoWall from '../PhotoWall/PhotoWall'
  import DivHeader from '../Util/DivHeader'

  export default {
    name: 'my-album-photos',
    components: {
      PhotoWall,
      DivHeader
    },
    data() {
      return {}
    },
    computed: {},
    props: ['photos', 'currentAlbum'],
    methods: {
      ...mapMutations('auth', [
        'saveCurrentPage'
      ]),
      ...mapMutations('albums', [
        'showingPhotos'
      ]),
      goBackToAlbums() {
        this.showingPhotos(false)
        this.saveCurrentPage('MyAlbum')
      }
    },
  }

</script>

<style scoped src="./MyAlbumPhotos.css"></style>
