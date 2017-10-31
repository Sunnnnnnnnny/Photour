<template>

  <div class="album-wall-wrapper">

    <!--<div class="warning" v-if="favourites.length===0">-->
    <!--<p>暂时没有喜欢的照片，去广场看看</p>-->
    <!--</div>-->

    <album-wall></album-wall>
  </div>

</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {store} from '../../main'
  import AlbumWall from "../AlbumWall/AlbumWall";

  export default {
    name: 'my-album',
    components: {AlbumWall},
    data() {
      return {}
    },
    computed: {
//      ...mapState({
//        favourites: state => state.photos.favourites
//      })
    },
    methods: {},
  }

</script>

<style scoped src="./MyAlbum.css"></style>
