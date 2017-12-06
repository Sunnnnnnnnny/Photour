<template>

  <div class="album-wall-wrapper">

    <album-wall :albums="this.albums"></album-wall>
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
      console.log(this.albums)
      return {}
    },
    props: ['albums'],
    methods: {},
  }

</script>

<style scoped src="./MyAlbum.css"></style>
