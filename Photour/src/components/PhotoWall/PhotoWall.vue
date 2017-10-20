<template>
  <div class="photo-wall-wrapper">
    <el-row :gutter="15">
      <photo
        v-for="item in photos"
        :currentUrl="item.url"></photo>
    </el-row>



  </div>

</template>

<script>
  import Photo from './PhotoWrapper'
  import {Row, Col} from 'element-ui'
  import { mapState, mapActions } from 'vuex'
  import { store } from '../../main'

  export default {
    name: 'photoWall',
    components: {
      Photo,
      elRow: Row,
      elCol: Col,
    },
    props: ['photos'],
    data() {
      return {
      }
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
