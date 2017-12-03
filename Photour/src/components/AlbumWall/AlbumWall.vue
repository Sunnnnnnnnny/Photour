<template>
  <div v-if="this.user" class="photo-wall-wrapper">
    <!--<el-row :gutter="15">-->

    <album
      v-for="item in this.albums"
      :currentAlbum="item">
      <!--:currentUrl="item.url"-->
    </album>

    <div v-if="this.user.id === this.userId" class="new-album-wrapper" @click="handleCreateAlbum">
      <span style="font-size: 56px">+</span>
      <br/>
      <span>新建相册</span>
    </div>
    <!--</el-row>-->


  </div>

</template>

<script>
  import Album from './AlbumWrapper'
  import {Row, Col} from 'element-ui'
  import {mapState, mapActions} from 'vuex'
  import {store} from '../../main'

  export default {
    name: 'album-wall',
    components: {
      Album,
      elRow: Row,
      elCol: Col,
    },
    props: ['albums'],
    computed: {
      ...mapState('auth', {
        user: state => state.user
      })
    },
    data() {
      return {
        userId: parseInt(this.$route.params.userId),
      }
    },
    methods: {
      handleCreateAlbum() {
        this.$modal.show('create-album-modal');

      }
    },

  }
</script>

<style scoped src="./AlbumWall.css"></style>
