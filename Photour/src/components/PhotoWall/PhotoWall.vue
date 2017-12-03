<template>
  <div class="photo-wall-wrapper">
    <el-row v-if="photos && photos.length > 0" :gutter="15">
      <photo
        v-for="item in photos"
        :currentPhoto="item"></photo>
    </el-row>
    <div v-else class="empty-photo">
      <p>
        还没有照片哦～
      </p>
    </div>


  </div>

</template>

<script>
  import Photo from './PhotoWrapper'
  import {Row, Col} from 'element-ui'
  import {mapState, mapActions} from 'vuex'
  import {store} from '../../main'

  export default {
    name: 'photo-wall',
    components: {
      Photo,
      elRow: Row,
      elCol: Col,
    },
    props: ['photos'],
    data() {
      return {}
    },
    methods: {


//      ...mapActions ({
//        fetchPhotos: 'fetchPhotos'
//      }),
//      ...mapState ({
//        photos: state => state.photos.photos
//      })
    },

  }
</script>

<style scoped src="./PhotoWall.css"></style>
