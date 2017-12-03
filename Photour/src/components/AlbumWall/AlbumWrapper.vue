<template>
  <el-col :xs="12" :sm="8" :md="6" :lg="6">
    <div class="grid-content">
      <div class="div-wrapper">

        <div class="album-wrapper" @click="goToAlbumDetails">
          <div class="album" :style="{ backgroundImage: 'url(' + photoUrl + ')' }">

          </div>
        </div>

        <div class="info-wrapper">
          <img src="../../assets/img/album.png" width="17"/>
          <span class="author-name">
        {{this.currentAlbum.name}}
      </span>
        </div>

      </div>
    </div>
  </el-col>
</template>

<script>

  import {Row, Col} from 'element-ui'
  import {router} from '../../main'
  import {mapMutations, mapActions, mapState} from 'vuex'

  export default {
    name: 'photo',
    components: {
      elCol: Col,
    },
    data() {
      return {
        photoUrl: 'https://cdn.dribbble.com/users/226242/screenshots/3871814/1976_chevrolet_blazer.png',
      }
    },
    props: ['currentAlbum'],
    computed: {
      ...mapState('albums', {
        photosInAlbums: state => state.photosInAlbums
      }),
      ...mapState('auth', {
        user: state => state.user
      })
    },
    methods: {
      ...mapMutations('albums', [
        'saveCurrentAlbum',
        'showingPhotos'
      ]),
      ...mapActions('albums', [
        'fetchPhotosInAlbums'
      ]),
      goToAlbumDetails() {
        this.saveCurrentAlbum(this.currentAlbum.id)
        this.fetchPhotosInAlbums(
          {
            albumId: this.currentAlbum.id,
            userId: this.user.id
          })
        this.showingPhotos(true)
      }
    }
  }
</script>

<style scoped src="./AlbumWrapper.css"></style>
